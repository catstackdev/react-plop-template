const { requireField } = require("../../plop-helpers.cjs");

// Helper function to calculate hook directory
function getHookDirectory(useCustomDirectory, customDir) {
  if (useCustomDirectory) {
    return `${customDir}/hooks`;
  } else {
    return "src/hooks";
  }
}

const reactQueryBasicGenerator = {
  description: "Create a React Query hook for data fetching",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Hook name (e.g., Users, Posts, Products)?",
      validate: requireField("name"),
    },
    {
      type: "confirm",
      name: "useCustomDirectory",
      message: "Use custom directory? (default: src/hooks)",
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
    {
      type: "input",
      name: "apiEndpoint",
      message: "API endpoint (e.g., /api/users)?",
      default: (answers) => `/api/${answers.name.toLowerCase()}`,
      validate: (input) => input.trim().length > 0 || "API endpoint is required",
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const { useCustomDirectory, customDir } = data;
      data.hookDir = getHookDirectory(useCustomDirectory, customDir);
      return `Paths calculated: hooks=${data.hookDir}`;
    },
    // Create hook files
    {
      type: "add",
      path: "{{hookDir}}/use{{pascalCase name}}Query.ts",
      templateFile: "plop-templates/ReactQuery/Basic/hook.ts.hbs",
    },
    {
      type: "add",
      path: "{{hookDir}}/use{{pascalCase name}}Query.types.ts",
      templateFile: "plop-templates/ReactQuery/Basic/hook.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{hookDir}}/use{{pascalCase name}}Query.test.tsx",
      templateFile: "plop-templates/ReactQuery/Basic/hook.test.tsx.hbs",
    },
    // Update hooks index file
    {
      type: "add",
      path: "{{hookDir}}/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "{{hookDir}}/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template:
        "import use{{pascalCase name}}Query from './use{{pascalCase name}}Query';\n",
    },
    {
      type: "append",
      path: "{{hookDir}}/index.ts",
      pattern: "/* PLOP_INJECT_EXPORT */",
      template: "\tuse{{pascalCase name}}Query,\n",
    },
  ],
};

const reactQueryMutationGenerator = {
  description: "Create React Query mutation hooks with optimistic updates",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Hook name (e.g., Users, Posts, Products)?",
      validate: requireField("name"),
    },
    {
      type: "confirm",
      name: "useCustomDirectory",
      message: "Use custom directory? (default: src/hooks)",
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
    {
      type: "input",
      name: "apiEndpoint",
      message: "API endpoint (e.g., /api/users)?",
      default: (answers) => `/api/${answers.name.toLowerCase()}`,
      validate: (input) => input.trim().length > 0 || "API endpoint is required",
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const { useCustomDirectory, customDir } = data;
      data.hookDir = getHookDirectory(useCustomDirectory, customDir);
      return `Paths calculated: hooks=${data.hookDir}`;
    },
    // Create mutation hook files
    {
      type: "add",
      path: "{{hookDir}}/use{{pascalCase name}}Mutations.ts",
      templateFile: "plop-templates/ReactQuery/Mutation/hook.ts.hbs",
    },
    {
      type: "add",
      path: "{{hookDir}}/use{{pascalCase name}}Mutations.types.ts",
      templateFile: "plop-templates/ReactQuery/Mutation/hook.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{hookDir}}/use{{pascalCase name}}Mutations.test.tsx",
      templateFile: "plop-templates/ReactQuery/Mutation/hook.test.tsx.hbs",
    },
    // Update hooks index file
    {
      type: "add",
      path: "{{hookDir}}/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "{{hookDir}}/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template:
        "import { useCreate{{pascalCase name}}Mutation, useUpdate{{pascalCase name}}Mutation, useDelete{{pascalCase name}}Mutation } from './use{{pascalCase name}}Mutations';\n",
    },
    {
      type: "append",
      path: "{{hookDir}}/index.ts",
      pattern: "/* PLOP_INJECT_EXPORT */",
      template: "\tuseCreate{{pascalCase name}}Mutation,\n\tuseUpdate{{pascalCase name}}Mutation,\n\tuseDelete{{pascalCase name}}Mutation,\n",
    },
  ],
};

const reactQueryInfiniteGenerator = {
  description: "Create React Query infinite query hook for pagination",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Hook name (e.g., Users, Posts, Products)?",
      validate: requireField("name"),
    },
    {
      type: "confirm",
      name: "useCustomDirectory",
      message: "Use custom directory? (default: src/hooks)",
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
    {
      type: "input",
      name: "apiEndpoint",
      message: "API endpoint (e.g., /api/users)?",
      default: (answers) => `/api/${answers.name.toLowerCase()}`,
      validate: (input) => input.trim().length > 0 || "API endpoint is required",
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const { useCustomDirectory, customDir } = data;
      data.hookDir = getHookDirectory(useCustomDirectory, customDir);
      return `Paths calculated: hooks=${data.hookDir}`;
    },
    // Create infinite query hook files
    {
      type: "add",
      path: "{{hookDir}}/use{{pascalCase name}}InfiniteQuery.ts",
      templateFile: "plop-templates/ReactQuery/Infinite/hook.ts.hbs",
    },
    {
      type: "add",
      path: "{{hookDir}}/use{{pascalCase name}}InfiniteQuery.types.ts",
      templateFile: "plop-templates/ReactQuery/Infinite/hook.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{hookDir}}/use{{pascalCase name}}InfiniteQuery.test.tsx",
      templateFile: "plop-templates/ReactQuery/Infinite/hook.test.tsx.hbs",
    },
    // Update hooks index file
    {
      type: "add",
      path: "{{hookDir}}/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "{{hookDir}}/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template:
        "import use{{pascalCase name}}InfiniteQuery from './use{{pascalCase name}}InfiniteQuery';\n",
    },
    {
      type: "append",
      path: "{{hookDir}}/index.ts",
      pattern: "/* PLOP_INJECT_EXPORT */",
      template: "\tuse{{pascalCase name}}InfiniteQuery,\n",
    },
  ],
};

const reactQueryServiceGenerator = {
  description: "Create complete React Query API service with queries and mutations",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Service name (e.g., Users, Posts, Products)?",
      validate: requireField("name"),
    },
    {
      type: "confirm",
      name: "useCustomDirectory",
      message: "Use custom directory? (default: src/hooks)",
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
    {
      type: "input",
      name: "apiEndpoint",
      message: "API endpoint (e.g., /api/users)?",
      default: (answers) => `/api/${answers.name.toLowerCase()}`,
      validate: (input) => input.trim().length > 0 || "API endpoint is required",
    },
  ],
  actions: [
    // Calculate paths dynamically
    function (data) {
      const { useCustomDirectory, customDir } = data;
      data.hookDir = getHookDirectory(useCustomDirectory, customDir);
      return `Paths calculated: hooks=${data.hookDir}`;
    },
    // Create service files
    {
      type: "add",
      path: "{{hookDir}}/{{camelCase name}}Api.ts",
      templateFile: "plop-templates/ReactQuery/Service/api.ts.hbs",
    },
    {
      type: "add",
      path: "{{hookDir}}/{{camelCase name}}Api.types.ts",
      templateFile: "plop-templates/ReactQuery/Service/api.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{hookDir}}/{{camelCase name}}Api.test.tsx",
      templateFile: "plop-templates/ReactQuery/Service/api.test.tsx.hbs",
    },
    {
      type: "add",
      path: "{{hookDir}}/{{camelCase name}}Api/index.ts",
      templateFile: "plop-templates/ReactQuery/Service/index.ts.hbs",
    },
    // Update hooks index file
    {
      type: "add",
      path: "{{hookDir}}/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "{{hookDir}}/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template:
        "import * as {{camelCase name}}Api from './{{camelCase name}}Api';\n",
    },
    {
      type: "append",
      path: "{{hookDir}}/index.ts",
      pattern: "/* PLOP_INJECT_EXPORT */",
      template: "\t{{camelCase name}}Api,\n",
    },
  ],
};

module.exports = {
  "react-query-basic": reactQueryBasicGenerator,
  "react-query-mutation": reactQueryMutationGenerator,
  "react-query-infinite": reactQueryInfiniteGenerator,
  "react-query-service": reactQueryServiceGenerator,
};