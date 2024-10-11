// server.js
const corsAnywhere = require("cors-anywhere");
const port = process.env.PORT || 8080;
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [];

corsAnywhere
    .createServer({
        originWhitelist: allowedOrigins, // Allow all origins
    })
    .listen(port, () => {
        console.log(`CORS Anywhere server running on port ${port}`);
    });
