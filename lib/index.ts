import { querySelectorAllToArray } from './utils';

export interface IViewInOptions {
    onEnterClass: string,
    onExitClass: string,
    enterThreshold: number,
    exitThreshold: number
}

type IIntersectionEntryCallback = (entry: IntersectionObserverEntry) => void;

const defaultOptions: IViewInOptions = {
    onEnterClass: 'animate-inview',
    onExitClass: 'animate-outview',
    enterThreshold: 0.5,
    exitThreshold: 0.5
}

function buildObserverCallBack(options: IViewInOptions): IntersectionObserverCallback {
    return function callback (entries) {
        entries.forEach(entry => {
            let { intersectionRatio, target } = entry;
            let { onEnterClass, onExitClass, enterThreshold, exitThreshold } = options;

            function isEntering() {
                return intersectionRatio >= enterThreshold && !target.classList.contains(onEnterClass)
            }

            function isExiting() {
                return intersectionRatio <= exitThreshold && target.classList.contains(onEnterClass)
            }

            if (isEntering()) {
                target.classList.add(onEnterClass);
                target.classList.remove(onExitClass);
            } else if (isExiting()) {
                target.classList.remove(onEnterClass);
                target.classList.add(onExitClass);
            }
        });
    }
}

export default function viewIn(selector: string, options: IViewInOptions = defaultOptions): IntersectionObserver {
    const elements = querySelectorAllToArray(selector);
    const callback = buildObserverCallBack(options)
    const threshold = [options.enterThreshold, options.exitThreshold];
    const io = new IntersectionObserver(callback, { threshold });

    elements.forEach(element => io.observe(element));

    return io;
}