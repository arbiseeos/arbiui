import type { ElementType, ComponentPropsWithRef } from 'react';
import { _ } from '../components/shared/constants';

export type RefOf<E extends ElementType> = ComponentPropsWithRef<E>['ref'];

type Scale = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
type Break = 'auto' | 'avoid' | 'all' | 'avoid-page' | 'page' | 'left' | 'right' | 'column';
type Placement = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';
type Overflow = 'auto' | 'hidden' | 'clip' | 'visible' | 'scroll';
type Overscroll = 'auto' | 'contain' | 'none';
type AbsoluteValue = 'px' | '-px' | 'full' | '-full' | 'auto';
type Alignment = 'start' | 'end' | 'center' | 'stretch';
type Sizing = 'px' | 'full' | 'dvw' | 'dvh' | 'lvw' | 'lvh' | 'svw' | 'svh' | 'min' | 'max' | 'fit';
type Color = 'inherit' | 'current' | 'transparent' | 'black' | 'white';
type Radius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'none' | 'full';
type LineLook = 'solid' | 'dashed' | 'dotted' | 'double' | 'hidden' | 'none';
type Blending =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';
type Repeat = 'repeat' | 'repeat-x' | 'repeat-y' | 'repeat-space' | 'repeat-round' | 'no-repeat';
type ContentSize = 'auto' | 'cover' | 'contain';
type TransitionProperty = 'default' | 'all' | 'colors' | 'opacity' | 'shadow' | 'transform' | 'none';
type Fallback = typeof _;
export type OutlineTuple = [width: string, color?: Color | string] | [width: Fallback, color: Color | string];

export interface ViewLayoutProps {
  aspect?: 'square' | 'video' | 'auto' | string;
  columns?: Scale | 'auto' | string;
  breakAfter?: Break;
  breakBefore?: Break;
  breakInside?: 'auto' | 'avoid' | 'avoid-page' | 'avoid-column';
  boxDecoration?: 'clone' | 'slice';
  box?: 'border' | 'content';
  display?:
    | 'inline'
    | 'block'
    | 'inline-block'
    | 'flow-root'
    | 'flex'
    | 'inline-flex'
    | 'grid'
    | 'inline-grid'
    | 'contents'
    | 'table'
    | 'inline-table'
    | 'table-caption'
    | 'table-cell'
    | 'table-column'
    | 'table-column-group'
    | 'table-footer-group'
    | 'table-header-group'
    | 'table-row-group'
    | 'table-row'
    | 'list-item'
    | 'hidden'
    | 'sr-only'
    | 'not-sr-only';
  float?: 'right' | 'left' | 'start' | 'end' | 'none';
  clear?: 'left' | 'right' | 'both' | 'start' | 'end' | 'none';
  isolate?: boolean;
  autoIsolate?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  object?: Placement | string;
  overflow?: Overflow;
  overflowX?: Overflow;
  overflowY?: Overflow;
  overscroll?: Overscroll;
  overscrollX?: Overscroll;
  overscrollY?: Overscroll;
  hideScrollBar?: boolean;
  position?: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';
  inset?: AbsoluteValue | string;
  insetX?: AbsoluteValue | string;
  insetY?: AbsoluteValue | string;
  start?: AbsoluteValue | string;
  end?: AbsoluteValue | string;
  top?: AbsoluteValue | string;
  right?: AbsoluteValue | string;
  bottom?: AbsoluteValue | string;
  left?: AbsoluteValue | string;
  visibility?: 'visible' | 'invisible' | 'collapse';
  z?: 'auto' | string;
}

export interface ViewFlexGridProps {
  basis?: 'full' | 'auto' | Scale | string;
  flexDirection?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flex?: 'auto' | 'initial' | 'none' | string;
  grow?: boolean | string;
  shrink?: boolean | string;
  order?: 'first' | 'last' | 'none' | string;
  gridCols?: 'none' | 'subgrid' | string;
  gridRows?: 'none' | 'subgrid' | string;
  col?: 'auto' | string;
  colSpan?: 'full' | string;
  colStart?: 'auto' | string;
  colEnd?: 'auto' | string;
  row?: 'auto' | string;
  rowSpan?: 'full' | string;
  rowStart?: 'auto' | string;
  rowEnd?: 'auto' | string;
  gridFlow?: 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense';
  autoCols?: 'auto' | 'min' | 'max' | 'fr' | string;
  autoRows?: 'auto' | 'min' | 'max' | 'fr' | string;
  gap?: string;
  gapX?: string;
  gapY?: string;
  self?: Alignment | 'auto' | 'end-safe' | 'center-safe' | 'baseline' | 'baseline-end';
  items?: Alignment | 'end-safe' | 'center-safe' | 'baseline' | 'baseline-last';
  content?: Alignment | 'normal' | 'between' | 'around' | 'evenly' | 'baseline';
  justifySelf?: Alignment | 'auto' | 'center-safe' | 'end-safe';
  justifyItems?: Alignment | 'end-safe' | 'center-safe' | 'normal';
  justify?: Alignment | 'end-safe' | 'center-safe' | 'between' | 'around' | 'evenly' | 'baseline' | 'normal';
  placeSelf?: Alignment | 'auto' | 'end-safe' | 'center-safe';
  placeItems?: Alignment | 'end-safe' | 'center-safe' | 'baseline';
  placeContent?: Alignment | 'center-safe' | 'end-safe' | 'between' | 'around' | 'evenly' | 'baseline';
}

export interface ViewSpacingProps {
  p?: 'px' | string;
  px?: 'px' | string;
  py?: 'px' | string;
  ps?: 'px' | string;
  pe?: 'px' | string;
  pt?: 'px' | string;
  pr?: 'px' | string;
  pb?: 'px' | string;
  pl?: 'px' | string;
  m?: 'auto' | 'px' | '-px' | string;
  mx?: 'auto' | 'px' | '-px' | string;
  my?: 'auto' | 'px' | '-px' | string;
  ms?: 'auto' | 'px' | '-px' | string;
  me?: 'auto' | 'px' | '-px' | string;
  mt?: 'auto' | 'px' | '-px' | string;
  mr?: 'auto' | 'px' | '-px' | string;
  mb?: 'auto' | 'px' | '-px' | string;
  ml?: 'auto' | 'px' | '-px' | string;
  spaceX?: 'px' | '-px' | string;
  spaceY?: 'px' | '-px' | string;
  spaceXReverse?: boolean;
  spaceYReverse?: boolean;
}

export interface ViewSizingProps {
  size?: 'auto' | Sizing | string;
  w?: Scale | 'auto' | Sizing | 'screen' | string;
  minW?: Scale | 'auto' | Sizing | 'screen' | string;
  maxW?: Scale | 'none' | Sizing | 'screen' | string;
  h?: 'auto' | Sizing | 'screen' | 'lh' | string;
  minH?: 'auto' | Sizing | 'screen' | 'lh' | string;
  maxH?: 'none' | Sizing | 'screen' | 'lh' | string;
}

export interface ViewTypographyProps {
  fontFamily?: 'sans' | 'serif' | 'mono' | 'display' | string;
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | string;
  fontSmoothing?: 'antialiased' | 'subpixel-antialiased';
  fontStyle?: 'italic' | 'not-italic';
  fontWeight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black' | string;
  fontStretch?:
    | 'ultra-condensed'
    | 'extra-condensed'
    | 'condensed'
    | 'semi-condensed'
    | 'normal'
    | 'semi-expanded'
    | 'expanded'
    | 'extra-expanded'
    | 'ultra-expanded'
    | string;
  fontVariantNumeric?:
    | 'normal-nums'
    | 'ordinal'
    | 'slashed-zero'
    | 'lining-nums'
    | 'oldstyle-nums'
    | 'proportional-nums'
    | 'tabular-nums'
    | 'diagonal-fractions'
    | 'stacked-fractions';
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest' | string;
  lineClamp?: 'none' | string;
  lineHeight?: 'none' | string;
  listImage?: 'none' | string;
  listPosition?: 'inside' | 'outside';
  list?: 'disc' | 'decimal' | 'none' | string;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
  text?: Color | string;
  textDecoration?: {
    line?: 'underline' | 'overline' | 'line-through' | 'no-underline';
    color?: Color | string;
    style?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
    thickness?: 'auto' | 'from-font' | string;
    underlineOffset?: 'auto' | string;
  };
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  textOverflow?: 'truncate' | 'text-ellipsis' | 'text-clip';
  textWrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty';
  textIndent?: 'px' | '-px' | string;
  verticalAlign?: 'baseline' | 'top' | 'middle' | 'bottom' | 'text-top' | 'text-bottom' | 'sub' | 'super' | string;
  whitespace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces';
  wordbreak?: 'normal' | 'all' | 'keep';
  overflowWrap?: 'break-word' | 'anywhere' | 'normal';
  hyphens?: 'none' | 'manual' | 'auto';
}

export interface ViewBackgroundProps {
  bgAttachment?: 'fixed' | 'local' | 'scroll';
  bgClip?: 'border' | 'padding' | 'content' | 'text';
  bgColor?: Color | string;
  bgImage?: 'none' | string;
  bgLinear?: 'to-t' | 'to-tr' | 'to-r' | 'to-br' | 'to-b' | 'to-bl' | 'to-l' | 'to-tl' | string;
  bgRadial?: boolean | string;
  bgConic?: string;
  gradient?: {
    from?: string;
    via?: string;
    to?: string;
  };
  bgOrigin?: 'border' | 'padding' | 'content';
  bgPosition?: Placement | string;
  bgRepeat?: Repeat;
  bgSize?: ContentSize | string;
}

export interface ViewBorderProps {
  rounded?:
    | Radius
    | string
    | {
        s?: Radius | string;
        e?: Radius | string;
        t?: Radius | string;
        r?: Radius | string;
        b?: Radius | string;
        l?: Radius | string;
        ss?: Radius | string;
        se?: Radius | string;
        ee?: Radius | string;
        es?: Radius | string;
        tl?: Radius | string;
        tr?: Radius | string;
        br?: Radius | string;
        bl?: Radius | string;
      };
  border?:
    | string
    | boolean
    | OutlineTuple
    | {
        width?: string;
        color?: Color | string;
        style?: LineLook;
        x?: string | OutlineTuple;
        y?: string | OutlineTuple;
        s?: string | OutlineTuple;
        e?: string | OutlineTuple;
        t?: string | OutlineTuple;
        r?: string | OutlineTuple;
        b?: string | OutlineTuple;
        l?: string | OutlineTuple;
      };
  borderColor?: Color | string;
  borderStyle?: LineLook;
  divideX?: string;
  divideY?: string;
  divideColor?: Color | string;
  divideStyle?: LineLook;
  divideXReverse?: boolean;
  divideYReverse?: boolean;
  outline?:
    | string
    | boolean
    | OutlineTuple
    | {
        width?: string;
        color?: Color | string;
        style?: LineLook;
        offset?: string;
      };
  outlineColor?: Color | string;
  outlineStyle?: LineLook;
  outlineOffset?: string;
}

export interface ViewEffectProps {
  shadow?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none' | string;
  shadowColor?: Color | string;
  insetShadow?: '2xs' | 'xs' | 'sm' | 'none' | string;
  insetShadowColor?: Color | string;
  ring?: boolean | string;
  ringColor?: Color | string;
  insetRing?: boolean | string;
  insetRingColor?: Color | string;
  textShadow?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'none' | string;
  textShadowColor?: Color | string;
  opacity?: string;
  mixBlend?: Blending | 'plus-darker' | 'plus-lighter';
  bgBlend?: Blending;
  maskClip?: 'border' | 'padding' | 'content' | 'fill' | 'stroke' | 'view' | 'no-clip';
  maskComposite?: 'add' | 'subtract' | 'intersect' | 'exclude';
  maskImage?: 'none' | string;
  maskLinear?: string; // mask-linear-<number> | -mask-linear-<number>
  maskLinearFrom?: string;
  maskLinearTo?: string;
  maskTopFrom?: string;
  maskTopTo?: string;
  maskRightFrom?: string;
  maskRightTo?: string;
  maskBottomFrom?: string;
  maskBottomTo?: string;
  maskLeftFrom?: string;
  maskLeftTo?: string;
  maskXFrom?: string;
  maskXTo?: string;
  maskYFrom?: string;
  maskYTo?: string;
  maskRadial?: string; // mask-radial-[<value>] | mask-radial-[<size>] | mask-radial-[<size>_<size>]
  maskRadialFrom?: string;
  maskRadialTo?: string;
  maskRadialShape?: 'circle' | 'ellipse';
  maskRadialSpot?:
    | 'closest-corner'
    | 'closest-side'
    | 'farthest-corner'
    | 'farthest-side'
    | 'at-top-left'
    | 'at-top'
    | 'at-top-right'
    | 'at-left'
    | 'at-center'
    | 'at-right'
    | 'at-bottom-left'
    | 'at-bottom'
    | 'at-bottom-right';
  maskConic?: string; // mask-conic-<number> | -mask-conic-<number>
  maskConicFrom?: string;
  maskConicTo?: string;
  maskMode?: 'alpha' | 'luminance' | 'match';
  maskOrigin?: 'border' | 'padding' | 'content' | 'fill' | 'stroke' | 'view';
  maskPosition?: Placement | string;
  maskRepeat?: Repeat;
  maskSize?: ContentSize | string;
  maskType?: 'alpha' | 'luminance';
}

export interface ViewFiltersProps {
  filter?: 'none' | string;
  blur?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none' | string;
  brightness?: string;
  contrast?: string;
  dropShadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none' | string;
  dropShadowColor?: Color | string;
  grayscale?: boolean | string;
  hueRotate?: string;
  invert?: boolean | string;
  saturate?: string;
  sepia?: boolean | string;
  backdropFilter?: 'none' | string;
  backdropBlur?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none' | string;
  backdropBrightness?: string;
  backdropContrast?: string;
  backdropGrayscale?: boolean | string;
  backdropHueRotate?: string;
  backdropInvert?: boolean | string;
  backdropOpacity?: string;
  backdropSaturate?: string;
  backdropSepia?: boolean | string;
}

export interface ViewTableProps {
  borderCollapse?: boolean;
  borderSeparate?: boolean;
  borderSpacing?: string;
  borderXSpacing?: string;
  borderYSpacing?: string;
  tableLayout?: 'auto' | 'fixed'; // prefix: table
  captionSide?: 'top' | 'bottom'; // prefix: caption
}

export interface ViewTransitionProps {
  transition?:
    | boolean
    | TransitionProperty
    | string
    | {
        property?: TransitionProperty | string;
        behavior?: 'normal' | 'discrete'; // prefix: transition
        duration?: 'initial' | string;
        function?: 'linear' | 'in' | 'out' | 'in-out' | 'initial' | string;
        delay?: string;
      };
  animate?: 'spin' | 'ping' | 'pulse' | 'bounce' | 'none' | string;
}

export interface ViewTransformProps {
  backface?: 'hidden' | 'visible'; // prefix: backface
  perspective?: 'dramatic' | 'near' | 'normal' | 'midrange' | 'distant' | 'none' | string;
  perspectiveOrigin?: Placement | string;
  rotate?: 'none' | string;
  rotateX?: string;
  rotateY?: string;
  rotateZ?: string;
  scale?: 'none' | '3d' | string;
  scaleX?: string;
  scaleY?: string;
  scaleZ?: string;
  skew?: string;
  skewX?: string;
  skewY?: string;
  transform?: 'none' | 'gpu' | 'cpu' | string;
  transformOrigin?: Placement | string;
  transformStyle?: '3d' | 'flat'; // prefix: transform
  transformTranslate?: 'full' | '-full' | 'px' | '-px' | 'none' | string;
  transformTranslateX?: 'full' | '-full' | 'px' | '-px' | string;
  transformTranslateY?: 'full' | '-full' | 'px' | '-px' | string;
  transformTranslateZ?: 'px' | '-px' | string;
}

export interface ViewInteractivityProps {
  accentColor?: Color | string;
  appearance?: 'none' | 'auto';
  caretColor?: Color | string;
  colorScheme?: 'normal' | 'dark' | 'light' | 'light-dark' | 'only-dark' | 'only-light';
  cursor?:
    | 'auto'
    | 'default'
    | 'pointer'
    | 'wait'
    | 'text'
    | 'move'
    | 'help'
    | 'not-allowed'
    | 'none'
    | 'context-menu'
    | 'progress'
    | 'cell'
    | 'crosshair'
    | 'vertical-text'
    | 'alias'
    | 'copy'
    | 'no-drop'
    | 'grab'
    | 'grabbing'
    | 'all-scroll'
    | 'col-resize'
    | 'row-resize'
    | 'n-resize'
    | 'e-resize'
    | 's-resize'
    | 'w-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'zoom-in'
    | 'zoom-out'
    | string;
  fieldSizing?: 'fixed' | 'content';
  pointerEvents?: 'auto' | 'none';
  resize?: 'both' | 'x' | 'y' | 'none';
  scrollBehavior?: 'auto' | 'smooth';
  scrollbar?: {
    color?: {
      thumb?: Color | string;
      track?: Color | string;
    };
    width?: 'auto' | 'thin' | 'none';
    gutter?: 'auto' | 'stable' | 'both';
  };
  scrollMargin?: string;
  scrollMarginX?: string;
  scrollMarginY?: string;
  scrollMarginS?: string;
  scrollMarginE?: string;
  scrollMarginT?: string;
  scrollMarginR?: string;
  scrollMarginB?: string;
  scrollMarginL?: string;
  scrollPadding?: string;
  scrollPaddingX?: string;
  scrollPaddingY?: string;
  scrollPaddingS?: string;
  scrollPaddingE?: string;
  scrollPaddingT?: string;
  scrollPaddingR?: string;
  scrollPaddingB?: string;
  scrollPaddingL?: string;
  scrollSnapAlign?: 'start' | 'end' | 'center' | 'none';
  scrollSnapStop?: 'normal' | 'always';
  scrollSnapType?: 'x' | 'y' | 'both' | 'mandatory' | 'proximity' | 'none';
  touchAction?: 'auto' | 'pan-x' | 'pan-left' | 'pan-right' | 'pan-y' | 'pan-up' | 'pan-down' | 'pinch-zoom' | 'manipulation' | 'none';
  userSelect?: 'none' | 'text' | 'all' | 'auto';
  willChange?: 'auto' | 'scroll' | 'contents' | 'transform' | string;
}

export interface ViewSVGProps {
  fill?: 'none' | Color | string;
  strokefill?: 'none' | Color | string;
  stroke?: string;
}
