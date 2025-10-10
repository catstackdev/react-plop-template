# Plop Configuration

This directory contains the modular plop configuration, organized for maintainability and clarity.

## 📂 Structure

```
plop-config/
├── index.js.cjs           # Main entry point
├── helpers/               # Handlebars and plop helpers
│   ├── index.js.cjs      # Register all helpers
│   ├── handlebars-helpers.js.cjs  # eq, ne, or, and, etc.
│   └── plop-helpers.js.cjs        # requireField, etc.
├── generators/            # All generator configurations
│   ├── index.js.cjs      # Register all generators
│   ├── component.js.cjs  # Component generator
│   ├── layout.js.cjs     # Layout generator
│   ├── page.js.cjs       # Page generators (page + page2)
│   ├── context.js.cjs    # Context generator (Basic + Advanced)
│   ├── hooks.js.cjs      # Hook generator
│   ├── services.js.cjs   # Service generator
│   ├── reducers.js.cjs   # Reducer + Redux slice generators
│   ├── models.js.cjs     # Model, constants, utils, errors
│   ├── storybook.js.cjs  # Storybook generator
│   └── help.js.cjs       # Help system + error redirects
└── utils/                 # Shared utilities
    └── index.js.cjs      # Directory picker, context utils
```

## 🎯 Benefits

### Before (Original plopfile.cjs)
- ❌ **~1100 lines** in one file
- ❌ Hard to navigate and maintain
- ❌ Difficult to collaborate on
- ❌ Mixed concerns (helpers, generators, utils)

### After (Modular Structure)
- ✅ **~10 lines** main file
- ✅ **Organized by concern** (helpers, generators, utils)
- ✅ **Easy to maintain** - each generator in its own file
- ✅ **Collaborative friendly** - work on specific generators
- ✅ **Testable modules** - each part can be tested independently
- ✅ **Clear separation** - helpers, generators, and utils are separate

## 🔧 How It Works

### Main Entry Point (`index.js.cjs`)
```javascript
const helpers = require('./helpers/index.js.cjs');
const generators = require('./generators/index.js.cjs');

function register(plop) {
  helpers.register(plop);
  generators.register(plop);
}
```

### Generator Module Example (`generators/component.js.cjs`)
```javascript
module.exports = {
  description: "Create a reusable React component (with TS)",
  prompts: [/* ... */],
  actions: [/* ... */],
};
```

### Helpers Module (`helpers/handlebars-helpers.js.cjs`)
```javascript
module.exports = {
  eq: (a, b) => a === b,
  ne: (a, b) => a !== b,
  // ... other helpers
};
```

## 📝 Adding New Generators

1. **Create generator file**: `generators/my-generator.js.cjs`
2. **Export configuration**: `module.exports = { description, prompts, actions }`
3. **Register in index**: Add to `generators/index.js.cjs`

## 🔍 Features Preserved

All original functionality is preserved:
- ✅ All 14+ generators work exactly the same
- ✅ Helper functions (eq, ne, or, and, reverse, etc.)
- ✅ Error handling and redirects (`plop a` → helpful message)
- ✅ Help system (`plop help`)
- ✅ Context generator with Basic/Advanced modes
- ✅ Directory picker with fzf integration
- ✅ Auto-indexing and barrel exports

## 🧪 Testing

The modular structure makes testing easier:
- Test individual generators in isolation
- Mock specific helpers or utilities
- Unit test helper functions separately
- Integration test the full pipeline

## 📚 Usage

The API remains exactly the same:
```bash
plop                    # Interactive menu
plop component         # Run component generator
plop context "Auth"    # Create Auth context
plop help             # Show help
plop a                # Show error message + suggestions
```