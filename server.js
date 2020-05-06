const express = require('express')
const app = express()
var path = require('path')
var async = require('async')

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
  LoadForMap().then((prepFile) => {
    console.log("sending")
    response.json({pointArray: prepFile})
  });
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})
app.set('view engine', 'ejs');

// SQLite ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('Z:/My Documents/EDD/db/ProductIDData.db');
//var db = new sqlite3.Database('C:/Users/trowe/Desktop/CollinandSamEDDproject/db/ProductIDData.db');
var db = new sqlite3.Database('C:/Users/Collin/Desktop/Webapp/EDD/db/ProductIDData.db');

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
    "RSBMD4": new RaspberryPI("RSBMD4", '8468 Greystone Lane', ['Null', 'Null']),
    "RSBMD5": new RaspberryPI("RSBMD5", '8355 Montgomery Run Road', ['Null', 'Null']),
    "RSBMD6": new RaspberryPI("RSBMD6", '6101 Old Dobbin Lane', ['Null', 'Null']),
    "RSBMD7": new RaspberryPI("RSBMD7", '7727 Dagny Way', ['Null', 'Null']),
    "RSBMD8": new RaspberryPI("RSBMD8", 'Mayfield avenue', ['Null', 'Null']),
    "RSBMD9": new RaspberryPI("RSBMD9", '5711 Rosanna Place, Ellicott city, MD, 21043', ['Null', 'Null']),
    "RSBMD10": new RaspberryPI("RSBMD10", '7767 Chatfield lane', ['Null', 'Null']),
    "RSBMD11": new RaspberryPI("RSBMD11", '5653 Roundtree Lane Columbia, MD 21045', ['Null', 'Null']),
    "RSBMD12": new RaspberryPI("RSBMD12", '5029 Eliots Oak Rd, Columbia Md 21044', ['Null', 'Null']),
    "RSBMD13": new RaspberryPI("RSBMD13", '8338 Silver Trumpet Drive Columbia, Maryland 21045', ['Null', 'Null']),
    "RSBMD14": new RaspberryPI("RSBMD14", '6410 Dry Barley Ln. Columbia, MD 21045', ['Null', 'Null']),//
    "RSBMD15": new RaspberryPI("RSBMD15", '6921 Norwood Ferry Elkridge, MD 21075', ['Null', 'Null']),
    "RSBMD16": new RaspberryPI("RSBMD16", '6426 Frothingham Court Elkridge, MD 21075', ['Null', 'Null']),
    "RSBMD17": new RaspberryPI("RSBMD17", '6424 Woodvale Place', ['Null', 'Null']),
    "RSBMD18": new RaspberryPI("RSBMD18", '6300 Canyon Head Lane', ['Null', 'Null']),
    "RSBMD19": new RaspberryPI("RSBMD19", '6504 Meadowfield Ct. Elkridge, MD', ['Null', 'Null']),
    "RSBMD20": new RaspberryPI("RSBMD20", '6352 soft Thunder Trail Columbia md', ['Null', 'Null']),
    "RSBMD21": new RaspberryPI("RSBMD21", '9512 Park Ave, Laurel MD 20723', ['Null', 'Null']),
    "RSBMD22": new RaspberryPI("RSBMD22", '8045 Hillrise Ct. Elkridge, MD 21075', ['Null', 'Null']),
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

var prepFile = []
async function PrepSendFile() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(prepFile)
    }, 1000);
    prepFile = []
    promises = []
    //console.log("Num in db: "+db.prepare("SELECT COUNT(id) FROM ProductData"))
    db.each("SELECT id Id, address Address, lat Lat, lng Lng FROM ProductData", [], (err, row) => {
    //  promises.push(new Promise((resolve, reject) => {
        prepFile.push([row.Lat, row.Lng, row.Address])
        console.log('Pushing to sendFile: '+row.Lat+' '+row.Lng)
    //  resolve([row.Lat, row.Lng])
    //  }));
    });
    // function LoopComplete() {
    //   Promise.all(promises).then((value) => {
    //     console.log(prepFile)
    //     resolve(prepFile)
    //   });
    // }
  });
}

async function LoadForMap() {
  return new Promise(async (resolve, reject) => {
    var sendFile = await PrepSendFile()
    console.log(sendFile)
    resolve(sendFile)
  });
}
//Test Address
NewPI("River Hill High School Clarksville Maryland", ["Null", "Null"]);
//db.close();