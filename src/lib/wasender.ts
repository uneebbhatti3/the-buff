/**
 * Normalises a Pakistani phone number to the format Wasender expects:
 * country code + number, no leading +, spaces, or dashes.
 *
 * Examples:
 *   03214012924   → 923214012924
 *   +923214012924 → 923214012924
 *   923214012924  → 923214012924
 */
export function normalisePakistaniPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");

  if (digits.startsWith("92")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return "92" + digits.slice(1);
  }

  return digits;
}

/**
 * Sends a WhatsApp message via WasenderAPI.
 * Throws if the request fails so the caller can decide whether to surface the error.
 */
export async function sendWhatsAppMessage(
  to: string,
  text: string,
): Promise<void> {
  const apiKey = process.env.WA_SENDER_API_KEY;
  const url = process.env.WA_SENDER_URL;

  if (!apiKey || !url) {
    throw new Error("Wasender is not configured (missing env vars).");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, text }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Wasender responded with ${response.status}: ${body}`,
    );
  }
}
