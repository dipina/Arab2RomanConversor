0. Instalar MongoDB: https://www.mongodb.com/download
	a. Click en Community Server
	b. Recomiendo seleccionar "All version binaries". En Windows por ejemplo: win32/mongodb-win32-x86_64-2008plus-ssl-v4.0-latest.zip
	c. Extraer el ZIP
	d. Alterar variable de entorno PATH para incluir path a subdirectorio bin de mongodb
	e. Abril shell en subcarpeta bin de mondodb
	f. Crear directorio: mkdir data\db o mkdir data/db
	g. Arrancar mondodb: mongod --dbpath data\db
	h. Arrancar cliente de mongodb: mongo 
1. Arrancar MongoDB: mongod --dbpath data\db
2. Arranco la app: node index.js (aseguraros de ejecutar primera vez npm install)
3. Accedo al navegador en: http://localhost:3000