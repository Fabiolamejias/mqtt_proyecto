document.addEventListener('DOMContentLoaded', function () {
    var linkDashboard = document.getElementById('linkDashboard');
    var linkConfiguration = document.getElementById('linkConfiguration');
    var contentDashboard = document.getElementById('dashboard');
    var contentConfiguration = document.getElementById('configuration');

    function changeContent(event, contentToShow, contentToHide) {
        event.preventDefault();

        contentToShow.style.display = 'block';
        contentToHide.style.display = 'none';

        if (!this.classList.contains('active')) {
            this.classList.add('active');
            if (this === linkDashboard) {
                linkConfiguration.classList.remove('active');
            } else {
                linkDashboard.classList.remove('active');
            }
        }
    }

    linkDashboard.addEventListener('click', function (event) {
        changeContent.call(this, event, contentDashboard, contentConfiguration);
    });

    linkConfiguration.addEventListener('click', function (event) {
        changeContent.call(this, event, contentConfiguration, contentDashboard);
    });

    new CardComponent('iluminacion', 'btnIluminacion');
    new CardComponent('temperatura', 'btnTemperatura');
    new CardComponent('ventanas', 'btnVentanas');
});



/*Codigo Fabiola*/

function startConnect() {
    clientID = "clientID - " + parseInt(Math.random() * 100);
    //host =  "test.mosquitto.org"; 
    //host="91.121.93.94"; //ip mosquitto
    host = "192.168.0.102";
    //port = "8081";
    port = "8081";
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    client.onMessageArrived = onMessageArrived;
    console.log(host + " " + port + " " + clientID);
    //    client.onConnectionLost = onConnectionLost;

    client.connect({
        onSuccess: onConnect
    })
}

function onConnect() {
    topic = "outTopicunexfm";
    console.log("suscrito");
    client.subscribe(topic);
}

var num;
function onMessageArrived(message) {
    //console.log(message.payloadString);
    num = message.payloadString;
    document.getElementById("inventanas").innerHTML = num;

}

setInterval(function () {
    console.log(num);
}, 3000);



//CÓDIGO HIGHCHARTS
var gaugeOptions = {
    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

// The speed gauge
var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 200,
        title: {
            text: 'Speed'
        }
    },

    credits: {
        enabled: false
    },

    /* series: [{
         name: 'Speed',
         data: [80],
         dataLabels: {
             format:
                 '<div style="text-align:center">' +
                 '<span style="font-size:25px">{y}</span><br/>' +
                 '<span style="font-size:12px;opacity:0.4">km/h</span>' +
                 '</div>'
         },
         tooltip: {
             valueSuffix: ' km/h'
         }
     }]*/

}));


