module.exports = function(sequelize, Sequelize) {

    return sequelize.define('main', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },

        theAnchor: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        counter: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }
    },{
        underscored: true
    });
};