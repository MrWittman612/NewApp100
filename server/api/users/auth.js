const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./users/User.model');

const config = require('../config/keys');

const newToken = (user) =>
  jwt.sign({ id: user.id }, config.jwt, {
    expiresIn: config.jwtExp,
  });

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    jwt.verify(token, config.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

const login = async (req, res) => {
  let request = req.body;
  const { email, password } = request;
  if (!email || !password) {
    return res.status(400).send({ msg: 'Email and password required' });
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ msg: 'Please Register' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (error) {
    return res.status(500).end();
  }
};

exports.login = login;

const register = async (req, res) => {
  let request = req.body;
  const { email, password, name } = request;
  console.log('request', request);

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password required' });
  }

  const invalid = { message: 'Invalid email and passoword combination' };

  try {
    const user = await User.findOne({ email: email }).select('email').exec();

    if (user) {
      return res.status(400).send({ message: 'You have a account all ready' });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hash,
    };

    const createUserResponse = User.create(newUser);

    const freshToken = newToken(createUserResponse);

    return res.status(200).send({ freshToken });
  } catch (e) {
    return res.status(500).send(invalid);
  }
};

exports.register = register;

const protectedRoute = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }
  const token = bearer.split('Bearer ')[1].trim();
  if (!token) {
    return res.status(401).end();
  }
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (error) {
    return res.status(401).end();
  }
  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();
  if (!user) {
    return res.status(401).end();
  }
  req.user = user;
  return next();
};

exports.protectedRoute = protectedRoute;
