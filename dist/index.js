import { querySelectorAllToArray } from './utils';
var defaultOptions = {
    animationEnterClass: 'animate-inview',
    animationExitClass: 'animate-outview',
    triggerEnterThreshold: 0.5,
    triggerExitThreshold: 0.5
};
function observeElements(elements, callback, options) {
    var threshold = [options.triggerEnterThreshold, options.triggerExitThreshold];
    var io = new IntersectionObserver(function (entries) { return entries.forEach(callback); }, {
        threshold: threshold
    });
    elements.forEach(function (element) { return io.observe(element); });
}
export function animateInView(selector, options) {
    if (options === void 0) { options = defaultOptions; }
    var elements = querySelectorAllToArray(selector);
    var callback = function (entry) {
        var intersectionRatio = entry.intersectionRatio, target = entry.target;
        var animationEnterClass = options.animationEnterClass, animationExitClass = options.animationExitClass, triggerEnterThreshold = options.triggerEnterThreshold, triggerExitThreshold = options.triggerExitThreshold;
        function isEntering() {
            return intersectionRatio >= triggerEnterThreshold && !target.classList.contains(animationEnterClass);
        }
        function isExiting() {
            return intersectionRatio <= triggerExitThreshold && target.classList.contains(animationEnterClass);
        }
        if (isEntering()) {
            target.classList.add(animationEnterClass);
            target.classList.remove(animationExitClass);
        }
        else if (isExiting()) {
            target.classList.remove(animationEnterClass);
            target.classList.add(animationExitClass);
        }
    };
    observeElements(elements, callback, options);
}
