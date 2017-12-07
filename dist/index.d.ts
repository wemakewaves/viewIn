export interface IViewInOptions {
    onEnterClass: string;
    onExitClass: string;
    enterThreshold: number;
    exitThreshold: number;
}
export declare function viewIn(selector: string, options?: IViewInOptions): IntersectionObserver;
