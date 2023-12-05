var express = require('express');
var router = express.Router();
const request = require('request');

/* Hero Page. */
router.get('/', async function (req, res, next) {

  const heroList = JSON.parse(await getHeroList('http://localhost:3232/api/heroes'))

  res.render('heroes',
    {
      title: 'Heroes',
      subTitle: 'Hero list',
      heroList: heroList,
    });
});

function getHeroList(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = router;
