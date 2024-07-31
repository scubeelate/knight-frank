const appSettings = () => {
    const domainName = process.env.BASE_URI || "localhost";
    
    let baseUri;
    let  port = process.env.PORT || 3001;
    
    // local development only
    if (domainName === 'localhost') {
        baseUri = `http://${domainName}:${port}`;
        console.log(`local development only baseUri = ${baseUri}`)
    } else {
        // deployed to AWS
        port = 8080;
        baseUri = `https://${domainName}.azurewebsites.net`;
        console.log(`deploy to Azure baseUri = ${baseUri}`)
    }
    
    const app_settings_values = {
        "host": {
            "port": port,
            "baseUri": baseUri,
            "domainName": domainName,
            "version":"3.8"
        },
        "credentials": {
            "clientId": process.env.AD_CLIENT_ID || "--",
            "tenantId": process.env.AD_TENANT_ID || "--",
            "clientSecret": process.env.AD_CLIENT_ID_SECRET || "--"
        },
        "settings": {
            "homePageRoute": `${process.env.CLIENT_URL}/validate-user-auth`,
            "redirectUri": `${process.env.CLIENT_URL}/validate-sso-token`,
            "postLogoutRedirectUri": `${process.env.CLIENT_URL}/login`,
            "UnAuthorizedRedirectUri": `${process.env.CLIENT_URL}/un-authorized`
        },
        "resources": {
            "graphAPI": {
                "callingPageRoute": "/profile",
                "endpoint": "https://graph.microsoft.com/v1.0/me",
                "scopes": ["user.read"]
            }
        }

    }
    return app_settings_values;
}

module.exports = appSettings;