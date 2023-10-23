0. Lanzar MongoDB e Instalar HEROKU:
	mongod --dbpath data\db
	
	npm install -g heroku
	
1. Arrancar en local Heroku: (requiere instalación previa de Heroku toolbelt: https://toolbelt.heroku.com/)
	heroku local web
2. Averiguar versión actual de node:
	node --version
3. Edit package.json and add:
"engines": {
    "node": "14.17.6"
  },
4. Instalar dependencias: (npm install -g heroku)
	npm install
5. heroku local web
6. Registrarse en heroku dashaboard: https://dashboard.heroku.com/apps
7. Crear repositorio GIT:
	git init
8. Añadir ficheros:
	git add .
9. Hacer un commit en local:
git commit -m "Added app files."
***10. Logearte en heroku:
	heroku login
***11. Crear la app en HEROKU, recordar URL de app:
	heroku create
12. Subir los ficheros a la app creada:
	git push heroku master
13. Instalar el add:on gratuito de ObjectRocket for MongoDB:
MongoLab no soportado desde 10 de Noviembre de 2020, por lo tanto, pasamos a ObjectRocket for MongoDB (https://devcenter.heroku.com/articles/ormongo)

	#heroku addons:create mongolab
	#heroku addons:create mongolab
	
	heroku addons:create ormongo:5-mmap
	heroku config:get ORMONGO_RS_URL
	
	Now we’ll go to the dashboard to create the app database and the app user for accessing the database.
	heroku addons:open ormongo
	
	Añadir una nueva base de datos llamada 'conversions' con username 'conversions' y contraseña 'conversions'
	
	No funciona porque es de pago
	
	Register in https://www.mongodb.com/es/cloud/atlas/register
	Create database in shared cluster
	Important to allow access from anywhere
	In the connect option choose driver 2.2 onwards, old version. 
	Database: conversions
	username: conversions
	password: conversions2022
	
	Check logs of your app: https://dashboard.heroku.com/apps/cryptic-reaches-27527/logs
	
	
13. Recuperar la URL creada de la BBDD:
	#heroku config | grep MONGODB_URI
	#heroku config:get MONGODB_URI
	
	heroku config | grep ORMONGO_RS_URL
	
	Coger string accesible en ventana de BBDD de ObjectRocket
	heroku config:get ORMONGO_RS_URL  
	
	
12. Modificar el string de conexión de MongoClient en urlResponseHandlers.js con URL de MongoLab
***13. Subir cambios a repositorio local y luego remoto:
	git add .
	git commit -m "Changed mongodb url"
	git push heroku master
***14. Ir a la app y ejecutarla, por ejemplo: https://tranquil-sands-02417.herokuapp.com/app.html
	Para averiguar URL simplemente: 
		heroku open


Some useful commands:
---------------------

heroku create
git push heroku master
heroku ps:scale web=1
heroku open
	
heroku ps
heroku ps:scale web=1
heroku run bash
https://lit-lake-34010.herokuapp.com



Initialize a git repository in a new or existing directory
$ heroku create
$ heroku list
$ git init
$ heroku addons:create mongolab --app <app-name>
$ heroku config:get MONGODB_URI --app <app-name> 
Modify urlresponsehandlers.js changing MongoClient.connect calls with the connection string returned by heroku config | grep MONGODB_URI
Deploy your application.  Commit your code to the repository and deploy it to Heroku using Git.
$ git add .
$ git commit -am “committing app contents“
$ heroku git:remote -a <app-name>
$ git push --force heroku master
Ping the app
heroku ps:scale web=1 --app <app-name>
heroku open
Para depurar la app en remoto usar_
heroku logs --tail


