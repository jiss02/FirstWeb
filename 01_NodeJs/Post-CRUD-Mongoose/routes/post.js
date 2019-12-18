var express = require('express');
var router = express.Router();

const util = require('../module/util/util');
const rm = require('../module/util/resmsg');
const postController = require('../controller/postController');

const NAME = "블로그"

router.post('/', async (req, res, next)=>{
  const { title, content } = req.body;
  await postController.create({title, content})
    .then((data)=>{
      res.status(201)
      .json(util.success(rm.X_CREATE_SUCCESS(NAME), data))
    })
    .catch((e)=>{
      console.log(e);
      res.status(err.status || 500)
      .send(util.fail(err.massage));
    });
});


module.exports = router;
