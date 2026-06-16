module.exports = (sequelize, DataTypes) => {
  const Oldhighlights = sequelize.define("Oldhighlights", {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
  return Oldhighlights;
};
