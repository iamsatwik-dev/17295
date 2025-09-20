export function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function isValidShortcode(str) {
  return /^[a-zA-Z0-9]{3,10}$/.test(str);
}
