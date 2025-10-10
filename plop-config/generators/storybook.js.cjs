const {
  requireField,
} = require("../../plop-helpers.cjs");

module.exports = {
  description: "Create a Storybook story for a component",
  prompts: [
    {
      type: "input",
      name: "componentName",
      message: "Component name?",
      validate: requireField("componentName"),
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/components/{{pascalCase componentName}}/{{pascalCase componentName}}.stories.tsx",
      templateFile: "plop-templates/Storybook/Story.stories.tsx.hbs",
    },
  ],
};

