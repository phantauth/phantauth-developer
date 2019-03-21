
var endpoint = 'https://randomuser.me/api/';

PhantAuth.get = function (kind, name, callback) {
    switch(kind) {
        case "user":
          getUser(name, callback);
          break;
        case "team":
          getTeam(name, callback);
          break;
        default:
          console.log("Invalid kind parameter: " + kind);
    }
}

function getTeam(seed, callback) {
    $.ajax({
        url: endpoint,
        data: { results: 5, seed: seed },
        dataType: 'json',
        success: function(data) {
            callback(toTeam(data.results));
        }
    });
}

function getUser(seed, callback) {
    $.ajax({
        url: endpoint,
        data: { results: 1, seed: seed },
        dataType: 'json',
        success: function(data) {
            callback(toUser(data.results[0]));
        }
    });
}

function toTeam(users) {
    var team = { name: PhantAuth.tenant.name , logo: PhantAuth.tenant.logo, members: []}

    for(var i = 0; i < users.length; i++) {
        team.members.push(toSub(toUser(users[i])));
    }
    return team;
}

function firstUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function toUser(data) {
    var user = {}
    user.given_name = firstUpper(data.name.first);
    user.family_name = firstUpper(data.name.last);
    user.name = user.given_name + " " + user.family_name;
    user.gender = data.gender;
    user.email = data.email;
    user.preferred_username = data.login.username;
    user.password = data.login.password;
    user.birthdate = data.dob.date.substring(0,10);
    user.picture = data.picture.large;
    user.zoneinfo = "GMT" + data.location.timezone.offset;
    user.phone_number = data.phone;
    user.address = {
        country: data.nat,
        street_address: data.location.street,
        locality: data.location.city,
        region: data.location.state,
        postal_code: data.location.postcode
    };
    user.website = "https://randomuser.me";
    return user;
}

function toSub(user) {
    return {sub: JSON.stringify(user), name: user.name, picture: user.picture};
}
