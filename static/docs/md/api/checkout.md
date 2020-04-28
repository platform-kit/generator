# Checkout API

`/functions/platformkit-payments-checkout-v1`

<!-- tabs:start -->

#### ** Input **

```json
{
    "items": "offering-thgcQbOuz::subscriptionPlan-KIs4QHz_W",
    "token": "eyJhbGcsiOiJIUz3I1NiIsInR55cCI6IkpXVCJ9..."    
}
```

#### ** Output **

```json
{
    "status": 200,
    "data": {
        "sessionID": "cs_test_43ldgSYMUN9P4mpmekPyPHntedoww0wPO8sky...",
        "data": {
            "items": [
                {
                    "plan": "subscriptionPlan-KIs4QHz_W-99-month"
                }
            ]
        }
    },
    "error": false,
    "message": null,
    "meta": {
        "user": {
            "email": "email@example.com"
        }
    }
}
```

<!-- tabs:end -->

If the user has an existing stripe customer, that will be passed into the checkout session.
