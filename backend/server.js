// import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// import cors from 'cors'
// import connectDB from './config/db.js';
// import cookieParser from 'cookie-parser';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import userRoutes from './routes/userRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// const port = process.env.PORT || 5000;


// connectDB();

// const app = express();

// // Enable CORS
// app.use(cors({
//   origin: 'http://localhost:3000',  // Allow frontend
//   credentials: true                 // Allow cookies, auth headers
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use('/api/users', userRoutes);

// app.use('/api/products', productRoutes);

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, '/frontend/dist')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

// app.use(notFound);
// app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`));


import fs from 'fs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

const port = process.env.PORT || 5000;
connectDB();

const app = express();

// Allowed origins: add your Vercel URL here
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL || 'https://stockerr-inventory.vercel.app/' // replace with real Vercel URL
];

app.use(cors({
  origin: function(origin, callback) {
    // allow non-browser tools like curl/postman (no origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed by origin'));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// === SAFE static serve: only if build exists ===
const __dirname = path.resolve();
const clientDistPath = path.join(__dirname, 'frontend', 'dist');

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

