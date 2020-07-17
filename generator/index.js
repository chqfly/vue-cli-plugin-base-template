module.exports = api => {
  api.render("./template");
  api.render({
    "./src/main.js": "./template/src/main.js"
  });

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
};
