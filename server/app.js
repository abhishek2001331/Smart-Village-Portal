const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const jobRoutes = require('./routes/jobRoutes');
const healthRoutes = require('./routes/healthRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const agricultureRoutes = require('./routes/agricultureRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/api/health-check', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Smart Village Portal REST API Service is Running',
    timestamp: new Date().toISOString()
  });
});

// REST API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/agriculture', agricultureRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
