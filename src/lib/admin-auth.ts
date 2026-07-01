import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "the_buff_admin_session";

const TOKEN_SEPARATOR = "::";

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET");
  }

  return secret;
}

export function createAdminSessionToken(email: string) {
  const secret = getSecret();

  const signature = crypto
    .createHmac("sha256", secret)
    .update(email)
    .digest("hex");

  return `${email}${TOKEN_SEPARATOR}${signature}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token) return false;

  const [email, signature] = token.split(TOKEN_SEPARATOR);

  if (!email || !signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", getSecret())
    .update(email)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    );
  } catch {
    return false;
  }
}
