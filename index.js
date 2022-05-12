const express = require('express');
require('dotenv').config();

const errorHandler = require('./middlewares/error');
const { login } = require('./controllers/login');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const postRouter = require('./routes/post');

const app = express();

app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorHandler);

app.post('/login', login);

app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);
