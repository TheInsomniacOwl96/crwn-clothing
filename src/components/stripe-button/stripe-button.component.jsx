import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = props => {
  const priceForStripe = props.price * 100;
  const publishableKey = "pk_test_4PxYpK37n0tN80V0X9yvDPVr00CQ7KJ59p";

  const onToken = token => {
    console.log(token);
    alert("Payment Successful!");
  };
  return (
    <StripeCheckout
      label="Pay now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${priceForStripe}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
