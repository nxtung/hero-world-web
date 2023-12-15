var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', async function (req, res, next) {

  let carList = JSON.parse(await getCarList('http://localhost:3232/api/cars'))
  
  res.render('index',
    {
      title: '  Dashboard',
      subTitle: 'Dashboard',
      itemList: carList,
      image: carList[0].image,
      name: carList[0].name,
      vote: 12
    });
});

function getCarList(url) {
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
