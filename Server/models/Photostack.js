module.exports = (sequelize, DataTypes) => {
  const Photostack = sequelize.define("Photostack", {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
  return Photostack;
};
