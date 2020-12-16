const express = require('express');
const { buildOAuth } = require('../utils/oAuth');
const getData = require('../utils/apiFeatures');

const router = express.Router();
// --------------------------------- \\

const chalk = require('chalk'),
	log = console.log,
	msg = chalk.bold.blue,
	scs = chalk.bold.green,
	err = chalk.bold.red,
	wrn = chalk.bold.yellow;
// --------------------------------- \\

router.get('/restletapi', async (req, res, next) => {
    try {
        const deploy = process.env.DEPLOY;
        const script = process.env.SCRIPT;
        const params = process.env.PARAMS;
        const url = process.env.RESTLET_URL + 'script=' + script + '&deploy=' + deploy + params;
    
        const oAuth = buildOAuth(process.env.CONSUMER_KEY, process.env.TOKEN_ID, 'GET', url);

        let authHeader = 'OAuth realm="' + process.env.REALM + '",';
        authHeader += 'oauth_consumer_key="' + process.env.CONSUMER_KEY + '",';
        authHeader += 'oauth_token="' + process.env.TOKEN_ID + '",';
        authHeader += 'oauth_signature_method="' + 'HMAC-SHA256' + '",';
        authHeader += 'oauth_timestamp="' + oAuth.timestamp + '",';
        authHeader += 'oauth_nonce="' + oAuth.nonce + '",';
        authHeader += 'oauth_version="' + '1.0' + '",';
        authHeader += 'oauth_signature="' + oAuth.signature + '"';

        log('Auth Header -> ', authHeader + '\n');

        const headers = {
            Authorization: authHeader,
            'Content-Type': 'application/json'
        }

        const data = await getData(url, headers);
        log(scs(JSON.stringify(data)));

        res.status(200).json({
            status: 'success',
            msg: 'Connection Successful',
            data
        });
    } catch (error) {
        log(err(`Error --> ${error}`));
        res.status(400).json({
            status: 'failed',
            error
        });
    }
});

module.exports = router;