var ProductIDData = {

    "RSBMD1": {
        Address: 'Long Reach High School Columbia Maryland',
        LatLng: [39.205343, -76.8112909]
    },
    "RSBMD2": {
        Address: '6216 Stratford Court Elkridge Maryland',
        LatLng: [39.199814, -76.7787759]
    }

};
var map = document.getElementById("map")
function DatabaseInit() {
for (var key in ProductIDData) {
    // check if the property/key is defined in the object itself, not in parent
    //if (ProductIDData.hasOwnProperty(key)) {}
    console.log(key, ProductIDData[key]);
    codeAddress('Database', ProductIDData[key].Address);
}
};
//DatabaseInit();
document.addEventListener("DOMContentLoaded", DatabaseInit);