var data = [{
    "species": "Escherichia coli",
    "strain": "MG1655",
    "id": "1",
    "genes": [],
    "metabolites": [{
        "id": "10fthf_c",
        "name": "Formyltetrahydrofolate",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": -2,
        "_bound": 0,
        "formula": "C20H21N7O7",
        "annotation": {}
    }, {
        "id": "12dgr120_c",
        "name": "1,2-Diacyl-sn-glycerol (didodecanoyl, n-C12:0)",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": -2,
        "_bound": 0,
        "formula": "C27H52O5",
        "annotation": {}
    }, {
        "id": "4crsol_c",
        "name": "p-Cresol",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": 0,
        "_bound": 0,
        "formula": "C7H8O",
        "annotation": {}
    }, {
        "id": "5drib_c",
        "name": "5'-deoxyribose",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": 0,
        "_bound": 0.0,
        "formula": "C5H10O4",
        "annotation": {}
    }, {
        "id": "2agpg141_c",
        "name": "2-Acyl-sn-glycero-3-phosphoglycerol (n-C14:1)",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": -1,
        "_bound": 0.0,
        "formula": "C20H38O9P1",
        "annotation": {}
    }, {
        "id": "2agpg141_p",
        "name": "2-Acyl-sn-glycero-3-phosphoglycerol (n-C14:1)",
        "compartment": "p",
        "notes": {},
        "_constraint_sense": "E",
        "charge": -1,
        "_bound": 0.0,
        "formula": "C20H38O9P1",
        "annotation": {}
    }, {
        "id": "coa_c",
        "name": "Coenzyme A",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": -4,
        "_bound": 0.0,
        "formula": "C21H32N7O16P3S",
        "annotation": {}
    }, {
        "id": "glu_DASH_L_c",
        "name": "L-Glutamate",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": -1,
        "_bound": 0.0,
        "formula": "C5H8NO4",
        "annotation": {}
    }, {
        "id": "accoa_c",
        "name": "Acetyl-CoA",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": -4,
        "_bound": 0.0,
        "formula": "C23H34N7O17P3S",
        "annotation": {}
    }, {
        "id": "h_c",
        "name": "H+",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": 1,
        "_bound": 0.0,
        "formula": "H",
        "annotation": {}
    }, {
        "id": "1_acglu_c",
        "name": "N-Acetyl-L-glutamate",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": -2,
        "_bound": 0.0,
        "formula": "C7H9NO5",
        "annotation": {}
    }],
    "notes": [],
    "reactions": [{
        "id": "DM_4CRSOL",
        "metabolites": {
            "4crsol_c": -1
        },
        "name": "Sink needed to allow p-Cresol to leave system",
        "upper_bound": 1000,
        "notes": {},
        "subsystem": "",
        "variable_kind": "countinuous",
        "lower_bound": 0,
        "gene_reaction_rule": "",
        "objective_coefficient": 0
    }, {
        "id": "DM_5DRIB",
        "metabolites": {
            "5drib_c": -1
        },
        "name": "Sink needed to allow 5'-deoxyribose to leave system",
        "upper_bound": 1000,
        "notes": {},
        "subsystem": "",
        "variable_kind": "countinuous",
        "lower_bound": 0,
        "gene_reaction_rule": "",
        "objective_coefficient": 0
    }, {
        "id": "2AGPG141tipp",
        "metabolites": {
            "2agpg141_p": -1.0,
            "2agpg141_c": 1.0
        },
        "name": "2-Acyl-sn-glycero-3-phosphoglycerol (n-C14:1) transporter via facilitated diffusion (periplasm)",
        "upper_bound": 1000.0,
        "notes": {},
        "subsystem": "Transport, Inner Membrane",
        "variable_kind": "continuous",
        "lower_bound": 0.0,
        "gene_reaction_rule": "",
        "objective_coefficient": 0.0
    }, {
        "id": "ACGS",
        "metabolites": {
            "coa_c": 1.0,
            "glu_DASH_L_c": -1.0,
            "accoa_c": -1.0,
            "h_c": 1.0,
            "1_acglu_c": 1.0
        },
        "name": "N-acetylglutamate synthase",
        "upper_bound": 1000.0,
        "notes": {},
        "subsystem": "Arginine and Proline Metabolism",
        "variable_kind": "continuous",
        "lower_bound": 0.0,
        "gene_reaction_rule": "",
        "objective_coefficient": 0.0
    }]
}, {
    "species": "Pseudomonas putida",
    "strain": "F1",
    "id": "2",
    "genes": [],
    "metabolites": [{
        "id": "h_w",
        "name": "Hello World",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": -2,
        "_bound": 0,
        "formula": "HELLOWORLD",
        "annotation": {}
    }, {
        "id": "2_acglu_c",
        "name": "N-Acetyl-L-glutamate",
        "compartment": "c",
        "notes": {},
        "_constraint_sense": "E",
        "charge": -2,
        "_bound": 0.0,
        "formula": "C7H9NO5",
        "annotation": {}
    }],
    "notes": [],
    "reactions": [{
        "id": "hello_world",
        "metabolites": {
            "h_w": 3.0,
            "1_acglu_c": -1.0
        },
        "name": "Hello world synthase",
        "upper_bound": 1000.0,
        "notes": {},
        "subsystem": "",
        "lower_bound": 0.0,
        "gene_reaction_rule": "",
        "objective_coefficient": 0.0
    }]
}];
