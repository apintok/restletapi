# restletapi

[oAuth 1.0](https://tools.ietf.org/html/rfc5849)

Small App that allows authentication for Restlet Scripts.
* Calculates the three main ingredients
    1. Nonce
    2. Timestamp
    3. Signature
* Base String is built using URL encoded data
* Able to add more than 2 parameters to the URL

### Difficulties ### :confused:
-> In order for oAuth to work the URL parameters used to built the _Signature_ need to be encoded in alphabetical order;

-> Rule above applies to all parameters entered in the encoded data.

```javascript
const arrange = data.sort();
```
The oAuth file of the project in the utils folder contains the responsible functions for building the oAuth scheme.

### Future Upgrades ###
* Upgrade the code structure;
* Improve a the functions handle the data
* _Perhaps change to a Javascript Classes approach_

___________________________

###### Work in development as I'm still learning :computer: