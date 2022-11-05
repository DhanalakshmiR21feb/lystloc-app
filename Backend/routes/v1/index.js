const express = require("express");
const router = require("express").Router();
const {
    genToken,
    postUser
} = require("../../Controllers/users.controller");
router.get("/generateToken", genToken);
router.post("/createUser", postUser);

module.exports = router;