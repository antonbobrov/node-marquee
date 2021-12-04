export interface NodeMarqueeProp {
    /**
     * The selector of the element or the elements itself.
     * @default '#node-marquee'
     */
    parent?: HTMLElement | string;
    /**
     * The amount of pixels to move with each frame.
     * @default 1
     */
    speed?: number;
    /**
     * Minimal amount of inner elements
     * @default 1
     */
    minQuantity?: number;
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
     * If you need to apply default style to the parent element
     * @default true
     */
    useParentStyles?: boolean;
    /**
     * If need to append a whitespace before each element
     */
    prependWhitespace?: boolean;
    /**
     * When the window is resized, the marquee element is recreated
     * for its sizes correspond to the current size of the window.
     * This property allow you to decide what viewport changes to react. <br>
     * true - update on each resize <br>
     * 'w' - update on width resize only <br>
     * 'h' - update on height resize only <br>
     * false - to not update on resize
     */
    resize?: boolean | 'w' | 'h';
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
