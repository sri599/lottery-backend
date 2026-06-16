require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();
const customerRoutes =
  require('./routes/customerRoutes');
  const authRoutes =
  require('./routes/authRoutes');
  const messageRoutes =
  require('./routes/messageRoutes');
const whatsappRoutes =
  require('./routes/whatsappRoutes');
connectDB();

app.use(cors());
app.use(express.json());
app.use(
  '/customers',
  customerRoutes
);
app.use('/auth', authRoutes);
app.use(
  '/whatsapp',
  whatsappRoutes
);

app.get('/', (req, res) => {
  res.send('Lottery Backend Running');
});
app.use(
  '/messages',
  messageRoutes
);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});