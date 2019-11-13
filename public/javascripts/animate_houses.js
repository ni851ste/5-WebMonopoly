var tl = anime.timeline({loop: false, duration: 300})
tl.add({
    targets: '.house-par .house',
    rotate: {
        value: 360
    },
    scale: {
        value: 1.5,
        easing: 'easeInOutQuart'
    },
    translateZ: 0
}).add({
    targets: '.house-par .house',
    rotate: {
        value: 360,
        direction: 'reverse'
    },
    scale: {
        value: 1,
        easing: 'easeInOutQuart'
    }
});