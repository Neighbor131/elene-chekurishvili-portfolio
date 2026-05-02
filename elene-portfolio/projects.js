const projects = [
  {
    title: "Design System: Ubani",
    cover: "./assets/ubani-design-system/ubani-banner.jpg",
    href: "./work.html?project=ubani-design-system",
    ratio: "1966 / 2493",
    type: "Design system and flow showcase",
    year: "2026",
    focus: "Semantic tokens, component library, accessibility-first styling, developer-ready documentation, product journey validation",
    summary: "A consistent, accessible, and scalable product foundation for neighborhood social experiences, paired with an interactive flow showcase that demonstrates the system inside real product journeys.",
    links: [
      {
        label: "Open the design system",
        href: "https://y-gilt-nine-99.vercel.app/ubani-design-system.html",
      },
      {
        label: "View flow showcase",
        href: "https://y-gilt-nine-99.vercel.app/ubani-app-showcase.html",
      },
    ],
    bodyText: `Includes consistent, accessible, and scalable product foundation across neighborhood social experiences.

It includes:

a semantic token architecture (color, type, spacing, radius, elevation, motion),
a component library with state coverage and usage rules,
accessibility-first styling (AA/AAA-aware contrast mappings),
and developer-ready documentation for implementation consistency across web and mobile.
The goal was to make design decisions reusable, measurable, and production-ready rather than screen-by-screen.

Flow Showcase
Built an interactive Ubani Flow Showcase to demonstrate how the system performs in real product journeys, not just static components.

It covers:

end-to-end onboarding,
feed, errands, marketplace, messaging, and moderation flows,
UX hardening scenarios (emergency escalation, privacy controls, account recovery, report status, offline retry),
plus platform preview modes (iOS and Android).
The goal was to prove UX coherence across critical journeys, validate trust/safety patterns, and communicate product behavior clearly to design, product, and engineering stakeholders.`,
    images: [
      {
        src: "./assets/ubani-design-system/ubani-banner.jpg",
        label: "Ubani design system banner",
      },
      {
        src: "./assets/ubani-design-system/ubani-overview-principles.png",
        label: "Overview and design principles inside the Ubani design system",
      },
      {
        src: "./assets/ubani-design-system/ubani-button-avatar-components.png",
        label: "Button and avatar component documentation",
      },
      {
        src: "./assets/ubani-design-system/ubani-badge-form-components.png",
        label: "Badge and form input component documentation",
      },
    ],
  },
  {
    title: "From A/B Tests to a Scalable Design System: How a ±200% Conversion Lift Exposed the Need for Better UX Infrastructure",
    cover: "./assets/company-a-design-system/company-a-design-system-cover.jpg",
    thumbnail: "./assets/company-a-design-system/company-a-design-system-thumbnail.svg",
    href: "./work.html?project=company-a-design-system",
    ratio: "2327 / 1382",
    thumbnailRatio: "4 / 3",
    type: "CRO, UX optimization, and design system foundation",
    year: "2025-2026",
    focus: "CRO audits, UX optimization, A/B testing support, Flowbite reskinning, reusable components, AI-assisted component auditing, scalable design operations",
    summary: "For NDA reasons, the client is referred to as Company A. The collaboration began with CRO and UX optimization, grew through high-impact A/B testing work, and eventually revealed the need for a practical design system foundation that could keep future improvements fast, consistent, and scalable.",
    bodyMarkdown: `
## Overview

For NDA reasons, I’ll refer to the client as **Company A**.

Company A had been working with us for over a year, initially approaching us from a **CRO and UX optimization perspective**. The goal was clear: audit key parts of the website, identify conversion blockers, improve the user experience, and validate design decisions through A/B testing.

The collaboration started with focused improvements across high-impact areas such as:

* Product Listing Pages
* Product Detail Pages
* Homepage sections
* Standalone landing pages
* Conversion-focused campaign areas

Over time, these iterative improvements delivered significant results. The client’s conversion rate increased by **230% year-over-year**, and the relationship naturally grew into an ongoing stream of new improvement requests.

But success created a new problem.

As more areas of the website improved, the gap between the newly optimized experience and the older untouched parts of the site became harder to ignore. The website started to feel fragmented: part legacy interface, part improved UX layer, part newly designed experiment.

At that point, continuing with surface-level updates would not only slow us down, but also create more inconsistency with every new request.

The project had reached a threshold no one fully anticipated:

**Before we could keep improving the website efficiently, we needed to consolidate the design foundation behind it.**

---

## The Challenge

The website had evolved through many fast-paced, ad hoc updates. This allowed us to move quickly, test ideas, and respond to business needs, but it also meant that the design work had become scattered across files, frames, and one-off components.

Some areas had already been redesigned and optimized. Others still reflected older visual patterns. Reusable elements were not always defined as components, and there was no single source of truth for how core UI patterns should look, behave, or be reused.

This created several problems:

1. **Inconsistent visual experience**
   The website started to feel like a mix of old and new interface decisions.

2. **Slower design and development cycles**
   Every new improvement required additional manual work because patterns had to be recreated, adjusted, or interpreted again.

3. **Harder A/B testing setup**
   Without consistent reusable components, even small tests could become unnecessarily time-consuming.

4. **Limited scalability**
   The more we improved, the harder the system became to maintain.

5. **Risk of design debt growing further**
   Continuing with individual page-level improvements would only deepen the inconsistency.

The challenge was not simply to create a “nice design system.” The real challenge was to create a practical, usable foundation that could support ongoing CRO work without slowing the project down.

---

## Why a Design System Became Necessary

At first, the project did not begin as a design system initiative.

The client needed audits, UX recommendations, CRO improvements, and A/B test designs. That type of work usually prioritizes speed, experimentation, and measurable impact.

However, after a year of successful collaboration, it became clear that the website needed more than isolated improvements. The optimized areas were performing better, but they were also exposing the weaknesses of the older interface around them.

This created an important strategic shift:

**The next stage of optimization was no longer just about improving individual pages. It was about improving the system that allowed those pages to exist.**

Without a consolidated design system, every future request would require more interpretation, more manual cleanup, and more design-development alignment.

With a design system, each new improvement could become faster, more consistent, and easier to implement.

---

## The Approach

Since the project team was very lean, only one designer and one developer, creating a full custom design system from scratch would have been too slow and unrealistic.

Instead, we took a more practical approach.

We used **Flowbite’s open-source design system** as a structural foundation and reskinned it using Company A’s brand colors, typography, and interface direction.

This gave us a strong base to work from without wasting time reinventing common UI patterns from zero, because apparently humans enjoy rebuilding buttons every quarter as a form of professional suffering.

From there, we focused on turning scattered design decisions into reusable, documented components.

The work included:

* Identifying repeated UI patterns across existing designs
* Tracking components that had been created manually or inconsistently
* Defining reusable components and their usage
* Reskinning the color system based on the brand
* Applying consistent typography rules
* Creating a cleaner component structure
* Updating existing design frames using the new system
* Preparing the foundation for future A/B tests and page improvements

---

## Using AI as a Design System Assistant

One of the most important parts of this project was how we used AI to speed up the process.

Because the existing design files had grown through fast ad hoc updates, many frames and nodes were not properly defined as reusable components. Manually identifying every repeated pattern would have taken a significant amount of time.

I used **Codex as my main assistant** to help with the repetitive and structural parts of the process.

Codex helped us:

* Identify missing reusable components
* Track nodes that could be turned into components
* Support the reskinning of the color system
* Speed up the recreation of reusable components
* Reduce manual cleanup work
* Find patterns that could be consolidated
* Support the transition from scattered frames to a structured component library

This did not replace the design decision-making process. The role of AI was not to “design instead of me.” It helped with the heavy lifting: finding, organizing, comparing, and speeding up repetitive work.

The design direction, component logic, usage decisions, and system structure still required human judgment.

This distinction mattered because there was no room for hallucination or vague automation. The goal was not to generate random new UI. The goal was to systematize what already existed and make it reusable.

---

## Component Strategy

One of the biggest questions we had to solve was how to update the existing design work.

Should we simply swap old components with new library components?
Would a surface-level component replacement be enough?
Or did we need a more structured approach before touching the full design file?

A direct library swap sounded efficient at first, but it carried risks. The existing designs were not built with a fully consistent component logic, so blindly replacing components could create broken layouts, mismatched sections, or inaccurate updates.

Instead, we decided to work more carefully.

First, we planned to go section by section and identify reusable sections across the website. These sections would become a consolidated gallery of patterns that could then be connected back to the new component library.

This gave us a more controlled workflow:

1. Identify reusable sections
2. Define their component structure
3. Connect them to the updated design system
4. Replace or update old instances more safely
5. Prepare reusable sections for future page improvements and tests

This approach reduced the risk of AI misinterpreting the design file and made the process easier to maintain for both design and development.

---

## The Outcome

The biggest result was speed.

What could have easily taken weeks of manual design cleanup and component restructuring was compressed into roughly **10 hours of focused work**.

In that time, we were able to create the foundation for a cleaner, more scalable design system that could support future CRO, UX, and A/B testing work.

The outcome included:

* A reskinned design system based on the client’s brand
* A clearer reusable component structure
* A stronger foundation for future experiments
* Faster design updates
* Easier collaboration between design and development
* Reduced manual work for upcoming requests
* A cleaner path toward updating older parts of the website
* Better consistency across existing and future designs

The design system also created a new opportunity for the client.

Instead of only improving isolated pages, Company A can now start updating older areas of the website with a more unified visual and UX language. This means the website can gradually move toward a cleaner, more consistent experience without needing a full redesign all at once.

---

## Business Impact

The project started with CRO improvements, but it evolved into something more strategic.

The earlier optimization work had already contributed to a **230% year-over-year increase in conversion rate**. That success proved the value of improving the website experience.

But the design system work helped protect that progress.

By creating a stronger foundation, we made future improvements easier to design, easier to develop, and easier to test. Instead of treating each request as a separate one-off task, the team now has a reusable system that supports faster decision-making and cleaner execution.

This is especially important for ongoing CRO work, where speed and consistency matter.

A/B tests can now be prepared with less friction. Page updates can follow established patterns. New sections can be built from reusable components instead of starting from scratch.

The client does not just get a cleaner UI. They get a system that makes future optimization more sustainable.

---

## Reflection

This project was a reminder that successful CRO work can create its own next challenge.

When individual improvements work, they often expose deeper structural issues. A page may perform better, but if the design foundation behind it remains fragmented, every future improvement becomes harder to maintain.

For Company A, the need for a design system did not come from a branding exercise or a theoretical design process. It came from real business growth, repeated collaboration, and the practical need to keep improving without creating more design debt.

The most valuable part of the project was not just creating components. It was creating a bridge between fast experimentation and long-term scalability.

By combining an open-source design system foundation, brand-specific reskinning, careful component auditing, and AI-assisted workflow support, we turned a messy and time-consuming process into a structured system that can now support future growth.

The result is a website foundation that is easier to improve, easier to maintain, and better prepared for whatever comes next.
`,
    images: [
      {
        src: "./assets/company-a-design-system/company-a-design-system-cover.jpg",
        label: "From A/B tests to a scalable design system cover",
      },
    ],
  },
  {
    title: "Custom GPT: Prompt Crafter",
    cover: "./assets/prompt-crafter/prompt-crafter-cover.jpg",
    href: "./work.html?project=prompt-crafter",
    ratio: "2611 / 1630",
    type: "Retrieval-driven visual prompt agent",
    year: "2026",
    focus: "Image purpose, viewer context, lens psychology, framing, lighting, depth of field, environmental storytelling, realistic subject behavior",
    summary: "Prompt Crafter is a retrieval-driven visual prompt agent for creators, founders, designers, and marketers who need AI-generated images that feel intentional rather than random. It interprets the image's purpose, viewer context, environment, and subject behavior, then turns those inputs into a polished prompt grounded in real photographic practice.",
    liveUrl: "https://ko-fi.com/s/2788463577",
    liveLabel: "Buy Prompt Crafter",
    images: [
      {
        src: "./assets/prompt-crafter/prompt-crafter-cover.jpg",
        label: "Prompt Crafter custom GPT cover",
      },
      {
        src: "./assets/prompt-crafter/campus-reading-scene.png",
        label: "Campus lifestyle scene with lens psychology and natural behavior",
      },
      {
        src: "./assets/prompt-crafter/courtyard-study-scene.png",
        label: "Editorial study scene shaped by foreground depth and environmental storytelling",
      },
      {
        src: "./assets/prompt-crafter/bookstore-cafe-scene.png",
        label: "Bookstore cafe scene with believable lighting, context, and imperfect human detail",
      },
    ],
  },
  {
    title: "Custom GPT: Prompt Architect",
    cover: "./assets/prompt-architect/prompt-architect-cover.jpg",
    href: "./work.html?project=prompt-architect",
    ratio: "1966 / 2493",
    type: "Image-generation prompt strategist",
    year: "2026",
    focus: "Visual prompt structure, subject clarity, composition, lighting, materials, mood, color, constraints, reusable templates, refinement instructions",
    summary: "Prompt Architect turns vague visual ideas into precise image-generation prompts that actually behave. It clarifies the subject, composition, lighting, materials, mood, color, and constraints so the model knows what to prioritize and what to avoid, without generic cinematic fluff.",
    liveUrl: "https://ko-fi.com/s/0979d1fa79",
    liveLabel: "Buy Prompt Architect",
    images: [
      {
        src: "./assets/prompt-architect/prompt-architect-cover.jpg",
        label: "Prompt Architect custom GPT cover",
      },
      {
        src: "./assets/prompt-architect/bad-good-prompt-comparison.png",
        label: "Bad prompt and refined prompt comparison",
      },
      {
        src: "./assets/prompt-architect/prompt-architect-workflow.png",
        label: "Prompt Architect workflow and visual logic system",
      },
      {
        src: "./assets/prompt-architect/modern-house-exterior.png",
        label: "Refined architectural prompt output with controlled light and composition",
      },
      {
        src: "./assets/prompt-architect/park-billboard-scene.png",
        label: "Realistic editorial scene shaped by subject, setting, and constraints",
      },
      {
        src: "./assets/prompt-architect/park-bench-billboard-scene.png",
        label: "Environment variation with clearer camera distance and story context",
      },
      {
        src: "./assets/prompt-architect/kitchen-editorial-scene.png",
        label: "Natural interior scene with mood, materials, and lighting direction",
      },
      {
        src: "./assets/prompt-architect/fitness-class-scene.png",
        label: "Action-focused realistic scene with foreground depth and group composition",
      },
      {
        src: "./assets/prompt-architect/park-strollers-scene.png",
        label: "Documentary-style scene prompt with gesture and framing control",
      },
      {
        src: "./assets/prompt-architect/metro-platform-scene.png",
        label: "Urban scene with perspective, atmosphere, and practical lighting",
      },
    ],
  },
  {
    title: "Custom GPT: Scene Creator",
    cover: "./assets/scene-creator/scene-creator-cover.jpg",
    href: "./work.html?project=scene-creator",
    ratio: "1904 / 1661",
    type: "AI filmmaking and visual-generation strategist",
    year: "2026",
    focus: "Higgsfield-style workflows, cinematic prompt strategy, character and brand consistency, scene direction, image and video generation planning",
    summary: "Scene Creator is a practical AI filmmaking and visual-generation strategist built for Higgsfield-style workflows. It helps creators figure out what they are actually trying to make, choose the right workflow, and turn loose ideas into production directions for images, videos, edits, continuations, ads, character swaps, motion graphics, and cinematic scenes.",
    liveUrl: "https://ko-fi.com/s/03681d6666",
    liveLabel: "Buy Scene Creator",
    images: [
      {
        src: "./assets/scene-creator/scene-creator-cover.jpg",
        label: "Scene Creator custom GPT cover",
      },
      {
        src: "./assets/scene-creator/spirits-studio-lineup.png",
        label: "Product scene direction with controlled light, props, and composition",
      },
      {
        src: "./assets/scene-creator/wine-bottles-held.png",
        label: "Character, product, and location continuity for generative workflows",
      },
      {
        src: "./assets/scene-creator/wine-studio-lineup.png",
        label: "Branded visual layout with palette, object roles, and negative space",
      },
      {
        src: "./assets/scene-creator/joie-bottle-glass.png",
        label: "Outdoor product angle built around action, lighting, and environment",
      },
      {
        src: "./assets/scene-creator/picnic-basket-product-scene.png",
        label: "Lifestyle product scene with moodboard-driven props and color control",
      },
      {
        src: "./assets/scene-creator/cider-studio-lineup.png",
        label: "Commercial beverage setup with copy-safe composition",
      },
      {
        src: "./assets/scene-creator/wine-vineyard-hands.png",
        label: "Cinematic continuation prompt direction for product-in-hand scenes",
      },
    ],
  },
  {
    title: "CircuitMess Email Marketing",
    cover: "./assets/read-cv-media/circuitmess-email-marketing-alt-cover.jpg",
    href: "./work.html?project=circuitmess-email-marketing",
    ratio: "2031 / 2622",
    type: "Email visual design",
    year: "2025",
    focus: "Email component system, CircuitMess brand alignment, reusable campaign modules",
    summary: "An email visual design case study for CircuitMess, focused on creating a reusable component system that could support customer-intent campaigns while staying aligned with the brand's playful robotics identity.",
    liveUrl: "https://scandiweb.com/blog/removing-growth-blockers-circuitmess-email-marketing-case-study/",
    images: [
      {
        src: "./assets/read-cv-media/circuitmess-email-marketing-alt-cover.jpg",
        label: "Revenue growth case study cover",
      },
      {
        src: "./assets/read-cv-media/circuitmess-email-marketing-case-study.png",
        label: "Email component system overview",
      },
      {
        src: "./assets/read-cv-media/circuitmess-email-marketing-case-study.png",
        label: "CircuitMess branded campaign direction",
      },
    ],
  },
  {
    title: "FELCO Email Marketing",
    cover: "./assets/read-cv-media/felco-email-marketing-alt-cover.jpg",
    href: "./work.html?project=felco-email-marketing",
    ratio: "2663 / 3183",
    type: "Email visual design via Scandiweb",
    year: "2025-ongoing",
    focus: "AI-assisted creative direction, detailed prompting, product-accurate visual cleanup",
    summary: "An email visual design case study for FELCO, where Scandiweb's ongoing email work used AI-assisted visuals for highly specific gardening tools. The challenge was keeping every product detail believable and brand-safe through precise prompting, careful art direction, and technical cleanup.",
    liveUrl: "https://scandiweb.com/blog/removing-growth-blockers-felco-email-marketing-case-study/",
    images: [
      {
        src: "./assets/read-cv-media/felco-email-marketing-alt-cover.jpg",
        label: "Lifecycle revenue case study cover",
      },
      {
        src: "./assets/read-cv-media/felco-email-marketing-case-study.png",
        label: "AI-assisted email creative direction",
      },
      {
        src: "./assets/read-cv-media/felco-email-marketing-case-study.png",
        label: "FELCO product-accurate campaign visuals",
      },
    ],
  },
  {
    title: "Christmas Tree World Email Marketing",
    cover: "./assets/read-cv-media/christmas-tree-world-email-marketing-alt-cover.jpg",
    href: "./work.html?project=christmas-tree-world-email-marketing",
    ratio: "3290 / 2212",
    type: "Email visual design via Scandiweb",
    year: "2025",
    focus: "Email visual redesign, AI creative strategy, brand-aligned campaign direction",
    summary: "An email visual design case study for Christmas Tree World, focused on fully redesigning the email visuals and using AI creative strategy while keeping every campaign true to the brand's festive, retail-focused identity.",
    liveUrl: "https://scandiweb.com/blog/removing-growth-blockers-christmas-tree-world-email-marketing-case-study/",
    images: [
      {
        src: "./assets/read-cv-media/christmas-tree-world-email-marketing-alt-cover.jpg",
        label: "Predictable revenue channel case study cover",
      },
      {
        src: "./assets/read-cv-media/christmas-tree-world-email-marketing-case-study.png",
        label: "Email visual redesign overview",
      },
      {
        src: "./assets/read-cv-media/christmas-tree-world-email-marketing-case-study.png",
        label: "Brand-aligned AI creative strategy",
      },
    ],
  },
  {
    title: "MyNextMattress Email Marketing",
    cover: "./assets/read-cv-media/mynextmattress-email-marketing-alt-cover.jpg",
    href: "./work.html?project=mynextmattress-email-marketing",
    ratio: "4153 / 2791",
    type: "Email visual design via Scandiweb",
    year: "2025-ongoing",
    focus: "Email flow redesign, visual banner system, recognizable brand language",
    summary: "An email visual design case study for MyNextMattress, focused on redesigning the full email flow around the brand. With no formal visual brand guidelines to rely on, the challenge was creating a niche banner system and repeatable visual language that made the emails instantly recognizable to users.",
    liveUrl: "https://scandiweb.com/blog/removing-growth-blockers-mynextmattress-email-marketing-case-study/",
    images: [
      {
        src: "./assets/read-cv-media/mynextmattress-email-marketing-alt-cover.jpg",
        label: "ROI case study cover",
      },
      {
        src: "./assets/read-cv-media/mynextmattress-email-marketing-case-study.png",
        label: "Email flow visual redesign",
      },
      {
        src: "./assets/read-cv-media/mynextmattress-email-marketing-case-study.png",
        label: "Recognizable banner language",
      },
    ],
  },
  {
    title: "Luxury & Premium Retail",
    cover: "./assets/read-cv-media/luxury-premium-retail.jpg",
    href: "./work.html?project=luxury-premium-retail",
    ratio: "1697 / 2005",
    type: "Premium retail UX/UI via Scandiweb",
    year: "2025",
    focus: "Shopify migration support, design systems, PLP/PDP improvements, high-fidelity storefront design",
    summary: "A grouped premium retail work stream across J.R. Dunn, Tryano, and Swisscave at Scandiweb, focused on high-consideration shopping experiences, luxury storefront polish, product discovery, and conversion-sensitive PLP/PDP improvements.",
    images: [
      {
        src: "./assets/read-cv-media/luxury-premium-retail.jpg",
        label: "Luxury and premium retail overview",
      },
      {
        src: "./assets/read-cv-media/luxury-premium-retail-jrdunn-pdp.jpg",
        label: "J.R. Dunn product detail and listing pages",
      },
      {
        src: "./assets/read-cv-media/luxury-premium-retail-jrdunn-diamond-finder.jpg",
        label: "Diamond finder and highlighted gift categories",
      },
      {
        src: "./assets/read-cv-media/luxury-premium-retail-jrdunn-storefront.jpg",
        label: "Mobile storefront and brand storytelling",
      },
    ],
  },
  {
    title: "Electronics, Technology & AI Commerce",
    cover: "./assets/read-cv-media/electronics-technology-ai-commerce.png",
    href: "./work.html?project=electronics-technology-ai-commerce",
    ratio: "2007 / 1392",
    type: "AI commerce UX/UI via Scandiweb",
    year: "2025",
    focus: "AI-assisted commerce flows, chatbot experiences, dashboards, mini-cart improvements, checkout and CMS pages, landing pages, email assets, scalable design systems",
    summary: "A grouped technology and AI commerce work stream across Samsung AI Chatbot, Bechtle Chatbot, Brain Games, CircuitMess, BK Latvia, and PromptBatch. The work covered AI-assisted shopping flows, chatbot interfaces, operational dashboards, cart and checkout improvements, CMS pages, landing pages, email marketing assets, and reusable design systems for technology-driven products.",
    images: [
      {
        src: "./assets/read-cv-media/electronics-technology-ai-commerce.png",
        label: "Electronics, technology, and AI commerce overview",
      },
      {
        src: "./assets/read-cv-media/electronics-technology-samsung-commerce.jpg",
        label: "Samsung commerce experience",
      },
      {
        src: "./assets/read-cv-media/electronics-technology-promptbatch-mobile.jpg",
        label: "PromptBatch mobile onboarding and workflow",
      },
      {
        src: "./assets/read-cv-media/electronics-technology-promptbatch-dashboard.jpg",
        label: "PromptBatch dashboard system",
      },
      {
        src: "./assets/read-cv-media/electronics-technology-promptbatch-laptop.jpg",
        label: "PromptBatch landing page presentation",
      },
      {
        src: "./assets/read-cv-media/electronics-technology-bechtle-chatbot.jpg",
        label: "Bechtle chatbot experience",
      },
      {
        src: "./assets/read-cv-media/electronics-technology-braingames-cart.jpg",
        label: "Brain Games cart and mini-cart improvements",
      },
      {
        src: "./assets/read-cv-media/electronics-technology-circuitmess-pdp.jpg",
        label: "CircuitMess product detail page and commerce modules",
      },
    ],
  },
  {
    title: "Automotive, Tools & Equipment",
    cover: "./assets/read-cv-media/automotive-tools-equipment.jpg",
    href: "./work.html?project=automotive-tools-equipment",
    ratio: "2031 / 2622",
    type: "Industrial and automotive UX/UI via Scandiweb",
    year: "2025",
    focus: "Email marketing, AI creatives, landing pages, homepage redesigns, PLP/PDP work, Hyva redesigns, help desk UI, reskinning, ad hoc improvements",
    summary: "A grouped practical-commerce work stream across FELCO, IndustrialAutomation.co, Rocket Industrial, DiscoverCars, and UKAL. The work focused on trust-driven product experiences for tools, automotive, and industrial commerce, spanning email marketing, AI creative direction, landing pages, homepage redesigns, PLP/PDP improvements, Hyva redesigns, help desk UI, reskinning, and ongoing product refinements.",
    images: [
      {
        src: "./assets/read-cv-media/automotive-tools-equipment.jpg",
        label: "Automotive, tools, and equipment overview",
      },
      {
        src: "./assets/read-cv-media/automotive-tools-discovercars-help-center.jpg",
        label: "DiscoverCars help desk UI",
      },
      {
        src: "./assets/read-cv-media/automotive-tools-industrialautomation-pdp.jpg",
        label: "IndustrialAutomation.co product detail experience",
      },
    ],
  },
  {
    title: "Health, Pharmacy & Wellness",
    cover: "./assets/read-cv-media/health-pharmacy-wellness.jpg",
    href: "./work.html?project=health-pharmacy-wellness",
    ratio: "2740 / 1621",
    type: "Health and wellness UX/UI via Scandiweb",
    year: "2025",
    focus: "Hyva redesigns, homepage, PLP, PDP, cart, mini-cart, checkout, quiz pages, treatment pages, reskinning, email marketing design",
    summary: "A grouped trust-sensitive commerce work stream across Macta Beauty, InternetAptieka, Redeker, Seedsman, and LCDAH. The work focused on health, pharmacy, beauty, and wellness experiences where clarity and confidence matter, spanning Hyva redesigns, homepages, PLP/PDP flows, cart and mini-cart improvements, checkout, quiz pages, treatment pages, reskinning, and email marketing design.",
    images: [
      {
        src: "./assets/read-cv-media/health-pharmacy-wellness.jpg",
        label: "Health, pharmacy, and wellness overview",
      },
      {
        src: "./assets/read-cv-media/health-pharmacy-seedsman-cart.jpg",
        label: "Seedsman cart and basket states",
      },
      {
        src: "./assets/read-cv-media/health-pharmacy-internetaptieka-pdp.jpg",
        label: "InternetAptieka product detail experience",
      },
      {
        src: "./assets/read-cv-media/health-pharmacy-macta-beauty-homepage.jpg",
        label: "Macta Beauty homepage and product discovery",
      },
    ],
  },
  {
    title: "Home, Furniture & Lifestyle",
    cover: "./assets/read-cv-media/home-furniture-lifestyle.jpg",
    href: "./work.html?project=home-furniture-lifestyle",
    ratio: "2019 / 1519",
    type: "Lifestyle commerce UX/UI via Scandiweb",
    year: "2025",
    focus: "Hyva migrations, Shopify migration support, redesigns, ad hoc UI improvements, product and category experience updates, email marketing campaigns",
    summary: "A grouped lifestyle and home-commerce work stream across Granit, NY Shop, MyNextMattress, ColourBank, Kalve, and Ecko. The work focused on experiences where visual inspiration, comfort, material quality, product context, and emotional buying decisions shape the path to purchase, spanning Hyva migrations, Shopify migration support, redesigns, ad hoc UI improvements, product and category experience updates, and email marketing campaigns.",
    images: [
      {
        src: "./assets/read-cv-media/home-furniture-lifestyle.jpg",
        label: "Home, furniture, and lifestyle overview",
      },
      {
        src: "./assets/read-cv-media/home-furniture-granit-pdp.jpg",
        label: "Granit product detail and mobile product states",
      },
      {
        src: "./assets/read-cv-media/home-furniture-kalve-minicart.jpg",
        label: "Kalve mini-cart and frequently bought with flow",
      },
      {
        src: "./assets/read-cv-media/home-furniture-ecko-homepage.jpg",
        label: "Ecko homepage and lifestyle merchandising",
      },
    ],
  },
  {
    title: "Fintech, Banking & Digital Services",
    cover: "./assets/read-cv-media/fintech-banking-digital-services.jpg",
    href: "./work.html?project=fintech-banking-digital-services",
    ratio: "1749 / 2031",
    type: "Digital banking UX/UI via Scandiweb",
    year: "2025",
    focus: "Landing page design, ad hoc design support, full custom design work, responsive layouts, service-focused journeys",
    summary: "A grouped digital financial services work stream across CBD and UP by CBD. The work focused on banking and service interfaces where clarity, trust, credibility, responsive layouts, visual consistency, and structured user journeys were central, spanning landing page design, ad hoc design support, and full custom design work.",
    images: [
      {
        src: "./assets/read-cv-media/fintech-banking-digital-services.jpg",
        label: "Fintech, banking, and digital services overview",
      },
      {
        src: "./assets/read-cv-media/fintech-banking-cbd-landing.jpg",
        label: "CBD banking landing page and responsive layout",
      },
      {
        src: "./assets/read-cv-media/fintech-banking-up-by-cbd-landing.jpg",
        label: "UP by CBD digital service landing page",
      },
    ],
  },
  {
    title: "SDA ID card web design",
    cover: "./assets/read-cv-media/SDA-ID-card-web-design-at-Artmedia-LLC-and-SDA-2.png",
    href: "./work.html?project=sda-id-card",
    ratio: "4 / 3",
    type: "UX/UI design",
    year: "2024",
    focus: "Knowledge-base UX, public-key archive, sister-site design system",
    summary: "An archive-style website for downloading public keys, designed as a sister experience to sda.gov.ge.",
    images: [
      {
        src: "./assets/read-cv-media/SDA-ID-card-web-design-at-Artmedia-LLC-and-SDA-2.png",
        label: "Archive interface overview",
      },
      {
        src: "./assets/read-cv-media/SDA-ID-card-web-design-at-Artmedia-LLC-and-SDA-2.png",
        label: "Public-key download flow",
      },
    ],
  },
  {
    title: "Utskho app",
    cover: "./assets/read-cv-media/Utskho-app-at-Artmedia-LLC-2.png",
    href: "./work.html?project=utskho-app",
    ratio: "4417 / 2485",
    type: "App design",
    year: "2024",
    focus: "Mobile UI, logo design, Georgian dictionary experience",
    summary: "App and logo design for a Georgian dictionary of foreign words.",
    liveUrl: "https://play.google.com/store/apps/details?id=com.artmedia.foreign&hl=en",
    images: [
      {
        src: "./assets/read-cv-media/Utskho-app-at-Artmedia-LLC-2.png",
        label: "Mobile app interface",
      },
      {
        src: "./assets/read-cv-media/Utskho-app-at-Artmedia-LLC-2.png",
        label: "Dictionary browsing states",
      },
    ],
  },
  {
    title: "Sda.gov.ge",
    cover: "./assets/read-cv-media/Sdagovge-at-Artmedia-LLC-2.png",
    href: "./work.html?project=sda-gov-ge",
    ratio: "2414 / 1736",
    type: "Government service",
    year: "2024",
    focus: "Concept design, wireframes, design system, custom iconography",
    summary: "UX/UI work for the State Services Development Agency, from concept and wireframes through a scalable public-service design system.",
    liveUrl: "http://sda.artmedia.space/",
    images: [
      {
        src: "./assets/read-cv-media/Sdagovge-at-Artmedia-LLC-2.png",
        label: "Public-service website direction",
      },
      {
        src: "./assets/read-cv-media/Sdagovge-at-Artmedia-LLC-2.png",
        label: "Design-system and service templates",
      },
    ],
  },
  {
    title: "Places.Georgia",
    cover: "./assets/read-cv-media/PlacesGeorgia-at-Artmedia-LLC-2.png",
    href: "./work.html?project=places-georgia",
    ratio: "4 / 3",
    type: "Tourism platform",
    year: "2024",
    focus: "User flows, lo-fi and hi-fi wireframes, design system expansion",
    summary: "A tourism platform helping visitors find and understand tourist facilities across Georgia.",
    liveUrl: "https://places.georgia.travel/",
    images: [
      {
        src: "./assets/read-cv-media/PlacesGeorgia-at-Artmedia-LLC-2.png",
        label: "Tourism facility discovery",
      },
      {
        src: "./assets/read-cv-media/PlacesGeorgia-at-Artmedia-LLC-2.png",
        label: "Cross-platform interface direction",
      },
    ],
  },
  {
    title: "Youth Tbilisi",
    cover: "./assets/read-cv-media/Youth-Tbilisi-at-Artmedia-LLC-2.png",
    href: "./work.html?project=youth-tbilisi",
    ratio: "4 / 3",
    type: "Youth platform",
    year: "2024",
    focus: "Concept design, youth-focused UX, research and testing",
    summary: "A youth-focused platform for Tbilisi, led from initial concept through final product direction.",
    liveUrl: "https://youthtbilisi.ge/",
    images: [
      {
        src: "./assets/read-cv-media/Youth-Tbilisi-at-Artmedia-LLC-2.png",
        label: "Youth platform homepage",
      },
      {
        src: "./assets/read-cv-media/Youth-Tbilisi-at-Artmedia-LLC-2.png",
        label: "Engagement-focused interface",
      },
    ],
  },
  {
    title: "Narval eCommerce Website",
    cover: "./assets/read-cv-media/Narval-eCommerce-Website-at-Private-Client-2.png",
    href: "./work.html?project=narval-ecommerce",
    ratio: "4 / 3",
    type: "Commerce UX",
    year: "2024",
    focus: "Private-client ecommerce, product presentation, conversion flow",
    summary: "A private-client ecommerce website focused on clear product browsing, polished presentation, and purchase confidence.",
    liveUrl: "https://narvalcommerce.com/",
    images: [
      {
        src: "./assets/read-cv-media/Narval-eCommerce-Website-at-Private-Client-2.png",
        label: "Commerce website overview",
      },
      {
        src: "./assets/read-cv-media/Narval-eCommerce-Website-at-Private-Client-2.png",
        label: "Product discovery experience",
      },
    ],
  },
  {
    title: "Simoneti Winery Web Page",
    cover: "./assets/read-cv-media/Simoneti-Winery-Web-Page-at-Simoneti-Winery-LLC.png",
    href: "./work.html?project=simoneti-winery",
    ratio: "4 / 3",
    type: "Hospitality website",
    year: "2024",
    focus: "Winery storytelling, landing-page structure, visual presentation",
    summary: "A winery web page concept built around atmosphere, brand story, and a clear introduction to the producer.",
    images: [
      {
        src: "./assets/read-cv-media/Simoneti-Winery-Web-Page-at-Simoneti-Winery-LLC.png",
        label: "Winery page overview",
      },
      {
        src: "./assets/read-cv-media/Simoneti-Winery-Web-Page-at-Simoneti-Winery-LLC.png",
        label: "Hospitality storytelling direction",
      },
    ],
  },
  {
    title: "Mice Batumi",
    cover: "./assets/read-cv-media/Mice-Batumi-at-Artmedia-LLC-2.png",
    href: "./work.html?project=mice-batumi",
    ratio: "4 / 3",
    type: "Travel platform",
    year: "2023",
    focus: "Business tourism, venue discovery, sister-site structure",
    summary: "A Visit Batumi sister site for business tourism, focused on venues and places for meetings and professional events.",
    liveUrl: "https://mice.visitbatumi.com/en",
    images: [
      {
        src: "./assets/read-cv-media/Mice-Batumi-at-Artmedia-LLC-2.png",
        label: "Business tourism platform",
      },
      {
        src: "./assets/read-cv-media/Mice-Batumi-at-Artmedia-LLC-2.png",
        label: "Venue discovery interface",
      },
    ],
  },
  {
    title: "Visitbatumi",
    cover: "./assets/read-cv-media/Visitbatumi-at-Artmedia-LLC-2.png",
    href: "./work.html?project=visitbatumi",
    ratio: "4 / 3",
    type: "Travel website",
    year: "2023",
    focus: "Destination redesign, landing pages, tourism content",
    summary: "A redesign for Visit Batumi, the main travel portal for Ajara, Georgia, with destination content and tourism product discovery.",
    liveUrl: "https://visitbatumi.com/en",
    images: [
      {
        src: "./assets/read-cv-media/Visitbatumi-at-Artmedia-LLC-2.png",
        label: "Destination website redesign",
      },
      {
        src: "./assets/read-cv-media/Visitbatumi-at-Artmedia-LLC-2.png",
        label: "Tourism portal templates",
      },
    ],
  },
  {
    title: "Diplomats.ge",
    cover: "./assets/read-cv-media/Diplomatsge-at-Artmedia-LLC-2.png",
    href: "./work.html?project=diplomats-ge",
    ratio: "4 / 3",
    type: "Organization website",
    year: "2023",
    focus: "UX/UI design, organizational presence, responsive web",
    summary: "UX/UI design for the Young Diplomats of Georgia organization, giving the group a clearer public-facing digital presence.",
    liveUrl: "https://diplomats.ge/",
    images: [
      {
        src: "./assets/read-cv-media/Diplomatsge-at-Artmedia-LLC-2.png",
        label: "Organization website overview",
      },
      {
        src: "./assets/read-cv-media/Diplomatsge-at-Artmedia-LLC-2.png",
        label: "Public-facing content structure",
      },
    ],
  },
  {
    title: "UGSPN.org",
    cover: "./assets/read-cv-media/UGSPNorg-at-Artmedia-LLC-and-UG-2.png",
    href: "./work.html?project=ugspn-org",
    ratio: "3685 / 2764",
    type: "Academic website",
    year: "2023",
    focus: "Collaborative UX/UI, research content, policy platform",
    summary: "A collaborative UX/UI project for UGSPN, supporting research, national security policy discussions, and academic publishing.",
    liveUrl: "https://ugspn.org/en/",
    images: [
      {
        src: "./assets/read-cv-media/UGSPNorg-at-Artmedia-LLC-and-UG-2.png",
        label: "Academic policy platform",
      },
      {
        src: "./assets/read-cv-media/UGSPNorg-at-Artmedia-LLC-and-UG-2.png",
        label: "Research and publication templates",
      },
    ],
  },
  {
    title: "Artmedia Web Design",
    cover: "./assets/read-cv-media/Artmedia-Web-Design-at-Artmedia-LLC-2.png",
    href: "./work.html?project=artmedia-web-design",
    ratio: "4 / 3",
    type: "Company website",
    year: "2023",
    focus: "Website redesign, visual identity, character illustrations",
    summary: "A redesign of Artmedia's company website, paired with visual identity work and custom team character illustrations.",
    liveUrl: "https://artmedia.ge/",
    images: [
      {
        src: "./assets/read-cv-media/Artmedia-Web-Design-at-Artmedia-LLC-2.png",
        label: "Company website redesign",
      },
      {
        src: "./assets/read-cv-media/Artmedia-Web-Design-at-Artmedia-LLC-2.png",
        label: "Brand character and interface direction",
      },
    ],
  },
  {
    title: "Head.org.ge",
    cover: "./assets/read-cv-media/Headorgge-at-Artmedia-LLC-2.png",
    href: "./work.html?project=head-org-ge",
    ratio: "4 / 3",
    type: "Nonprofit website",
    year: "2023",
    focus: "Visual design, user interviews, responsive content",
    summary: "UX/UI design for Head.org.ge, including original visuals, user interviews, and a responsive structure for impact storytelling.",
    liveUrl: "https://head.org.ge/en/",
    images: [
      {
        src: "./assets/read-cv-media/Headorgge-at-Artmedia-LLC-2.png",
        label: "Nonprofit website overview",
      },
      {
        src: "./assets/read-cv-media/Headorgge-at-Artmedia-LLC-2.png",
        label: "Impact and content presentation",
      },
    ],
  },
  {
    title: "Youth Card",
    cover: "./assets/read-cv-media/Youth-Card-at-Artmedia-LLC-2.png",
    href: "./work.html?project=youth-card",
    ratio: "4 / 3",
    type: "Web and app design",
    year: "2023",
    focus: "Youth product UX, web and app interfaces, research and testing",
    summary: "A sister project to Youth Tbilisi, creating web and app interfaces for a Georgian youth card program.",
    liveUrl: "https://eyc.ge/",
    images: [
      {
        src: "./assets/read-cv-media/Youth-Card-at-Artmedia-LLC-2.png",
        label: "Youth card web experience",
      },
      {
        src: "./assets/read-cv-media/Youth-Card-at-Artmedia-LLC-3.png",
        label: "Interface detail",
      },
    ],
  },
  {
    title: "A2b.ge",
    cover: "./assets/read-cv-media/A2bge-at-A2b-1.png",
    href: "./work.html?project=a2b-ge",
    ratio: "4 / 3",
    type: "Digital platform",
    year: "2023",
    focus: "Product interface, service presentation, responsive web",
    summary: "A digital platform project for A2b.ge, shaped around service clarity and a more structured web experience.",
    liveUrl: "https://www.a2b.ge/en/",
    images: [
      {
        src: "./assets/read-cv-media/A2bge-at-A2b-1.png",
        label: "Platform overview",
      },
      {
        src: "./assets/read-cv-media/A2bge-at-A2b-2.png",
        label: "Responsive interface direction",
      },
    ],
  },
  {
    title: "Prestige.ge",
    cover: "./assets/read-cv-media/Prestigege-at-Artmedia-LLD-2.png",
    href: "./work.html?project=prestige-ge",
    ratio: "4 / 3",
    type: "Retail website",
    year: "2022",
    focus: "Beauty retail, product browsing, web page design",
    summary: "Web page design for a local perfume and cosmetics supplier, focused on retail clarity and product presentation.",
    liveUrl: "https://prestige.ge/",
    images: [
      {
        src: "./assets/read-cv-media/Prestigege-at-Artmedia-LLD-2.png",
        label: "Retail website overview",
      },
      {
        src: "./assets/read-cv-media/Prestigege-at-Artmedia-LLD-2.png",
        label: "Product browsing direction",
      },
    ],
  },
  {
    title: "Actio.ge",
    cover: "./assets/read-cv-media/Actioge-at-Artmedia-LLC-2.png",
    href: "./work.html?project=actio-ge",
    ratio: "4 / 3",
    type: "Civic website",
    year: "2022",
    focus: "Civic organization, content architecture, web design",
    summary: "Web page design for the Center for Strategic Research and Development of Georgia, one of the country's early civic organizations.",
    liveUrl: "https://actio.ge/",
    images: [
      {
        src: "./assets/read-cv-media/Actioge-at-Artmedia-LLC-2.png",
        label: "Civic organization website",
      },
      {
        src: "./assets/read-cv-media/Actioge-at-Artmedia-LLC-2.png",
        label: "Content and program presentation",
      },
    ],
  },
  {
    title: "Genderequality.ge",
    cover: "./assets/read-cv-media/Genderequalityge-at-Artmedia-LLC-2.png",
    href: "./work.html?project=genderequality-ge",
    ratio: "4 / 3",
    type: "Digital library",
    year: "2022",
    focus: "Digital archive, gender equality resources, knowledge access",
    summary: "UX/UI design for a digital library preserving institutional memory and educational resources around gender equality.",
    liveUrl: "http://genderequality.ge/",
    images: [
      {
        src: "./assets/read-cv-media/Genderequalityge-at-Artmedia-LLC-2.png",
        label: "Digital library interface",
      },
      {
        src: "./assets/read-cv-media/Genderequalityge-at-Artmedia-LLC-2.png",
        label: "Resource archive structure",
      },
    ],
  },
  {
    title: "Georgia.Travel",
    cover: "./assets/read-cv-media/GeorgiaTravel-at-Artmedia-LLC-2.png",
    href: "./work.html?project=georgia-travel",
    ratio: "4 / 3",
    type: "Tourism website",
    year: "2022",
    focus: "UI design, design-system expansion, destination templates",
    summary: "UI work and template development for Georgia's national tourism platform.",
    liveUrl: "https://georgia.travel/",
    images: [
      {
        src: "./assets/read-cv-media/GeorgiaTravel-at-Artmedia-LLC-2.png",
        label: "Destination platform overview",
      },
      {
        src: "./assets/read-cv-media/GeorgiaTravel-at-Artmedia-LLC-2.png",
        label: "Tourism content templates",
      },
    ],
  },
  {
    title: "Eternitycap.fund",
    cover: "./assets/read-cv-media/Eternitycapfund-at-Artmedia-LLC-2.png",
    href: "./work.html?project=eternitycap-fund",
    ratio: "4 / 3",
    type: "Investment fund website",
    year: "2021",
    focus: "Website design, logo redesign, crypto/NFT production studio",
    summary: "Web page design and logo redesign for a Tbilisi-based NFT investment fund and production studio.",
    liveUrl: "https://eternitycap.fund/",
    images: [
      {
        src: "./assets/read-cv-media/Eternitycapfund-at-Artmedia-LLC-2.png",
        label: "Investment fund website",
      },
      {
        src: "./assets/read-cv-media/Eternitycapfund-at-Artmedia-LLC-2.png",
        label: "Brand and landing-page direction",
      },
    ],
  },
];

const grid = document.querySelector("#project-grid");
const workSlotPattern = [
  "is-slot-double",
  "is-slot-single",
  "is-slot-single",
  "is-slot-double",
  "is-slot-single",
  "is-slot-single",
  "is-slot-double",
  "is-slot-single",
  "is-slot-single",
  "is-slot-single",
  "is-slot-double",
  "is-slot-single",
];

function createProjectCard(project, index) {
  const card = document.createElement("a");
  card.className = "project-card is-linked";
  card.classList.add(workSlotPattern[index % workSlotPattern.length]);

  card.href = project.href;
  card.setAttribute("aria-label", `${project.title} ${project.type}`);

  const figure = document.createElement("figure");
  figure.className = "project-cover";
  const thumbnail = project.thumbnail || project.cover;
  const thumbnailRatio = project.thumbnailRatio || project.ratio;
  if (thumbnailRatio) {
    figure.classList.add("has-ratio");
    figure.style.setProperty("--cover-ratio", thumbnailRatio);
  }

  const image = document.createElement("img");
  PortfolioImages.apply(image, thumbnail, {
    width: card.classList.contains("is-slot-double") ? 1120 : 680,
    widths: card.classList.contains("is-slot-double") ? [680, 960, 1120, 1440] : [420, 560, 680, 920],
    sizes: card.classList.contains("is-slot-double")
      ? "(min-width: 900px) 48vw, 100vw"
      : "(min-width: 900px) 24vw, 100vw",
    quality: 72,
  });
  image.alt = "";
  image.loading = index < 4 ? "eager" : "lazy";
  image.decoding = "async";
  image.fetchPriority = index < 2 ? "high" : "auto";

  const title = document.createElement("h2");
  title.textContent = project.title;

  figure.append(image);
  card.append(figure, title);

  return card;
}

function renderProjects(items) {
  grid.replaceChildren(...items.map(createProjectCard));
}

if (grid) {
  renderProjects(projects);
}
