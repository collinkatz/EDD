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
var map = document.getElementById("map")
function DatabaseInit() {
for (var key in ProductIDData) {
    // check if the property/key is defined in the object itself, not in parent
    //if (ProductIDData.hasOwnProperty(key)) {}
    console.log(key, ProductIDData[key]);
    var codedAddress = codeAddress('Database', ProductIDData[key].Address);
    console.log('codeAddress: '+codedAddress)
}
};
//DatabaseInit();
document.addEventListener("DOMContentLoaded", DatabaseInit);