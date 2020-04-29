# Checkout API

`/functions/platformkit-analytics-event-v1`

<!-- tabs:start -->

#### ** Input **

```json
{
    "event": "page_view",
    "data": { "page": "page-x0wk3gl" }
}
```

#### ** Output **

```json
{
   "status": 200,
   "data": {
      "event": "page_view",
      "data": { "page": "page-x0wk3gl" },
      "token": "eyJhbGciOiJIUzI1NiIsInRsf5cCI6IkpXVCs..."
   },
   "error": false,
   "message": "Event received."
}
```

<!-- tabs:end -->

If environment variable `DATABASE_URL` is set, a database record will be saved. The database must be PGSQL or MySQL.

If the environment variable `ANALYTICS_ENDPOINT` is set, the event data will be posted to the specified url.