const { MongoClient } = require('mongodb').MongoClient;
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://conversions:conversions2023@cluster0.czef0kv.mongodb.net/conversions?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db("conversions");


async function run() {
  try {
    
    // Get the database and collection on which to run the operation
    const conversions = database.collection("conversions");
	
	var date = new Date();
	var ts = Math.round(date.getTime() / 1000) + date.getTimezoneOffset() * 60;
	var idConversion = "conversion" + String(ts);
	
	// Create a document to insert
    const doc = {
      _id: idConversion,
	  username: "dipina",
      operation: "convertDecimal2Roman",
	  value: 100,
	  result: "X",
	  timestamp: ts
    }
    // Insert the defined document into the "haiku" collection
    const result = await conversions.insertOne(doc);
	console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // Query for a movie that has the title 'The Room'
    const query = { username: "dipina" };
    const options = {
      // Sort matched documents in descending order by rating
      sort: { "timestamp": -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, username: 1, operation: 1 },
    };
    // Execute query
    const conversion = await conversions.findOne(query, options);
    // Print the document returned by findOne()
    console.log(conversion);
  } finally {
    await database.close();
  }
}
run().catch(console.dir);