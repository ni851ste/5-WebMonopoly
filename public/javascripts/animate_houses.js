//var houseWrapper = document.querySelector('.house-par');
//textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='houseIcon'>$&</span>");

var tl = anime.timeline({loop: false})
tl.add({
    targets: '.house-par .house',
    rotate: {
        value: 360,
        duration: 2000
    },
    translateZ: 0,
    duration: 500,
    delay: function (el, i) {
        return i * 25;
    }
});