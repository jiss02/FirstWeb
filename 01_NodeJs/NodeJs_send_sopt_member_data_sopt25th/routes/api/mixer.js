var express = require('express');
var router = express.Router();
const path = require('path');
const csv = require('csvtojson');
const Mixer = require('../../module/Mixer');

const csvPath = __dirname + "/../../public/csvs/" 

router.get('/', async (req, res) => {
    try {
      const member = await csv().fromFile(path.join(csvPath, "member.csv"));
      const shuffleJson = Mixer.mix(member);
      res.send(shuffleJson);
    } catch (err) {
      console.log(`err with readCSV: ${err}`);
    }
  });

  
module.exports = router;