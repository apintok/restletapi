# restletapi

Small App that allows authentication for Restlet Scripts with [oAuth 1.0](https://tools.ietf.org/html/rfc5849). The idea behind this project is to help developers quickly setup a secure authentication for their Restlet Integrations with NodeJS.

### Goals :checkered_flag:
* Calculates the three main ingredients needed for oAuth.
    1. Nonce
    2. Timestamp
    3. Signature
* Base String is built using URL encoded data
* Able to add more than the 2 basic parameters to the URL
* Build the Authorization Header string

### Difficulties ### :confused:
-> In order for oAuth to work the URL parameters used to built the _Signature_ need to be encoded in alphabetical order;

-> Rule above applies to all parameters entered in the encoded data.

```javascript
const arrange = data.sort();
```
The oAuth file of the project in the utils folder contains the responsible functions for building the oAuth scheme.

### Future Upgrades ###
* Upgrade the code structure;
* Improve a the functions handle the data;
* Use a function to build the Auth Header;
* _Perhaps change to a Javascript Classes approach_;
* Improve documentation;

___________________________

## How to use...

:construction::construction::construction::construction:
___________________________

###### Work in development as I'm still learning :computer: