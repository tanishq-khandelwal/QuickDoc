import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QsOX0IghhaywlDib1bPWMphEwRJ8egtF9nc2RjdWWevBe1PeiZOE9zXDsSujpsLtCQ9at30DKjS6mCCxeuLnT3G00ppMnOA2W');

export default function CheckoutButton({ onSuccess }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const session = await fetch('http://localhost:3000/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ unit_amount: 500 * 100, currency: 'usd', quantity: 1 }],
        }),
      }).then(res => res.json());

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (!result.error) {
        onSuccess();  // Call the booking appointment handler after successful checkout
      } else {
        console.error('Stripe error:', result.error);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <button onClick={handleCheckout} className="btn btn-primary">
      Checkout
    </button>
  );
}
