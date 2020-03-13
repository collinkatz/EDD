const express = require('express')
const app = express()
var path = require('path')

app.get('/Public/imgbin/image.jpeg', function (request, response) {
  response.sendFile(path.join(__dirname, '/Public/imgbin/image.jpeg'))
})

app.get('/Public/jsbin/geocoding.js', function (request, response) {
  response.type('.js')
  response.sendFile(path.join(__dirname, '/Public/jsbin/geocoding.js'))
})

app.get('/Public/jsbin/SQlite.js', function (request, response) {
  response.type('.js')
  response.sendFile(path.join(__dirname, '/Public/jsbin/SQlite.js'))
})

app.get('/Ear/', function (request, response) {
  console.log(request.query.latlng)
  NewPI(null, request.query.latlng)
  LoadForMap()
  response.send("Hello Raspberry Pi!")
})

app.get('/', function (request, response) {
  response.render('index')
})

app.get('/Ear/GetPoints/', function (request, response) {
  var prepFile = LoadForMap()
  response.send("help");
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})
app.set('view engine', 'ejs');

// SQLite ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('Z:/My Documents/EDD/db/ProductIDData.db');
var db = new sqlite3.Database('C:/Users/trowe/Desktop/CollinandSamEDDproject/db/ProductIDData.db');

class RaspberryPI {
    constructor(Name, Address, LatLng) {
        this.Name = Name;
        this.Address = Address;
        this.LatLng = LatLng;
    }
}

var ProductIDData = {
    "RSBMD1": new RaspberryPI("RSBMD1", 'Long Reach High School Columbia Maryland', [39.205343, -76.8112909]),
    "RSBMD2": new RaspberryPI("RSBMD2", '6216 Stratford Court Elkridge Maryland', [39.199814, -76.7787759]),
    "RSBMD3": new RaspberryPI("RSBMD3", '10910 Clarksville Pike Ellicot City 21042', ['Null', 'Null']),
};

db.serialize(function() {
    db.run("CREATE TABLE ProductData (id TEXT PRIMARY KEY, address TEXT, lat REAL, lng REAL)");
   
    var stmt = db.prepare("INSERT INTO ProductData(id, address, lat, lng) VALUES(?,?,?,?)");
    for (var key in ProductIDData) {
        stmt.run( [ key, ProductIDData[key].Address, ProductIDData[key].LatLng[0], ProductIDData[key].LatLng[1] ] );
    }
    stmt.finalize();

    db.each("SELECT id Id, address Address, lat Lat, lng Lng FROM ProductData", [], function(err, row) {
        console.log(row.Id+" : "+row.Address+" : "+row.Lat+" : "+row.Lng);
    });

    //console.log(db.get(10))
});

function NewPI(Address, LatLng) {
    length = Object.keys(ProductIDData).length
    name = "RSBMD" + (length + 1)
    ProductIDData[name] = new RaspberryPI(name, Address, LatLng);
    db.run("INSERT INTO ProductData(id, address, lat, lng) VALUES(?,?,?,?)", [ name, Address, LatLng[0], LatLng[1] ]);

    //Test
    db.each("SELECT id Id, address Address, lat Lat, lng Lng FROM ProductData", [], function(err, row) {
        console.log("2: "+row.Id+" : "+row.Address+" : "+row.Lat+" : "+row.Lng);
    });
}

function LoadForMap() {
  var sendFile = []
  db.each("SELECT id Id, address Address, lat Lat, lng Lng FROM ProductData", [], function(err, row) {
    sendFile[sendFile.length] = [row.Lat, row.Long]
  });
  return sendFile
}
//Test Address
NewPI("River Hill High School Clarksville Maryland", ["Null", "Null"]);
//db.close();