$(function () {
    var issuer = "{{ config.serviceUri }}"
    var page = "{{ config.developerPortalUri }}/test/indieauth";

    function beforeLogin() {
        $('.after-login').hide()
        $('.before-login').show()
        $('#login').hide()
      }
  
    function afterLogin() {
        $('.before-login').hide()
        $('.after-login').show()
        $('#login').hide()
    }

    (function ($) {
        var re = /([^&=]+)=?([^&]*)/g;
        var decodeRE = /\+/g;
        var decode = function (str) { return decodeURIComponent(str.replace(decodeRE, " ")); };
        $.parseParams = function (query) {
            var params = {}, e;
            while (e = re.exec(query)) params[decode(e[1])] = decode(e[2]);
            return params;
        };
    })(jQuery);

    function login() {
        $("#redirect_uri").val(page)
        $("#client_id").val(page)
        $("#state").val(Math.random())
        $('.before-login').hide()
        var url = $("#url").val()
        var urlPrefix = issuer + '/~'
        if (!url || !url.startsWith(urlPrefix)) {
            url = urlPrefix + url
        }
        $("#url").val(url)
    }

    function token() {
        var params = $.parseParams(document.location.search.substring(1));
        window.location.hash = ''
        history.pushState("", document.title, window.location.pathname);
        var posting = $.post('https://indielogin.com/auth', { code: params.code, redirect_uri: page, client_id: page })
        posting.done(function (result) {
            harvest(result.me)
        }).fail(function (err) {
            console.log(err)
        })
    }

    function harvest(me) {
        $.get(me, function (data) {
            var options = { baseUrl: me, html: data, filter: ['h-card'] }
            var props = Microformats.get(options).items[0].properties;

            var user = { me: me }
            user.name = props.name[0]
            user.picture = props.photo[0]
            user.nickname = props.nickname[0]
            user.zoneinfo = props.tz[0]
            user.birthdate = props.bday[0]
            user.given_name = props['given-name'][0]
            user.family_name = props['family-name'][0]
            if (props['additional-name']) {
                user.middle_name = props['additional-name'][0]
            }
            user.email = props['email'][0]
            user.phone_number = props['tel'][0]
            var addr = props['adr'][0].properties
            user['address'] = {}
            user.address.country = addr['country-name']
            user.address.postal_code = addr['postal-code']
            user.address.locality = addr['locality']
            user.address.street_address = addr['street-address']

            localStorage.setItem('user', JSON.stringify(user));
            update()

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
        localStorage.removeItem(page);
        beforeLogin();
        return false;
    }

    $("#submit").click(login);
    $("#logout").click(logout);
    $("#form").submit(login)

    if (isLoggedIn()) {
        update()
    } else if (document.location.search == '') {
        beforeLogin();
    } else {
        token();
    }
});
