import crypto from 'node:crypto';

export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | undefined,
  secret: string,
): boolean {
  if (!signatureHeader?.startsWith('sha256=')) {
    return false;
  }

  const expected = signatureHeader.slice('sha256='.length);
  const digest = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

  if (expected.length !== digest.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(digest));
}
