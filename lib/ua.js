var ua = {
    isIE: function() {
        // IEであるか否かの判定
        var isIE = false; // IEか否か
        var version = null; // IEのバージョン
        var ua = navigator.userAgent;
        if (ua.match(/MSIE/) || ua.match(/Trident/)) {
            isIE = true;
        }
        return isIE;
    },
    browser: function() {
        var userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('opera') != -1) {
            return 'opera';
        } else if (userAgent.indexOf('msie') != -1 ||
                   userAgent.indexOf('trident') != -1) {
            return 'ie';
            // android標準ブラウザ
        } else if (userAgent.indexOf('android') != -1 &&
                   userAgent.indexOf('linux; u;') != -1) {
            return 'android';
        } else if (userAgent.indexOf('iphone') != -1 ||
                   userAgent.indexOf('ipad') != -1) {
            // iOS chrome
            if (userAgent.indexOf('crios') != -1) {
                return 'ios_chrome';
            } else {
                return 'ios_safari';
            }
        } else if (userAgent.indexOf('chrome') != -1) {
            return 'chrome';
        } else if (userAgent.indexOf('safari') != -1) {
            return 'safari';
        } else if (userAgent.indexOf('firefox') != -1) {
            return 'firefox';
        } else {
            return false;
        }
    },
    device: function() {
        var userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('iphone') != -1 ||
            userAgent.indexOf('ipod') != -1 ||
            userAgent.indexOf('windows phone') != -1 ||
            userAgent.indexOf('android') != -1 &&
            userAgent.indexOf('mobile') != -1) {
            return 'sp';
        } else if (userAgent.indexOf('ipad') != -1 ||
                   userAgent.indexOf('tablet') != -1 ||
                   userAgent.indexOf('android') != -1) {
            return 'tab';
        } else {
            return 'pc';
        }
    }
};



var _lua = (function(){
 return {
  ltIE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
  ltIE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
  ltIE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
  ltIE9:document.uniqueID && typeof window.matchMedia == "undefined",
  gtIE10:document.uniqueID && window.matchMedia,
  Trident:document.uniqueID,
  Gecko:'MozAppearance' in document.documentElement.style,
  Presto:window.opera,
  Blink:window.chrome,
  Webkit:typeof window.chrome == "undefined" && 'WebkitAppearance' in document.documentElement.style,
  Touch:typeof document.ontouchstart != "undefined",
  Mobile:typeof window.orientation != "undefined",
  ltAd4_4:typeof window.orientation != "undefined" && typeof(EventSource) == "undefined",
  Pointer:window.navigator.pointerEnabled,
  MSPoniter:window.navigator.msPointerEnabled
 }
})();



function xconsole(msg) {
        lcommon.debugLog(msg);
}
var lcommon = {
        debugLog : function(obj) {
                if(window.console && typeof window.xconsole === 'function' && console.debug != undefined) {
                        console.debug(obj);
                }
        }
}