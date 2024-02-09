const util = require('gulp-util');
const fs = require('fs');

const env_folder = __dirname + '/environments';
const current_env = util.env.env || "development";

if (!environments().includes(current_env) ) {
    throw new ReferenceError(current_env + ' is not defined');
}

function environments() {
    let envs = [];
    
    let files = fs.readdirSync(env_folder);
    files.forEach(file => {
        envs.push(file.substr(0, file.lastIndexOf('.')));
    })
    
    return envs;
}

//module.exports.environments = environments();
module.exports.env = require(env_folder + '/' + current_env);