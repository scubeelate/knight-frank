
"use strict";

const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const credential = new DefaultAzureCredential();
// Build the URL to reach your key vault
const url = process.env.KEY_VAULT_URL;
// create our secrets client and connect to the service
const client = new SecretClient(url, credential);
const keyAttributes= [
{
    key:'LDAPS_URL',
    name:'LDAPSURL'
},
{
    key:'LDAPS_USER_NAME',
    name:'LDAPSUSERNAME'
},
{
    key:'APP_SECRET_KEY',
    name:'LDAPPASSWORD',
}
]
exports.loadKeys = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // const secretsProperties = keyAttributes
            // for (const secretsProperty of secretsProperties) {
            //     const latestSecret = await client.getSecret(secretsProperty.name);
            //     process.env[secretsProperty.key] = latestSecret.value
            // }
            resolve(true)
        } catch (e) {
            console.log(e)
            reject(e)
        }

    })
}
