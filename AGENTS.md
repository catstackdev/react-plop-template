# Agent Guidelines for Plop React Generator

## Build/Lint/Test Commands
- **No build/lint/test** - This is a code generator package using Plop.js
- **Run generator**: `plop <generator-name>` (e.g., `plop component`, `plop context`)
- **Interactive mode**: `plop` (shows all available generators)
- **Test templates**: Generate code and verify output in target project

## Code Style Guidelines

### JavaScript/CommonJS (.cjs files)
- **File extension**: `.cjs` for all CommonJS modules (Plop config, generators, helpers)
- **Module pattern**: `module.exports = { ... }` for all exports
- **Naming**: kebab-case for generator names (`react-query-basic`, `redux-async`)
- **Prompts**: Use `requireField()` helper for validation, descriptive messages

### Handlebars Templates (.hbs files)
- **Helpers**: Use custom helpers (`eq`, `ne`, `or`, `and`, `includes`, `ternary`, `default`, `reverse`)
- **Case transforms**: `{{pascalCase name}}` for components, `{{camelCase name}}` for hooks/utils
- **Conditionals**: `{{#if (eq element "fragment")}}...{{/if}}` for logic in templates
- **Injection points**: `/* PLOP_INJECT_IMPORT */` and `/* PLOP_INJECT_EXPORT */` for barrel exports

### Generated React/TypeScript Code
- **Components**: Functional components with `React.FC<Props>` typing, CSS modules
- **Props**: Separate `.types.ts` files, extend native HTML props when applicable
- **Polymorphic**: Use `as` prop pattern for flexible components with type-safe generics
- **Tests**: Co-located `.test.tsx` files using same naming as component
- **Exports**: Barrel exports via `index.ts` with auto-injection patterns
