---
title: HTML5 Canvas Performance Tips
date: 2016-05-03 12:00:00
template: article.jade
tags: html5, canvas, javascript, gamedev
draft: true
---
Performance is a big deal, especially when it comes to games.

## Profile Your Code

Before you do anything else, identify the bottleneck in your code using [Chrome DevTools][1] (or your preferred browser's tools). You'll likely see the canvas API calls, such as `drawImage` and `fillRect`, taking up the most time. Expanding `drawImage`, for example, reveals the calling functions within our own code.

![Identifying rendering bottlnecks using Chrome DevTools](/media/images/misc/chrome-devtools.png)

In this example, we'd be more concerned with our rendering code in `View.js` than  in `Spotlight.js`.

Profile early and often.

## Draw Fewer Pixels

The more pixels you draw, the longer it takes. The fastest pixel to draw is the one which isn't drawn.

How can you draw fewer pixels?

* Buffer complex rendering (see Buffering, below)
* Don't draw off-screen entities
* Keep your sprites tight, avoid unnecessary transparent pixels
* Multiple, layered canvases
* Only redraw portions of the screen which have changed, i.e. dirty rectangles
* Reduce canvas resolution and scale up using CSS

## Batch

Batch transforms, use setTransform over save, restore, translate, scale, rotate
Draw more pixels per drawImage call vs many separate draw calls.

## Buffer

Buffer things which need multiple passes or expensive operations

[1]: https://developers.google.com/web/tools/chrome-devtools/?hl=en
