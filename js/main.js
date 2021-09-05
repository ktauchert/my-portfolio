const about = document.querySelector('#about')
const contact = document.querySelector('#contact')
const aboutContent = document.querySelector('#about-content')
const contactContent = document.querySelector('#contact-content')

const ahp = document.querySelector('#ahp');
const ahpContent = document.querySelector('#ahp-content');
const asik = document.querySelector('#asik');
const asikContent = document.querySelector('#asik-content');
const manuthetic = document.querySelector('#manuthetic');
const manutheticContent = document.querySelector('#manuthetic-content');
const openDarkness = document.querySelector('#open-darkness');
const openDarknessContent = document.querySelector('#open-darkness-content');
const diverse = document.querySelector('#diverse');
const diverseContent = document.querySelector('#diverse-content');

const impressum = document.querySelector('#impressum');
const impressumContent = document.querySelector('#impressum-content');

const games = document.querySelector('#games');
const gamesContent = document.querySelector('#games-content');

const colorFocusOne = '#00aa00';
const colorFocusTwo = '#4444f8';
const colorBlur = '#777';

let windowWidth = '400px';
let windowHeight = '400px';
let windowTop = 50;
let windowRight = 50;
let windowBottom = 50;
let windowLeft = 50;


about.addEventListener('click', () => {
    const aboutBox = new WinBox({
        title: 'Über mich',
        width: windowWidth,
        height: windowHeight,
        top: windowTop,
        right: windowRight,
        bottom: windowBottom,
        left: windowLeft,
        mount: aboutContent,
        onfocus: function () {
            this.setBackground(colorFocusOne);
        },
        onblur: function () {
            this.setBackground(colorBlur);
        },

    })
})
contact.addEventListener('click', () => {
    const contactBox = new WinBox({
        title: 'Kontaktiere mich',
        width: windowWidth,
        height: windowHeight,
        top: windowTop,
        right: windowRight,
        bottom: windowBottom,
        left: windowLeft,
        mount: contactContent,
        onfocus: function () {
            this.setBackground(colorFocusOne);
        },
        onblur: function () {
            this.setBackground(colorBlur);
        },
    })
})

ahp.addEventListener('click', () => {
    const ahpBox = new WinBox({
        title: 'AHP-Plattform',
        width: windowWidth,
        height: windowHeight,
        top: windowTop,
        right: windowRight,
        bottom: windowBottom,
        left: windowLeft,
        mount: ahpContent,
        onfocus: function () {
            this.setBackground(colorFocusTwo);
        },
        onblur: function () {
            this.setBackground(colorBlur);
        },
    })
})
asik.addEventListener('click', () => {
    const asikBox = new WinBox({
        title: 'ASIK-Tool',
        width: windowWidth,
        height: windowHeight,
        top: windowTop,
        right: windowRight,
        bottom: windowBottom,
        left: windowLeft,
        mount: asikContent,
        onfocus: function () {
            this.setBackground(colorFocusTwo);
        },
        onblur: function () {
            this.setBackground(colorBlur);
        },
    })
})
manuthetic.addEventListener('click', () => {
    const manutheticBox = new WinBox({
        title: 'Manuthetic',
        width: windowWidth,
        height: windowHeight,
        top: windowTop,
        right: windowRight,
        bottom: windowBottom,
        left: windowLeft,
        mount: manutheticContent,
        onfocus: function () {
            this.setBackground(colorFocusTwo);
        },
        onblur: function () {
            this.setBackground(colorBlur);
        },
    })
})
openDarkness.addEventListener('click', () => {
    const openDarknessBox = new WinBox({
        title: 'OpenDarkness',
        background: '#00aa00',
        width: windowWidth,
        height: windowHeight,
        top: windowTop,
        right: windowRight,
        bottom: windowBottom,
        left: windowLeft,
        mount: openDarknessContent,
        onfocus: function () {
            this.setBackground(colorFocusTwo);
        },
        onblur: function () {
            this.setBackground(colorBlur);
        },
    })
})
diverse.addEventListener('click', () => {
    const contentBox = new WinBox({
        title: 'Diverses',
        background: '#00aa00',
        width: windowWidth,
        height: windowHeight,
        top: windowTop,
        right: windowRight,
        bottom: windowBottom,
        left: windowLeft,
        mount: diverseContent,
        onfocus: function () {
            this.setBackground(colorFocusTwo);
        },
        onblur: function () {
            this.setBackground(colorBlur);
        },
    })
})
impressum.addEventListener('click', () => {
    const contentBox = new WinBox({
        title: 'Impressum',
        background: '#00aa00',
        width: '95%',
        height: '95%',
        top: windowTop,
        right: windowRight,
        bottom: windowBottom,
        left: windowLeft,
        mount: impressumContent,
        onfocus: function () {
            this.setBackground(colorFocusTwo);
        },
        onblur: function () {
            this.setBackground(colorBlur);
        },
    })
})
games.addEventListener('click', () => {
    const contentBox = new WinBox({
        title: 'Games',
        background: '#00aa00',
        width: '95%',
        height: '95%',
        top: windowTop,
        right: windowRight,
        bottom: windowBottom,
        left: windowLeft,
        mount: gamesContent,
        onfocus: function () {
            this.setBackground(colorFocusTwo);
        },
        onblur: function () {
            this.setBackground(colorBlur);
        },
    })
})
function screenAdjust() {
    // XS
    if (window.matchMedia('screen and (max-width: 600px)').matches) {
        console.log("media 1");
        windowTop = windowRight = windowBottom = windowLeft = 10;
        windowWidth = '320px';
        windowHeight = '460px';
    }
    if (window.matchMedia('screen and (min-width: 600px)').matches) {
        console.log("media 2");
        windowTop = windowRight = windowBottom = windowLeft = 15;
        windowWidth = '400px';
        windowHeight = '500px';
    }
    if (window.matchMedia('screen and (min-width: 992px)').matches) {
        console.log("media 3");
        windowTop = windowRight = windowBottom = windowLeft = 30;
        windowWidth = '520px';
        windowHeight = '600px';
    }
    if (window.matchMedia('screen and (min-width: 1200px)').matches) {
        console.log("media 4");
        windowTop = windowRight = windowBottom = windowLeft = 60;
        windowWidth = '600px';
        windowHeight = '700px';
    }
}

window.addEventListener('resize', screenAdjust);
// DOM READY
document.addEventListener('DOMContentLoaded', () => {
    screenAdjust();
}, false);



