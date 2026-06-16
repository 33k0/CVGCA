module.exports = (sequelize, DataTypes) => {
  const EducationalEvents = sequelize.define("EducationalEvents", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    decription: {
      type: DataTypes.TEXT('medium'),
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    formlink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return EducationalEvents;
};
