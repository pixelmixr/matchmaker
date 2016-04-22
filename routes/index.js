var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/partial/:name', function(req, res, next) {
  res.render('partial/' + req.params.name);
});

router.get('*', function(req, res, next) {
  res.render('index')
})

module.exports = router;
