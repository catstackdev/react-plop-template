# 🧪 Test Directory Generation

## How It Should Work

When you run `cybercat-plop component Button` from `/Users/cybercat/work/react/react-test`:

✅ **Files should be created in:** `/Users/cybercat/work/react/react-test/src/components/Button/`
❌ **NOT in:** `/Users/cybercat/work/react/plop-react-generator/src/components/Button/`

## The Fix Applied

The wrapper script now:
1. Saves your current directory (React project)
2. Changes to package directory (to find templates)
3. Tells Plop to generate files in your directory

## Testing Steps

### 1. Go to your React project
```bash
cd /Users/cybercat/work/react/react-test
```

### 2. Check current directory
```bash
pwd
# Should show: /Users/cybercat/work/react/react-test
```

### 3. Run generator
```bash
cybercat-plop component TestButton
```

### 4. Check where files were created
```bash
# Files should be here:
ls -la src/components/TestButton/

# NOT here:
ls -la /Users/cybercat/work/react/plop-react-generator/src/components/TestButton/
```

## Expected Output

When you run the generator, you should see prompts like:
```
? Component name? TestButton
? Base HTML element? div
? Make component flexible (allow 'as' prop)? No
? Directory (leave empty for default: src/components)? src/components
```

Then files created:
```
✔  ++ src/components/TestButton/TestButton.tsx
✔  ++ src/components/TestButton/TestButton.types.ts
✔  ++ src/components/TestButton/TestButton.test.tsx
✔  ++ src/components/TestButton/TestButton.module.css
✔  ++ src/components/TestButton/index.ts
✔  ++ src/components/index.ts
✔  _+ src/components/index.ts
✔  _+ src/components/index.ts
```

## Troubleshooting

### If files are created in wrong directory:

1. Check you're in the right directory:
   ```bash
   pwd
   ```

2. The global link picks up changes immediately, but verify:
   ```bash
   pnpm list --global | grep plop
   ```

3. Make sure you linked in your React project:
   ```bash
   cd /Users/cybercat/work/react/react-test
   pnpm link --global @cybercat/plop-generators
   ```

### Debug: See what directories are being used

Create a test script to debug:
```bash
cd /Users/cybercat/work/react/react-test
node -e "console.log('CWD:', process.cwd())"
```

Should show: `/Users/cybercat/work/react/react-test`

## After Testing

If it works correctly, delete the test component:
```bash
rm -rf src/components/TestButton
```
