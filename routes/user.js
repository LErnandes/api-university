const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const { check } = require("express-validator");


/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // #swagger.tags = ['User']
    return userController.signup(req, res)
  }
);


/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // #swagger.tags = ['User']
    return userController.login(req, res)
  }
);

/**
 * @method - PUT
 * @description - Update Password LoggedIn User
 * @param - /user
 */

router.put("/password", auth, async (req, res) => {
  /* 
  #swagger.tags = ['User']
  #swagger.security = [{
               "apiKeyAuth": []
        }] 
  */
  return userController.updatePassword(req, res)
});

module.exports = router;
