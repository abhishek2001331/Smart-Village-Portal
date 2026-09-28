const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 Smart Village Portal Backend API Server`);
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌐 API Endpoint: http://localhost:${PORT}/api/health-check`);
    console.log(`=================================================`);
  });
}).catch(err => {
  console.error('Failed to initialize database server:', err);
});
