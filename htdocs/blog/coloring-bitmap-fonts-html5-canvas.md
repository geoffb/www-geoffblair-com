---
title: Coloring Bitmap Fonts in HTML5 Canvas
date: 2016-04-10 12:00:00
template: article.jade
tags: html5, canvas, javascript, gamedev
---
When rendering text in HTML5 canvas, I mostly use the [native text drawing methods](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text) like `fillText`. However, a question came up on the [LDG forum](http://forum.lostdecadegames.com/) a while back about rendering bitmap fonts with varying colors.

Bitmap fonts are simply images of text characters which are then rendered to the screen the same way you might render game sprites, with `drawImage`.

The source image for a bitmap font would look something like this:

<a href="https://github.com/geoffb/canvas-bitmap-fonts/blob/master/font.png">
	<img src="https://raw.githubusercontent.com/geoffb/canvas-bitmap-fonts/master/font.png" width="700" />
</a>

In order to render this font using different colors, we can take advantage of the [composite operations](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation) supported by canvas.

The basic concept is to first draw the letters to an off-screen buffer canvas and then use the `source-in` composite operation to draw over just the black pixels with a different color.

*Note: This example doesn't cover how to render a string of text by mapping each character to a position in the image.*

Here's a snippet of JavaScript demonstrating how the compositing works:

```
// Draw mask to buffer
ctx.clearRect(0, 0, buffer.width, buffer.height);
ctx.drawImage(font, 0, 0, 256, 64, 0, 0, 256, 64);

// Draw the color only where the mask exists
ctx.fillStyle = "white";
ctx.globalCompositeOperation = "source-in";
ctx.fillRect(0, 0, 256, 64);

// Now, render the contents of the buffer to the screen
```

Using this technique, we can render text in any color using a single bitmap font image:

<a href="https://github.com/geoffb/canvas-bitmap-fonts/blob/master/font.png">
	<img src="https://raw.githubusercontent.com/geoffb/canvas-bitmap-fonts/master/output.png" width="263" />
</a>

[View the full source on GitHub](https://github.com/geoffb/canvas-bitmap-fonts).
