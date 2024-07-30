"use strict";

const getAuthRoutes = (authProvider, router) => {
    // authentication routes
    router.get('/api/sso/login', authProvider.signIn);
    router.get('/api/sso/logout', authProvider.signOut);
    router.post('/api/sso/validate-sso-token', authProvider.validateAuthAccessToken);    
    return router;
}

module.exports = getAuthRoutes;