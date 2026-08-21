## ADDED Requirements

### Requirement: DownloadCv title text meets contrast requirements
The DownloadCv section's title SHALL NOT use pure `$primary`/`$accent-color` cyan as the starting (or any) stop of a gradient clipped to its text. The gradient SHALL be anchored on a contrast-safe color so the rendered title text meets WCAG AA contrast against the section's light background.

#### Scenario: Title gradient does not start in pure cyan
- **WHEN** the DownloadCv title is rendered
- **THEN** its gradient-clipped text color provides WCAG AA contrast against the light background at every point along the gradient, and pure `$primary`/`$accent-color` is not used as a gradient stop for this text

#### Scenario: The CTA button is unaffected
- **WHEN** the DownloadCv call-to-action button is rendered
- **THEN** it continues to use `$accent-color`/`$secondary-color` as a solid gradient background with light button text on top, since cyan-as-background (not cyan-as-text) is unaffected by this requirement
