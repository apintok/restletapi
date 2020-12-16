const axios = require('axios');
// --------------------------------- \\

const chalk = require('chalk'),
	log = console.log,
	msg = chalk.bold.blue,
	scs = chalk.bold.green,
	err = chalk.bold.red,
	wrn = chalk.bold.yellow;
// --------------------------------- \\

module.exports = getData = (url, headers) => {
    return axios.get(url, { headers }).then(function (res) {
        // log('STATUS: ' + scs(res.data.status));
        // log('\nMSG: ' + res.data.msg);
        // log('\nDATA: ' + JSON.stringify(res.data.results));
        return res.data;
    }).catch(function (error) {
        log('catch' + err(error.response.status));
        return error;
    });
}