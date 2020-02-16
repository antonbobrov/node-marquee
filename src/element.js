export default function element(selector) {

    if (selector instanceof HTMLElement) {
        return selector;
    }
    else if (selector instanceof Window) {
        return selector;
    }
    else {
        return document.querySelector(selector);
    }

}