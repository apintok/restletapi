const express = require('express');
const { buildOAuth } = require('../utils/oAuth');
const axios = require('axios');
const router = express.Router();

router.get('/restletapi', (req, res, next) => {
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

        console.log('Auth Header -> ', authHeader + '\n');

        const headers = {
            Authorization: authHeader,
            'Content-Type': 'application/json'
        }

        axios.get(url, { headers }).then(function (res) {
            console.log('RESPONSE1: ' + res.data.status);
            console.log('RESPONSE2: ' + res.data.msg);
            console.log('RESPONSE3: ' + res.data.results);
        }).catch(function (error) {
            console.log(error.response.status);
        })

        res.status(200).json({
            status: 'success',
            data: 'worls'
        });
    } catch (error) {
        console.log(`Error --> ${error}`);
        res.status(400).json({
            status: 'failed',
            error
        });
    }
});

module.exports = router;