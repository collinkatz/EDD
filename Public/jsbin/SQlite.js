var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Z:/My Documents/EDD/db/ProductIDData.db');

var ProductIDData = {

    "RSBMD1": {
        Address: 'Long Reach High School Columbia Maryland',
        LatLng: [39.205343, -76.8112909]
    },
    "RSBMD2": {
        Address: '6216 Stratford Court Elkridge Maryland',
        LatLng: [39.199814, -76.7787759]
    },
    "RSBMD3": {
        Address: '10910 Clarksville Pike Ellicot City 21042',
        LatLng: ['Null', 'Null']
    }
};

db.serialize(function() {
    db.run("CREATE TABLE ProductData (id TEXT, address TEXT, latlng INT)");
   
    var stmt = db.prepare("INSERT INTO ProductData VALUES (?,?,?)");
    for (var key in ProductIDData) {
        stmt.run( "ProductData " + key );
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, id FROM ProductData", function(err, row) {
        console.log(row.id + ": " + row.info);
    });

    //console.log(db.get(10))
  });
   
db.close();