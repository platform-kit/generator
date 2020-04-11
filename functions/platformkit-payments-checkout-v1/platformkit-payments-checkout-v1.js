// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

(async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    subscription_data: {
      items: [{
        plan: 'plan_123',
      }],
    },
    success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/cancel',
  });
})();