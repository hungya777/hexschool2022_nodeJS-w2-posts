const routes = require('./routes');
require('./connections');

const app = (req, res) => {
  // console.log(req.url);
  // res.end();
  routes(req, res);
};

module.exports = app;