const helpGenerator = {
  description: "Show available generators and usage help",
  prompts: [],
  actions: [
    function customAction() {
      console.log(`
🚀 CyberCat-React Plop Generators Help

📋 Available Generators:
  plop component      - Create React component (with TS)
  plop layout         - Create React layout
  plop page          - Create React page (basic)
  plop page2         - Create React page (advanced)
  plop context       - Create React context (Basic: Provider only | Advanced: Reducer + Context)
  plop hook          - Create custom React hook
  plop service       - Create service module
  plop reducer-basic - Create reducer
  plop redux-slice   - Create Redux Toolkit slice (legacy)
  plop redux-basic   - Create modern Redux slice with types & selectors
  plop redux-async   - Create async Redux slice with createAsyncThunk
  plop redux-entity  - Create normalized entity slice with createEntityAdapter
  plop redux-api     - Create RTK Query API slice
  
  🔥 Lazy Redux (Advanced):
  plop lazy-store-init   - Initialize lazy Redux store infrastructure
  plop lazy-redux-basic  - Create lazy-loaded basic Redux slice
  plop lazy-redux-async  - Create lazy-loaded async Redux slice
  plop lazy-redux-entity - Create lazy-loaded entity Redux slice
  plop lazy-redux-api    - Create lazy-loaded RTK Query API
  plop lazy-import       - Import existing reducer as lazy-loaded
  
  plop story         - Create Storybook story
  plop model         - Create TypeScript model
  plop constants     - Create constants file
  plop util          - Create utility functions
  plop error         - Create custom error classes

💡 Usage:
  plop                    - Show interactive menu
  plop <generator>        - Run specific generator
  plop <generator> "name" - Run with pre-filled name

🎯 Examples:
  plop component "Button"
  plop context "Auth"
  plop page "Dashboard"

❌ Invalid generator name? Try 'plop' without arguments for interactive mode.
        `);
      return "Help displayed successfully!";
    },
  ],
};

const helpRedirect = {
  description:
    "❌ Invalid generator name. Use 'plop help' or 'plop' for available options.",
  prompts: [],
  actions: [
    function () {
      console.log(`
❌ Invalid generator name!

💡 Did you mean one of these?
  plop component  (not 'comp' or 'c')
  plop context    (not 'ctx')
  plop layout     (not 'Layout')
  plop page       (not 'pg')

🔧 Quick fix:
  plop help       - Show all generators
  plop            - Interactive menu
        `);
      return "Please use a valid generator name.";
    },
  ],
};

// Common mistake aliases
const aliases = {
  help: helpGenerator,
  // comp: helpRedirect,
  // c: helpRedirect,
  // ctx: helpRedirect,
  // pg: helpRedirect,
  // h: helpRedirect,
  // Layout: helpRedirect,
  // a: helpRedirect,
};

module.exports = {
  help: helpGenerator,
  helpRedirect,
  aliases,
};
