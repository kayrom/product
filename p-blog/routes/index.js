var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '文一大大个人博客' });
});
/* GET about page. */
router.get('/about', function (req, res, next) {
	res.render('about', {title: '关于我'})
});
/* GET life page. */
router.get('/life', function (req, res, next) {
	res.render('life', {title: '慢生活'})
});
/* GET doing page. */
router.get('/doing', function (req, res, next) {
	res.render('doing', {title: '碎言碎语'})
});
/* GET share page. */
router.get('/share', function (req, res, next) {
	res.render('share', {title: '模板分享'})
});
/* GET learn page. */
router.get('/learn', function (req, res, next) {
	res.render('learn', {title: '学无止境'})
});
/* GET gustBook page. */
router.get('/gustBook', function (req, res, next) {
	res.render('gustBook', {title: '留言板'})
});

module.exports = router;
