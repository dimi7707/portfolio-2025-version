## Why

The `careerTimeLine` section in `src/content/en/home/home.md` and `src/content/es/home/home.md` is missing two early roles from Dimitri's actual work history (CORPBID and Coinimp.com / ABC Hosting), and one existing entry (KUBO SAS) has an inaccurate end date. These roles have no narrative description in the source CV — only a period, company, and a technology list — so adding them as regular full-size cards would waste grid space and look visually broken (a mostly-empty card next to fully-detailed ones). The `CareerTimeLine` component needs a way to represent lightweight, description-less experiences without degrading the layout.

## What Changes

- Add "CORPBID" experience entry (Full Stack Developer, Jun 2018 - Sep 2019) to both `en` and `es` `home.md`, with technologies only (no description, no achievements).
- Add "Coinimp.com / ABC Hosting" experience entry (Full Stack Developer, Abr/Apr 2017 - May 2018) to both `en` and `es` `home.md`, with technologies only (no description, no achievements).
- Correct the KUBO SAS end date from "Sep 2020" to "Dec 2020" in both `en` and `es` `home.md`, matching the source CV.
- Make `description` and `achievements` optional in `careerTimeLineSchema` (currently `description` is required and `achievements` defaults to an empty array only at the type level, not enforced-optional), so entries can omit them.
- Update `CareerTimeLine.tsx` so that when two consecutive experiences both lack a `description`, they render as a paired set of compact cards sharing a single grid slot, instead of each consuming a full-size card slot. Experiences that already have a description are unaffected and continue to render as full cards.
- Add/update component tests first (TDD) covering: compact card detection, pairing of two consecutive description-less experiences into one slot, and fallback to a single (non-paired) compact card when a description-less experience has no description-less neighbor.

## Capabilities

### New Capabilities
- `career-timeline-compact-cards`: Defines how the `CareerTimeLine` component detects description-less experiences and groups up to two of them into a single compact-card grid slot.

### Modified Capabilities
- `portfolio-content-update`: Adds the CORPBID and Coinimp.com / ABC Hosting entries to the professional experience timeline (content-only requirements do not currently account for description-less entries) and corrects the KUBO SAS end date.

## Impact

- **Content**: `src/content/en/home/home.md`, `src/content/es/home/home.md` (new entries, corrected date).
- **Schema**: `src/schemas/components/careerTimeLineSchema.ts` (`description` and `achievements` become optional).
- **Component**: `src/components/CareerTimeLine/CareerTimeLine.tsx` (grouping/rendering logic for compact pairs).
- **Styles**: `src/components/CareerTimeLine/CareerTimeLine.module.scss` (new compact card / paired-slot styles).
- **Tests**: `src/components/CareerTimeLine/CareerTimeLine.test.tsx` (new test cases written before implementation, per TDD).
- No breaking changes to existing full-card experiences or existing consumers of `Experience`/`careerTimeLine` content.
