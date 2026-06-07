# Ashok Leyland School Bus — Style Reference
> Iconic yellow on asphalt — safety meets engineering

**Theme:** light

The Ashok Leyland School Bus is a design system built around the world's most iconic vehicle silhouette. Warm school-bus yellow anchors every interface — not as a novelty, but as a functional safety color that signals trust, visibility, and reliability. The visual language is chunky and substantial: bold typography at 700–800 weight, pill-shaped buttons that mirror the bus's rounded profile, and generous white space that lets the yellow breathe without overwhelming. Cards sit on warm white backgrounds with soft rounded corners, framed by hairline borders in warm gray. No glassmorphism, no dark mode — this is a daylight system built for readability and immediate recognition. Every component feels solid, like the vehicle it represents.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| School Bus Yellow | `#FFB800` | `--color-yellow` | Primary brand color — action backgrounds, hero accents, nav highlights, CTA fills. The single source of color authority. |
| Yield | `#D49500` | `--color-yield` | Hover/active state for yellow elements. Deepened for press states. |
| Guard | `#1A1A2E` | `--color-guard` | Primary text, icon strokes, nav text — deep navy-black for maximum contrast on warm surfaces. |
| Warm White | `#FFFCF5` | `--color-warm-white` | Page background, card surfaces, form fields — the warm canvas that lets yellow pop. |
| Bone | `#FFFFFF` | `--color-bone` | Pure white for text on yellow backgrounds, inverted cards, modal surfaces. |
| Ash | `#E8E4DC` | `--color-ash` | Hairline borders, subtle dividers, card outlines — warm gray that reads softly on warm white. |
| Smoke | `#9E9E9E` | `--color-smoke` | Muted text, placeholder text, disabled states. |
| Stop | `#E53935` | `--color-stop` | Error states, required field markers, critical alerts — the red octagon shorthand. |
| Go | `#43A047` | `--color-go` | Success states, verified badges, completion indicators. |

## Tokens — Typography

### Poppins + Inter — Dual-family system
**Poppins (700–800)** carries headlines, CTAs, and nav — its geometric roundness echoes the bus's friendly silhouette. **Inter (400–600)** handles body text, captions, and form labels for clean readability.

- **Headlines:** Poppins 700 or 800
- **Body:** Inter 400
- **Buttons/Nav:** Poppins 600
- **Captions/Labels:** Inter 500
- **Uppercase eyebrow:** Inter 600, 0.1em tracking

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Font |
|------|------|--------|-------------|----------------|------|
| caption | 11px | 600 | 1.3 | 0.08em | Inter |
| eyebrow | 12px | 600 | 1.2 | 0.1em | Inter |
| body-sm | 14px | 400 | 1.6 | 0.01em | Inter |
| body | 16px | 400 | 1.7 | 0.01em | Inter |
| lead | 18px | 400 | 1.7 | 0.01em | Inter |
| heading-sm | 22px | 700 | 1.25 | -0.01em | Poppins |
| heading | 32px | 700 | 1.15 | -0.02em | Poppins |
| heading-lg | 44px | 800 | 1.1 | -0.02em | Poppins |
| display | 64px | 800 | 1.02 | -0.03em | Poppins |
| hero | 80px | 800 | 0.95 | -0.03em | Poppins |

## Tokens — Spacing & Shapes

**Base unit:** 8px

**Density:** comfortable

### Spacing Scale

| Name | Value |
|------|-------|
| 8 | 8px |
| 16 | 16px |
| 24 | 24px |
| 32 | 32px |
| 40 | 40px |
| 48 | 48px |
| 64 | 64px |
| 96 | 96px |
| 128 | 128px |

### Border Radius

| Element | Value |
|---------|-------|
| buttons | 100px |
| cards | 16px |
| inputs | 12px |
| nav pills | 100px |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 64px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Logo Mark
**Role:** Brand identity in header

Wordmark "Ashok Leyland" in Guard (#1A1A2E) at 20px, Poppins weight 700. Accompanied by a simplified bus-front icon: a rounded rectangle with windows, rendered in School Bus Yellow (#FFB800) fill with Bone (#FFFFFF) windows. The icon acts as both brand mark and product signal — you know immediately what they build.

### Nav Text Link
**Role:** Header navigation items

Inter weight 500, 14px, color Smoke (#9E9E9E) at rest → Guard (#1A1A2E) on hover. Subtle bottom-border slide on active state (2px solid School Bus Yellow). No background fill — just color shift on warm white.

### Primary Action Button
**Role:** Filled CTA

Pill shape, border-radius 100px. Background School Bus Yellow (#FFB800), text Guard (#1A1A2E), Poppins weight 600, 14px. Padding 12px 28px. No border. Hover: background Yield (#D49500). The yellow reads as urgent and friendly — the same psychology as the bus itself.

### Secondary Outline Button
**Role:** Ghost CTA

Same dimensions and type as Primary. Border 2px solid Guard (#1A1A2E), text Guard, transparent background. Hover: background Guard, text Bone.

### Hero Headline Block
**Role:** Hero section

Display text in Poppins weight 800, 64–80px, line-height 0.95–1.02, letter-spacing -0.03em, color Guard (#1A1A2E). Eyebrow above in Inter weight 600, 12px, uppercase, 0.1em tracking, color School Bus Yellow. Body paragraph below in Inter weight 400, 18px, color Guard at 70% opacity. CTA: primary yellow pill button.

### Section Kicker
**Role:** Pre-headline label

Inter weight 600, 12px, uppercase, tracking 0.1em, color School Bus Yellow (#FFB800). Sits above section headlines as a tonal flag.

### Section Headline
**Role:** Section titles

Poppins weight 700, 32px, line-height 1.15, letter-spacing -0.02em, color Guard (#1A1A2E). Short, declarative statements.

### Body Paragraph
**Role:** Descriptive copy

Inter weight 400, 16px, line-height 1.7, tracking 0.01em, color Guard at 80% opacity (#2A2A3E). Maximum measure ~65ch.

### Card
**Role:** Content containers

Background Warm White (#FFFCF5), border 1px solid Ash (#E8E4DC), border-radius 16px, padding 32px. Hover: border-color School Bus Yellow, subtle translateY(-2px). No shadow — the card floats on the warm canvas with just that hairline border.

### Stat Block
**Role:** Metric displays

Large number in Poppins weight 800, 44px, color School Bus Yellow. Label below in Inter weight 500, 12px, uppercase, 0.08em tracking, color Smoke (#9E9E9E).

### Checkmark Badge
**Role:** Feature indicators

Small pill with yellow background and Guard-colored checkmark icon. Padding 4px 12px, border-radius 100px, font Inter weight 500, 12px.

## Do's and Don'ts

### Do
- Use School Bus Yellow (#FFB800) as the primary action color — it is the single authority color, inspired by the vehicle itself
- Set headlines in Poppins at 700–800 weight — the roundness of the typeface echoes the bus silhouette
- Use generous white space (min 64px section gaps) — the yellow needs room to breathe
- Apply pill-shaped borders (100px radius) to all buttons — they mirror the bus's rounded edges
- Keep card backgrounds at Warm White (#FFFCF5) — pure white is too cold against yellow
- Use the deep Guard (#1A1A2E) for primary text — maximum contrast for readability
- Let yellow dominate exactly one element per viewport — too much yellow reads as caution tape, not brand

### Don't
- Never use dark mode — school buses live in daylight; this is a light-mode-only system
- Never add shadows or elevation effects — depth comes from color contrast and hairline borders
- Never use a second bright color at the same weight as yellow — red and green are reserved for semantic states only
- Never use font weight below 400 — thin text reads as fragile, not solid
- Never set body text below 14px — readability on warm backgrounds demands size
- Never use border-radius smaller than 12px on inputs — the system's geometry is generous
- Never use emoji as icons — use Heroicons or custom SVG bus illustrations
- Never center-align body text blocks — left-align for readability

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Warm White | `#FFFCF5` | Base canvas — all sections sit on this warm surface |
| 1 | Bone | `#FFFFFF` | Cards, form fields, elevated containers |
| 2 | Ash | `#E8E4DC` | Dividers, hairline borders |

## Elevation

No shadows, no elevation effects. A card is identified by its Warm White fill against the slightly warmer page background, separated by a 1px Ash border. Hover state shifts the border to School Bus Yellow with a 2px upward translation. This keeps the system feeling flat, solid, and daylight-optimized.

## Imagery

Photography should feature school buses in natural daylight settings: loading zones, suburban streets, fleet depots. Warm golden-hour light complements the yellow. No night shots, no moody lighting. Product shots should emphasize the bus's front profile — the iconic flat-nose cab with the yellow expanse. Secondary imagery shows children boarding, drivers at the wheel, and fleet lineups. All imagery should feel safe, warm, and community-oriented.

## Layout

Full-width sections on the warm white canvas. Navigation is a fixed top bar with logo left, text links right-of-center, and a yellow pill CTA at the far right. Hero is full-width with a right-aligned bus image and left text block (max-width 520px). Section rhythm is 96px vertical gaps. Cards grid in a 3-column layout, timeline is center-aligned with alternating left/right items. The contact section uses a 2-column form + info layout. Every section breathes — no cramming.

## Agent Prompt Guide

Quick Color Reference:
- background: #FFFCF5
- primary brand: #FFB800
- text (primary): #1A1A2E
- text (muted): #9E9E9E
- border: #E8E4DC
- error: #E53935
- success: #43A047

Example Component Prompts:

1. Hero block: Warm white background (#FFFCF5). Eyebrow 'ASHOK LEYLAND SCHOOL BUS' in Inter 600, 12px, uppercase, 0.1em tracking, color #FFB800. Headline 'Engineered for Safety. Built for the Journey.' in Poppins 800, 64px, line-height 1.02, letter-spacing -0.03em, color #1A1A2E. Body paragraph in Inter 400, 18px, color #1A1A2E at 70% opacity. Primary CTA button: background #FFB800, text #1A1A2E, Poppins 600, 14px, border-radius 100px, padding 12px 28px.

2. Nav link: Inter 500, 14px, color #9E9E9E resting → #1A1A2E hover. Bottom-border active indicator: 2px solid #FFB800. Right side: yellow pill CTA.

3. Stat block: Value in Poppins 800, 44px, color #FFB800. Label in Inter 500, 12px, uppercase, 0.08em tracking, color #9E9E9E.

4. Card: Background #FFFCF5, border 1px solid #E8E4DC, border-radius 16px, padding 32px. Hover: border-color #FFB800, transform translateY(-2px).

## Similar Brands

- **First Student** — The same yellow as a brand identity, youthful but professional, clean sans-serif typography
- **Thomas Built Buses** — Industrial heritage, bold yellow logo, straightforward safety-first messaging
- **Blue Bird Corporation** — Classic American school bus manufacturer, yellow as primary identity, community-focused
- **Navistar/IC Bus** — Commercial vehicle heritage adapted to school transport, yellow as the definitive brand color

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-yellow: #FFB800;
  --color-yield: #D49500;
  --color-guard: #1A1A2E;
  --color-warm-white: #FFFCF5;
  --color-bone: #FFFFFF;
  --color-ash: #E8E4DC;
  --color-smoke: #9E9E9E;
  --color-stop: #E53935;
  --color-go: #43A047;

  /* Typography — Font Families */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Typography — Scale */
  --text-caption: 11px;
  --text-eyebrow: 12px;
  --text-body: 16px;
  --text-body-sm: 14px;
  --text-lead: 18px;
  --text-heading-sm: 22px;
  --text-heading: 32px;
  --text-heading-lg: 44px;
  --text-display: 64px;
  --text-hero: 80px;

  /* Spacing */
  --space-unit: 8px;
  --s8: 8px;
  --s16: 16px;
  --s24: 24px;
  --s32: 32px;
  --s40: 40px;
  --s48: 48px;
  --s64: 64px;
  --s96: 96px;
  --s128: 128px;

  /* Border Radius */
  --radius-pill: 100px;
  --radius-card: 16px;
  --radius-input: 12px;

  /* Layout */
  --max-width: 1200px;

  /* Surfaces */
  --surface-0: #FFFCF5;
  --surface-1: #FFFFFF;
  --surface-2: #E8E4DC;
}
```
