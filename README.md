# 📝 Plop React Generator

A modular Plop.js code generator for creating React components, hooks, contexts, Redux slices, and more with TypeScript support. **26+ generators** for rapid React development.

## ⚡ Quick Start

```bash
# Link globally (recommended)
pnpm link --global

# In your React project
cd /path/to/your-project
pnpm link --global @cybercat/plop-generators

# Start generating
cybercat-plop component Button
# or interactive mode
cybercat-plop
```

## 🚀 Installation Methods

### Method 1: Global Link (Recommended)

**Best for**: Active development across multiple projects

```bash
# Step 1: Link this package globally
cd /Users/cybercat/work/react/plop-react-generator
pnpm link --global

# Step 2: Link in your React project
cd /path/to/your-react-project
pnpm link --global @cybercat/plop-generators

# Step 3: Use it
cybercat-plop component MyButton
# or add to package.json:
{
  "scripts": {
    "generate": "cybercat-plop",
    "g": "cybercat-plop"
  }
}
```

✅ **Benefits**: Changes reflect immediately, no reinstall needed

### Method 2: Direct Install

**Best for**: One-time use or specific project

```bash
cd /path/to/your-react-project
pnpm add -D file:../plop-react-generator

# Use it
npx plop component MyButton
```

### Method 3: Run Directly (No Install)

**Best for**: Quick testing

```bash
npx plop --plopfile ../plop-react-generator/plopfile.cjs component MyButton

# Or add to package.json:
{
  "scripts": {
    "plop": "plop --plopfile ../plop-react-generator/plopfile.cjs"
  }
}
```

## 🎯 Available Generators (26+)

### Core React (7)
- `component` - React component with TypeScript, CSS modules, tests, polymorphic support
- `layout` - Layout component
- `page` / `page2` - Page components (basic & advanced)
- `context` - Context API (flat or folder structure with reducer)
- `hook` - Custom React hooks (generic, async, or state-based)
- `service` - API service module

### Redux State Management (6)
- `redux-basic` - Basic Redux Toolkit slice
- `redux-async` - Async Redux slice with createAsyncThunk (CRUD)
- `redux-entity` - Normalized entity slice with createEntityAdapter
- `redux-api` - RTK Query API slice
- `reducer-basic` - Legacy reducer pattern
- `redux-slice` - Legacy Redux Toolkit slice

### Lazy Redux (7)
- `lazy-store-init` - Initialize lazy Redux infrastructure
- `lazy-redux-basic` - Lazy-loaded basic slice
- `lazy-redux-async` - Lazy-loaded async slice
- `lazy-redux-entity` - Lazy-loaded entity slice
- `lazy-redux-api` - Lazy-loaded RTK Query API
- `lazy-store` - Lazy store configuration
- `lazy-import` - Import existing reducer as lazy

### React Query (4)
- `react-query-basic` - Basic query hook (list/detail)
- `react-query-mutation` - Mutation hooks (create/update/delete) with optimistic updates
- `react-query-infinite` - Infinite query hook for pagination
- `react-query-service` - Complete API service with queries and mutations

### Utilities (4)
- `model` - TypeScript data model/interface
- `constants` - Constants file
- `util` - Utility functions
- `error` - Custom error classes

### Meta
- `story` - Storybook story
- `help` - Show all available generators

## 💡 Usage Examples

### Interactive Mode
```bash
cybercat-plop
# Shows all 26 generators with fuzzy search
```

### Create Component
```bash
cybercat-plop component Button
```

**Generates:**
```
src/components/Button/
├── Button.tsx              # Component implementation
├── Button.types.ts         # TypeScript props & types
├── Button.test.tsx         # React Testing Library tests
├── Button.module.css       # Scoped CSS modules
└── index.ts                # Barrel export
```

**Auto-updates** `src/components/index.ts` with imports/exports!

**Prompts:**
- Component name? → `Button`
- Base HTML element? → `button` (or `div`, `input`, `fragment`)
- Make flexible (allow 'as' prop)? → `Yes` (polymorphic component)
- Directory? → `src/components` (or fzf interactive picker)

### Create Context
```bash
cybercat-plop context Auth
```

**Choose:** 
- **Basic** - Flat file with Provider & useContext hook
- **Advanced** - Folder with reducer, types, provider, hook

### Create Redux Async Slice
```bash
cybercat-plop redux-async users
```

**Generates:**
- Slice with createAsyncThunk for CRUD operations
- Typed selectors with RootState
- Auto-injects into `src/store/index.ts`
- Supports both root (`src/state`) and feature stores (`src/features/X/state`)

### Create React Query Hook
```bash
cybercat-plop react-query-basic useTodos
```

**Generates:**
- Query key factory with hierarchical keys
- Typed hooks with proper options
- Error handling classes
- Query/mutation functions

### Create Hook
```bash
cybercat-plop hook useCounter
```

**Choose:** Generic, Async (useEffect), or State (useState) hook template

## 🔧 Features

- ✅ **TypeScript First** - Full type safety with strict typing
- ✅ **CSS Modules** - Scoped styles with className merging
- ✅ **Polymorphic Components** - Flexible `as` prop with type inference
- ✅ **Auto Barrel Exports** - Updates index.ts with injection points
- ✅ **Test Scaffolding** - React Testing Library templates
- ✅ **Redux Toolkit** - Modern Redux with slices, thunks, entity adapters
- ✅ **RTK Query** - Auto-generated API hooks with caching
- ✅ **React Query** - Query/mutation hooks with optimistic updates
- ✅ **Interactive Picker** - fzf directory selection (graceful fallback)
- ✅ **Smart Paths** - Root vs feature-scoped state detection
- ✅ **Code Splitting** - Lazy-loaded Redux slices
- ✅ **Handlebars Helpers** - 12+ custom template helpers
- ✅ **Modular Architecture** - Clean separation of concerns

## 📂 Project Structure

```
plop-react-generator/
├── plopfile.cjs                    # Entry point (10 lines, delegates to config)
├── plop-helpers.cjs                # Validation helpers (requireField)
├── plop-util.cjs                   # Directory scanning, fzf picker
├── bin/
│   └── cybercat-plop.js           # CLI binary
├── plop-config/                    # Modular configuration
│   ├── index.js.cjs               # Config entry, registers all generators
│   ├── generators/                # Generator definitions (one per file)
│   │   ├── component.js.cjs      # 26+ generator configs
│   │   ├── reducers.js.cjs
│   │   ├── reactQuery.js.cjs
│   │   └── ...
│   ├── helpers/                   # Handlebars + Plop helpers
│   │   ├── handlebars-helpers.js.cjs  # eq, ne, or, and, includes, etc.
│   │   └── plop-helpers.js.cjs        # requireField validator
│   └── utils/                     # Shared utilities
└── plop-templates/                # Handlebars templates
    ├── Component/                 # Component.tsx.hbs, types, tests, CSS
    ├── Context/                   # Basic & Advanced templates
    ├── ReactQuery/                # Query/mutation templates
    ├── ReduxBasic/                # Basic slice
    ├── ReduxAsync/                # Async slice with thunks
    ├── ReduxEntity/               # Entity adapter slice
    ├── ReduxApi/                  # RTK Query
    ├── ReduxLazy/                 # Lazy-loaded variants
    └── injectable-index.ts.hbs    # Barrel export with injection points
```

## 🛠️ Customization

### Add New Generator

**1. Create generator file:**
```javascript
// plop-config/generators/my-generator.js.cjs
const { requireField } = require("../../plop-helpers.cjs");

module.exports = {
  description: "Create something awesome",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What's the name?",
      validate: requireField("name")
    }
  ],
  actions: [
    {
      type: "add",
      path: "{{dir}}/{{pascalCase name}}.tsx",
      templateFile: "plop-templates/MyTemplate/Template.tsx.hbs",
      skipIfExists: true
    },
    {
      type: "append",
      path: "{{dir}}/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template: "import {{pascalCase name}} from './{{pascalCase name}}';\n"
    }
  ]
};
```

**2. Register in `plop-config/generators/index.js.cjs`:**
```javascript
const myGenerator = require('./my-generator.js.cjs');

function register(plop) {
  // ... existing generators
  plop.setGenerator("my-generator", myGenerator);
}
```

**3. Create template:**
```handlebars
{{!-- plop-templates/MyTemplate/Template.tsx.hbs --}}
import React from "react";

export const {{pascalCase name}} = () => {
  return <div>{{name}}</div>;
};
```

### Available Handlebars Helpers

**Case Transforms:**
- `{{pascalCase name}}` - PascalCase
- `{{camelCase name}}` - camelCase
- `{{kebabCase name}}` - kebab-case

**Conditionals:**
- `{{eq a b}}` - Equality (a === b)
- `{{ne a b}}` - Not equal (a !== b)
- `{{or a b}}` - Logical OR
- `{{and a b}}` - Logical AND

**Utilities:**
- `{{includes str substr}}` - String contains
- `{{ternary cond a b}}` - Ternary operator
- `{{default val fallback}}` - Default value
- `{{upper txt}}` / `{{lower txt}}` - Case conversion
- `{{reverse arr}}` - Reverse array

**Example:**
```handlebars
{{#if (eq element "fragment")}}
  <>{children}</>
{{else}}
  <{{element}} className={styles.root}>
    {{#if (or (eq element "div") (eq element "span"))}}
      {children}
    {{/if}}
  </{{element}}>
{{/if}}
```

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

## 🧪 Testing

```bash
# Test in any React project
cd /path/to/react-project
cybercat-plop component TestComponent

# Verify generated files
ls -la src/components/TestComponent/

# Check barrel exports updated
cat src/components/index.ts
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
Try using `npx plop` instead of `cybercat-plop`, or add script to package.json:
```json
{
  "scripts": {
    "generate": "cybercat-plop",
    "g": "cybercat-plop"
  }
}
```

### Generated code has wrong paths?
Generators auto-detect project structure. Ensure your project follows standard conventions:
- Components: `src/components/`
- State: `src/state/` or `src/features/X/state/`
- Store: `src/store/` or `src/features/X/store/`

## 📖 Documentation

- **[AGENTS.md](AGENTS.md)** - Comprehensive guide for coding agents (architecture, patterns, helpers)
- **[plop-config/README.md](plop-config/README.md)** - Architecture details
- **[QUICK-START.md](QUICK-START.md)** - Rapid onboarding guide
- **[INSTALL.md](INSTALL.md)** - Detailed installation instructions

## 📖 Help

```bash
cybercat-plop help           # Show all generators
cybercat-plop                # Interactive mode with fuzzy search
```

## 🎯 Common Workflows

### Component Development
```bash
# 1. Create component
cybercat-plop component Button

# 2. Add story (if using Storybook)
cybercat-plop story Button

# 3. Component auto-exported from src/components/index.ts
```

### Redux Feature
```bash
# 1. Create async slice with CRUD
cybercat-plop redux-async users

# 2. Auto-injected into src/store/index.ts
# 3. Selectors and thunks ready to use
```

### React Query API
```bash
# 1. Create complete API service
cybercat-plop react-query-service todos

# 2. Get hooks: useTodosQuery, useCreateTodoMutation, etc.
# 3. Query keys, error handling, optimistic updates included
```

### Feature-Scoped State
```bash
# 1. Create feature directory structure
mkdir -p src/features/dashboard/state

# 2. Generate Redux in feature
cybercat-plop redux-async analytics
# Choose directory: src/features/dashboard/state

# 3. Generator creates feature store at src/features/dashboard/store/
# 4. Import paths calculated automatically
```

## 📄 License

Private - For personal use by @cybercat

---

**Made with ❤️ for rapid React development**
