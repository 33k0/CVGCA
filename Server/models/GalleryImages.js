module.exports = (sequelize, DataTypes) => {
  const GalleryImages = sequelize.define('GalleryImages', {

    image: { type: DataTypes.STRING, allowNull: false },

    galleryEventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'GalleryEvents', key: 'id' },
    },
  });

  GalleryImages.associate = (models) => {
    models.GalleryImages.belongsTo(models.GalleryEvents, {
      as: 'galleryEvent',
      foreignKey: { name: 'galleryEventId', allowNull: false },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return GalleryImages;
};
