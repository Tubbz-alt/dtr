
var fs = require("fs"),
  request = require("request"),
  http = require("http"),
  jsonServer = require("json-server"),
  server = jsonServer.create(),
  router = jsonServer.router("./src/db.json"),
  middlewares = jsonServer.defaults();

  server.use("/fhir", function(req, res) {
    var url = "https://davinci-crd.logicahealth.org/fhir" + req.url;
    console.log(url);

    req.pipe(request({url:url,  agentOptions: {
        rejectUnauthorized: false
      }})).pipe(res);
  });
  server.use("/files", function(req, res) {
    var url = "https://davinci-crd.logicahealth.org/files" + req.url;
    req.pipe(request({url:url,  agentOptions: {
        rejectUnauthorized: false
      }})).pipe(res);
  });

// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err;
//     }

//     var options = {
//         key: keys.serviceKey,
//         cert: keys.certificate
//       };
      
//     server.use(middlewares);
//     server.use(jsonServer.bodyParser);
// server.use((req, res, next) => {
//   if (req.method === "POST") {
//     req.body.createdAt = Date.now();
//   }
//   // Continue to JSON Server router
//   next();
// });

//     server.get("/register", function(req, res){
//         res.sendFile(__dirname + "/public/register.html");
//     });
//     server.get("/index", function(req, res){
//         res.sendFile(__dirname + "/public/index.html");
//     });
//     server.get("/launch", function(req, res){
//         res.sendFile(__dirname + "/public/launch.html");
//     });
//     server.get("/priorauth", function(req, res){
//         res.sendFile(__dirname + "/public/priorauth.html");
//     });

//     server.use(router);
//     https.createServer(options, server).listen(3005, "0.0.0.0", function() {
//         console.log("json-server started on port " + 3005);
//     });
      
//   });

  var options = {
  };
  
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
if (req.method === "POST") {
req.body.createdAt = Date.now();
}
// Continue to JSON Server router
next();
});

server.get("/register", function(req, res){
    console.log("register");
    console.log(__dirname + "/public/register.html");
    res.sendFile(__dirname + "/public/register.html");
});
server.get("/index", function(req, res){
    console.log("henlo");
    res.sendFile(__dirname + "/public/index.html");
});
server.get("/launch", function(req, res){
    res.sendFile(__dirname + "/public/launch.html");
});
server.get("/priorauth", function(req, res){
    res.sendFile(__dirname + "/public/priorauth.html");
});

server.use(router);
http.createServer(options, server).listen(3005, function() {
    console.log("json-server started on port " + 3005);
});
  