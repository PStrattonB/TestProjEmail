const express = require('express');
require('./services/passport');


const app = express();

require('./routes/authRoutes')(app);

console.log('app running on port 5000');
const PORT = process.env.PORT || 5000;
app.listen(PORT);

