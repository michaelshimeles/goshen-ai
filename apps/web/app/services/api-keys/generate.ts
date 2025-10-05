import { randomBytes, createHash } from "crypto";

export function generateRawKey() {
    const raw = `sk_${randomBytes(24).toString("hex")}`; // e.g. sk_5c7f... (48 chars)
    const last4 = raw.slice(-4);
    const keyHash = createHash("sha256").update(raw).digest("hex");
    return { raw, last4, keyHash };
}
