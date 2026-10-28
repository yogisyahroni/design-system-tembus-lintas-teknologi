import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { generate } from './build-tokens.mjs';

const read = (p) => readFile(resolve(p), 'utf8');
const document = JSON.parse(await read('tokens/tembus.tokens.json'));
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
  }
  for (const [name, value] of Object.entries(colors)) {
    if (!hexPattern.test(value)) errors.push(`${themeName}.color.${name} must be a six-digit hex color`);
  }
}

// Light and dark must define exactly the same token names.
if (light && dark) {
  for (const name of Object.keys(light)) if (!(name in dark)) errors.push(`dark.color.${name} is missing (defined in light)`);
  for (const name of Object.keys(dark)) if (!(name in light)) errors.push(`light.color.${name} is missing (defined in dark)`);
}

for (const [group, values] of Object.entries(document.global ?? {})) {
  if (!values || typeof values !== 'object' || Array.isArray(values)) errors.push(`global.${group} must be an object`);
}

// Every typography size needs a style (line height, weight, native size).
for (const name of Object.keys(document.global?.typography ?? {})) {
  const s = document.global.typographyStyles?.[name];
  if (!s || !s.lineHeight || !s.weight || !s.nativeSize) errors.push(`global.typographyStyles.${name} needs lineHeight, weight, and nativeSize`);
}

function channel(hex, offset) {
  const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}
const luminance = (hex) => 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const pairs = document.wcagProtectedPairs ?? [];
for (const pair of pairs) {
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

// Every on-* token must be protected against the surface it sits on.
// A new color used for text or chart series must have a protected pair.
const protectedKeys = new Set(pairs.map((p) => `${p.foreground}|${p.background}`));
for (const name of Object.keys(light ?? {})) {
  if (name.startsWith('on-') && `${name.slice(3)}` in light && !protectedKeys.has(`${name}|${name.slice(3)}`)) {
    errors.push(`${name} has no protected pair against ${name.slice(3)}`);
  }
  if (name.startsWith('dataviz-') && !protectedKeys.has(`${name}|surface`)) errors.push(`${name} has no protected pair against surface`);
}

// Templates may only use registered values.
const registered = new Set([
  ...Object.values(light ?? {}), ...Object.values(dark ?? {}), ...Object.values(document.global?.palette ?? {}),
].map((v) => v.toUpperCase()));
for (const file of ['templates/presentation-theme.json', 'templates/report-style.json']) {
  const template = JSON.parse(await read(file));
  const walk = (node, path) => {
    if (typeof node === 'string' && hexPattern.test(node) && !registered.has(node.toUpperCase())) errors.push(`${file} ${path} uses unregistered color ${node}`);
    else if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
  };
  walk(template.colors ?? {}, 'colors');
  if (template.version !== document.version) errors.push(`${file} version ${template.version} does not match tokens ${document.version}`);
}

// Generated platform files must match the token file.
for (const [path, expected] of Object.entries(generate(document))) {
  let actual = '';
  try { actual = await read(path); } catch { /* missing */ }
  if (actual !== expected) errors.push(`${path} is out of date; run \`npm run build\``);
}

if (errors.length) {
  console.error(`Token validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Token validation passed: ${document.product} ${document.version}, ${pairs.length} WCAG protected pair(s), platform outputs in sync.`);
