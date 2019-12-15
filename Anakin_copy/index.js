//TODOS: check the gsap and scrollmagic
// how to use timelineMax

gsap.registerPlugin(CSSRulePlugin)
const controller = new ScrollMagic.Controller()

const rangeDetection = (ele, callback) => {
    const element = document.querySelectorAll(ele)[0].getBoundingClientRect()
    Yposition = element.top
    console.log(ele,element)
    const Y1 = window.pageYOffset + Yposition
    console.log(window.pageYOffset, Y1)
    if( window.pageYOffset >= Y1){
        console.log("animation is about to be removed")
        callback();
        console.log("animation is removed")
    }
}

const yellowCrossTween = gsap.fromTo(".intro .yellow_cross", {scale: 0}, {scale: 1, duration: 1})

const yellowCrossScence = new ScrollMagic.Scene({
                            triggerElement: ".intro .yellow_cross"
                        })
                        .setTween(yellowCrossTween)
                        .addTo(controller)


const taglineTween = gsap.timeline()
taglineTween.staggerFrom(".tagline h1", 0.5, {y: 200}, 0.3)
taglineTween.staggerFrom(".tagline p", 0.5, {y: 200}, 0.3)
taglineTween.staggerFrom(".tagline div", 0.5, {y: 200}, 0.3)

const taglineScence = new ScrollMagic.Scene({
                        triggerElement: ".summary-column"
                    })
                    .setTween(taglineTween)
                    .addTo(controller)

const feedTween = gsap.timeline()
feedTween.staggerFrom(".left-1--item-1", 0.7, {y: 500}, 0.3)
feedTween.staggerFrom(".left-1--item-2", 0.7, {y: 500}, 0.3)
feedTween.staggerFrom(".feed--right-2", 0.7, {y: 500}, 0.3)
feedTween.staggerFrom(".left-2--item-1", 0.7, {y: 500}, 0.3)
feedTween.staggerFrom(".left-2--item-2", 0.7, {y: 500}, 0.3)
feedTween.staggerFrom(".left-2--item-3", 0.7, {y: 500}, 0.3)

const feedScence = new ScrollMagic.Scene({
                        triggerElement: ".case_studies--more_info"
                  })
                  .setTween(feedTween)
                  .addTo(controller)

const sliceTween = gsap.timeline()
sliceTween.staggerFrom(".slice-1", 0.5, {opacity: 0}, 0.3)
sliceTween.staggerFrom(".slice-2", 0.5, {opacity: 0}, 0.3)
sliceTween.staggerFrom(".slice-3", 0.5, {opacity: 0}, 0.3)
sliceTween.staggerFrom(".slice-4", 0.5, {opacity: 0}, 0.3)
const sliceScence = new ScrollMagic.Scene({
                    triggerElement: ".slice"
                  })
                   .setTween(sliceTween)
                   .addTo(controller)


window.addEventListener("scroll",()=>{
    rangeDetection(".tagline h1", ()=> {
        yellowCrossScence.remove()
    })
    rangeDetection(".feature_works", ()=>{
        taglineScence.remove()
    })
    rangeDetection(".footer--logo", ()=>{
        feedScence.remove()
    })
    rangeDetection(".footer--logo", ()=>{
        sliceScence.remove()
    })
},false)


function initAnimation (){
    gsap.fromTo(".lazyloaded", {opacity:0}, {opacity:1, duration: 1})
}

initAnimation()