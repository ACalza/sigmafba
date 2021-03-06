/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.dropdown', [])
    .service('LxDropdownService', ['$document', function($document)
    {
        var openScope = null;

        function open(dropdownScope)
        {
            if (!openScope)
            {
                $document.bind('click', closeDropdown);
            }

            if (openScope && openScope !== dropdownScope)
            {
                openScope.isOpened = false;
            }

            openScope = dropdownScope;
        }

        function close(dropdownScope)
        {
            if (openScope === dropdownScope)
            {
                openScope = null;
                $document.unbind('click', closeDropdown);
            }
        }

        function closeDropdown()
        {
            if (!openScope) { return; }

            openScope.$apply(function()
            {
                openScope.isOpened = false;
            });
        }

        return {
            open: open,
            close: close
        };
    }])
    .controller('LxDropdownController', ['$scope', '$timeout', '$window', 'LxDropdownService', function($scope, $timeout, $window, LxDropdownService)
    {
        var dropdown,
            dropdownMenu;
        var dropdownMenuHeight;

        $scope.isOpened = false;
        $scope.isDropped = false;

        this.registerDropdown = function(element)
        {
            dropdown = element;

            $scope.position = angular.isDefined($scope.position) ? $scope.position : 'left';
        };

        this.registerDropdownMenu = function(element)
        {
            dropdownMenu = element;
        };

        this.toggle = function()
        {
            $scope.isOpened = !$scope.isOpened;
        };

        function linkList()
        {
            $scope.isDropped = false;

            closeDropdownMenu();
        }

        function unlinkList()
        {
            $scope.isDropped = true;

            dropdownMenu.appendTo('body');

            $timeout(function()
            {
                setDropdownMenuCss();
                openDropdownMenu();
            });
        }

        function fromTop(toTop)
        {
            if (angular.isUndefined($scope.overToggle) && angular.isDefined($scope.fromTop))
            {
                return $scope.fromTop === 'true';
            }

            if ($scope.overToggle === 'true')
            {
                return !toTop;
            }
            else
            {
                return toTop;
            }
        }

        function setDropdownMenuCss()
        {
            var scrollTop = dropdownMenu.scrollTop();
            dropdownMenu.removeAttr('style');
            dropdownMenu.css({
                opacity: 1,
                overflow: 'auto'
            });

            var windowScrollTop = angular.element($window).scrollTop();
            var dropdownMenuWidth = dropdownMenu.outerWidth();
            dropdownMenuHeight = dropdownMenu.outerHeight();
            var origin = {
                x: dropdown.offset().left,
                y: (dropdown.offset().top - windowScrollTop) + dropdown.outerHeight() // dropdown is the button at the moment
            };
            var width = dropdownMenuWidth;
            var height, bottomOffset, topOffset;

            if (angular.isDefined($scope.width))
            {
                if ($scope.width === 'full')
                {
                    width = dropdown.outerWidth();
                }
                else
                {
                    width = dropdown.outerWidth() + parseInt($scope.width);
                }
            }

            if ($scope.position === 'right')
            {
                origin.x = $window.innerWidth - (dropdown.offset().left + dropdown.outerWidth());
            }
            else if ($scope.position === 'center')
            {
                origin.x = dropdown.offset().left + (dropdown.outerWidth() - width) / 2;
            }

            if (origin.y + dropdownMenuHeight >= $window.innerHeight && origin.y - dropdownMenuHeight > 0)
            { // To top
                bottomOffset = fromTop(true) ? dropdown.outerHeight() : 0;

                if (bottomOffset && origin.y - bottomOffset - dropdownMenuHeight <= 0)
                {
                    height = origin.y - bottomOffset - 8;
                }

                dropdownMenu.css({
                    left: $scope.position !== 'right' ? origin.x : undefined,
                    right: $scope.position === 'right' ? origin.x : undefined,
                    bottom: $window.innerHeight - origin.y + bottomOffset - windowScrollTop,
                    width: width,
                    height: height
                });
            }
            else if (origin.y + (fromTop(false) ? -dropdown.outerHeight() : 0) + dropdownMenuHeight < $window.innerHeight)
            { // To bottom
                topOffset = fromTop(false) ? -dropdown.outerHeight() : 0;

                dropdownMenu.css({
                    left: $scope.position !== 'right' ? origin.x : undefined,
                    right: $scope.position === 'right' ? origin.x : undefined,
                    top: origin.y + topOffset + windowScrollTop,
                    width: width
                });
            }
            else // Dropdown too big, check the biggest space between up or down and use it with a padding
            {
                if (origin.y > $window.innerHeight / 2) // Middle of the screen
                { // To top
                    bottomOffset = fromTop(true) ? dropdown.outerHeight() : 0;
                    height = origin.y - (fromTop(true) ? dropdown.outerHeight() : 0) - 8;

                    dropdownMenu.css({
                        left: $scope.position !== 'right' ? origin.x : undefined,
                        right: $scope.position === 'right' ? origin.x : undefined,
                        bottom: $window.innerHeight - origin.y + bottomOffset - windowScrollTop,
                        width: width,
                        height: height - bottomOffset
                    });
                }
                else
                { // To bottom
                    topOffset = fromTop(false) ?  -dropdown.outerHeight() : 0;
                    height = $window.innerHeight - (fromTop(false) ? dropdown.outerHeight() : 0) - origin.y - 8;

                    dropdownMenu.css({
                        left: $scope.position !== 'right' ? origin.x : undefined,
                        right: $scope.position === 'right' ? origin.x : undefined,
                        top: origin.y + topOffset + windowScrollTop,
                        width: width,
                        height: height - 2*topOffset
                    });
                }

                dropdownMenu.scrollTop(scrollTop);
            }
        }

        function openDropdownMenu()
        {
            var width = dropdownMenu.outerWidth();
            var height = dropdownMenu.outerHeight();

            dropdownMenu.css({
                width: 0,
                height: 0,
                opacity: 1
            });

            dropdownMenu.find('.dropdown-dropdownMenu__content').css({
                width: width,
                height: height
            });

            dropdownMenu.velocity({
                width: width
            }, {
                duration: 200,
                easing: 'easeOutQuint',
                queue: false
            });

            dropdownMenu.velocity({
                height: height
            }, {
                duration: 500,
                easing: 'easeOutQuint',
                queue: false,
                complete: function()
                {
                    if (height === dropdownMenuHeight)
                    {
                        dropdownMenu.css({ height: 'auto' });
                    }
                    else
                    {
                        dropdownMenu.css({ overflow: 'auto' });
                    }

                    if (!angular.isDefined($scope.width))
                    {
                        dropdownMenu.css({ width: 'auto' });
                    }

                    dropdownMenu.find('.dropdown-menu__content').removeAttr('style');
                }
            });

            dropdown.addClass('dropdown--is-active');
        }

        function closeDropdownMenu()
        {
            dropdownMenu.velocity({
                width: 0,
                height: 0,
            }, {
                duration: 200,
                easing: 'easeOutQuint',
                complete: function()
                {
                    dropdownMenu
                        .appendTo(dropdown)
                        .removeAttr('style');

                    dropdown.removeClass('dropdown--is-active');
                }
            });
        }

        function updatePositionAndSize()
        {
            if ($scope.isDropped)
            {
                setDropdownMenuCss();
            }
        }

        $scope.$watch('isOpened', function(isOpened)
        {
            if (isOpened)
            {
                unlinkList();
                LxDropdownService.open($scope);
            }
            else
            {
                linkList();
                LxDropdownService.close($scope);
            }
        });

        angular.element($window).on('resize scroll', updatePositionAndSize);

        $scope.$on('$locationChangeSuccess', function()
        {
            $scope.isOpened = false;
        });

        $scope.$on('$destroy', function()
        {
            dropdownMenu.remove();
            LxDropdownService.close($scope);
        });

        this.updatePositionAndSize = updatePositionAndSize;
    }])
    .directive('lxDropdown', function()
    {
        return {
            restrict: 'E',
            controller: 'LxDropdownController',
            templateUrl: 'dropdown.html',
            transclude: true,
            replace: true,
            scope: true,
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.registerDropdown(element);

                attrs.$observe('position', function(newValue)
                {
                    scope.position = newValue;
                });

                attrs.$observe('width', function(newValue)
                {
                    scope.width = newValue;
                });

                attrs.$observe('fromTop', function(newValue)
                {
                    scope.fromTop = newValue;
                });

                attrs.$observe('overToggle', function(newValue)
                {
                    scope.overToggle = newValue;
                });
            }
        };
    })
    .directive('lxDropdownToggle', function()
    {
        return {
            restrict: 'AE',
            require: '^lxDropdown',
            templateUrl: 'dropdown-toggle.html',
            replace: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl)
            {
                element.bind('click', function(event)
                {
                    event.stopPropagation();

                    scope.$apply(function()
                    {
                        ctrl.toggle();
                    });
                });
            }
        };
    })
    .directive('lxDropdownMenu', ['$timeout', function($timeout)
    {
        return {
            restrict: 'E',
            require: '^lxDropdown',
            templateUrl: 'dropdown-menu.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs, ctrl, transclude)
            {
                var timer;

                ctrl.registerDropdownMenu(element);
                element.on('click', function(event)
                {
                    event.stopPropagation();

                    scope.$apply(function()
                    {
                        ctrl.toggle();
                    });
                });

                scope.$watch(function()
                {
                    return element.html();
                }, function(newValue)
                {
                    if (timer)
                    {
                        $timeout.cancel(timer);
                    }

                    timer = $timeout(ctrl.updatePositionAndSize, 150); // debounce
                });
            }
        };
    }])
    .directive('lxDropdownFilter', ['$timeout', function($timeout)
    {
        return {
            restrict: 'A',
            link: function(scope, element)
            {
                element.bind('click', function(event)
                {
                    event.stopPropagation();
                });

                $timeout(function()
                {
                    element.find('input').focus();
                }, 200);
            }
        };
    }]);
