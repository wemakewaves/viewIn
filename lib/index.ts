import { querySelectorAllToArray } from './utils';

export interface IAnimateInviewOptions {
    animationEnterClass: string,
    animationExitClass: string,
    triggerEnterThreshold: number,
    triggerExitThreshold: number
}

type IIntersectionEntryCallback = (entry: IntersectionObserverEntry) => void;

const defaultOptions: IAnimateInviewOptions = {
    animationEnterClass: 'animate-inview',
    animationExitClass: 'animate-outview',
    triggerEnterThreshold: 0.5,
    triggerExitThreshold: 0.5
}

function buildObserverCallBack(options: IAnimateInviewOptions): IntersectionObserverCallback {
    return function callback (entries) {
        entries.forEach(entry => {
            let { intersectionRatio, target } = entry;
            let { animationEnterClass, animationExitClass, triggerEnterThreshold, triggerExitThreshold } = options;

            function isEntering() {
                return intersectionRatio >= triggerEnterThreshold && !target.classList.contains(animationEnterClass)
            }

            function isExiting() {
                console.log(intersectionRatio, triggerExitThreshold, target.classList.contains(animationEnterClass));
                return intersectionRatio <= triggerExitThreshold && target.classList.contains(animationEnterClass)
            }

            if (isEntering()) {
                target.classList.add(animationEnterClass);
                target.classList.remove(animationExitClass);
            } else if (isExiting()) {
                target.classList.remove(animationEnterClass);
                target.classList.add(animationExitClass);
            }
        });
    }
}

export function animateInView(selector: string, options: IAnimateInviewOptions = defaultOptions) {
    const elements = querySelectorAllToArray(selector);
    const callback = buildObserverCallBack(options)
    const threshold = [options.triggerEnterThreshold, options.triggerExitThreshold];
    const io = new IntersectionObserver(callback, { threshold });

    elements.forEach(element => io.observe(element));
}