# 📝 Plop React Generator

A modular Plop.js code generator for creating React components, hooks, contexts, Redux slices, and more with TypeScript support.

## 🚀 Installation & Usage

### Method 1: Global Link (Recommended)

**Step 1: Link this package globally**
```bash
# In this directory (/Users/cybercat/work/react/plop-react-generator)
pnpm link --global
```

**Step 2: Link in your React project**
```bash
# In your React project (e.g., react-test)
cd /Users/cybercat/work/react/react-test
pnpm link --global @cybercat/plop-generators
```

**Step 3: Use the generator**
```bash
# Method A: Using cybercat-plop binary
cybercat-plop component MyButton

# Method B: Using npx plop (if plop is installed in your project)
npx plop component MyButton

# Method C: Add to package.json scripts
{
  "scripts": {
    "generate": "cybercat-plop",
    "g": "cybercat-plop"
  }
}
# Then: pnpm g component MyButton
```

### Method 2: Direct Install (Alternative)

```bash
# In your React project
cd /Users/cybercat/work/react/react-test
pnpm add -D file:../plop-react-generator

# Use it
npx plop component MyButton
```

### Method 3: Run Directly (No Install)

```bash
# From your React project
npx plop --plopfile ../plop-react-generator/plopfile.cjs component MyButton

# Or add to package.json:
{
  "scripts": {
    "plop": "plop --plopfile ../plop-react-generator/plopfile.cjs",
    "g": "plop --plopfile ../plop-react-generator/plopfile.cjs"
  }
}
```

## 🎯 Available Generators

### Core React
- `component` - React component with TypeScript, CSS modules, tests
- `layout` - Layout component
- `page` / `page2` - Page components
- `context` - Context (Basic or Advanced mode)
- `hook` - Custom React hook

### State Management
- `redux-basic` - Basic Redux slice
- `redux-async` - Async Redux slice with thunks
- `redux-entity` - Redux entity slice
- `redux-api` - Redux API slice
- `reducer-basic` - Basic reducer
- `lazy-redux-*` - Lazy-loaded Redux variants

### React Query
- `react-query-basic` - Basic query hook
- `react-query-mutation` - Mutation hook
- `react-query-infinite` - Infinite query hook
- `react-query-service` - API service with hooks

### Utilities
- `service` - API service
- `model` - Data model
- `constants` - Constants file
- `util` - Utility functions
- `error` - Error classes
- `story` - Storybook story

## 💡 Usage Examples

### Interactive Mode
```bash
cybercat-plop
# or
npx plop
```

### Create Component
```bash
cybercat-plop component Button
```

**Prompts:**
- Component name? `Button`
- Base HTML element? `button`
- Make component flexible (allow 'as' prop)? `Yes`
- Directory? `src/components` (or use fzf)

**Generates:**
```
src/components/Button/
├── Button.tsx
├── Button.types.ts
├── Button.test.tsx
├── Button.module.css
└── index.ts
```

Auto-updates `src/components/index.ts` with barrel exports!

### Create Hook
```bash
cybercat-plop hook useCounter
```

### Create Context
```bash
cybercat-plop context Auth
```

**Choose:** Basic (flat) or Advanced (folder structure with provider/hook)

### Create Redux Slice
```bash
cybercat-plop redux-async users
```

### Create React Query Hook
```bash
cybercat-plop react-query-basic useTodos
```

## 🔧 Features

- ✅ **TypeScript Support** - Full type safety
- ✅ **CSS Modules** - Scoped styles
- ✅ **Polymorphic Components** - Flexible `as` prop
- ✅ **Auto Barrel Exports** - Updates index.ts automatically
- ✅ **Test Files** - Co-located test scaffolding
- ✅ **Redux Toolkit** - Modern Redux patterns
- ✅ **React Query** - Query/mutation hooks
- ✅ **Interactive Picker** - fzf directory selection
- ✅ **Handlebars Helpers** - Powerful template logic

## 📂 Project Structure

```
plop-react-generator/
├── plopfile.cjs           # Main entry (~10 lines!)
├── plop-config/           # Modular configuration
│   ├── generators/        # All generator configs
│   │   ├── component.js.cjs
│   │   ├── context.js.cjs
│   │   ├── hooks.js.cjs
│   │   ├── reactQuery.js.cjs
│   │   ├── reducers.js.cjs
│   │   └── ...
│   ├── helpers/           # Handlebars helpers
│   │   ├── handlebars-helpers.js.cjs
│   │   └── plop-helpers.js.cjs
│   └── utils/             # Shared utilities
└── plop-templates/        # Handlebars templates
    ├── Component/
    ├── Context/
    ├── ReactQuery/
    ├── Redux*/
    └── ...
```

See [plop-config/README.md](plop-config/README.md) for architecture details.

## 🔄 Update Workflow

### With Global Link (Method 1)
- Edit templates or generators
- Changes reflect **immediately** in all linked projects! ✨
- No reinstall needed

### With Direct Install (Method 2)
```bash
# In your React project after making changes
pnpm install
```

### With pnpm Workspace
```bash
# At workspace root
pnpm install
```

## 🛠️ Customization

### Add New Generator

1. **Create generator file:**
```javascript
// plop-config/generators/my-generator.js.cjs
module.exports = {
  description: "Create something awesome",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What's the name?",
    }
  ],
  actions: [
    {
      type: "add",
      path: "{{dir}}/{{pascalCase name}}.tsx",
      templateFile: "plop-templates/MyTemplate.tsx.hbs",
    }
  ]
};
```

2. **Register in `plop-config/generators/index.js.cjs`:**
```javascript
const myGenerator = require('./my-generator.js.cjs');

function register(plop) {
  // ... existing generators
  plop.setGenerator("my-generator", myGenerator);
}
```

### Create Custom Template

Create `.hbs` file in `plop-templates/`:
```handlebars
import React from "react";

export const {{pascalCase name}} = () => {
  return <div>{{name}}</div>;
};
```

### Available Handlebars Helpers

- **Case transforms:** `{{pascalCase}}`, `{{camelCase}}`, `{{kebabCase}}`
- **Conditionals:** `{{eq a b}}`, `{{ne a b}}`, `{{or a b}}`, `{{and a b}}`
- **Utilities:** `{{includes str substr}}`, `{{ternary cond a b}}`, `{{default val fallback}}`
- **Arrays:** `{{reverse arr}}`

## 🧪 Testing

```bash
# Test in any React project
cd /path/to/react-project
cybercat-plop component TestComponent

# Verify generated files
ls -la src/components/TestComponent/
```

## 📝 Troubleshooting

### "has no binaries" warning
This is normal! The `cybercat-plop` binary is available after linking.

### Link not working?
```bash
# Unlink and relink
pnpm unlink --global
pnpm link --global

# Check if linked
pnpm list --global --depth 0 | grep plop
```

### Command not found?
Try using `npx plop` instead of `cybercat-plop`, or add script to package.json.

## 📖 Help

```bash
cybercat-plop help           # Show help
cybercat-plop                # Interactive mode with all generators
```

## 📄 License

Private - For personal use by @cybercat

---

**Made with ❤️ for rapid React development**
