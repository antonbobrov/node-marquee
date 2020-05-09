import element from "./element";


/**
 * @typedef Prop
 * @property {string|HTMLElement} [selector=.node-marquee] The selector of the element or the elements itself.
 * @property {number} [speed=1] The amount of pixels to move with each frame.
 * @property {boolean} [autoplay=true] If you want the marquee element to start moving after its initializing.
 */

/**
 * @typedef Returns
 * @property {Function} play
 * @property {Function} pause
 * @property {Function} destroy
 * @property {Function} render
 */

/**
 * @author Anthony Bobrov {@link https://github.com/antonbobrov/node-marquee.git| GitHub}
 * 
 * Custom Marquee element with JavaScript.
 * @param {Prop} prop 
 * @returns {Returns} Returns a set of methods.
 */
function nodeMarquee(prop = {}) {
    

    // extend properties
    const DEFAULT_PROP = {
        selector: '.node-marquee',
        speed: 1,
        autoplay: true
    };
    prop = Object.assign(DEFAULT_PROP, prop);



    // check if the element exists
    const OUTER = element(prop.selector);
    if (OUTER == null) {
        return false
    }
    OUTER.classList.add("node-marquee");



    // get inner text
    let text = OUTER.innerText;

    // quantity of elements
    let quantity = 0,
        elements = [];

    // vars
    let translateX = 0,
        isPlaying = false;
    const MIN_AMOUNT = 5;


    
    // observe changes in DOM
    let observer = false;

    function observeMutations() {

        // observer config
        const config = {
            childList: true
        }; 
        // oserver callback
        const callback = (mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    text = OUTER.innerText;
                    create();
                }
            }
        };
        // create the observer
        observer = new MutationObserver(callback);
        observer.observe(OUTER, config);
        
    }
    
    function disconnectMutations() {
        
        if (observer) {
            observer.disconnect();
        }

    }



    // create elements
    create();

    // add a resize event
    const RESIZE_LISTENER_FUNCTION = create.bind(this);
    window.addEventListener("resize", RESIZE_LISTENER_FUNCTION, false);

    // animation frame
    let animationFrame = false;
    if (prop.autoplay) {
        play();
    }



    // Create elements
    function create() {

        // disable mutation observer
        disconnectMutations();

        // clear outer
        quantity = 0;
        elements = [];
        OUTER.innerHTML = '';

        // apply styles to the outer
        OUTER.style.position = 'relative';
        OUTER.style.width = '100%';
        OUTER.style.overflow = 'hidden';
        OUTER.style.whiteSpace = 'nowrap';

        // create first element
        let firstEl = createElement();

        // calculate how much elements we need to create in addition to the first one
        let width = firstEl.clientWidth;
        if (width < OUTER.clientWidth) {
            quantity = Math.ceil(OUTER.clientWidth / width);
        }
        if (quantity < MIN_AMOUNT) {
            quantity = MIN_AMOUNT;
        }

        for (let i = 0; i < quantity - 1; i++) {
            createElement(true, true);
        }

        // redraw
        draw();

        // enable mutation observer
        observeMutations();

    }

    function createElement(absolute = false, appendWhitespace = false) {

        let className = 'node-marquee__el';

        let el = document.createElement("div");
        el.classList.add(className);
        if (appendWhitespace) {
            el.innerHTML = '&nbsp;' + text;
        }
        else {
            el.innerHTML = text;
        }
        if (absolute) {
            el.style.position = 'absolute';
            el.style.top = '0';
            el.style.left = '0';
        }
        el.style.display = 'inline-block';
        OUTER.appendChild(el);

        // get position
        elements.push(el);

        return el;

    }


    
    // Rendering
    function render() {

        draw();

        if (isPlaying) {
            animationFrame = window.requestAnimationFrame(render.bind(this));
        }

    }
    
    // Draw Elements
    function draw() {

        translateX += prop.speed;
        let moveToEnd = false;

        let w = 0;
        for (let i = 0; i < quantity; i++) {

            let el = elements[i];

            let t = w - translateX;
            w += el.clientWidth;

            el.style.transform = `translate(${t}px, 0)`;
            if (t < el.clientWidth * -1) {
                moveToEnd = el;
            }
            
        }

        if (moveToEnd) {
            elements.push(elements.splice(elements.indexOf(moveToEnd), 1)[0]);
            translateX -= moveToEnd.clientWidth;
        }

    }



    // Play the animation frame
    function play() {
        if (!animationFrame) {
            isPlaying = true;
            animationFrame = window.requestAnimationFrame(render.bind(this));
        }
    }

    // Pause the animation frame
    function pause() {
        isPlaying = false;
        if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = false;
        }
    }



    // Destroy the marquee
    function destroy() {
        
        pause();
        disconnectMutations();
        
        OUTER.innerHTML = text;

    }




    return {
        play: play.bind(this),
        pause: pause.bind(this),
        destroy: destroy.bind(this),
        render: render.bind(this)
    }



}

export default nodeMarquee;