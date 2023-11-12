const { MongoClient } = require('mongodb');
//const uri = "mongodb+srv://conversions:conversions2022@cluster0.36o6n.mongodb.net/conversions?retryWrites=true&w=majority";
const uri = "mongodb+srv://conversions:conversions2023@cluster0.czef0kv.mongodb.net/conversions?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});