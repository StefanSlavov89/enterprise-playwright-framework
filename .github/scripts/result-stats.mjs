// Prints failed/flaky counts from the Playwright JSON report in GitHub Actions output format.
// If the report is missing (the run crashed before the reporter wrote it), counts are unknown.
import fs from 'node:fs';

const file = process.env.PLAYWRIGHT_JSON_OUTPUT_NAME || 'test-results/results.json';
let unexpected = 'unknown';
let flaky = 'unknown';

if (fs.existsSync(file)) {
  const { stats } = JSON.parse(fs.readFileSync(file, 'utf8'));
  unexpected = String(stats.unexpected);
  flaky = String(stats.flaky);
}

console.log(`unexpected=${unexpected}`);
console.log(`flaky=${flaky}`);
