var express = require('express');
var router = express.Router();
const request = require('request');

/* Car page. */
router.get('/', async function (req, res, next) {

  let id = req.query.id
  let carList = JSON.parse(await getCarList('http://localhost:3232/api/cars'))
  let ids = carList.map((c) => c.id)
  const foundId = ids.find((e) => e == id)
  if (foundId === undefined) id = 1;
  res.render('cars',
    {
      id: carList[id-1].id,
      title: 'Hero Cars',
      subTitle: 'Hero drives a car!',
      itemList: carList,
      image: 'http://localhost:3232/images/cars/'+carList[id - 1].image,
      name: carList[id - 1].name,
      vote: carList[id - 1].vote
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
