var exports = module.exports = {};

// Exported models
let models = require("./../models");

// Call Main model
let Main = models.main;

exports.main = function(req, res) {

    Main.findOne({
        where: {
            theAnchor: 'heavy'
        }
    }).then((theCounter) => {

        return Main.update(
            { counter: (JSON.parse(JSON.stringify(theCounter)).counter + 1) },
            { where: { theAnchor: 'heavy' } }
        );
    }).then(() => {

        return Main.findOne({
            where: {
                theAnchor: 'heavy'
            }
        });
    }).then((updatedRow) => {

        res.render('index', {
            theCounter: JSON.parse(JSON.stringify(updatedRow)).counter
        });
    });
};