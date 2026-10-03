# ArbiUI

**ArbiUI** is a monorepo of packages that provide a prop-driven styling layer on top of [**Tailwind CSS v4**](https://tailwindcss.com) and [**React 19**](https://react.dev). Style props are resolved at runtime into Tailwind utility classes and inline CSS variables, so components can be styled declaratively without writing utility class strings by hand.

## Packages

| Package             | npm name              | Description                                                                                                      | Documentation                              |
| ------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| React components    | `@arbiui/react`       | Polymorphic `View` component with style props for layout, spacing, typography, color, borders, effects, and more | [README](./packages/react/README.md)       |
| Tailwind stylesheet | `@arbiui/tailwindcss` | **Tailwind CSS v4** stylesheet that guarantees compilation of the utility classes produced by `@arbiui/react`    | [README](./packages/tailwindcss/README.md) |

## Requirements

- **React 19** for `@arbiui/react`
- **Tailwind CSS 4.0** or later for `@arbiui/tailwindcss`
- **Node.js 22.14.0** or later
- ESM-compatible tooling. Both packages are published as ES modules only.

## Installation

```sh
pnpm add @arbiui/react @arbiui/tailwindcss
```

## Setup

Import the Tailwind stylesheet in your application CSS after Tailwind itself:

```css
@import 'tailwindcss';
@import '@arbiui/tailwindcss';
```

The stylesheet safelists the CSS variable classes for `$` and `@` values and the enumerated preset values. Other runtime-generated classes are compiled through Tailwind source detection of the installed package files. Without the stylesheet, `$` and `@` values and preset values are not compiled by Tailwind.

## Basic usage

```tsx
import { View } from '@arbiui/react';

export function Card() {
  return (
    <View as="section" p="@6" rounded="xl" bgColor="$#ffffff" shadow="md">
      <View as="h2" fontSize="lg" fontWeight="semibold" mb="$8px">
        Title
      </View>
      <View fontSize="sm">Content goes here.</View>
    </View>
  );
}
```

Prop values support four forms:

| Form           | Example      | Result                                                                        |
| -------------- | ------------ | ----------------------------------------------------------------------------- |
| Plain value    | `mb="4"`     | Tailwind utility class, `mb-4`                                                |
| Negative value | `mt="-px"`   | Negative utility class, `-mt-px`                                              |
| `$` prefix     | `mb="$12px"` | Arbitrary value through an inline CSS variable                                |
| `@` prefix     | `px="@8"`    | Spacing unit value through an inline CSS variable, `calc(var(--spacing) * 8)` |

See the React package [documentation](./packages/react/README.md) for the complete value syntax reference and the full prop reference.

## How it works

1. `@arbiui/react` maps style props to Tailwind utility classes at runtime and merges them with `clsx` and `tailwind-merge`.
2. Values prefixed with `$` or `@` are passed to Tailwind as CSS variable shorthand classes, for example `mb-(--see-mb)`, with the variable value set through the element inline style.
3. `@arbiui/tailwindcss` uses Tailwind v4 `@source inline(...)` directives to safelist the CSS variable classes for `$` and `@` values and the enumerated preset values, so they are included in the compiled stylesheet regardless of source scanning.

## Repository layout

```txt
├── node_modules/
├── package.json
├── packages/
│   ├── react/          @arbiui/react, View component and prop types
│   └── tailwindcss/    @arbiui/tailwindcss, safelist stylesheet
├── tsconfig.base.json
├── tsconfig.lib.json
└── turbo.json
```

## Development

The repository uses pnpm workspaces and Turborepo.

```sh
pnpm install        # install dependencies
pnpm typecheck      # typecheck all packages
pnpm build          # build all packages
pnpm format         # format with prettier
pnpm clean          # remove build output, node_modules, and turbo cache
```

Build notes:

- `@arbiui/react` is built with tsdown to ESM with declaration files. The published package contains only `dist` and its README.
- `@arbiui/tailwindcss` is a CSS-only package with no build step. Its stylesheet sources are published directly.

## License

**Apache-2.0**. See the [LICENSE](./LICENSE) file for details.
