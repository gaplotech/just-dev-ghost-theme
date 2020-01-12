/**
 * Inspired by https://github.com/GoogleChromeLabs/dark-mode-toggle/blob/master/src/dark-mode-toggle.mjs
 * The origin abstraction is too leaky(difficult to change UI's padding/margin) and required modern browser version to load the modules
 * rewrite the concept in es5 for better backward compatibility
 * @author GapLoTech
 */
(function (window, document) {
    var doc = document;
    var store = localStorage;
    var PREFERS_COLOR_SCHEME = 'prefers-color-scheme';
    var MEDIA = 'media';
    var LIGHT = 'light';
    var DARK = 'dark';
    var NO_PREFERENCE = 'no-preference';
    var MQ_DARK = '(' + PREFERS_COLOR_SCHEME + ':' + DARK + ')';
    var MQ_LIGHT = '(' + PREFERS_COLOR_SCHEME + ':' + LIGHT + '),(' + PREFERS_COLOR_SCHEME + ':' + NO_PREFERENCE + ')';
    var LINK_REL_STYLESHEET = 'link[rel=stylesheet]';
    var PERMANENT_COLOR_SCHEME = 'permanentcolorscheme';
    var ALL = 'all';
    var NOT_ALL = 'not all';
    var CLASS_NAME = '.dark-mode-toggle';

    var _darkCSS = doc.querySelectorAll(LINK_REL_STYLESHEET + '[' + MEDIA + '*=' + PREFERS_COLOR_SCHEME + '][' + MEDIA + '*=' + '"' + DARK + '"]');
    var _lightCSS = doc.querySelectorAll(LINK_REL_STYLESHEET + '[' + MEDIA + '*=' + PREFERS_COLOR_SCHEME + '][' + MEDIA + '*="' + LIGHT + '"],' + LINK_REL_STYLESHEET + '[' + MEDIA + '*=' + PREFERS_COLOR_SCHEME + '][' + MEDIA + '*="' + NO_PREFERENCE + '"]');

    var hasNativePrefersColorScheme = matchMedia(MQ_DARK).media !== NOT_ALL;
    var modeInStore = store.getItem(PERMANENT_COLOR_SCHEME);
    var mode;
    if(modeInStore) {
        mode = modeInStore;
    } else if (hasNativePrefersColorScheme) {
        mode = matchMedia(MQ_LIGHT).matches ? LIGHT : DARK;
    } else {
        mode = LIGHT;
    }

    function updateMode(element) {
        if (mode === LIGHT) {
            _lightCSS.forEach(function (link) {
                link.media = ALL;
                link.disabled = false;
            });
            _darkCSS.forEach(function (link) {
                link.media = NOT_ALL;
                link.disabled = true;
            });
            element.setAttribute('src', element.attributes.getNamedItem('data-dark-src').value);
        } else {
            _darkCSS.forEach(function (link) {
                link.media = ALL;
                link.disabled = false;
            });
            _lightCSS.forEach(function (link) {
                link.media = NOT_ALL;
                link.disabled = true;
            });
            element.setAttribute('src', element.attributes.getNamedItem('data-light-src').value);
        }
    }

    var _toggles = document.querySelectorAll(CLASS_NAME);
    _toggles.forEach(function(element){
        element.addEventListener('click', function () {
            mode = mode === LIGHT ? DARK : LIGHT;
            store.setItem(PERMANENT_COLOR_SCHEME, mode);
            _toggles.forEach(updateMode);
        });
        updateMode(element);
    });

})(window, document);
