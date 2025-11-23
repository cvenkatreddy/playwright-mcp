#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Running Next.js Footer Test Suite...\n');

const testFiles = [
  'tests/nextjs-footer.spec.ts',
  'tests/footer-links-validation.spec.ts', 
  'tests/footer-comprehensive.spec.ts'
];

const runTest = (testFile, description) => {
  console.log(`\n📋 ${description}`);
  console.log('=' .repeat(50));
  
  try {
    execSync(`npx playwright test ${testFile} --reporter=line`, { 
      stdio: 'inherit',
      cwd: __dirname 
    });
    console.log(`✅ ${description} - PASSED\n`);
  } catch (error) {
    console.log(`❌ ${description} - FAILED\n`);
    return false;
  }
  return true;
};

// Run all tests
const results = [
  runTest(testFiles[0], 'Basic Footer Structure Tests'),
  runTest(testFiles[1], 'Link Validation Tests'),
  runTest(testFiles[2], 'Comprehensive Footer Tests')
];

// Summary
console.log('\n📊 TEST SUMMARY');
console.log('=' .repeat(50));
const passed = results.filter(r => r).length;
const total = results.length;

if (passed === total) {
  console.log(`🎉 All tests passed! (${passed}/${total})`);
  process.exit(0);
} else {
  console.log(`⚠️  Some tests failed. (${passed}/${total} passed)`);
  process.exit(1);
}
