---
title: "Order matters: Tile map collision response"
date: 2014-06-11 12:00:00
layout: article.pug
tags:
  - post
  - gamedev
---

Perfecting the collision response in a game can be tricky. I've personally made several iterations on the collision detection and response in [A Wizard's Lizard][1].

Most recently, I've found that order matters when responding to multiple tile map collisions. I talked about this issue in [Lostcast 78][2], but I wanted to expand upon the idea and provide a diagram to better convey what's happening.

## The Problem

In general, I've been using the axis of least separation to resolve collisions. For a given collision, the objects will separate along the axis in which the least amount of overlap occurs. This is a technique I found while implementing [separating axis theorem][3] (SAT), but can be applied to simple axis-aligned bounding box (AABB) collisions as well.

![Diagram of a spear colliding with multiple tiles][4]

In the image above, a spear is moving left and colliding with multiple tiles. Responding to collisions by separating on the axis of least separation may cause unexpected behavior depending on the order in which the tile collisions are resolved.

With a simple algorithm, you might check the tiles in natural order. In this case, 0,0 followed by 1,0. The problem with this approach is that when colliding with 0,0, the axis of least separation is the X axis (the spear is colliding more along the Y axis than the X axis). Using this method, the spear would appear to collide with the right-hand side of 0,0 and thus be moved to the right in order to no longer collide.

This scenario is very problematic for me because I use the angle of collision when calculating if a projectile should be destroyed (hitting a wall head-on) or remain active (sliding along the wall). Responding to the X axis collision of 0,0 first indicates that the spear hit a wall head-on.

Ideally, the collisions would first separate along the Y axis in order to make the spear slide smoothly along the wall.

## A solution

One way to achieve expected collision behavior is to resolve tile collisions in the order of most overlap to least.

For each colliding tile, calculate the rectangular intersection and its area. Sort this set of collisions by the area (most to least) and then resolve each tile collision using the axis of least separation. In the above example, this would cause collisions for 1,0 to evaluate first. Since the spear is colliding more along X than Y, the spear is separated along the Y axis (pushed downwards). Now, when we go to the evaluate collision with 0,0 the spear is no longer colliding with that tile and can appear to slide along the wall as expected.

Of course, this is only one of the ways to solve this problem. Another idea I considered was converting the tiles into merged rectangles which would also alleviate this problem. However, that method seemed to require much more code so I opted for the more simple approach.

Not being an extreme authority on math, I wouldn't be suprised if there are more efficient methods than I've described here. If you've got a better way or can find an issue with my solution I'd love to hear it!

[1]: http://www.wizardslizard.com/ "A Wizard's Lizard"
[2]: http://www.lostdecadegames.com/lostcast-78/ "Lostcast 78: Separation Axis Feeling"
[3]: http://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
[4]: /media/images/misc/sat-collision-diagram.png "Problematic collision with multiple tiles"
