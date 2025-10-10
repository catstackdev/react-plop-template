const {
  requireField,
} = require("../../plop-helpers.cjs");

module.exports = {
  description: "Create a custom React hook",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Hook name?",
      validate: requireField("name"),
    },
    {
      type: "list",
      name: "hookType",
      message: "Hook type?",
      choices: [
        { name: "Generic hook with state management", value: "generic" },
        { name: "Async/API hook", value: "async" },
        { name: "Simple state hook", value: "state" },
      ],
      default: "generic",
    },
  ],
  actions: (data) => {
    const templateMap = {
      generic: "plop-templates/hook.ts.hbs",
      async: "plop-templates/hook-async.ts.hbs",
      state: "plop-templates/hook-state.ts.hbs",
    };

    return [
      {
        type: "add",
        path: "src/hooks/use{{pascalCase name}}.ts",
        templateFile: templateMap[data.hookType] || templateMap.generic,
      },
      {
        type: "add",
        path: "src/hooks/index.ts",
        templateFile: "plop-templates/injectable-index.ts.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/hooks/index.ts",
        pattern: "/* PLOP_INJECT_IMPORT */",
        template:
          "import use{{pascalCase name}} from './use{{pascalCase name}}';\n",
      },
      {
        type: "append",
        path: "src/hooks/index.ts",
        pattern: "/* PLOP_INJECT_EXPORT */",
        template: "\tuse{{pascalCase name}},\n",
      },
    ];
  },
};

