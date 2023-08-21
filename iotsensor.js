const express = require('express');
const app = express();
var fs = require('fs')
const Sensor = require('./Model/sensor');
const mongoose = require('mongoose')
const url ="mongodb+srv://kaviuln1335:kaviuln@cluster0.hcagxgu.mongodb.net/?retryWrites=true&w=majority"
//const sgMongo_url = "mongodb://admin:QoTcV6tkoblTOm73@SG-boom-tiger-7766-59231.servers.mongodirector.com:27017/admin"
//var plotly = require('plotly')("kaviuln", "0BfILaNw8CW0AKHmq3CT")
var plotly = require('plotly')("kaviul","RX4q02OWUKAzP3Yxsc7w")


var data =
{
x: [],
y: [],
type: "scatter",
name:"Database"
};


//MongoDB Connection

try{
    mongoose.connect(url, {useUnifiedTopology: true},
        () => console.log("Mongoose connected"),
        );
    } catch (e) {
        console.log("Mongoose not connected!");
    }

    const db = mongoose.connection
    
    db.on('error', (err) => {
        console.log(err)
    })
    
    db.once('open', () => {
        console.log("Database Connection Established!");
        //setInterval(() => sensortest(data), 10000);

        // try{
        //     db.collection('data').updateOne({
        //         id: 0,
        //         name: "temperaturesensor",
        //         address: "221 Burwood Hwy, Burwood VIC 3125"
            
        //     }, {
        //         $push : {
        
        //             time: {$each: ["check 1" ,"check2" ,"check3"]}
                       
        //         }
      
        //     }), () => console.log ("Mongo push worked!")
        //     } catch (e) {
        //         console.log("Mongoose push not working!");
        //     }

        
    })
   
    

setInterval(sensortest, 10000);

  function sensortest(data){


    //Sensor Data

    const iotData = fs.readFileSync("E:/Deakin Uni/S779/Trimester 2 (2023)/SIT729/Task 4/sensorData_4.4HD.txt").toString('utf-8')
    //console.log(iotData);
try{
    const sensordata = {
        id: 0,
        name: "temperaturesensor",
        address: "221 Burwood Hwy, Burwood VIC 3125",
        time: Date.now(),
        sensorData: iotData
        }
    
        // const low = 10;
        // const high = 40;
        // reading = Math.floor(Math.random() * (high - low) + low);
        // sensordata.temperature = reading;
    
    const jsonString = JSON.stringify(sensordata);
    console.log(jsonString);
    
    const newSensor = new Sensor({
        id: sensordata.id,
        name: sensordata.name,
        address: sensordata.address,
        time: sensordata.time,
        sensorData: sensordata.sensorData
        });

        

        newSensor.save().then(doc => {
    
            time = sensordata.time;
            console.log(doc);
            //endtime = Date.now();
            //elapsed = ((endtime-time)/1000);
            
            //time = sensordata.time;
           // console.log("Start-time: ", time);
           // console.log("Time elapsed: ", elapsed, "sec");

           db.collection("data").aggregate([
            // First Stage
            {
              $bucket: {
                groupBy: "$time",                        // Field to group by
                output: {                                     // Output for each bucket
                  "id": 0,
                  "name": "temperaturesensor",
                  "address" : "221 Burwood Hwy, Burwood VIC 3125",

                  "sensor_data" :
                    {
                      $push: {
                        "time": "$time",
                        "sensorData": "$sensorData"
                      }
                    }
                }
              }
            },
           // Second Stage
            // {
            //   $match: { count: {$gt: 3} }
            // }
          ] )
           
    
            

        
          
          

       //Data Push to Plotly-MongoDb

        data.x.push((new Date()).toISOString());
        data.y.push(time);
        var graphOptions = {filename: "temperature_sensor-mongodb", fileopt:
        "overwrite"};
        plotly.plot(data, graphOptions, function (err, msg) {
        if (err) return console.log(err);
        console.log(msg);
        });

        }).then(() => {
        //mongoose.connection.close();
        console.log("MongoDB still open");
        });

    } catch (error) {
        console.error('Error in sensortest:', error);
        //mongoose2.close(); // Close the Service 2 MongoDB connection 
      } 

      
      
    
      
      
}

