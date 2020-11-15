export interface NodeMarqueeProp {
    /**
     * The selector of the element or the elements itself.
     * @default '.node-marquee'
     */
    selector?: HTMLElement | string;
    /**
     * The amount of pixels to move with each frame.
     * @default 1
     */
    speed?: number;
    /**
     * If you want the marquee element to start moving after its initializing.
     * @default true
     */
    autoplay?: boolean;
    /**
     * Stop the marquee on hover
     * @default false
     */
    pauseOnHover?: boolean;
    /**
     * If you need to apply default style to the outer element
     * @default true
     */
    applyOuterStyles?: boolean;
    /**
     * By default, the script copies the text and moves it. To calculate the transformations,
     * it needs to know the width of each element.
     * This very width is calculated with each animation frame
     * and in some cases may influence performance.
     * If you want to avoid this, set the property as "true", and it won't recalculate
     * styles with each frame, though when changing styles of the marquee (f.e., font-size),
     * the marquee must be manually recreated.
     * @default false
     */
    optimizeCalculation?: boolean;
}



export interface NodeMarquee {
    /**
     * Start the marquee animation
     */
    play: () => void;
    /**
     * Stop the marquee animation
     */
    pause: () => void;
    /**
     * Check if animation is launched
     */
    isPlaying: () => boolean;
    /**
     * Render the marquee
     */
    render: (speed: number) => void;
    /**
     * Destroy and create
     */
    recreate: () => void;
    /**
     * Update sizes of the marquee (manually)
     */
    updateSizes: () => void;
    /**
     * Destroy the marquee
     */
    destroy: () => void;
}
