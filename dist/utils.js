(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function querySelectorAllToArray(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }
    exports.querySelectorAllToArray = querySelectorAllToArray;
    function hasIntersectionObserverSupport() {
        // Exits early if all IntersectionObserver and IntersectionObserverEntry
        // features are natively supported.
        if ('IntersectionObserver' in window &&
            'IntersectionObserverEntry' in window &&
            'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
            // Minimal polyfill for Edge 15's lack of `isIntersecting`
            // See: https://github.com/w3c/IntersectionObserver/issues/211
            if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
                Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
                    get: function () {
                        return this.intersectionRatio > 0;
                    }
                });
            }
            return true;
        }
        return false;
    }
    exports.hasIntersectionObserverSupport = hasIntersectionObserverSupport;
});
