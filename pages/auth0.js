$(function () {
    var page = "{{ config.developerPortalUri }}/test/auth0";

    function beforeLogin() {
        $('.after-login').hide()
        $('.before-login').show()
      }
  
    function afterLogin() {
        $('.before-login').hide()
        $('.after-login').show()
    }
  
    var webAuth = new auth0.WebAuth({
        domain: 'phantauth.auth0.com',
        clientID: 'AvjtGofLwd9kflukRVdarg6DXCHhdaep',
        responseType: 'token id_token',
        scope: 'openid profile email address phone',
        redirectUri: page
    });

    function login() {
        webAuth.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = ''
                history.pushState("", document.title, window.location.pathname);
                update(authResult)
            } else if (err) {
                console.log(err);
            } else {
                webAuth.authorize();
            }
        });
    }

    function logout() {
        localStorage.removeItem(page);
        beforeLogin();
        webAuth.logout({ returnTo: page });
        return false;
    }

    function isLoggedIn() {
        return localStorage.getItem(page)
    }

    function update(authResult) {
        localStorage.setItem(page, authResult.idTokenPayload);

        var bindings = {}
        bindings['user'] = authResult.idTokenPayload;
        rivets.bind($('#user'), bindings);
        afterLogin();
    }

    function renew() {
        webAuth.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken && authResult.idTokenPayload) {
                update(authResult);
            } else if (err) {
                console.log(err);
                logout();
            }
        });
    }

    $("#login").click(login);
    $("#logout").click(logout);

    if (isLoggedIn()) {
        renew();
    } else if (window.location.href.endsWith("?") || window.location.hash != '') {
        login();
    } else {
        beforeLogin();
    }
    
});
