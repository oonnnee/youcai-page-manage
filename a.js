var express = require('express');
var proxyMiddleWare = require("http-proxy-middleware");
var ejs = require('ejs');
var proxyPath = "http://localhost:8080";
var proxyOption ={target:proxyPath,changeOrigoin:true};
var app = express();
app.use(express.static("./dist"));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use("/manage",proxyMiddleWare(proxyOption))
app.get('*', function(req, res){
    res.render('index.html')
});
app.listen(8088);