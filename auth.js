const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
var { User } = require("./model/user");

const createJWT = async (payload) => {
  var token = jwt.sign(payload, secret);
  return token;
};

const authVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) throw new Error("Token can't be null");
    let payload = jwt.verify(token, secret);
    const user = await User.findOne({
      where: { user_id: payload.user_id },
    });
    if (!user) throw new Error();
    next();
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 401,
      message: "Please authenticate",
    });
  }
};
const hashing = async (value) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value, salt);
    return hash;
  } catch (error) {
    return error;
  }
};

const hashCompare = async (value, hash) => {
  try {
    return await bcrypt.compare(value, hash);
  } catch (error) {
    return error;
  }
};

module.exports = { hashing, hashCompare, createJWT, authVerify };
