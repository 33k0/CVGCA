const express = require("express");
const router = express.Router();

const db = require("../models");
const { GalleryEvents, Eventnames } = db;

function bodyToEvent({ title, date, image, drivelink }) {
  return { title, date, image, drivelink };
}

router.get("/", async (_req, res) => {
  try {
    const rows = await GalleryEvents.findAll({ order: [["createdAt", "DESC"]] });
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const row = await GalleryEvents.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = bodyToEvent(req.body);

    const missing = [];
    if (!data.title) missing.push("title");
    if (!data.date) missing.push("date");
    if (!data.image) missing.push("image");
    if (!data.drivelink) missing.push("drivelink");
    if (missing.length) {
      return res
        .status(400)
        .json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    const exists = await Eventnames.findOne({ where: { title: data.title } });
    if (!exists) {
      return res
        .status(400)
        .json({ error: `Title "${data.title}" is not in Eventnames` });
    }

    const created = await GalleryEvents.create(data);
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const patch = bodyToEvent(req.body);

    Object.keys(patch).forEach((k) => patch[k] === undefined && delete patch[k]);

    if (patch.title) {
      const exists = await Eventnames.findOne({ where: { title: patch.title } });
      if (!exists) {
        return res
          .status(400)
          .json({ error: `Title "${patch.title}" is not in Eventnames` });
      }
    }

    const [count] = await GalleryEvents.update(patch, { where: { id: req.params.id } });
    if (count === 0) return res.status(404).json({ updated: false, error: "Not found" });

    const updated = await GalleryEvents.findByPk(req.params.id);
    res.json({ updated: true, item: updated });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await GalleryEvents.destroy({ where: { id: req.params.id } });
    if (!count) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

module.exports = router;
