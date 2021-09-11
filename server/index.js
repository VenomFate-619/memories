
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js'

dotenv.config()
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json({ limit: '30mb', extended: true }))

app.use(cors());

app.use('/posts', postRoutes);
app.use('/user',userRoutes);


if(process.env.NODE_ENV==="production")
{
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"..", "client", "build", "index.html"));
  });
}

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT|| 5000;

mongoose.set('useFindAndModify', false);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) =>{ console.log(`${error} did not connect`) ; process.exit(1)} );



