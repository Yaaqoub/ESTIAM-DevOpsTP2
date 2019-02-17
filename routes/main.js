let express = require('express'),
    router = express.Router();

let mainController = require('../controllers/mainController');

/**
 * (POST Method)
 */

router.get('/', mainController.main);


module.exports = router;
