# SKILLSPROUT ACADEMY
## AI-FIRST FULL-STACK PRODUCT & DEVELOPMENT MASTER INSTRUCTION

**Domain:** https://skillsprout.academy  
**Document type:** Master instruction for ChatGPT Work / an AI coding agent  
**Version:** 2.3 — 22 September 2026 (v2.1 + v2.2 preserved; comprehensive education expansion)  
**Status:** Product vision and implementation specification; **not** a claim that the specified features currently exist  
**Product ambition:** Create an original, intuitive, inspirational learning experience that children want to return to and parents understand and trust.
**Change note, v2.3:** Preserves the v2.1 AI Block Lab and v2.2 Little Explorers work, and adds a **comprehensive, human-reviewed education curriculum** spanning early literacy, reading/writing, mathematics, science, geography/social studies, creative arts, logic, digital citizenship, languages, practical life and financial literacy. The new Learning Pathways Engine (Sections 17–20) connects subjects, prerequisites, interactive activities, real learning evidence and authorized parent/teacher views. **This file is a build specification, not an assertion that those features are live.** Do not substitute AI-generated curricula for qualified educational review or expose toddlers to unsupervised AI/chat.

> **One-sentence vision:** SkillSprout helps children grow from **“I wonder…”** to **“I understand, I can explain it, and look what I built!”** through age-appropriate literacy, mathematics, science, creativity, digital skills and increasingly sophisticated coding/AI inventions.

---

# 0. READ THIS FIRST: THE NON-NEGOTIABLE PRODUCT BRIEF

You are the lead of a coordinated product, learning-design, engineering, accessibility, privacy, security, and quality-assurance team. Design and **implement** a functioning, original full-stack platform for SkillSprout Academy, not a superficial marketing website and not a replica of another product.

The founder's goal is for SkillSprout to be a *preferred choice* for families who value delightful design, practical learning, and a clear path from playful block coding to real-world AI skills. The analogy to Apple is a **design aspiration**: coherent end-to-end experiences, discoverability, restraint, polished details, reliability, and thoughtful defaults. **Do not copy** Apple's, Scratch's, or Tynker's visual language, assets, names, copyrighted lessons, proprietary code, layouts, or trade dress. Do not claim SkillSprout is objectively “better” than competitors without direct testing and evidence.

**The strategic twist:** Foundational learning and AI invention are connected but never conflated: phonics is not AI, counting is not AI, and real AI experiences have honest model labels. AI is not a chatbot bolted onto a coding course. AI is a **making material** children can manipulate with blocks. Children must learn to ask a question, collect or choose safe examples, train a small model or configure an AI behavior, try it, inspect where it fails, improve it, and explain what they made. Basic and more advanced learners need distinct paths, not a single interface with smaller buttons.

**Product promise:**

- **For children:** “I can make something surprising and useful, even before I know how to type code.”
- **For parents:** “I can see what my child actually made, learned, and can explain; I can control their account and privacy.”
- **For educators:** “I can assign, observe, and assess authentic learning without manually assembling an entire coding environment.”
- **For the business:** “The platform is dependable, original, secure, maintainable, and commercially sustainable without manipulative experiences for children.”

**Mandatory behavior for the coding agent:** Inspect existing SkillSprout repositories, live functionality, migrations, and hosting setup before changing code. Protect working features and production data. Establish clear acceptance tests. Implement complete vertical slices: database + backend + UI + learning runtime + tests. Be explicit about unbuilt, untested, blocked, or simulation-only functionality. Never report a deployment, GitHub push, payment, model training, or test as successful without verification.

---

# 1. COMPETITOR RESEARCH: LEARN, THEN DIFFERENTIATE

Research the *current public* experiences of Scratch and Tynker before design work, then refresh the findings when major design decisions change. Separate observed facts from product hypotheses.

| Reference | Publicly documented capabilities | SkillSprout's proposed distinction to validate with real users |
|---|---|---|
| Scratch | Free block-based programming for interactive stories, games, and animations, with a creative community. | An optional, structured **AI invention journey** with understandable skill evidence for parents, while protecting room for open-ended creativity. Never imply that Scratch lacks creativity, learning, or accessibility. |
| Tynker | Structured programming curricula, visual and text coding, and **existing AI/ML block courses**, including vision and natural-language projects. | A coherent cross-course **AI invention loop**: choose examples → build/train → test → discover limitations → improve → explain, supported by original projects, a calmer interface, transparent parent insights, and inclusive low-bandwidth modes. Do not claim AI blocks are a unique SkillSprout invention. |
| Blockly (technology, not direct product competitor) | Extensible block definitions, code generation, and workspace serialization. | Build the **original SkillSprout block language, runtime, educational content, and interface** on appropriately licensed foundations where suitable. |
| TinyFingers (early-years interaction reference) | Public pages describe a browser-based, no-account keyboard/touch playground; an eight-note instrument; adjustable color sorting, counting, and picture matching games; and adult settings for sound/motion/difficulty. Research snapshot: 22 September 2026. | Create an **original** age-appropriate Little Explorers branch: expressive, small-scope co-play; optional real-world exploration; accessible multiple input paths; adult-configured difficulty; and an ability-based bridge to making with picture-sequence tiles. These are design proposals to test, **not** claims that TinyFingers lacks them. |

**Required research output:** An evidence-backed comparison matrix for (1) first-project time, (2) child comprehension, (3) AI depth, (4) creative freedom, (5) guardian clarity, (6) accessibility, (7) low-bandwidth resilience, (8) privacy, and (9) real cost to operate. Label unknowns **“not tested.”** Do **not** fabricate superiority scores or recommend copying competitor trade dress. Conduct usability tests with consenting families before marketing comparative claims.

Primary references, reviewed for this brief on 20 September 2026:

- Scratch official overview: https://scratch.mit.edu/help/about/
- Tynker introduction to block-based AI/ML: https://www.tynker.com/parents/curriculum/introduction-to-ai-ml/
- Tynker AI/ML lesson descriptions: https://www.tynker.com/parents/curriculum/introduction-to-ai-ml/lessons/
- Tynker advanced AI course: https://www.tynker.com/parents/curriculum/artificial-intelligence/
- Blockly custom code generators: https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/block-code
- Blockly JSON workspace save/load: https://developers.google.com/blockly/guides/configure/web/serialization
- Blockly accessibility: https://developers.google.com/blockly/accessibility
- TinyFingers games overview (research snapshot, 22 September 2026): https://tinyfingers.net/games/
- TinyFingers original playground: https://tinyfingers.net/
- TinyFingers xylophone: https://tinyfingers.net/games/xylophone
- TinyFingers color sorting: https://tinyfingers.net/games/color-sorting
- TinyFingers counting: https://tinyfingers.net/games/counting
- TinyFingers picture matching: https://tinyfingers.net/games/memory
- TinyFingers parent guides: https://tinyfingers.net/guides
- TinyFingers tools (keyboard/mouse input checks, *not* evidence of child learning outcomes): https://tinyfingers.net/tools

**TinyFingers research method and limits:** The 22 September 2026 review used the supplied Games-page screenshot and the site's publicly retrievable descriptions of its Games, individual activity, home, About, and Guides/Tools pages. Described controls, ages, and settings are **site-reported information**, not independent usability testing, security inspection, source-code review, or proof of live gameplay on every device. The screenshot documents a visual snapshot, not accessibility or educational efficacy. The proposed SkillSprout concepts below are new product-design hypotheses; validate them with consenting families and relevant early-years specialists.

These references document capabilities; they are **not** permission to reproduce brand assets, lessons, or UI.

---

# 2. PRODUCT PRINCIPLES: “MAGICAL TO USE, HONEST ABOUT LEARNING”

1. **Create before theory.** A learner should get a genuine, observable result within the first short activity; the system then explains *why* it worked.
2. **One clear next action.** Every age-appropriate screen has one primary next step. Reveal advanced controls progressively, without hiding necessary safety information.
3. **Play has a purpose.** Every animation, character, reward, and interaction teaches or supports a clear goal. No dark patterns, infinite engagement loops, manipulative streak pressure, or ads directed at children.
4. **Originality is part of the experience.** Build a distinct brand, story world, characters, icon system, writing voice, and course catalog. Avoid looking like Apple, Scratch, or Tynker skins.
5. **Teach how AI actually works.** Distinguish scripted rules, statistical classifiers, and generative models. Show uncertainty and errors honestly. A “pretend AI” demonstration must be labeled a simulation.
6. **Parents see evidence, not theater.** Show completed work, attempts, skills demonstrated, and thoughtful next steps; avoid invented mastery scores.
7. **Curriculum before catalogs.** Every educational subject must have an authored, age-/ability-appropriate outcome progression and meaningful learning checks; a set of themed games without reviewed instructional content is not a complete curriculum.
8. **Child agency and flexible placement.** Learners progress by evidence and choice, not automatic age-based labels, unsupported diagnoses, forced streaks or arbitrary skill scores.
9. **Privacy by default.** Projects and profiles are private; collect minimal child data; design optional features around parent/guardian authorization and legal review.
10. **Works beyond ideal broadband.** Prioritize lightweight assets, lazy loading, resumable saves, predictable behavior on older devices, and explicit offline limitations.
11. **Accessible creativity.** Offer keyboard and non-drag alternatives, captions, reduced motion, text alternatives, appropriate contrast, and age-appropriate reading levels.
12. **A small excellent beginning beats 100 unfinished courses.** Launch a verified, delightful AI-building path before expanding the catalog.
11. **Different children need different products, not only different colors.** A supervised early-years mini-game is a distinct, optional product family; it does not require a child account, ML inference, visual code editing, a forced progression ladder, or behavioral engagement tracking.
12. **An interaction can lead to invention.** For developmentally ready children, offer an *optional* pathway from tap → choose → predict what happens → arrange picture steps → test an authored rule → first real blocks. Never equate basic matching, random keystrokes, or screen time with mastery of AI.

## Experience goals (targets, not measured claims)

- A first-time learner can start a safe guest demo without entering personal information and make one meaningful block change in approximately a minute on a reference device.
- A returning student can reopen their last project in two clearly labeled actions or fewer from their home screen.
- A parent can understand *what was built, what was learned, and what is next* from a single child-progress view.
- Each production course contains real instruction, a runnable activity, assessment evidence, error/recovery states, and an authored continuation path.
- Set measurable page-weight, latency, accessibility, lesson-completion, satisfaction, and operational-cost budgets during the audit; benchmark using representative low-end devices and connectivity rather than promising universal speed.

---

# 3. BRAND, INFORMATION ARCHITECTURE, AND INTERACTION DESIGN

## 3.1 Brand identity

Create a new SkillSprout design system centered on **growth, discovery, and invention**. Suggest an original “Idea Seed → Build → Bloom” visual metaphor, but validate it rather than imposing it. Use a carefully limited set of bright, accessible colors; distinct block category colors; a warm neutral canvas; readable type; original illustrations; subtle tactile motion; friendly, precise microcopy. Do not rely on color alone to communicate meaning. Avoid clutter, fake glossy effects, or decorative glass that reduces readability. Test all designs with children and parents from different age groups.

Define in `docs/DESIGN_SYSTEM.md`: typography scales; spacing; tokens; contrast targets; component states; motion/reduced motion; icon rules; illustrations; empty/loading/error/success states; light/dark behavior if implemented; touch and keyboard conventions; localization and RTL readiness. Use original licensed assets with provenance records. No unlicensed competitor screenshots or artwork inside the product.

## 3.2 Separate experiences, coherent product

- **Child Home — “My Garden”:** resume creation; next challenge; my inventions; achievements; accessible account switcher. Display one prominent next action, not ten competing cards.
- **Explore:** age- and skill-appropriate learning worlds; **subject routes for Letters & Reading, Mathematics, Science, Our World, Creativity, Logic and Digital Skills**; interest tags; honest time and prerequisite estimates; searchable catalog for readers. Do not show an empty subject page as an available lesson.
- **My Learning Path:** optional next activity and review choices based on explicit prerequisite links and observed evidence; adult can change placement and see why an activity is suggested. No opaque AI judgment of a child.
- **Subject Studio:** focused original, accessible, non-AI activity runtimes for phonics, word building, numerical manipulatives, virtual science observation, illustrated maps, and art. Keep separate from the AI Invention Studio.
- **Lesson Theater:** short story prompt, interactive step, immediate visible feedback, explain-back reflection, save and continue.
- **AI Invention Studio:** custom colorful block toolbox, central workspace, live stage, testing tray, examples/dataset drawer, helpful inspector, accessibility view, save/version history.
- **Parent View:** linked children, real work samples, plain-language skills, consent/privacy, billing, shared-device guidance, suggested offline activities.
- **Teacher View:** classroom roster, assignments, competency evidence, submissions, feedback, institution permissions.
- **Creator/Admin Studio:** course graph, asset library, block/assessment configuration, content review, analytics, billing/support controls, audit history.

## 3.3 Original onboarding

Provide a no-account interactive **“Make a Tiny AI Invention”** demo using synthetic examples and a local deterministic runtime; do not persist identifying information. After the demo, an adult-directed, age-appropriate account/guardian flow can offer saving and enrollment. For older users, provide an appropriate independent path when lawful. Do not assume a child may consent to commercial services or third-party AI transfers.

Onboarding must ask only what materially improves learning: preferred activity/theme, approximate skill level, optional reading/accessibility preference, and guardian-managed age category when needed. Offer “surprise me,” skip, and change-later choices. Do not require webcam, microphone, exact birthday, location, or a child's personal email to try basic activities.

---

## 3.4 Research-informed design for children aged 2 and above (NEW — v2.1)

**Mission:** Design a visually inviting, genuinely educational SkillSprout experience that can grow with a child, without treating toddlers, beginning readers, older children, teenagers, and guardians as one audience. Maintain one original brand identity with distinct age-appropriate interfaces. Delight is a means to learning and agency, **not** an excuse for prolonged screen time.

**Evidence versus proposal:** Nielsen Norman Group's child-UX research directly concerns ages **3–12** and reports substantial age-related differences in usability, reading, and interaction. Its findings do **not** establish how a two-year-old should use SkillSprout or what all teenagers prefer. WCAG 2.2 specifies accessibility criteria for web interfaces; the larger child-friendly targets and typography below are **SkillSprout design hypotheses** requiring usability testing. Pediatric co-use guidance informs the toddler experience; it does not certify an app as educational or prescribe a single correct design. Avoid unsupported universal claims such as "all children love red" or "bright colours guarantee engagement."

**Non-negotiable:** A two-year-old is **not** placed into the AI block editor. The earliest age band is a separate, optional, adult-assisted early-learning experience using short, developmentally suitable interactions and offline companion activities. Block-based AI invention begins in later age/ability bands, using concrete examples and the safety restrictions in Sections 4–5.

### 3.5 Five distinct audience experiences

| Proposed audience / learning world | Primary interaction model | Visual and instructional direction | Adult involvement / guardrails |
|---|---|---|---|
| **Ages ~2–4: Little Explorers / Learning Garden** | Tap one large illustrated object, hear/see a simple response, recognize familiar objects, colours, shapes, and sounds; do not assume reading or precise dragging. | Warm cream background, friendly original simple characters, generous negative space, one obvious action, very short optional narrated prompts. | Adult-assisted play and co-use, optional offline matching/colouring/talking activities, obvious exit, no independent chat, shopping, autoplay, or public posting. |
| **Ages ~5–7: Junior Creators / Adventure Island** | Picture-led puzzles, simple sequencing, optional spoken and written instructions; guided move/click alternatives to drag. | Bright but restrained islands, clear action labels, playful narrative, small steps, obvious feedback and retry. | Guardian-managed account and privacy; introduce **pre-AI** sequencing and then transparent, supported sample-classifier demonstrations if appropriate. |
| **Ages ~8–12: Creative Coders / Robot & Space Academy** | More capable visual coding, debugging, making and sharing *privately* with authorized adults; progressively richer text. | More sophisticated adventure and robot art, configurable workspace, meaningful achievements, no babyish copy or mascot takeover. | Age-appropriate AI explanations, training/test distinction, safety and privacy rules; adult oversight as appropriate. |
| **Ages ~13–17: Future Innovators / Future Tech Studio** | Projects, real code bridge, adjustable task density, independent creation where lawful. | More mature, refined technology-studio design; optional light/dark schemes with full contrast checking. | Age-appropriate permissions, transparent AI use, safe code execution, guardian/institution relationships as applicable. |
| **Parents, teachers, guardians** | Read progress, authorize settings, manage multiple children, print offline ideas, control billing. | Calm professional typography and restrained brand colour, not a toddler game. | Real learning evidence, clear privacy controls, age-independent understandable terminology and accessible forms. |

These are **suggested bands**, not fixed developmental diagnoses. Offer placement by ability/reading needs and adjustable accessibility settings without requiring exact birthdays. Do not assume any colour, activity, disability support, or cultural reference suits every learner.

### 3.6 Original SkillSprout palette and colour rules

**Candidate brand tokens (subject to user testing and measured accessibility):**

| Token | Hex | Suggested use |
|---|---|---|
| `sprout-green` | `#48C774` | Brand symbol, progress accents, garden imagery, selected actions |
| `sunshine-yellow` | `#FFD84D` | Discoveries, stars, earned celebrations |
| `sky-blue` | `#55B8F5` | Information, lessons, navigation accents |
| `coral` | `#FF8074` | Limited playful emphasis and character details |
| `lavender` | `#AA91F5` | Creative and AI-themed activities |
| `warm-cream` | `#FFF9EE` | Quiet canvas behind activities |
| `text-forest` | `#173B29` | Dark readable text on appropriate pale surfaces |
| `text-slate` | `#223445` | General-purpose interface text |

**Use colour as a system, not decoration:** Have one quiet background, one primary action, and at most a few purposeful supporting accents per screen. Distinguish coding block families with **labels, icons/shapes, and text**, not hue alone. No colour-only success/failure states. Recheck every actual foreground/background pair in the implemented UI: **WCAG 2.2 AA text contrast ≥4.5:1 for normal text and ≥3:1 for qualifying large text; non-text component/state contrast ≥3:1 where applicable.** Do not infer accessibility from attractive hex values or from the palette table. Prefer dark text on pale brand surfaces; do not put white text on a bright swatch without confirming contrast.

**Age progression:** Little Explorers may use larger pictorial fields and pastel-tinted backgrounds; Junior Creators can use more lively accent colours; Creative Coders and Future Innovators progressively emphasize the workspace and reduce visual noise. Parents get a calmer version of the same green/cream identity. Avoid stereotypes such as girl/pink and boy/blue; let learners choose optional accessible themes.

### 3.7 Typography and reading design

**Candidate font stack:** `Fredoka` for the logo and **short display headings**, `Nunito` for interface copy and learning instructions, and optional `Atkinson Hyperlegible` / `Atkinson Hyperlegible Next` for users who prefer clearer letter distinction. Verify each font's licence, language coverage, glyph rendering, file weight, performance and local fallback before deployment. Never require a custom webfont to make the page usable; use a robust system sans-serif fallback. These are **design candidates**, not evidence that one font improves every child's learning.

**Initial responsive type tokens to test (CSS px equivalents, not rigid device-independent guarantees):**

| Content | Proposed starting size |
|---|---:|
| Main child-facing heading | `clamp(2rem, 4vw, 2.75rem)` (~32–44 px) |
| Section headings | ~24–30 px |
| Early-learner spoken/visible instructions | ~22–28 px, with short phrases |
| Standard child learning copy | ~18–22 px |
| Parent dashboard body text | ~16–18 px |
| Primary child action label | ~18–24 px |

Use sentence case, familiar short words, readable letterforms, generous line height (~1.4–1.6 for paragraphs as a starting point), meaningful space between controls, and short line lengths. Avoid body paragraphs in decorative fonts, long all-caps blocks, tiny captions, image-only text, excessive italics, and automatic text-on-busy-illustration overlays. Provide picture + spoken guidance for pre-readers **without making audio the sole information channel**. Keep text resizable up to 200% and test reflow, focus visibility, translations, and fonts on low-end devices.

### 3.8 Four original learning-world themes

The following are **concepts to validate**, not visual assets to copy from reference platforms:

1. **The Magical Learning Garden (approximately 2–4):** recognizable objects, original animals/plants, matching and naming, calm scenes and a visible adult handoff. Use a tap-an-apple → hear/see "apple" activity with a simple replay/exit path.
2. **Adventure Island (approximately 5–7):** picture-led sequencing, story puzzles, letters/numbers and simple guided block-like tiles; an activity moves a helper across a bridge by arranging a few steps.
3. **Robot & Space Academy (approximately 8–12):** original robots and planets; children build, run, test, and improve real visual programs/appropriate model activities, with increasingly flexible tools.
4. **Future Tech Studio (approximately 13–17):** more mature projects, readable code, adjustable editor density, and safe guided AI experimentation.

Give each world its own original background, component accents, sound set, and character roles while preserving shared navigation, brand, and accessibility standards. Do not create a heavyweight 3D game as the default homepage; favor responsive SVG/optimized illustration and optional enhancement on capable devices.

### 3.9 Character and illustration language

**Candidate original character family:** `Sprout` (a friendly green seedling learning guide), `Byte` (robot: coding and AI), `Ollie` (owl: reading and discovery), `Nova` (star: creativity and achievement), and `Finn` (explorer: observation and problem solving). These names and roles are **provisional**; perform name/brand clearance and user testing before adoption. Commission/design original artwork with documented ownership and licences. Never import competitor mascots or unlicensed screenshots into the product.

Draw recognizable silhouettes, readable expressions, inclusive human characters when present, diverse everyday contexts without stereotypes, and consistent icon and illustration styles. Make every mascot purposeful: give a short hint, model a safe retry, or celebrate a completed effort **only when the learning event warrants it**. Provide a "hide character / simpler view" preference; never let a character obscure task controls or shame the learner.

### 3.10 Navigation, tap targets and age-appropriate interaction

For pre-readers, prioritize a single obvious primary action, **recognizable image plus short label**, a stable home/back route, short predictable paths, and optional voice playback that a child/adult can replay. Avoid multi-level menus, hidden swipes, timed precision puzzles, dense dashboards, surprise modal dialogs, and mandatory fine-motor dragging. Preserve keyboard, touch, mouse, and assistive-tech paths to important tasks.

**SkillSprout design targets to validate:** for toddler-facing primary actions, start with a visible target of about **60–72 CSS px** in each dimension and generous separation; scale appropriately across viewports and device input methods. This is **not a WCAG requirement** and is not proof of toddler usability. WCAG 2.2 AA's target-size minimum is **24 × 24 CSS px subject to exceptions**; the enhanced target-size criterion is **44 × 44 CSS px subject to exceptions**. Meet the applicable standard and test larger child-specific targets in real sessions. Provide tap-to-select → tap-to-place or accessible list controls alongside drag operations. Prevent accidental purchases and use an adult-directed boundary for account, consent, and payment actions.

### 3.11 Motion, audio, feedback and ethical rewards

Use brief, causally meaningful feedback: correct answer → a modest visual/audio response; mistake → a calm explanation and **try again**; finished lesson → a brief celebration and a clear stop/continue choice. Make sound/music optional and independently mutable, add captions or equivalent visible feedback, respect `prefers-reduced-motion`, allow disabling nonessential movement, and prevent flashes or auto-playing sensory overload. Do not use constant confetti, unrelated mascot dances, loud repetitive audio, countdown pressure, endless streak loops, or attention-capturing autoplay in the toddler interface.

Reward **actual learning evidence** (an observed function, explanation, creative artifact, or safe experiment), not minutes watched or arbitrary clicks. Optional pause/finish cues and meaningful offline play prompts should make disengagement easy.

### 3.12 Toddler-specific developmental and family safeguards

Ages ~2–4 require separate product review and a **guardian-led** route. Make activities optional, brief, co-play friendly, low stimulus, noncompetitive, and connected to real-world objects. Offer a printable/real-world extension (e.g., point to two real items of the same colour). Avoid presenting a digital app as a substitute for physical play, conversation, or adult attention. Do not use an unrestricted AI model, webcam/mic collection, open messaging, public projects, behavioral ads, or independent purchase prompts with toddlers. No unsupported promises that an interaction teaches reading or creates measurable cognitive improvement.

The platform should support families setting their own media-use boundaries; do not optimize toddler engagement time as a success metric. Any early-learning course created for this band must be separately authored, reviewed, and tested; do **not** relabel the 5–7 Sorting Garden AI course as suitable for age two.

### 3.13 Child-friendly homepage and sample component contract

**Public homepage:** Use a simple SkillSprout logo and Sprout illustration, a concise parent/child-friendly promise (candidate: **"Grow your curiosity. Create your future."**), a single primary "Explore learning" action, an adult-visible "For parents" route, and a small number of age/skill-appropriate illustrated entry cards. Clearly show what is available versus upcoming. Do not send an unregistered child straight into payment or remote AI.

**Little Explorers home:** Four or fewer large, clearly distinct activity options (for example, ABC, 123, Shapes, Animals), each with an original icon + short label + optional narration. Leave ample separation between cards; one top-level back/home control; no scrolling required to find the exit on reference small screens when reasonably achievable. Do not ship decorative cards as if they were functional. A card without authored content must be visibly labeled coming soon or omitted.

**Coding studio:** Keep playful borders and block colours without reducing editor workspace, legibility, keyboard accessibility, stage visibility, error recovery, or performance. A learner's own invention—not decorative art—should remain the visual focus.

### 3.14 Implementable design deliverables and tokens

Write the above choices into versioned `docs/DESIGN_SYSTEM.md` and actual frontend tokens/components. At minimum provide:

- `colors`: primary/accent/surface/text, interactive states, block-category colours, and tested contrast pairs.
- `typography`: approved font stack + fallback, fluid sizes, line heights, paragraph measure, multilingual coverage, and offline/webfont failure handling.
- `spacing/radii`: responsive grid, activity card sizing, touch target and gap tokens, safe-area handling, focus outlines, and minimum usable viewports.
- `age-modes`: toddler, early reader, creative coder, teenager, adult; show **concrete wireframes** for homepage, age selection, activity screen, editor, and parent view.
- `illustration`: character bible, original-asset ownership/licence record, alt text/decorative-marking rules, low-bandwidth alternatives, and imagery budgets.
- `feedback`: correct/incorrect states, optional audio, reduced motion, low-sensory view, progress based on actual evidence, and pause/exit behaviour.
- `localization`: test varied scripts/fonts, no gender-coded theme assumptions, readable translations, and culturally adaptable illustrated examples.
- `quality`: screenshots for mobile/tablet/desktop, measurable contrast and tap-target audits, keyboard/non-drag test results, reference-device page weight and load time.

Build a small live component gallery (buttons, cards, typography, progress states, onboarding, lesson controls) in the existing frontend, protected or non-public as appropriate; do not introduce a new design system stack simply to present mockups.

### 3.15 Age-inclusive usability study and explicit acceptance checks

**Research plan:** Run moderated, consented usability sessions with several families across the proposed bands, including relevant disability/assistive-tech and lower-bandwidth cases where feasible. An adult should be present for toddler tests. Observe whether participants understand the first action, locate home/exit, start and finish an activity, recover from mistakes, and distinguish lessons from adult-only billing. Ask guardians whether learning goals, privacy controls, and proof of progress are understandable. Record anonymized findings and required design changes, not identifying child video/audio by default. Seek qualified child-development/early-years input before claiming that the ~2–4 experience is educationally appropriate.

**Minimum release tests (add these to Section 13's release gate):**

- `UX-AGE-01`: Age ~2–4 entry is distinct, adult-assisted, non-coding, and can be completed/exited without typing, account creation, or independent AI/chat.
- `UX-AGE-02`: A beginning reader can follow a picture/optional-audio guided activity with a visible home/exit path and a usable non-drag alternative.
- `UX-AGE-03`: An older child's workspace is not forced into toddler-style navigation; the chosen age-mode remains adjustable by authorized users.
- `UX-VIS-01`: Automated **and manual** WCAG 2.2 AA contrast audit checks *actual* text/control/background pairs, including hover, focus, disabled and error states where applicable.
- `UX-VIS-02`: Test target size/spacing on real mobile and tablet devices; document toddler target-size usability as tested or **NOT TESTED**, rather than claiming a CSS dimension alone passes.
- `UX-ACC-01`: Keyboard controls, assistive labels, captions/equivalent feedback, zoom/reflow, audio-off, reduced motion, and alternatives to drag perform core tasks.
- `UX-ETH-01`: Toddler lessons have no autoplay loop, manipulative streaks, child-targeted advertising, public messaging, or child-triggered purchase path.
- `UX-PERF-01`: Original graphics and fonts load acceptably under a declared low-end-device / throttled-network budget; content remains usable when illustrations/audio/custom fonts fail.

### 3.16 Research references and interpretation (reviewed 20 September 2026)

**Primary child-UX evidence (ages 3–12, not two-year-olds):**

- Nielsen Norman Group, *Children's UX: Usability Issues in Designing for Young People* — https://www.nngroup.com/articles/childrens-websites-usability-issues/
- Nielsen Norman Group, *Design for Kids Based on Their Stage of Physical Development* — https://www.nngroup.com/articles/children-ux-physical-development/
- Nielsen Norman Group, *UX Design for Children (Ages 3–12), 4th Edition* (report overview; full paid report not reproduced or assumed read) — https://www.nngroup.com/reports/children-on-the-web/

**Family co-use and healthy media:**

- American Academy of Pediatrics, *Watch Together: Co-Viewing Media With Your Child* — https://www.healthychildren.org/English/family-life/Media/Pages/watch-together.aspx

**Technical accessibility baseline:**

- W3C, *Web Content Accessibility Guidelines (WCAG) 2.2* — https://www.w3.org/TR/WCAG22/
- W3C, *Understanding Target Size (Minimum)* — https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

**Typography reference, not proof of superior learning outcomes:**

- Braille Institute, *Atkinson Hyperlegible Font* — https://www.brailleinstitute.org/freefont/
- Candidate font catalog: https://fonts.google.com/specimen/Fredoka and https://fonts.google.com/specimen/Nunito

**Evidence boundary:** Colour swatches, suggested character names, typography sizes, worlds, and the 60–72 px toddler target are **SkillSprout proposals**, not empirical conclusions of the cited sources. Collect direct SkillSprout testing evidence before calling any treatment "best for all children."

### 3.17 TinyFingers feature review → original SkillSprout product opportunities (NEW — v2.2)

**Research basis:** The attached screenshot shows a quiet four-card Games collection, each with a large illustrated tile, an activity type, suggested ages, a short description, and one exploration action. The public TinyFingers pages additionally describe the following functionality. The right column is **proposed SkillSprout behavior**, not a reported TinyFingers feature or an assertion of superior learning results.

| Publicly described TinyFingers activity / feature | Observed interaction / parameters (as described by its site) | Original SkillSprout product concept and meaningful extension |
|---|---|---|
| Original keyboard/touch playground | Keyboard or touch produces immediate letters, shapes, sounds; home page describes six playful worlds and adult controls. | **Tap & Bloom Playground** (~2–4 with adult): one safe focused play surface, where any supported key/tap causes a single seed, shape, or pattern to grow; an adult can switch between **cause & effect**, **find a shape**, and **take turns**. Sensory responses have explicit off/replay settings; do not infer letter recognition from random input. |
| Eight-note xylophone | Eight notes; touch/mouse/keyboard; optional note naming and keyboard layout; no score or timer. | **Sound Seed Orchestra** (~2–6): original seed-pod instruments and cultural sound packs with licensed/synthesized audio, optional **listen-and-echo** two-note challenge, a visible repeat button, and an offline “make a rhythm with your hands” prompt. Keep a true free-play mode without quizzes. No need for microphone collection. |
| Color Baskets | Pick a matching color with a tap or keyboard; optional drag; adult selects 2/3/4 colors, quiet hints. | **Rainbow Habitat** (~2–4, adult-assisted): match *both* accessible shape/pattern and color to grow an original habitat; start with 2 clear choices, then 3 or 4 only when an adult/learner chooses. Include non-color matching so color-vision differences do not block play. An adult can ask, “What else is like this?” using safe real objects. |
| Counting Picnic | Count/place/remove up to 8 items across described levels; guided spaces and visual clues; submit and retry. | **Little Market Makers** (~3–5): build a small fictional market basket with familiar, culturally adaptable produce illustrations. One-to-one count with optional spoken labels, **add/remove → compare → choose** and a parent/offline “set out three real spoons” extension. Start with 1–3 and provide later curated ranges after testing; never auto-escalate from mistakes. |
| My First Memory Game | Match 2/3/4 pairs, optional brief preview; untimed retries; keyboard, touch, mouse. | **Peek & Pair Nature Trail** (~3–6): a calm pair-finding path with large cards, 2-pair starting option, optional picture preview and semantic variants (**same shape**, **same sound**, **everyday object + shadow**); start with identical picture matching. Do not use unvalidated memory or cognition improvement claims. |
| Games catalog / adult settings | No-account web play, age guides, sound/background/motion/level controls, parent panel, short instructions. | **Little Explorers Mini-Library + Grownup Playbook:** four or fewer visual entry cards, a one-tap local guest preview, plain-language adult settings, switchable sensory mode, a stop/exit route, and one printable/offline conversation idea for each playable activity. Adult permissions for data, subscriptions, or public content are **not** granted by merely holding a hidden settings button. |

**Naming and intellectual property:** SkillSprout names, scenery, artwork, sound assets, scripts, level data, UI layouts, illustrations, characters, and copy must be original or appropriately licensed. Do not download or reproduce TinyFingers code, game artwork, mascot, interface composition, sounds, videos, or activity text. Generic interaction ideas (tap-to-react, matching, simple counting) may inform independently implemented learning experiences; substantiate actual differences through original curriculum and real usability tests.

**Proposed signature progression (a navigational choice, not a compulsory funnel):**

- **Wonder:** a touch or key changes a garden object in one visible, reversible step; adult can model “I touched / this changed.”
- **Notice:** child chooses among two pictures or sounds with picture + optional spoken cue; feedback is specific, not punitive.
- **Predict:** on an age/ability-appropriate supervised activity, an adult asks what might happen before tapping; show the result and discuss it. This is observation and reasoning, **not model prediction**.
- **Arrange:** developmentally ready learners use two or three picture-sequence tiles to arrange *first → next → finish*; tap-to-place exists beside dragging.
- **Make:** when ready, visit **Junior Creators**, where a short rule-based tile program changes a visible original scene; only later introduce the genuine/local-model Sorting Garden AI activities specified in Section 4.

**A distinct product for adults — Grownup Playbook:** Optional activity cards suggest one concise co-play question, an ordinary household-object alternative, accessibility prompts, “stop here” cues, and a skill/observation **without making diagnosis or mastery claims**. Offer printable low-ink pages and a no-print spoken option. A guardian can choose an activity without registering a child. A separate, explicit guardian account flow is required to save identified work or subscribe; a free local guest experience must not be framed as a deceptive trial.

### 3.18 Little Explorers interaction contract and example journeys (NEW — v2.2)

**Information architecture:** Public Home → Explore by interest / For grownups → Little Explorers Home (maximum four *live* illustrated cards: Sound Seed Orchestra, Rainbow Habitat, Little Market Makers, Peek & Pair Nature Trail) → Activity Preview (one clear **Play** action, optional “Play together” hint, actual age/ability description) → Focused Activity → **Pause / Home / Finish**. **Tap & Bloom** is a **free-play mode inside the Sound & Wonder area**, not a fifth competing card on the Little Explorers home. Adult settings and Grownup Playbook are separate, explicit destinations outside the play surface. Cards with no working activity must be labeled **Coming soon** and cannot claim to be playable.

**Page design:** Maintain the v2.1 warm-cream / sprout-green identity with quiet original landscape illustrations, large recognizable object silhouettes, an obvious primary action, 60–72 CSS px *candidate* toddler primary targets with generous spacing, and dark, checked contrast labels. Give each game one dominant task surface and, when needed, just one object plus a few large choices. Never add decorative controls that appear interactive but do nothing. Use a parent-visible no-login entry while retaining SkillSprout's broader, older-learner and guardian navigation in the public site.

**Input and inclusive access:** Support direct tap/mouse, keyboard focus and activatable controls, clear names/instructions for assistive technology, and non-drag alternatives. Implement physical keyboard “any key” *only within a consciously focused play surface*; prevent accidental browser navigation where browser permissions allow but do not claim to trap OS keys, system shortcuts, Escape, or browser chrome. Never listen globally for keystrokes or record their content. For counting and memory, use semantic buttons and deterministic state rather than relying on canvas-only hit targets; include optional captions/visual equivalents for audio and pattern/shape alternatives to color-only matches. Verify touch behavior, zoom/reflow and text at real device sizes.

**Sensory and adult controls:** Sound is off until an adult enables it or a deliberate user action explicitly requests playback; preserve the browser's audio-gesture policies. Sound effects and narration have separate toggles; provide mute, reduced motion, optional high-contrast/low-sensory display, pause, repeat prompt, adult-chosen level and a “no idle hint” option. Essential information remains visible without sound or animation. Never autostart the next game, run an endless animated attract loop, penalize an error, or count time-on-screen as a learning outcome.

**Adult gate:** Use an obvious, appropriately labeled **For grownups** route, with a short explanation and child-uninteresting adult-oriented settings; a hold gesture can reduce accidental entry but **is not authentication**. Saved profiles, consent, billing, data exports, school links and external sharing require real authorized-account checks and adult reauthentication when appropriate. Fullscreen is optional and must have a reachable exit; explain that fullscreen alone does **not** secure the device or prevent OS shortcuts. Recommend device-native guided/screen-pinning controls where available without promising complete containment.

**Two reference journeys to implement and observe:**

1. **Adult with a ~2–4 learner:** Open Little Explorers → choose Rainbow Habitat → adult confirms two choices, optional audio preference → child taps a large patterned object → matching habitat responds → adult asks “Can you find something like it near us?” → **Finish** exits with a single offline suggestion. No account, remote AI request, child analytics profile, clock pressure, paywall or marketing prompt appears during play.
2. **Adult with a ready ~5–7 learner:** Open Little Market Makers → choose and count items → learner predicts what adding one changes → optional **Try making the rule** opens *Junior Creators*, where two picture tiles control a **locally run, clearly labeled rule-based** scene → learner changes a tile and observes the result. This is not machine learning; the separate Sorting Garden course later teaches the difference.

**Independent research required:** Prototype with adult-assisted sessions for 2–4 and with appropriate support for 5–7; have qualified early-years practitioners review scope, input burden and activity claims before release. Observe task comprehension, voluntary stopping, input errors, home/exit discovery, sensory tolerance, co-play quality and offline idea usefulness. Record results as observations with context, not generalized child-development claims or invented engagement metrics.

### 3.19 Early-years release requirements and product boundaries (NEW — v2.2)

- **Functional truth:** Every promoted activity must have a playable state machine, tested input modes, meaningful visual feedback, clear completion/stop behavior, recoverable error states, and a real no-account path. Asset or audio failure must not block the activity.
- **Genuine free sampler:** Keep an appropriately small, useful set of local, no-account early-years activities available without payment, marketing tracking, remote AI, or a child profile. Decide expansion and paid parent offerings transparently; do not place a purchase gate in the child's play flow.
- **No deceptive learning promises:** Show suggested age/ability, observable activity and adult discussion prompts; describe benefits as learning *opportunities*, not guaranteed improvements in memory, attention, IQ, speech or school performance.
- **No covert personalization:** Local transient activity state may remember the current game choice; default to resetting on finish. Store persistent per-child preferences/progress only after explicit, reviewed guardian authorization and documented retention. Do not infer a developmental level from error rate.
- **Originality:** Each product concept must have its own author-reviewed instructional purpose, original asset kit, localized real-world examples, non-color-dependent solution path, asset rights ledger and reproducible tests.
- **Roadmap compatibility:** The Sorting Garden AI Block Lab remains the flagship technical release. A small Little Explorers slice can be built independently once core scaffolding is proven; do not delay functioning AI blocks to publish many decorative toddler pages.

---

# 4. THE SIGNATURE PRODUCT: SPROUT AI BLOCK LAB

This is the **highest-priority product differentiator**. Build a genuinely functioning visual AI learning environment. It is not a mock editor, a video-only AI course, or a chatbot with blocks painted around it.

## 4.1 Studio layout

On larger screens show: (A) project/story objective, (B) categorized blocks, (C) editable workspace, (D) output stage, (E) **Test & Learn** panel, and (F) a contextual “Why did it do that?” inspector. On small screens provide a task-centered view with switchable workspace/stage panels, appropriate touch targets, and no hidden essential actions. Keep panels resizable where useful; allow a distraction-free mode.

Studio controls: Run, Pause/Stop, Step, Reset, Undo/Redo, Save, Reopen, Duplicate, Help, accessible block insertion, text view where meaningful, and project version indicator. Disable or explain controls while they cannot act. Error states must give a specific, age-appropriate recovery path. Autofill or starter examples must be clearly identified.

## 4.2 Original colorful AI block families

Create coherent block types, shapes, and colors, with readable labels, icons, tooltips, keyboard equivalents, and type-safe connections. Design and test the following *candidate* families; limit the first release to the minimum complete set.

| Family | Example ORIGINAL blocks | What children learn |
|---|---|---|
| **START & EVENTS** | `when start is pressed`, `when the player chooses`, `when a sample arrives` | Triggers and sequence. |
| **SEE & HEAR** | `use sample picture`, `listen to demo sound`, `read object card` | Inputs; distinguish supplied sample data from live microphone/camera data. |
| **EXAMPLES & LABELS** | `add [item] as [category]`, `show training examples`, `split examples into train/test` | Labels, data quality, and why varied examples matter. |
| **TRAIN & PREDICT** | `train tiny classifier`, `predict category from [sample]`, `prediction confidence` | Model behavior and uncertainty, with a real supported local model or accurately labeled simulation. |
| **THINK & DECIDE** | `if prediction is [category]`, `if confidence below [threshold]`, `ask a grown-up / choose unsure` | Conditions, safe fallbacks, and decision-making. |
| **CREATE & RESPOND** | `move character`, `tell a story line`, `light up garden`, `draw result` | Make AI decisions visible through games and artifacts. |
| **TEST & IMPROVE** | `test with unseen examples`, `show confusion table`, `add counterexample`, `compare before/after` | Evaluation, error analysis, iteration, fairness. |
| **GENERATIVE AI** (restricted advanced mode) | `choose safe story prompt`, `generate draft with guardrails`, `inspect output`, `revise prompt` | Generative AI as a fallible tool, not an oracle; **no unrestricted user prompt access** for younger cohorts. |
| **DATA & ETHICS** | `use anonymous demo dataset`, `hide private detail`, `check who might be missed` | Consent, privacy, missing examples, and fairness. |

Do not suggest that the visual name `train tiny classifier` trains a model unless training genuinely occurs. If teaching through a deterministic rules simulator, visibly name it “AI concept simulator” or “rules model”; distinguish trained models and remote generative AI in both UI and curriculum.

## 4.3 Required internal architecture

Create a **typed, versioned project format** independent of the rendering library: `schema_version`, owner/tenant identity on the server, `workspace_state` (Blockly JSON or documented alternative), `project_assets`, `datasets`, `model_artifacts` or references, `stage_state`, `execution_settings`, `lesson_link`, `created_at`, `updated_at`, `revision`. Validate types, project size, allowed block families, asset provenance, and migration rules server-side. Use optimistic concurrency and explicit conflict recovery for shared devices/tabs. Define autosave debounce, retry, and offline reconciliation behavior.

Implement an execution pipeline: authored blocks → validated intermediate representation → capability-limited runtime → structured events/output → stage renderer + test harness. Avoid unrestricted JavaScript execution and never run learner-submitted Python/JavaScript inside the privileged FastAPI service. Browser workers help responsiveness but are **not** by themselves a security boundary. Restrict runtime capabilities, prevent ambient access to auth tokens and privileged APIs, enforce time/step/memory limits, and separate any remotely executed code into an appropriately isolated service.

A compatible block library such as Blockly may provide block editing, but **the educational model semantics, project runtime, challenge verifier, AI behavior, and child-friendly product remain original SkillSprout responsibilities**. Use Blockly's JSON serialization and reviewed custom-block/code-generation APIs if selected. Assess current accessibility features rather than presuming full screen-reader support. Provide an equivalent non-drag editing route for core lessons.

## 4.4 Genuine AI learning modes

**Mode 1 — Rules vs AI:** Compare a fixed rule (“if red, choose apple”) with examples-based predictions. The student can discover the difference by changing inputs. Use offline synthetic data; ideal for early learners.

**Mode 2 — Tiny trainable classifier:** Use an approved, small, browser-local classification algorithm for labeled synthetic or nonpersonal sample cards. Show train/test split, prediction, errors, and effect of adding examples. Document algorithm, computational budget, reproducibility, and educational limits. No raw child camera or audio required.

**Mode 3 — Optional vision/sound experiments:** Introduce only after privacy review and guardian permission where necessary. Prefer built-in sample media. If live camera/microphone is enabled, disclose why, request OS/browser permission just in time, process locally when practical, display persistent status, provide an equally educational non-camera fallback, and do not upload or retain raw media by default.

**Mode 4 — Carefully gated generative creativity:** Restricted, age-appropriate tasks with curated inputs and constrained output structures, server-side policy enforcement, modest token budgets, moderation, visible AI labeling, safe failure responses, guardian controls, and no unrestricted child-to-model conversation by default. Do not claim generated text is guaranteed accurate or safe; human-authored non-AI alternatives must remain available.

## 4.5 Explainability and playful debugging

A child can press **“Why?”** to see: the input used, the relevant training examples or rules, the chosen prediction, an age-appropriate uncertainty indicator, and one concrete experiment to try. Allow a **“Make it fail safely”** challenge using counterexamples. Never present an LLM's confident-sounding explanation as a faithful internal explanation of a model unless it is tied to verifiable execution traces.

## 4.6 Save/share boundaries

Projects default to private. Students can preview and duplicate their own work. Parent-approved exports may use static, metadata-stripped images/video or a constrained standalone format; do not enable public galleries, user-to-user chat, unrestricted uploads, or open links to child projects in the first release. Any future sharing requires parental workflow, moderation, privacy review, abuse response, and separate release criteria.

---

# 5. FLAGSHIP COURSE CATALOG: BUILD TO LEARN AI

Create **original** learning worlds. Each course is a sequence of short, concrete lessons with an intriguing question, authentic build, observed result, conceptual explanation, playful reflection, and optional extension. Ages below are *design bands*, not guarantees or hard ability limits. Allow placement and accessibility adjustments. Make curricula culturally relatable without stereotyping learners; use diverse names, environments, voices, and everyday challenges.

| World / Course | Suggested band | Real block-based project | Honest learning outcome |
|---|---:|---|---|
| **The Sorting Garden** | ~5–7 | Train a tiny toy model to sort illustrated seeds, fruit, or recyclable objects; rescue mistakes. | Examples, categories, “AI can be wrong.” |
| **Robot Helper's Lost Things** | ~6–9 | Build a helper that identifies a lost item from safe sample cards and chooses what to do. | Inputs → prediction → decision → output. |
| **Animal Sound Detective** | ~7–10 | Start with supplied labeled sound clips and guess categories; inspect confusing samples. | Data quality and non-perfect predictions. |
| **Fairness Detective** | ~8–12 | Compare training sets for a synthetic character selector; find a group of examples that was left out. | Sampling bias and testing, not judging real people. |
| **Invent a Game That Learns** | ~9–13 | Build a game whose difficulty changes using transparent tracked in-game actions. | Feedback loops, evaluation, and player control. |
| **Story Machine Workshop** | ~9–13 | Combine deterministic story blocks with a bounded, parent-approved generative story extension. | Prompts, revision, source skepticism, AI disclosure. |
| **Neighborhood Problem Solvers** | ~10–14 | Prototype an assistant for a non-sensitive local scenario (e.g., sorting library books or planning a garden) with fictional records. | Human-centered design, trade-offs, prototyping. |
| **AI Builder Studio** | ~13–17 | Move between blocks, traceable JavaScript/Python examples, simple model evaluation, and an original capstone. | How the pieces map to actual code and model behavior. |

**First release:** Implement **The Sorting Garden** as a complete, excellent course with a usable 5–8 lesson sequence and at least one open-ended capstone, plus one short demo project. All subsequent courses remain explicitly roadmap items until authored, reviewed, implemented, and tested. Do not manufacture a catalog of 100 empty courses or republish existing competitors' lessons.

### Optional Little Explorers original mini-products (NEW — v2.2; NOT AI courses)

These are **standalone, adult-assisted play experiences**, not additions to the flagship AI course catalog and not promises that a child will achieve the listed skills. The first Little Explorers release should implement **one complete mini-product** (proposed: Rainbow Habitat) with its full parent/offline companion; all others show **Coming soon** until functional. Age bands are approximate and require early-years review and family testing.

| Original mini-product | Suggested supervised band | One concrete playable interaction | Optional grownup/offline extension | Bridge only when age/ability appropriate |
|---|---|---|---|---|
| Tap & Bloom Playground (accessible within Sound & Wonder) | ~2–4 | Press or tap in one focused surface to grow one seed/shape, then pause and replay a cause-and-effect action. | Point to what changed; tap twice and clap twice away from the screen. | Adult asks “What happens if…?”; no AI label. |
| Sound Seed Orchestra | ~2–6 | Tap large original illustrated sound pods to make notes; optional copy-two-notes activity without a score. | Clap/tap a rhythm using hands or household objects. | For ready learners, arrange two sound icons as a deterministic sequence. |
| Rainbow Habitat | ~2–4 | Match large illustrated objects by clear shape/pattern plus optional color; start with two choices. | Find two matching shapes among ordinary safe household objects. | For ready learners, choose a rule card that sends a shape to the right place. |
| Little Market Makers | ~3–5 | Add/remove a small visible number of fictional produce cards and compare the basket with a pictured order. | Set out and count safe familiar objects together. | For ready learners, program “when an item is added → update count.” |
| Peek & Pair Nature Trail | ~3–6 | Turn over large, optionally previewed matching picture cards; 2-pair starting option; no timer. | Match two drawn/printed everyday objects off-screen. | For ready learners, order “show → choose → check” picture-sequence tiles. |

**Activity content contract:** `activity_id`, version, truthful status (`idea|prototype|review|live|retired`), suggested developmental band, adult-assistance requirement, one observable task, state transitions, settable difficulty, no-drag/keyboard alternative, accessible names, optional audio and visual equivalents, reset/finish, nonpenalizing retry, sensory settings, original/licensed media provenance, minimal local-state rule, co-play prompt, offline prompt, test fixtures and human review sign-off. Avoid claiming that a card represents a released lesson until each item is implemented and tested.

**NEW — v2.3 foundational education track:** Implement Sections 17–20 as the authoritative subject curriculum and product requirements. The existing AI course catalog above remains a separate but connected digital-skills strand. Only list a foundational subject lesson as available after the specific content, interactive behavior, accessible alternative, human review, meaningful progress check and tested implementation exist.

### Mandatory lesson schema and quality checklist

Each lesson includes: unique ID + version; suggested band; reading load; accessibility alternatives; prerequisites; clear outcome; real-world hook; 2–5 minute core activity segments as appropriate; block palette subset; starter project; sample data licensing; target behavior; common errors; optional hint ladder; assessment rubric; objective completion event; child-safe reflection; parent-facing “what was learned”; offline suitability; review status; publication date; and estimated AI compute cost if applicable.

**Example, Lesson 1:** “Can a robot sort our garden?” Student chooses two sample seed cards, drags `when start` → `use sample card` → `predict category` → `show result`, runs it, swaps a sample, observes a changed output, and explains that the system used examples. If no model is trained in this step, label it **sample classifier demo**, not model training. Later lessons introduce authentic local training and unseen-test examples.

### Assessment rules

A lesson is not complete because someone clicked Run or watched a video. Check a traceable functional outcome, a lightweight explanation/choice, or a reviewed project artifact; provide retries without shame. Do not turn completion statistics into ungrounded claims of intelligence, talent, or precise ability. Keep learner feedback kind, specific, and actionable.

---

# 6. GROWTH PATH: BLOCKS → AI REASONING → REAL CODE

Design three intertwined strands rather than isolating AI inside a final elective:

- **Make:** sequencing, events, loops, conditionals, variables, functions, graphics and game creation.
- **Understand AI:** examples, labeling, models, predictions, uncertainty, evaluation, data limitations, bias, privacy, the difference between rules and learned behavior, and appropriate use of generative AI.
- **Invent responsibly:** form a question, sketch a solution, prototype, test with counterexamples, explain results, reflect on affected people, improve.

Older learners should gradually see a meaningful code view or pseudocode for supported blocks, then transition to sandboxed JavaScript and Python projects with explicit mapping from visual behaviors to text code. Do not imply that a blocks-to-Python generator gives students unrestricted, safe execution of arbitrary Python. Use scoped, reviewed runtimes and documented supported APIs.

For Little Explorers, **do not apply the AI Invention Card rubric to toddler games**. If a guardian explicitly chooses a persistent family journal in a future reviewed release, record an optional adult-written observation and a safe offline prompt without automated mastery labels or identifying child photos. For guest play, retain no child history after the defined local session.

Every completed foundational learning unit may yield a **Learning Snapshot**: reviewed learning objective, actual work sample or observable response where retention is permitted, one understandable next step, optional revisit and a suggested offline connection. This is different from the AI-project Invention Card and must not invent a mastery diagnosis.

Every successful project ends with an **Invention Card**: project title; learner-created artifact or safe preview; the question it addresses; blocks/concepts actually used; a test that passed; a test that failed or limitation noted; a suggested next invention. The card is private and visible to authorized guardians/teachers according to role. Children may customize its appearance without adding personal identifiers.

---

# 7. PARENT EXPERIENCE: CONFIDENCE WITHOUT JARGON

Create a parent-facing dashboard with a concise view of **What my child made / What they practiced / What they struggled with / What to try next**. Populate it from actual activity traces, reviewed curricula, and retained learner artifacts. Offer examples of questions parents can ask (“How did you teach the robot to tell these apart?”), low-tech family activities, sensible time-use controls, and easy access to privacy/consent choices.

Support adult-managed child profiles, multiple children under one authorized account, shared-device logout/switching, age-appropriate access, separate academic vs marketing preferences, family plans, localized currencies only where supported, and transparent billing. Never expose one child's private progress to unrelated users or siblings by accident. The parent's product must feel calm and respectful—not like a surveillance dashboard or constant upsell.

**NEW — v2.3, evidence-based subject progress:** Add parent-selected subject/goal views (e.g., beginning sounds, counting to ten, explaining how plants grow), current authored unit, *observed* attempts/work samples, optional review/next steps, accessible offline ideas, and clear distinction between not started, practiced and demonstrated. Keep non-identifying guest play out of child profiles; let guardians correct a mistaken placement and delete retained artifacts. Do not display IQ, personality, attention, cognitive diagnosis or unvalidated percentile/mastery scores.

**NEW — v2.2, Grownup Playbook and adult-managed Little Explorers preferences:** Create a separate, readable adult-oriented area containing a one-minute activity explanation, one co-play question, a one-step offline alternative, developmental/educational claim boundaries, accessibility and sensory instructions, recommended adult supervision, and an easy “finish for now” choice. Start with a static, free, non-tracking parent resource. A later optional account-managed **Family Activity Shelf** may let a parent bookmark activities or set device preferences, but must not silently create identifiable child progress or sell a parenting score. Any identified profile, paid plan or teacher visibility needs the existing guardian/school authorization and data-rights system. Printable activities must be clear in grayscale and on low-ink printers.

---

# 8. TEACHER, SCHOOL, AND CONTENT CREATOR EXPERIENCES

**Teachers:** create classrooms; roster students through authorized workflows; assign lessons; preview them as students; view actual submission evidence; provide rubric-based feedback; export permitted class summaries; accommodate learners; and avoid exposing one family's records to another. Model distinct parent, school, teacher, and student authority—do not assume school authorization covers unrelated commercial purposes.

**Course creators/admins:** create age bands, outcomes, modules, lessons, block restrictions, sample datasets, starter projects, quizzes, rubrics, parent summaries, accessibility alternatives, and release notes. Author lessons as structured content with versioning, draft → review → approved → published → archived workflows. No course publishes with broken links, missing media alternatives, unimplemented blocks, unsafe prompts, or failing challenge verifiers. Publish one well-tested course rather than many fake listings.

**NEW — v2.3 curriculum authoring:** Authorized educators can define subjects, curricular strands, outcomes with stable IDs, prerequisite relationships, scope/sequence versions, language variants, teaching notes, activity manifests, accommodations, child-safe experiment instructions, rubrics, reviewed answer variants, and offline extensions. Track pedagogical/content reviewer, reviewer qualifications/role, locale, sources, safety sign-off, publication state and change history. Schools may map their *own approved* local standards; never imply official curriculum alignment before documented mapping and review.

**AI-assisted authoring:** AI can draft outlines, illustrations prompts, exercises, quizzes, and explanations, but a qualified human reviewer verifies facts, child appropriateness, licensing, accessibility, runtime behavior, and outcomes before publication. Label drafts, keep an edit history, and ensure publishing requires an authorized human action.

---

# 9. ENGINEERING STACK AND ARCHITECTURE

**Preserve the working SkillSprout architecture where compatible. Audit versions rather than blindly replacing them.** Proposed baseline:

| Concern | Preferred solution | Design rule |
|---|---|---|
| Frontend | Existing React/TypeScript framework | Keep the current working Cloudflare-compatible build path where appropriate. |
| Visual programming | Blockly or reviewed equivalent + original blocks | Check licensing, current compatibility, accessibility, JSON serialization, runtime integration, and performance. |
| Game/output stage | Lightweight Canvas/SVG framework or native browser APIs | Simple 2D stage first; no heavyweight 3D engine without demonstrated need. |
| Foundational subject activities (NEW v2.3) | Browser-local typed activity contracts, semantic accessible inputs, optional approved media, authored prompts and deterministic evaluation | Implement phonics/word-building and number-manipulative activities without default AI calls; virtual experiments must be explicitly illustrative and not falsely claim to simulate real scientific data. Modular lesson adapters should share progress/evidence interfaces with the existing course system. |
| Little Explorers runtime (NEW v2.2) | Existing frontend, small typed state-machine modules, SVG/semantic buttons, synthesized or licensed local audio | Distinct from AI Block Lab; browser-local guest mode, no mandatory database/AI calls, deterministic fixtures, tap/keyboard support, accessible non-canvas controls, original assets and optional offline worksheets. |
| Local ML | Small evaluated browser-local model/algorithm | Label simulations honestly; limit compute and supply synthetic nonpersonal data. |
| Backend | Python 3.12 + FastAPI + Pydantic | Clear routers/services/domain modules; server-side validation and entitlements. |
| Database | PostgreSQL + SQLAlchemy 2 + Alembic | Versioned migrations, indexes, constraints, transaction-safe operations. |
| Authentication | Existing Firebase Authentication | Guardian-managed child identity; verify tokens on backend; roles in authoritative DB. |
| Hosting | Existing Cloudflare Workers frontend, Railway backend/Postgres | Validate limits/runtime and deployment with current versions. |
| Object storage | Approved private bucket/provider | Signed authorized access, content inspection and retention controls. |
| Billing | Stripe **only where available and suitable**, or reviewed alternative | Verify business-country eligibility, currencies, fees, and webhook semantics before integration. |
| AI | Configurable server-side model gateway | Verify current model identifiers, pricing, limits, eligibility, and child-data handling; never hardcode an unverified model. |
| Tests/ops | Pytest, frontend tests, Playwright, GitHub CI | CI plus real deployment smoke tests, logging, backups, alerting, rollback. |

**Architecture:** Browser application with a separate, capability-limited local learning runtime; HTTPS to a FastAPI application for saved work, curricula, progress, approved AI gateway, entitlements, and admin tools; PostgreSQL for authoritative persistent records; private object storage for approved assets; Firebase for identity; billing provider for adult purchases. Keep untrusted code/model experiments isolated from backend privileges. Start with a maintainable modular monolith rather than prematurely creating many networked microservices.

Create and maintain `docs/SYSTEM_ARCHITECTURE.md`, `docs/BLOCK_RUNTIME_SPEC.md`, `docs/AI_SAFETY_SPEC.md`, `docs/LITTLE_EXPLORERS_PRODUCT_SPEC.md`, `docs/COMPETITOR_RESEARCH.md` (with dated TinyFingers source notes), `docs/FOUNDATIONAL_CURRICULUM.md`, `docs/LEARNING_PATHWAYS_ENGINE.md`, `docs/EDUCATIONAL_ACTIVITY_CONTRACTS.md`, and data-flow diagrams. For each boundary specify identity, permissions, payload, timeout, size limit, privacy classification, failure behavior, and telemetry policy.

---

# 10. DATABASE, PERMISSIONS, AND DATA CONTRACTS

Design normalized PostgreSQL tables and migrations covering at minimum:

- `users`, `roles`, `role_grants`, `guardian_child_links`, `organizations`, `classrooms`, `classroom_memberships`, `guardian_consents`;
- `courses`, `course_versions`, `modules`, `lessons`, `lesson_versions`, `learning_outcomes`, `lesson_assets`, `publication_reviews`;
- **NEW v2.3:** `subjects`, `subject_strands`, `curriculum_versions`, `curriculum_outcomes`, `outcome_prerequisites`, `outcome_locale_variants`, `lesson_outcome_links`, `activity_manifests`, `activity_reviews`, `offline_activity_guides`; preserve current `courses` / `lessons` keys and use references rather than creating a second incompatible progress database;
- `enrollments`, `lesson_attempts`, `learning_events`, `skill_evidence`, `assessments`, `assessment_attempts`, `achievement_awards`;
- **NEW v2.3 (only when authorized persistence is needed):** `learner_outcome_evidence`, `learner_pathway_choices`, `guardian_placement_overrides`, `curriculum_mapping_reviews`; no persisted guest toddler ability profiles;
- `projects`, `project_revisions`, `project_assets`, `datasets`, `model_artifacts`, `execution_test_runs`, `invention_cards`;
- `subscription_plans`, `billing_customers`, `subscriptions`, `entitlements`, `billing_webhook_events`;
- `ai_usage_ledger`, `safety_events`, `audit_logs`, `privacy_requests`, `feature_flags`.

For each: document fields/types, keys, unique constraints, relationships, soft-delete/retention rules, indexes, ownership, tenant boundaries, and migration/recovery procedures. Scope all child-data queries to an authenticated and **authorized** relationship; avoid insecure direct object references. Prefer immutable revision history for program projects and course versions. Make progress/award updates idempotent; use verified billing webhooks rather than redirect pages as payment proof. Maintain separate records for demos/simulations versus authenticated study. Collect the minimum learning telemetry necessary for the stated product purpose.

**NEW — v2.2 Little Explorers data contract:** No new server-side child tables are needed for the no-account guest sampler: ship static authored activity manifests and locally executed deterministic state machines; keep guest progress transient in memory and reset on finish. Do not transmit raw keypresses, tapping coordinates, sound samples, inferred ability, or identifiable play history. For later guardian-authorized persistent features, consider `early_activity_versions`, `adult_activity_bookmarks` and `adult_play_preferences` (adult-owned) after documenting necessity, retention, consent and authorization; no implicit child profile or automatic cross-device behavioral tracking. Any future `family_activity_observations` must be optional, adult-authored, access-controlled and deletable. Never automatically claim mastery from repeated clicks or error counts.

**NEW — v2.3 subject APIs (authorized where personalized):** read published subject catalog and curriculum versions, outcome/prerequisite graph, lesson/activity manifests with locale and accessibility variants, validated activity completion and optional learner evidence, guardian-controlled pathway placement, and parent/teacher subject summaries. Explicitly separate public no-account static lesson previews from persistent profile endpoints; never trust client-submitted score or a claimed lesson completion. Supply reason codes for next-lesson suggestions and validate acyclic prerequisite graphs at publish time.

**Minimum APIs:** authenticated account/guardian flows; course catalog/entitlements/enrollment; lesson manifest; project create/save/revisions/reopen; safe dataset and model metadata; deterministic challenge verification; lesson progress/evidence; parent dashboards; classroom assignments; content authoring/review/publication; payments/webhooks; restricted AI gateway; account export/deletion; health/operational diagnostics. Specify complete request/response schemas, errors, pagination, retries, idempotency, rate limits, and role authorization for each endpoint. Do not put raw user-controlled execution code in generic backend API routes.

---

# 11. CHILD PRIVACY, SAFETY, AND RESPONSIBLE AI

Before commercial release, determine actual markets and users and obtain appropriate review of local privacy/education/consumer requirements. For example, US child-directed services may implicate COPPA and the UK has a Children's Code; their exact applicability varies by jurisdiction and product design. This specification is not legal sign-off.

Mandatory design defaults:

- Guardian-managed identity and applicable consent before personal data collection/disclosure; review school-specific authorization separately.
- Child profile is private; no public identity pages, direct messages, strangers contacting children, location sharing, third-party behavioral advertising, or unmoderated project gallery.
- No camera/microphone by default; use supplied synthetic examples first; just-in-time permission and equally useful alternate lessons for any optional sensor activity.
- Minimize identifiers and retention; log no raw child prompts, camera images, sound, or private projects by default. Establish documented retention, export, and verified deletion flows.
- Filter and constrain AI input and output; recognize that prompt filters alone are insufficient. Keep remote AI disabled or constrained until privacy, vendor terms, and safety testing are approved for the specific age category and use.
- Explicitly label AI-generated content, simulated AI, trained local models, confidence limitations, and any human review.
- Provide “I am not sure” and safe fallback paths for low-confidence predictions; never infer sensitive traits or identity from children or train on their identifiable media without a fully reviewed, authorized use case.
- Run a threat model for project assets, prompt injection, malicious dataset labels, unsafe generated content, broken role boundaries, privilege escalation, payment fraud, and runaway AI spend.
- Provide guardian settings and usable explanations, not dark patterns that pressure families into weaker privacy.
- **NEW — v2.2 early-years privacy:** No third-party ad/retargeting pixels, behavioral analytics, public sharing, webcam/mic, generated chat, or remote-model calls within Little Explorers guest play; no externally embedded creator videos in the toddler activity surface. Publish a plain-language parent disclosure for any aggregate site analytics and validate applicable consent requirements. Adult-only links to independent resources must be visually and technically separated from child play.
- **NEW — v2.2 safety wording:** Fullscreen/hold-to-open-parent-controls reduce accidental interactions but cannot secure OS-level shortcuts, serve as parental authentication, or replace supervision. Always offer accessible exit/pause; gate purchases, profile editing, external navigation where sensitive, and consent behind authoritative adult authorization. Do not log the letters a toddler presses.

Reference guidance: https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions and https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/designing-products-that-protect-privacy/childrens-code-design-guidance/protect-children-s-privacy-by-default/ . Review current applicable rules before launch.

---

# 12. DELIVERY: PRESERVE EXISTING WORK AND BUILD COMPLETE VERTICAL SLICES

### Phase 0 — AUDIT (mandatory first task)

Inspect the actual `skillsprout` frontend and `skillsprout-backend` GitHub repositories with read permission; compare local and deployed versions; inspect current auth, six existing courses if still present, current API paths, DB migrations, CI, Cloudflare/Wrangler, Railway, environment variable names, logs, and domain routing. Do not assume historical state is current. Produce a matrix: requirement → current implementation → working/partial/missing/unverified → evidence → dependencies → safe migration strategy. Back up relevant production data before a destructive operation. Never commit secret values or ask for them in source files.

### Phase 1 — THE MAGIC FIRST PROJECT (smallest complete product)

Deliver a polished guest demo of **The Sorting Garden** with real block editing, synthetic dataset, executable local classifier or explicitly labeled rules simulation, live stage, inspection of one prediction, error/retry states, keyboard alternative, and device/connectivity tests. A guest's demo remains local and private. The first real milestone is an observable functioning invention, not a screenshot of an editor.

### Phase 1B — FIRST LITTLE EXPLORERS VERTICAL SLICE (NEW — v2.2; gated and independent)

After the Phase 1 AI-demo foundation is verified, implement **one** complete, distinct Little Explorers guest mini-product, proposed **Rainbow Habitat**: four-card-or-fewer hub with only real live links; local deterministic play; two-choice shape/pattern matching with optional color; tap/keyboard/non-drag input; adult sound/motion/level preferences; pause/home/finish; one Grownup Playbook prompt and offline companion; documented original asset licensing; and early-years usability review. Do **not** claim other proposed mini-products are delivered. This optional slice does not require Firebase, Stripe, PostgreSQL, remote AI, or a child account. Parallel design is allowed, but do not cannibalize the functioning AI Block Lab milestone to create empty age-band storefronts.

### Phase 1C — FIRST FOUNDATIONAL EDUCATION VERTICAL SLICE (NEW — v2.3; separately gated)

Following a reviewed content outline, deliver **one original interactive early-literacy mini-path** (e.g., 3 sequential, age-appropriate lessons: distinguish an initial sound using supplied media/illustrations → match a familiar spoken sound to its letter(s) in one supported language/orthography → build/read a short decodable word with only taught sound–letter correspondences). Include adult-guided/offline alternative for nonreaders, accessible text/visual equivalents, a deterministic evidence check, human content review and verified guest/no-account or guardian-authorized save behavior. Do not claim full reading proficiency or an entire primary-school curriculum from this slice. A **three-lesson early-number mini-path** may be the next separately verified slice. Keep 2–4 adult-assisted activities distinct from independent beginning-reading expectations.

### Phase 2 — SAVED FAMILY LEARNING

Implement guardian-managed accounts, child profiles, first 5–8 lesson course, backend-verified child access, save/reopen/revisions, lesson evaluation, genuine progress records, parent Invention Cards, and consent/retention fundamentals. Verify on live staging with test accounts and no real child data.

### Phase 3 — FULL AI INVENTION LOOP

Implement actual small locally trainable classifier on safe supplied examples, held-out test examples, confidence/uncertainty view, error inspection, counterexample improvement, a complete open-ended capstone, and progress evidence. Benchmark on supported lower-end devices; provide a lightweight non-ML alternate route if needed.

### Phase 3B — CURRICULUM EXPANSION GATE (NEW — v2.3)

After at least one working foundational slice and one functioning AI slice are demonstrated, extend the **reviewed** pathways sequentially: (a) early number and additive reasoning; (b) reading/writing; (c) observe–predict–test science; (d) other subjects and optional cross-curricular projects. Each release must include actual outcomes, prerequisite graph validation, authored content, accessibility, language coverage, direct evidence, family explanation, privacy review, and measured low-bandwidth behavior. A public listing for every planned subject is not a substitute for working activities.

### Phase 4 — SECOND COURSE + CREATIVE ECOSYSTEM

Add a second fully authored course (e.g., Robot Helper or Fairness Detective), reusable original sprite/scene library, classroom pilot behind a feature flag, age-adjusted learning paths, richer parent/teacher evidence, and accessible text-code bridge where implemented.

### Phase 5 — APPROVED GENERATIVE AI + COMMERCE

Introduce only approved bounded generative activities after child-safety, vendor/data, cost, moderation, permission, and failure-path reviews. Integrate adult-only billing and verified entitlements after payment-provider eligibility is checked. Implement administrative authoring/review, support, monitoring, backups, and account/data rights.

### Phase 6 — RESPONSIBLE SCALE

After pilot evidence, expand course catalog and languages, localization, school features, advanced coding, and limited community/export features *only* after separate child-protection and moderation requirements pass. Consider offline-first and richer device integrations when feasible, without weakening safe defaults.

**Never mark a phase complete because interface pages exist.** A complete phase includes real behavior, authorized persistence when applicable, appropriate accessibility, error handling, safety review, tests executed, and verified staging or production behavior.

---

# 13. REQUIRED ACCEPTANCE TESTS / DEMONSTRATIONS

For every release provide reproducible evidence of the following, with test IDs and results:

1. **First wonder:** A guest opens the safe sample project, rearranges a colored block, runs it, and sees the actual change in the stage without account creation or third-party AI access.
2. **Real distinction:** A learner can inspect whether a behavior is scripted, locally trained, or remote generative; no pretend AI is labeled as actual training.
3. **Learn and revise:** A learner can train on a small synthetic dataset, run a separate test set, observe an error, add a counterexample, retrain, and see a meaningful result (with deterministic seed or controlled test fixtures).
4. **Persistence:** An authorized student saves, closes/reloads the page, and retrieves the identical executable project including its workspace state and version; concurrent edits have defined conflict handling.
5. **Learning evidence:** Course completion follows the rubric or actual project trace and cannot be forged by clicking Run, repeating requests, or manually calling the progress endpoint.
6. **Parent clarity:** A linked guardian views the project, evidence-based learning outcome, and a concrete discussion suggestion, but cannot access unrelated children.
7. **Safety:** No child can browse another user's private project, bypass premium entitlements, change roles, access secrets, enable unauthorized sensors, or reach unrestricted model chat.
8. **Accessibility:** Core first-course tasks have a keyboard/non-drag path; labels, focus, contrast, reduced motion, and captions/alternatives are tested with assistive methods and real users where possible. Also execute age-mode visual and interaction test IDs `UX-AGE-01` through `UX-PERF-01` specified in Section 3.15; report actual results rather than aesthetic assumptions.
9. **Performance/failure:** Test on a documented low-end reference device and throttled network; initial loading, autosave failure, AI provider outage, billing retry, and backend downtime show safe recovery and no false completion.
10. **Publishing:** Administrators cannot publish a course whose required block types, assets, tests, safety review, or human content approval are missing.
    **Little Explorers acceptance suite (NEW — v2.2; required before advertising its guest sampler as live):**
    - `LE-01`: One complete activity works without login, network AI call, billing, or a child analytics identifier; its hub shows no dead-end “Play” cards.
    - `LE-02`: Keyboard, touch and mouse can perform the core action; accessible names, focus and non-drag alternatives work with screen reader/keyboard checks; color is not the only matching signal.
    - `LE-03`: An adult can choose the documented initial two-option mode, pause, mute, reduce motion, restart and finish; the activity never auto-starts another game or punishes mistakes.
    - `LE-04`: The focused input surface ignores typing outside play, does not log typed content, and does not falsely promise to block operating-system shortcuts or secure fullscreen.
    - `LE-05`: A grownup finds the play instruction, one co-play question and one feasible offline extension without registering or entering billing; print view is readable without color.
    - `LE-06`: End-of-session guest data is cleared as specified; no camera/mic, raw keypress upload, third-party child advertising, live AI chat, automatic performance diagnosis, or public sharing appears in play.
    - `LE-07`: An accessible parent gate is differentiated from *actual* account reauthentication; simulated parent-hold alone never authorizes purchases, data disclosure or child-profile changes.
    - `LE-08`: Reviewed original assets, appropriate early-years human content review and recorded consenting-family usability results are attached; unmet research is marked **NOT TESTED**, not silently passed.
    - `LE-09`: Test low-end mobile/tablet and desktop on a throttled network, audio unavailable, optional art unavailable, zoom, reduced motion, offline/poor-network after initial load, and recoverable refresh/exit behavior. Document actual browser limitations.
    - `LE-10`: A developmentally ready learner's optional tile-to-block bridge is clearly labeled **rules**, never falsely described as a trained AI model, and toddlers cannot be auto-enrolled into the full AI editor.
    **Foundational learning acceptance suite (NEW — v2.3; required for each published subject slice):**
    - `EDU-01`: A published unit points to a human-reviewed subject, strand, curriculum version, observable outcome, documented prerequisites and suitable language/age-/ability-variant; missing fields block publication.
    - `EDU-02`: The first three-lesson literacy path genuinely plays with known letter–sound examples and a readable short word; human reviewer verifies content and audio/text equivalents. Never equate clicking the correct letter once with reading mastery.
    - `EDU-03`: The first number path provides one-to-one correspondence, stable visual objects, counting/quantity comparison and a meaningful incorrect-answer recovery; number labels and spoken labels agree.
    - `EDU-04`: Science activities distinguish observed results from illustrations, predictions and simulations, require safe supervised handling when relevant, and have reviewable observation/explanation evidence.
    - `EDU-05`: For a published pathway, the prerequisite graph is acyclic; reachable next activities are justified by declared links and actual evidence; guardian/teacher can inspect and correct placement. No diagnostic or IQ inference.
    - `EDU-06`: An unrelated guardian/teacher cannot read or alter any learner’s subject evidence, saved writing, classroom work or placement; guest data stay transient.
    - `EDU-07`: Keyboard, touch, screen-reader/semantic alternatives, clear sound-off access, captions/visual equivalents, age-aware layout, translations and non-drag controls permit the actual learning outcome.
    - `EDU-08`: The parent view shows a verified work sample or observed practice, a plain-language objective, and an optional short offline follow-up without invented proficiency statistics.
    - `EDU-09`: The release documents a real working activity, review approval, deterministic automated tests, manual accessibility checks, low-end-device behavior and explicit NOT RUN/BLOCKED findings.
    - `EDU-10`: Children cannot access autonomous tutor chat, unreviewed AI-generated exercises, external links, unsafe chemistry demonstrations, paid actions or public upload from these activities.
11. **Payments (when enabled):** Only an authorized adult can initiate purchase, and premium access comes from verified provider event/state with idempotent processing.
12. **Deploy:** Validate actual domain, authentication flow, API origin/CORS, database migrations, storage permissions, SSL, logs, monitoring, backups, and rollback in the configured environment.

Report **NOT RUN** or **BLOCKED** honestly when a test cannot execute. Never transform a design ambition into a verified product claim.

---

# 14. REQUIRED OUTPUT FILES AND WORKING AGREEMENT

Maintain a single source of truth in the repositories:

```
AGENTS.md
README.md
.env.example
/docs/
  MASTER_BLUEPRINT.md                 # this document
  COMPETITOR_RESEARCH.md              # dated facts, sources, unknowns, TinyFingers review (v2.2)
  PRODUCT_DECISIONS.md                # approved choices & reasons
  DESIGN_SYSTEM.md
  INFORMATION_ARCHITECTURE.md
  LITTLE_EXPLORERS_PRODUCT_SPEC.md    # v2.2 early-years games, adult co-play, state machines, tests
  FOUNDATIONAL_CURRICULUM.md          # v2.3 reviewed scope/sequence, outcomes, language and standards mapping
  LEARNING_PATHWAYS_ENGINE.md         # v2.3 explicit prerequisites, choices, evidence, placement
  EDUCATIONAL_ACTIVITY_CONTRACTS.md   # v2.3 subject runtimes and assessment test fixtures
  SUBJECT_CATALOG_AND_RELEASES.md     # v2.3 planned vs reviewed vs truly live subject units
  CURRICULUM_AND_LESSON_SCHEMA.md
  BLOCK_LANGUAGE_AND_RUNTIME.md
  AI_MODEL_AND_SAFETY_SPEC.md
  SYSTEM_ARCHITECTURE.md
  DATABASE_SCHEMA.md
  API_CONTRACTS.md
  CHILD_PRIVACY_AND_CONSENT.md
  SECURITY_THREAT_MODEL.md
  TEST_PLAN_AND_RESULTS.md
  DEPLOYMENT_AND_OPERATIONS.md
  ROADMAP_AND_FEATURE_STATUS.md
/frontend/   # if single-repo; preserve existing separate frontend repo otherwise
/backend/    # if single-repo; preserve existing separate backend repo otherwise
/tests/
```

For the current **two-repository setup**, keep each implementation in its existing repository and place shared source-of-truth documents in an agreed canonical location with versioned references; do not create a third repository without a concrete benefit and permission.

At each milestone, report: requirement IDs; actual files changed; API/database migrations; screenshots or runnable demo location *only if actually produced*; tests executed and their results; accessibility/security checks; deployment and GitHub push confirmations only when verified; honest limitations; next unblocked work. Do not send credentials, private child information, or personal data into GitHub issues/logs.

---

# 15. EXACT FIRST EXECUTION INSTRUCTION FOR THE AI CODING AGENT

> Read this entire **v2.3** master blueprint as the product specification. Inspect the **existing** SkillSprout frontend and backend repositories and current deployments before making any code changes. Verify and document existing functionality, including authentication, published courses, and data persistence. Research only the competitor capabilities necessary to avoid factual assumptions or copying. Produce a concise architecture and gap analysis. Then build **Phase 1: The Sorting Garden** as a complete, original, accessible, browser-runnable AI-block learning demo with honest simulation/model labeling, a working stage, tests, safe error states, and a clear path to saving projects in Phase 2. Separately document the **v2.2 Little Explorers** guest-play opportunity from the dated TinyFingers public-page research in Section 3.17, and plan **Phase 1B** as one fully working, original, adult-assisted activity with its Grownup Playbook; do not divert Phase 1 into a gallery of placeholder games or treat toddler matching as AI. Preserve existing working functionality and do not claim milestones, pushes, tests, or deployments succeeded unless verified. Also implement the new Section 17–20 **foundational education** requirements as real, human-reviewed, testable vertical slices starting with Phase 1C early literacy; do not claim that a subject, literacy program or full curriculum exists merely because its landing page or sample game exists. Carry forward explicit subject outcomes, pathway graph, parent explanations, evidence validation and safety/accessibility tests. Continue through the approved roadmap using complete vertical slices and maintain `ROADMAP_AND_FEATURE_STATUS.md` as the authoritative record.

**North star:** A child proudly says, **“I built this, I know how it works, and I know how to make it better.”** A parent can see the evidence. The system can prove that the functionality is real.


---

# 16. v2.2 CHANGE CONTROL AND VERIFICATION NOTE

**Origin:** v2.1 master instruction supplied by the project owner, expanded on 22 September 2026 using their TinyFingers Games screenshot and the linked public pages. All earlier v2.1 architectural, learning-design, deployment and child-safety obligations remain in force unless expressly elaborated here.

**Source-derived:** TinyFingers public descriptions of keyboard/touch responses, eight musical notes, 2–4 color choices, staged counting to eight, 2–4 picture pairs with optional preview, no-account browser entry and adult sound/motion/difficulty settings. The cited pages are observations about what the website says; detailed runtime reliability, source code, age suitability, accessibility conformance, privacy claims and educational outcomes were **not independently validated**.

**New design proposals, not observed competitor facts:** Tap & Bloom, Sound Seed Orchestra, Rainbow Habitat, Little Market Makers, Peek & Pair Nature Trail, Grownup Playbook, optional rule-tile bridge, four-card Little Explorers hub, implementation requirements and the `LE-*` release suite. Their performance, popularity and pedagogical impact remain **NOT TESTED** until proper research and implementation.

**Source index (public pages consulted 22 September 2026):**

- Games overview: https://tinyfingers.net/games/
- Original keyboard playground and adult controls: https://tinyfingers.net/
- Musical activity: https://tinyfingers.net/games/xylophone
- Color matching: https://tinyfingers.net/games/color-sorting
- Counting activity: https://tinyfingers.net/games/counting
- Picture matching: https://tinyfingers.net/games/memory
- Parent setup guides: https://tinyfingers.net/guides
- About and site-declared privacy model (unverified): https://tinyfingers.net/about
- Input test tools (not direct evidence of early-years learning): https://tinyfingers.net/tools

**Implementation handoff:** Inspect actual current repositories and deployed system first; create a feature-status matrix for each new `LE-*` and Section 3.17–3.19 requirement; make no claim that any mini-product is currently live in SkillSprout. Original artwork, licensed sounds, localized fictional examples, documented parental involvement and safe local-only guest play are part of functionality, not marketing afterthoughts.

---

# 17. v2.3 FOUNDATIONAL EDUCATION: PRODUCT SCOPE, CURRICULUM AND PROGRESSION

**Status and provenance:** This section is a **new SkillSprout product-design proposal** created from the project owner's request to add broad school-subject education to the v2.2 specification. The existing v2.2 research documents TinyFingers' basic games, *not* independent evidence for a complete academic curriculum, efficacy claims, official curriculum alignment, or readiness at a particular birthday. The learning activities below are requirements and examples to be authored and validated, not delivered lessons. Preserve all v2.1/v2.2 requirements, including adult-assisted ages ~2–4, the original AI Block Lab, WCAG-oriented access, child privacy, and honest training/simulation labels.

## 17.1 Educational mission and boundaries

Offer an **integrated, growing learning ecosystem**: early oral language, print awareness and number sense → reading, writing, mathematical reasoning and scientific inquiry → geography, creativity, logic and practical skills → computing, AI literacy and interdisciplinary invention. Foundational subjects must be worthwhile in their own right; never require an AI block activity to complete a basic reading or mathematics lesson. Keep the product accessible to learners who are not yet ready for independent reading, programming, or sustained screen interaction. Encourage real-world observation, conversation, movement and adult/peer collaboration where useful.

**Curriculum is not an age guarantee.** The following bands guide interface and initial content planning rather than diagnosing development, setting rigid placement, or claiming that all children meet the same milestones. Placement combines guardian/educator choice, optional demonstrated prerequisites and learner preference; provide explicit review and skip/retry controls. Do not automatically assign a younger interface based on error counts. Use localized, qualified educational review for each published language and jurisdiction; a translation alone is not proof that phonics, examples or local curriculum mapping remain valid.

| Experience band (approximate) | Language/literacy | Number/mathematics | Science and broader learning | Appropriate interface and participation |
|---|---|---|---|---|
| ~2–4 Little Explorers | Co-play conversation, words and object naming, rhymes, listening, picture books, noticing symbols; *no mandatory formal reading, spelling or handwriting*. | Count small real objects with adult, compare more/less informally, notice simple shapes and patterns. | Name familiar plants/animals/body parts and weather through supervised observation, stories, movement and offline play. | Adult-assisted short, optional, noncompetitive episodes with big targets, obvious finish; no independent AI/chat. |
| ~5–7 Junior Learners | Spoken-sound awareness, explicitly taught sound–letter relationships for a supported language, word blending/segmenting, decodable text, writing/dictation and comprehension. | One-to-one correspondence, number symbols/value, zero, compare/order, additive reasoning, simple shapes, measurement and contextual problems. | Ask questions, make predictions, observe safe everyday processes, group living/nonliving things, use simple records and explanations. | Picture-led concise activities, accessible optional narration and physical manipulatives; verified non-drag path. |
| ~8–12 Creative Explorers | Increasing fluency, vocabulary, informational/narrative comprehension, spelling and paragraph-level writing, evidence and revision. | Place value, multidigit operations, multiplication/division, fractions, decimals, geometry, measurement, data and early proportional reasoning. | Life/physical/Earth-space science; controlled fair comparisons, data tables and evidence-based explanations; geography, art and introductory computing. | More substantial projects, choice of representation, optional text plus blocks, private saved work with authorization. |
| ~13–17 Future Innovators | Extended reading and writing, argument, source evaluation, research, media/digital literacy and communication. | Algebra, functions, geometry, statistics, probability and additional curriculum-appropriate topics; multiple solution strategies. | Scientific models, experimental design, data quality, ethics, environment, social studies, arts, financial literacy and complex interdisciplinary projects. | Mature workspace, transparent AI support when approved, code bridge and advanced challenge options; appropriate legal/guardian/school permissions. |

**Content review standard:** Partner with qualified teachers/subject specialists and, for ages ~2–4, early-years experts. Document target language, locale, intended audience, reviewed outcomes, safety, cultural relevance, accommodations, curriculum reference *if verified*, and review date. Never advertise accreditation, government approval, specific examination preparation, or standards alignment without verified mapping and permission where needed.

## 17.2 Language, letters, phonics, reading and writing strand — `LIT-*`

Create one connected literacy path with optional separate entry routes for **listening & speaking**, **letters & sounds**, **words & spelling**, **reading & comprehension**, **writing & storytelling**. Illustrations and narration complement—not replace—purposeful human conversation, shared reading and print exposure.

| Sequence | Example observable outcome | Original SkillSprout activity / interaction | Evidence and teaching constraints |
|---|---|---|---|
| `LIT-01` Listen, notice, talk | Match a familiar picture to an orally supplied word, identify a rhyme or syllable in an authored activity. | **Sound Safari:** hear/replay a short reviewed utterance; choose among clearly distinct pictures or repeat a rhythm with an adult. | Audio-off alternative for the visual objective; genuine auditory discrimination objective requires an accessible equivalent path rather than falsely claiming it can be proven without hearing. |
| `LIT-02` Letter and symbol recognition | Identify a selected letter in supported script and distinguish uppercase/lowercase where the orthography uses them. | **Alphabet Garden:** tap a letter among a few distractors; see an original object illustration and a spoken label. | Do not suggest letter names alone establish decoding; allow non-visual, keyboard, and speech-independent participation. |
| `LIT-03` Sound–symbol correspondence | Match *taught* phoneme(s) to the correct grapheme(s) in the currently configured language/orthography. | **Letter-Sound Workshop:** teacher-authored sound cards, matching and short exemplars. | Phonics rules are **language-specific**; do not transplant English lessons into another language without qualified adaptation and audio review. Avoid ambiguous words and dialect-only scoring. |
| `LIT-04` Blend and segment | Blend taught sounds to decode a short word and break a spoken word into meaningful sound units when appropriate. | **Word Builder:** move or tap-to-place accessible grapheme tiles, blend with a human-reviewed recording, then choose the matching picture. | Starter words must use *only previously taught correspondences*; correct distractors, pronounceable audio and word meaning are reviewed. |
| `LIT-05` Vocabulary & comprehension | Explain/select a fact or sequence from a short illustrated story, with age-appropriate expression options. | **Reading Adventure:** optional narration, highlighted text with user control, picture sequencing and a meaningful why/what question. | Do not reduce reading comprehension to a timed multiple-choice click; accept oral, pointing, typed or supported alternative evidence as relevant. |
| `LIT-06` Spelling, handwriting, composition | Form a word, compose/revise a sentence or write an original story at an appropriate level. | **Writing Studio:** spell with tiles/keyboard, optional motor-friendly tracing *without mandating handwriting*, type or dictate under reviewed privacy rules, edit an illustrated story. | Never retain or transmit raw child speech by default; accessible alternatives to tracing and voice input required; authorized work remains private. |
| `LIT-07` Advanced literacy and media | Summarize, compare sources, justify an interpretation and create a referenced explanation or story. | **Research & Story Lab:** curated source cards and claim/evidence organizer; optional approved AI critique with human oversight for older bands only. | Separate human-authored text from AI output; check source quality and avoid unsupervised child-to-model chat. |

**Language scope:** Phase 1C selects **one** reviewed language and orthography, locale-specific images and professionally checked recordings; store source language and reading direction in the manifest. Add other languages only after native/qualified teacher review of sound inventory, letter mappings, tokenization, word choices, dialect accessibility, fonts and narration. Support bilingual navigation where feasible but do not assume one set of English phonics cards teaches every language. Offer accessibility alternatives and culturally diverse examples without assuming a user's nationality or home language.

## 17.3 Number, mathematics and reasoning strand — `MATH-*`

Progress from **concrete objects → pictures → symbols → mental/abstract explanation**, with a learner-controlled return to manipulatives. Encourage different valid strategies and meaningful mathematical explanations rather than only answer-speed scoring.

| Sequence | Outcome and subject knowledge | Original interactive product | Implementation rule |
|---|---|---|---|
| `MATH-01` Number sense | One-to-one counting, quantity comparison, cardinality, zero, numeral recognition, number order. | **Number Garden:** count seeds by tapping one at a time, regroup and select the numeral; show how many as a stable visible set. | Correct quantity, spoken prompt, written numeral and evaluator must agree; no unintentional duplicate count from rapid taps. |
| `MATH-02` Operations | Compose/decompose amounts; add and subtract with objects and explain a strategy. | **Addition Adventure / Subtraction Safari:** add/remove visible objects and compare before/after; show more than one solution. | Start with small non-negative counts; avoid introducing a minus sign before the concept is explained. |
| `MATH-03` Multiplicative reasoning | Understand equal groups, repeated addition, arrays, sharing, multiplication and division with remainders when suitable. | **Multiplication Factory / Division Playground:** build equal groups and share tokens. | Never present repeated addition as the *only* meaning of multiplication; promote grouping and interpretation. |
| `MATH-04` Place value & rational number | Work with place value, fractions as equal parts/quantities, decimals, percent and number-line position. | **Place-Value Workshop / Fraction Kitchen:** decompose numbers, partition original illustrations into truly equal portions, compare on a number line. | Geometric pictures, numerator/denominator notation and actual values must match; no misleading unequal visual halves. |
| `MATH-05` Geometry and measurement | Identify and transform 2D/3D shapes; compare length, mass, volume, time and money in supported locales. | **Geometry World / Measurement Lab:** rotate shapes, measure using on-screen calibrated representations, sort units and solve contextual problems. | Distinguish digital illustrations from calibrated real-world instruments; adapt currency/units to locale without fabricating exchange rates. |
| `MATH-06` Data, patterns and advanced reasoning | Analyze graphs, chance, statistics, ratios, algebraic rules, functions and proof-like explanation at suitable levels. | **Data Detective / Pattern Lab:** build a chart from an approved synthetic dataset, compare claims and generate a symbolic rule from a visual pattern. | No high-stakes financial or scientific conclusions from sample games; show data provenance and uncertainty. |

**Number-game acceptance:** deterministic item count and evaluator fixtures, internationalized numerals and optional narration, a manipulatives fallback, multiple response methods, clear wrong-answer retry and text alternatives for image-only math. For older topics, use expert-reviewed content and proofs/solution checks where relevant; do not fill an advanced-math page with random generated arithmetic questions.

## 17.4 Science discovery and scientific reasoning strand — `SCI-*`

Use a consistent **Wonder → Predict → Observe/Test → Record → Explain → Revise** interaction when pedagogically appropriate. A digital demonstration cannot by itself verify a real-world law of nature; clearly distinguish a stylized illustration, an interactive rule-based model, real observations collected by a learner and genuine measured data.

| Topic and outcome | Example original experience | Safety/evidence rule |
|---|---|---|
| `SCI-LIFE` Plants, animals, habitats, life cycles | **My Living World:** compare plant conditions using a clearly labeled virtual illustration, then observe a real plant offline with an adult. | Do not assert the simulated growth reflects real biological rates; invite an age-appropriate observable question. |
| `SCI-BODY` Body, senses and basic health | **My Body:** identify labeled external body parts, sensory experiences and hygiene choices using inclusive original illustrations. | Avoid medical diagnosis, personalized symptom interpretation, body-shaming or asking for health data. |
| `SCI-EARTH` Weather, water, Earth and environment | **Weather Watch / Earth Guardians:** read curated weather-symbol stories, compare water states in illustrated contexts and discuss local environments. | No unsafe weather activity, precise location collection or unverified local forecasts; distinguish climate and daily weather. |
| `SCI-SPACE` Earth, Moon, Sun and solar system | **Space Explorers:** rearrange clearly labeled, not-to-scale planetary cards and explain day/night with an age-appropriate model. | State where sizes, distances and timings are not to scale; avoid false astronomical claims in art. |
| `SCI-PHYS` Motion, sound, light, magnets and simple machines | **Little Physics Lab:** predict which of several safe illustrated objects might move/reflect; try supervised household counterparts. | No mains electricity, projectiles, sharp objects, unsafe heat or dangerous experiments; sensor/camera use never mandatory. |
| `SCI-MAT` Materials and introductory chemistry | **Materials Detective:** classify safe everyday materials; illustrate solids/liquids/gases and safe dissolving with supervised offline alternatives. | No hazardous chemicals, heating, ingestion, explosive reactions, unsupervised chemical recipes or fabricated experimental results. |
| `SCI-INQUIRY` Experiment design and evidence | **Question & Evidence Notebook:** compare a single changed variable using supplied fictional/synthetic data, annotate what was observed versus inferred. | Give credit for thoughtful counterexamples; distinguish correlation from causation at suitable levels. |

**Science activity manifest:** clearly state the question, source/quality of imagery or data, whether the interaction is *illustration*, *simulation*, *real-world observation* or *real measured dataset*, adult participation and safety notes, supported conclusion, known limits, accessibility alternatives, and human scientific review. No unreviewed generative-AI fact explanations in young-child lesson delivery.

## 17.5 Our world, society, creativity, logic and practical life strands

| Strand | Proposed original product(s) and learning path | Content, permissions and age-fit |
|---|---|---|
| `WORLD-*` Geography and social studies | **My Home & Community** → **World Explorer** (maps and scale) → **Culture & Histories** (multiple evidence-based perspectives) → **Earth & People** (human-environment relationships). | Do not treat one culture as the default; avoid collecting exact location, family details or sensitive identity; source disputed history and avoid reducing it to stereotypes. |
| `ART-*` Art, music and storytelling | **Digital Art Studio**, **Music Makers**, **Story Creator**, **Animation Playground**, later **Creative Inventions** bridging to blocks. | Original or licensed assets and audio; allow open-ended unscored creation; private exports by authorized adults; offer accessible music alternatives and color-independent controls. |
| `LOGIC-*` Logic and problem solving | **Pattern Detective**, **Puzzle Island**, **What Happens Next?**, **Build a Solution** with optional picture-tile sequencing. | Explain task reasoning, avoid IQ/intelligence labeling, use multiple valid solutions where appropriate; transparent rule-based bridge to visual coding for ready learners. |
| `DIGITAL-*` Digital literacy and citizenship | Devices/input, keyboard/mouse/accessible controls, files and responsible use, privacy, scams/misinformation at suitable older levels, safe AI literacy. | Do not ask children to provide real passwords, personal photos, contacts or financial credentials. Use fictional examples. |
| `LIFE-*` Practical life, communication and financial literacy | Collaboration, planning, real-world measurement and age-appropriate money concepts; older students can make transparent fictional budgets and compare choices. | No child-directed payment prompts, actual purchase tests, manipulative financial gamification or investment recommendations. |
| `LANG-*` Additional language learning | Optional listening/speaking/vocabulary/reading pathways authored for each chosen language. | Do not reuse English phonics mappings blindly; require culturally and linguistically appropriate human review and usable alternate response modes. |

**Proposed cross-subject capstone — Little Smart Garden:** A pre-reader identifies real/safe illustrated plants with an adult; a beginning learner labels seed parts and counts objects; an older learner records fictional plant-growth data and explains a pattern; a developmentally ready coder creates a visual rules-based garden; an advanced learner uses a *clearly labeled* small sample classifier and tests mistakes. These are **five separate age-/ability-appropriate lesson variants**, not a single toddler-to-AI funnel. Each variant has its own real outcome, content review and evidence contract.

---

# 18. v2.3 SUBJECT PRODUCTS, UX AND LEARNING ACTIVITY CONTRACTS

## 18.1 Navigation and discovery

Public Home → **Explore learning** → choose **By age/ability**, **By subject** or **By interest**. Subject cards show a truthful status (`Playable now`, `Preview only`, `Coming soon`), intended ability range, optional adult guidance, supported languages, offline expectations, and estimated active interaction. Child Home shows at most one prominent resume/continue action and a clearly accessible **Change subject** route; do not crowd early-learner home with the entire academic catalog. Maintain Little Explorers' at-most-four live-card rule within its own focused subexperience.

Use a coherent SkillSprout brand across **Alphabet Garden, Mathematics Academy, Science Discovery Lab, World Explorer, Creative Studio, Logic & Patterns and AI Block Lab**, but allow older students a less childlike presentation. A child choosing science must not be redirected into a sales page or an unrelated AI course; if a lesson does not exist, say so plainly.

## 18.2 Unified activity manifest; no hard-coded fake lessons

Each shipped activity must resolve a versioned, reviewed record with the following fields (exact syntax and SQL types belong in `docs/EDUCATIONAL_ACTIVITY_CONTRACTS.md`):

```yaml
activity_id: lit-word-builder-001
activity_version: 1
subject_id: literacy
strand_id: letters-and-sounds
curriculum_version_id: reviewed-curriculum-v1
outcome_ids: [LIT-03, LIT-04]
prerequisite_outcome_ids: [LIT-02]
locale: en-XX   # replace placeholder with an actually reviewed locale before publishing
language_direction: ltr
ability_band: beginning-reader
review_status: draft  # published is forbidden until all reviews/tests pass
activity_type: letter_tile_word_builder
content_source: human_authored
requires_account: false
requires_ai: false
requires_camera_or_mic: false
requires_guardian_presence: false
requires_child_persistence: false
input_modes: [tap, keyboard, non_drag]
accessibility_alternatives: [readable_text, replayable_reviewed_audio, visible_feedback]
objectives: ["Build one short word using previously taught correspondences"]
assessment_contract: verified_decoder_task_v1
asset_provenance: pending
content_reviewer: pending
accessibility_reviewer: pending
safety_reviewer: pending
published_at: null
```

**The example is deliberately unpublishable.** Its placeholder locale and pending reviews prevent an engineering agent from passing a draft fixture off as completed content. Implement a *validated* schema, documented optional/required fields by activity type, runtime compatibility checks, source-of-truth version references, migrations and fallback behavior. Do not expose reviewer personal details to children.

## 18.3 Core learning runtime and feedback

For each real activity, show the **goal** in one short sentence/picture → one authentic **do something** interaction → concrete **observe result** → prompt to **explain or try again** → optional **finish or continue**. Implement semantic controls, touchscreen/keyboard/non-drag paths, meaningful visual equivalents for audio, user-controlled playback/motion, clear back/home, deterministic reset, and safe error recovery. Feedback describes the observed task (e.g., “You placed four seeds; the basket needs five”) rather than judging the child (“You are bad at math”). No surprise time limit, forced leaderboard, autoplay loop, answer-only mastery score or unnecessary child tracking.

Each activity adapter exposes a typed capability-limited contract such as `load(manifest)`, `start()`, `applyInput(safeAction)`, `getVisibleState()`, `getReviewableEvidence()`, `reset()`, `finish()`, with activity-specific fixtures. The backend **never** treats a frontend completion event as authoritative evidence of proficiency: check eligible lesson version, required independent task state/evidence, duplicate submission, learner authorization and rubric limitations. Guest activities may remain entirely local and transient. For difficult creative or spoken work, allow an optional guardian/teacher observation rather than inventing an algorithmic assessment.

**Learning Snapshot (adult-facing)**: show the actual task/outcome, a redacted work sample or adult-observed response when authorized, `tried` / `demonstrated in this activity` / `not yet observed` as carefully defined labels, an optional revisit, and one offline discussion prompt. Do not equate a single successful task with durable mastery or claim the program measures intelligence/development.

## 18.4 Accessibility, localization and performance

Honor the existing WCAG 2.2-oriented obligations and **test the actual task**, not only the surrounding page. Verify legible focus controls, responsive layout/zoom, large targets appropriate to age and viewport, adequate contrast, voice-off usability, captioned/equivalent information, non-color cues, keyboard/switch access and reduced-motion preference. Use a genuine alternate learning route when the objective intrinsically depends on sound/vision/fine motor skills: do not report the same sensory skill verified through an unrelated substitute. Allow flexible accommodations and parent/teacher review of placement.

Cache licensed static media where authorized, load only the needed lesson assets, offer a lightweight no-audio/no-animation option, and fail with useful text plus a retry when a media file cannot load. Preserve robust resumed work on authorized saves, but avoid cross-session fingerprinting of no-account children. Optimize for documented low-end devices and intermittent connections; measure rather than asserting universal offline or fast performance.

---

# 19. v2.3 LEARNING PATHWAYS ENGINE: PEDAGOGY, DATA, API AND AUTHORIZATION

## 19.1 Explicit, explainable curriculum graph

Model `subject → strand → curriculum version → outcome → prerequisites → reviewed activities/lessons → optional work evidence`. Every outcome has a stable ID, reviewed human description, audience/locale, observable learner behavior, assessment limitations, applicable prerequisite edges and an approved publication state. Prohibit cycles, deleted links and missing referenced versions from entering a published graph. An outcome may appear across subjects when genuinely shared (e.g., recording a measurement), but evidence for one context must not silently mark a different discipline mastered.

**Suggested-next algorithm, v1:** filter for published lessons in the selected subject and supported language, then check declared prerequisites against appropriately validated **activity-specific evidence** or explicit authorized placement overrides. Order by learner/guardian choice and authored sequence (not a hidden machine-inferred child ability). Show a simple explanation such as “This activity uses sounds you practiced in Letter-Sound Workshop”; allow **Review earlier**, **Choose something else**, and guardian/teacher **Change placement**. Flag unsupported content as unavailable rather than fabricating an AI-generated lesson. Auto-adaptation, if later introduced, requires separate privacy, efficacy, bias and transparency review and a manual override.

## 19.2 Persistence and security contracts

Extend the existing PostgreSQL/SQLAlchemy/Alembic architecture *after* auditing existing tables, routes, constraints and migrations. Reuse `lessons`, `lesson_attempts` and `skill_evidence` where semantics match. Add curriculum entities and strictly minimal learner-specific junction records only where needed; provide version-safe migration/backfill and rollback plans; do not break the existing AI lesson format. Sample relational definitions:

- `subjects(subject_id PK, slug UNIQUE, status, default_display_order, created_at)`; `subject_strands(strand_id PK, subject_id FK, slug, status)`.
- `curriculum_versions(curriculum_version_id PK, locale, version, review_state, reviewed_by_authorized_user_id, approved_at, UNIQUE(locale, version, subject_id))` with a subject FK explicitly defined in the actual schema.
- `curriculum_outcomes(outcome_id PK, curriculum_version_id FK, strand_id FK, stable_code, description, evidence_rule_version, review_state)` and `outcome_prerequisites(outcome_id FK, prerequisite_outcome_id FK, PRIMARY KEY(outcome_id, prerequisite_outcome_id))`; validate graph and same-graph policy on publication.
- `lesson_outcome_links(lesson_version_id FK, outcome_id FK, evidence_contract_id, PRIMARY KEY(lesson_version_id, outcome_id))`; `activity_manifests(activity_version_id PK, lesson_version_id FK, manifest_jsonb, published_at, review_state, content_hash)`; review records refer to **exact immutable versions**.
- `learner_outcome_evidence(evidence_id PK, learner_id FK, lesson_version_id FK, outcome_id FK, activity_version_id FK, evidence_kind, assessment_state, reviewed_at, expires_at, created_at)` only where authorized and necessary; do not store raw private audio, precise click trails, handwriting images or health data by default.
- `learner_pathway_choices(learner_id FK, subject_id FK, curriculum_version_id FK, selected_strand_id, updated_at)`; `guardian_placement_overrides(... guardian_id FK, authorized learner link, reason_code, created_at)`; keep adult/teacher actions auditable and retractable.

**Server rules:** Require verified Firebase identity and authoritative role/relationship checks for private reads/writes. A guardian sees only their linked children; teachers see only students/classes under a valid school role and purpose. Enforce entitlements without withholding already earned export/deletion rights, rate limits, request/response schemas, course-version consistency, optimistic concurrency and idempotency. Use no identifying backend calls for optional guest toddler/literacy preview. Remove child evidence on verified deletion according to documented retention rules; handle school/guardian conflicts explicitly rather than granting universal teacher access.

## 19.3 Public and private APIs (illustrative, not existing endpoints)

- `GET /api/v1/subjects?locale=...`: **public** reviewed subjects and truthful available/preview/upcoming lesson counts; never leak child activity.
- `GET /api/v1/subjects/{subject_id}/pathways?curriculum_version=...`: published outcome/lesson graph, intended prerequisites and reviewed locale; indicate unbuilt items honestly.
- `GET /api/v1/lessons/{lesson_version_id}/activity`: allow public guest manifest **only** when published/guest-safe; authenticated access checks for premium/private content.
- `POST /api/v1/learners/{learner_id}/lesson-evidence`: authenticated authorized write with lesson version, reviewed evidence schema, idempotency key and server-side verification; creative observations carry provenance and do not auto-grant academic mastery.
- `GET /api/v1/guardians/me/learners/{learner_id}/subjects/{subject_id}/summary`: authorized parent summary of curriculum goals, actual evidence limitations, optional next/offline steps.
- `PATCH /api/v1/guardians/me/learners/{learner_id}/placement`: authorized adult adjustment with transparent reason; teacher variant requires a distinct approved role/relationship.
- Admin-only `POST /api/v1/admin/curricula/.../review` and `.../publish`: require all outcomes, locale, asset licence, safety, accessibility, activity-runtime and deterministic rubric checks to pass before publication.

These names are **contracts to refine**, not claims about current backend routes. Provide OpenAPI/Pydantic models, PostgreSQL migrations, transaction rules, exact authorization matrix, edge cases, errors, pagination, audit/retention policy and Playwright/pytest end-to-end tests before declaring an endpoint delivered.

## 19.4 Human-reviewed AI use in foundational education

AI may draft unpublished activity variants and optional adult-facing teacher notes, but **publication requires qualified human subject review, age/safety review and actual testing**. Do not use an LLM as a source of unchecked phonics pairs, arithmetic answer keys, scientific explanations, geographic facts, cultural claims or official curriculum alignment. Young-child lessons use authored material and deterministic feedback by default. For older learners, approved bounded AI exercises must be explicit about generative limitations, maintain guardian/school permissions, privacy safeguards, cost limits and a meaningful no-AI alternative.

---

# 20. v2.3 DELIVERY PRIORITIES, DEFINITION OF DONE AND CHANGE CONTROL

**Priority is staged, not a promise that everything ships at once.** Keep the first complete AI invention lesson from Phase 1, the single reviewed Little Explorers activity from Phase 1B, and add one reviewed foundational literacy slice in Phase 1C. Then expand early number sense, reading/writing, science and other strands through successive *individually verified* releases. Do not trade a functioning, comprehensible product for dozens of decorative subjects. Detailed priorities may change after the mandatory repo audit and consenting family/educator research.

| Milestone | Required tangible output | Release criterion |
|---|---|---|
| `EDU-M0` Curriculum foundation | `FOUNDATIONAL_CURRICULUM.md`, one reviewed locale, scope/sequence, stable outcome IDs, graph/rubric contracts and content review roles. | Experts approve **specific** planned content and acknowledged unknowns; no blanket curriculum-coverage or accreditation claim. |
| `EDU-M1` Early literacy | Three reviewed, interconnected beginning-literacy lessons with working letter/sound/word actions, accessible alternatives, original media and one optional offline prompt. | `EDU-01`, `EDU-02`, `EDU-06`–`EDU-10` pass on real runtime. |
| `EDU-M2` Early mathematics | Three reviewed units for quantity/counting, comparison and adding/removing using deterministic manipulatives; accurate prompts and evaluation. | `EDU-01`, `EDU-03`, `EDU-05`–`EDU-10` pass. |
| `EDU-M3` Science and inquiry | One safe, human-reviewed observe/predict/explain unit, clearly labeled illustration or simulation, optional supervised real-world extension. | `EDU-01`, `EDU-04`–`EDU-10` pass. |
| `EDU-M4` Pathway & parent evidence | Published acyclic prerequisite graph, explainable suggested next actions, authorized subject summary and correction controls. | `EDU-05`, `EDU-06`, `EDU-08` plus DB/API role and deletion tests pass. |
| `EDU-M5` Broader curriculum | Approved modules in geography/social studies, art, logic, digital citizenship, additional languages and older-year subject levels. | Each module independently meets its own outcome, reviewer, content, accessibility, privacy and working-runtime requirements. |
| `EDU-M6` Cross-subject invention | Little Smart Garden or equivalent with distinct early-years, literacy/numeracy, science, rule-coding and advanced AI variants. | Each variant has its own lesson manifest, honest output type, verified behavior and age/ability review; no forced child-to-AI transition. |

**Required change-control output:** After modifying the repositories, the coding agent must list exact commit/PR references *if actually created*, real migrated tables/routes, published outcome/lesson IDs, frontend demo URL *if actually deployed*, screenshots/test artifacts, reviewer status, tested reference devices, family feedback, open safety gaps and explicit `BUILT / PARTIAL / PLANNED / NOT TESTED / BLOCKED` status per product. Specifications and illustrative examples alone count as `PLANNED`, never `BUILT`.

**v2.3 source distinction:** Sections 17–20 are newly proposed SkillSprout education requirements, derived from the owner's requested scope and the preceding assessment of gaps. They are **not** conclusions of a new study of national curricula, developmental readiness or educational efficacy. The v2.1 child-UX/accessibility references and v2.2 TinyFingers public-page references remain useful for their expressly stated, limited purposes; do not use them to claim that all of this comprehensive curriculum is externally validated. Obtain subject-specific academic, developmental and locale-specific review before promoting official alignment or learning outcomes.
