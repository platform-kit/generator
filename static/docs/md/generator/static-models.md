# Static Data Models

- [Content Models](#content-models)
    - [Topics](#topics)     
    - [Content Items](#contentItems)    
- [Marketing Models](#marketing-models)
    - [Pages](#pages) 
    - [Page Elements](#page-Elements) 
    - [Social Media Posts](#social-media-posts) 
    - [Value Propositions](#value-propositions)    
- [E-Commerce Models](#e-commerce-models)
    - [Offerings](#offerings)
    - [Collections](#collections)    
    - [Subscription Plans](#subscription-plans)

<hr>

## Content Models

### Topics

Directory: `data/topics/*.md`

GraphQL Model: `Topic`

<!-- tabs:start -->

#### ** Example **

```markdown
---
title: Entrepreneurship
id: topic-KIRVXSW_O
slug: entrepreneurship
published: true
valuePropositions:
  - valueProposition-IuH13NPbn
---

# Markdown Title


```

<!-- tabs:end -->

### Content Items

Directory: `data/content/*.md`

GraphQL Model: `ContentItem`

<!-- tabs:start -->

#### ** Example **

```markdown
---
canonical_url: false
title: Content Example - Static Video
id: content-jf4Kbfe1C
published: true
featured: true
thumbnail_image: /files/6-tips-thumbnail.jpg
relatedCollections:
  - manifesting
media_full: 'http://localhost:8888/files/examples/Pexels-Videos-1437396.mp4'
keywords: publishing content
slug: content-example-static-video
subtitle: Subtitle goes here.
description: This is a basic example of a content post.
minutes_to_consume: 2
date: 2019-03-14T00:00:00.000Z
media_preview: ''
cover_image: /files/examples/william-bayreuther-UqlWfdDiEIM-unsplash.jpg
series: false
tags:
  - Markdown
  - Cover Image
role: prototype
---

### This is markdown content

A Markdown-formatted document should be publishable as-is, as plain text, without looking
like it's been marked up with tags or formatting instructions. 

While Markdown's syntax has been influenced by several existing text-to-HTML filters -- including [Setext](http://docutils.sourceforge.net/mirror/setext.html), [atx](http://www.aaronsw.com/2002/atx/), [Textile](http://textism.com/tools/textile/), [reStructuredText](http://docutils.sourceforge.net/rst.html),
[Grutatext](http://www.triptico.com/software/grutatxt.html), and [EtText](http://ettext.taint.org/doc/) -- the single biggest source of
inspiration for Markdown's syntax is the format of plain text email.
```

<!-- tabs:end -->

## Marketing Models

### Pages

Directory: `data/pages/*.md`

GraphQL Model: `LandingPage`

<!-- tabs:start -->

#### ** Example **

```markdown
---
title: Launch Your Own Platform
id: page-bxs-eKa4c
slug: launch-your-own-platform
published: true
description: ''
sections:
  - type: valuePropositions
    list:
      - valueProposition-IuH13NPbn
  - type: contentItems
    list:
      - content-jf4Kbfe1C
      - content-jf4Kbye1D
      - content-jfsKbye9C  
  - type: collections
    list:
      - collection-jF56aqYVr
---
```

<!-- tabs:end -->

### Page Elements

Directory: `data/pageElements/*.md`

GraphQL Model: `PageElement`

<!-- tabs:start -->

#### ** Example **

```markdown
---
title: Recent Articles
id: pageElements-GIq58mK02
published: true
code:
  lang: html
  code: >-
    <div class="w-100 p-5  text-center border-0"
    style="background:none;color:rgba(0, 123, 255, 0.25) !important;">
        <h1>Recent Articles</h1>
    </div>
---
```

<!-- tabs:end -->

### Social Media Posts

Directory: `data/socialPosts/*.md`

GraphQL Model: `SocialPost`

<!-- tabs:start -->

#### ** Example **

```markdown
---
canonical_url: false
title: 7 Rules for Writing Super-Effective Affirmations
id: socialPost-ISt_VsXpu
slug: super-effective-affirmations
published: true
featured: true
description: >-
  Say goodbye to affirmations that backfire. These tips will help you create
  mantras that are super-effective.
date: 2019-03-14T00:00:00.000Z
link: 'https://www.dharmaworks.com/content/7-rules-for-writing-effective-affirmations'
thumbnail_image: /files/6-tips-thumbnail.jpg
repost_rules:
  - start_date: 'March 1, 2020 12:00 AM'
    tuesday: true
    monday: true
    sunday: true
    end_date: 'March 10, 2020 12:00 AM'
    wednesday: true
    saturday: true
    thursday: true
    friday: true
---
```

<!-- tabs:end -->

### Value Propositions

Directory: `data/valuePropositions/*.md`

GraphQL Model: `ValueProposition`

<!-- tabs:start -->

#### ** Example **

```markdown
---
conversionPage: page-bxS-eKa4c
call_to_action_button_url: /services
relatedCollections:
  - collection-jF56aqYVr
slug: launch-your-own-ecommerce-platform
relatedValues:
  - value-sgW-0XJZG
featured: true
published: true
date: 2020-03-26T20:41:57.040Z
call_to_action_text: Are you ready to launch your business TODAY?
cover_image: /files/examples/leap-design-YucomIwAKXQ-unsplash.jpg
headline: Launch your own content platform
call_to_action_button_text: Learn More
title: Launch your own e-commerce platform
id: valueProposition-IuH13NPbn
call_to_action_button: Get Started
description: Launch your own content platform
collection: collection-jF56aqYVr
---
```

<!-- tabs:end -->

## E-Commerce Models

### Offerings

Directory: `data/offerings/*.md`

GraphQL Model: `Offering`

<!-- tabs:start -->

#### ** Example **

```markdown
---
boost: 8
canonical_url: false
title: Product Example
id: offering-Kg8tzWA9Y
slug: product-example
published: true
featured: true
type: product
price: 33
variants:
  - id: sku-PHs_GVxuX
    price: 44
    attributes:
      - key: size
        value: Medium
    name: Medium
    image: /files/examples/michael-dam-mEZ3PoFGs_k-unsplash.jpg
  - id: sku-hEUWVxJfJ
    price: 55
    attributes:
      - key: size
        value: medium
      - key: color
        value: black
    name: Medium - Black
    image: /files/examples/michael-dam-mEZ3PoFGs_k-unsplash.jpg
date: 2019-01-07T00:00:00.000Z
cover_image: /files/examples/malte-wingen-dBwadhWa-lI-unsplash.jpg
thumbnail_image: /files/examples/malte-wingen-dBwadhWa-lI-unsplash.jpg
keywords: E-Commerce Product
role: prototype
description: >-
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
  in culpa qui officia deserunt mollit anim id est laborum.
---
```
All prices are in $USD.
<!-- tabs:end -->

### Collections

Directory: `data/collections/*.md`

GraphQL Model: `Collection`

<!-- tabs:start -->

#### ** Example **

```markdown
---
boost: 10
canonical_url: false
title: Example Collection
id: collection-jF56aqYVr
slug: collection-example
published: true
featured: true
description: >-
  Markdown is intended to be as easy-to-read and easy-to-write as is feasible.
  Readability, however, is emphasized above all else. A Markdown-formatted
  document should be publishable as-is, as plain text, without looking like it's
  been marked up with tags or formatting instructions.
date: 2019-01-07T00:00:00.000Z
cover_image: /files/examples/art-lasovsky-8XddFc6NkBY-unsplash.jpg
thumbnail_image: /files/examples/art-lasovsky-8XddFc6NkBY-unsplash.jpg
offerings:
  - offering-Kg8tzWA9Y  
  - offering-Kg8tzWAY2
  - offering-thgcQbOuz
subCollections: []
series: false
tags:
  - Markdown
  - Cover Image
---

A Markdown-formatted document should be publishable as-is, as plain text, without looking
like it's been marked up with tags or formatting instructions. 

While Markdown's syntax has been influenced by several existing text-to-HTML filters -- including [Setext](http://docutils.sourceforge.net/mirror/setext.html), [atx](http://www.aaronsw.com/2002/atx/), [Textile](http://textism.com/tools/textile/), [reStructuredText](http://docutils.sourceforge.net/rst.html),
[Grutatext](http://www.triptico.com/software/grutatxt.html), and [EtText](http://ettext.taint.org/doc/) -- the single biggest source of
inspiration for Markdown's syntax is the format of plain text email.

```

<!-- tabs:end -->

### Subscription Plans

Directory: `data/subscriptionPlans/*.md`

GraphQL Model: `SubscriptionPlan`

<!-- tabs:start -->

#### ** Example **

```markdown
---
title: Test Plan
id: subscriptionPlan-KIs4QHz_W
slug: test-plan
published: true
featured: true
interval: month
price: 99
role: prototype
---
```
All prices are in $USD.

<!-- tabs:end -->