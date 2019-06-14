$(function () {
    var page = "{{ config.developerPortalUri }}/test/azure";

    var tld = "{{ config.developerPortalUri }}";
    tld = tld.slice(tld.lastIndexOf('.',0) + 1, tld.length);
    
    var config = {
        clientID: {ml: "38a556ba-7d87-4435-af41-00d367ffa5d1", tk: "83685618-61d5-48fd-80f3-8b73c118235c",  ga: "ab5b7724-ce89-42a4-9213-c8afb77d84f2", net: "c17f2d71-d6cb-4aa9-9c3f-8760e56a0ec8"}[tld],
        authority: "https://login.microsoftonline.com/tfp/" + "phantauth" + ".onmicrosoft.com/b2c_1_login",
        scopes: ["openid", "profile", "email", "phone", "address"]
        };
    var msal = new Msal.UserAgentApplication(config.clientID, config.authority, redirectCallback, {storeAuthStateInCookie: true, cacheLocation: "localStorage"});

    function redirectCallback() {
        var claims = jwt_decode(arguments[1]);
        if ( claims.emails ) {
            claims["email"] = claims.emails[0];
        }
        if ( ! claims.picture ) {
            claims["picture"] = "{{ config.developerPortalUri }}/icon/guest.svg"
        }
        localStorage.setItem(page, JSON.stringify(claims));
        window.location.hash = ''
        history.pushState("", document.title, window.location.pathname);
        update();
    }

    function beforeLogin() {
        $('.after-login').hide()
        $('.before-login').show()
      }
  
    function afterLogin() {
        $('.before-login').hide()
        $('.after-login').show()
    }

    function login() {
        beforeLogin();
        msal.loginRedirect(config.scopes);
    }

    function getTenant() {
        //return window.location.hostname.split(".").join('');
        return "phantauth";
    }

    function isLoggedIn() {
        return localStorage.getItem(page)
    }

    function getProfile() {
        return JSON.parse(localStorage.getItem(page));
    }

    function update() {
        var bindings = {}
        bindings['user'] = getProfile();
        rivets.bind($('#user'), bindings);
        afterLogin();
    }

    function logout() {
        localStorage.removeItem(page);
        window.location.replace(page)
        return false;
    }

    $("#login").click(login);
    $("#logout").click(logout);

    if (isLoggedIn()) {
        update();
    } else if (window.location.href.endsWith("?") || window.location.hash != '') {
        login();
    } else {
        beforeLogin();
    }
    
});
