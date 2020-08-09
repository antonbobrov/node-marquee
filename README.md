# Custom Marquee element with JavaScript.



## Documentation: https://antonbobrov.github.io/node-marquee/



## How to start with NPM
```sh
npm install node-marquee
```

## How to start with CDN
```html
<script src="https://cdn.jsdelivr.net/npm/node-marquee/dist/cdn/index.min.js"></script>
```



## Example
```html
<div class="node-marquee">This is a marquee element.</div>
```
```js
import nodeMarquee from 'node-marquee';
```
```js
nodeMarquee({
    selector: '.node-marquee'
});
```



## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
selector | string\|HTMLElement | .node-marquee | The selector of the element or the elements itself.
speed | number | 1 | The amount of pixels to move with each frame.
autoplay | boolean | true | If you want the marquee element to start moving after its initializing.
pauseOnHover | boolean | false | Pause animation on mouse enter.
source | "innerHTML" \| "innerText" | "innerHTML" | Text source.



## Methods

Method Name | Description
----------- | -----------
play | Start animation.
pause | Pause animation.
destroy | Destroy the marquee.
render | Imitate rendering.