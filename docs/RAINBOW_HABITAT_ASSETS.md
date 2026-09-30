# Rainbow Habitat asset and guest-data record

Updated 2026-09-23. Phase 1B guest preview.

## Original asset record

The garden friend and home cards are simple inline SVG geometry in `components/little-explorers/pages.tsx`: circle/leaf silhouettes, repeat-pattern marks and flat colors. CSS is in `components/little-explorers/rainbow.css`. No third-party illustrations, font files, sound recordings, copied game layouts, or external asset URLs are used. The optional success cue is synthesized briefly by Web Audio only after an adult turns it on and a player makes a correct choice. There is no narration or recorded audio.

This source-created asset record documents provenance; it is not a legal review of third-party code or platform-wide assets. The existing SkillSprout homepage has its separate asset history.

## Guest data boundary

The small round number, adult-selected choice count, optional color rule and sound/motion preferences live in transient React state only. There is no local/session storage, cookie, learner profile, analytics, external request, or learning API call from Little Explorers pages. Finishing clears the activity state; navigation or reload also resets it. The preference controls are not account consent and do not secure device settings.

No test stores personal or child data. There is no score, timer, inferred ability, or claim of mastery.

## Review status

The drawings and all activity text are original SkillSprout work in this repository. Qualified early-years, accessibility, physical-device and adult-assisted family usability reviews remain **NOT TESTED**. This record must not be read as pedagogical approval or a claim that the SVGs are suitable for every child.
