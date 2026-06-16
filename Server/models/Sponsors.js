module.exports = (sequelize, DataTypes) => {
  const Sponsors = sequelize.define("Sponsors", {
    images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Sponsors;
};
