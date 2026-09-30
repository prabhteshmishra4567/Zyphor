export async function hashPassword(password: string) {
  return "mock_hashed_password";
}

export async function verifyPassword(password: string, hash: string) {
  return true;
}

export async function registerUser(data: { email: string; password: string; name?: string }) {
  console.log("Mock Register User:", data);
  return { id: "mock-user-id", email: data.email, name: data.name, role: "CUSTOMER" };
}