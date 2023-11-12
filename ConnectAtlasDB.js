const express = require("express");
var MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.json());

//const uri = "mongodb+srv://conversions:conversions2022@cluster0.36o6n.mongodb.net/conversions?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const uri = "mongodb+srv://conversions:conversions2023@cluster0.czef0kv.mongodb.net/conversions?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
//const uri = "mongodb://conversions:conversions2023@cluster0.czef0kv.mongodb.net:27017/conversions?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((db) => {
		console.log("MongoDB successfully connected");
		var date = new Date();
		var ts = Math.round(date.getTime() / 1000) + date.getTimezoneOffset() * 60;
		var idConversion = "conversion" + String(ts);
		db.collection('conversions').insert({_id: idConversion, username: 'dipina', operation: 'conversor', value: "10", result: "X", timestamp: ts }, {w:1}, function(err, objects) {
			if (err) console.warn(err.message);
			if (err && err.message.indexOf('E11000 ') !== -1) {
				// this _id was already inserted in the database
				console.log("Error produced: " + err);
			} else {
				console.log("Información guardada: " + err);
			}
		});
		
	})
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));