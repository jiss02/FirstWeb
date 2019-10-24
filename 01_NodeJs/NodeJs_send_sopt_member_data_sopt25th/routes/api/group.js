var express = require('express');
var router = express.Router();
const path = require('path');
const csv = require('csvtojson');


const csvPath = __dirname + "/../../public/csvs/";

router.get('/', (req, res) => {
  try{
    // 세미나에서 배운 방식
    csv()
    .fromFile(path.join(csvPath, 'member.csv'))
    .then((jsonObj)=>{
      if (!jsonObj) {
        console.log(`file read err: ${err}`);
      }
      res.send(jsonObj);
    });
  } catch (err) {
    console.log(`err with readCSV: ${err}`);
  }
});

// 솝트 25기 서버파트 윤재님의 코드를 참고하였습니다. 좋은 코드 감사합니다!
router.get('/:groupidx', async (req, res) => {
  try {
    const member = await csv().fromFile(path.join(csvPath, "member.csv"));
    const group = await csv().fromFile(path.join(csvPath, "group.csv"));
    const index = req.params.groupidx;

    if (!member || !group) console.log(`file read err: ${err}`);

    // 새로운 객체로 만들어 주었습니다.
    const currentGroup = group.filter(data => data.groupIdx === index)[0].name;
    const stringMember = member
      .filter(data => data.groupIdx === index)
      .map(data => {
        const convert = {
          name: data.name,
          groupIdx: currentGroup,
        }
        return convert
      });
    res.send(stringMember)
  } catch (err) {
    console.log(`err with readCSV: ${err}`)
  }
});

module.exports = router;