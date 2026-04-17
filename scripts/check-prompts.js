#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const promptsDir = path.join(process.cwd(), 'PROMPTS');
const files = fs.readdirSync(promptsDir).filter(f => f.endsWith('.md'));

const requiredPhrases = [
  'Mission',
  'Read first',
  'Output contract'
];

let failed = false;

for (const file of files) {
  const content = fs.readFileSync(path.join(promptsDir, file), 'utf8');
  for (const phrase of requiredPhrases) {
    if (!content.includes(phrase)) {
      console.error(`[FAIL] ${file} missing required section: ${phrase}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log('Prompt structure checks passed.');
