// Standalone CLI Generator for TEMBUS Corporate Presentation 16:9
// Usage: node scripts/generate-deck.mjs [--title "Judul"] [--date "Oktober 2026"]
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const theme = JSON.parse(await readFile(resolve('templates/presentation-theme.json'), 'utf8'));

// Parse CLI args
const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index !== -1 && args[index + 1] ? args[index + 1] : fallback;
};

const title = getArg('title', 'Tinjauan Kinerja Operasional & Ekspansi Q3');
const subtitle = getArg('subtitle', 'Strategi optimasi rute kurir, peningkatan SLA on-time delivery, dan efisiensi logistik.');
const date = getArg('date', 'Oktober 2026');
const author = getArg('author', 'Divisi Operasional & Produk — PT Tembus Lintas Teknologi');

const htmlOutput = `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — TEMBUS Presentation Deck</title>
<link rel="stylesheet" href="../tokens/tembus.css">
<style>
@page {
  size: 13.333in 7.5in;
  margin: 0;
}
body {
  margin: 0;
  background-color: #14211A;
  font-family: ${theme.fonts.body}, ${theme.fonts.fallback.join(', ')};
  color: #14211A;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  gap: 40px;
}
.slide {
  width: 100%;
  max-width: 1140px;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5.5% 7.5%;
  box-sizing: border-box;
  page-break-after: always;
  position: relative;
}
.slide-cover {
  background-color: ${theme.colors.forest950};
  color: #FFFFFF;
}
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 10px;
  background-color: ${theme.colors.orangeBright};
}
.slide-light {
  background-color: ${theme.colors.paper};
  color: ${theme.colors.ink};
}
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: auto 0;
}
.kpi-box {
  background: #FFFFFF;
  border: 1px solid ${theme.colors.line};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.kpi-box.action {
  border: 2px solid ${theme.colors.orange};
  background: #FFF8F2;
}
.kpi-val {
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.1;
  color: ${theme.colors.emerald};
}
.kpi-box.action .kpi-val {
  color: ${theme.colors.orange};
}
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${theme.colors.orangeBright};
  color: #241000;
}
</style>
</head>
<body>

<!-- Slide 1: Cover -->
<section class="slide slide-cover">
  <div class="accent-bar"></div>
  <div style="display:flex; justify-content:space-between; align-items:center;">
    <img src="../assets/brand/tembus-logo-white-wordmark.webp" alt="TEMBUS" height="42">
    <span class="badge">LAPORAN EKSEKUTIF</span>
  </div>
  <div>
    <h1 style="font-size: 3rem; font-weight: 700; margin: 0 0 16px; letter-spacing: -0.025em; line-height: 1.15;">
      ${title}
    </h1>
    <p style="font-size: 1.35rem; color: #D0DBD3; margin: 0; max-width: 800px; line-height: 1.5;">
      ${subtitle}
    </p>
  </div>
  <div style="display:flex; justify-content:space-between; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 16px; font-size: 0.875rem; color: #AAB5AE;">
    <span>${author}</span>
    <span>${date} &bull; Rahasia / Terbatas</span>
  </div>
</section>

<!-- Slide 2: KPI & Decision -->
<section class="slide slide-light">
  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid ${theme.colors.emerald}; padding-bottom: 12px;">
    <div>
      <span style="font-size: 0.8125rem; font-weight: 700; color: ${theme.colors.emerald}; text-transform: uppercase;">RINGKASAN EKSEKUTIF</span>
      <h2 style="font-size: 1.85rem; margin: 4px 0 0;">Indikator Utama Kinerja Pengiriman</h2>
    </div>
    <span style="font-size: 0.875rem; color: ${theme.colors.muted};">Slide 02 / 03</span>
  </div>

  <div class="kpi-grid">
    <div class="kpi-box">
      <div>
        <div style="font-size: 0.8125rem; color: ${theme.colors.muted}; font-weight: 600;">WAKTU TEMPUH RATA-RATA</div>
        <div class="kpi-val">34.8 Min</div>
        <p style="font-size: 0.875rem; color: ${theme.colors.success}; font-weight: 600; margin: 4px 0 0;">&darr; 14.2% lebih cepat</p>
      </div>
      <div style="font-size: 0.75rem; color: ${theme.colors.muted}; margin-top: 12px;">Radius 15km dalam kota</div>
    </div>

    <div class="kpi-box">
      <div>
        <div style="font-size: 0.8125rem; color: ${theme.colors.muted}; font-weight: 600;">SLA TEPAT WAKTU (ON-TIME)</div>
        <div class="kpi-val">99.82%</div>
        <p style="font-size: 0.875rem; color: ${theme.colors.success}; font-weight: 600; margin: 4px 0 0;">Melampaui target 99.50%</p>
      </div>
      <div style="font-size: 0.75rem; color: ${theme.colors.muted}; margin-top: 12px;">Total 1.428.000 paket sukses</div>
    </div>

    <div class="kpi-box action">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size: 0.8125rem; color: ${theme.colors.orange}; font-weight: 700;">KEPUTUSAN EKSEKUTIF</span>
          <span style="background:${theme.colors.orange}; color:#FFFFFF; font-size: 0.625rem; font-weight:bold; padding:2px 6px; border-radius:4px;">AKSI</span>
        </div>
        <div class="kpi-val">+42.6%</div>
        <p style="font-size: 0.875rem; color: ${theme.colors.orange}; font-weight: 600; margin: 4px 0 0;">Lonjakan Koridor Barat</p>
      </div>
      <div style="font-size: 0.75rem; color: #14211A; font-weight: 600; margin-top: 12px; border-top: 1px solid rgba(194,65,12,0.2); padding-top: 6px;">
        Keputusan: Penambahan 120 armada kurir baru
      </div>
    </div>
  </div>

  <div style="display:flex; justify-content:space-between; font-size: 0.75rem; color: ${theme.colors.muted}; border-top: 1px solid ${theme.colors.line}; padding-top: 8px;">
    <span>Sumber: TEMBUS Analytics Data Platform &bull; Validasi Audit</span>
    <span>TEMBUS Design System ${theme.version}</span>
  </div>
</section>

</body>
</html>
`;

const outputPath = resolve('templates/sample-deck.html');
await writeFile(outputPath, htmlOutput, 'utf8');
console.log(`Generated presentation deck: ${outputPath}`);
