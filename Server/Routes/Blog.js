const express = require("express");
const router = express.Router();
const db = require("../models");
const Blog = db.Blog;

function mapBodyToModel(body) {
  const {
    title,
    date,
    author,
    content,
    minidescription,
    topics,
    image,
  } = body;
  return { title, date, author, content, minidescription, topics, image };
}

router.get("/", async (req, res) => {
  try {
    const items = await Blog.findAll({ order: [["createdAt", "DESC"]] });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Blog.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = mapBodyToModel(req.body);
    const missing = [];
    if (!data.title) missing.push("title");
    if (!data.date) missing.push("date");
    if (!data.author) missing.push("author");
    if (data.content === undefined) missing.push("content");
    if (!data.minidescription) missing.push("minidescription");
    if (!data.image) missing.push("image");
    if (missing.length) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    }
    const created = await Blog.create(data);
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = mapBodyToModel(req.body);
    Object.keys(data).forEach(k => data[k] === undefined && delete data[k]);

    const [count] = await Blog.update(data, { where: { id: req.params.id } });
    if (count === 0) return res.status(404).json({ updated: false, error: "Not found" });
    const updated = await Blog.findByPk(req.params.id);
    res.json({ updated: true, item: updated });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Blog.destroy({ where: { id: req.params.id } });
    if (count === 0) return res.status(404).json({ deleted: false, error: "Not found" });
    res.json({ deleted: true });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

module.exports = router;
