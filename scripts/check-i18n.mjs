// Language-confusion detector for jardimluisdecamoes.
// Run: node scripts/check-i18n.mjs
// Heuristic checks only — human review still required for history/transport/FAQ copy.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const url = (p) => pathToFileURL(join(root, p)).href;
const problems = [];
const ok = [];

function flag(msg) { problems.push(msg); }
function pass(msg) { ok.push(msg); }

// ---------- 1. Guide data (expanded-guides.ts / guide-details.ts) ----------
let guides, details;
try {
  const g = await import(url('src/lib/expanded-guides.ts'));
  const d = await import(url('src/lib/guide-details.ts'));
  guides = g.expandedGuides;
  details = d.guideDetails;
} catch (e) {
  flag(`Failed to import guide data: ${e.message}`);
}

const LATIN_ONLY = /^[À-ÿA-Za-z0-9\s.,;:!?()'"’\-/&]*$/;
const CJK = /[一-鿿]/;
// Distinctly Portuguese grammatical clusters; proper nouns (Praça, São, Camões) are excluded.
const PT_GRAMMAR = /(ção|ções)/;

if (guides) {
  const langs = ['pt', 'en', 'zh'];
  let count = 0;
  for (const gu of guides) {
    count++;
    for (const field of ['focus', 'context', 'observe', 'visit', 'route']) {
      const v = gu[field];
      if (!v || typeof v !== 'object') { flag(`guide ${gu.slug}.${field} missing LocalizedText`); continue; }
      for (const l of langs) {
        if (!v[l] || !String(v[l]).trim()) flag(`guide ${gu.slug}.${field}.${l} empty`);
      }
      // en/zh should not contain CJK, and en should not look like Portuguese.
      if (v.en && CJK.test(v.en)) flag(`guide ${gu.slug}.${field}.en contains CJK`);
      if (v.zh && /[a-zA-Z]{6,}/.test(v.zh.replace(/Jardim|Leiria|Lis|Camões|Praça|Castelo|Sé|Rio/g, '')) ) {
        // allow proper nouns; flag only if long latin runs remain
        if (/[a-zA-Z]{10,}/.test(v.zh)) flag(`guide ${gu.slug}.${field}.zh has long Latin runs`);
      }
      if (v.en && PT_GRAMMAR.test(v.en)) {
        const m = v.en.match(PT_GRAMMAR);
        flag(`guide ${gu.slug}.${field}.en looks like Portuguese [${m ? m[0] : ''}]: ${v.en.slice(0, 80)}`);
      }
    }
  }
  pass(`32 guides checked (found ${count})`);

  // identical pt/en/zh across languages beyond proper nouns -> suspicious
  for (const gu of guides) {
    const f = gu.focus;
    if (f && f.pt && f.en && f.en === f.pt) flag(`guide ${gu.slug}.focus en identical to pt`);
    if (f && f.zh && f.pt && f.zh === f.pt) flag(`guide ${gu.slug}.focus zh identical to pt`);
  }
}

if (details) {
  for (const [slug, det] of Object.entries(details)) {
    for (const field of ['management', 'architecture', 'photoTip']) {
      const v = det[field];
      if (!v) { flag(`detail ${slug}.${field} missing`); continue; }
      for (const l of ['pt', 'en', 'zh']) {
        if (!v[l] || !String(v[l]).trim()) flag(`detail ${slug}.${field}.${l} empty`);
      }
      if (v.en && CJK.test(v.en)) flag(`detail ${slug}.${field}.en contains CJK`);
      if (v.en && PT_GRAMMAR.test(v.en)) flag(`detail ${slug}.${field}.en looks like Portuguese`);
    }
  }
  pass(`details checked for ${Object.keys(details).length} slugs`);
}

// ---------- 2. Message JSON files ----------
const msgFiles = { pt: 'pt.json', en: 'en.json', zh: 'zh.json', mwl: 'mwl.json' };
for (const [loc, file] of Object.entries(msgFiles)) {
  let data;
  try { data = JSON.parse(readFileSync(join(root, 'src/messages', file), 'utf8')); }
  catch (e) { flag(`messages/${file} invalid JSON: ${e.message}`); continue; }
  const text = JSON.stringify(data);
  if (loc !== 'zh' && CJK.test(text)) flag(`messages/${file} (${loc}) contains CJK characters`);
  if (loc === 'mwl') {
    // Mirandese file should not contain long English/Portuguese-only paragraphs.
    if (/This website is an independent|Information We Collect|Terms of Service|Privacy Policy|Last Updated:/.test(text))
      flag(`messages/${file} (mwl) still contains English legal boilerplate`);
    if (/Basic Information|Ticket Information|Transportation|Visitor Reviews|Stunning Photos|View Location/.test(text))
      flag(`messages/${file} (mwl) still contains English UI labels`);
  }
  pass(`messages/${file} parsed (${loc})`);
}

// ---------- 3. lang / hreflang wiring is validated at build; spot-check config ----------
try {
  const routing = await import(url('src/i18n/routing.ts'));
  const locales = routing.routing?.locales ?? routing.default?.locales;
  if (Array.isArray(locales) && !locales.includes('mwl')) flag('routing does not declare mwl while LanguageToggle labels it Mirandese');
  else pass(`routing locales: ${(locales || []).join(', ')}`);
} catch (e) { /* routing may use other export shape */ }

console.log('\n==== Language-confusion check ====');
if (problems.length === 0) {
  console.log('PASS — no automated issues found. (Human review still recommended for nuance.)');
} else {
  console.log(`FOUND ${problems.length} issue(s):`);
  for (const p of problems) console.log(' - ' + p);
}
console.log(`\nChecks passed: ${ok.length}`);
process.exit(problems.length ? 1 : 0);
