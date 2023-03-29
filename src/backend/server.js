import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config()

const stripe = require('stripe')(process.env.VITE_STRIPE_KEY);
const express = require('express');
const app = express();
app.use(express.static('public'));
