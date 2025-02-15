import Stripe from 'stripe';

const stripe = new Stripe( 'sk_test_51QsOX0IghhaywlDi29LLOCyblQkke7trSw54GzaspIJ9OZJbr0p5aGajnQPa61wxBWIjqmJYuyhnar591yH6THZI00ogbbUZR0');

export const createCheckoutSession = async (req, res) => {
  const { price, quantity } ={price:500,quantity:1};

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Custom Product' },
            unit_amount: 500,
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/`,
      cancel_url: `http://localhost:5173/`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
