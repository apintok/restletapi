**v 1.0.0** :hammer:

---

## Introduction :open_book:

Small App that allows authentication for Restlet Scripts with [oAuth 1.0](https://tools.ietf.org/html/rfc5849). The idea behind this project is to help developers quickly setup a secure authentication for their Restlet Integrations with NodeJS.

---

## Requirements :file_folder:

**This App current version requires the following dependencies:**

- Express
- Axios
- Crypto-JS
- dotenv
- Chalk

**Please refer to package.json**

---

## Installation :pen:

1. Download the repo code

2. Run npm install

3. Create a config.env file

It's necessary to have a config.dev which will contain the authentication data that will be used to build the oAuth Object.

Note that there isn't a config.env file in this repo has it contains sensitive data. See below the structure:

---

## Current Funcionality :heavy_check_mark:

In order for oAuth to work with a different number of URL parameters, which are used to built the _Signature_. The URL parameters need to be encoded in alphabetical order;

Rule above applies to all parameters entered in the encoded data.

```javascript
const arrange = data.sort();
```

The oAuth file of the project in the utils folder contains the responsible functions for building the oAuth scheme.

---

## Next Steps / Working on :construction:

- UI
  - All details can been seen in the terminal;
  - ...
- JS Code
  - Apply a better DRY principle;
  - Use JS Classes for better data structuring;
  - Error handling using trycatch;
  - Remove extra dependencies;
  - Constant code improvements...
- Problems
  - There are several I bet. Work in progress...

---

## Errors :no_entry:

:construction::construction::construction:
