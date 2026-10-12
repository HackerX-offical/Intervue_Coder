import { describe, expect, it } from 'vitest';
import { isLikelyVisionModel, normalizeOllamaUrls } from './OllamaHelper';

describe('normalizeOllamaUrls', () => {
  it('normalizes trailing slashes and /v1 suffix', () => {
    const { openAiBaseUrl, apiRoot } = normalizeOllamaUrls('http://localhost:11434/v1/');
    expect(apiRoot).toBe('http://localhost:11434');
    expect(openAiBaseUrl).toBe('http://localhost:11434/v1');
  });
});

describe('isLikelyVisionModel', () => {
  it('detects llava-style model names', () => {
    expect(isLikelyVisionModel('llava:7b')).toBe(true);
    expect(isLikelyVisionModel('codellama')).toBe(false);
  });
});
