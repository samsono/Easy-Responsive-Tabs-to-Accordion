// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com>
(function ($) {
	$.fn.extend({
		easyResponsiveTabs: function (options) {
			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				type: 'default', //default, vertical, accordion;
				width: 'auto',
				classes: {
					type_vertical: 'resp-vtabs',
					type_accordion: 'resp-easy-accordion',
					list_container: 'resp-tabs-list',
					list_item: 'resp-tab-item',
					list_item_active: 'resp-tab-active',
					content_container: 'resp-tabs-container',
					content_item: 'resp-tab-content',
					content_item_active: 'resp-tab-content-active',
					content_item_closed: 'resp-accordion-closed',
					accordion: 'resp-accordion',
					accordion_arrow : 'resp-arrow'
				},
				fit: true,
				closed: false,
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
				var $respTabsList = $respTabs.find('.' + options.classes.list_container);
				var respTabsId = $respTabs.attr('id');
				$respTabs.find('.' + options.classes.list_container + ' > *').addClass(options.classes.list_item);
				$respTabs.css({
					'display': 'block',
					'width': jwidth
				});

				$respTabs.find('.' + options.classes.content_container + ' > *').addClass(options.classes.content_item);
				jtab_options();

				//Properties Function
				function jtab_options() {
					if (jtype == vtabs) {
						$respTabs.addClass(options.classes.type_vertical);
					}
					if (jfit == true) {
						$respTabs.css({ width: '100%', margin: '0px' });
					}
					if (jtype == accord) {
						$respTabs.addClass(options.classes.type_accordion);
						$respTabs.find('.' + options.classes.list_container).css('display', 'none');
					}
				}

				//Assigning the h2 markup to accordion title
				var $tabItemh2;
				$respTabs.find('.' + options.classes.content_item).before('<h2 class="' + options.classes.accordion + '" role="tab"><span class="' + options.classes.accordion_arrow + '"></span></h2>');

				var itemCount = 0;
				$respTabs.find('.' + options.classes.accordion).each(function () {
					$tabItemh2 = $(this);
					var $tabItem = $respTabs.find('.' + options.classes.list_item + ':eq(' + itemCount + ')');
					var $accItem = $respTabs.find('.' + options.classes.accordion + ':eq(' + itemCount + ')');
					$accItem.append($tabItem.html());
					$accItem.data($tabItem.data());
					$tabItemh2.attr('aria-controls', 'tab_item-' + (itemCount));
					itemCount++;
				});

				//Assigning the 'aria-controls' to Tab items
				var count = 0,
					$tabContent;
				$respTabs.find('.' + options.classes.list_item).each(function () {
					$tabItem = $(this);
					$tabItem.attr('aria-controls', 'tab_item-' + (count));
					$tabItem.attr('role', 'tab');

					//Assigning the 'aria-labelledby' attr to tab-content
					var tabcount = 0;
					$respTabs.find('.' + options.classes.content_item).each(function () {
						$tabContent = $(this);
						$tabContent.attr('aria-labelledby', 'tab_item-' + (tabcount));
						tabcount++;
					});
					count++;
				});

				// Show correct content area
				var tabNum = 0;
				if(hash!='') {
					var matches = hash.match(new RegExp(respTabsId+"([0-9]+)"));
					if (matches!==null && matches.length===2) {
						tabNum = parseInt(matches[1],10)-1;
						if (tabNum > count) {
							tabNum = 0;
						}
					}
				}

				//Active correct tab
				$($respTabs.find('.' + options.classes.list_item)[tabNum]).addClass(options.classes.list_item_active);

				//keep closed if option = 'closed' or option is 'accordion' and the element is in accordion mode
				if(options.closed !== true && !(options.closed === 'accordion' && !$respTabsList.is(':visible')) && !(options.closed === 'tabs' && $respTabsList.is(':visible'))) {
					$($respTabs.find('.' + options.classes.accordion)[tabNum]).addClass(options.classes.list_item_active);
					$($respTabs.find('.' + options.classes.content_item)[tabNum]).addClass(options.classes.content_item_active).attr('style', 'display:block');
				}
				//assign proper classes for when tabs mode is activated before making a selection in accordion mode
				else {
					$($respTabs.find('.' + options.classes.content_item)[tabNum]).addClass(options.classes.content_item_active + ' ' + options.classes.content_item_closed)
				}

				//Tab Click action function
				$respTabs.find("[role=tab]").each(function () {

					var $currentTab = $(this);
					$currentTab.click(function () {

						var $currentTab = $(this);
						var $tabAria = $currentTab.attr('aria-controls');

						if ($currentTab.hasClass(options.classes.accordion) && $currentTab.hasClass(options.classes.list_item_active)) {
							$respTabs.find('.' + options.classes.content_item_active).slideUp('', function () { $(this).addClass(options.classes.content_item_closed); });
							$currentTab.removeClass(options.classes.list_item_active);
							return false;
						}
						if (!$currentTab.hasClass(options.classes.list_item_active) && $currentTab.hasClass(options.classes.accordion)) {
							$respTabs.find('.' + options.classes.list_item_active).removeClass(options.classes.list_item_active);
							$respTabs.find('.' + options.classes.content_item_active).slideUp().removeClass(options.classes.content_item_active + ' ' + options.classes.content_item_closed);
							$respTabs.find("[aria-controls=" + $tabAria + "]").addClass(options.classes.list_item_active);

							$respTabs.find('.' + options.classes.content_item + '[aria-labelledby = ' + $tabAria + ']').slideDown().addClass(options.classes.content_item_active);
						} else {
							$respTabs.find('.' + options.classes.list_item_active).removeClass(options.classes.list_item_active);
							$respTabs.find('.' + options.classes.content_item_active).removeAttr('style').removeClass(options.classes.content_item_active).removeClass(options.classes.content_item_closed);
							$respTabs.find("[aria-controls=" + $tabAria + "]").addClass(options.classes.list_item_active);
							$respTabs.find('.' + options.classes.content_item + '[aria-labelledby = ' + $tabAria + ']').addClass(options.classes.content_item_active).attr('style', 'display:block');
						}
						//Trigger tab activation event
						$currentTab.trigger('tabactivate', $currentTab);

						//Update Browser History
						if(historyApi) {
							var currentHash = window.location.hash;
							var newHash = respTabsId+(parseInt($tabAria.substring(9),10)+1).toString();

							if (currentHash!="") {
								var re = new RegExp(respTabsId+"[0-9]+");
								if (currentHash.match(re)!=null) {
									newHash = currentHash.replace(re,newHash);
								}
								else {
									newHash = currentHash+"|"+newHash;
								}
							}
							else {
								newHash = '#'+newHash;
							}

							history.replaceState(null,null,newHash);
						}
					});

				});

				//Window resize function
				$(window).resize(function () {
					$respTabs.find('.' + options.classes.content_item_closed).removeAttr('style');
				});
			});
		}
	});
})(jQuery);
