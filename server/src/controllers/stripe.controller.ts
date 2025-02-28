import Stripe from 'stripe';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) || "";


export const createCheckoutSession = async (req: Request, res: Response) => {
  const { price, quantity } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: { name: 'QuickDoc' },
            unit_amount: price * 100, // Price in paise
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send((error as Error).message);
  }
};
