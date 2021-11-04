const express = require('express');
const router = express.Router();
const Store = require('../models/store');

router.get('/get',(req,
                                  res, next) => {
  const storeQuery = Store.find({deleted: false});
  let fetchedStores;
  storeQuery.then(documents => {
    fetchedStores = documents;
    return Store.count({deleted: false});
  }).then(count => {
    res.status(200).json({
      message: 'Stores fetched successfully!',
      stores: fetchedStores,
      maxStores: count
    });
  });
});

module.exports = router;
