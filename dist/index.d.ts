export interface IViewInOptions {
    onEnterClass: string;
    onExitClass: string;
    enterThreshold: number;
    exitThreshold: number;
}
export default function viewIn(selector: string, options?: IViewInOptions): IntersectionObserver;
