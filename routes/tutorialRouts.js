const tutorialController = require('../controller/TutorialController');
const router = require('express').Router();
const authController = require('../controller/authController');
//crate a new tutorial

router.post('/',tutorialController.create);

// Retrieve all tutorials

router.get("/",tutorialController.findAll);

//Retrieve all published tutorials

router.get('/published',tutorialController.findAllPublished);

//Retrieve a single tutorial with id

router.get("/:id",tutorialController.findOne);

//update a tutorial with id

router.put('/:id',tutorialController.update);

// delete a tutorial with id

router.delete("/:id",tutorialController.delete);

// delete all the tutorials
router.delete("/",tutorialController.deleteAll);


module.exports = router;