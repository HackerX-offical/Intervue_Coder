import { describe, expect, it } from 'vitest';
import { commandKeyForPlatform } from './commandKey';

describe('commandKeyForPlatform', () => {
  it('uses Command symbol on macOS', () => {
    expect(commandKeyForPlatform('darwin')).toBe('⌘');
    expect(commandKeyForPlatform('win32')).toBe('Ctrl');
  });
});
