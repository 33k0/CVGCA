const express = require("express");
const router = express.Router();
const db = require("../models");
const Sponsors = db.Sponsors;

router.get("/", async (req, res) => {
  const listofsponsors = await Sponsors.findAll();
  res.json(listofsponsors);
});

router.post("/", async (req, res) => {
  try {
    const images = req.body.imageUrl || req.body.images;
    const { link } = req.body;
    if (!images || !link) {
      return res.status(400).json({ error: "images and link are required" });
    }
    const sponsor = await Sponsors.create({ images, link });
    res.status(201).json(sponsor);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { images, link } = req.body;
    const [n] = await Sponsors.update({ images, link }, { where: { id } });
    res.json({ updated: n > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const n = await Sponsors.destroy({ where: { id } });
    res.json({ deleted: n > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

module.exports = router;
