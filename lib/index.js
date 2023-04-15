const run = (dirname = null) => {

	if (dirname == null || typeof dirname == 'undefined') {
		return console.log('Usage: elsg <dirname>')
	}

	const fs = require('fs');
	const { exec } = require('child_process');

	// Create the root folder for your application
	fs.mkdirSync(dirname);

	// Create the "app" folder
	fs.mkdirSync(dirname + '/app');

	// Create the "Http" folder
	fs.mkdirSync(dirname + '/app/Http');

	// Create the "Controllers", "Models", and "Views" folders inside "app"
	fs.mkdirSync(dirname + '/app/Http/Controllers');
	fs.mkdirSync(dirname + '/app/Http/Middlewares');
	fs.mkdirSync(dirname + '/app/Http/Requests');

	// Create the "routes" folder
	fs.mkdirSync(dirname + '/routes');

	// Create a sample "web.js" file inside "routes"
	fs.writeFileSync(dirname + '/routes/web.js', 'const express = require(\'express\');\nconst router = express.Router();\n\n// Define your application routes here\n\nrouter.get(\'/\', (req, res) => { res.send(\'Hello world\') })\n\nmodule.exports = router;');

	// Create a sample "api.js" file inside "routes"
	fs.writeFileSync(dirname + '/routes/api.js', 'const express = require(\'express\');\nconst router = express.Router();\n\n// Define your API routes here\n\nrouter.get(\'/\', (req, res) => { res.send(\'Hello world\') })\n\nmodule.exports = router;');

	fs.writeFileSync(dirname + '/index.js', "const express = require('express');\nconst app = express();\n\nconst multer = require('multer');\nconst upload = multer()\n\nconst port = process.env.PORT || 3000;\n\napp.use(express.static('public'));\n\napp.use(express.json())\napp.use(upload.array())\n\napp.use('/', require('./routes/web'));\napp.use('/api', require('./routes/api'));\n\napp.listen(port, () => {\n	console.log(`App listening at http://localhost:${port}`);\n});");

	// fs.writeFileSync(dirname + '/package.json', '{\n  "dependencies": {\n    "express": "^4.18.2",\n    "sequelize": "^6.31.0",\n    "sequelize-cli": "^6.6.0"\n  }\n}\n')

	// Create the "public" folder
	fs.mkdirSync(dirname + '/public');

	// Create "css", "js", and "img" folders inside "public"
	fs.mkdirSync(dirname + '/public/css');
	fs.mkdirSync(dirname + '/public/js');
	fs.mkdirSync(dirname + '/public/img');

	fs.writeFileSync(dirname + '/.sequelizerc', "const path = require('path');\n\nmodule.exports = {\n	'config': path.resolve('config', 'database.json'),\n	'models-path': path.resolve('./', 'app/Models'),\n	'seeders-path': path.resolve('./', 'database/seeders'),\n	'migrations-path': path.resolve('./', 'database/migrations')\n};")

	// install dependencies
	let execute = exec(`cd ${dirname} && npm install --save express sequelize sequelize-cli pg pg-hstore mysql2 express-validator multer && npx sequelize-cli init --models-path app/Models --migrations-path database/migrations --seeders-path database/seeders && npm install -g nodemon`)

	execute.stdout.on('data', (data) => {
		console.log(data)
	})

	execute.stdout.on('exit', (code) => {
		console.log(`child process exited with code ${code}`);

		console.log(`Project generated in folder ${dirname}`)
	})

}

module.exports = {
	run
}