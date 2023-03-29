import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config()

const stripe = require('stripe')(process.env.VITE_STRIPE_KEY);
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'https://vercel.com/wahpiangle/shopping-cart';

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        //TODO change this to price only
        // line_items: [
        //     {
        //         price: '{{PRICE_ID}}',
        //         quantity: 1,
        //     },
        // ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.redirect(303, session.url);
});
