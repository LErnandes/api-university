const universityController = require("../controllers/universityController");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();


/**
 * @method - GET
 * @param - /
 * @description - GetAll University
 */
router.get("/", auth, async (req, res) => {
  /* 
  #swagger.tags = ['University']
  #swagger.security = [{
               "apiKeyAuth": []
        }] 
  */
  universityController.getAll(req, res);
});


/**
 * @method - GET
 * @param - /{id}
 * @description - Get University By Id
 */
router.get("/:id", auth, async (req, res) => {
  /* 
  #swagger.tags = ['University']
  #swagger.security = [{
               "apiKeyAuth": []
        }] 
  */
  universityController.getById(req, res);
});


/**
 * @method - POST
 * @param - /
 * @description - University Create
 */
router.post("/", auth, async (req, res) => {
  /* 
  #swagger.tags = ['University']
  #swagger.security = [{
               "apiKeyAuth": []
        }] 
  */
  universityController.create(req, res);
});


/**
 * @method - PUT
 * @param - /{id}
 * @description - Update University By Id
 */
router.put("/:id", auth, async (req, res) => {
  /* 
  #swagger.tags = ['University']
  #swagger.security = [{
               "apiKeyAuth": []
        }] 
  */
  universityController.update(req, res);
});


/**
 * @method - DELETE
 * @param - /{id}
 * @description - Delete University By Id
 */
router.delete("/:id", auth, async (req, res) => {
  /* 
  #swagger.tags = ['University']
  #swagger.security = [{
               "apiKeyAuth": []
        }] 
  */
  universityController.remove(req, res);
});


module.exports = router;
