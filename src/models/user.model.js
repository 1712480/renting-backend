module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING(45)
        },
        phone: {
            type: Sequelize.STRING(11)
        },
        email: {
            type: Sequelize.STRING(45),
            unique: true
        },
        password: {
            type: Sequelize.STRING(100)
        },
        role: {
            type: Sequelize.INTEGER
        }
    });

    return User;
}