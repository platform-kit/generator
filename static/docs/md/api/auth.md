# Auth API

The Auth API has two endpoints.  The first is used to request a token via e-mail, and the second is used to validate that token.

`/functions/platformkit-auth-request-token-v1`

<!-- tabs:start -->

#### ** Input **

```json
{
    "email": "email@example.com",
    "redirect": "/content"
}
```

#### ** Output **

```json
{
    "status": 200,
    "data": null,
    "error": false,
    "message": "Check your e-mail for login instructions."
}
```

<!-- tabs:end -->


`/functions/platformkit-auth-validate-token-v1`

<!-- tabs:start -->

#### ** Input **

```json
{
    "token": "eyJhbGcsiOiJIUz3I1NiIsInR55cCI6IkpXVCJ9..."
}
```

#### ** Output **

```json
{
    "status": 200,
    "data": {
        "sub": "email@example.com",
        "iat": 1587885531,
        "exp": 1619421531
    },
    "error": false,
    "message": "Token validated.",
    "token": "eyJhbGcsiOiJIUz3I1NiIsInR55cCI6IkpXVCJ9..."
}
```

<!-- tabs:end -->