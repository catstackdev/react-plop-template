const { requireField } = require("../../plop-helpers.cjs");

module.exports = {
  description: "Create a service (TS)",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Service name?",
      validate: requireField("name"),
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/services/{{camelCase name}}.ts",
      templateFile: "plop-templates/service.ts.hbs",
    },
    {
      type: "add",
      path: "src/services/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "src/services/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template: "import {{camelCase name}} from './{{camelCase name}}';\n",
    },
    {
      type: "append",
      path: "src/services/index.ts",
      pattern: "/* PLOP_INJECT_EXPORT */",
      template: "\t{{camelCase name}},\n",
    },
  ],
};

