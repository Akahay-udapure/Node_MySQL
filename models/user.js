module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {

        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
        mobile: {
            type: Sequelize.STRING,
            unique: true,
        },

    });
    return User;

};