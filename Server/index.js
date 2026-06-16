const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const db = require("./models");

app.use("/sponsors", require("./Routes/Sponsors"));
app.use("/upload", require("./Routes/Uploads"));
app.use("/featuredevent", require("./Routes/FeaturedEvent"));
app.use("/oldhighlights", require("./Routes/Oldhighlights"));
app.use("/photostack", require("./Routes/Photostack"));
app.use("/events", require("./Routes/Events"));
app.use("/educationalevents", require("./Routes/EducationalEvents"));
app.use("/blogs", require("./Routes/Blog"));
app.use("/eventnames", require("./Routes/Eventnames"));
app.use("/galleryimages", require("./Routes/GalleryImages"));
app.use("/galleryevents", require("./Routes/GalleryEvents"));

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
