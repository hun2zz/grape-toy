const IP_WINDOW_MS = 60 * 1000; // 1 minute
const IP_MAX_REQUESTS = 5;
const PHONE_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

interface RateLimitEntry {
    timestamps: number[];
}

const ipStore = new Map<string, RateLimitEntry>();
const phoneStore = new Map<string, number>(); // phone -> last submit timestamp

// Clean up old entries periodically
function cleanup() {
    const now = Date.now();
    for (const [key, entry] of ipStore) {
        entry.timestamps = entry.timestamps.filter(t => now - t < IP_WINDOW_MS);
        if (entry.timestamps.length === 0) ipStore.delete(key);
    }
    for (const [key, ts] of phoneStore) {
        if (now - ts > PHONE_COOLDOWN_MS) phoneStore.delete(key);
    }
}

// Run cleanup every 5 minutes
if (typeof globalThis !== 'undefined') {
    const g = globalThis as unknown as { _rateLimitCleanup?: ReturnType<typeof setInterval> };
    if (!g._rateLimitCleanup) {
        g._rateLimitCleanup = setInterval(cleanup, 5 * 60 * 1000);
    }
}

export function getClientIp(request: Request): string {
    const headers = new Headers(request.headers);
    return (
        headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        headers.get('x-real-ip') ||
        'unknown'
    );
}

export function checkIpRateLimit(ip: string): { allowed: boolean; retryAfterMs?: number } {
    const now = Date.now();
    const entry = ipStore.get(ip) || { timestamps: [] };

    // Remove old timestamps
    entry.timestamps = entry.timestamps.filter(t => now - t < IP_WINDOW_MS);

    if (entry.timestamps.length >= IP_MAX_REQUESTS) {
        const oldest = entry.timestamps[0];
        const retryAfterMs = IP_WINDOW_MS - (now - oldest);
        return { allowed: false, retryAfterMs };
    }

    entry.timestamps.push(now);
    ipStore.set(ip, entry);
    return { allowed: true };
}

export function checkPhoneCooldown(phone: string): { allowed: boolean; retryAfterMs?: number } {
    const now = Date.now();
    const cleaned = phone.replace(/[-\s]/g, '');
    const lastSubmit = phoneStore.get(cleaned);

    if (lastSubmit && now - lastSubmit < PHONE_COOLDOWN_MS) {
        const retryAfterMs = PHONE_COOLDOWN_MS - (now - lastSubmit);
        return { allowed: false, retryAfterMs };
    }

    phoneStore.set(cleaned, now);
    return { allowed: true };
}
