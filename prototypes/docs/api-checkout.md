---
title: Checkout API
id: checkout-api
slug: checkout-api

---

# Endpoint

`/functions/platformkit-payments-checkout-v1`

<!-- tabs:start -->

## Input

```json
{
    "items": "offering-thgcQbOuz::subscriptionPlan-K...",
    "token": "eyJabc123..."    
}
```

## Output

```json
{
    "status": 200,
    "data": {
        "sessionID": "cs_test_...",
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
