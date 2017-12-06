export interface IAnimateInviewOptions {
    animationEnterClass: string;
    animationExitClass: string;
    triggerEnterThreshold: number;
    triggerExitThreshold: number;
}
export declare function animateInView(selector: string, options?: IAnimateInviewOptions): void;
