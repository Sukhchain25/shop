const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51LpRunSBFZukFd0XxkPwthkhrVotWm6K8x7snEoBk8m4Vk01gVYCbnseUjocMv8SpRyY95MQTYVYjLeeDLwVVquN00aSw4Qs3A"
);

router.post("/payment", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
