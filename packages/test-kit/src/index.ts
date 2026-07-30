
export function createTestUser(overrides: Partial<{
  id: string;
  email: string;
  role: string;
  organizationId: string;
}> = {}) {
  return {
    id: "usr_test",
    email: "test@powerchain.example",
    role: "VIEWER",
    organizationId: "org_test",
    ...overrides
  };
}

export function expectDefined<T>(value: T | undefined | null): asserts value is T {
  if (value == null) throw new Error("Expected value to be defined.");
}
