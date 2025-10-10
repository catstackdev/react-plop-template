const {
  requireField,
} = require("../../plop-helpers.cjs");

const modelGenerator = {
  description: "Create a TypeScript data model interface",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Model name?",
      validate: requireField("name"),
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/models/{{pascalCase name}}.ts",
      templateFile: "plop-templates/Model/model.ts.hbs",
    },
    {
      type: "add",
      path: "src/models/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "src/models/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template:
        "import { {{pascalCase name}} } from './{{pascalCase name}}';\n",
    },
    {
      type: "append",
      path: "src/models/index.ts",
      pattern: "/* PLOP_INJECT_EXPORT */",
      template: "\t{{pascalCase name}},\n",
    },
  ],
};

const constantsGenerator = {
  description: "Create a constants file with enums and constants",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Constants file name?",
      validate: requireField("name"),
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/constants/{{camelCase name}}.ts",
      templateFile: "plop-templates/constants.ts.hbs",
    },
    {
      type: "add",
      path: "src/constants/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "src/constants/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template: "export * from './{{camelCase name}}';\n",
    },
  ],
};

const utilGenerator = {
  description: "Create a utility functions file",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Utility file name?",
      validate: requireField("name"),
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/utils/{{camelCase name}}.ts",
      templateFile: "plop-templates/util.ts.hbs",
    },
    {
      type: "add",
      path: "src/utils/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "src/utils/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template: "export * from './{{camelCase name}}';\n",
    },
  ],
};

const errorGenerator = {
  description: "Create custom error classes",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Error class name (e.g., User, Api, Validation)?",
      validate: requireField("name"),
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/errors/{{camelCase name}}Error.ts",
      templateFile: "plop-templates/error.ts.hbs",
    },
    {
      type: "add",
      path: "src/errors/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "src/errors/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template: "export * from './{{camelCase name}}Error';\n",
    },
  ],
};

module.exports = {
  model: modelGenerator,
  constants: constantsGenerator,
  util: utilGenerator,
  error: errorGenerator,
};

