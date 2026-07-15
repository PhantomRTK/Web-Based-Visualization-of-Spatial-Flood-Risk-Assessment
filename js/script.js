// =====================================================
// ONLY RUN MAP IF THE PAGE HAS A MAP
// =====================================================

const mapContainer = document.getElementById("map");

if (typeof L !== "undefined" && mapContainer) {

// ===============================
// CREATE MAP
// ===============================

var map = L.map('map').setView(
    [3.0738,101.5183],
    10
);



// ===============================
// BASE MAP
// ===============================

L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:'© OpenStreetMap'
}
).addTo(map);





// ===============================
// FLOOD DATA
// ===============================


fetch('../data/Flood_Analyses_System.geojson')

.then(response=>response.json())


.then(data=>{


console.log(data);



var floodLayer = L.geoJSON(data,{


style:function(feature){



let risk = feature.properties.Risk_Class;



let color;



if(risk=="Very High"){

color="#FF0000";

}

else if(risk=="High"){

color="#FFAA00";

}


else if(risk=="Moderate"){

color="#FFFF00";

}


else if(risk=="Low"){

color="#AAFF00";

}


else if(risk=="Very Low"){

color="#55FF00";

}



return{


color:color,

fillColor:color,

fillOpacity:0.6,

weight:1


};



},




onEachFeature:function(feature,layer){


layer.bindPopup(

"<b>Flood Risk:</b><br>"+

feature.properties.Risk_Class


);


}



}).addTo(map);




map.fitBounds(
floodLayer.getBounds()
);

// ======================================
// AUTO ZOOM FROM ANALYSIS PAGE
// ======================================

const district = localStorage.getItem("district");

if(district){

    switch(district){

        case "klang":

            map.setView([3.0438,101.4455],12);

            break;

        case "petaling":

            map.setView([3.1073,101.6067],12);

            break;

        case "gombak":

            map.setView([3.2370,101.6720],12);

            break;

        case "hulu_langat":

            map.setView([3.0000,101.7900],11);

            break;

        case "hulu_selangor":

            map.setView([3.5500,101.6500],11);

            break;

        case "kuala_langat":

            map.setView([2.8333,101.5000],11);

            break;

        case "kuala_selangor":

            map.setView([3.3500,101.2500],11);

            break;

        case "sabak_bernam":

            map.setView([3.7500,100.9800],11);

            break;

        case "sepang":

            map.setView([2.7000,101.7500],11);

            break;

    }

}

})

.catch(error=>{


console.log(
"GeoJSON Error:",
error
);


});









// ===============================
// LEGEND RISK CLASSIFICATION
// ===============================


var legend = L.control({

position:'bottomright'

});




legend.onAdd=function(){


var div=L.DomUtil.create('div');



div.style.background="white";

div.style.padding="15px";

div.style.borderRadius="10px";

div.style.fontSize="16px";

div.style.lineHeight="28px";

div.style.boxShadow=
"0 0 8px rgba(0,0,0,0.3)";




div.innerHTML=



"<b>Flood Risk</b><br>"+


"<span style='background:#FF0000;width:20px;height:20px;display:inline-block'></span> Very High<br>"+


"<span style='background:#FFAA00;width:20px;height:20px;display:inline-block'></span> High<br>"+


"<span style='background:#FFFF00;width:20px;height:20px;display:inline-block'></span> Moderate<br>"+


"<span style='background:#AAFF00;width:20px;height:20px;display:inline-block'></span> Low<br>"+


"<span style='background:#55FF00;width:20px;height:20px;display:inline-block'></span> Very Low";



return div;



};


legend.addTo(map);









// ===============================
// LIVE RAINFALL ALL SELANGOR DISTRICT
// ===============================


const apiKey = "7a5d0deed1fd0bd6d97512fb64b9254a";


// Selangor District Coordinates

const districts = [


{
name:"Petaling",
lat:3.1073,
lon:101.6067
},


{
name:"Klang",
lat:3.0438,
lon:101.4455
},


{
name:"Gombak",
lat:3.2370,
lon:101.6720
},


{
name:"Hulu Langat",
lat:3.0000,
lon:101.7900
},


{
name:"Hulu Selangor",
lat:3.5500,
lon:101.6500
},


{
name:"Kuala Langat",
lat:2.8333,
lon:101.5000
},


{
name:"Kuala Selangor",
lat:3.3500,
lon:101.2500
},


{
name:"Sabak Bernam",
lat:3.7500,
lon:100.9800
},


{
name:"Sepang",
lat:2.7000,
lon:101.7500
}


];





// create rainfall layer group

var rainfallLayer = L.layerGroup().addTo(map);





districts.forEach(function(place){



fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&appid=${apiKey}&units=metric`

)



.then(response=>response.json())



.then(data=>{



let rainfall = 0;



if(data.rain && data.rain["1h"]){

rainfall = data.rain["1h"];

}




// create rainfall box


var rainMarker = L.marker(

[place.lat,place.lon],

{

icon:L.divIcon({

className:"rain-box",

html:

`

<div style="

background:white;

padding:8px;

border-radius:8px;

box-shadow:0 2px 8px rgba(0,0,0,0.3);

font-size:13px;

font-weight:bold;

">

🌧 ${place.name}

<br>

${rainfall} mm

</div>

`,

iconSize:[120,50]

})


}

)




.addTo(rainfallLayer);




});



});





// ===============================
// RAINFALL LEGEND
// ===============================


var rainLegend = L.control({

    position:"topleft"

});



rainLegend.onAdd=function(){


var div=L.DomUtil.create("div");


div.style.background="white";

div.style.padding="15px";

div.style.borderRadius="10px";

div.style.boxShadow="0 0 8px rgba(0,0,0,0.3)";



div.innerHTML=


`

<b>🌧 Live Rainfall Selangor</b>

<br><br>

Rainfall value from OpenWeather API

<br>

District monitoring points

`;



return div;


};



rainLegend.addTo(map);





// ===============================
// NORTH ARROW
// ===============================


var north = L.control({

position:'topright'

});


north.onAdd=function(){


var div = L.DomUtil.create('div','north-arrow');


return div;


};


north.addTo(map);
const district = localStorage.getItem("district");

if(district){

    switch(district){

        case "klang":
            map.setView([3.0438,101.4455],12);
            break;

        case "petaling":
            map.setView([3.1073,101.6067],12);
            break;

        case "gombak":
            map.setView([3.2370,101.6720],12);
            break;

        case "hulu_langat":
            map.setView([3.0000,101.7900],11);
            break;

        case "hulu_selangor":
            map.setView([3.5500,101.6500],11);
            break;

        case "kuala_langat":
            map.setView([2.8333,101.5000],11);
            break;

        case "kuala_selangor":
            map.setView([3.3500,101.2500],11);
            break;

        case "sabak_bernam":
            map.setView([3.7500,100.9800],11);
            break;

        case "sepang":
            map.setView([2.7000,101.7500],11);
            break;
    }

    localStorage.removeItem("district");

}

}   // <-- TAMBAH SATU KURUNG INI

// =======================================
// KLANG BAR CHART
// =======================================

const ctx = document.getElementById("klangChart");

if(ctx){

new Chart(ctx,{

    type:'bar',

    data:{

        labels:[

            'Very High',

            'High',

            'Moderate',

            'Low',

            'Very Low'

        ],

        datasets:[{

            data:[

                0,

                2.24,

                88.35,

                9.41,

                0

            ],

            backgroundColor:[

                '#ff0000',

                '#ff9800',

                '#ffd600',

                '#7CFC00',

                '#00BFFF'

            ],

            borderRadius:8

        }]

    },

    options:{

        indexAxis:'y',

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

            legend:{

                display:false

            },

            tooltip:{

                callbacks:{

                    label:function(context){

                        return context.raw+' %';

                    }

                }

            }

        },

        scales:{

            x:{

                beginAtZero:true,

                max:100,

                ticks:{

                    callback:function(value){

                        return value+'%';

                    }

                }

            }

        }

    }

});
const petalingCtx = document.getElementById("petalingChart");

if (petalingCtx) {

    new Chart(petalingCtx, {

        type: "bar",

        data: {

            labels: [
                "Very High",
                "High",
                "Moderate",
                "Low",
                "Very Low"
            ],

            datasets: [{

                data: [
                    0,
                    0,
                    96.22,
                    3.75,
                    0.03
                ],

                backgroundColor: [
                    "#ff0000",
                    "#ff9800",
                    "#ffd600",
                    "#7CFC00",
                    "#00BFFF"
                ],

                borderRadius: 8

            }]

        },

        options: {

            indexAxis: "y",

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                x: {

                    beginAtZero: true,

                    max: 100,

                    ticks: {

                        callback: function(value) {

                            return value + "%";

                        }

                    }

                }

            }

        }

    });

}
const gombakCtx = document.getElementById("gombakChart");

if (gombakCtx) {

    new Chart(gombakCtx, {

        type: "bar",

        data: {

            labels: [
                "Very High",
                "High",
                "Moderate",
                "Low",
                "Very Low"
            ],

            datasets: [{

                data: [
                    0.32,
                    0.85,
                    96.65,
                    2.18,
                    0.00
                ],

                backgroundColor: [
                    "#ff0000",
                    "#ff9800",
                    "#ffd600",
                    "#7CFC00",
                    "#00BFFF"
                ],

                borderRadius: 8

            }]

        },

        options: {

            indexAxis: "y",

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                x: {

                    beginAtZero: true,

                    max: 100,

                    ticks: {

                        callback: function(value) {

                            return value + "%";

                        }

                    }

                }

            }

        }

    });

}
const huluLangatChart = document.getElementById("huluLangatChart");

if(huluLangatChart){

new Chart(huluLangatChart,{

    type:'bar',

    data:{

        labels:[

            'Very High',

            'High',

            'Moderate',

            'Low',

            'Very Low'

        ],

        datasets:[{

            data:[

                0.00,

                1.46,

                91.48,

                7.06,

                0.00

            ],

            backgroundColor:[

                '#ff0000',

                '#ff9800',

                '#ffd600',

                '#7CFC00',

                '#00BFFF'

            ],

            borderRadius:8

        }]

    },

    options:{

        indexAxis:'y',

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

            legend:{

                display:false

            },

            tooltip:{

                callbacks:{

                    label:function(context){

                        return context.raw+' %';

                    }

                }

            }

        },

        scales:{

            x:{

                beginAtZero:true,

                max:100,

                ticks:{

                    callback:function(value){

                        return value+'%';

                    }

                }

            }

        }

    }

});

}
const huluSelangorChart = document.getElementById("huluSelangorChart");

if(huluSelangorChart){

new Chart(huluSelangorChart,{

    type:'bar',

    data:{

        labels:[

            'Very High',

            'High',

            'Moderate',

            'Low',

            'Very Low'

        ],

        datasets:[{

            data:[

                6.39,

                12.68,

                75.08,

                5.84,

                0.01

            ],

            backgroundColor:[

                '#ff0000',

                '#ff9800',

                '#ffd600',

                '#7CFC00',

                '#00BFFF'

            ],

            borderRadius:8

        }]

    },

    options:{

        indexAxis:'y',

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

            legend:{

                display:false

            },

            tooltip:{

                callbacks:{

                    label:function(context){

                        return context.raw+' %';

                    }

                }

            }

        },

        scales:{

            x:{

                beginAtZero:true,

                max:100,

                ticks:{

                    callback:function(value){

                        return value+'%';

                    }

                }

            }

        }

    }

});

}
const kualaSelangorChart = document.getElementById("kualaSelangorChart");

if(kualaSelangorChart){

new Chart(kualaSelangorChart,{

    type:'bar',

    data:{

        labels:[

            'Very High',

            'High',

            'Moderate',

            'Low',

            'Very Low'

        ],

        datasets:[{

            data:[

                11.58,

                18.42,

                80.64,

                1.24,

                0.00

            ],

            backgroundColor:[

                '#ff0000',

                '#ff9800',

                '#ffd600',

                '#7CFC00',

                '#00BFFF'

            ],

            borderRadius:8

        }]

    },

    options:{

        indexAxis:'y',

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

            legend:{
                display:false
            },

            tooltip:{

                callbacks:{

                    label:function(context){

                        return context.raw+' %';

                    }

                }

            }

        },

        scales:{

            x:{

                beginAtZero:true,

                max:100,

                ticks:{

                    callback:function(value){

                        return value+'%';

                    }

                }

            }

        }

    }

});

}
const kualaLangatChart = document.getElementById("kualaLangatChart");

if(kualaLangatChart){

new Chart(kualaLangatChart,{

    type:'bar',

    data:{

        labels:[

            'Very High',

            'High',

            'Moderate',

            'Low',

            'Very Low'

        ],

        datasets:[{

            data:[

                0.00,

                0.54,

                95.72,

                3.74,

                0.00

            ],

            backgroundColor:[

                '#ff0000',

                '#ff9800',

                '#ffd600',

                '#7CFC00',

                '#00BFFF'

            ],

            borderRadius:8

        }]

    },

    options:{

        indexAxis:'y',

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

            legend:{

                display:false

            },

            tooltip:{

                callbacks:{

                    label:function(context){

                        return context.raw+' %';

                    }

                }

            }

        },

        scales:{

            x:{

                beginAtZero:true,

                max:100,

                ticks:{

                    callback:function(value){

                        return value+'%';

                    }

                }

            }

        }

    }

});

}
const ctxSepang = document.getElementById("sepangChart");

if(ctxSepang){

new Chart(ctxSepang,{

    type:'bar',

    data:{

        labels:[
            'Very High',
            'High',
            'Moderate',
            'Low',
            'Very Low'
        ],

        datasets:[{

            data:[
                0,
                1.19,
                98.22,
                0.57,
                0.01
            ],

            backgroundColor:[
                '#ff0000',
                '#ff9800',
                '#ffd600',
                '#7CFC00',
                '#00BFFF'
            ],

            borderRadius:8

        }]

    },

    options:{

        indexAxis:'y',

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

            legend:{
                display:false
            }

        },

        scales:{

            x:{

                beginAtZero:true,

                max:100,

                ticks:{

                    callback:function(value){

                        return value + "%";

                    }

                }

            }

        }

    }

});

}

}