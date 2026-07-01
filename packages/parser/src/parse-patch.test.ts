import { describe, expect, it } from 'vitest';
import { DiffParseError } from '@ai-pr-reviewer/shared';
import { formatParsedFileForPrompt, parseFilePatch } from './parse-patch.js';

const samplePatch = `@@ -48,4 +48,4 @@
 const id = req.params.id;
 const user = await getUser(id);
-return user.email;
+return user.profile.email;
 const next = true;`;

describe('parseFilePatch', () => {
  it('parses addition and context lines with line numbers', () => {
    const result = parseFilePatch('src/auth.ts', samplePatch);

    expect(result.filename).toBe('src/auth.ts');
    expect(result.lines.length).toBeGreaterThan(0);
    expect(result.lines.some((line) => line.type === 'addition')).toBe(true);
  });

  it('returns empty lines when patch is missing', () => {
    const result = parseFilePatch('src/empty.ts', undefined);
    expect(result.lines).toEqual([]);
  });

  it('throws DiffParseError for invalid hunk header', () => {
    expect(() => parseFilePatch('bad.ts', '@@ invalid @@\n+code')).toThrow(DiffParseError);
  });
});

describe('formatParsedFileForPrompt', () => {
  it('formats parsed lines for the AI prompt', () => {
    const parsed = parseFilePatch('src/auth.ts', samplePatch);
    const formatted = formatParsedFileForPrompt(parsed);

    expect(formatted).toContain('File: src/auth.ts');
    expect(formatted).toContain('|A|');
  });
});
