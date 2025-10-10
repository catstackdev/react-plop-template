const {
  requireField,
} = require("../../plop-helpers.cjs");
const {
  pickDirWithFzf,
  getProjectDirectories,
} = require("../../plop-util.cjs");
const fs = require("fs");

const pageGenerator = {
  description: "Create a React page with optional route",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Page name?",
      validate: requireField("name"),
    },
    {
      type: "input",
      name: "dir",
      message: "Directory (leave empty for default: src/pages)?",
      default: () => pickDirWithFzf(getProjectDirectories()),
    },
    {
      type: "confirm",
      name: "addRoute",
      message: "Do you want to create a route for this page?",
      default: false,
    },
    {
      type: "input",
      name: "path",
      message: "Route path (e.g. /about)?",
      default: "/{{camelCase name}}",
      when: (answers) => answers.addRoute,
    },
  ],
  actions: (answers) => {
    const dir = answers.dir || "src/pages";
    const actions = [
      {
        type: "add",
        path: `${dir}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
        templateFile: "plop-templates/Page/Page.tsx.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: `${dir}/{{pascalCase name}}/{{pascalCase name}}.test.tsx`,
        templateFile: "plop-templates/Page/Page.test.tsx.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: `${dir}/{{pascalCase name}}/{{pascalCase name}}.module.css`,
        templateFile: "plop-templates/Page/Page.module.css.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: `${dir}/{{pascalCase name}}/{{pascalCase name}}.types.ts`,
        templateFile: "plop-templates/Page/Page.types.ts.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: `${dir}/{{pascalCase name}}/index.ts`,
        templateFile: "plop-templates/Page/index.ts.hbs",
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

    // Route handling
    if (answers.addRoute) {
      if (!fs.existsSync("src/routes.tsx")) {
        actions.push({
          type: "add",
          path: "src/routes.tsx",
          templateFile: "plop-templates/routes.tsx.hbs",
          skipIfExists: true,
        });
      }

      actions.push({
        type: "append",
        path: "src/routes.tsx",
        pattern: /\/\* PLOP_INJECT_ROUTE_IMPORT \*\//,
        template: `import {{pascalCase name}} from './pages/{{pascalCase name}}';`,
      });

      actions.push({
        type: "append",
        path: "src/routes.tsx",
        pattern: "{/* PLOP_INJECT_ROUTE */}",
        template: `  <Route path="{{path}}" element={<{{pascalCase name}} />} />`,
      });
    }

    return actions;
  },
};

const page2Generator = {
  description: "Create a React page with optional route",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Page name?",
      validate: requireField("name"),
    },
    {
      type: "list",
      name: "pageType",
      message: "Page type?",
      choices: [
        { name: "Standard page", value: "standard" },
        { name: "Dashboard/Admin page", value: "dashboard" },
        { name: "Auth page (login/register)", value: "auth" },
        { name: "Landing page", value: "landing" },
      ],
      default: "standard",
    },
    {
      type: "confirm",
      name: "withSEO",
      message: "Include SEO meta tags (requires react-helmet-async)?",
      default: true,
    },
    {
      type: "confirm",
      name: "withLoading",
      message: "Include loading state?",
      default: false,
    },
    {
      type: "confirm",
      name: "withErrorBoundary",
      message: "Wrap with error boundary?",
      default: false,
    },
    {
      type: "confirm",
      name: "addRoute",
      message: "Do you want to create a route for this page?",
      default: false,
    },
    {
      type: "input",
      name: "path",
      message: "Route path (e.g. /about)?",
      default: "/{{camelCase name}}",
      when: (answers) => answers.addRoute,
    },
  ],
  actions: (answers) => {
    const actions = [
      {
        type: "add",
        path: "src/pages2/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/Page/Page.tsx.hbs",
      },
      {
        type: "add",
        path: "src/pages2/{{pascalCase name}}/{{pascalCase name}}.types.ts",
        templateFile: "plop-templates/Page/Page.types.ts.hbs",
      },
      {
        type: "add",
        path: "src/pages2/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "plop-templates/Page/Page.test.tsx.hbs",
      },
      {
        type: "add",
        path: "src/pages2/{{pascalCase name}}/{{pascalCase name}}.module.css",
        templateFile: "plop-templates/Page/Page.module.css.hbs",
      },
      {
        type: "add",
        path: "src/pages2/{{pascalCase name}}/index.ts",
        templateFile: "plop-templates/Page/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/pages2/index.ts",
        templateFile: "plop-templates/injectable-index.ts.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/pages2/index.ts",
        pattern: "/* PLOP_INJECT_IMPORT */",
        template: "import {{pascalCase name}} from './{{pascalCase name}}';\n",
      },
      {
        type: "append",
        path: "src/pages2/index.ts",
        pattern: "/* PLOP_INJECT_EXPORT */",
        template: "\t{{pascalCase name}},\n",
      },
    ];

    if (answers.addRoute) {
      if (!fs.existsSync("src/routes.tsx")) {
        actions.push({
          type: "add",
          path: "src/routes.tsx",
          templateFile: "plop-templates/routes.tsx.hbs",
        });
      }

      actions.push(
        {
          type: "append",
          path: "src/routes.tsx",
          pattern: "/* PLOP_INJECT_ROUTE_IMPORT */",
          template: `import {{pascalCase name}} from './pages/{{pascalCase name}}';`,
        },
        {
          type: "append",
          path: "src/routes.tsx",
          pattern: "{/* PLOP_INJECT_ROUTE */}",
          template: `  <Route path="{{path}}" element={<{{pascalCase name}} />} />`,
        },
      );
    }

    return actions;
  },
};

module.exports = {
  page: pageGenerator,
  page2: page2Generator,
};

