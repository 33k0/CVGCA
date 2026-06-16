module.exports = (sequelize, DataTypes) => {
  const Eventnames = sequelize.define("Eventnames", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Eventnames;
};
