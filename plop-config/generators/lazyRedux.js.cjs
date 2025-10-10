const { requireField } = require("../../plop-helpers.cjs");
const fs = require("fs");

// Helper function to calculate paths for lazy loading
function calculateLazyPaths(useCustomDirectory, customDir) {
  const sliceDir = useCustomDirectory ? `${customDir}/state` : "src/state";

  // const storePath = useCustomDirectory
  //   ? `${customDir.split("/state")[0]}/store/index.ts`
  //   : "src/store/index.ts";
  const storePath = "src/store/index.ts";
  // import user3LazyConfig from '../test//state/user3.slice'

  return {
    sliceDir,
    storePath,
    storeImportPath: useCustomDirectory ? "../../store" : "../../store",
    sliceImportPath: useCustomDirectory
      ? `../${customDir.split("src/")[1]}/state`
      : `../state`,
  };
}

const lazyReduxBasicGenerator = {
  description: "Create a lazy-loaded basic Redux slice",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Redux slice name?",
      validate: requireField("name"),
    },
    {
      type: "confirm",
      name: "useCustomDirectory",
      message: "Use custom directory? (default: src/state)",
      default: false,
    },
    {
      type: "input",
      name: "customDir",
      message: "Custom directory (will be prefixed with src/):",
      when: (answers) => answers.useCustomDirectory,
      validate: (input) =>
        input.trim().length > 0 || "Directory path is required",
      filter: (input) => {
        const trimmed = input.trim();
        return trimmed.startsWith("src/") ? trimmed : `src/${trimmed}`;
      },
    },
    {
      type: "confirm",
      name: "preload",
      message: "Preload this reducer on app start?",
      default: false,
    },
    {
      type: "input",
      name: "dependencies",
      message: "Dependencies (comma-separated reducer keys):",
      default: "",
      filter: (input) =>
        input
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const paths = calculateLazyPaths(data.useCustomDirectory, data.customDir);
      Object.assign(data, paths);
      return `Paths calculated: slice=${data.sliceDir}, store=${data.storePath}`;
    },
    // Create slice files
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.slice.ts",
      templateFile: "plop-templates/ReduxLazy/Basic/slice.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.types.ts",
      templateFile: "plop-templates/ReduxLazy/Basic/slice.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.selectors.ts",
      templateFile: "plop-templates/ReduxLazy/Basic/slice.selectors.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.loader.ts",
      templateFile: "plop-templates/ReduxLazy/Basic/slice.loader.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/index.ts",
      templateFile: "plop-templates/ReduxLazy/Basic/index.ts.hbs",
    },
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_REDUCER_IMPORT */",
      template:
        "import {{camelCase name}}LazyConfig from '{{sliceImportPath}}/{{camelCase name}}'",
    },
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_LAZY_CONFIG */",
      template: "  {{camelCase name}}LazyConfig,",
    },
  ],
};

const lazyStoreGenerator = {
  description: "Create a lazy-enabled Redux store",
  prompts: [
    {
      type: "input",
      name: "storeName",
      message: "Store name (e.g., main, feature-specific)?",
      default: "main",
      validate: requireField("storeName"),
    },
    {
      type: "confirm",
      name: "useCustomDirectory",
      message: "Use custom directory? (default: src/store)",
      default: false,
    },
    {
      type: "input",
      name: "customDir",
      message: "Custom directory (will be prefixed with src/):",
      when: (answers) => answers.useCustomDirectory,
      validate: (input) =>
        input.trim().length > 0 || "Directory path is required",
      filter: (input) => {
        const trimmed = input.trim();
        return trimmed.startsWith("src/") ? trimmed : `src/${trimmed}`;
      },
    },
  ],
  actions: [
    // Calculate paths
    function (data) {
      data.storeDir = data.useCustomDirectory ? data.customDir : "src/store";
      return `Store directory: ${data.storeDir}`;
    },
    // Create store files
    {
      type: "add",
      path: "{{storeDir}}/index.ts",
      templateFile: "plop-templates/ReduxLazy/Store/lazyStore.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "add",
      path: "{{storeDir}}/enhancer.ts",
      templateFile: "plop-templates/ReduxLazy/Store/storeEnhancer.ts.hbs",
      skipIfExists: true,
    },
  ],
};

const lazyReducerImportGenerator = {
  description: "Import a lazy reducer configuration",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Reducer name to import?",
      validate: requireField("name"),
    },
    {
      type: "input",
      name: "importPath",
      message: "Import path (relative to store):",
      validate: requireField("importPath"),
    },
    {
      type: "input",
      name: "storePath",
      message: "Store file path:",
      default: "src/store/index.ts",
    },
  ],
  actions: [
    // Add import
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_REDUCER_IMPORT */",
      template:
        "import { {{camelCase name}}LazyConfig } from '{{importPath}}';",
    },
    // Add to lazy configs
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_LAZY_CONFIG */",
      template: "  {{camelCase name}}LazyConfig,",
    },
  ],
};

const lazyReduxAsyncGenerator = {
  description: "Create a lazy-loaded async Redux slice with createAsyncThunk",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Redux async slice name?",
      validate: requireField("name"),
    },
    {
      type: "confirm",
      name: "useCustomDirectory",
      message: "Use custom directory? (default: src/state)",
      default: false,
    },
    {
      type: "input",
      name: "customDir",
      message: "Custom directory (will be prefixed with src/):",
      when: (answers) => answers.useCustomDirectory,
      validate: (input) =>
        input.trim().length > 0 || "Directory path is required",
      filter: (input) => {
        const trimmed = input.trim();
        return trimmed.startsWith("src/") ? trimmed : `src/${trimmed}`;
      },
    },
    {
      type: "confirm",
      name: "preload",
      message: "Preload this reducer on app start?",
      default: false,
    },
    {
      type: "input",
      name: "dependencies",
      message: "Dependencies (comma-separated reducer keys):",
      default: "",
      filter: (input) =>
        input
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const paths = calculateLazyPaths(data.useCustomDirectory, data.customDir);
      Object.assign(data, paths);
      return `Paths calculated: slice=${data.sliceDir}, store=${data.storePath}`;
    },
    // Create async slice files
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.slice.ts",
      templateFile: "plop-templates/ReduxLazy/Async/asyncSlice.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.types.ts",
      templateFile: "plop-templates/ReduxLazy/Async/asyncSlice.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.selectors.ts",
      templateFile:
        "plop-templates/ReduxLazy/Async/asyncSlice.selectors.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.loader.ts",
      templateFile: "plop-templates/ReduxLazy/Async/asyncSlice.loader.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/index.ts",
      templateFile: "plop-templates/ReduxLazy/Async/index.ts.hbs",
    },
    // Add lazy config to store
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_LAZY_CONFIG */",
      template: "  {{camelCase name}}LazyConfig,",
    },
  ],
};

const lazyReduxEntityGenerator = {
  description:
    "Create a lazy-loaded entity Redux slice with createEntityAdapter",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Redux entity slice name?",
      validate: requireField("name"),
    },
    {
      type: "confirm",
      name: "useCustomDirectory",
      message: "Use custom directory? (default: src/state)",
      default: false,
    },
    {
      type: "input",
      name: "customDir",
      message: "Custom directory (will be prefixed with src/):",
      when: (answers) => answers.useCustomDirectory,
      validate: (input) =>
        input.trim().length > 0 || "Directory path is required",
      filter: (input) => {
        const trimmed = input.trim();
        return trimmed.startsWith("src/") ? trimmed : `src/${trimmed}`;
      },
    },
    {
      type: "confirm",
      name: "preload",
      message: "Preload this reducer on app start?",
      default: false,
    },
    {
      type: "input",
      name: "dependencies",
      message: "Dependencies (comma-separated reducer keys):",
      default: "",
      filter: (input) =>
        input
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const paths = calculateLazyPaths(data.useCustomDirectory, data.customDir);
      Object.assign(data, paths);
      return `Paths calculated: slice=${data.sliceDir}, store=${data.storePath}`;
    },
    // Create entity slice files
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.slice.ts",
      templateFile: "plop-templates/ReduxLazy/Entity/entitySlice.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.types.ts",
      templateFile: "plop-templates/ReduxLazy/Entity/entitySlice.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.selectors.ts",
      templateFile:
        "plop-templates/ReduxLazy/Entity/entitySlice.selectors.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.loader.ts",
      templateFile: "plop-templates/ReduxLazy/Entity/entitySlice.loader.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/index.ts",
      templateFile: "plop-templates/ReduxLazy/Entity/index.ts.hbs",
    },
    // Add lazy config to store
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_LAZY_CONFIG */",
      template: "  {{camelCase name}}LazyConfig,",
    },
  ],
};

const lazyReduxApiGenerator = {
  description: "Create a lazy-loaded RTK Query API",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "RTK Query API name?",
      validate: requireField("name"),
    },
    {
      type: "confirm",
      name: "useCustomDirectory",
      message: "Use custom directory? (default: src/state)",
      default: false,
    },
    {
      type: "input",
      name: "customDir",
      message: "Custom directory (will be prefixed with src/):",
      when: (answers) => answers.useCustomDirectory,
      validate: (input) =>
        input.trim().length > 0 || "Directory path is required",
      filter: (input) => {
        const trimmed = input.trim();
        return trimmed.startsWith("src/") ? trimmed : `src/${trimmed}`;
      },
    },
    {
      type: "confirm",
      name: "preload",
      message: "Preload this API on app start?",
      default: false,
    },
    {
      type: "input",
      name: "dependencies",
      message: "Dependencies (comma-separated reducer keys):",
      default: "",
      filter: (input) =>
        input
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const paths = calculateLazyPaths(data.useCustomDirectory, data.customDir);
      Object.assign(data, paths);
      return `Paths calculated: slice=${data.sliceDir}, store=${data.storePath}`;
    },
    // Create API files
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.api.ts",
      templateFile: "plop-templates/ReduxLazy/Api/api.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.types.ts",
      templateFile: "plop-templates/ReduxLazy/Api/api.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.loader.ts",
      templateFile: "plop-templates/ReduxLazy/Api/api.loader.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/index.ts",
      templateFile: "plop-templates/ReduxLazy/Api/index.ts.hbs",
    },
    // Add lazy config to store
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_LAZY_CONFIG */",
      template: "  {{camelCase name}}LazyConfig,",
    },
    // Add middleware injection
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_MIDDLEWARE */",
      template:
        "      // {{camelCase name}}ApiMiddleware, // Uncomment when API is loaded",
    },
  ],
};

const lazyStoreInitGenerator = {
  description: "Initialize lazy-loading Redux store infrastructure",
  prompts: [
    {
      type: "confirm",
      name: "includeExample",
      message: "Include example lazy reducer?",
      default: false,
    },
    {
      type: "confirm",
      name: "overwriteExisting",
      message: "Overwrite existing store files if they exist?",
      default: false,
    },
    {
      type: "list",
      name: "reduxVersion",
      message: "Redux Toolkit version:",
      choices: ["latest (v2.x)", "legacy (v1.x)"],
      default: "latest (v2.x)",
    },
  ],
  actions: [
    // Pre-check: Validate environment
    function (data) {
      const storePath = "src/store/index.ts";
      if (!fs.existsSync("src/")) {
        throw new Error(
          "src/ directory not found! Please run this in a React project root.",
        );
      }
      if (fs.existsSync(storePath) && !data.overwriteExisting) {
        throw new Error(
          'Store already exists! Enable "overwriteExisting" to proceed.',
        );
      }
      return "Environment validated";
    },

    // 1. Create store directory and index
    {
      type: "add",
      path: "src/store/index.ts",
      templateFile: "plop-templates/ReduxLazy/Init/store.index.ts.hbs",
      skipIfExists: false,
    },

    // 2. Create types
    {
      type: "add",
      path: "src/store/types.ts",
      templateFile: "plop-templates/ReduxLazy/Init/store.types.ts.hbs",
      skipIfExists: false,
    },

    // 3. Create enhancers
    {
      type: "add",
      path: "src/store/enhancers.ts",
      templateFile: "plop-templates/ReduxLazy/Init/store.enhancers.ts.hbs",
      skipIfExists: false,
    },

    // 4. Create reducer registry
    {
      type: "add",
      path: "src/store/reducerRegistry.ts",
      templateFile:
        "plop-templates/ReduxLazy/Init/store.reducerRegistry.ts.hbs",
      skipIfExists: false,
    },

    // 5. Create lazy utilities
    {
      type: "add",
      path: "src/utils/lazyRedux.ts",
      templateFile: "plop-templates/ReduxLazy/Init/utils.lazyRedux.ts.hbs",
      skipIfExists: false,
    },

    // 6. Optional: Create example reducer
    {
      type: "add",
      path: "src/state/example/example.loader.ts",
      templateFile: "plop-templates/ReduxLazy/Init/example.loader.ts.hbs",
      skip: (data) =>
        !data.includeExample ? "Skipping example reducer" : undefined,
    },

    // 7. Optional: Create example slice
    {
      type: "add",
      path: "src/state/example/example.slice.ts",
      templateFile: "plop-templates/ReduxLazy/Init/example.slice.ts.hbs",
      skip: (data) =>
        !data.includeExample ? "Skipping example slice" : undefined,
    },

    // 8. Create documentation
    {
      type: "add",
      path: "docs/LAZY_REDUX.md",
      templateFile: "plop-templates/ReduxLazy/Init/README.md.hbs",
      transform: (content, data) => {
        return content.replace(
          "{{currentDate}}",
          new Date().toLocaleDateString(),
        );
      },
    },

    // 9. Success message
    function (data) {
      console.log(`
✅ Lazy Redux Store Initialized!

📁 Created files:
  - src/store/index.ts (main store)
  - src/store/types.ts (TypeScript definitions)
  - src/store/enhancers.ts (lazy loading system)
  - src/store/reducerRegistry.ts (reducer registry)
  - src/utils/lazyRedux.ts (utilities)
  - docs/LAZY_REDUX.md (documentation)
  ${data.includeExample ? "  - src/state/example/ (example reducer)\n" : ""}
🚀 Next steps:
  1. Import store in your app entry: import { store } from './store'
  2. Wrap app with <Provider store={store}>
  3. Generate lazy reducers: pnpm plop lazy-redux-basic
      `);
      return "Setup complete!";
    },
  ],
};

module.exports = {
  "lazy-store-init": lazyStoreInitGenerator,
  "lazy-redux-basic": lazyReduxBasicGenerator,
  "lazy-redux-async": lazyReduxAsyncGenerator,
  "lazy-redux-entity": lazyReduxEntityGenerator,
  "lazy-redux-api": lazyReduxApiGenerator,
  "lazy-store": lazyStoreGenerator,
  "lazy-import": lazyReducerImportGenerator,
};

