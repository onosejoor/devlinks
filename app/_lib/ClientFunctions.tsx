export function matchUrlPattern(url: string, pattern: string) {
  const escapedPattern = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

  const regexPattern = escapedPattern.replace(/:username/g, "[\\w-]+");

  const regex = new RegExp(`^${regexPattern}$`);

  return regex.test(url);
}

