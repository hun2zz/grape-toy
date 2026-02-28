import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'admin_token';
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret(): string {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) throw new Error('ADMIN_PASSWORD is not set');
    return password;
}

export function createToken(): string {
    const secret = getSecret();
    const expires = Date.now() + TOKEN_EXPIRY_MS;
    const payload = String(expires);
    const signature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
    return `${payload}.${signature}`;
}

export function verifyToken(token: string): boolean {
    try {
        const secret = getSecret();
        const parts = token.split('.');
        if (parts.length !== 2) return false;
        const [payload, signature] = parts;
        if (!payload || !signature) return false;

        const expected = crypto
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');

        const sigBuf = Buffer.from(signature, 'hex');
        const expBuf = Buffer.from(expected, 'hex');
        if (sigBuf.length !== expBuf.length) return false;
        if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;

        const expires = parseInt(payload, 10);
        return Date.now() < expires;
    } catch {
        return false;
    }
}

export function verifyPassword(input: string): boolean {
    const password = getSecret();
    const inputBuf = Buffer.from(input);
    const passwordBuf = Buffer.from(password);
    if (inputBuf.length !== passwordBuf.length) return false;
    return crypto.timingSafeEqual(inputBuf, passwordBuf);
}

export async function setAuthCookie(): Promise<void> {
    const token = createToken();
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: TOKEN_EXPIRY_MS / 1000,
        path: '/',
    });
}

export async function clearAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyToken(token);
}

export async function requireAdmin(): Promise<Response | null> {
    if (!(await isAuthenticated())) {
        return Response.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }
    return null;
}
