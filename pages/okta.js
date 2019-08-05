$(function () {
    var issuer = "https://dev-433460.okta.com/oauth2/default"
    var page = "{{ config.developerPortalUri }}/test/okta";

    function beforeLogin() {
      $('.after-login').hide()
      $('.before-login').show()
    }

    function afterLogin() {
      $('.before-login').hide()
      $('.after-login').show()
    }

    function newClient() {
        return new Oidc.OidcClient({
            authority: issuer,
            client_id: '0oa120gyjvHMdBVmj357',
            redirect_uri: window.location.href,
            response_type: 'id_token token',
            scope: 'openid profile email address phone',
            filterProtocolClaims: false,
            loadUserInfo: true
        });
    }

    function login() {
        $('.after-login').hide()
        newClient().createSigninRequest({ state: { bar: Math.random() } }).then(function (req) {
            window.location = req.url;
        }).catch(function (err) {
            console.log(err);
        });
        return false;
    }

    function process() {
        var client = newClient();
        client.processSigninResponse().then(function (response) {
            window.location.hash = '';
            history.pushState("", document.title, window.location.pathname);
            client.createSignoutRequest(
                {id_token_hint: response.id_token, post_logout_redirect_uri: page}).then(function (request) {
                response.profile.logout = request.url;
                localStorage.setItem(page, JSON.stringify(response.profile));
                update()
            });
        }).catch(function (err) {
            console.log(err);
        });
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
        var url = getProfile().logout;
        localStorage.removeItem(page);
        window.location = url;
        return false;
    }

    $("#login").click(login);
    $("#logout").click(logout);

    if (isLoggedIn()) {
        update();
    } else if (window.location.hash != '') {
        process();
    } else {
      beforeLogin();
    }
});
