PhantAuth.get = function (kind, name, callback) {
    $.ajax({
        url: 'https://uinames.com/api/?ext&amount=5',
        dataType: 'json',
        success: function(data) {
            callback(toTeam(data));
        }
    });
}

function toTeam(data) {
    var team = { name: PhantAuth.tenant.name , logo: PhantAuth.tenant.logo, members: []}
    var users = data;

    for(var i = 0; i < users.length; i++) {
        team.members.push(toUser(users[i]));
    }
    return team;
}

function toUser(data) {
    var user = {}
    user.given_name = data.name;
    user.family_name = data.surname;
    user.name = user.given_name + " " + user.family_name;
    user.gender = data.gender;
    user.email = data.email;
    user.phone_number = data.phone;
    user.password = data.password;
    user.picture = data.photo;
    user.birthdate = new Date(data.birthday.raw).toISOString().slice(0,10)
    user.address = {
        country: data.region,
    };
    user.website = "https://uinames.com";
    return {sub: JSON.stringify(user), name: user.name, picture: user.picture};
}
