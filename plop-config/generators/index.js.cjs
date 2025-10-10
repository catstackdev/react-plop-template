const component = require('./component.js.cjs');
const layout = require('./layout.js.cjs');
const { page, page2 } = require('./page.js.cjs');
const context = require('./context.js.cjs');
const hook = require('./hooks.js.cjs');
const service = require('./services.js.cjs');
const { 
  "reducer-basic": reducerBasic, 
  "redux-slice": reduxSlice,
  "redux-basic": reduxBasic,
  "redux-async": reduxAsync,
  "redux-entity": reduxEntity,
  "redux-api": reduxApi
} = require('./reducers.js.cjs');
const {
  "react-query-basic": reactQueryBasic,
  "react-query-mutation": reactQueryMutation,
  "react-query-infinite": reactQueryInfinite,
  "react-query-service": reactQueryService
} = require('./reactQuery.js.cjs');
const {
  "lazy-store-init": lazyStoreInit,
  "lazy-redux-basic": lazyReduxBasic,
  "lazy-redux-async": lazyReduxAsync,
  "lazy-redux-entity": lazyReduxEntity,
  "lazy-redux-api": lazyReduxApi,
  "lazy-store": lazyStore,
  "lazy-import": lazyImport
} = require('./lazyRedux.js.cjs');
const { model, constants, util, error } = require('./models.js.cjs');
const story = require('./storybook.js.cjs');
const { help, aliases } = require('./help.js.cjs');

/**
 * Register all generators with plop instance
 */
function register(plop) {
  // Core generators
  plop.setGenerator("component", component);
  plop.setGenerator("layout", layout);
  plop.setGenerator("page", page);
  plop.setGenerator("page2", page2);
  plop.setGenerator("context", context);
  plop.setGenerator("hook", hook);
  plop.setGenerator("service", service);
  plop.setGenerator("reducer-basic", reducerBasic);
  plop.setGenerator("redux-slice", reduxSlice);
  plop.setGenerator("redux-basic", reduxBasic);
  plop.setGenerator("redux-async", reduxAsync);
  plop.setGenerator("redux-entity", reduxEntity);
  plop.setGenerator("redux-api", reduxApi);
  plop.setGenerator("react-query-basic", reactQueryBasic);
  plop.setGenerator("react-query-mutation", reactQueryMutation);
  plop.setGenerator("react-query-infinite", reactQueryInfinite);
  plop.setGenerator("react-query-service", reactQueryService);
  plop.setGenerator("lazy-store-init", lazyStoreInit);
  plop.setGenerator("lazy-redux-basic", lazyReduxBasic);
  plop.setGenerator("lazy-redux-async", lazyReduxAsync);
  plop.setGenerator("lazy-redux-entity", lazyReduxEntity);
  plop.setGenerator("lazy-redux-api", lazyReduxApi);
  plop.setGenerator("lazy-store", lazyStore);
  plop.setGenerator("lazy-import", lazyImport);
  plop.setGenerator("story", story);
  plop.setGenerator("model", model);
  plop.setGenerator("constants", constants);
  plop.setGenerator("util", util);
  plop.setGenerator("error", error);

  // Help system
  plop.setGenerator("help", help);
  
  // Error handling aliases
  Object.entries(aliases).forEach(([name, generator]) => {
    if (name !== 'help') { // Don't duplicate help
      plop.setGenerator(name, generator);
    }
  });
}

module.exports = {
  register,
};