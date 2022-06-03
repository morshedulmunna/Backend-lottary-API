const router = require("express").Router();
const db = require("../db/db");

router
  .route("/t/:ticketId")
  .get((req, res) => {
    const ticketId = req.params.ticketId;
    const ticket = db.findById(ticketId);
    res.status(200).json(ticket);
  })
  .patch((req, res) => {
    const ticketId = req.params.ticketId;
    const updatedTicket = db.updateById(ticketId, req.body);
    res.status(200).json({ Message: "Updated Successfully", updatedTicket });
  })
  .delete((req, res) => {
    const ticketId = req.params.ticketId;
    db.deleteByIdI(ticketId);
    res.status(203).send();
  });

router
  .route("/u/:username")
  .get((req, res) => {
    const username = req.params.username;
    const ticket = db.findByUser(username);
    res.status(201).json(ticket);
  })
  .patch(() => {})
  .delete(() => {});

/**
 * Post Ticket From Client
 */
router.post("/sell", (req, res) => {
  const { username, price } = req.body;
  const ticket = db.create(username, price);
  res.status(201).json({ Message: "Ticket created Successfully", ticket });
});

/**
 * Post Bulk Ticket From Client
 */
router.post("/bulk", (req, res) => {
  const { username, price, quantity } = req.body;
  console.log(req.body);
  const tickets = db.bulkCreate(username, price, quantity);
  res.status(201).json({ Message: "Bulk created Successfully", tickets });
});

/**
 * Get Draw Tickets
 */
router.get("/draw", (req, res) => {
  const winnerCount = req.query.wc ?? 3;
  const winners = db.draw(winnerCount);
  res.status(200).json(winners);
});

/**
 * Get All Ticket
 */
router.get("", (req, res) => {
  const tickets = db.find();
  res.status(200).json(tickets);
});

module.exports = router;
