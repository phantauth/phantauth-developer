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
        url: ' https://my.api.mockaroo.com/users',
        data: { key: 'ce73f050' },
        dataType: 'json',
        success: function(data) {
            callback(toTeam(data));
        }
    });
}

function getUser(seed, callback) {
    $.ajax({
        url: ' https://my.api.mockaroo.com/user',
        data: { key: 'ce73f050' },
        dataType: 'json',
        success: function(data) {
            callback(toUser(data));
        }
    });
}

function toTeam(data) {
    var team = { name: PhantAuth.tenant.name , members: [], logo: PhantAuth.tenant.logo}
    var users = data;

    for(var i = 0; i < users.length; i++) {
        team.members.push(toSub(toUser(users[i])));
    }
    return team;
}

function toUser(user) {
    user.website = "https://mockaroo.com";
    return user;
}

function toSub(user) {
    return {sub: JSON.stringify(user), name: user.name, picture: user.picture};
}
