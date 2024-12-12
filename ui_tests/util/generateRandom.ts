function generateRandomUsername(): string {
  const timestamp = Date.now();
  return `user${timestamp}`;
}

function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `user${timestamp}@example.com`;
}

function generateRandomPassword(): string {
  const timestamp = Date.now();
  return `password${timestamp}`;
}

export { generateRandomEmail, generateRandomPassword, generateRandomUsername };
