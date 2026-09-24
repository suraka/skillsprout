# Foundational curriculum — English literacy draft

**Status: DRAFT / NOT APPROVED FOR PUBLICATION**  
**Scope:** one beginning-reader practice path, English language text, three short lessons. The learner-selected language is English; a qualified reviewer still needs to select and verify a locale and pronunciation variety. This draft does not claim alignment with a national curriculum or measure reading proficiency.

## Outcome sequence

| ID | Observable practice | Prerequisite | Current activity |
| --- | --- | --- | --- |
| LIT-01 | Choose a familiar pictured word that begins with the same sound as a spoken example. | None | Sound Safari: compare “moon” with map, sun and top. |
| LIT-02 | Recognize the printed lowercase letters m, a and t among distractors. | LIT-01 | Letter Garden: view a familiar word and choose its first letter. |
| LIT-03 | Connect a familiar spoken word’s initial sound to its matching grapheme. | LIT-02 | Letter Garden: practice moon → m, apple → a, top → t. |
| LIT-04 | Use the taught m, a and t correspondences to build the short word “mat”. | LIT-03 | Word Builder: place three letter tiles in order without dragging. |

The graph is a single acyclic sequence. Correct answers unlock the next activity only for the current page visit. A learner may retry without a timer, score, penalty, account or automatic diagnosis. The final recap describes what was practiced in this activity; it does not report mastery or durable skill.

## Activity manifest and privacy

The three version-1 activity manifests are defined in lib/literacy/foundation.ts. They use stable activity and outcome IDs and currently have reviewStatus: draft. Locale, content, pronunciation, accessibility, safety and asset reviews are pending. The manifest validator keeps each activity unpublishable until those review fields are approved.

All answer checking uses fixed authored examples and deterministic local functions. A built-in English device voice is used only if the browser reports an available **local** English voice and the adult/learner presses the voice button. It is a device voice preview, not a supplied or professionally checked recording. When there is no local voice, the page asks a grown-up to say the word. Neither route establishes auditory discrimination unless a human actually presents the sound; the stored-in-memory response record intentionally says only practiced_in_this_visit.

Pictures are original inline SVG. There are no third-party media downloads, remote AI calls, camera/microphone requests, external lesson links, learner accounts, browser storage writes, or saved learner records. The page holds practice state in React memory and clears it on finish, reset, or leaving the page. This is the guest/no-account path described by the specification, so no backend endpoint, database migration, Firebase authentication change, or child evidence write is applicable to this feature.

## Adult-guided and accessible alternatives

- A grown-up can speak each printed word aloud, or the pair can do the same sound and letter activity away from the screen.
- Every picture choice has a readable word label and accessible button name; all actions use buttons and work without drag-and-drop.
- The activity offers pause, finish, retry, visible feedback, keyboard operation, responsive layout and reduced-motion styling.
- The screen-off prompt asks the learner and grown-up to find a safe object beginning with the same sound as “mat”.
- A visual fallback supports access to the letter-choice activity, but it cannot be counted as evidence of listening or phonemic awareness.

## Human review and publication gate

EDU-M0 and EDU-M1 remain **PARTIAL / BLOCKED FOR RELEASE**. Before promotion to a published learning path, a qualified literacy reviewer must approve the exact outcome wording, English locale and pronunciation, word choices and decodability. Reviewers must also verify the supplied audio or decide that adult-spoken words are the supported spoken route; review the original illustrations, age/ability framing, accessibility alternatives and safety; and test the activity with consenting families. Reviewer identities and approvals must be recorded against the exact activity version in the agreed project process.

No reviewer has approved these materials yet. Automated tests prove the implemented answer keys and state transitions only. Physical-device, screen-reader, native-speaker/pronunciation, qualified literacy, accessibility and family reviews are **NOT TESTED**.
