import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config()

const stripe = require('stripe')(process.env.VITE_STRIPE_KEY);
const express = require('express');
const app = express();

app.use(express.static('public'));

const YOUR_DOMAIN = 'https://vercel.com/wahpiangle/shopping-cart';

app.post('/create-checkout-session', async (req, res) => {
    const cartTotalPrice = req.body;
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Cart Total'
                    },
                    unit_amount: cartTotalPrice * 100
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    console.log(session.url);
    res.redirect(303, session.url);
});

app.listen(3000, () => console.log('Running on port 3000'));