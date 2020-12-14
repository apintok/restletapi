const express = require('express');
const dotenv = require('dotenv');
const nsRouter = require('./routes/nsRoutes');
const navRouter = require('./routes/navRoutes');
const port = process.env.PORT || 3001;
const app = express();

dotenv.config({ path: './config.env'});
// ------------------------------------------------------------------ \\

app.use(express.json());
app.use(navRouter);
app.use('/v1', nsRouter);

app.all('*', (req, res) => {
    res.status(400).send('Page Not Found');
});

app.listen(port, () => {
    console.log(`Server Running on Port -> ${port}\n`);
});