import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, basename, extname } from 'node:path';

const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const pascal = (s) => {
  const c = camel(s);
  return c.charAt(0).toUpperCase() + c.slice(1);
};

export async function generateIcons() {
  const iconsDir = resolve('assets/icons');
  const files = (await readdir(iconsDir)).filter((f) => extname(f) === '.svg').sort();

  const iconEntries = {};
  for (const file of files) {
    const key = basename(file, '.svg');
    const content = (await readFile(resolve(iconsDir, file), 'utf8'))
      .replace(/\r\n/g, '\n')
      .trim();
    iconEntries[key] = content;
  }

  const tsContent = `/** TEMBUS Design System Icons
 * GENERATED FILE. Do not edit by hand.
 * Source: assets/icons/*.svg. Run \`npm run build\` after changing icons.
 */

export const tembusIcons = ${JSON.stringify(iconEntries, null, 2)} as const;

export type TembusIconName = keyof typeof tembusIcons;

export function getTembusIcon(name: TembusIconName): string {
  return tembusIcons[name] ?? '';
}
`;

  await writeFile(resolve('tokens/tembus.icons.ts'), tsContent, 'utf8');
  const browserContent = [
    '/** TEMBUS Design System Icons',
    ' * GENERATED FILE. Do not edit by hand.',
    ' * Source: assets/icons/*.svg. Run `npm run build` after changing icons.',
    ' */',
    '',
    `window.TEMBUS_ICON_SVGS = ${JSON.stringify(iconEntries, null, 2)};`,
    '',
  ].join('\n');
  await writeFile(resolve('gallery/icon-fallback.js'), browserContent, 'utf8');
  console.log(`wrote tokens/tembus.icons.ts (${files.length} icons)`);
  console.log(`wrote gallery/icon-fallback.js (${files.length} icons)`);
  return iconEntries;
}

if (process.argv[1] && process.argv[1].endsWith('build-icons.mjs')) {
  await generateIcons();
}
