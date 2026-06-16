module.exports = (sequelize, DataTypes) => {
  const GalleryEvents = sequelize.define("GalleryEvents", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drivelink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

   GalleryEvents.associate = (models) => {
    models.GalleryEvents.hasMany(models.GalleryImages, {
      as: 'images',
      foreignKey: { name: 'galleryEventId', allowNull: false },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return GalleryEvents;
};
