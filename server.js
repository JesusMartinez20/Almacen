const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/Almacen'));

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/Almacen/index.html'));
});
t
app.listen(process.env.PORT || 8080); 