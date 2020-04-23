# Animate (On Scroll)

<!-- toc: index.md ref: animate -->

[Index](docs/index#animate) - [Back](back) - [Github](https://github.com/wizdmio/wizdm/tree/master/libs/animate)

Animate is a package providing a directive-like component designed to animate its transcluded content. The animation can be selected among a series of attention seekers, entrances and exists inspired by the famous [Animate.css](https://daneden.github.io/animate.css/). The main purpose of the package, however, is to trigger the selected animation when the element is scrolling into the view.  

## Usage example
Start by adding the `wmAnimate` directive to the element you want to animate. The `aos` flag is then used to enable the "Animate On Scroll" triggering mechanism: 

``` html
<section wmAnimate="landing" aos> 
  My animated content goes here
</section>
```

## Supported animations
Animations are grouped in three catetgories: Attention seekers, Entrances and Exists.
* Attention seekers: `'beat'|'bounce'|'flip'|'headShake'|'heartBeat'|'jello'|'pulse'|'rubberBand'|'shake'|'swing'|'tada'|'wobble'`
* Entrances: `'bumpIn'|'bounceIn'|'bounceInDown'|'bounceInLeft'|'bounceInUp'|'bounceInRight'|'fadeIn'|'fadeInRight'|'fadeInLeft'|'fadeInUp'|'fadeInDown'|'flipInX'|'flipInY'|'jackInTheBox'|'landing'|'rollIn'|'zoomIn'|'zoomInDown'|'zoomInLeft'|'zoomInUp'|'zoomInRight'`
* Exists: `'bounceOut'|'bounceOutDown'|'bounceOutUp'|'bounceOutRight'|'bounceOutLeft'|'fadeOut'|'fadeOutRight'|'fadeOutLeft'|'fadeOutDown'|'fadeOutUp'|'hinge'|'rollOut'|'zoomOut'|'zoomOutDown'|'zoomOutRight'|'zoomOutUp'|'zoomOutLeft'`

## Trigger
The animation will trigger as soon as the component renders if not specified otherwise. 

### Replay
The animation can be triggered again using the `replay` input. Every change in this input value will trigger the animation again provided the value can be coerced into a truthful boolean. Use the `paused` flag to prevevnt the animation from triggering at first, so, you'll get the full control about when the triggering will happen.  

### Animate On Scroll
Setting the `aos` flag enables the "Animate On Scroll" mechanism with a default threshold of `0.5`, so, the animation triggers as soon as the 50% of the element area intersects the viewport area. The triggering threshold can be customized setting the `aos` input to a different numeric value from `0` (escluded) up to `1` (included). Setting `aos=0` disables the trigger. 

When the element scrolls out completely, the trigger resets, so, the animation will trigger as soon as the element enters the visible portion of the viewport again. Use the `once` flag to prevent the trigger to reset, so, the animation will run just once.

## Timing
By default every animation applies the optimal timing. However, timing can be overridden with the `speed` input. Possible values are:
* `slower`: running the animation with a 3s timing
* `slow`: running the animation with a 2s timing
* `normal`: running the animation with a 1s timing
* `fast` : running the animation with a 500ms timing
* `faster`: running the animation with a 300ms timing 

Additionally, the animation can be delayed using `delay` input. The input accepts both a string describing the delay such as '1s' or '250ms' or a number that will be considered a delay expressed in **ms**.

## Reference


## Resources

Read [Animate On Scroll in Angular](https://medium.com/wizdm-genesys/animate-on-scroll-in-angular-330efd05ebec) on Medium.

[Back](back)

[Home](home)