// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com>
(function ($) {
    $.fn.extend({
        easyResponsiveTabs: function (options) {
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                type: 'default', //default, vertical, accordion;
                width: 'auto',
                fit: true,
                closed: false,
                updateHistory: true, // update the URL hash and browser history when tab is selected
                activate: function(){}
            }
            //Variables
            var options = $.extend(defaults, options);            
            var opt = options, jtype = opt.type, jfit = opt.fit, jwidth = opt.width, vtabs = 'vertical', accord = 'accordion';
            var hash = window.location.hash;
            var historyApi = !!(window.history && history.replaceState);
            
            //Events
            $(this).bind('tabactivate', function(e, currentTab) {
                if(typeof options.activate === 'function') {
                    options.activate.call(currentTab, e)
                }
            });

            //Main function
            this.each(function () {
                var $respTabs = $(this);
                var $respTabsList = $respTabs.find('ul.resp-tabs-list');
                var respTabsId = $respTabs.attr('id');
                $respTabs.find('ul.resp-tabs-list li').addClass('resp-tab-item');
                $respTabs.css({
                    'display': 'block',
                    'width': jwidth
                });

                $respTabs.find('.resp-tabs-container > div').addClass('resp-tab-content');
                jtab_options();
                //Properties Function
                function jtab_options() {
                    if (jtype == vtabs) {
                        $respTabs.addClass('resp-vtabs');
                    }
                    if (jfit == true) {
                        $respTabs.css({ width: '100%', margin: '0px' });
                    }
                    if (jtype == accord) {
                        $respTabs.addClass('resp-easy-accordion');
                        $respTabs.find('.resp-tabs-list').css('display', 'none');
                    }
                }

                //Assigning the h2 markup to accordion title
                var $tabItemh2;
                $respTabs.find('.resp-tab-content').before("<h2 class='resp-accordion' role='tab'><span class='resp-arrow'></span></h2>");

                var itemCount = 0;
                $respTabs.find('.resp-accordion').each(function () {
                    $tabItemh2 = $(this);
                    var $tabItem = $respTabs.find('.resp-tab-item:eq(' + itemCount + ')');
                    var $accItem = $respTabs.find('.resp-accordion:eq(' + itemCount + ')');
                    $accItem.append($tabItem.html());
                    $accItem.data($tabItem.data());
                    $tabItemh2.attr('aria-controls', 'tab_item-' + (itemCount));
                    itemCount++;
                });

                //Assigning the 'aria-controls' to Tab items
                var count = 0,
                    $tabContent,
                    usingIds = false,
                    $tabItems = $respTabs.find('.resp-tab-item');

                $tabItems.each(function () {
                    $tabItem = $(this);
                    $tabItem.attr('aria-controls', 'tab_item-' + (count));
                    $tabItem.attr('role', 'tab');

                    if ($(this).attr('id')) {
                        usingIds = true;
                    }

                    //Assigning the 'aria-labelledby' attr to tab-content
                    var tabcount = 0;
                    $respTabs.find('.resp-tab-content').each(function () {
                        $tabContent = $(this);
                        $tabContent.attr('aria-labelledby', 'tab_item-' + (tabcount));
                        tabcount++;
                    });
                    count++;
                });

                //If some but not all of the tab items have an Id, add any missing Ids,
                //which we will use to identify tabs when updating the browser history
                if (usingIds) {
                    count = 1;
                    $tabItems.each(function () {
                        if (!$(this).attr('id')) {
                            $(this).attr('id', respTabsId + count);
                        }
                        count++;
                    });
                }
                
                // Show correct content area
                var tabNum = 0,
                    thisTabNum = 0,
                    matchedId = false,
                    matches;
                if (hash != '') {
                    if (usingIds) {
                        $tabItems.each(function () {
                            if (!matchedId) {
                                var thisId = $(this).attr('id');
                                if (hash.indexOf('#' + thisId) !== -1 || hash.indexOf('|' + thisId) !== -1) {
                                    matchedId = true;
                                    tabNum = thisTabNum;
                                }
                            }
                            thisTabNum++;
                        });
                    }
                    else {
                        matches = hash.match(new RegExp(respTabsId + "([0-9]+)"));
                        if (matches !== null && matches.length === 2) {
                            tabNum = parseInt(matches[1], 10) - 1;
                            if (tabNum > count) {
                                tabNum = 0;
                            }
                        }
                    }
                }

                //Active correct tab
                $($respTabs.find('.resp-tab-item')[tabNum]).addClass('resp-tab-active');

                //keep closed if option = 'closed' or option is 'accordion' and the element is in accordion mode
                if(options.closed !== true && !(options.closed === 'accordion' && !$respTabsList.is(':visible')) && !(options.closed === 'tabs' && $respTabsList.is(':visible'))) {                  
                    $($respTabs.find('.resp-accordion')[tabNum]).addClass('resp-tab-active');
                    $($respTabs.find('.resp-tab-content')[tabNum]).addClass('resp-tab-content-active').attr('style', 'display:block');
                }
                //assign proper classes for when tabs mode is activated before making a selection in accordion mode
                else {
                    $($respTabs.find('.resp-tab-content')[tabNum]).addClass('resp-tab-content-active resp-accordion-closed')
                }

                //Tab Click action function
                $respTabs.find("[role=tab]").each(function () {
                   
                    var $currentTab = $(this);
                    $currentTab.click(function () {
                        
                        var $currentTab = $(this);
                        var $tabAria = $currentTab.attr('aria-controls');

                        if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
                            $respTabs.find('.resp-tab-content-active').slideUp('', function () { $(this).addClass('resp-accordion-closed'); });
                            $currentTab.removeClass('resp-tab-active');
                            return false;
                        }
                        if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
                            $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content-active').slideUp().removeClass('resp-tab-content-active resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');

                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').slideDown().addClass('resp-tab-content-active');
                        } else {
                            $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content-active').removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').addClass('resp-tab-content-active').attr('style', 'display:block');
                        }
                        //Trigger tab activation event
                        $currentTab.trigger('tabactivate', $currentTab);
                        
                        //Update Browser History
                        if(options.updateHistory && historyApi) {
                            var $tabHeader = $respTabs.find('.resp-tab-item[aria-controls=' + $tabAria + ']'),
                                currentHash = window.location.hash,
                                updateHashBasedOnIdOfAnotherTab = function (newHashFragment) {
                                    var updatedHash = null;
                                    $.each($tabItems, function () {
                                        var thisId;
                                        if (!updatedHash) {
                                            thisId = $(this).attr('id');
                                            if (currentHash.indexOf('#' + thisId) !== -1 || currentHash.indexOf('|' + thisId) !== -1) {
                                                updatedHash = currentHash.replace(thisId, newHashFragment);
                                            }
                                        }
                                    });
                                    return updatedHash;
                                },
                                getNewHashBasedOnTabNumber = function () {
                                    var hash = respTabsId + (parseInt($tabAria.substring(9), 10) + 1).toString();
                                    if (currentHash != "") {
                                        var re = new RegExp(respTabsId + "[0-9]+");
                                        if (currentHash.match(re) != null) {
                                            return currentHash.replace(re, hash);
                                        }
                                        else {
                                            return updateHashBasedOnIdOfAnotherTab(hash) || (currentHash + '|' + hash);
                                        }
                                    }
                                    else {
                                        return '#' + hash;
                                    }
                                },
                                getNewHashBasedOnTabItemId = function () {
                                    var id = $tabHeader.attr('id');
                                    if (id) {
                                        return updateHashBasedOnIdOfAnotherTab(id) || id;
                                    }
                                    return false;
                                },
                                newHash = getNewHashBasedOnTabItemId() || getNewHashBasedOnTabNumber();

                            if (newHash.indexOf('#') !== 0) {
                                newHash = '#' + newHash;
                            }
                            
                            history.replaceState(null,null,newHash);
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

