var express = require('express');
var router = express.Router();

const util = require('../module/util/util');
const rm = require('../module/util/resmsg');
const postController = require('../controller/postController');

const NAME = "블로그"

router.post('/', (req, res)=>{
  const { title, content } = req.body;
  postController.create({title, content})
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

router.get('/', (req, res)=> {
  postController.readAll()
    .then((posts)=> {
      res.status(200)
      .json(util.success(rm.X_READ_ALL_SUCCESS(NAME), posts))
    })
    .catch((e)=>{
      console.log(e);
      res.status(err.status || 500)
      .send(util.fail(err.massage));
    });
})


module.exports = router;
