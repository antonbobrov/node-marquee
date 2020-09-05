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
    render: () => void;
    /**
     * Destroy and create
     */
    recreate: () => void;
    /**
     * Destroy the marquee
     */
    destroy: () => void;
}
