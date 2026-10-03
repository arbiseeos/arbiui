# @arbiui/react

React component package for **ArbiUI**. It exports `View`, a polymorphic styling component that maps declarative style props to **Tailwind CSS v4** utility classes and inline CSS variables.

## Requirements

- **React 19** (peer dependency)
- `@arbiui/tailwindcss` **0.1.0** or compatible (peer dependency), imported into your Tailwind entry stylesheet
- **Tailwind CSS 4.0** or later, configured in the application
- **Node.js 20.20.2** or later, below version **24** (see `engines` in the package manifest)
- ESM-only package. It ships ES modules and TypeScript declarations, with no CommonJS build.

## Installation

```sh
pnpm add @arbiui/react @arbiui/tailwindcss
```

## Tailwind setup

Import the **ArbiUI** stylesheet in your application CSS after Tailwind itself. The stylesheet guarantees that the variable classes and preset value classes `View` generates at runtime are compiled.

```css
@import 'tailwindcss';
@import '@arbiui/tailwindcss';
```

See the `@arbiui/tailwindcss` [README](../tailwindcss/README.md) for details on safelist coverage.

## Package import

```tsx
import { View } from '@arbiui/react';
```

The package entry also exports the prop group types, listed in the TypeScript section below.

## Quick start

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

## How View renders

`View` renders a plain DOM element with React `createElement`. There is no wrapper element and no runtime CSS.

- The element tag is controlled by the `as` prop and defaults to `div`.
- Props not recognized by `View` are spread onto the rendered element, so standard attributes, ARIA attributes, and event handlers work as usual.
- Refs are passed through as a [regular prop](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop), which requires **React 19**.
- Generated utility classes are merged with `clsx` and `tailwind-merge` and placed before your `className`. Because `tailwind-merge` resolves conflicts with the last class winning, your `className` can override any generated class.
- Generated CSS variables are merged into the element `style` after your `style` prop.

```tsx
<View as="nav" display="flex" aria-label="Main" onClick={handler} />
// renders: <nav class="... flex ..." aria-label="Main" onClick={...} />
```

### Default prop values

Two props have defaults that are always emitted as classes when the prop is not set:

| Prop       | Default    | Note                                                      |
| ---------- | ---------- | --------------------------------------------------------- |
| `display`  | `flex`     | Pass another value such as `block` or `grid` to change it |
| `position` | `relative` | Pass `static` to remove positioning                       |

## Value syntax

Most style props accept a string and resolve it into a Tailwind class. Four value forms are supported. The resolution rules are identical for every string-valued prop.

### Plain values

A plain value produces the `prefix-value` utility class.

```tsx
<View mb="4" />
// class includes: mb-4

<View flexDirection="col" />
// class includes: flex-col
```

### Negative values

A value starting with `-` produces the negative utility.

```tsx
<View mt="-px" />
// class includes: -mt-px

<View order="-2" />
// class includes: -order-2
```

The sign must be inside the value, not before a prefix. `-mt="@8"` style input is not supported; write `mt="@-8"` instead, which resolves to a negative `calc` value.

### `$` prefix: arbitrary values

The `$` prefix passes the rest of the value through as a raw CSS value using Tailwind CSS variable shorthand. The class is fixed per prop, and the value is delivered through an inline CSS variable named `--see-<prop>`.

```tsx
<View mb="$12px" />
// class includes: mb-(--see-mb)
// style includes: { '--see-mb': '12px' }

<View bgColor="$#ef4444" />
// class includes: bg-(--see-bg-color)
// style includes: { '--see-bg-color': '#ef4444' }
```

The `$` value is used as-is in CSS. It is not a Tailwind palette lookup, so `bgColor="$red-500"` would set `background-color: red-500`, which is invalid. Use palette names as plain values (`bgColor="red-500"`, which relies on the literal class being compiled) or CSS colors with the `$` prefix.

Certain utilities require a Tailwind data-type hint to resolve a variable, and `View` adds it automatically. For example the font size prop emits `text-(length:--see-font-size)` and the background image prop emits `bg-(image:--see-bg-image)`. Border widths emit `border-(length:--see-border)`.

### `@` prefix: spacing unit values

The `@` prefix produces a spacing value based on Tailwind's `--spacing` variable, which defaults to `0.25rem` and drives the Tailwind spacing scale.

```tsx
<View px="@8" />
// class includes: px-(--see-px)
// style includes: { '--see-px': 'calc(var(--spacing) * 8)' }
```

`@8` therefore resolves to `2rem` with the default spacing scale, and follows the application spacing scale when it is customized. Negative unit values are written with the sign after the prefix, for example `mt="@-2"`.

### Summary

| Input        | Generated class | Generated inline style                |
| ------------ | --------------- | ------------------------------------- |
| `mb="4"`     | `mb-4`          | none                                  |
| `mb="-px"`   | `-mb-px`        | none                                  |
| `mb="$12px"` | `mb-(--see-mb)` | `--see-mb: 12px`                      |
| `px="@8"`    | `px-(--see-px)` | `--see-px: calc(var(--spacing) * 8)`  |
| `mt="@-2"`   | `mt-(--see-mt)` | `--see-mt: calc(var(--spacing) * -2)` |

## Class generation and the safelist

`View` builds class strings at runtime. Tailwind generates a class when one of the following holds:

- The class is safelisted by `@arbiui/tailwindcss`. This covers every `$` and `@` value (each prop has a fixed variable class) and the enumerated preset scales such as text sizes, font weights, shadows, blurs, rounded radii, and cursor keywords. These always compile regardless of source scanning.
- The class string appears as a literal in a file Tailwind scans. All enumerated values of the prop types, including map-based values such as `flexDirection="col"` (`flex-col`), `items="center"` (`items-center`), and bare classes such as `border` or `ring`, ship as literal strings in the installed package output and are found by Tailwind v4 automatic source detection.
- Free-form strings outside the enumerated type unions, for example `mb="4"` or `bgColor="red-500"`, do not appear in any scanned file and are not safelisted. They compile only if the literal class also appears in scanned source. Use the `$` or `@` prefix for arbitrary values, or ensure the class literal exists in your source.

If classes from package sources are not compiled in your setup, update Tailwind CSS and its integration packages, or fall back to `$` and `@` values, which never depend on scanning. See the `@arbiui/tailwindcss` [README](../tailwindcss/README.md) for details.

## Props reference

`View` combines all style prop groups into a single props type. Props are documented below in the groups that the package also exports as TypeScript types. Unless stated otherwise:

- Omitting a prop, passing `undefined`, or passing an empty string emits nothing.
- Boolean props emit their class only when `true`.
- String props follow the value syntax rules above.
- Shared value aliases used in the tables are defined at the end of this section.

### Layout (ViewLayoutProps)

| Prop                                             | Type                                                          | Description                                                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aspect`                                         | `'square' \| 'video' \| 'auto' \| string`                     | `aspect-*` utility                                                                                                       |
| `columns`                                        | `Scale \| 'auto' \| string`                                   | `columns-*` utility                                                                                                      |
| `breakAfter`                                     | `Break`                                                       | `break-after-*` utility                                                                                                  |
| `breakBefore`                                    | `Break`                                                       | `break-before-*` utility                                                                                                 |
| `breakInside`                                    | `'auto' \| 'avoid' \| 'avoid-page' \| 'avoid-column'`         | `break-inside-*` utility                                                                                                 |
| `boxDecoration`                                  | `'clone' \| 'slice'`                                          | `box-decoration-clone` or `box-decoration-slice`                                                                         |
| `box`                                            | `'border' \| 'content'`                                       | `box-border` or `box-content`                                                                                            |
| `display`                                        | `Display`                                                     | Display utility. Defaults to `flex`                                                                                      |
| `float`                                          | `'right' \| 'left' \| 'start' \| 'end' \| 'none'`             | `float-*` utility                                                                                                        |
| `clear`                                          | `'left' \| 'right' \| 'both' \| 'start' \| 'end' \| 'none'`   | `clear-*` utility                                                                                                        |
| `isolate`                                        | `boolean`                                                     | `isolate`                                                                                                                |
| `autoIsolate`                                    | `boolean`                                                     | `isolation-auto`                                                                                                         |
| `objectFit`                                      | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'`    | `object-*` utility                                                                                                       |
| `object`                                         | `Placement \| string`                                         | `object-*` position utility                                                                                              |
| `overflow`, `overflowX`, `overflowY`             | `Overflow`                                                    | `overflow-*` utilities                                                                                                   |
| `overscroll`, `overscrollX`, `overscrollY`       | `'auto' \| 'contain' \| 'none'`                               | `overscroll-*` utilities                                                                                                 |
| `hideScrollBar`                                  | `boolean`                                                     | Hides the scrollbar with `scrollbar-width: none`, `-ms-overflow-style: none`, and a WebKit scrollbar pseudo-element rule |
| `position`                                       | `'static' \| 'fixed' \| 'absolute' \| 'relative' \| 'sticky'` | Position utility. Defaults to `relative`                                                                                 |
| `inset`, `insetX`, `insetY`                      | `AbsoluteValue \| string`                                     | `inset-*` utilities, support negative values                                                                             |
| `start`, `end`, `top`, `right`, `bottom`, `left` | `AbsoluteValue \| string`                                     | Logical and physical offset utilities, support negative values                                                           |
| `visibility`                                     | `'visible' \| 'invisible' \| 'collapse'`                      | Visibility utility                                                                                                       |
| `z`                                              | `'auto' \| string`                                            | `z-*` utility, supports negative values                                                                                  |

### Flex and grid (ViewFlexGridProps)

| Prop                                       | Type                                                                                                      | Description                                                          |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `basis`                                    | `'full' \| 'auto' \| Scale \| string`                                                                     | `basis-*` utility                                                    |
| `flexDirection`                            | `'row' \| 'row-reverse' \| 'col' \| 'col-reverse'`                                                        | `flex-row`, `flex-col`, and reverse variants                         |
| `wrap`                                     | `'nowrap' \| 'wrap' \| 'wrap-reverse'`                                                                    | `flex-nowrap`, `flex-wrap`, `flex-wrap-reverse`                      |
| `flex`                                     | `'auto' \| 'initial' \| 'none' \| string`                                                                 | `flex-*` utility                                                     |
| `grow`                                     | `boolean \| string`                                                                                       | `true` emits `grow`; a string emits `grow-*` or a variable class     |
| `shrink`                                   | `boolean \| string`                                                                                       | `true` emits `shrink`; a string emits `shrink-*` or a variable class |
| `order`                                    | `'first' \| 'last' \| 'none' \| string`                                                                   | `order-*` utility, supports negative values                          |
| `gridCols`, `gridRows`                     | `'none' \| 'subgrid' \| string`                                                                           | `grid-cols-*` and `grid-rows-*` utilities                            |
| `col`, `row`                               | `'auto' \| string`                                                                                        | `col-*` and `row-*` span utilities, support negative values          |
| `colSpan`, `rowSpan`                       | `'full' \| string`                                                                                        | `col-span-*` and `row-span-*` utilities                              |
| `colStart`, `colEnd`, `rowStart`, `rowEnd` | `'auto' \| string`                                                                                        | Grid line placement utilities, support negative values               |
| `gridFlow`                                 | `'row' \| 'col' \| 'dense' \| 'row-dense' \| 'col-dense'`                                                 | `grid-flow-*` utilities                                              |
| `autoCols`, `autoRows`                     | `'auto' \| 'min' \| 'max' \| 'fr' \| string`                                                              | `auto-cols-*` and `auto-rows-*` utilities                            |
| `gap`, `gapX`, `gapY`                      | `string`                                                                                                  | `gap-*` utilities                                                    |
| `self`                                     | `Alignment \| 'auto' \| 'end-safe' \| 'center-safe' \| 'baseline' \| 'baseline-end'`                      | `self-*` utility                                                     |
| `items`                                    | `Alignment \| 'end-safe' \| 'center-safe' \| 'baseline' \| 'baseline-last'`                               | `items-*` utility                                                    |
| `content`                                  | `Alignment \| 'normal' \| 'between' \| 'around' \| 'evenly' \| 'baseline'`                                | `content-*` utility                                                  |
| `justifySelf`                              | `Alignment \| 'auto' \| 'center-safe' \| 'end-safe'`                                                      | `justify-self-*` utility                                             |
| `justifyItems`                             | `Alignment \| 'end-safe' \| 'center-safe' \| 'normal'`                                                    | `justify-items-*` utility                                            |
| `justify`                                  | `Alignment \| 'end-safe' \| 'center-safe' \| 'between' \| 'around' \| 'evenly' \| 'baseline' \| 'normal'` | `justify-*` utility                                                  |
| `placeSelf`                                | `Alignment \| 'auto' \| 'end-safe' \| 'center-safe'`                                                      | `place-self-*` utility                                               |
| `placeItems`                               | `Alignment \| 'end-safe' \| 'center-safe' \| 'baseline'`                                                  | `place-items-*` utility                                              |
| `placeContent`                             | `Alignment \| 'center-safe' \| 'end-safe' \| 'between' \| 'around' \| 'evenly' \| 'baseline'`             | `place-content-*` utility                                            |

### Spacing (ViewSpacingProps)

Padding props: `p`, `px`, `py`, `ps`, `pe`, `pt`, `pr`, `pb`, `pl`. Type `'px' | string`.

Margin props: `m`, `mx`, `my`, `ms`, `me`, `mt`, `mr`, `mb`, `ml`. Type `'auto' | 'px' | '-px' | string`.

| Prop                                                | Description                                                                            |
| --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `p`, `px`, `py`, `ps`, `pe`, `pt`, `pr`, `pb`, `pl` | `p-*`, `px-*`, and so on padding utilities, including logical properties `ps` and `pe` |
| `m`, `mx`, `my`, `ms`, `me`, `mt`, `mr`, `mb`, `ml` | Margin utilities; support `auto` and negative values                                   |
| `spaceX`, `spaceY`                                  | `space-x-*` and `space-y-*` child spacing utilities, support negative values           |
| `spaceXReverse`, `spaceYReverse`                    | `space-x-reverse` and `space-y-reverse`                                                |

All spacing props work with the `$` and `@` prefixes, which is the recommended way to pass arbitrary lengths.

```tsx
<View p="@4" mb="$16px" mx="auto">
  Spaced content
</View>
```

### Sizing (ViewSizingProps)

| Prop                | Type                                              | Description                                    |
| ------------------- | ------------------------------------------------- | ---------------------------------------------- |
| `size`              | `'auto' \| Sizing \| string`                      | `size-*` utility                               |
| `w`, `minW`, `maxW` | `Scale \| 'auto' \| Sizing \| 'screen' \| string` | Width utilities; `maxW` also accepts `'none'`  |
| `h`, `minH`, `maxH` | `'auto' \| Sizing \| 'screen' \| 'lh' \| string`  | Height utilities; `maxH` also accepts `'none'` |

### Typography (ViewTypographyProps)

| Prop                 | Type                                                                                                                                                                       | Description                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `fontFamily`         | `'sans' \| 'serif' \| 'mono' \| 'display' \| string`                                                                                                                       | `font-*` family utility                                         |
| `fontSize`           | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' ... '9xl' \| string`                                                                                                      | `text-*` size utility; variable class uses a `length` type hint |
| `fontSmoothing`      | `'antialiased' \| 'subpixel-antialiased'`                                                                                                                                  | Font smoothing utility                                          |
| `fontStyle`          | `'italic' \| 'not-italic'`                                                                                                                                                 | Font style utility                                              |
| `fontWeight`         | `'thin' ... 'black' \| string`                                                                                                                                             | `font-*` weight utility                                         |
| `fontStretch`        | `'ultra-condensed' ... 'ultra-expanded' \| string`                                                                                                                         | `font-stretch-*` utility                                        |
| `fontVariantNumeric` | `'normal-nums' \| 'ordinal' \| 'slashed-zero' \| 'lining-nums' \| 'oldstyle-nums' \| 'proportional-nums' \| 'tabular-nums' \| 'diagonal-fractions' \| 'stacked-fractions'` | Numeric variant utilities                                       |
| `letterSpacing`      | `'tighter' ... 'widest' \| string`                                                                                                                                         | `tracking-*` utility                                            |
| `lineClamp`          | `'none' \| string`                                                                                                                                                         | `line-clamp-*` utility                                          |
| `lineHeight`         | `'none' \| string`                                                                                                                                                         | `leading-*` utility                                             |
| `listImage`          | `'none' \| string`                                                                                                                                                         | `list-image-*` utility                                          |
| `listPosition`       | `'inside' \| 'outside'`                                                                                                                                                    | `list-inside` or `list-outside`                                 |
| `list`               | `'disc' \| 'decimal' \| 'none' \| string`                                                                                                                                  | `list-*` utility                                                |
| `textAlign`          | `'left' \| 'center' \| 'right' \| 'justify' \| 'start' \| 'end'`                                                                                                           | `text-*` alignment utility                                      |
| `text`               | `Color \| string`                                                                                                                                                          | `text-*` color utility                                          |
| `textDecoration`     | `object`, see below                                                                                                                                                        | Text decoration utilities                                       |
| `textTransform`      | `'uppercase' \| 'lowercase' \| 'capitalize' \| 'normal-case'`                                                                                                              | Text transform utility                                          |
| `textOverflow`       | `'truncate' \| 'text-ellipsis' \| 'text-clip'`                                                                                                                             | Value is used as the class verbatim                             |
| `textWrap`           | `'wrap' \| 'nowrap' \| 'balance' \| 'pretty'`                                                                                                                              | `text-wrap` family utilities                                    |
| `textIndent`         | `'px' \| '-px' \| string`                                                                                                                                                  | `indent-*` utility, supports negative values                    |
| `verticalAlign`      | `'baseline' \| 'top' \| 'middle' \| 'bottom' \| 'text-top' \| 'text-bottom' \| 'sub' \| 'super' \| string`                                                                 | `align-*` utility                                               |
| `whitespace`         | `'normal' \| 'nowrap' \| 'pre' \| 'pre-line' \| 'pre-wrap' \| 'break-spaces'`                                                                                              | `whitespace-*` utility                                          |
| `wordbreak`          | `'normal' \| 'all' \| 'keep'`                                                                                                                                              | Maps to `break-normal`, `break-all`, `break-keep`               |
| `overflowWrap`       | `'break-word' \| 'anywhere' \| 'normal'`                                                                                                                                   | Maps to `wrap-break-word`, `wrap-anywhere`, `wrap-normal`       |
| `hyphens`            | `'none' \| 'manual' \| 'auto'`                                                                                                                                             | `hyphens-*` utility                                             |

The `textDecoration` object controls line, color, style, thickness, and offset independently:

```tsx
<View textDecoration={{ line: 'underline', color: '$#ef4444', thickness: '$2px', underlineOffset: '$4px' }}>Link text</View>
```

| Key               | Emitted utility                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| `line`            | `underline`, `overline`, `line-through`, `no-underline`                                              |
| `color`           | `decoration-*`                                                                                       |
| `style`           | `decoration-solid`, `decoration-double`, `decoration-dotted`, `decoration-dashed`, `decoration-wavy` |
| `thickness`       | `decoration-*` or `decoration-(length:--see-decoration-thickness)` for `$` and `@` values            |
| `underlineOffset` | `underline-offset-*`, supports negative values                                                       |

### Background (ViewBackgroundProps)

| Prop           | Type                                           | Description                                                                                 |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `bgAttachment` | `'fixed' \| 'local' \| 'scroll'`               | `bg-fixed`, `bg-local`, `bg-scroll`                                                         |
| `bgClip`       | `'border' \| 'padding' \| 'content' \| 'text'` | `bg-clip-*` utilities                                                                       |
| `bgColor`      | `Color \| string`                              | `bg-*` color utility                                                                        |
| `bgImage`      | `'none' \| string`                             | `bg-*` image utility; variable class uses an `image` type hint                              |
| `bgLinear`     | `'to-t' ... 'to-tl' \| string`                 | `bg-linear-*` direction utilities, support negative angle values                            |
| `bgRadial`     | `boolean \| string`                            | `true` emits `bg-radial`; a string emits `bg-radial-*` or a variable class                  |
| `bgConic`      | `string`                                       | `bg-conic-*` utility, supports negative values                                              |
| `gradient`     | `{ from?, via?, to? }`                         | Gradient stop colors, see below                                                             |
| `bgOrigin`     | `'border' \| 'padding' \| 'content'`           | `bg-origin-*` utilities                                                                     |
| `bgPosition`   | `Placement \| string`                          | Placement keywords emit `bg-center`, `bg-top`, and so on; other values emit `bg-position-*` |
| `bgRepeat`     | `Repeat`                                       | `bg-repeat` family utilities                                                                |
| `bgSize`       | `'auto' \| 'cover' \| 'contain' \| string`     | Keywords emit `bg-auto`, `bg-cover`, `bg-contain`; other values emit `bg-size-*`            |

The `gradient` object sets gradient stops:

```tsx
<View bgLinear="to-r" gradient={{ from: '$#3b82f6', via: '$#a855f7', to: '$#ec4899' }}>
  Gradient banner
</View>
```

### Border and outline (ViewBorderProps)

| Prop                               | Type                                          | Description                                                             |
| ---------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `rounded`                          | `Radius \| string \| object`                  | Corner radius, see below                                                |
| `border`                           | `boolean \| string \| OutlineTuple \| object` | Border width and per-side widths, see below                             |
| `borderColor`                      | `Color \| string`                             | `border-*` color; applies when `border` is a boolean or a string        |
| `borderStyle`                      | `LineLook`                                    | `border-solid` and siblings                                             |
| `divideX`, `divideY`               | `string`                                      | `divide-x-*` and `divide-y-*` width utilities with a `length` type hint |
| `divideColor`                      | `Color \| string`                             | `divide-*` color utility                                                |
| `divideStyle`                      | `LineLook`                                    | `divide-solid` and siblings                                             |
| `divideXReverse`, `divideYReverse` | `boolean`                                     | Reverse direction utilities                                             |
| `outline`                          | `boolean \| string \| OutlineTuple \| object` | Outline width, see below                                                |
| `outlineColor`                     | `Color \| string`                             | `outline-*` color; applies when `outline` is a boolean or a string      |
| `outlineStyle`                     | `LineLook`                                    | `outline-solid` and siblings                                            |
| `outlineOffset`                    | `string`                                      | `outline-offset-*` utility, supports negative values                    |

The `rounded` prop accepts a single value or an object of per-side keys: `s`, `e`, `t`, `r`, `b`, `l`, `ss`, `se`, `ee`, `es`, `tl`, `tr`, `br`, `bl`.

```tsx
<View rounded="lg" />
<View rounded={{ t: 'lg', b: 'none' }} />
```

The `border` prop supports four forms:

```tsx
<View border={true} borderColor="$#e5e7eb" />        // border plus color and style props
<View border="2px" borderColor="$#e5e7eb" />         // width as a CSS length
<View border={['2px', '#e5e7eb']} />                 // width and color tuple
<View border={{ width: '2px', color: '$#e5e7eb', x: '1px', t: ['2px', '#ef4444'] }} />
```

Behavior details for `border`:

- `border={true}` emits the `border` class and applies `borderColor` and `borderStyle`.
- A string or tuple width is applied as a raw CSS length through a variable class such as `border-(length:--see-border)`. Tailwind spacing names such as `"2"` are not converted; pass CSS lengths like `"2px"` or use `border="@2"` for spacing-unit widths. Tuple colors are also raw CSS values, so pass CSS colors, not palette names. Colors in the boolean and string forms follow the same rule: palette names emit classes that may not be safelisted, while `$`-prefixed CSS colors always work.
- The object form emits a border width class even when `width` is omitted (the bare `border` class) and reads its color and style from the object; `borderColor` is ignored in this form. Side keys `x`, `y`, `s`, `e`, `t`, `r`, `b`, `l` each accept a width string or an `OutlineTuple`.

The `outline` prop follows the same four forms. Differences from `border`:

- A string width emits `outline-(length:--see-outline)`; the object form does not emit a bare `outline` class when `width` is omitted.
- The object form reads `color`, `style`, and `offset` from the object; `outlineColor` applies only in the boolean and string forms.

`OutlineTuple` is a tuple of `[width: string, color?: Color | string]`. A placeholder variant `[Fallback, color]` omits the width and falls back to the bare class:

```tsx
import { _, View } from '@arbiui/react';

<View border={[_, '#e5e7eb']} /> // emits border plus border-(--see-border-color)
<View outline={['2px', '#3b82f6']} />
```

### Effects (ViewEffectProps)

| Prop                                                                                                                       | Type                                                                              | Description                                                              |
| -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `shadow`                                                                                                                   | `'2xs' ... '2xl' \| 'none' \| string`                                             | `shadow-*` utility                                                       |
| `shadowColor`                                                                                                              | `Color \| string`                                                                 | `shadow-*` color utility                                                 |
| `insetShadow`                                                                                                              | `'2xs' \| 'xs' \| 'sm' \| 'none' \| string`                                       | `inset-shadow-*` utility                                                 |
| `insetShadowColor`                                                                                                         | `Color \| string`                                                                 | `inset-shadow-*` color utility                                           |
| `ring`                                                                                                                     | `boolean \| string`                                                               | `true` emits `ring`; a string emits `ring-*`                             |
| `ringColor`                                                                                                                | `Color \| string`                                                                 | `ring-*` color utility                                                   |
| `insetRing`                                                                                                                | `boolean \| string`                                                               | Same forms as `ring` for the inset ring                                  |
| `insetRingColor`                                                                                                           | `Color \| string`                                                                 | `inset-ring-*` color utility                                             |
| `textShadow`                                                                                                               | `'2xs' ... 'lg' \| 'none' \| string`                                              | `text-shadow-*` utility                                                  |
| `textShadowColor`                                                                                                          | `Color \| string`                                                                 | `text-shadow-*` color utility                                            |
| `opacity`                                                                                                                  | `string`                                                                          | `opacity-*` utility                                                      |
| `mixBlend`                                                                                                                 | `Blending \| 'plus-darker' \| 'plus-lighter'`                                     | `mix-blend-*` utilities                                                  |
| `bgBlend`                                                                                                                  | `Blending`                                                                        | `bg-blend-*` utilities                                                   |
| `maskClip`                                                                                                                 | `'border' \| 'padding' \| 'content' \| 'fill' \| 'stroke' \| 'view' \| 'no-clip'` | `mask-clip-*` utilities and `mask-no-clip`                               |
| `maskComposite`                                                                                                            | `'add' \| 'subtract' \| 'intersect' \| 'exclude'`                                 | `mask-*` composite utilities                                             |
| `maskImage`                                                                                                                | `'none' \| string`                                                                | `mask-*` image utility                                                   |
| `maskLinear`                                                                                                               | `string`                                                                          | `mask-linear-<angle>`, supports negative angles                          |
| `maskLinearFrom`, `maskLinearTo`                                                                                           | `string`                                                                          | Gradient stop utilities for the linear mask                              |
| `maskTopFrom`, `maskTopTo`, `maskRightFrom`, `maskRightTo`, `maskBottomFrom`, `maskBottomTo`, `maskLeftFrom`, `maskLeftTo` | `string`                                                                          | Edge-direction mask stop utilities                                       |
| `maskXFrom`, `maskXTo`, `maskYFrom`, `maskYTo`                                                                             | `string`                                                                          | Axis-direction mask stop utilities                                       |
| `maskRadial`                                                                                                               | `string`                                                                          | `mask-radial-*` value utility                                            |
| `maskRadialFrom`, `maskRadialTo`                                                                                           | `string`                                                                          | Gradient stop utilities for the radial mask                              |
| `maskRadialShape`                                                                                                          | `'circle' \| 'ellipse'`                                                           | `mask-circle` or `mask-ellipse`                                          |
| `maskRadialSpot`                                                                                                           | `'closest-corner' ... 'at-bottom-right'`                                          | `mask-radial-*` position utilities                                       |
| `maskConic`                                                                                                                | `string`                                                                          | `mask-conic-<angle>`, supports negative angles                           |
| `maskConicFrom`, `maskConicTo`                                                                                             | `string`                                                                          | Gradient stop utilities for the conic mask                               |
| `maskMode`                                                                                                                 | `'alpha' \| 'luminance' \| 'match'`                                               | `mask-alpha`, `mask-luminance`, `mask-match`                             |
| `maskOrigin`                                                                                                               | `'border' \| 'padding' \| 'content' \| 'fill' \| 'stroke' \| 'view'`              | `mask-origin-*` utilities                                                |
| `maskPosition`                                                                                                             | `Placement \| string`                                                             | Placement keywords emit shorthand classes; others emit `mask-position-*` |
| `maskRepeat`                                                                                                               | `Repeat`                                                                          | `mask-repeat` family utilities                                           |
| `maskSize`                                                                                                                 | `'auto' \| 'cover' \| 'contain' \| string`                                        | Keywords emit shorthand classes; others emit `mask-size-*`               |
| `maskType`                                                                                                                 | `'alpha' \| 'luminance'`                                                          | `mask-type-*` utilities                                                  |

### Filters (ViewFiltersProps)

Filter props accept a boolean or string form where noted. `true` emits the bare utility; a string emits `prefix-value` or a variable class.

| Prop                                                                            | Type                                 | Description                                       |
| ------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------- |
| `filter`                                                                        | `'none' \| string`                   | `filter-*` utility                                |
| `blur`                                                                          | `'xs' ... '3xl' \| 'none' \| string` | `blur-*` utility                                  |
| `brightness`, `contrast`, `saturate`                                            | `string`                             | Value utilities                                   |
| `dropShadow`                                                                    | `'xs' ... '2xl' \| 'none' \| string` | `drop-shadow-*` utility                           |
| `dropShadowColor`                                                               | `Color \| string`                    | `drop-shadow-*` color utility                     |
| `grayscale`                                                                     | `boolean \| string`                  | Bare utility or value utility                     |
| `hueRotate`                                                                     | `string`                             | `hue-rotate-*`, supports negative values          |
| `invert`                                                                        | `boolean \| string`                  | Bare utility or value utility                     |
| `sepia`                                                                         | `boolean \| string`                  | Bare utility or value utility                     |
| `backdropFilter`                                                                | `'none' \| string`                   | `backdrop-filter-*` utility                       |
| `backdropBlur`                                                                  | `'xs' ... '3xl' \| 'none' \| string` | `backdrop-blur-*` utility                         |
| `backdropBrightness`, `backdropContrast`, `backdropOpacity`, `backdropSaturate` | `string`                             | Value utilities                                   |
| `backdropGrayscale`, `backdropInvert`, `backdropSepia`                          | `boolean \| string`                  | Bare utility or value utility                     |
| `backdropHueRotate`                                                             | `string`                             | `backdrop-hue-rotate-*`, supports negative values |

```tsx
<View backdropBlur="md" bgColor="$rgb(255 255 255 / 0.6)">
  Frosted panel
</View>
```

### Table (ViewTableProps)

| Prop                               | Type                | Description                       |
| ---------------------------------- | ------------------- | --------------------------------- |
| `borderCollapse`                   | `boolean`           | `border-collapse`                 |
| `borderSeparate`                   | `boolean`           | `border-separate`                 |
| `borderSpacing`                    | `string`            | `border-spacing-*` utility        |
| `borderXSpacing`, `borderYSpacing` | `string`            | Axis-specific spacing utilities   |
| `tableLayout`                      | `'auto' \| 'fixed'` | `table-auto` or `table-fixed`     |
| `captionSide`                      | `'top' \| 'bottom'` | `caption-top` or `caption-bottom` |

### Transition and animation (ViewTransitionProps)

The `transition` prop supports four forms:

```tsx
<View transition />                                                  // bare transition
<View transition="colors" />                                         // transition-colors
<View transition="$150" />                                           // duration through variable class
<View transition={{ property: 'colors', duration: '150', function: 'in-out', delay: '100', behavior: 'discrete' }} />
```

| Key        | Prop values                                                                                  | Emitted utility                            |
| ---------- | -------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `property` | `'default' \| 'all' \| 'colors' \| 'opacity' \| 'shadow' \| 'transform' \| 'none' \| string` | `transition-*`                             |
| `behavior` | `'normal' \| 'discrete'`                                                                     | `transition-normal`, `transition-discrete` |
| `duration` | `'initial' \| string`                                                                        | `duration-*`                               |
| `function` | `'linear' \| 'in' \| 'out' \| 'in-out' \| 'initial' \| string`                               | `ease-*`                                   |
| `delay`    | `string`                                                                                     | `delay-*`                                  |

| Prop      | Type                                                          | Description         |
| --------- | ------------------------------------------------------------- | ------------------- |
| `animate` | `'spin' \| 'ping' \| 'pulse' \| 'bounce' \| 'none' \| string` | `animate-*` utility |

### Transform (ViewTransformProps)

| Prop                                                                                      | Type                                                                              | Description                                      |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------ |
| `backface`                                                                                | `'hidden' \| 'visible'`                                                           | `backface-*` utilities                           |
| `perspective`                                                                             | `'dramatic' \| 'near' \| 'normal' \| 'midrange' \| 'distant' \| 'none' \| string` | `perspective-*` utility                          |
| `perspectiveOrigin`                                                                       | `Placement \| string`                                                             | `perspective-origin-*` utility                   |
| `rotate`, `rotateX`, `rotateY`, `rotateZ`                                                 | `'none' \| string`                                                                | Rotation utilities, support negative values      |
| `scale`, `scaleX`, `scaleY`, `scaleZ`                                                     | `'none' \| '3d' \| string`                                                        | Scale utilities, support negative values         |
| `skew`, `skewX`, `skewY`                                                                  | `string`                                                                          | Skew utilities, support negative values          |
| `transform`                                                                               | `'none' \| 'gpu' \| 'cpu' \| string`                                              | `transform-*` utilities                          |
| `transformOrigin`                                                                         | `Placement \| string`                                                             | `origin-*` utility                               |
| `transformStyle`                                                                          | `'3d' \| 'flat'`                                                                  | `transform-3d` or `transform-flat`               |
| `transformTranslate`, `transformTranslateX`, `transformTranslateY`, `transformTranslateZ` | `'full' \| '-full' \| 'px' \| '-px' \| 'none' \| string`                          | `translate-*` utilities, support negative values |

### Interactivity (ViewInteractivityProps)

| Prop                                                                                                                                                            | Type                                                                           | Description                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `accentColor`                                                                                                                                                   | `Color \| string`                                                              | `accent-*` color utility                                                                            |
| `appearance`                                                                                                                                                    | `'none' \| 'auto'`                                                             | `appearance-none` or `appearance-auto`                                                              |
| `caretColor`                                                                                                                                                    | `Color \| string`                                                              | `caret-*` color utility                                                                             |
| `colorScheme`                                                                                                                                                   | `'normal' \| 'dark' \| 'light' \| 'light-dark' \| 'only-dark' \| 'only-light'` | `scheme-*` utilities                                                                                |
| `cursor`                                                                                                                                                        | Cursor keyword or `string`                                                     | `cursor-*` utility; all standard cursor keywords are supported                                      |
| `fieldSizing`                                                                                                                                                   | `'fixed' \| 'content'`                                                         | `field-sizing-*` utilities                                                                          |
| `pointerEvents`                                                                                                                                                 | `'auto' \| 'none'`                                                             | `pointer-events-*` utilities                                                                        |
| `resize`                                                                                                                                                        | `'both' \| 'x' \| 'y' \| 'none'`                                               | `resize`, `resize-x`, `resize-y`, `resize-none`                                                     |
| `scrollBehavior`                                                                                                                                                | `'auto' \| 'smooth'`                                                           | `scroll-auto` or `scroll-smooth`                                                                    |
| `scrollbar`                                                                                                                                                     | `object`, see below                                                            | Scrollbar color, width, and gutter                                                                  |
| `scrollMargin`, `scrollMarginX`, `scrollMarginY`, `scrollMarginS`, `scrollMarginE`, `scrollMarginT`, `scrollMarginR`, `scrollMarginB`, `scrollMarginL`          | `string`                                                                       | `scroll-m-*` utilities, support negative values                                                     |
| `scrollPadding`, `scrollPaddingX`, `scrollPaddingY`, `scrollPaddingS`, `scrollPaddingE`, `scrollPaddingT`, `scrollPaddingR`, `scrollPaddingB`, `scrollPaddingL` | `string`                                                                       | `scroll-p-*` utilities, support negative values                                                     |
| `scrollSnapAlign`                                                                                                                                               | `'start' \| 'end' \| 'center' \| 'none'`                                       | `snap-*` alignment utilities                                                                        |
| `scrollSnapStop`                                                                                                                                                | `'normal' \| 'always'`                                                         | `snap-normal` or `snap-always`                                                                      |
| `scrollSnapType`                                                                                                                                                | `'x' \| 'y' \| 'both' \| 'mandatory' \| 'proximity' \| 'none'`                 | `snap-*` type utilities                                                                             |
| `touchAction`                                                                                                                                                   | `'auto' \| 'pan-x' ... 'pinch-zoom' \| 'manipulation' \| 'none'`               | `touch-*` utilities                                                                                 |
| `userSelect`                                                                                                                                                    | `'none' \| 'text' \| 'all' \| 'auto'`                                          | `select-*` utilities                                                                                |
| `willChange`                                                                                                                                                    | `'auto' \| 'scroll' \| 'contents' \| 'transform' \| string`                    | `will-change-*` utility                                                                             |
| `forceAdjustColor`                                                                                                                                              | `'auto' \| 'none'`                                                             | `forced-color-adjust-*` utilities. Defined directly on `View`, not part of `ViewInteractivityProps` |

The `scrollbar` object:

```tsx
<View scrollbar={{ color: { thumb: '$#9ca3af', track: '$#f3f4f6' }, width: 'thin', gutter: 'stable' }}>Scrollable content</View>
```

| Key           | Values                         | Emitted utility                                      |
| ------------- | ------------------------------ | ---------------------------------------------------- |
| `color.thumb` | `Color \| string`              | `scrollbar-thumb-*` color utility                    |
| `color.track` | `Color \| string`              | `scrollbar-track-*` color utility                    |
| `width`       | `'auto' \| 'thin' \| 'none'`   | `scrollbar-auto`, `scrollbar-thin`, `scrollbar-none` |
| `gutter`      | `'auto' \| 'stable' \| 'both'` | `scrollbar-gutter-*` utilities                       |

### SVG (ViewSVGProps)

| Prop         | Type                        | Description                                                                                                |
| ------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `fill`       | `'none' \| Color \| string` | `fill-*` utility                                                                                           |
| `strokefill` | `'none' \| Color \| string` | Stroke paint utility, emitted as `stroke-*`. The name distinguishes it from `stroke`, which controls width |
| `stroke`     | `string`                    | Stroke width utility with a `length` type hint for variable values                                         |

```tsx
<View as="svg" viewBox="0 0 24 24" fill="none" stroke="@2">
  <View as="path" d="M4 12h16" />
</View>
```

## Shared value types

| Alias           | Values                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------- |
| `Scale`         | `'3xs' \| '2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' ... '7xl'`                       |
| `Break`         | `'auto' \| 'avoid' \| 'all' \| 'avoid-page' \| 'page' \| 'left' \| 'right' \| 'column'`           |
| `Placement`     | Nine-position keywords from `'top-left'` through `'bottom-right'`, including `'center'`           |
| `Overflow`      | `'auto' \| 'hidden' \| 'clip' \| 'visible' \| 'scroll'`                                           |
| `AbsoluteValue` | `'px' \| '-px' \| 'full' \| '-full' \| 'auto'`                                                    |
| `Alignment`     | `'start' \| 'end' \| 'center' \| 'stretch'`                                                       |
| `Sizing`        | `'px' \| 'full' \| 'dvw' \| 'dvh' \| 'lvw' \| 'lvh' \| 'svw' \| 'svh' \| 'min' \| 'max' \| 'fit'` |
| `Color`         | `'inherit' \| 'current' \| 'transparent' \| 'black' \| 'white' \| string`                         |
| `Radius`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| 'none' \| 'full'`             |
| `LineLook`      | `'solid' \| 'dashed' \| 'dotted' \| 'double' \| 'hidden' \| 'none'`                               |
| `Blending`      | Standard CSS blend mode keywords from `'normal'` through `'luminosity'`                           |
| `Repeat`        | `'repeat' \| 'repeat-x' \| 'repeat-y' \| 'repeat-space' \| 'repeat-round' \| 'no-repeat'`         |

## Composition patterns

`View` is designed as a base layer for higher-level components. Because it renders a plain element and spreads unknown props, wrappers stay thin:

```tsx
import { View } from '@arbiui/react';
import type { ViewSpacingProps, ViewBackgroundProps, ViewBorderProps } from '@arbiui/react';

type PanelProps = ViewSpacingProps & ViewBackgroundProps & ViewBorderProps & { children?: React.ReactNode };

export function Panel({ children, ...props }: PanelProps) {
  return (
    <View display="block" rounded="lg" bgColor="$#ffffff" p="@4" {...props}>
      {children}
    </View>
  );
}
```

Guidelines:

- Import the exported prop group types to compose wrapper props instead of restating them.
- Place spread props after the wrapper defaults in the `View` call; your `className` still wins conflicts because `View` merges it last through `tailwind-merge`.
- Use the `as` prop to keep semantics correct when a wrapper needs to render a different element.

## Accessibility considerations

`View` applies styling only. Accessibility is the responsibility of the consumer, supported by the following:

- The `as` prop controls the rendered element, so semantic elements such as `section`, `nav`, `button`, or `ul` can be styled with the same props. Prefer semantic elements over generic `div` containers.
- Standard attributes, ARIA attributes, and event handlers spread onto the element unchanged.
- `display="sr-only"` and `display="hidden"` provide visually hidden and fully hidden variants.
- `colorScheme` aligns the subtree with light or dark user agent rendering.
- `forceAdjustColor` controls forced-colors mode adjustment for high-contrast environments.
- `hideScrollBar` hides visual overflow indication while keeping content scrollable; ensure scrollable regions remain keyboard reachable.

## Styling behavior

- Generated classes are merged with `tailwind-merge`, so conflicting utilities are deduplicated in favor of the last one. Your `className` is appended last and wins.
- Inline CSS variables from `$` and `@` values are merged into `style` after your style object.
- Because `display` defaults to `flex` and `position` to `relative`, both classes are present on every `View` unless overridden by props or `className`.
- There are no responsive, state, or dark mode prop variants. Use `className` with Tailwind variants for those, for example `className="hover:bg-red-500 md:w-1/2"`.

## TypeScript

The package entry exports the `View` component, the `_` placeholder symbol for `OutlineTuple` tuples, and the following types:

`ViewLayoutProps`, `ViewFlexGridProps`, `ViewSpacingProps`, `ViewSizingProps`, `ViewTypographyProps`, `ViewBackgroundProps`, `ViewBorderProps`, `ViewEffectProps`, `ViewFiltersProps`, `ViewTableProps`, `ViewTransitionProps`, `ViewTransformProps`, `ViewInteractivityProps`, `ViewSVGProps`, `ViewProps`

`ViewProps<E>` is the full polymorphic props type of `View`, parameterized by the element type passed to `as`. Internal helpers such as `cn`, `resolveProp`, and `resolveTupledProp` are not part of the public API.

## Troubleshooting

**Prop styles have no effect.** Check that `@import '@arbiui/tailwindcss'` appears in the Tailwind entry stylesheet after `@import 'tailwindcss'`. Then check the value: enumerated values and `$` / `@` values are guaranteed to compile, while free-form strings such as `mb="4"` only compile if the literal class appears in scanned source. See the class generation section above.

**A Tailwind palette color passed with `$` renders nothing.** `$` values are raw CSS values, not palette lookups. Pass palette names as plain values where the safelist covers them, or pass CSS colors such as `bgColor="$#ef4444"`.

**A negative arbitrary value does not work.** Write the sign inside the value: `mb="$-8px"` or `mt="@-2"`. A leading `-` before the `$` or `@` prefix is not supported.

**`border="2"` or a tuple width renders nothing.** String and tuple border widths are raw CSS lengths. Use `"2px"`, or `border="@2"` for spacing-unit widths.

**The element is not positioned as expected.** `position` defaults to `relative` and `display` defaults to `flex`. Pass `position="static"` or another `display` value to change them.

**Ref does not forward.** Refs pass through as a regular prop, which requires **React 19**. Older React versions are not supported.

**Nothing renders in a CommonJS-only environment.** The package is ESM-only.

## Build and publishing notes

- Source is built with tsdown to a single ESM entry (`dist/index.js`) with declaration files and tree shaking enabled. The published package contains `dist` and this README.
- `exports` maps a single entry point with `types` and `import` conditions.
- Runtime dependencies are `clsx` and `tailwind-merge`; React and `@arbiui/tailwindcss` are peer dependencies.
- Typecheck and build run through Turborepo from the repository root: `pnpm typecheck` and `pnpm build`.

## Open questions

The following points are implementation details that may change and are worth confirming before relying on them:

- Colors in border and outline tuples, and the color fields of the border and outline objects, are applied as raw CSS values. Tailwind palette names such as `red-500` do not resolve there; pass CSS colors or `$`-prefixed values. Resolving palette names is a planned improvement.
- Free-form string values outside the enumerated type unions compile only if their literal class appears in scanned source. A safelist entry per dynamic value is not possible; keep using the `$` and `@` prefixes for arbitrary values.
- Class generation from package sources was verified with Tailwind CSS 4.3.3. Behavior on other Tailwind versions depends on their source detection rules.
