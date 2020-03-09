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
        console.log(row.Id+" : "+row.Address+" : "+row.Lat+" : "+row.Lng);
    });
}
//Test Address
NewPI("River Hill High School Clarksville Maryland", ["Null", "Null"]);
db.close();