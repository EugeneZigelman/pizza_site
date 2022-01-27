import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from '../backend/middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import morgan from 'morgan';





dotenv.config();

// Закачиваем наши модели данных из базы данных!!!!!!!!!!!
connectDB();

// Создаем роутер с именем app
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())



app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// const __dirname = path.resolve();
let arrString 
const Separator = path.sep
let __dirname

const workingDir = path.resolve(); //для отладки
const indOfBackend = workingDir.indexOf('backend');

// console.log('workingDir,indOfBackend', workingDir, indOfBackend);

if (indOfBackend != -1) {

  arrString = workingDir.split(Separator);
  // console.log('arrString ', arrString);
  __dirname = workingDir.substring(0, indOfBackend - 1);

} else {
  __dirname = path.resolve();
}
// console.log('__dirname', __dirname);


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });
}


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`));

