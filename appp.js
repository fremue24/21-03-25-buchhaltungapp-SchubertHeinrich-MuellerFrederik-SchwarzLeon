const { link } = require('fs');

const navigationSlide = () => {
    const burger = document.querySelector('.burger');
    const navigation = document.querySelector('.navigation-links');
    const navigationLinks = document.querySelectorAll('.navigation-links li');


    burger.addEventListener('click', () => {
        //Toggle Navigation
        navigation.classList.toggle('navigation-active');

        //Animate Links
        navigationLinks.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation = ''
            } else {
                link.style.animation = 'navigationLinkFade 0.5s ease forwards ${index / 7 + 1.5}s';
            }
        });
        //Burger Animation
        burger.classList.toggle('toggle');
    });

}


navigationSlide();


const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  if(!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
});