const { requireField } = require("../../plop-helpers.cjs");
const {
  pickDirWithFzf,
  getProjectDirectories,
} = require("../../plop-util.cjs");
const path = require("path");

// Helper function to calculate import paths for store injection
function calculateImportPath(createCustomStore, dir, name) {
  if (createCustomStore) {
    // Custom store: relative from feature/store to feature/state/slice
    return `../state/${name}`;
  } else {
    // Root store: relative from src/store to custom/dir/slice
    const sliceDir = dir || "src/state";
    return path
      .relative("src/store", `${sliceDir}/${name}`)
      .replace(/\\/g, "/");
  }
}

// Helper function to determine store path
function getStorePath(createCustomStore, dir) {
  if (createCustomStore) {
    // Extract feature path and create store sibling to state
    const featurePath = dir.split("/state")[0]; // e.g., "src/features/dashboard" from "src/features/dashboard/state"
    return `${featurePath}/store/index.ts`;
  } else {
    return "src/store/index.ts";
  }
}

// Helper function to calculate store import path for selectors
function calculateStoreImportPath(createCustomStore, dir) {
  if (createCustomStore) {
    // Custom store: relative from slice to feature store
    return "../../store";
  } else {
    // Root store: calculate relative path from slice to src/store
    const sliceDir = dir || "src/state";
    const relativePath = path
      .relative(`${sliceDir}/placeholder`, "src/store")
      .replace(/\\/g, "/");
    return relativePath;
  }
}

const reducerBasicGenerator = {
  description: "Create a new reducer",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Reducer name (e.g., counter):",
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/reducers/{{camelCase name}}Reducer.ts",
      templateFile: "plop-templates/Reducer/basicReducer.ts.hbs",
    },
    {
      type: "add",
      path: "src/reducers/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "src/reducers/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template:
        "import { {{camelCase name}}Reducer, initial{{pascalCase name}}State } from './{{camelCase name}}Reducer';\n",
    },
    {
      type: "append",
      path: "src/reducers/index.ts",
      pattern: "/* PLOP_INJECT_EXPORT */",
      template:
        "\t{{camelCase name}}Reducer,\n\tinitial{{pascalCase name}}State,\n",
    },
  ],
};

const reduxSliceGenerator = {
  description: "Create a Redux Toolkit slice (legacy)",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Redux slice name?",
      validate: requireField("name"),
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/state/{{camelCase name}}Slice.ts",
      templateFile: "plop-templates/ReduxSlice/slice.ts.hbs",
    },
    {
      type: "append",
      path: "src/state/index.ts",
      pattern: "/* PLOP_INJECT_SLICE_IMPORT */",
      template:
        "import {{camelCase name}}Slice from './{{camelCase name}}Slice';\n",
    },
    {
      type: "append",
      path: "src/state/index.ts",
      pattern: "/* PLOP_INJECT_SLICE_EXPORT */",
      template: "\t{{camelCase name}}Slice,\n",
    },
  ],
};

const reduxBasicGenerator = {
  description: "Create a modern Redux slice with types and selectors",
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
      validate: (input) => input.trim().length > 0 || "Directory path is required",
      filter: (input) => {
        const trimmed = input.trim();
        return trimmed.startsWith('src/') ? trimmed : `src/${trimmed}`;
      },
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const { useCustomDirectory, customDir, name } = data;
      
      // Determine final directory
      if (useCustomDirectory) {
        data.sliceDir = `${customDir}/state`;
        data.createCustomStore = true;
      } else {
        data.sliceDir = "src/state";
        data.createCustomStore = false;
      }
      
      // Calculate paths
      data.storePath = getStorePath(data.createCustomStore, data.sliceDir);
      data.importPath = calculateImportPath(data.createCustomStore, data.sliceDir, name);
      data.storeImportPath = calculateStoreImportPath(data.createCustomStore, data.sliceDir);
      
      return `Paths calculated: slice=${data.sliceDir}, store=${data.storePath}`;
    },
    // Create store (root or custom)
    {
      type: "add",
      path: "{{storePath}}",
      templateFile: "plop-templates/Store/store.ts.hbs",
      skipIfExists: true,
    },
    // Create slice files
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.slice.ts",
      templateFile: "plop-templates/ReduxBasic/slice.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.types.ts",
      templateFile: "plop-templates/ReduxBasic/slice.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.selectors.ts",
      templateFile: "plop-templates/ReduxBasic/slice.selectors.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/index.ts",
      templateFile: "plop-templates/ReduxBasic/index.ts.hbs",
    },
    // Inject reducer import
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_REDUCER_IMPORT */",
      template: "import {{camelCase name}}Reducer from '{{importPath}}';\n",
    },
    // Inject reducer into store
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_REDUCER */",
      template: "    {{camelCase name}}: {{camelCase name}}Reducer,\n",
    },
  ],
};

const reduxAsyncGenerator = {
  description: "Create an async Redux slice with createAsyncThunk",
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
      validate: (input) => input.trim().length > 0 || "Directory path is required",
      filter: (input) => {
        const trimmed = input.trim();
        return trimmed.startsWith('src/') ? trimmed : `src/${trimmed}`;
      },
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const { useCustomDirectory, customDir, name } = data;
      
      // Determine final directory
      if (useCustomDirectory) {
        data.sliceDir = `${customDir}/state`;
        data.createCustomStore = true;
      } else {
        data.sliceDir = "src/state";
        data.createCustomStore = false;
      }
      
      // Calculate paths
      data.storePath = getStorePath(data.createCustomStore, data.sliceDir);
      data.importPath = calculateImportPath(data.createCustomStore, data.sliceDir, name);
      data.storeImportPath = calculateStoreImportPath(data.createCustomStore, data.sliceDir);
      
      return `Paths calculated: slice=${data.sliceDir}, store=${data.storePath}`;
    },
    // Create store (root or custom)
    {
      type: "add",
      path: "{{storePath}}",
      templateFile: "plop-templates/Store/store.ts.hbs",
      skipIfExists: true,
    },
    // Create slice files
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.slice.ts",
      templateFile: "plop-templates/ReduxAsync/asyncSlice.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.types.ts",
      templateFile: "plop-templates/ReduxAsync/asyncSlice.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.selectors.ts",
      templateFile: "plop-templates/ReduxAsync/asyncSlice.selectors.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/index.ts",
      templateFile: "plop-templates/ReduxAsync/index.ts.hbs",
    },
    // Inject reducer import
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_REDUCER_IMPORT */",
      template: "import {{camelCase name}}Reducer from '{{importPath}}';\n",
    },
    // Inject reducer into store
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_REDUCER */",
      template: "    {{camelCase name}}: {{camelCase name}}Reducer,\n",
    },
  ],
};

const reduxEntityGenerator = {
  description:
    "Create a normalized entity Redux slice with createEntityAdapter",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Entity name (e.g., User, Product, Post)?",
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
      validate: (input) => input.trim().length > 0 || "Directory path is required",
      filter: (input) => {
        const trimmed = input.trim();
        return trimmed.startsWith('src/') ? trimmed : `src/${trimmed}`;
      },
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const { useCustomDirectory, customDir, name } = data;
      
      // Determine final directory
      if (useCustomDirectory) {
        data.sliceDir = `${customDir}/state`;
        data.createCustomStore = true;
      } else {
        data.sliceDir = "src/state";
        data.createCustomStore = false;
      }
      
      // Calculate paths
      data.storePath = getStorePath(data.createCustomStore, data.sliceDir);
      data.importPath = calculateImportPath(data.createCustomStore, data.sliceDir, name);
      data.storeImportPath = calculateStoreImportPath(data.createCustomStore, data.sliceDir);
      
      return `Paths calculated: slice=${data.sliceDir}, store=${data.storePath}`;
    },
    // Create store (root or custom)
    {
      type: "add",
      path: "{{storePath}}",
      templateFile: "plop-templates/Store/store.ts.hbs",
      skipIfExists: true,
    },
    // Create slice files
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.slice.ts",
      templateFile: "plop-templates/ReduxEntity/entitySlice.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.types.ts",
      templateFile: "plop-templates/ReduxEntity/entitySlice.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.selectors.ts",
      templateFile: "plop-templates/ReduxEntity/entitySlice.selectors.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/index.ts",
      templateFile: "plop-templates/ReduxEntity/index.ts.hbs",
    },
    // Inject reducer import
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_REDUCER_IMPORT */",
      template: "import {{camelCase name}}Reducer from '{{importPath}}';\n",
    },
    // Inject reducer into store
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_REDUCER */",
      template: "    {{camelCase name}}: {{camelCase name}}Reducer,\n",
    },
  ],
};

const reduxApiGenerator = {
  description: "Create an RTK Query API slice for data fetching",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "API name (e.g., User, Product, Post)?",
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
      validate: (input) => input.trim().length > 0 || "Directory path is required",
      filter: (input) => {
        const trimmed = input.trim();
        return trimmed.startsWith('src/') ? trimmed : `src/${trimmed}`;
      },
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const { useCustomDirectory, customDir, name } = data;
      
      // Determine final directory
      if (useCustomDirectory) {
        data.sliceDir = `${customDir}/state`;
        data.createCustomStore = true;
      } else {
        data.sliceDir = "src/state";
        data.createCustomStore = false;
      }
      
      // Calculate paths
      data.storePath = getStorePath(data.createCustomStore, data.sliceDir);
      data.importPath = calculateImportPath(data.createCustomStore, data.sliceDir, name);
      data.storeImportPath = calculateStoreImportPath(data.createCustomStore, data.sliceDir);
      
      // For RTK Query, we need a slightly different import path
      if (data.createCustomStore) {
        data.apiImportPath = `../state/${name}`;
      } else {
        data.apiImportPath = path
          .relative("src/store", `${data.sliceDir}/${name}`)
          .replace(/\\/g, "/");
      }
      
      return `Paths calculated: slice=${data.sliceDir}, store=${data.storePath}`;
    },
    // Create store (root or custom)
    {
      type: "add",
      path: "{{storePath}}",
      templateFile: "plop-templates/Store/store.ts.hbs",
      skipIfExists: true,
    },
    // Create API files
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.api.ts",
      templateFile: "plop-templates/ReduxApi/api.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/{{camelCase name}}.types.ts",
      templateFile: "plop-templates/ReduxApi/api.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{sliceDir}}/{{camelCase name}}/index.ts",
      templateFile: "plop-templates/ReduxApi/index.ts.hbs",
    },
    // Inject API import into store
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_REDUCER_IMPORT */",
      template: "import { {{camelCase name}}Api } from '{{apiImportPath}}';\n",
    },
    // Inject API reducer into store
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_REDUCER */",
      template:
        "    [{{camelCase name}}Api.reducerPath]: {{camelCase name}}Api.reducer,\n",
    },
    // Inject API middleware
    {
      type: "append",
      path: "{{storePath}}",
      pattern: "/* PLOP_INJECT_MIDDLEWARE */",
      template: "      {{camelCase name}}Api.middleware,\n",
    },
  ],
};

module.exports = {
  "reducer-basic": reducerBasicGenerator,
  "redux-slice": reduxSliceGenerator,
  "redux-basic": reduxBasicGenerator,
  "redux-async": reduxAsyncGenerator,
  "redux-entity": reduxEntityGenerator,
  "redux-api": reduxApiGenerator,
};

