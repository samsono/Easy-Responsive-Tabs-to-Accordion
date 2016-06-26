// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com>
// Modified: Michael Kabugi <Email : michael.kabugi@gmail.com>

(function ($) {
    $.fn.extend({
        easyResponsiveTabs: function (options) {
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                type: 'default', //default, vertical, accordion;
                width: 'auto',
                fit: true,
                closed: false,
                tabIdentify: '',
                activeHeaderClass: '',
                inactiveHeaderClass: '',
                activeContentClass: '',
                slideSpeed: 'slow',
                openActiveAccordion: true,
                activate: function () {
                }
            };
            //Variables
            var opts = $.extend(defaults, options);
            var opt = opts, jtype = opt.type, jfit = opt.fit, jwidth = opt.width, vtabs = 'vertical', accord = 'accordion';
            var hash = window.location.hash;
            var historyApi = !!(window.history && history.replaceState);

            //Events
            $(this).bind('tabactivate', function (e, currentTab) {
                if (typeof opts.activate === 'function') {
                    opts.activate.call(currentTab, e)
                }
            });

            //Main function
            this.each(function () {
                var $respTabs = $(this);
                var $respTabsList = $respTabs.find('ul.resp-tabs-list.' + opts.tabIdentify);
                var respTabsId = $respTabs.attr('id');
                $respTabs.find('ul.resp-tabs-list.' + opts.tabIdentify + ' li').addClass('resp-tab-item').addClass(opts.tabIdentify);
                $respTabs.css({
                    'display': 'block',
                    'width': jwidth
                });

                if (opts.type == 'vertical') {
                    $respTabsList.css('margin-top', '3px');
                }

                $respTabs.find('.resp-tabs-container.' + opts.tabIdentify).addClass(opts.activeContentClass);
                $respTabs.find('.resp-tabs-container.' + opts.tabIdentify + ' > div').addClass('resp-tab-content').addClass(opts.tabIdentify);


                jtab_options();
                //Properties Function
                function jtab_options() {
                    if (jtype == vtabs) {
                        $respTabs.addClass('resp-vtabs').addClass(opts.tabIdentify);
                    }
                    if (jfit == true) {
                        $respTabs.css({width: '100%', margin: '0px'});
                    }
                    if (jtype == accord) {
                        $respTabs.addClass('resp-easy-accordion').addClass(opts.tabIdentify);
                        $respTabs.find('.resp-tabs-list').css('display', 'none');
                    }
                }


                //Assigning the h2 markup to accordion title
                var $tabItemh2;
                $respTabs.find('.resp-tab-content.' + opts.tabIdentify).before("<h2 class='resp-accordion " + opts.tabIdentify + "' role='tab'><span class='resp-arrow'></span></h2>");

                $respTabs.find('.resp-tab-content.' + opts.tabIdentify).prev("h2").addClass(opts.inactiveHeaderClass).removeClass(opts.activeHeaderClass);

                var itemCount = 0;
                $respTabs.find('.resp-accordion').each(function () {
                    $tabItemh2 = $(this);
                    var $tabItem = $respTabs.find('.resp-tab-item:eq(' + itemCount + ')');
                    var $accItem = $respTabs.find('.resp-accordion:eq(' + itemCount + ')');
                    $accItem.append($tabItem.html());
                    $accItem.data($tabItem.data());
                    $tabItemh2.attr('aria-controls', opts.tabIdentify + '_tab_item-' + (itemCount));
                    itemCount++;
                });

                //Assigning the 'aria-controls' to Tab items
                var count = 0,
                    $tabContent;
                $respTabs.find('.resp-tab-item').each(function () {
                    var $tabItem = $(this);
                    $tabItem.attr('aria-controls', opts.tabIdentify + '_tab_item-' + (count));
                    $tabItem.attr('role', 'tab');
                    $tabItem.addClass(opts.inactiveHeaderClass).removeClass(opts.activeHeaderClass);

                    //Assigning the 'aria-labelledby' attr to tab-content
                    var tabcount = 0;
                    $respTabs.find('.resp-tab-content.' + opts.tabIdentify).each(function () {
                        $tabContent = $(this);
                        $tabContent.attr('aria-labelledby', opts.tabIdentify + '_tab_item-' + (tabcount));
                        tabcount++;
                    });
                    count++;
                });

                // Show correct content area
                var tabNum = 0;
                if (hash != '') {
                    var matches = hash.match(new RegExp(respTabsId + "([0-9]+)"));
                    if (matches !== null && matches.length === 2) {
                        tabNum = parseInt(matches[1], 10) - 1;
                        if (tabNum > count) {
                            tabNum = 0;
                        }
                    }
                }

                //Active correct tab
                $($respTabs.find('.resp-tab-item.' + opts.tabIdentify)[tabNum]).addClass('resp-tab-active').removeClass('resp-accordion-closed').addClass(opts.activeHeaderClass).removeClass(opts.inactiveHeaderClass);

                //keep closed if option = 'closed' or option is 'accordion' and the element is in accordion mode
                if (opts.closed !== true && !(opts.closed === 'accordion' && !$respTabsList.is(':visible')) && !(opts.closed === 'tabs' && $respTabsList.is(':visible'))) {
                    $($respTabs.find('.resp-accordion.' + opts.tabIdentify)[tabNum]).addClass('resp-tab-active').removeClass('resp-accordion-closed').addClass(opts.activeHeaderClass).removeClass(opts.inactiveHeaderClass);

                    $($respTabs.find('.resp-tab-content.' + opts.tabIdentify)[tabNum]).addClass('resp-tab-content-active').addClass(opts.tabIdentify).removeClass('resp-accordion-closed').attr('style', 'display:block');
                }
                //assign proper classes for when tabs mode is activated before making a selection in accordion mode
                else {
                    if (opts.openActiveAccordion) {
                        $($respTabs.find('.resp-tab-content.' + opts.tabIdentify)[tabNum]).removeClass('resp-accordion-closed').slideDown(opts.slideSpeed, function () {
                            $(this).addClass('resp-tab-content-active');
                            $($respTabs.find('.resp-accordion.' + opts.tabIdentify)[tabNum]).addClass('resp-tab-active').removeClass('resp-accordion-closed').addClass(opts.activeHeaderClass).removeClass(opts.inactiveHeaderClass);
                        });
                    } else {
                        $($respTabs.find('.resp-tab-content.' + opts.tabIdentify)[tabNum]).addClass('resp-accordion-closed'); //removed resp-tab-content-active
                    }
                }

                //Tab Click action function
                $respTabs.find("[role=tab]").each(function () {

                    var $currentTab = $(this);
                    $currentTab.click(function () {

                        var $currentTab = $(this);
                        var $tabAria = $currentTab.attr('aria-controls');

                        if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
                            $respTabs.find('.resp-tab-content-active.' + opts.tabIdentify).slideUp(opts.slideSpeed, function () {
                                $(this).addClass('resp-accordion-closed');
                            });
                            $currentTab.removeClass('resp-tab-active').addClass(opts.inactiveHeaderClass).removeClass(opts.activeHeaderClass);

                            return false;
                        }
                        if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
                            $respTabs.find('.resp-tab-active.' + opts.tabIdentify).removeClass('resp-tab-active').addClass(opts.inactiveHeaderClass).removeClass(opts.activeHeaderClass);

                            $respTabs.find('.resp-tab-content-active.' + opts.tabIdentify).slideUp(opts.slideSpeed, function () {
                                $(this).removeClass('resp-accordion-closed');
                            });

                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + '].' + opts.tabIdentify).removeClass('resp-accordion-closed').slideDown(opts.slideSpeed, function () {
                                $(this).addClass('resp-tab-content-active');
                                $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active').removeClass('resp-accordion-closed').addClass(opts.activeHeaderClass).removeClass(opts.inactiveHeaderClass);
                            });
                        } else {
                            $respTabs.find('.resp-tab-active.' + opts.tabIdentify).removeClass('resp-tab-active').addClass(opts.inactiveHeaderClass).removeClass(opts.activeHeaderClass);

                            $respTabs.find('.resp-tab-content-active.' + opts.tabIdentify).removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');


                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active').removeClass('resp-accordion-closed').addClass(opts.activeHeaderClass).removeClass(opts.inactiveHeaderClass);

                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + '].' + opts.tabIdentify).addClass('resp-tab-content-active').removeClass('resp-accordion-closed').attr('style', 'display:block');
                        }
                        //Trigger tab activation event
                        $currentTab.trigger('tabactivate', $currentTab);

                        //Update Browser History
                        if (historyApi) {
                            var currentHash = window.location.hash;
                            var tabAriaParts = $tabAria.split('tab_item-');
                            // var newHash = respTabsId + (parseInt($tabAria.substring(9), 10) + 1).toString();
                            var newHash = respTabsId + (parseInt(tabAriaParts[1], 10) + 1).toString();
                            if (currentHash != "") {
                                var re = new RegExp(respTabsId + "[0-9]+");
                                if (currentHash.match(re) != null) {
                                    newHash = currentHash.replace(re, newHash);
                                }
                                else {
                                    newHash = currentHash + "|" + newHash;
                                }
                            }
                            else {
                                newHash = '#' + newHash;
                            }

                            history.replaceState(null, '', newHash);
                        }
                    });

                });

                //Window resize function                   
                $(window).resize(function () {
                    $respTabs.find('.resp-accordion-closed').removeAttr('style');
                });
            });
        }
    });
})(jQuery);
