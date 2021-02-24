module.exports = {
  packages: {
    "@ansyn/ansyn": {
      ignorableDeepImportMatchers: [
        /ol\//,
        /d3\//,
        /rxjs\/index/
      ]
    },
    "@ansyn/ol": {
      ignorableDeepImportMatchers: [
        /ol\//
      ]
    }
  }
};
