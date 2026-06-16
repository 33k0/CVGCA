const express = require("express");
const router = express.Router();

const { Oldhighlights } = require("../models");

function validatePayload(body) {
  if (!body || typeof body.image !== "string" || body.image.trim() === "") {
    return "Field 'image' (string) is required.";
  }
  return null;
}

router.get("/", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || undefined;
    const offset = Number(req.query.offset) || undefined;

    const rows = await Oldhighlights.findAll({ limit, offset, order: [["createdAt", "DESC"]] });
    res.json(rows);
  } catch (err) {
    console.error("GET /oldhighlights error:", err);
    res.status(500).json({ error: "Failed to fetch old highlights." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const row = await Oldhighlights.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Oldhighlight not found." });
    res.json(row);
  } catch (err) {
    console.error("GET /oldhighlights/:id error:", err);
    res.status(500).json({ error: "Failed to fetch old highlight." });
  }
});

router.post("/", async (req, res) => {
  try {
    const msg = validatePayload(req.body);
    if (msg) return res.status(400).json({ error: msg });

    const created = await Oldhighlights.create({ image: req.body.image.trim() });
    res.status(201).json(created);
  } catch (err) {
    console.error("POST /oldhighlights error:", err);
    res.status(500).json({ error: "Failed to create old highlight." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const msg = validatePayload(req.body);
    if (msg) return res.status(400).json({ error: msg });

    const row = await Oldhighlights.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Oldhighlight not found." });

    row.image = req.body.image.trim();
    await row.save();

    res.json(row);
  } catch (err) {
    console.error("PUT /oldhighlights/:id error:", err);
    res.status(500).json({ error: "Failed to update old highlight." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const row = await Oldhighlights.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Oldhighlight not found." });

    await row.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /oldhighlights/:id error:", err);
    res.status(500).json({ error: "Failed to delete old highlight." });
  }
});

module.exports = router;
