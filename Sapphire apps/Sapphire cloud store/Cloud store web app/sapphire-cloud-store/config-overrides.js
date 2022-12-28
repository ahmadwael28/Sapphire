const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@common-controls": "src/common/controls",
    "@images": "src/assets/images",
    "@enums": "src/enums",
  })(config);

  return config;
};
