console.log("SERVER LOADING baby");
const express = require('express');
const app = express();
console.log(__dirname);
app.use(express.static('public'));

app.listen(3000, function () {
      console.log('listening on port 3000!');
});
