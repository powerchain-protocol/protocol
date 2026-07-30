
export function createCsrfToken() {
  return crypto.randomUUID().replaceAll("-", "");
}

export function verifyCsrfToken(expected: string | undefined, received: string | null) {
  if (!expected || !received || expected.length < 24) return false;
  if (expected.length !== received.length) return false;

  let mismatch = 0;
  for (let index = 0; index < expected.length; index += 1) {
    mismatch |= expected.charCodeAt(index) ^ received.charCodeAt(index);
  }
  return mismatch === 0;
}
