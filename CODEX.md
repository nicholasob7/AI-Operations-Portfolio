## Mobile Resume-Route Deployment Validation

Before promoting `dev/main` to `main`, run a mobile viewport smoke check for:

- `/resume`
- `/resume/it-support`
- `/resume/technical-operations`
- `/resume/ai-process`

Verify:

- no horizontal overflow
- resume cards/text stay inside the wrapper
- the normal floating Actions affordance is present where expected
- `Save PDF` links to the reviewed one-page static PDF artifact
- `Back to Resume Versions` works
- no retired broad/default resume artifact is exposed

Reason:

A production mobile regression in the resume detail routes required a 22-minute hotfix window after deployment. Desktop validation alone is not sufficient for resume-route promotion.

## Minimalism Standard: Human-Local vs Machine-Structural

When choosing a “minimal” change, distinguish between human-local minimalism and machine-structural minimalism.

Human-local minimalism is the smallest immediate edit: a route-local CSS patch, a one-off selector, or a narrow override that fixes the visible symptom.

Machine-structural minimalism is the smallest durable system: fewer behavioral authorities, fewer duplicated layout rules, fewer route-specific compensations, and clearer reusable component contracts.

Do not prefer a tiny local patch if it preserves fragmented behavior across multiple surfaces. If several routes or components share the same visual or behavioral logic, the preferred minimal change is usually to move that rule into the shared component or shared contract that actually owns the behavior.

Route-level CSS should handle route-level layout. Component-internal behavior should live in the component. Avoid accidental cross-route leakage, class-specific exceptions, and one-off fixes when a shared component rule would remove drift.

In short: the minimal change is not always the smallest diff. The minimal change is the one that reduces future ambiguity and gives the machine the fewest places to reason from.

## CSP / Lighthouse Best Practices

Lighthouse Best Practices may report `92` because SvelteKit injects `#svelte-announcer` with a runtime inline style that is blocked by the strict CSP.

Guidance:

- do not add broad `unsafe-inline`
- do not add a hash-based CSP allowance casually
- a CSP hash only covers the exact inline style string and may break if SvelteKit changes the generated announcer style in a future update
- treat this as post-deploy CSP polish, not a deployment blocker, unless there is a confirmed user-facing or accessibility failure
- current preferred posture: keep CSP strict and accept Best Practices `92`

## Static PDF Artifact Rule

When this project delivers a downloadable resume PDF, do not rely on browser `window.print()` as the authoritative PDF-generation path.

Downloadable resume PDFs must be produced as reviewed static PDF files.

Reason:

Browser print/save output can vary by browser, OS, print engine, scaling, margins, fonts, zoom state, and user settings. It does not reliably return the exact one-page A4 formatting required for this project.

Operational rule:

- HTML resume routes are reading/review surfaces
- `Save PDF` must link to the reviewed one-page static PDF artifact
- future resume PDF generation must use a controlled renderer from structured resume-document data
- do not treat browser print as the formal downloadable artifact path


## Skill: Application argument compression

When producing cover letters, resume summaries, recruiter notes, or application-facing text, do not write generic enthusiasm or broad self-description.

Use this sequence:

1. Identify the employer’s real hiring problem from the job description.
   - Do not merely repeat the job title.
   - Find the operational pressure behind the role.
   - Example: for a customer experience role, the real problem may be that complex AI software only matters if customers can understand it, trust it, and use it under real working pressure.

2. Reduce the opening to one direct claim.
   - No "I want to do this work" if applying already proves that.
   - No "this is not just a support role" unless the contrast is necessary.
   - No classification padding.
   - The first sentence must state the reason the role matters.

3. Make the experience paragraph prove one thing.
   - Do not list every related skill.
   - Pick the strongest bridge between Nicholas's experience and the job's pressure.
   - Preferred structure:
     - current operating context
     - practical action
     - role-matched consequence

4. Keep the language recruiter-safe.
   - Short paragraphs.
   - Plain English.
   - No inflated claims.
   - No machine-like phrasing.
   - No garden-path sentences.
   - No unnecessary adjectives.
   - No "passionate," "excited," "dynamic," "leveraging," or similar filler.

5. Preserve first-pass readability.
   - Treat the cover letter like the one-page resume system.
   - Every sentence must survive a 10-second recruiter scan.
   - Delete anything that only decorates the argument.

Example pattern:

Dear [team],

I'm interested in the [role] because [direct statement of why the employer's problem matters].

In my current [role], I [one clear proof of relevant operating discipline]. That matches this role because [direct bridge to the job's core need].

What stands out about [company] is [specific system/product/customer-pressure fit].

I [short closing proof: write clearly / learn systems quickly / own practical problems].

Kind regards,
Nicholas O'Brien
