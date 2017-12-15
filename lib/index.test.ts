import { IViewInOptions } from './';
import { querySelectorAllToArray, hasIntersectionObserverSupport } from './utils';
jest.mock('./utils');
import viewIn from './index';

const DEFAULT_OPTIONS: IViewInOptions = {
    onEnterClass: 'on-enter-classname',
    onExitClass: 'on-enter-classname',
    enterThreshold: 0.5,
    exitThreshold: 0.5
}

function intersectionObserverEntryFactory(ratio: number): any {
    return {
        intersectionRatio: ratio,
        target: elementFactory(),
        isIntersecting: true
    }
}

function elementFactory() {
    return {
        classList: {
            add: jest.fn(),
            remove: jest.fn(),
            contains: jest.fn()
        }
    }
}

describe('viewIn', () => {

    let elements: any[];
    let observeMock: jest.Mock = jest.fn();
    let IntersectionObserver: jest.Mock = (<any>window).IntersectionObserver = jest.fn(() => ({ observe: observeMock }));

    beforeEach(() => {
        elements = ["element", "element", "element"];
        (<jest.Mock>hasIntersectionObserverSupport).mockReturnValue(true);
        (<jest.Mock>querySelectorAllToArray).mockReturnValue(elements);
    });

    afterEach( () => {
        IntersectionObserver.mockClear()
        observeMock.mockClear();
    });

    describe('Intersection observer feature detection', () => {

        it('should throw an error if the intersection observer detection fails', () => {
            (<jest.Mock>hasIntersectionObserverSupport).mockReturnValue(false);
            expect(() => viewIn('.element', DEFAULT_OPTIONS)).toThrowError('Intersection Observer not detected. Consider the polyfill: https://www.npmjs.com/package/intersection-observer');
        });

        it('should not throw an error if the intersection observer detection succeeds', () => {
            (<jest.Mock>hasIntersectionObserverSupport).mockReturnValue(true);
            expect(() => viewIn('.element', DEFAULT_OPTIONS)).not.toThrowError('Intersection Observer not detected. Consider the polyfill: https://www.npmjs.com/package/intersection-observer');
        });

    });

    it('convert the selector string into an array of node lists', () => {
        viewIn('.element', DEFAULT_OPTIONS);
        expect(querySelectorAllToArray).toBeCalledWith('.element');
    });

    it('should create one IntersectionObserver for the selector called', () => {
        viewIn('.element', DEFAULT_OPTIONS);
        expect(IntersectionObserver).toHaveBeenCalledTimes(1);
    });

    it('should observe each element matched by the selector', () => {
        viewIn('.element', DEFAULT_OPTIONS);
        expect(observeMock).toHaveBeenCalledTimes(elements.length);
    });

    describe('options', () => {

        it('should pass the enterThreshold and exitThreshold to the intersection observer as threshold array', () => {
            viewIn('.element', DEFAULT_OPTIONS);

            const intersectionObserverOptions = IntersectionObserver.mock.calls[0][1];

            expect(intersectionObserverOptions).toEqual({
                threshold: [DEFAULT_OPTIONS.enterThreshold, DEFAULT_OPTIONS.exitThreshold]
            });

        });

     })


    describe('callback', () => {

        let intersectionCallback: IntersectionObserverCallback;

        beforeEach(() => {
            viewIn('.element', DEFAULT_OPTIONS);
            intersectionCallback = IntersectionObserver.mock.calls[0][0];
        })

        it('should not add any class if the intersectionRatio is below the entry threshold', () => {
            let entries = [intersectionObserverEntryFactory(0.10)];
            intersectionCallback(entries, <any>{});
            expect(entries[0].target.classList.add).not.toBeCalled;
        });


        it('should add the onEnterClass class if the intersectionRatio is above the options.enterThreshold and it does not already have the onEnterClass class', () => {
            let entries = [intersectionObserverEntryFactory(0.55)];
            entries[0].target.classList.contains.mockReturnValue(false);
            intersectionCallback(entries, <any>{});
            expect(entries[0].target.classList.add).toBeCalledWith(DEFAULT_OPTIONS.onEnterClass);
        });


        it('should remove the onEnterClass class if the intersectionRatio is less than options.exitThreshold and it has the enteredClass', () => {            // dont care about the first call
            let entries = [intersectionObserverEntryFactory(0.45)];
            entries[0].target.classList.contains.mockReturnValue(true);
            intersectionCallback(entries, <any>{});
            expect(entries[0].target.classList.remove).toBeCalledWith(DEFAULT_OPTIONS.onEnterClass);
        });

        it('should add the onExistClass class if the intersectionRatio is less than the options.exitThreshold and it has the onEnterClassed class', () => {
            let entries = [intersectionObserverEntryFactory(0.45)];
            entries[0].target.classList.contains.mockReturnValue(true);
            intersectionCallback(entries, <any>{});
            expect(entries[0].target.classList.add).toBeCalledWith(DEFAULT_OPTIONS.onExitClass);
        });

    })

});