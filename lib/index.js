const run = (dirname = null) => {

	if (dirname == null || typeof dirname == 'undefined') {
		return console.log('Usage: elsg <dirname>')
	}

	const fs = require('fs');
	const { exec } = require('child_process');
	const path = require('path')

	// Create the root folder for your application
	fs.mkdirSync(dirname);

	// Create the "app" folder
	fs.mkdirSync(dirname + '/app');

	// Create the "Http" folder
	fs.mkdirSync(dirname + '/app/Http');

	// Create the "Controllers", "Models", and "Requests" folders inside "app"
	fs.mkdirSync(dirname + '/app/Http/Controllers');
	fs.mkdirSync(dirname + '/app/Http/Middlewares');
	fs.mkdirSync(dirname + '/app/Http/Requests');

	// Create the "routes" folder
	fs.mkdirSync(dirname + '/routes');

	// Create a sample "web.js" file inside "routes"
	fs.writeFileSync(dirname + '/routes/web.js', fs.readFileSync(path.join(__dirname,'src/routes/web.js')).toString());

	// Create a sample "api.js" file inside "routes"
	fs.writeFileSync(dirname + '/routes/api.js', fs.readFileSync(path.join(__dirname, 'src/routes/api.js')).toString());

	// Create entrypoint for a whole app
	fs.writeFileSync(dirname + '/index.js', fs.readFileSync(path.join(__dirname, 'src/index.js')).toString());

	// Create the "public" folder
	fs.mkdirSync(dirname + '/public');

	// Create "css", "js", and "img" folders inside "public"
	fs.mkdirSync(dirname + '/public/css');
	fs.mkdirSync(dirname + '/public/js');
	fs.mkdirSync(dirname + '/public/img');

	// Create sequelizesrc, used for custom models & migrations directory
	fs.writeFileSync(dirname + '/.sequelizerc', "const path = require('path');\n\nmodule.exports = {\n	'config': path.resolve('config', 'database.json'),\n	'models-path': path.resolve('./', 'app/Models'),\n	'seeders-path': path.resolve('./', 'database/seeders'),\n	'migrations-path': path.resolve('./', 'database/migrations')\n};")

	// install dependencies
	let execute = exec(`cd ${dirname} && npm install --save express sequelize sequelize-cli pg pg-hstore mysql2 express-validator multer app-module-path dotenv morgan compression && npx sequelize-cli init --models-path app/Models --migrations-path database/migrations --seeders-path database/seeders && npm install -g nodemon`)

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