import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const tokenPath = resolve('tokens/tembus.tokens.json');
const document = JSON.parse(await readFile(tokenPath, 'utf8'));
const errors = [];

const requiredColors = [
  'background', 'surface', 'surface-raised', 'surface-subtle', 'foreground', 'foreground-secondary',
  'foreground-muted', 'border', 'border-strong', 'input-background', 'input-border', 'focus-ring',
  'primary', 'on-primary', 'accent', 'on-accent', 'success', 'on-success', 'warning', 'on-warning',
  'error', 'on-error', 'info', 'on-info',
];

const hexPattern = /^#[0-9A-Fa-f]{6}$/;
const light = document.themes?.light?.color;
const dark = document.themes?.dark?.color;

if (!light || !dark) errors.push('themes.light.color and themes.dark.color are required');
for (const [themeName, colors] of Object.entries({ light, dark })) {
  if (!colors) continue;
  for (const name of requiredColors) {
    if (!colors[name]) errors.push(`${themeName}.color.${name} is missing`);
    else if (!hexPattern.test(colors[name])) errors.push(`${themeName}.color.${name} must be a six-digit hex color`);
  }
}

for (const [group, values] of Object.entries(document.global ?? {})) {
  if (!values || typeof values !== 'object' || Array.isArray(values)) errors.push(`global.${group} must be an object`);
}

function channel(hex, offset) {
  const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  return 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
}

function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

for (const pair of document.wcagProtectedPairs ?? []) {
  for (const themeName of ['light', 'dark']) {
    const colors = document.themes?.[themeName]?.color;
    const foreground = colors?.[pair.foreground];
    const background = colors?.[pair.background];
    if (!foreground || !background) {
      errors.push(`WCAG pair ${pair.foreground}/${pair.background} is missing in ${themeName}`);
      continue;
    }
    const ratio = contrast(foreground, background);
    if (ratio + 0.001 < pair.minimum) {
      errors.push(`WCAG ${themeName} ${pair.foreground}/${pair.background} is ${ratio.toFixed(2)}:1; minimum is ${pair.minimum}:1`);
    }
  }
}

if (errors.length) {
  console.error(`Token validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const protectedPairs = document.wcagProtectedPairs?.length ?? 0;
console.log(`Token validation passed: ${document.product} ${document.version}, ${protectedPairs} WCAG protected pair(s).`);
