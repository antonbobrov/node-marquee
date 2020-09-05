# Custom Marquee element

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