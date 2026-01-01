#!/usr/bin/env node

/**
 * R2H.AI Setup Verification Script
 * Checks if all required environment variables and files are in place
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 R2H.AI Setup Verification\n');

let hasErrors = false;

// Check 1: Environment Variables
console.log('📋 Checking environment variables...');
const envPath = path.join(process.cwd(), '.env.local');

if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found');
    hasErrors = true;
} else {
    const envContent = fs.readFileSync(envPath, 'utf-8');

    const requiredVars = [
        { name: 'DATABASE_URL', pattern: /DATABASE_URL=["']postgresql:\/\/.+["']/ },
        { name: 'RESEND_API_KEY', pattern: /RESEND_API_KEY=["']re_.+["']/ },
        { name: 'JWT_SECRET', pattern: /JWT_SECRET=["'].+["']/ }
    ];

    requiredVars.forEach(({ name, pattern }) => {
        if (!pattern.test(envContent)) {
            console.error(`❌ ${name} is missing or not configured`);
            hasErrors = true;
        } else if (envContent.includes(`${name}="your-`) || envContent.includes(`${name}="postgresql://user:password`)) {
            console.warn(`⚠️  ${name} is using placeholder value - please update!`);
            hasErrors = true;
        } else {
            console.log(`✅ ${name} configured`);
        }
    });
}

// Check 2: Critical Files
console.log('\n📁 Checking critical files...');
const criticalFiles = [
    'app/auth/signup/page.tsx',
    'app/auth/verify/page.tsx',
    'app/auth/login/page.tsx',
    'app/auth/forgot-password/page.tsx',
    'app/api/auth/signup/route.ts',
    'app/api/auth/verify-otp/route.ts',
    'app/api/auth/resend-otp/route.ts',
    'lib/db.ts',
    'lib/otp-store.ts',
    'lib/email-template.ts'
];

criticalFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing: ${file}`);
        hasErrors = true;
    } else {
        console.log(`✅ ${file}`);
    }
});

// Check 3: Node Modules
console.log('\n📦 Checking dependencies...');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.error('❌ node_modules not found - run: npm install');
    hasErrors = true;
} else {
    console.log('✅ node_modules installed');
}

// Check 4: Package.json dependencies
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const requiredDeps = ['pg', 'bcryptjs', 'resend', 'jose'];

    requiredDeps.forEach(dep => {
        if (pkg.dependencies[dep]) {
            console.log(`✅ ${dep} in dependencies`);
        } else {
            console.error(`❌ Missing dependency: ${dep}`);
            hasErrors = true;
        }
    });
}

// Final Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
    console.log('❌ Setup incomplete - please fix the errors above');
    console.log('\nNext steps:');
    console.log('1. Configure DATABASE_URL in .env.local with your Neon connection string');
    console.log('2. Configure RESEND_API_KEY in .env.local with your Resend API key');
    console.log('3. Run: npm install (if needed)');
    console.log('4. Run: npm run dev');
    console.log('\nSee SETUP_GUIDE.md for detailed instructions.');
    process.exit(1);
} else {
    console.log('✅ All checks passed!');
    console.log('\nYou can now run:');
    console.log('  npm run dev');
    console.log('\nThen navigate to:');
    console.log('  http://localhost:3000');
    process.exit(0);
}
