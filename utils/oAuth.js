const CryptoJS = require('crypto-js');
// --------------------------------- \\

const chalk = require('chalk'),
	log = console.log,
	msg = chalk.bold.blue,
	scs = chalk.bold.green,
	err = chalk.bold.red,
	wrn = chalk.bold.yellow;
// --------------------------------- \\

function calculateNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	nonce = text;
	log(msg('Func-NONCE -----> ') + wrn(nonce));
	return nonce;
}

function calculateTimestamp() {
	const timeStamp = Math.round(+new Date() / 1000);
	log(msg('Func-TIMESTAMP -> ') + wrn(timeStamp));
	return timeStamp;
}

function calculatesignature(consumerSecret, tokenSecret, baseString) {
	const key = consumerSecret + '&' + tokenSecret;
	const hmacsha256Data = CryptoJS.HmacSHA256(baseString, key);
	const base64EncodedData = hmacsha256Data.toString(CryptoJS.enc.Base64);
	const signature = encodeURIComponent(base64EncodedData);

	log(msg('Func-SIGNATURE -> ') + wrn(signature));
	return signature;
}

function buildOAuth(consumerKey, tokenId, httpAction, url) {
	const parameters = paramfy(url);
	log(msg('OAUTH OBJ ------> ') + wrn(JSON.stringify(parameters)) + '\n');
	const data = encapsulateData(parameters, consumerKey, tokenId);
	const encodedData = encodeURIComponent(data.dataString);
	const baseString = httpAction + '&' + encodeURIComponent(parameters.newUrl) + '&' + encodedData;
	const signature = calculatesignature(process.env.CONSUMER_SECRET, process.env.TOKEN_SECRET, baseString);

	return { signature, timestamp: data.timestamp, nonce: data.nonce };
}

function paramfy(url) {
	/**
	 * ! Function to separete the Request URL parameters if any;
	 * * Separate the deploy & script parameters;
	 * * Save the url without parameters;
	 */

	let requestParams = url.split('?');
	const newUrl = requestParams[0];
	requestParams = requestParams[1].split('&');

	const script = requestParams.find((el) => {
		if (el.includes('script')) {
			return el;
		}
	});
	log(msg('SCRIPT ---------> ') + script);

	const deploy = requestParams.find((el) => {
		if (el.includes('deploy')) return el;
	});
	log(msg('DEPLOY ---------> ') + deploy);

	const others = requestParams.filter((el) => {
		if (!el.includes('deploy') && !el.includes('script')) {
			return el;
		}
	});
	log(msg('OTHER PARAMS ---> ') + others + '\n');

	return {
		newUrl,
		script,
		deploy,
		others
	};
}

function encapsulateData(parameters, consumerKey, tokenId) {
	/**
	 * ! Is necessary to sort() the data that will be encoded;
	 * * The parameters order needs to be sorted alphabetically;
	 */
	const oauth_signature_method = 'HMAC-SHA256';
	const oauth_version = '1.0';
	const nonce = calculateNonce();
	const timestamp = calculateTimestamp();
	const oauth_consumer_key = consumerKey;
	const oauth_token = tokenId;

	const data = [
		'oauth_version=' + oauth_version,
		'oauth_timestamp=' + timestamp,
		'oauth_consumer_key=' + oauth_consumer_key,
		'oauth_nonce=' + nonce,
		'oauth_signature_method=' + oauth_signature_method,
		'oauth_token=' + oauth_token
	];

	for (let i = 0; i < parameters.others.length; i++) {
		data.push(parameters.others[i]);
	}
	data.push(parameters.deploy);
	data.push(parameters.script);

	const arrange = data.sort();

	let dataString = '';
	for (let i = 0; i < arrange.length; i++) {
		dataString += arrange[i] + '&';
	}
	dataString = dataString.slice(0, dataString.length - 1);

	return {
		dataString,
		timestamp,
		nonce
	};
}

module.exports = { buildOAuth };
