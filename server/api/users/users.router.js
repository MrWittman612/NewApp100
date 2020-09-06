const express = require('express');
const router = express.Router();
const User = require('../users/User.model');

const me = async (req, res) => res.status(200).send(req.user);
/* GET users listing. */
router.get('/', me);

module.exports = router;
