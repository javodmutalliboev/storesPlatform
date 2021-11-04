const express = require('express');
require("dotenv").config();
const router = express.Router();
const jwt = require("jsonwebtoken");
const Store = require('../models/store');
const checkAuth = require('../middleware/check-auth');

router.post("/login", (req,
                       res, next) => {
  if (req.body.ad !== process.env.USER_NAME) {
    return res.status(401).json({
      message: 'Invalid authentication credentials!'
    });
  } else if (req.body.password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      message: 'Invalid authentication credentials!'
    });
  } else {
    const token = jwt.sign({admin: process.env.USER_NAME, userId: process.env.USER_ID},
      'secret_this_should_be_longer',
      {
        expiresIn: '1h'
      });
    res.status(200).json({
      token: token,
      expiresIn: 3600
    });
  }
});

router.post('/create', checkAuth, (req,
                        res, next) => {
  const store = new Store({
    deleted: req.body.deleted,
    location: {lat: req.body.location.lat, long: req.body.location.long},
    title: req.body.title,
    description: req.body.description
  });
  store.save().then(createdStore => {
    res.status(201).json({
      message: 'Store added successfully!',
      storeId: createdStore._id
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Creating a store failed!'
    });
  });
});

router.put('/update/:id', checkAuth, (req,
                           res, next) => {
  const store = new Store({
    _id: req.body.id,
    deleted: req.body.deleted,
    location: req.body.location,
    title: req.body.title,
    description: req.body.description
  });
  Store.updateOne({_id: req.params.id}, store).then(result => {
    res.status(200).json({message: 'Update successful!'});
  }).catch(error => {
    res.status(500).json({
      message: 'Couldn\'t update store!'
    });
  });
});

router.get('/stores', checkAuth, (req,
                       res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const storeQuery = Store.find({deleted: false});
  let fetchedStores;
  if (pageSize && currentPage) {
    storeQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  storeQuery.then(documents => {
    fetchedStores = documents;
    return Store.count({deleted: false});
  }).then(count => {
    res.status(200).json({
      message: 'Stores fetched successfully!',
      stores: fetchedStores,
      maxStores: count
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching stores failed!'
    });
  });
});

router.get('/get/:id', checkAuth, (req,
                        res, next) => {
  Store.findById(req.params.id).then(store => {
    if (store) {
      res.status(200).json({store: store});
    } else {
      res.status(404).json({message: 'Store not found!'})
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching store failed!'
    });
  });
});

router.patch("/delete/:id", checkAuth, async (req,
                              res, next) => {
  try {
    const result = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({store: result});
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
