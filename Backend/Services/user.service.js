const { tokenService } = require("../Services/token.service");
const { User } = require("../Models/users.model");
const { Token } = require("../Models/token.model");
/**
* {
 *  "user": {
 *      "_id": "5f71b31888ba6b128ba16205",
 *      "username": "user",
 *      "email": "user@gmail.com",
 *      "password": "abc",
 *      "createdAt": "2020-09-28T09:55:36.358Z",
 *      "updatedAt": "2020-09-28T09:55:36.358Z",
 *      "__v": 0
 *  },
 *  "tokens": {
 *      "access": {
 *          "token": "eyJhbGciOiJIUz....",
 *          "expires": "2020-10-22T09:29:01.745Z"
 *      }
 *  }
 *}
 *
 */
 const register = (async (req, res) => {
    const user = await User.Create(req.body);
    await user.save();
   // const tokens = await tokenService.generateAuthTokens(user);
    res.status(201).send({ user});
    return user;
  });
  const gToken=(async (req, res) => {
    const token = await Token.generateAuthTokens();
    await token.save();
    res.status(201).send({ token});
    return token;
  });
  module.exports = {register,gToken}