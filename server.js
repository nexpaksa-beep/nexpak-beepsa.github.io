const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_dbaca4125973e78aff3c0fe8e6e0eb7d352ab505");

const app = express();

app.use(cors());
app.use(express.json());

// ======================================================
// STRIPE CHECKOUT ENDPOINT
// ======================================================
app.post("/create-checkout-session", async (req, res) => {

    try {

        const session = await stripe.checkout.sessions.create({

            payment_method_types: ["card"],
            mode: "payment",

            line_items: req.body.items.map(item => ({
                price_data: {
                    currency: "zar",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            })),

            success_url: "http://localhost:5500/shop.html?success=true",
            cancel_url: "http://localhost:5500/shop.html?cancel=true"

        });

        res.json({ id: session.id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Stripe session failed" });
    }
});

// ======================================================
// START SERVER
// ======================================================
app.listen(4242, () => {
    console.log("Stripe server running on http://localhost:4242");
});
