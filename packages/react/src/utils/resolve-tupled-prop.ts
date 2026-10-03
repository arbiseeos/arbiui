import type { OutlineTuple } from '../types/view';
import resolveProp from './resolve-prop';
import { _ } from '../components/shared/constants';

type TuplePreset = 'outline';
type TupleValueMap = {
  outline: OutlineTuple;
};

type TupleValue<P extends TuplePreset> = string | TupleValueMap[P];

export default function resolveTupledProp<P extends TuplePreset>(
  preset: P,
  cssVars: Record<string, string>,
  key: string,
  value: TupleValue<P> | undefined,
) {
  if (value === undefined) {
    return undefined;
  }

  switch (preset) {
    case 'outline': {
      if (typeof value === 'string') {
        return resolveProp(cssVars, key, value, key, 'length');
      }

      if (Array.isArray(value)) {
        const [width, color] = value;

        return [
          width === _ ? 'border' : resolveProp(cssVars, key, width, key, 'length'), //
          resolveProp(cssVars, `${key}-color`, color, key),
        ];
      }

      return undefined;
    }
  }
}
