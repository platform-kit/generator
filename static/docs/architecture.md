<div align="center" style="background:#fff;border-radius:5px;padding:10px 10px 5px 10px;margin-top:20px;">
    <h1 style="margin-bottom:15px;margin-top:10px; border:none;font-weight:100;color:#000 !important;"><span>Holonic</span> <span style="">Architecture</span></h1>
</div>

> [!concept|style:flat|label:Key Idea - Holons ]
A holon is something that is capable of functioning simultaneously as a whole and as a part of a larger whole.

In addition to working together as part of a whole, each component of PlatformKit is designed to function and provide value on its own.

This approach provides several benefits. New users can adopt incrementally. Likewise, users can also migrate away incrementally.

This mitigates risk, minimizes technical debt, and maximizes agility for the end-user.

It also ensures that the benefits of adoption compound exponentially.

Consider the following examples.

### If you don't already have a website

If you don't yet have a website, you can generate a fully-featured website in under 5 minutes by deploying [generator](generator) to Netlify. 

Generator integrates with engine and customer.js out of the box. No code required.

### If you already have a website and want to integrate analytics

If you already have a website, and you want to add a CRM like Drift chat or an analytics service such as Google Analytics, you might integrate [customer.js](/customerjs) instead of directly implementing the first-party Javascript library. This enables you to add or switch to another service provider (i.e. Intercom or MixPanel) without rewriting a single line of code.

### If you already have a website with analytics and want to host your data privately

If you already have a website using customer.js, you can easily switch to (or add) a private analytics database by connecting platformkit's analytics API to a database and changing a single line of code in your customer.js integration.


<hr>

Since the architecture is modular and no piece requires the others to perform its function, you can customize, replace, or remove each piece as you please.

However, the more of the stack you use, the greater the benefits.