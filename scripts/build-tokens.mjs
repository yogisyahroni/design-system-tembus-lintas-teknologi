// Generates every platform output from tokens/tembus.tokens.json.
// Usage: node scripts/build-tokens.mjs          (write files)
//        import { generate } from './build-tokens.mjs'   (used by validate)
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pascal = (n) => n.split('-').map((p) => (p === '2xl' ? 'Xxl' : p === '3xl' ? 'Xxxl' : p[0].toUpperCase() + p.slice(1))).join('');
const camel = (n) => { const c = n.replace(/-([a-z0-9])/g, (_, x) => x.toUpperCase()); return c; };
const hexInt = (h) => h.replace('#', '').toUpperCase();
const px = (v) => Number.parseFloat(v);
const ms = (v) => Number.parseInt(v, 10);
const header = (v, c) => `${c[0]} TEMBUS Design System ${v}\n${c[1]} GENERATED FILE. Do not edit by hand.\n${c[1]} Source: tokens/tembus.tokens.json. Run \`npm run build\` after changing tokens.\n${c[2]}`;

function css(d) {
  const g = d.global;
  const colorBlock = (theme) => Object.entries(d.themes[theme].color).map(([k, v]) => `  --token-color-${k}: ${v.toLowerCase()};`).join('\n');
  const group = (name, obj, prefix = name) => Object.entries(obj).map(([k, v]) => `  --token-${prefix}-${k}: ${v};`).join('\n');
  const typeLines = Object.keys(g.typography).map((k) => {
    const s = g.typographyStyles[k];
    return `  --token-type-${k}: ${g.typography[k]};\n  --token-type-${k}-line-height: ${s.lineHeight};\n  --token-type-${k}-weight: ${s.weight};`;
  }).join('\n');
  return `/* ${header(d.version, ['', ' *', ' */']).trimStart()}
:root,
[data-theme="light"] {
  color-scheme: light;

${colorBlock('light')}
}

[data-theme="dark"] {
  color-scheme: dark;

${colorBlock('dark')}
${Object.entries(d.themes.dark.elevation ?? {}).map(([k, v]) => `  --token-elevation-${k}: ${v};`).join('\n')}
}

:root {
${group('spacing', g.spacing)}
${group('radius', g.radius)}
${typeLines}
${group('font-family', g.fontFamily)}
${group('font-weight', g.fontWeight)}
${group('elevation', g.elevation)}
${group('motion', g.motion)}
${group('size', g.size)}
${group('content', g.content)}
${group('palette', g.palette)}${g.breakpoint ? `\n${group('breakpoint', g.breakpoint)}` : ''}${g.zIndex ? `\n${group('z-index', g.zIndex)}` : ''}
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: var(--token-font-family-sans);
}

button,
a,
input,
select,
textarea {
  font: inherit;
}

:where(button, a, input, select, textarea):focus-visible {
  outline: 3px solid var(--token-color-focus-ring);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: var(--token-motion-reduced) !important;
    animation-duration: var(--token-motion-reduced) !important;
    animation-iteration-count: 1 !important;
  }
}
`;
}

const tsKey = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));
function tsObj(o, ind = 2) {
  const pad = ' '.repeat(ind);
  return `{\n${Object.entries(o).map(([k, v]) => {
    const key = tsKey(camel(k));
    return `${pad}${key}: ${v && typeof v === 'object' ? tsObj(v, ind + 2) : JSON.stringify(v).replace(/"/g, "'").replace(/\\'/g, '"')},`;
  }).join('\n')}\n${' '.repeat(ind - 2)}}`;
}
function ts(d) {
  const themes = Object.fromEntries(Object.entries(d.themes).map(([t, v]) => [t, { color: v.color, ...(v.elevation ? { elevation: v.elevation } : {}) }]));
  return `/** ${header(d.version, ['', ' *', ' */']).trimStart()}
export const tembusThemes = ${tsObj(themes)} as const;

export const tembusGlobal = ${tsObj(d.global)} as const;

export type TembusThemeName = keyof typeof tembusThemes;
export type TembusColorToken = keyof typeof tembusThemes.light.color;

export const tembusTokens = { version: '${d.version}', themes: tembusThemes, global: tembusGlobal } as const;
`;
}

function kotlin(d) {
  const ov = d.platformMappings?.android?.nameOverrides ?? {};
  const name = (k) => ov[k] ?? pascal(k);
  const colors = (t, o) => `object ${o} {\n${Object.entries(d.themes[t].color).map(([k, v]) => `    val ${name(k)} = Color(0xFF${hexInt(v)})`).join('\n')}\n}`;
  const g = d.global;
  const dpObj = (o, n) => `object ${n} {\n${Object.entries(o).map(([k, v]) => `    val ${pascal(k)} = ${k === 'pill' ? '999' : px(v)}.dp`).join('\n')}\n}`;
  const intObj = (o, n) => `object ${n} {\n${Object.entries(o).map(([k, v]) => `    const val ${pascal(k)} = ${Number.parseInt(v, 10)}`).join('\n')}\n}`;
  const weight = { 400: 'Normal', 500: 'Medium', 600: 'SemiBold', 700: 'Bold' };
  const type = Object.entries(g.typographyStyles).map(([k, s]) => `    val ${pascal(k)} = TextStyle(fontSize = ${s.nativeSize}.sp, lineHeight = ${Math.round(s.nativeSize * s.lineHeight * 10) / 10}.sp, fontWeight = FontWeight.${weight[s.weight]})`).join('\n');
  const elev = Object.entries(g.elevation).filter(([k]) => k !== 'none').map(([k, v]) => `    val ${pascal(k)} = ${v.split(' ')[1].replace('px', '')}.dp`).join('\n');
  const motion = Object.entries(g.motion).filter(([k]) => k !== 'easing').map(([k, v]) => `    const val ${pascal(k)}Ms = ${ms(v)}`).join('\n');
  return `/* ${header(d.version, ['', ' *', ' */']).trimStart()}
package com.tembus.designsystem

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

${colors('light', 'TembusLightColors')}

${colors('dark', 'TembusDarkColors')}

${dpObj(g.spacing, 'TembusSpacing')}

${dpObj(g.radius, 'TembusRadius')}

${dpObj(g.size, 'TembusSize')}

object TembusTypography {
${type}
}

object TembusElevation {
${elev}
}

object TembusMotion {
${motion}
}
${g.breakpoint ? `\n${dpObj(g.breakpoint, 'TembusBreakpoint')}\n` : ''}${g.zIndex ? `\n${intObj(g.zIndex, 'TembusZIndex')}\n` : ''}
`;
}

function swift(d) {
  const g = d.global;
  const colors = Object.keys(d.themes.light.color).map((k) => `    public static let ${camel(k)} = Color(light: 0x${hexInt(d.themes.light.color[k])}, dark: 0x${hexInt(d.themes.dark.color[k])})`).join('\n');
  const cg = (o) => Object.entries(o).map(([k, v]) => `    public static let ${k === '2xl' ? 'xxl' : k === '3xl' ? 'xxxl' : camel(k)}: CGFloat = ${k === 'pill' ? 999 : px(v)}`).join('\n');
  const intEnum = (o) => Object.entries(o).map(([k, v]) => `    public static let ${camel(k)}: Int = ${Number.parseInt(v, 10)}`).join('\n');
  const weight = { 400: '.regular', 500: '.medium', 600: '.semibold', 700: '.bold' };
  const type = Object.entries(g.typographyStyles).map(([k, s]) => `    public static let ${camel(k)} = TembusTextStyle(size: ${s.nativeSize}, lineHeight: ${Math.round(s.nativeSize * s.lineHeight * 10) / 10}, weight: ${weight[s.weight]})`).join('\n');
  const motion = Object.entries(g.motion).filter(([k]) => k !== 'easing').map(([k, v]) => `    public static let ${camel(k)}: Double = ${ms(v) / 1000}`).join('\n');
  return `// ${header(d.version, ['', '//', '']).trimStart().replace(/\n$/, '')}
import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

public enum TembusColor {
${colors}
}

public enum TembusSpacing {
${cg(g.spacing)}
}

public enum TembusRadius {
${cg(g.radius)}
}

public enum TembusSize {
${cg(g.size)}
}

public enum TembusMotion {
${motion}
}
${g.breakpoint ? `\npublic enum TembusBreakpoint {\n${cg(g.breakpoint)}\n}\n` : ''}${g.zIndex ? `\npublic enum TembusZIndex {\n${intEnum(g.zIndex)}\n}\n` : ''}
public struct TembusTextStyle {
    public let size: CGFloat
    public let lineHeight: CGFloat
    public let weight: Font.Weight
}

public enum TembusTypography {
${type}
}

public extension View {
    /// Applies a TEMBUS text style (size, weight, and extra line spacing).
    func tembusText(_ style: TembusTextStyle) -> some View {
        self.font(.system(size: style.size, weight: style.weight))
            .lineSpacing(max(0, style.lineHeight - style.size))
    }
}

public extension Color {
    init(light: UInt32, dark: UInt32) {
        #if canImport(UIKit)
        self = Color(UIColor { $0.userInterfaceStyle == .dark ? UIColor(hex: dark) : UIColor(hex: light) })
        #else
        self = Color(hex: light)
        #endif
    }

    init(hex: UInt32) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: 1
        )
    }
}

#if canImport(UIKit)
private extension UIColor {
    convenience init(hex: UInt32) {
        self.init(
            red: CGFloat((hex >> 16) & 0xFF) / 255,
            green: CGFloat((hex >> 8) & 0xFF) / 255,
            blue: CGFloat(hex & 0xFF) / 255,
            alpha: 1
        )
    }
}
#endif
`;
}

function tailwind(d) {
  const g = d.global;
  const colorEntries = Object.keys(d.themes.light.color).map((k) => `        '${k}': 'var(--token-color-${k})',`).join('\n');
  const spacingEntries = Object.keys(g.spacing).map((k) => `        '${k}': 'var(--token-spacing-${k})',`).join('\n');
  const radiusEntries = Object.keys(g.radius).map((k) => `        '${k}': 'var(--token-radius-${k})',`).join('\n');
  const zIndexEntries = g.zIndex ? Object.keys(g.zIndex).map((k) => `        '${k}': 'var(--token-z-index-${k})',`).join('\n') : '';
  const screenEntries = g.breakpoint ? Object.entries(g.breakpoint).map(([k, v]) => `        '${k}': '${v}',`).join('\n') : '';

  return `/** ${header(d.version, ['', ' *', ' */']).trimStart()}
module.exports = {
  theme: {
    extend: {
      colors: {
${colorEntries}
      },
      spacing: {
${spacingEntries}
      },
      borderRadius: {
${radiusEntries}
      },
      zIndex: {
${zIndexEntries}
      },
      screens: {
${screenEntries}
      },
    },
  },
};
`;
}

export function generate(d) {
  return {
    'tokens/tembus.css': css(d),
    'tokens/tembus.ts': ts(d),
    'tokens/tembus.android.kt': kotlin(d),
    'tokens/tembus.swift': swift(d),
    'tokens/tembus.tailwind.cjs': tailwind(d),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const doc = JSON.parse(await readFile(resolve('tokens/tembus.tokens.json'), 'utf8'));
  for (const [path, content] of Object.entries(generate(doc))) {
    await writeFile(resolve(path), content);
    console.log(`wrote ${path}`);
  }
}
