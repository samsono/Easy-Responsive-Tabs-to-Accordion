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

Demo
====

http://webtrendset.com/demo/easy-responsive-tabs/Index.html


How to use
==========

=> Included jQuery file (minimum jQuery-1.5.1.min.js)
=> Included easyResponsiveTabs.js
=> Include responsive-tabs.css

=> Here is the Markup for Tabs structure:

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
        
=> Call the easyResponsiveTabs function:

        $('#demoTab').easyResponsiveTabs();
        
=> With optional parameters:

        $("#demoTab").easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion           
            width: 'auto', //auto or any custom width
            fit: true,   // 100% fits in a container
            closed: false, // Close the panels on start, the options 'accordion' and 'tabs' keep them closed in there respective view types
            activate: function() {}  // Callback function, gets called if tab is switched
        });


For any support
===============
Samson 
Email: samson3d@gmail.com
