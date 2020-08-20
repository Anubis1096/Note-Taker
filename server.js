const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

//Sets up Express to handle data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Static content
app.use(express.static('public'));

//Routes
app.use('/api', require('./routes/apiRoutes'));
app.use('/', require('./routes/htmlRoutes'));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});