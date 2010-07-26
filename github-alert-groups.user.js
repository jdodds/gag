// ==UserScript==
// @name gag
// @namespace http://github.com/jdodds
// @description Group github alerts by project.
// @include https://github.com/
// ==/UserScript==

GM_addStyle(".gag_group { background-color: #FFFEEB; border: 1px dotted; padding-left: 1em; padding-right: 1em; padding-top: 1em; margin-bottom: 1em; }");
GM_addStyle(".gag_hider { cursor: pointer; border-bottom: 1px solid; margin-bottom: 1em; font-weight: bold; color:#4183C4}");

// this seems to be necessary for jQuery to be picked up. Sorry.
var script = document.createElement("script");
script.type = "text/javascript";
script.innerHTML = "(function($){\
var groups = {};\
$('.alert').each(function() {\
    var project = $(this).find('div.title a:last').text();\
    if (!groups.hasOwnProperty(project)) {\
        groups[project] = [];\
    }\
    groups[project].push($(this).clone());\
});\
$('div.news').empty();\
\
var skeleton = $('<div class=\"gag_group\"><div class=\"gag_hider\"></div><div class=\"gag_alerts\"></div>');\
\
for (var g in groups) {\
    if (groups.hasOwnProperty(g)) {\
        var to_add = skeleton.clone();\
        to_add.find('.gag_hider').text(g);\
        for (var a in groups[g]) {\
            if (groups[g].hasOwnProperty(a)) {\
                groups[g][a].prependTo(to_add.find('div.gag_alerts'));\
            }\
        }\
       to_add.appendTo('div.news');\
    }\
}\
\
$('.gag_hider').toggle(\
    function() {\
        $(this).next().hide();\
    },\
    function() {\
        $(this).next().show();\
    }\
);\
$('.gag_hider').click();\
})(jQuery);";
document.body.appendChild(script);