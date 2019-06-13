$(function () {
    var page = "{{ config.developerPortalUri }}/test/azure";

    var tld = "{{ config.developerPortalUri }}";
    tld = tld.slice(tld.length - 2, tld.length);
    
    var config = {
        clientID: {ml: "38fab7ea-8cd0-4010-b936-3afddf820ffd", ga: "a3ae1241-a324-4810-8514-ffcad1292f3b"}[tld],
        authority: "https://login.microsoftonline.com/tfp/" + "demophantauthga" + ".onmicrosoft.com/b2c_1_login",
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
        return "demophantauthga";
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
