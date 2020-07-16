const directivesModule = require.context("./directives", false, /\.js$/);
const filtersModule = require.context("./filters", false, /\.js$/);
const mixinsModule = require.context("./mixins", false, /\.js$/);

/**
 * 比较两个对象是否存在重复的对象属性
 */
function compareRepeat(obj1, obj2) {
  const repeats = Object.keys(obj1).filter(key => obj2[key]);
  const isRepeat = repeats.length > 0;
  return [isRepeat, repeats];
}

/**
 * 模块对象解析
 */
function resolveModule(moduleContext) {
  const moduleCollections = {};
  moduleContext.keys().forEach(filePath => {
    const [isRepeat, repeats] = compareRepeat(
      moduleCollections,
      moduleContext(filePath)
    );
    if (isRepeat) {
      console.warn("存在重复定义, 会发生覆盖:", repeats);
    }
    Object.assign(moduleCollections, moduleContext(filePath));
  });
  return moduleCollections;
}

/**
 * 模块对象依次遍历执行
 */
function moduleForEach(moduleContext, callback) {
  const collections = resolveModule(moduleContext);
  Object.keys(collections).forEach(keyName => {
    callback(keyName, collections[keyName]);
  });
}

/**
 * 注册指令
 */
function installDirectives(Vue) {
  moduleForEach(directivesModule, (directiveName, directiveFunc) => {
    Vue.directive(directiveName, directiveFunc);
  });
}

/**
 * 注册过滤器
 */
function installFilters(Vue) {
  moduleForEach(filtersModule, (filterName, filterFunc) => {
    Vue.filter(filterName, filterFunc);
  });
}

/**
 * 注册混合
 */
function installMixins(Vue) {
  moduleForEach(mixinsModule, (mixinName, mixinFunc) => {
    Vue.mixin(mixinFunc);
  });
}

function install(Vue) {
  installDirectives(Vue);
  installFilters(Vue);
  installMixins(Vue);
}

export default { install };
