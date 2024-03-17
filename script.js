//Barra deslizante luz
var valorBarra;

function guardarValor(valor) {

    valorBarra=valor;
    //console.log(valorBarra);
    document.getElementById("ilum").innerHTML = valorBarra;     

        publishMessage(); 
   
}

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
    //host = "192.168.0.108";
    host="localhost";
    //port = "8081";
    port = "9001";
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    client.onMessageArrived = onMessageArrived;

    console.log(host + " " + port + " " + clientID);
    //    client.onConnectionLost = onConnectionLost;

    client.connect({
        onSuccess: onConnect
    })
}


function onConnect() {
    controlLuz = "controlLuz";
    controlAcceso = "controlAcceso";
    ventanas="ventanas";

    client.subscribe(controlLuz);
    client.subscribe(controlAcceso);
    client.subscribe(ventanas);
    console.log("suscrito");
}

var num;

function onMessageArrived(message) {
    console.log("hola6");
    console.log('Mensaje Recibido en topico:',message.destinationName,'Message: ',message.payloadString);

    switch(message.destinationName){
    
        case controlLuz:
        
            var i0=message.payloadString[0];
            var i1=message.payloadString[1];
            var i2=message.payloadString[2];
            var i3=message.payloadString[3];
            console.log('i0 ',i0);
            console.log('i1 ',i1);
            console.log('i2 ',i2);
            console.log('i3 ',i3);

            var i22 = parseInt(i2,10);
            num=(i0*100)+(i1*10)+i22;
            console.log(num);

            var num1=(0.8695*num)-112.97;
            if(num1>=100){num1=100;}
            var ilum = num1.toFixed(0); //Mostrar solo 2 decimales
            document.getElementById("ilum").innerHTML = ilum;

            if (i3=='0'){
                console.log("no hay nadie");
                document.getElementById("Presencia").innerHTML = "No";
            }
            if (i3==1){
                console.log("hay alguien");
                document.getElementById("Presencia").innerHTML = "Si";
            }
        
        break;
            
        case controlAcceso:
            var usuario=message.payloadString[0];

            var d1=message.payloadString[1];
            var d=message.payloadString[2];
                var d2=parseInt(d,10);

            var m1=message.payloadString[3];
            var m=message.payloadString[4];
                var m2=parseInt(m,10);
            
            var h1=message.payloadString[5];
            var h=message.payloadString[6];
                var h2=parseInt(h,10); 
            
            var min1=message.payloadString[7];
            var mi=message.payloadString[8];
                var min2=parseInt(mi,10);

            var dia= (d1*10)+d2;
            var mes= (m1*10)+m2;
            var hora=(h1*10)+h2;
            var min=(min1*10)+min2;

            console.log("Ingresó usuario "+usuario+" Fecha: "+dia+"/"+mes+ " Hora: "+hora+":"+min);

        break;

        case ventanas:
            var vent1=message.payloadString[0];
                if(vent1=='0'){document.getElementById("v1").innerHTML = "Abierta";}
                if(vent1=='1'){document.getElementById("v1").innerHTML = "Cerrada";}

            var vent2=message.payloadString[1];
                if(vent2=='0'){document.getElementById("v2").innerHTML = "Abierta";}
                if(vent2=='1'){document.getElementById("v2").innerHTML = "Cerrada";}
            
            var vent3=message.payloadString[2];
                if(vent3=='0'){document.getElementById("v3").innerHTML = "Abierta";}
                if(vent3=='1'){document.getElementById("v3").innerHTML = "Cerrada";}
            
            var vent4=message.payloadString[3];
                if(vent4=='0'){document.getElementById("v4").innerHTML = "Abierta";}
                if(vent4=='1'){document.getElementById("v4").innerHTML = "Cerrada";}
            
            var vent5=message.payloadString[4];
                if(vent5=='0'){document.getElementById("v5").innerHTML = "Abierta";}
                if(vent5=='1'){document.getElementById("v5").innerHTML = "Cerrada";}
            
            var vent6=message.payloadString[5];
                if(vent6=='0'){document.getElementById("v6").innerHTML = "Abierta";}
                if(vent6=='1'){document.getElementById("v6").innerHTML = "Cerrada";}
            
            var vent7=message.payloadString[6];
                if(vent7=='0'){document.getElementById("v7").innerHTML = "Abierta";}
                if(vent7=='1'){document.getElementById("v7").innerHTML = "Cerrada";}
            
            var vent8=message.payloadString[7];
                if(vent8=='0'){document.getElementById("v8").innerHTML = "Abierta";}
                if(vent8=='1'){document.getElementById("v8").innerHTML = "Cerrada";}


        break;
}

}


function publishMessage(){

    topic = "actuadorLum";
    
    valorLuz=(1.15*valorBarra)+130;
    valorLuz=parseInt(valorLuz,10);
    valorLuz=valorLuz.toString();

    Message = new Paho.MQTT.Message(valorLuz);
    Message.destinationName = topic;
    client.send(Message);
    console.log("Mensaje Publicado: "+valorLuz);  
    
//    document.getElementById("messages").innerHTML += "<span> Message to topic "+topic+" is sent </span><br>";
    
    
    }

/*
setInterval(function () {
    console.log(num);
}, 3000);
*/

/*
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
     }]

}));
*/

