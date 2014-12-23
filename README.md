Easy Responsive Tabs to Accordion
=================================

Easy responsive tabs - is a lightweight jQuery plugin which optimizes normal horizontal or vertical tabs to accordion on multi devices like: web, tablets, Mobile (IPad &amp; IPhone). This plugin adapts the screen size and changes its form accordingly.


Features
=========

+ Horizontal / Vertical Tabs to Accordion
+ Tabs and accordion are created entirely with jQuery
+ Supports multiple sets of tabs on same page
+ Cross browser compatibility (IE7+, Chrome, Firefox, Safari and Opera)
+ Multi device support (Web, Tablets & Mobile)
+ Link directly to specified tab (works with multiple instances)
+ Maintains state of tabs when navigating away from page and then returning using back or forward (if browser supports the History API)
+ Nested tabs

Demo
====

http://webthemez.com/demo/easy-responsive-tabs/Index.html


How to use
==========

=> Included jQuery file (minimum jQuery-1.5.1.min.js)
=> Included easyResponsiveTabs.js
=> Include responsive-tabs.css
=> Here is the Markup for Tabs structure (non nested tabs):

        <div id="demoTab">          
            <ul class="resp-tabs-list">
                <li> .... </li>
                <li> .... </li>
                <li> .... </li>
            </ul> 

            <div class="resp-tabs-container">                                                        
                <div> ....... </div>
                <div> ....... </div>
                <div> ....... </div>
            </div>
        </div>    

=> Here is the Markup for Tabs structure (nested tabs):

        <div id="ParentTab">          
        <ul class="resp-tabs-list tab_identifier_parent">
            <li> .... </li>
            <li> .... </li>
            <li> .... </li>
        </ul> 

        <div class="resp-tabs-container tab_identifier_parent">                                                     
            <div>
               <p> 
                  <div id="ChildTab">          
                    <ul class="resp-tabs-list tab_identifier_child">
                       <li> .... </li>
                       <li> .... </li>
                       <li> .... </li>
                    </ul> 

                    <div class="resp-tabs-container tab_identifier_child">                                                                     <div> ....... </div>
                       <div> ....... </div>
                       <div> ....... </div>
                    </div>
                  </div>    
               </p>
            </div>
            <div> ....... </div>
            <div> ....... </div>
        </div>
    </div>  

=> Call the easyResponsiveTabs function:

        $('#demoTab').easyResponsiveTabs();
        
=> With optional parameters:

        $("#demoTab").easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion           
        width: 'auto', //auto or any custom width
        fit: true,   // 100% fits in a container
        closed: false, // Close the panels on start, the options 'accordion' and 'tabs' keep them closed in there respective view types
        activate: function() {},  // Callback function, gets called if tab is switched
        tabidentify: 'tab_identifier_child', // The tab groups identifier *This should be a unique name for each tab group and should not be defined in any styling or css file.
        activetab_bg: '#B5AC5F', // background color for active tabs in this group
        inactive_bg: '#E0D78C', // background color for inactive tabs in this group
        active_border_color: '#9C905C', // border color for active tabs heads in this group
        active_content_border_color: '#9C905C' // border color for active tabs contect in this group so that it matches the tab head border
    });

=> Linking to Tabs:
        
        http://yoursite.com/tabs.html#{TAB ID}{TAB NUM}
        http://yoursite.com/tabs.html#demoTab2

        Multiple Instances:
        http://yoursite.com/tabs.html#{TAB ID 1}{TAB NUM}|{TAB ID 2}{TAB NUM}
        http://yoursite.com/tabs.html#demoTab2|demoTwo3

For any support
===============
Samson 
Email: samson3d@gmail.com
