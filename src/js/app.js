import express from 'express';
const app = express();

app.use(express.json());
app.use(express.static('./public'));
app.use(express.static('./dist'));

export default app;