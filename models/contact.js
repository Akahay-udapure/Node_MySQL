module.exports = (sequelize, Sequelize) => {

    const Otp = sequelize.define("contact", {
        fullname: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        contactNo:{
            type: Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        userId:{
            type:Sequelize.INTEGER
        }
    });


    return Otp;

};