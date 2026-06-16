const express = require("express");
const router = express.Router();
const db = require("../models");
const Eventnames = db.Eventnames;

function mapBodyToModel(body) {
  return { title: body.title };
}

router.get("/", async (req, res) => {
  try {
    const items = await Eventnames.findAll({ order: [["createdAt", "DESC"]] });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Eventnames.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = mapBodyToModel(req.body);
    if (!data.title) return res.status(400).json({ error: "Missing required fields: title" });
    const created = await Eventnames.create(data);
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = mapBodyToModel(req.body);
    Object.keys(data).forEach(k => data[k] === undefined && delete data[k]);

    const [count] = await Eventnames.update(data, { where: { id: req.params.id } });
    if (count === 0) return res.status(404).json({ updated: false, error: "Not found" });
    const updated = await Eventnames.findByPk(req.params.id);
    res.json({ updated: true, item: updated });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Eventnames.destroy({ where: { id: req.params.id } });
    if (count === 0) return res.status(404).json({ deleted: false, error: "Not found" });
    res.json({ deleted: true });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

module.exports = router;
