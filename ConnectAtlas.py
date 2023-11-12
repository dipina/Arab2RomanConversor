from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://conversions:conversions2023@cluster0.czef0kv.mongodb.net/conversions?retryWrites=true&w=majority"


# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.conversions

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print(db.list_collection_names())
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
    
    
