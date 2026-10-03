# @arbiui/tailwindcss

**Tailwind CSS v4** stylesheet package for **ArbiUI**. It guarantees that the utility classes `@arbiui/react` generates at runtime are compiled, even though most class strings are built dynamically in JavaScript.

## Requirements

- **Tailwind CSS 4.0** or later (peer dependency)
- **Node.js 22.14.0** or later (see `engines` in the package manifest)

The package contains only CSS. It has no build step and no JavaScript entry points.

## Installation

```sh
pnpm add @arbiui/tailwindcss
```

The package is a peer-linked requirement of `@arbiui/react`, which declares it under `peerDependencies`, so installing `@arbiui/react` in a compliant package manager resolves or prompts for it as well.

## Setup

Import it in your application CSS after Tailwind itself:

```css
@import 'tailwindcss';
@import '@arbiui/tailwindcss';
```

`@arbiui/tailwindcss` resolves to [`src/index.css`](./src/index.css), which imports the safelist stylesheet. Importing the safelist directly is also supported:

```css
@import 'tailwindcss';
@import '@arbiui/tailwindcss/safelist.css';
```

## Exports

| Import path                        | File                                     | Description                            |
| ---------------------------------- | ---------------------------------------- | -------------------------------------- |
| `@arbiui/tailwindcss`              | [`src/index.css`](./src/index.css)       | Entry stylesheet, imports the safelist |
| `@arbiui/tailwindcss/safelist.css` | [`src/safelist.css`](./src/safelist.css) | Safelist directives only               |

## What the safelist covers

**Tailwind CSS v4** compiles utilities found in scanned source files. Two mechanisms make the runtime-generated classes of `@arbiui/react` work:

1. Source scanning. The class strings for all enumerated prop values ship as literals in the installed `@arbiui/react` output, for example `flex-col`, `overflow-hidden`, and `items-center`, and Tailwind v4 automatic source detection finds them there.
2. The safelist. `@source inline(...)` directives in this package force Tailwind to generate an enumerated set of candidates regardless of scanning:
   - Preset value classes, such as `rounded-xl`, `shadow-md`, `font-semibold`, `text-lg`, `bg-cover`, `cursor-pointer`, and the negative and `-auto` variants of positioning and spacing utilities.
   - CSS variable classes for every style prop, such as `mb-(--see-mb)` and `px-(--see-px)`, including the data-type hints Tailwind needs for certain utilities, such as `text-(length:--see-font-size)` and `bg-(image:--see-bg-image)`.

Because of the variable classes, any value passed with the `$` or `@` prefix works without further configuration, since the class itself is fixed and only the variable value changes.

## What the safelist does not cover

Free-form string values are not safelisted and do not appear in any scanned file. For example `mb="4"` (`mb-4`), `w="1/2"` (`w-1/2`), or `bgColor="red-500"` (`bg-red-500`) are constructed at runtime from user input, so Tailwind cannot see them. They compile only if the literal class also appears in a source file Tailwind scans, for example because you use it in a `className` string somewhere in the project.

Recommended practices:

- Prefer safelisted preset values where they exist.
- Use the `$` or `@` prefix for arbitrary values. These are always safelisted through their variable classes.
- For Tailwind palette colors such as `red-500`, either ensure the utility appears in scanned source, or pass a CSS color with the `$` prefix, for example `bgColor="$#ef4444"`. A palette name passed through a `$` or `@` prefix becomes a raw CSS value and is not resolved as a Tailwind palette color.
- If classes from package sources are not compiled in your setup, update Tailwind CSS and its integration packages; source detection behavior varies between Tailwind versions.

## Relationship to @arbiui/react

`@arbiui/react` documents the full value syntax and behavior in its [README](../react/README.md). This package must be imported into the Tailwind entry stylesheet for prop-driven styles to compile.

## Publishing notes

- The package publishes `src`, including [`src/index.css`](./src/index.css) and [`src/safelist.css`](./src/safelist.css).
- `exports` maps both stylesheet entry points; there is no `main`, `types`, or build output.
- Versioning is aligned with `@arbiui/react`, which depends on this package through `peerDependencies` with a caret range.
