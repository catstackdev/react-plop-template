const {
  requireField,
} = require("../../plop-helpers.cjs");
const {
  pickDirWithFzf,
  getProjectDirectories,
} = require("../../plop-util.cjs");

module.exports = {
  description: "Create a React Layout",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Layout name?",
      validate: requireField("name"),
    },
    {
      type: "input",
      name: "dir",
      message: "Directory (leave empty for default: src/layouts)?",
      default: () => pickDirWithFzf(getProjectDirectories()),
    },
  ],
  actions: (answers) => {
    const dir = answers.dir || "src/pages";
    const actions = [
      {
        type: "add",
        path: `${dir}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
        templateFile: "plop-templates/Layout/Layout.tsx.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: `${dir}/{{pascalCase name}}/{{pascalCase name}}.module.css`,
        templateFile: "plop-templates/Layout/Layout.module.css.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: `${dir}/{{pascalCase name}}/{{pascalCase name}}.types.ts`,
        templateFile: "plop-templates/Layout/Layout.types.ts.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: `${dir}/{{pascalCase name}}/index.ts`,
        templateFile: "plop-templates/Layout/index.ts.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: `${dir}/index.ts`,
        templateFile: "plop-templates/injectable-index.ts.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: `${dir}/index.ts`,
        pattern: /\/\* PLOP_INJECT_IMPORT \*\//,
        template: "import {{pascalCase name}} from './{{pascalCase name}}';",
      },
      {
        type: "append",
        path: `${dir}/index.ts`,
        pattern: /\/\* PLOP_INJECT_EXPORT \*\//,
        template: "\t{{pascalCase name}},",
      },
    ];
    return actions;
  },
};

