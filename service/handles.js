const headers = require('./headers');

function successHandle (res, data){
  res.writeHead(200, headers);
  res.write(JSON.stringify({  //Convert a JavaScript object into a string with JSON.stringify()
    "status": "success",
    "data": data
  }))
  res.end();
}

function errorHandle (res, err){
  res.writeHead(400, headers);
  let message = '';
  if (err) {
    message = err.message;
  } else {
    message = "欄位未填寫正確或無此 id";
  }
  res.write(JSON.stringify({
    "status": "false",
    "message": message
  }))
  res.end();
}

module.exports = {
  successHandle,
  errorHandle
}