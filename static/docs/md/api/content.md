# Content API

`/functions/platformkit-content-read-v1`

<!-- tabs:start -->

#### ** Input **

```json
{
    "file": "content-jfsKbye9X",
    "token": "eyJhbGcsiOiJIUz3I1NiIsInR55cCI6IkpXVCJ9..."    
}
```

#### ** Output **

```json
{
    "status": 200,
    "data": {
    "attributes": {
        "canonical_url": false,
        "title": "Content Example - No Cover Image",
        "id": "content-jfsKbye9X",
        "published": true,
        "featured": true,
        "thumbnail_image": "/files/6-tips-thumbnail.jpg",
        "relatedCollections": ["manifesting"],
        "media_full": null,
        "excerpt": "### This is markdown content.",
        "keywords": "publishing content",
        "slug": "content-example-no-cover-image",
        "subtitle": "Subtitle goes here.",
        "description": "This is a basic example of a content post.",
        "minutes_to_consume": 2,
        "date": "2019-03-14T00:00:00.000Z",
        "media_preview": null,
        "cover_image": null,         
        "role": "prototype"
    },
    "body": "### This is markdown content."
    },
}
```

<!-- tabs:end -->

If the user does not have the subscription required to view this content, the `body` and `media_full` attributes will be null.
