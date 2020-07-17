module.exports = api => {
  api.render("./template");
  api.render({
    "./src/main.js": "./template/src/main.js"
  });

  api.injectImports(api.entryFile, `import "./extends/thirdLibs";`);
  api.injectImports(api.entryFile, `import plugins from "./extends";`);

  api.extendPackage({
    devDependencies: {
      husky: "^4.2.5",
      "@commitlint/cli": "^9.0.1",
      "@commitlint/config-conventional": "^9.0.1"
    },
    dependencies: {
      "element-ui": "^2.13.2",
      axios: "^0.19.2",
      qs: "^6.9.4"
    },
    husky: {
      hooks: {
        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
      }
    },
    commitlint: {
      extends: ["@commitlint/config-conventional"]
    }
  });

  // api.onCreateComplete(() => {
  //   const { EOL } = require('os')
  //   const fs = require('fs')
  //   console.log('======')
  //   const contentMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' })
  //   const lines = contentMain.split(/\r?\n/g)

  //   const renderIndex = lines.findIndex(line => line.match(/import plugins/))
  //   lines[renderIndex] += `${EOL}Vue.use(plugins);`

  //   fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' })
  // })
};
