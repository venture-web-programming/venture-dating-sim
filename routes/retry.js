const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');

router.get('/:turn', setAuth, async (req, res) => {
  const user = req.user;
  const { turn } = req.params;
  const remainTurn = 5 - turn;

  const message = '시작 능력치가 새롭게 설정되었습니다!';

  if (1 <= turn && turn <= 5) {
    user.str = Math.floor(Math.random() * 11) + 5;
    user.def = Math.floor(Math.random() * 11) + 5;
  } else {
    return res.status(404).send({ error: '능력치를 재설정 할 수 없습니다.' });
  }

  await user.save();

  const userInfo = {
    str: user.str,
    def: user.def,
  };

  res.send({ remainTurn, message, userInfo });
});

module.exports = router;
