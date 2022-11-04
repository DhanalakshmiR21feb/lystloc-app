const express = require("express");
const router = require("express").Router();
const {
    postUser
} = require("../../Controllers/users.controller");

router.post("/createUser", postUser);

module.exports = router;