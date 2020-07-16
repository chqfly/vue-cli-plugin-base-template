module.exports = (api) => {

  api.render('./template', {})

  api.injectImports(api.entryFile, `import "./extends/thirdLibs";`)
  api.injectImports(api.entryFile, `import plugins from "./extends";`)

  api.extendPackage({
    scripts: {
      "lint-staged": "lint-staged"
    },
    devDependencies: {
      "husky": "^4.2.5",
      "lint-staged": "^9.5.0",
      "@commitlint/cli": "^9.0.1",
      "@commitlint/config-conventional": "^9.0.1",
    },
    husky: {
      "hooks": {
        "pre-commit": "npm run lint-staged",
        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
      }
    },
    commitlint: {
      "extends": [
        "@commitlint/config-conventional"
      ]
    }
  })

  api.onCreateComplete(() => {
    const { EOL } = require('os')
    const fs = require('fs')
    const contentMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g)
    const renderIndex = lines.findIndex(line => line.match(/import plugins/))
    lines[renderIndex] += `${EOL}Vue.use(plugins);`

    fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' })
  })
}
