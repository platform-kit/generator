---
title: Webhooks API
id: webhooks-api
slug: webhooks-api
---
# Endpoint

`/functions/platformkit-webhooks-event-v1`

## Input

```curl
Authorization: 2g0wj2kgo3l3nfis....
{
    "event": "subscription.created",
    "data": { "product": "product-x0wk3gl..." }
}
```

## Output

```json
{
   "status": 200,
   "data": {
      "event": "page_view",
      "data": { "page": "product-x0wk3gl..." }      
   },
   "error": false,
   "message": "Event received."
}
```

If environment variable `DATABASE_URL` is set, a database record will be saved to a table called `pk_webhooks` for further processing.

The database must be PGSQL or MySQL.

```env
DATABASE_URL=postgres://postgres:password@127.0.0.1:5432/database-name
```