var express = require('express');
var proxyMiddleWare = require("http-proxy-middleware");
var proxyPath = "http://localhost:8080";
var proxyOption ={target:proxyPath,changeOrigoin:true};
var app = express();
app.use(express.static("./dist"));

app.use("/manage",proxyMiddleWare(proxyOption))
app.listen(8088);