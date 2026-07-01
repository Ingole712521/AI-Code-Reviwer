export type ParsedLineType = 'context' | 'addition' | 'deletion';

export interface ParsedLine {
  readonly lineNumber: number;
  readonly content: string;
  readonly type: ParsedLineType;
}

export interface ParsedFile {
  readonly filename: string;
  readonly lines: readonly ParsedLine[];
}
