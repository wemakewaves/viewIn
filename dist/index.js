(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require("./utils");
    var defaultOptions = {
        onEnterClass: 'animate-inview',
        onExitClass: 'animate-outview',
        enterThreshold: 0.5,
        exitThreshold: 0.5
    };
    function buildObserverCallBack(options) {
        return function callback(entries) {
            entries.forEach(function (entry) {
                var intersectionRatio = entry.intersectionRatio, target = entry.target;
                var onEnterClass = options.onEnterClass, onExitClass = options.onExitClass, enterThreshold = options.enterThreshold, exitThreshold = options.exitThreshold;
                function isEntering() {
                    return intersectionRatio >= enterThreshold && !target.classList.contains(onEnterClass);
                }
                function isExiting() {
                    return intersectionRatio <= exitThreshold && target.classList.contains(onEnterClass);
                }
                if (isEntering()) {
                    target.classList.add(onEnterClass);
                    target.classList.remove(onExitClass);
                }
                else if (isExiting()) {
                    target.classList.remove(onEnterClass);
                    target.classList.add(onExitClass);
                }
            });
        };
    }
    function viewIn(selector, options) {
        if (options === void 0) { options = defaultOptions; }
        var elements = utils_1.querySelectorAllToArray(selector);
        var callback = buildObserverCallBack(options);
        var threshold = [options.enterThreshold, options.exitThreshold];
        var io = new IntersectionObserver(callback, { threshold: threshold });
        elements.forEach(function (element) { return io.observe(element); });
        return io;
    }
    exports.default = viewIn;
});
