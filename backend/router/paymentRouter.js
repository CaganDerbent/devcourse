const express = require("express")
const Router = express.Router()
const requireAuth = require("../middleware/requireAuth")

const {payment} = require("../controller/paymentController")

Router.post("/payments",requireAuth,payment)

module.exports = Router;