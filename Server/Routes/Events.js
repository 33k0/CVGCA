const express = require("express");
const router = express.Router();
const db = require("../models");
const Events = db.Events;

function mapBodyToModel(body) {
  const title = body.title;
  const date = body.date;
  const venue = body.venue;
  const time = body.time;
  const ticketlink = body.ticketlink;

  const decription = body.decription ?? body.description;

  const Image = body.Image ?? body.image;

  return { title, date, venue, decription, time, ticketlink, Image };
}

router.get("/", async (req, res) => {
  try {
    const items = await Events.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Events.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
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

    if (missing.length) {
      return res
        .status(400)
        .json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    const created = await Events.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = mapBodyToModel(req.body);
    Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);

    const [count] = await Events.update(data, {
      where: { id: req.params.id },
    });

    if (count === 0) return res.status(404).json({ updated: false, error: "Not found" });

    const updated = await Events.findByPk(req.params.id);
    res.json({ updated: true, item: updated });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Events.destroy({ where: { id: req.params.id } });
    if (count === 0) return res.status(404).json({ deleted: false, error: "Not found" });
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

module.exports = router;
