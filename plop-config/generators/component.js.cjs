const { requireField } = require("../../plop-helpers.cjs");
const {
  pickDirWithFzf,
  getProjectDirectories,
} = require("../../plop-util.cjs");

module.exports = {
  description: "Create a reusable React component (with TS)",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Component name?",
      validate: requireField("name"),
    },
    {
      type: "input",
      name: "element",
      message: "Base HTML element? (fragment(<></>),div , button, input, etc)",
      default: "div",
    },
    {
      when: (answers) => answers.element !== "fragment",
      type: "confirm",
      name: "isFlexible",
      message: "Make component flexible (allow 'as' prop)?",
      default: false,
    },
    {
      type: "input",
      name: "dir",
      message: "Directory (leave empty for default: src/components)?",
      default: () => pickDirWithFzf(getProjectDirectories()),
    },
  ],
  actions: [
    {
      type: "add",
      path: "{{dir}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
      templateFile: "plop-templates/Component/Component.tsx.hbs",
    },
    {
      type: "add",
      path: "{{dir}}/{{pascalCase name}}/{{pascalCase name}}.types.ts",
      templateFile: "plop-templates/Component/Component.types.ts.hbs",
    },
    {
      type: "add",
      path: "{{dir}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
      templateFile: "plop-templates/Component/Component.test.tsx.hbs",
    },
    {
      type: "add",
      path: "{{dir}}/{{pascalCase name}}/{{pascalCase name}}.module.css",
      templateFile: "plop-templates/Component/Component.module.css.hbs",
    },
    {
      type: "add",
      path: "{{dir}}/{{pascalCase name}}/index.ts",
      templateFile: "plop-templates/Component/index.ts.hbs",
    },
    {
      type: "add",
      path: "{{dir}}/index.ts",
      templateFile: "plop-templates/injectable-index.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "{{dir}}/index.ts",
      pattern: "/* PLOP_INJECT_IMPORT */",
      template: "import {{pascalCase name}} from './{{pascalCase name}}';\n",
    },
    {
      type: "append",
      path: "{{dir}}/index.ts",
      pattern: "/* PLOP_INJECT_EXPORT */",
      template: "\t{{pascalCase name}},\n",
    },
  ],
};

