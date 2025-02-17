import Stripe from 'stripe';
import { Request, Response } from 'express';

const stripe = new Stripe('sk_test_51QsOX0IghhaywlDi29LLOCyblQkke7trSw54GzaspIJ9OZJbr0p5aGajnQPa61wxBWIjqmJYuyhnar591yH6THZI00ogbbUZR0');


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
