module.exports = (sequelize, Sequelize) => {

    const Otp = sequelize.define("otp", {
        user_id: {
            type: Sequelize.INTEGER
        },
        otp: {
            type: Sequelize.INTEGER,
        },
    });


    return Otp;

};