---
title: "Gloomstone Devlog #1"
description: "The first development log for Gloomstone, my first-person dungeon crawling game engine."
keywords: gloomestone, gamedev, devlog
image: /media/images/gloomstone/gloomstone-1200x630.png
date: 2023-07-02 12:00:00
layout: post.njk
tags:
  - post
  - gamedev
  - devlog
  - feature
---

## What the heck is "Gloomstone"?

[![Gloomstone](/media/images/gloomstone/gloomstone.png)](/media/images/gloomstone/gloomstone.png)

"Gloomstone" is the working title for my in-progress first-person dungeon crawling game engine. Development is rather slow, being a side-project, but I've been making more visible progress lately. I'm trying to spend a few hours each week pushing it forward.

The engine is written in [TypeScript](https://www.typescriptlang.org) and uses [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) to render. My goal is to have as few dependencies as possible. As such, there are zero run-time dependencies, and only a few build-time dependencies: TypeScript, [esbuild](https://esbuild.github.io), and [Prettier](https://prettier.io).

Architecturally, the engine is a "pure" [Entity component system](https://en.wikipedia.org/wiki/Entity_component_system). "Pure", to me, means that components have no behavior and systems have no state. Since classes are the very definition of coupling state and behavior, the `class` keyword does not appear anywhere in the source code. Of course this decision has trade-offs, and it's been an interesting exercise.

## Tiled Integration

[![Editing a level in Tiled](/media/images/gloomstone/tiled.png)](/media/images/gloomstone/tiled.png)

From the beginning of this project, I decided that [Tiled](https://www.mapeditor.org), a free and open source map editor, would be the source of truth for as much game data as possible. This helps strengthen the divide between source code and data, which I find to be in service of my architectural goals.

Whenever possible, I try to ensure that Tiled's basic features, such as ad-hoc objects with a sprite, work out of the box and as expected in the engine.

Tiled's [Custom Types](https://doc.mapeditor.org/en/stable/manual/custom-properties/#custom-types) are used to define components, and [Templates](https://doc.mapeditor.org/en/stable/manual/using-templates/) for prefabricated entities.

## Doors

[![Door mechanism](/media/images/gloomstone/door.gif)](/media/images/gloomstone/door.gif)

After implementing basic collision with the static walls, I wanted to add some button and door mechanics to make the world more interactive.

Buttons and doors are decoupled: Buttons respond to an interaction by sending a signal to a target entity (which is defined in Tiled). A door is a receiver of this signal and takes care of toggling and animating its state.

(The button is not currently visualized in the gif above, but exists on the wall tile with the sewer grate.)

## Floor Entities

[![Blood floor entity](/media/images/gloomstone/blood.png)](/media/images/gloomstone/blood.png)

This was a simple feature, allowing entities be laid flat as well as upright. Useful for ambiance (like the blood puddle above), floor traps, etc.

## Spikes

[![Spike mechanism](/media/images/gloomstone/spike.gif)](/media/images/gloomstone/spike.gif)

Spikes are a nice example of some composite behavior. They include a floor entity for the spike chamber, and a billboard entity which receives a toggle signal (much like the previously mentioned doors). To drive the interval, I added a "timer" component which sends a signal every `N` milliseconds to a target entity (in this case, itself).

There's a draw ordering bug when the spike retreats into its chamber, but overall I'm happy with the effect.
