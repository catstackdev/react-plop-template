# 🚀 Installation Guide

## Quick Setup (3 Steps)

### Step 1: Link This Package Globally

```bash
cd /Users/cybercat/work/react/plop-react-generator
pnpm link --global
```

**Expected output:**
```
+ @cybercat/plop-generators 1.0.0 <- ../../../../work/react/plop-react-generator
```

### Step 2: Link in Your React Projects

For **react-test**:
```bash
cd /Users/cybercat/work/react/react-test
pnpm link --global @cybercat/plop-generators
```

For **react-udemy**:
```bash
cd /Users/cybercat/work/react/react-udemy
pnpm link --global @cybercat/plop-generators
```

For **ultimate-react-course**:
```bash
cd /Users/cybercat/work/react/ultimate-react-course
pnpm link --global @cybercat/plop-generators
```

### Step 3: Add Scripts (Optional but Recommended)

In each React project's `package.json`, add:

```json
{
  "scripts": {
    "generate": "cybercat-plop",
    "g": "cybercat-plop"
  }
}
```

Or if you prefer using `plop` directly:
```json
{
  "scripts": {
    "generate": "plop --plopfile ./node_modules/@cybercat/plop-generators/plopfile.cjs",
    "g": "plop --plopfile ./node_modules/@cybercat/plop-generators/plopfile.cjs"
  },
  "devDependencies": {
    "plop": "^4.0.0"
  }
}
```

## Usage After Installation

```bash
# Method 1: Using the binary
cybercat-plop component MyButton

# Method 2: Using npm script (if added to package.json)
pnpm g component MyButton
pnpm generate hook useMyHook

# Method 3: Using npx (if plop is in your project)
npx plop component MyButton

# Interactive mode
cybercat-plop
# or
pnpm g
```

## Verify Installation

```bash
# Check if globally linked
pnpm list --global --depth 0 | grep plop

# Should show:
# @cybercat/plop-generators 1.0.0 <- ../../../../work/react/plop-react-generator

# In your React project, check if linked
cd /Users/cybercat/work/react/react-test
pnpm list --depth 0 | grep plop
```

## Uninstall/Reset

```bash
# In plop-react-generator
pnpm unlink --global

# In each React project
cd /Users/cybercat/work/react/react-test
pnpm unlink @cybercat/plop-generators

# Or remove from package.json if added as dependency
```

## Alternative: pnpm Workspace Setup

If you want all projects in a workspace:

**Create `pnpm-workspace.yaml` in `/Users/cybercat/work/react/`:**
```yaml
packages:
  - 'plop-react-generator'
  - 'react-test'
  - 'react-udemy'
  - 'ultimate-react-course'
```

**In each React project's `package.json`:**
```json
{
  "devDependencies": {
    "@cybercat/plop-generators": "workspace:*"
  }
}
```

**Install from workspace root:**
```bash
cd /Users/cybercat/work/react
pnpm install
```

## Troubleshooting

### Issue: "has no binaries" warning
**Solution:** This is expected. The `cybercat-plop` binary is still available after linking.

### Issue: "Command not found: cybercat-plop"
**Solution:** Use `npx plop` instead, or add plop as a devDependency in your React project.

### Issue: "Symlink path is the same as target"
**Solution:** You're already in a linked directory. Navigate to a different React project first.

### Issue: Changes not reflecting
**Solution:** With global link, changes are immediate. If using workspace, run `pnpm install` at root.

## Success Test

After installation, test it:

```bash
cd /Users/cybercat/work/react/react-test

# Create a test component
cybercat-plop component TestButton

# Check if files were created
ls -la src/components/TestButton/

# Should see:
# - TestButton.tsx
# - TestButton.types.ts
# - TestButton.test.tsx
# - TestButton.module.css
# - index.ts
```

**Congratulations! 🎉 You're ready to generate React code!**
