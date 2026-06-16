const express = require("express");
const router = express.Router();
const db = require("../models");
const EducationalEvents = db.EducationalEvents;

function mapBodyToModel(body) {
  return {
    title: body.title,
    date: body.date,
    venue: body.venue,
    decription: body.decription ?? body.description,
    time: body.time,
    formlink: body.formlink,
    Image: body.Image ?? body.image,
  };
}

router.get("/", async (_req, res) => {
  try {
    const items = await EducationalEvents.findAll({ order: [["createdAt", "DESC"]] });
    res.json(items);
  } catch (err) {
    console.error("EducationalEvents GET / error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await EducationalEvents.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    console.error("EducationalEvents GET /:id error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = mapBodyToModel(req.body);

    const missing = [];
    if (!data.title) missing.push("title");
    if (!data.venue) missing.push("venue");
    if (!data.decription) missing.push("description");
    if (!data.Image) missing.push("image");
    if (!data.formlink) missing.push("formlink");
    if (missing.length) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    const created = await EducationalEvents.create(data);
    res.status(201).json(created);
  } catch (err) {
    console.error("EducationalEvents POST error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = mapBodyToModel(req.body);

    Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);

    const [count] = await EducationalEvents.update(data, { where: { id: req.params.id } });
    if (count === 0) return res.status(404).json({ updated: false, error: "Not found" });

    const updated = await EducationalEvents.findByPk(req.params.id);
    res.json({ updated: true, item: updated });
  } catch (err) {
    console.error("EducationalEvents PUT error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await EducationalEvents.destroy({ where: { id: req.params.id } });
    if (count === 0) return res.status(404).json({ deleted: false, error: "Not found" });
    res.json({ deleted: true });
  } catch (err) {
    console.error("EducationalEvents DELETE error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

module.exports = router;
