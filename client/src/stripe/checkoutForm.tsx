import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51QsOX0IghhaywlDib1bPWMphEwRJ8egtF9nc2RjdWWevBe1PeiZOE9zXDsSujpsLtCQ9at30DKjS6mCCxeuLnT3G00ppMnOA2W"
);

interface CheckoutButtonProps {
  onSuccess: () => void;
}

export default function CheckoutButton({ onSuccess }: CheckoutButtonProps) {
  const [Booked, setBooked] = useState(false);
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe failed to initialize");
      return;
    }

    try {
      const session = await fetch(
        "http://localhost:3000/api/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: 500,
            quantity: 1,
          }),
        }
      ).then((res) => res.json());

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Stripe error:", result.error);
      } else {
        onSuccess(); // Call the success handler after successful checkout
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <button
      disabled={Booked}
      onClick={() => {  
        onSuccess(), handleCheckout();
        setBooked(true);
      }}
      className="border-2 bg-[#0067E7] text-white shadow-xl hover:bg-[white] hover:text-[#0067E7] hover:border-[#0067E7] px-4 py-2 rounded-md"
    >
      Book Appointment
    </button>
  );
}
