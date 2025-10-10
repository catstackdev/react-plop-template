const {
  requireField,
} = require("../../plop-helpers.cjs");
const {
  pickDirWithFzf,
  getProjectDirectories,
  getContextsFromIndex,
} = require("../../plop-util.cjs");
const fs = require("fs");
const path = require("path");

module.exports = {
  description: "Create a new React Context",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Context name (e.g., Auth, Theme)+Provider:",
      validate: requireField("name"),
    },
    {
      type: "confirm",
      name: "isParent",
      message:
        "do Parent Context of child context (after children, only Foldered Context)?",
      default: false,
    },
    {
      when: (answers) => !answers.isParent,
      type: "list",
      name: "structure",
      message: "File structure:",
      choices: ["folder", "flat"],
    },
    {
      type: "list",
      name: "complexity",
      message: "Complexity level:",
      choices: ["basic", "advanced"],
      when: (answers) => !answers.isParent || answers.structure === "folder",
    },
    {
      type: "input",
      name: "dir",
      message: "Directory (leave empty for default: src/context)?",
      default: () =>
        pickDirWithFzf(getProjectDirectories(), {
          defaultDir: "src/context",
        }),
    },
    {
      type: "confirm",
      name: "overrideParent",
      message: "Parent Providers file already exists. Overwrite?",
      default: false,
      when: (answers) => {
        const providersPath = path.join(
          answers.dir || "src/context",
          `${answers.name}Providers.tsx`,
        );
        return fs.existsSync(providersPath);
      },
    },
  ],
  actions: (data) => {
    const actions = [];
    const dir = data.dir || "src/context";

    if (data.isParent) {
      const contexts = getContextsFromIndex(dir);

      if (contexts.length === 0) {
        console.log(
          "⚠️ No contexts found — skipping Parent Provider creation.",
        );
      } else {
        actions.push({
          type: "add",
          path: `${dir}/{{pascalCase name}}Providers.tsx`,
          templateFile: "plop-templates/Context/Flat/parent-context.tsx.hbs",
          data: { contexts },
          skipIfExists: !data.overrideParent,
          force: data.overrideParent,
        });
      }
    } else if (data.structure === "folder") {
      const isAdvanced = data.complexity === "advanced";

      actions.push(
        {
          type: "add",
          path: `${dir}/{{pascalCase name}}Context/context.tsx`,
          templateFile: "plop-templates/Context/Folder/context-only.tsx.hbs",
        },
        {
          type: "add",
          path: `${dir}/{{pascalCase name}}Context/{{pascalCase name}}Context.tsx`,
          templateFile: isAdvanced
            ? "plop-templates/Context/Folder/advanced-context.tsx.hbs"
            : "plop-templates/Context/Folder/context.tsx.hbs",
        },
        {
          type: "add",
          path: `${dir}/{{pascalCase name}}Context/{{pascalCase name}}Context.types.ts`,
          templateFile: isAdvanced
            ? "plop-templates/Context/Folder/advanced-types.ts.hbs"
            : "plop-templates/Context/Folder/context.types.ts.hbs",
        },
        {
          type: "add",
          path: `${dir}/{{pascalCase name}}Context/use{{pascalCase name}}.ts`,
          templateFile: "plop-templates/Context/Folder/hook.ts.hbs",
        },
        {
          type: "add",
          path: `${dir}/{{pascalCase name}}Context/index.ts`,
          templateFile: "plop-templates/Context/Folder/index.ts.hbs",
        },
        {
          type: "add",
          path: `${dir}/index.ts`,
          template:
            "/* AUTO-GENERATED CONTEXT EXPORTS */\n/* PLOP_INJECT_EXPORT */",
          skipIfExists: true,
        },
        {
          type: "append",
          path: `${dir}/index.ts`,
          pattern: "/* PLOP_INJECT_EXPORT */",
          template: `export * from './{{pascalCase name}}Context';\n/* PLOP_INJECT_EXPORT */`,
        },
      );
    } else {
      actions.push({
        type: "add",
        path: `${dir}/{{pascalCase name}}Context.tsx`,
        templateFile: "plop-templates/Context/Flat/context.tsx.hbs",
      });
    }

    return actions;
  },
};

