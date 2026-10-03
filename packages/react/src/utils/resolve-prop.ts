export default function resolveProp(
  cssVars: Record<string, string>,
  key: string,
  value: string | undefined,
  twPrefix: string,
  varPrefix?: string,
): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value.startsWith('$') || value.startsWith('@')) {
    const varName = `--see-${key}`;
    const rawValue = value.slice(1);
    cssVars[varName] = value.startsWith('@') ? `calc(var(--spacing) * ${rawValue})` : rawValue;

    return `${twPrefix}-(${varPrefix ? `${varPrefix}:` : ''}${varName})`;
  }

  if (value.startsWith('-')) {
    return `-${twPrefix}-${value.slice(1)}`;
  }

  return `${twPrefix}-${value}`;
}
