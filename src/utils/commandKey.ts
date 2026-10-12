export function commandKeyForPlatform(platform: string): string {
  return platform === 'darwin' ? '⌘' : 'Ctrl';
}
