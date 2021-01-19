module.exports = {
  packages: {
    "@ansyn/ansyn": {
      ignorableDeepImportMatchers: [
        /ol\//,
        /d3\//
      ]
    },
    "@ansyn/ol": {
      ignorableDeepImportMatchers: [
        /ol\//
      ]
    }
  }
};
