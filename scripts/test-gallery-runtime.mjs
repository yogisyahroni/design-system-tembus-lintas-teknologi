import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const galleryPath = resolve(root, 'gallery/index.html');
const fallbackPath = resolve(root, 'gallery/icon-fallback.js');

const [gallery, fallback, packageJson, tokensJson] = await Promise.all([
  readFile(galleryPath, 'utf8'),
  readFile(fallbackPath, 'utf8'),
  readFile(resolve(root, 'package.json'), 'utf8').then(JSON.parse),
  readFile(resolve(root, 'tokens/tembus.tokens.json'), 'utf8').then(JSON.parse),
]);

function extractIconMap(source) {
  const match = source.match(/window\.TEMBUS_ICON_SVGS = ([\s\S]+);\s*$/);
  assert.ok(match, 'generated browser icon map is present');
  return JSON.parse(match[1]);
}

test('gallery uses the generated SVG fallback', async () => {
  const sourceIcons = (await readdir(resolve(root, 'assets/icons')))
    .filter(file => file.endsWith('.svg'))
    .map(file => basename(file, '.svg'))
    .sort();
  const generatedIcons = Object.keys(extractIconMap(fallback)).sort();

  assert.deepEqual(generatedIcons, sourceIcons);
  assert.match(gallery, /<script src="icon-fallback\.js"><\/script>/);
  assert.match(gallery, /const ICON_SVG_FALLBACK = window\.TEMBUS_ICON_SVGS \|\| \{\};/);
  assert.doesNotMatch(gallery, /const ICON_SVG_FALLBACK = \{[\s\S]*?\};/);
});

test('gallery inline JavaScript parses and exposes all interactive generators', () => {
  const inlineScripts = [...gallery.matchAll(/<script(?![^>]*\bsrc=)(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map(match => match[1]);
  assert.equal(inlineScripts.length, 1, 'gallery has one inline application script');
  assert.doesNotThrow(() => new Function(inlineScripts[0]), 'gallery JavaScript parses');

  assert.equal((gallery.match(/class="icon-card-main"/g) || []).length, 0, 'icon cards are generated as buttons');
  assert.match(gallery, /document\.createElement\('button'\)/);
  assert.match(gallery, /navigator\.clipboard\?\.writeText/);
  assert.equal((gallery.match(/navigator\.clipboard\.writeText/g) || []).length, 1);
  assert.match(gallery, /const SNIPPET_DATA = \{/);
  assert.equal((gallery.match(/onclick="selectSnippetComp\(/g) || []).length, 11);
  assert.match(gallery, /const TW_PRESET_CONTENT = `/);
  assert.match(gallery, /function downloadTailwindPreset\(\)/);
});

test('gallery controls expose keyboard and screen-reader state', () => {
  assert.match(gallery, /class="skip-link" href="#main-content"/);
  assert.match(gallery, /prefers-reduced-motion: reduce/);
  assert.match(gallery, /role="tablist"/);
  assert.ok((gallery.match(/role="tab"/g) || []).length >= 15);
  assert.match(gallery, /aria-controls="slide-1"/);
  assert.match(gallery, /aria-controls="icon-code-output"/);
  assert.match(gallery, /aria-controls="snippet-output"/);
  assert.match(gallery, /aria-controls="tw-code-output"/);
  assert.match(gallery, /ArrowRight.*ArrowDown/);
  assert.match(gallery, /setAttribute\('aria-pressed', 'true'\)/);
});

test('package and token sources use the same release version', () => {
  assert.equal(packageJson.version, tokensJson.version);
  assert.equal(packageJson.version, '0.2.1');
  assert.match(gallery, new RegExp(`v${packageJson.version}`));
});
