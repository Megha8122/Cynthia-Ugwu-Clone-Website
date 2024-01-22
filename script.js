// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

function firstPageAnime(){
    var tl = gsap.timeline();

    tl.from('#nav', {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".bounding-element",{
        y:0,
        ease:Expo.easeInOut,
        duration: 2,
        delay: -1.5,
        stagger: 0.1
    })
    .to(".bounding-element-1",{
        y:0,
        ease:Expo.easeInOut,
        duration: 2,
        delay: -1.5,
        stagger: 0.1
    })
    .from("#herofooter",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,        
        delay: -1,
    })
}

var timeout;


function circleAnime(){
    // define default scale value
    var xScale = 1;
    var yScale = 1;
    var xPrev = 0;
    var yPrev = 0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);

        var xDiff = dets.clientX - xPrev;
        var yDiff = dets.clientY - yPrev;

        xPrev = dets.clientX;
        yPrev = dets.clientY;

        xScale = gsap.utils.clamp(.8,1.8, xDiff);
        yScale = gsap.utils.clamp(.8,1.8, yDiff);

        circleMouseFollower(xScale,yScale);
        timeout = setTimeout(function(){
            document.querySelector('#mini-circle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        })
    })
}

function circleMouseFollower(xScale,yScale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#mini-circle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScale}, ${yScale})`;
        document.querySelector('#mini-circle').style.margin = `-8px`;
    })
}

document.querySelectorAll(".element").forEach(function(element){
    var rotate = 0;
    var diffRot = 0;

    element.addEventListener("mouseleave", function(dets){
        
        gsap.to(element.querySelector("img"),{
            opacity:0,
            ease:Power3,
        })
    })

    element.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - element.getBoundingClientRect().top;
        diffRot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(element.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffRot * 0.5),
        });
    });
});

circleAnime();
circleMouseFollower();
firstPageAnime();