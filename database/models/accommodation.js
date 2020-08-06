const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      accommodation.belongsTo(models.user, {
        foreignKey: 'owner',
        as: 'author',
        onDelete: 'CASCADE',
      });

      return accommodation;
    }
  }
  accommodation.init({
    name: DataTypes.STRING,
    dateTime: DataTypes.DATE,
    point: DataTypes.DOUBLE,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    address: DataTypes.STRING,
    area: DataTypes.INTEGER,
    water: DataTypes.INTEGER,
    electric: DataTypes.INTEGER,
    owner: DataTypes.INTEGER,
    images: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'accommodation',
  });
  return accommodation;
};
