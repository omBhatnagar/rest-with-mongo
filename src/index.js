const http = require("http");

// Import api
const app = require("./app");

// PORT
const PORT = process.env.PORT || 3000;
app.set("port", PORT);

// Create server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
