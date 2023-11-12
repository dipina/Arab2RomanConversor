/**
* @author @dipina 2021
* http://paginaspersonales.deusto.es/dipina
**/

var url = require("url");
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri="mongodb://127.0.0.1:27017/conversions";
const uri = "mongodb+srv://conversions:conversions2023@cluster0.czef0kv.mongodb.net/?retryWrites=true&w=majority";
var conversionsXML = "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

function retrieveConversions(response, responseText, openConnection=true) {
	var conversionsXMLTemp = "";
	
	async function run() {
		if (openConnection) {
			await client.connect();
		}
		try {
			// Get the database and collection on which to run the operation
			const database = client.db("conversions");
			const conversions = database.collection("conversions");
			// Query for conversions that have a runtime less than 15 minutes
			const query = { };
			const options = {
				// Sort returned documents in descending order by timestamp, i.e. the latest ones
				sort: { timestamp: -1 },
				// Include only the `username`, `operation`, `value` and `result` of each returned document
				projection: { _id: 0, username: 1, operation: 1, value: 1, result: 1, timestamp: 1 },
			};
			conversionsXMLTemp = "<conversions>";
			// Execute query 
			const cursor = conversions.find(query, options).limit(3);
			// Print a message if no documents were found
			if ((await conversions.countDocuments(query)) === 0) {
				console.log("No documents found!");
			}
			// Print returned documents
			for await (const doc of cursor) {
				console.dir(doc);
				conversionsXMLTemp += ("<conversion><timestamp>" + String(doc.timestamp) + "</timestamp><value>" + String(doc.value) + "</value><operation>" + String(doc.operation) + "</operation><result>" + String(doc.result) + "</result></conversion>");
			}
			conversionsXMLTemp += "</conversions>";
			conversionsXML = conversionsXMLTemp;
			console.log("*****" + conversionsXML);
			response.writeHead(200, {"Content-Type": "text/xml", "Cache-Control": "no-cache"});
			var content = (responseText + conversionsXML + "</result>");
			console.log("***Response: '" + content);
			response.write(content);
			response.end();
		} finally {
			if (openConnection) {
				await client.close();
			}
		}
	}
	run().catch(console.dir);
}

function save2DB(user, op, val, resu, response, responseText) {
	var date = new Date();
	var ts = Math.round(date.getTime() / 1000) + date.getTimezoneOffset() * 60;
	var idConversion = "conversion" + String(ts);

	async function run() {
		// Connect the client to the server	(optional starting in v4.7)
	    await client.connect();
		try {
			// Connect to the "insertDB" database and access its "haiku" collection
			const database = client.db("conversions");
			const conversions = database.collection("conversions");

			// Create a document to insert
			const doc = {_id: idConversion, username: user, operation: op, value: val, result: resu, timestamp: ts };
			// Insert the defined document into the "haiku" collection
			const result = await conversions.insertOne(doc);
			// Print the ID of the inserted document
			console.log(`A document was inserted with the _id: ${result.insertedId}`);
			retrieveConversions(response, responseText, false);
		} finally {
			// Close the MongoDB client connection
			//await client.close();
		}
	}
	// Run the function and handle any errors
	run().catch(console.dir);
}





function convertDecimal2Roman(req, res) {
	if (req.url != undefined) {
		var _url = url.parse(req.url, true);
		var pathname = _url.pathname;
		var num = 0;
		if(_url.query) {
			try {
				num = _url.query.num;
			} catch (e) {
			}
		}
		console.log("Conversor Decimal to Roman: " + pathname + " - num: " + num);
		var romanNum = converterDecimal2Roman(num);
		var content = "<result><message>" + romanNum + "</message>";
		save2DB("dipina", "convertDecimal2Roman", num, romanNum, res, content);
		
		
	} else {
		return "";
	}
}

function retrieveLastConversions(req, res) {
	var content = "<result>";
	retrieveConversions(res, content);
}



function convertRoman2Decimal(req, res) {
	var equivalenciasRomanoArabe = {"I": 1, 
									"V": 5,
									"X": 10,
									"L": 50,
									"C": 100,
									"D": 500,
									"M": 1000};
	if (req.url != undefined) {
		var _url = url.parse(req.url, true);
		var pathname = _url.pathname;
		var numRomano = 0;
		if(_url.query) {
			try {
				numRomano = _url.query.num;
			} catch (e) {
			}
		}
		console.log("Conversor Roman to Decimal: " + pathname + " - num: " + numRomano);
	
		var maxRomanDigit = -1;
		var valorArabeCalculado = 0;
						
		for (var i=numRomano.length-1; i>=0; i--) {
			var carRomano = (numRomano.charAt(i) + "").toUpperCase(); 
			if (!equivalenciasRomanoArabe[carRomano]) {
				return "<message>ERROR: " + carRomano + " en n�mero romano " + numRomano + " no es v�lido";
			} else {
				var valor = equivalenciasRomanoArabe[carRomano];
				if (valor >= maxRomanDigit) {
					maxRomanDigit = valor;
					valorArabeCalculado += valor;
				} else {
					valorArabeCalculado -= valor;
				}
			}
		}
		var content = "<result><message>" + valorArabeCalculado + "</message>";
		save2DB("dipina", "convertRoman2Decimal", numRomano, valorArabeCalculado, res, content);
	} 
}



function converterDecimal2Roman(num) {
	console.log("Conversor num: " + num);
	if ((num < 4000) && (num >= 0)) {
		if (num >= 1000) {
			return "M" + (converterDecimal2Roman(num-1000));
		} else if (num >= 900) {
			return "CM" + (converterDecimal2Roman(num-900));
		} else if (num >= 500) {
			return "D" + (converterDecimal2Roman(num-500));
		} else if (num >= 400) {
			return "CD" + (converterDecimal2Roman(num-400));
		} else if (num >= 100) {
			return "C" + (converterDecimal2Roman(num-100));
		} else if (num >= 90) {
			return "XC" + (converterDecimal2Roman(num-90));
		} else if (num >= 50) {
			return "L" + (converterDecimal2Roman(num-50));
		} else if (num >= 40) {
			return "XL" + (converterDecimal2Roman(num-40));
		} else if (num >= 10) {
			return "X" + (converterDecimal2Roman(num-10));
		} else if (num >= 9) {
			return "IX" + (converterDecimal2Roman(num-9));
		} else if (num >= 5) {
			return "V" + (converterDecimal2Roman(num-5));
		} else if (num >= 4) {
			return "IV" + (converterDecimal2Roman(num-4));
		} else if (num >= 1) {
			return "I" + (converterDecimal2Roman(num-1));
		} else if (num == 0) {
			return "";
		}
	} else {
		return "ERROR: Invalid decimal number, it has to be between 1 and 3999";
	}
}

exports.convertDecimal2Roman = convertDecimal2Roman;
exports.convertRoman2Decimal = convertRoman2Decimal;
exports.retrieveLastConversions = retrieveLastConversions;

function read(req) {
	var content = "";
	var _url = url.parse(req.url, true);
	var pathname = _url.pathname;
	console.log("Request for " + pathname + " received.");
	if(_url.query) {
		content += "<br><br>Ohh! You have also provided me below data - <ul>";
		for(i in _url.query) {
			content += "<li>" + i + " = " + _url.query[i]  +"</li>";
		}
		content += "</ul>";
	}
	return content;
}