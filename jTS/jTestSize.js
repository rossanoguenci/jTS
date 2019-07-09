/* (c) 2019 RossanoGuenci.com - jTestSize - v. 1.0.0 */

/*INIT*/
var $window = $(window);
//Viewport
var vpoWidth = function () {
    return $window.width();
};
var vpoHeight = function () {
    return $window.height();
};
var vpoDevice = function () {
    if ($window.width() >= 1200) {
        return "-> (XL) Large Desktop";
    }
    if ($window.width() >= 992) {
        return "-> (LG) Desktop";
    }
    if ($window.width() >= 768) {
        return "-> (MD) Tablet";
    }
    if ($window.width() >= 576) {
        return "-> (SM) Phone";
    }
    if ($window.width() < 576) {
        return "-> (XS) Phone";
    }
    return "Unkown";
};

//Device
var devWidth = function () {
    return window.screen.width;
};
var devHeight = function () {
    return window.screen.height;
};
var devRatio = function () {
    return window.devicePixelRatio;
};

//Document
var docWidth = function () {
    return $(document).width();
};
var docHeight = function () {
    return $(document).height();
};

$window.resize(function () {
    $window.updateResult();
});

$window.updateResult = function () {
    $('#jTestSize #vpoWidth result').text(vpoWidth);
    $('#jTestSize #vpoHeight result').text(vpoHeight);
    $('#jTestSize #viewport contentName span').text(vpoDevice);
    $('#jTestSize #devWidth result').text(devWidth);
    $('#jTestSize #devHeight result').text(devHeight);
    $('#jTestSize #devRatio result').text(devRatio);
    $('#jTestSize #docWidth result').text(docWidth);
    $('#jTestSize #docHeight result').text(docHeight);
};

/*DEPENDS*/
let depends = [
    'jquery-ui/jquery-ui.min.js',
    'jquery.ui.touch-punch.min.js',
    'js.cookie.js'
];



$.getMultiScripts = function (arr, path) {
    var _arr = $.map(arr, function (scr) {
        console.log(path);
        return $.getScript((path || "") + scr);
    });

    _arr.push($.Deferred(function (deferred) {
        $(deferred.resolve);
    }));

    return $.when.apply($, _arr);
};


$.getMultiScripts(depends, 'jTS/').done(function() {

    $(function (){
        jTS();
    });

});

function jTS() {
    $('body').prepend('<div id="jTestSize"> <content id="viewport"> <contentName>Viewport <span></span></contentName> <div id="vpoWidth" class="contentResult">Width: <result></result> px</div> <div id="vpoHeight" class="contentResult">Height: <result></result> px</div> </content> <content id="document"> <contentName>Document</contentName> <div id="docWidth" class="contentResult">Width: <result></result> px</div> <div id="docHeight" class="contentResult">Height: <result></result> px</div> </content> <content id="device"> <contentName>Device</contentName> <div id="devWidth" class="contentResult">Width: <result></result> px</div> <div id="devHeight" class="contentResult">Height: <result></result> px</div> <div id="devRatio" class="contentResult">Ratio: <result></result></div> </content> </div>');
    $('#jTestSize').css({
        "min-height": "auto",
        "background-color": "rgba(0,0,0,0.8)",
        "border-radius": "10px",
        "position": "fixed",
        "top": "7px",
        "left": "7px",
        "padding": "15px",
        "z-index": "9999999",
        "cursor": "move",
        "font": "19px 'SanFranciscoDisplay-Light', Arial, Verdana"
    });
    $('#jTestSize #viewport contentName').css({
        "color": "green"
    });
    $('#jTestSize #viewport contentName span').css({
        "color": "yellow",
        "font-size": "0.85em"
    });
    $('#jTestSize #document contentName').css({
        "color": "orange"
    });
    $('#jTestSize #device contentName').css({
        "color": "red"
    });
    $('#jTestSize content').css({
        "margin-bottom": "30px"
    });
    $('#jTestSize contentName').css({
        "font-size": "1em",
        "font-weight": "bold",
        "margin-bottom": "5px"
    });
    $('#jTestSize .contentResult').css({
        "color": "white",
        "font-size": "1em",
        "padding-left": "10px"
    });
    $('#jTestSize').draggable();

    if (typeof Cookies !== "undefined") {
        if (Cookies.get('jTS-set') === null) {
            Cookies.set('jTS-set', 'shown');
        } else {
            jtsToggle(Cookies.get('jTS-set'));
        }

        $('#jTestSize').click(function () {
            jtsToggle();
        });
    }

    function jtsToggle(mode = null) {
        var list = '#jTestSize #document,#jTestSize #device';

        switch (mode) {
            case 'shown':
                $(list).show();
                Cookies.set('jTS-set', 'shown');
                break;
            case 'hidden':
                $(list).hide();
                Cookies.set('jTS-set', 'hidden');
                break;
            default:
                if (Cookies.get('jTS-set') === 'shown') {
                    $(list).hide();
                    Cookies.set('jTS-set', 'hidden');
                } else {
                    $(list).show();
                    Cookies.set('jTS-set', 'shown');
                }
        }

    }

    $window.updateResult();
}