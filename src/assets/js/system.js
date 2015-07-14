/* global d3 */
/* global Metabolite */
/* global Reaction */
/* global palette */
'use strict';

var System = function(network, system){
  var _private = {
    network: network,
    nodes: null,     //all node elements class:node under <g> class:nodes
    links: null,    //all link elements class:link under <g> class:nodes
    force: null,
    system: null,
    linkSet: [],    //link data
    nodesSet: [],   //node data
    metaboliteRadius: 10
  };
  //initalize Pathway
  init(system);
  //init
  function init(system){

      buildMetabolites(system);
      //Create reaction objects
      buildReactions(system);

  }
  function buildMetabolites(system){
      // loop and bind metabolite data to metabolite node to nodeset
      for (var i = 0; i<system.metabolites.length; i++){
        _private.nodesSet.push(new Metabolite(_private.network, system.metabolites[i].name,
                                                  system.metabolites[i].id, _private.metaboliteRadius));
      }
  }
  function scale_radius(system){
    // find largest flux value and scale radius of reaction node accordingly
    var flux_array = [];
    for (var i = 0; i< system.reactions.length; i ++){
        flux_array.push(system.reactions[i].flux_value);
    }
    var largest = Math.max.apply(Math, flux_array);
    var r = d3.scale.linear().domain([0,largest]).range([1, 5]);
    return r;
  }
  function buildReactions(system){
      var tempLinks = [];
      // scale_radius
      var radiusScale = scale_radius(system);
      // loop and bind reaction data to reaction node
      var s, t;
      for (var i = 0; i<system.reactions.length; i++){
          if(system.reactions[i].flux_value){
              _private.nodesSet.push(new Reaction(_private.network, system.reactions[i].name,
                                                  system.reactions[i].id,
                                                  3,
                                                  //radiusScale(system.reactions[i].flux_value),
                                                  system.reactions[i].flux_value
                                                ));
              // assign metabolite source and target for each reaction
              var m = Object.keys(system.reactions[i].metabolites);

              for (var k = 0; k<m.length; k++){
                  if(system.reactions[i].metabolites[m[k]]>0){
                    s = system.reactions[i].id;
                    t = m[k];
                  }else{
                    s = m[k];
                    t = system.reactions[i].id;
                  }
                  tempLinks.push({id: s+"-"+t, source: s, target: t});
              }
          }

      }
      var nodesMap = map(_private.nodesSet);

      for (var j=0; j<tempLinks.length;j++){
          //ineffiecient, but will do for now

          s = _private.nodesSet[nodesMap[tempLinks[j].source]];

          t =  _private.nodesSet[nodesMap[tempLinks[j].target]];

          _private.linkSet.push({id: s.getID()+"-"+t.getID(), source: s, target: t});
      }

  }
  //to be fixed later
  //utilities function
  function map(nodesSet){
      var ret = {};
      for (var j=0; j<nodesSet.length;j++){
        ret[nodesSet[j].getID()] = j;
      }
      return ret;
  }

};
