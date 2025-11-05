import express from "express";
import Event from "../models/Event.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.use(auth);

// Create Event
router.post("/", async (req, res) => {
  const event = await Event.create({ ...req.body, owner: req.user.id });
  res.json(event);
});

// Get Events
router.get("/", async (req, res) => {
  const events = await Event.find({ owner: req.user.id });
  res.json(events);
});

// Update Event
router.put("/:id", async (req, res) => {
  const event = await Event.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  res.json(event);
});

// Delete Event
router.delete("/:id", async (req, res) => {
  await Event.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  res.json({ message: "Deleted" });
});

export default router;
