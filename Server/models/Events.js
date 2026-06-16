module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define("Events", {
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
    ticketlink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Events;
};
