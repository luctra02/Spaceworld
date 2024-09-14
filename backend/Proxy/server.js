// server.js
const corsAnywhere = require('cors-anywhere');
const port = process.env.PORT || 8080;

corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
}).listen(port, () => {
  console.log(`CORS Anywhere server running on port ${port}`);
});
