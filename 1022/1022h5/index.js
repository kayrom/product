var $ = require('anima-yocto');
var Swiper = require('./components/swiper');
var lazyload = require('./components/lazyload');

var swiper = new Swiper('#slider', {
  pagination: '.swiper-pagination',
  autoplay: 2500,
  autoplayDisableOnInteraction: false,
  loop: true
});

lazyload.init('.lazy');
