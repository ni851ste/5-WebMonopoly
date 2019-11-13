var textWrapper = document.querySelector('.infoText-div .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var tl = anime.timeline({loop: false})
tl.add({
    targets: '.infoText-div .letter',
    translateY: ["1.2em", 0],
    translateZ: 0,
    duration: 500,
    delay: function (el, i) {
        return i * 25;
    }
});