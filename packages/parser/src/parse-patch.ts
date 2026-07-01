import { DiffParseError } from '@ai-pr-reviewer/shared';
import type { ParsedFile, ParsedLine } from './types.js';

function parseHunkHeader(line: string): { newStart: number } | null {
  const match = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(line);
  if (!match?.[1]) return null;
  return { newStart: Number.parseInt(match[1], 10) };
}

function parsePatchLines(filename: string, patch: string): ParsedLine[] {
  const lines = patch.split('\n');
  const parsed: ParsedLine[] = [];
  let newLine = 0;
  let inHunk = false;

  for (const line of lines) {
    if (line.startsWith('@@')) {
      const header = parseHunkHeader(line);
      if (!header) {
        throw new DiffParseError(`Invalid hunk header in ${filename}`);
      }
      newLine = header.newStart;
      inHunk = true;
      continue;
    }

    if (!inHunk || line.startsWith('\\')) continue;

    if (line.startsWith('+')) {
      parsed.push({
        lineNumber: newLine,
        content: line.slice(1),
        type: 'addition',
      });
      newLine += 1;
      continue;
    }

    if (line.startsWith('-')) {
      parsed.push({
        lineNumber: newLine,
        content: line.slice(1),
        type: 'deletion',
      });
      continue;
    }

    if (line.startsWith(' ')) {
      parsed.push({
        lineNumber: newLine,
        content: line.slice(1),
        type: 'context',
      });
      newLine += 1;
    }
  }

  return parsed;
}

export function parseFilePatch(filename: string, patch: string | undefined): ParsedFile {
  if (!patch?.trim()) {
    return { filename, lines: [] };
  }

  try {
    return {
      filename,
      lines: parsePatchLines(filename, patch),
    };
  } catch (error) {
    if (error instanceof DiffParseError) throw error;
    throw new DiffParseError(`Failed to parse patch for ${filename}`, error);
  }
}

export function formatParsedFileForPrompt(file: ParsedFile): string {
  if (file.lines.length === 0) return `File: ${file.filename}\n(no patch)`;

  const body = file.lines
    .map((line) => {
      const marker =
        line.type === 'addition' ? 'A' : line.type === 'deletion' ? 'D' : 'C';
      return `${line.lineNumber}|${marker}|${line.content}`;
    })
    .join('\n');

  return `File: ${file.filename}\n${body}`;
}
