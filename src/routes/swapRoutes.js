import express from "express";
import Event from "../models/Event.js";
import SwapRequest from "../models/SwapRequest.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.use(auth);

// Get Swappable Slots
router.get("/swappable-slots", async (req, res) => {
  const slots = await Event.find({
    status: "SWAPPABLE",
    owner: { $ne: req.user.id },
  });
  res.json(slots);
});

// Request Swap
router.post("/swap-request", async (req, res) => {
  const { mySlotId, theirSlotId } = req.body;
  const mySlot = await Event.findById(mySlotId);
  const theirSlot = await Event.findById(theirSlotId);
  if (!mySlot || !theirSlot)
    return res.status(404).json({ message: "Slot not found" });

  const swap = await SwapRequest.create({
    mySlot: mySlotId,
    theirSlot: theirSlotId,
    fromUser: req.user.id,
    toUser: theirSlot.owner,
  });

  mySlot.status = "SWAP_PENDING";
  theirSlot.status = "SWAP_PENDING";
  await mySlot.save();
  await theirSlot.save();

  res.json(swap);
});

// Respond to Swap
router.post("/swap-response/:id", async (req, res) => {
  const { accept } = req.body;
  const swap = await SwapRequest.findById(req.params.id)
    .populate("mySlot")
    .populate("theirSlot");
  if (!swap) return res.status(404).json({ message: "Not found" });

  if (!accept) {
    swap.status = "REJECTED";
    await swap.save();
    await Event.findByIdAndUpdate(swap.mySlot._id, { status: "SWAPPABLE" });
    await Event.findByIdAndUpdate(swap.theirSlot._id, { status: "SWAPPABLE" });
    return res.json({ message: "Rejected" });
  }

  const ownerA = swap.mySlot.owner;
  const ownerB = swap.theirSlot.owner;
  await Event.findByIdAndUpdate(swap.mySlot._id, {
    owner: ownerB,
    status: "BUSY",
  });
  await Event.findByIdAndUpdate(swap.theirSlot._id, {
    owner: ownerA,
    status: "BUSY",
  });

  swap.status = "ACCEPTED";
  await swap.save();

  res.json({ message: "Accepted" });
});

// Get all swap requests related to logged-in user
router.get("/swaps", async (req, res) => {
  try {
    const swaps = await SwapRequest.find({
      $or: [{ fromUser: req.user.id }, { toUser: req.user.id }],
    })
      .populate("fromUser", "name email")
      .populate("toUser", "name email")
      .populate("mySlot")
      .populate("theirSlot")
      .sort({ createdAt: -1 });

    res.json(swaps);
  } catch (err) {
    console.error("❌ Error fetching swaps:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
