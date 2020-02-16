# Custom Marquee element with JavaScript.



## How to start
```sh
npm install node-marquee
```



## Example
```html
<div class="node-marquee">This is a marquee element.</div>
```
```js
import nodeMarquee from 'node-marquee';
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



## Methods

Method Name | Description
----------- | -----------
play | Start animation.
pause | Pause animation.