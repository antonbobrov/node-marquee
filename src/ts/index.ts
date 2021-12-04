import { selectOne, addEventListener, createElement } from 'vevet-dom';
import { NodeMarqueeProp, NodeMarquee } from './types';

export {
    NodeMarquee,
    NodeMarqueeProp,
};

/**
 * Custom Marquee element
 */
export default function nodeMarquee (
    argProp: NodeMarqueeProp = {},
): (NodeMarquee | false) {
    // default properties
    const defaults: Required<NodeMarqueeProp> = {
        parent: '#node-marquee',
        speed: 1,
        minQuantity: 4,
        autoplay: true,
        pauseOnHover: false,
        useParentStyles: true,
        prependWhitespace: true,
        resize: true,
    };
    // extend properties
    const prop = Object.assign(defaults, argProp);

    // states
    const className = 'node-marquee';

    // get parent element
    const parent = selectOne(prop.parent) as HTMLElement;
    if (!(parent instanceof HTMLElement)) {
        return false;
    }
    parent.classList.add(className);

    // states
    const viewportSizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    let isDestroyed = false;
    let isPlaying = false;
    let progress = 0;
    let animationFrame: (false | number) = false;

    // data
    let defaultHTML = parent.innerHTML;
    let quantity = 0;
    let items: HTMLElement[] = [];
    let itemWidth = 0;

    // events
    let mutations: undefined | MutationObserver;
    const listeners = [
        addEventListener(window, 'resize', handleResize),
        addEventListener(parent, 'mouseenter', handleMouseEnter),
        addEventListener(parent, 'mouseleave', handleMouseLeave),
    ];

    // create the marquee
    create();

    // set animation frame
    if (prop.autoplay) {
        play();
    }



    /**
     * Create the marquee elemetnt
     */
    function create () {
        // reset events
        disconnectMutations();

        // clear the outer element
        quantity = 0;
        items = [];
        parent.innerHTML = '';

        // apply styles to the outer
        if (prop.useParentStyles) {
            parent.style.position = 'relative';
            parent.style.width = '100%';
            parent.style.overflow = 'hidden';
            parent.style.whiteSpace = 'nowrap';
        }

        // create the first item and get its sizes
        // to calculate the further quantity of inner elements
        const firstItem = createItem();
        itemWidth = firstItem.clientWidth;
        if (itemWidth <= 0) {
            itemWidth = window.innerWidth;
        }
        if (itemWidth < parent.clientWidth) {
            quantity = Math.ceil((parent.clientWidth + itemWidth) / itemWidth);
        }
        if (quantity < prop.minQuantity) {
            quantity = prop.minQuantity;
        }

        // now when we know the total quantity,
        // we can create the rest of the items
        for (let index = 1; index < quantity; index += 1) {
            createItem(true);
        }

        // render for the first time
        renderItems();
        // enable mutation observer
        observeMutations();
        // and to be sure, update sizes once more
        setTimeout(() => {
            updateSizes();
        }, 500);
    }

    /**
     * Create a single element inside the marquee
     */
    function createItem (
        isAbsolute = false,
    ) {
        const element = createElement('div', {
            class: `${className}__el`,
            html: `${prop.prependWhitespace ? '&nbsp;' : ''}${defaultHTML}`,
        });

        // apply styles
        if (isAbsolute) {
            element.style.position = 'absolute';
            element.style.top = '0';
            element.style.left = '0';
        }
        element.style.display = 'inline-block';

        // append the element
        parent.appendChild(element);
        items.push(element);

        return element;
    }


    /**
     * Event on window resize
     */
    function handleResize () {
        if (prop.resize === false) {
            return;
        }

        const prevViewportWidth = viewportSizes.width;
        const prevViewportHeight = viewportSizes.height;
        const newViewportWidth = window.innerWidth;
        const newViewportHeight = window.innerHeight;
        viewportSizes.width = newViewportWidth;
        viewportSizes.height = newViewportHeight;

        if (
            typeof prop.resize === 'string'
        ) {
            if (
                (prop.resize === 'w' && (prevViewportWidth !== newViewportWidth))
                || (prop.resize === 'h' && (prevViewportHeight !== newViewportHeight))
            ) {
                create();
                return;
            }
            return;
        }

        create();
    }


    /**
     * Event on hover - ON
     */
    function handleMouseEnter () {
        if (prop.pauseOnHover) {
            pause();
        }
    }

    /**
     * Event on hover - OFF
     */
    function handleMouseLeave () {
        if (prop.pauseOnHover) {
            play();
        }
    }



    /**
     * Observe DOM content changes
     * If a change happend inside the parent element,
     * we recreate the marquee element
     */
    function observeMutations () {
        if (mutations) {
            return;
        }
        const config: MutationObserverInit = {
            childList: true,
        };
        const callback: MutationCallback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    defaultHTML = parent.innerHTML;
                    create();
                }
            }
        };
        mutations = new MutationObserver(callback);
        mutations.observe(parent, config);
    }

    /**
     * Destroy mutation observer
     */
    function disconnectMutations () {
        if (mutations) {
            mutations.disconnect();
            mutations = undefined;
        }
    }

    /**
     * Update sizes
     */
    function updateSizes () {
        if (isDestroyed) {
            return;
        }
        const width: number[] = [];
        for (let index = 0; index < quantity; index += 1) {
            width.push(items[index].clientWidth);
        }
        itemWidth = Math.max(...width);
    }



    /**
     * Render the marquee
     */
    function render () {
        if (isPlaying) {
            animationFrame = window.requestAnimationFrame(render);
        }
        renderItems();
    }

    /**
     * Render inner elements
     */
    function renderItems (
        speed = prop.speed,
    ) {
        progress -= speed;

        // get total width
        const totalWidth = itemWidth * (quantity - 1);

        // render elements
        for (let index = 0; index < quantity; index += 1) {
            const el = items[index];
            // calulate transforms
            const x = wrap(
                -itemWidth,
                totalWidth,
                progress + itemWidth * index,
            );
            // apply transforms
            el.style.transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0, ${x}, 0, 0,1)`;
        }
    }

    function wrap (
        min: number, max: number, value: number,
    ) {
        const range = max - min;
        return conditionalReturn(value, (val) => ((range + ((val - min) % range)) % range) + min);
    }

    function conditionalReturn (value: number, func: (val: number) => number) {
        return value || value === 0 ? func(value) : func;
    }



    /**
     * Play the marquee
     */
    function play () {
        if (!animationFrame) {
            isPlaying = true;
            animationFrame = window.requestAnimationFrame(render);
        }
    }

    /**
     * Pause the marquee
     */
    function pause () {
        isPlaying = false;
        if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = false;
        }
    }



    /**
     * Destroy the marquee element
     */
    function destroy () {
        isDestroyed = true;
        pause();
        disconnectMutations();
        listeners.forEach((listener) => {
            listener.remove();
        });
        parent.innerHTML = defaultHTML;
    }



    return {
        play,
        pause,
        isPlaying: () => isPlaying,
        render: renderItems,
        recreate: create,
        updateSizes,
        destroy,
    };
}
