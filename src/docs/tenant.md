---
path: "/doc/tenant"
title: "Tenant"
index: 3
---

# Tenant

The internal structure of PhantAuth is modular enough to allow certain elements to be customized or even replaced. The customized PhantAuth instances can be considered as separate services, which are independent from the original one. For the sake of simplicity, the customized PhantAuth instances will be called **tenants**. 

The customized PhantAuth instances (tenants) have a different URL from that of the default tenant. For technological and cloud hosting purposes, it is advised that only the beginning of the path component of these URLs differs from the default PhantAuth URL. Similarly, the path component of a tenant URL should start with a low line character ("_"). So the general format of a tenant URL is:

```
https://phantauth.net/_TENANT
```

where `TENANT` is the name of the tenant. The tenant name is a DNS domain name at the same time, which may lack `.phantauth.net` or `.phantauth.cf` from the end.

## DNS for configuration

When desiging PhantAuth, the aim is that PhantAuth can run without a database, and it is configurable by the users. This can be achieved if for the purpose of storing the tenant configuration, the system uses the special TXT records of the Domain Name System (DNS), in compliance with the [RFC 6763](https://tools.ietf.org/html/rfc6763) specifications. So the tenant name is one or more DNS TXT records. These TXT records contain the configuration properties in NAME=VALUE format.

This allows anyone to create their own tenants by creating a DNS domain and the TXT records in that domain. [Freenom](https://www.freenom.com), a service provider, allows you to register some top-level domains (.tk, .ml, .ga, .cf, .gq) free charge. The domain registered this way can be managed on the online interface of Freenom or transferred to an other free service provider offering a more convenient DNS name server (e.g. [CloudFlare](https://www.cloudflare.com/)). Additionally, [FreeDNS](https://freedns.afraid.org/) allows you to create DNS records within a second- or third level domain that is privately owned or shared with a community. In this case, you are advised to create the entries within the `phantauth.cf` domain, because here you can omit the `.phantauth.cf` from the tenant name in the URL. This means that a tenant with a name of `mytenant.phantauth.cf` can be referred to in the shorther `https://phantauth.net/_mytenant` format, rather than the longer `https://phantauth.net/_mytenant.phantauth.cf` URL . Similar to `.phantauth.cf`, the `phantauth.net` can be omitted, thus the officially supported and the example tenants can be referred to by their short names (e.g. https://phantauth.net/_faker).

In a nutshell, to create a tenant, you have the following options:

- With TXT records in a domain registered at Freenom, either on the online interface of Freenom or that of another free DNS service provider (e.g. CloudFlare).

- With TXT records created in a second- or third level domain shared with a community, by using FreeDNS.

- With TXT records created in your own existing DNS domain, by the use of an any DNS software.

## Parameters

The below table contains a summary of the tenant parameters having an effect on the operation of the tenants.

Property | Description
--- | ---
[name](#name) | the displayed name of the tenant
[flags](#flags) | generator flags having an effect on the login page
[theme](#theme) | the address of the Bootstrap theme
[template](#template) | the address of the HTML page templates
[factory](#factory) | the address of the external user generator
[depot](#depot) | the address of the external user database
[sheet](#sheet) | the identifier of the Google Sheets document containing the user database
[script](#script) | the JavaScript URL inserted in the HTML pages
[summary](#summary) | a one-line summary of the tenant
[about](#about) | a detailed description of the tenant
[attribution](#attribution) | the specifications of the external source
[logo](#logo) | the logo of the tenant
[favicon](#favicon) | the favicon of the tenant's web pages

### name

The displayed name of the tenant is defined in the `name` parameter. In lack of such a name, the tenant's DNS name is displayed. This name appears in the address bar of the tenant's webpages.

### flags

This parameter contains the flags that affect the operation of a tenant (see [Flags](generator#flags)). Currently, the flags affecting the team size are used in the login screen. If any of the flags is a team size flag, you can select the user from a list in the login screen, rather than using an input field. It can take the following values:

- tiny
- small
- medium
- large

### theme

The HTML page templates of a tenant are created by the use of the Bootstrap library. This allows you to customize the layout and the colours of the pages by using external Bootstrap CSS files. The `theme` parameter contains the URL of the Bootstrap CSS file used in the pages. It is optional; in lack of such a parameter, the tenant's HTML pages have the default layout provided in the [PhantAuth developer portal](https://www.phantauth.net).

### template

The place of the HTML page templates of a tenant is specified by the `template` parameter. The value of the parameter is n [RFC 6570 - URI temaplate](https://tools.ietf.org/html/rfc6570) expression. The URI template receives the page name in a `resource` parameter.

The default value of the `template` parameter:

```
https://default.phantauth.net{/resource}
```

The `resource` URI template parameter may take the following values:

Value | Description
--- | ---
tenant.html | the tenant's webpage; it contains a short description and the entry points of the tenant 
user.html | the user's profile page
login.html | the login page used for signing in
consent.html | the content page used for signing in
team.html | the profile page of the user group
client.html | the profile page of a client
fleet.html | the profile page of the client group
policy.html | the client's privacy policy
tos.html | a client's terms of service
test.html | a login test page of the user generator and OpenID Connect

If you use your own template, the pages are fully customizable. The templates use a template engine called [Thymeleaf](https://www.thymeleaf.org/), which provides flexible template options. The source of the default template is available in the [phantauth-default](https://github.com/phantauth/phantauth-default) GitHub repository. If you wish to create your own templates, you are advised to produce them from these templates.

### factory

PhantAuth allows you to use your own random resource (user, team) generator. To do so, you need to provide its address in the `factory` tenant parameter. The value of the parameter is an [RFC 6570 - URI temaplate](https://tools.ietf.org/html/rfc6570) expression. The URI template receives the type of the object (user, team) to be generated in the `kind` parameter, and the identifier of the object to be generated in the `name` parameter.

### factories

In the `factories` parameter, you can specify the resource types that can be generated by the external generator set in the `factory` parameter. It takes the value of one or more strings from the following: `user`, `team`.

### depot

Instead of generating a user and team resource, you can randomly select them from a pre-created inventory. In this case, the URL of the CSV file containing the resources can be specified in the `depot` parameter. The value of the parameter is an [RFC 6570 - URI temaplate](https://tools.ietf.org/html/rfc6570) expression. The URI template receives the type of the object (user, team) to be generated in the `kind` parameter.

The first line of the CSV file contains the resource property names, the following lines, on the other hand, contain the relevant data.
In the case of nested properties, a "." character separates the elements of the property name (e.g. address.formatted).

### depots

In the `depots` parameter, you can specify the purpose of the external source set in the `depot` parameter. It takes the value of one or more strings from the following: `user`, `team`.

### sheet

You can randomly select the user data from a Google Sheets document. In the `sheet` parameter, you can specify the identifier of a public Google Sheets document. The first row of the table contains the user property names, the following rows contain the relating data. In the case of nested properties, a "." character is used to separate the elements of the property name (e.g. address.formatted).

The tenant named `gods` is an example for the use of the `sheet` parameter. It provides the user data in a [public Google Sheets](https://docs.google.com/spreadsheets/d/1Xa4mRcLWroJr2vUDhrJXGBcobYmpS8fNZxFpXw-M9DY/) document. In this case, the identifier of the sheet is `1Xa4mRcLWroJr2vUDhrJXGBcobYmpS8fNZxFpXw-M9DY`, and the associated TXT record is:

```
gods	120	IN	TXT	"sheet=1Xa4mRcLWroJr2vUDhrJXGBcobYmpS8fNZxFpXw-M9DY"
```

### script

You can automatically insert a custom JavaScript file in the login.html, consent.html, and test.html pages. The URL of this file can be specified in the `script` parameter. By inserting a custom JavaScript file, you can also integrate a client-side random user generator.

### summary

You can provide a short, one-line description, a watchword for the tenant in the `summary` parameter. It appears on the tenant's startup page and all the pages that contain a list of available tenants.

### about

To provide a detailed description of the tenant, use the `about` parameter. If it takes the value of a URL, the description is downloaded from the given URL; otherwise the value is the description itself. The description may have markdown formatting.

### attribution

It is an external data source. If you use a random user generator, you can specify the attribution in the `attribution` parameter. The attribution may have markdown formatting, that is, you can highlight any element or provide a link to an external source:

```
randomuser	120	IN	TXT	"attribution=User data generated using [RANDOM USER GENERATOR](https://randomuser.me/)."
```

### logo

It is the URL of the tenant's logo. The image at this address appears in the address bar of the tenant's webpages.

### favicon

Use the `favicon` parameter to provide the URL of the favicon. The image at this address appears as a shortcut icon in the browser when a user visits the tenant's webpages.

## Examples

PhantAuth offers several examples for creating a custom tenant. They are ready-to-use tenants, although primarily created to show examples for customization.

### faker

A [PhantAuth Faker](https://phantauth.net/_faker) tenant contains a generator built on the JavaScript Faker library. The generator runs on the serverless deployment platform of [ZEIT Now](https://now.sh), available free of charge. Its source code is accessible in the [phantauth-faker](https://github.com/phantauth/phantauth-faker) GitHub repository. Its DNS configuration is:

```
faker.phantauth.net. 120	IN	TXT	"factories=team"
faker.phantauth.net. 120	IN	TXT	"factories=user"
faker.phantauth.net. 120	IN	TXT	"flags=small"
faker.phantauth.net. 120	IN	TXT	"factory=https://phantauth-faker.now.sh/api{/kind,name}"
faker.phantauth.net. 120	IN	TXT	"userinfo=Dream Team"
faker.phantauth.net. 120	IN	TXT	"theme=https://stackpath.bootstrapcdn.com/bootswatch/4.2.1/united/bootstrap.min.css"
faker.phantauth.net. 120	IN	TXT	"logo=https://phantauth-faker.now.sh/faker-logo.svg"
faker.phantauth.net. 120	IN	TXT	"name=PhantAuth Faker"
```

### chance

A [PhantAuth Chance](https://phantauth.net/_chance) tenant contains a generator built on the JavaScript Chance library. The generator runs on the serverless deployment platform of [ZEIT Now](https://now.sh), available free of charge. Its source code is accessible in the [phantauth-chance](https://github.com/phantauth/phantauth-chance) GitHub repository. Its DNS configuration is:

```
chance.phantauth.net. 120	IN	TXT	"flags=small"
chance.phantauth.net. 120	IN	TXT	"name=PhantAuth Chance"
chance.phantauth.net. 120	IN	TXT	"factory=https://phantauth-chance.now.sh/api{/kind,name}"
chance.phantauth.net. 120	IN	TXT	"factories=team"
chance.phantauth.net. 120	IN	TXT	"factories=user"
chance.phantauth.net. 120	IN	TXT	"theme=https://stackpath.bootstrapcdn.com/bootswatch/4.2.1/united/bootstrap.min.css"
chance.phantauth.net. 120	IN	TXT	"logo=https://phantauth-chance.now.sh/chance-logo.png"
```

### casual

A [PhantAuth Casual](https://phantauth.net/_casual) tenant contains a generator built on the JavaScript Casual library. The generator runs on the serverless deployment platform of [Auth0 Webtask](https://webtask.io), available free of charge. Its source code is accessible in the [phantauth-casual](https://github.com/phantauth/phantauth-casual) GitHub repository. Its DNS configuration is:

```
casual.phantauth.net. 120	IN	TXT	"logo=https://www.phantauth.net/logo/phantauth-logo-gray.svg"
casual.phantauth.net. 120	IN	TXT	"name=PhantAuth Casual"
casual.phantauth.net. 120	IN	TXT	"factory=https://wt-51217f7b3eee6aead0123eeafe3b83e8-0.sandbox.auth0-extend.com/user{?name}"
casual.phantauth.net. 120	IN	TXT	"theme=https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
```

### gods

For the [Greek Gods](https://phantauth.net/_gods) tenant, the user data is contained in a [public Google Sheets](https://docs.google.com/spreadsheets/d/1Xa4mRcLWroJr2vUDhrJXGBcobYmpS8fNZxFpXw-M9DY/) document. Its DNS configuration is:

```
gods.phantauth.net.	120	IN	TXT	"attribution=God pictures come from  [Theoi Project](https://www.theoi.com/), a site exploring Greek mythology and the gods in classical literature and art."
gods.phantauth.net.	120	IN	TXT	"name=Greek Gods"
gods.phantauth.net.	120	IN	TXT	"flags=medium"
gods.phantauth.net.	120	IN	TXT	"theme=https://stackpath.bootstrapcdn.com/bootswatch/4.2.1/sandstone/bootstrap.min.css"
gods.phantauth.net.	120	IN	TXT	"logo=https://cdn.staticaly.com/favicons/www.theoi.com"
gods.phantauth.net.	120	IN	TXT	"sheet=1Xa4mRcLWroJr2vUDhrJXGBcobYmpS8fNZxFpXw-M9DY"
```

### randomuser

The [RANDOM USER](https://phantauth.net/_randomuser) tenant uses the popular https://randomuser.me service to generate random users. The randomuser.me service is called on the client side, the call is contained in the [randomuser.js](https://www.phantauth.net/selfie/randomuser.js) script given in the `script` parameter. Its DNS configuration is:

```
randomuser.phantauth.net.	120	IN	TXT	"attribution=User data generated using [RANDOM USER GENERATOR](https://randomuser.me/)."
randomuser.phantauth.net.	120	IN	TXT	"script=https://www.phantauth.net/selfie/randomuser.js"
randomuser.phantauth.net.	120	IN	TXT	"flags=small"
randomuser.phantauth.net.	120	IN	TXT	"name=RANDOM USER"
randomuser.phantauth.net.	120	IN	TXT	"logo=https://cdn.staticaly.com/favicons/randomuser.me"
randomuser.phantauth.net.	120	IN	TXT	"theme=https://stackpath.bootstrapcdn.com/bootswatch/4.2.1/sandstone/bootstrap.min.css"
```

### uinames

The [uinames](https://phantauth.net/_uinames) tenant uses the https://uinames.com service to generate random users. The uinames.com service is called on the client side, the call is contained in the [uinames.js](https://www.phantauth.net/selfie/uinames.js) script given in the `script` parameter. Its DNS configuration is:

```
uinames.phantauth.net.	120	IN	TXT	"attribution=User data generated using [uinames.com API](https://uinames.com)."
uinames.phantauth.net.	120	IN	TXT	"logo=https://uinames.com/assets/img/ios-precomposed.png"
uinames.phantauth.net.	120	IN	TXT	"flags=small"
uinames.phantauth.net.	120	IN	TXT	"theme=https://stackpath.bootstrapcdn.com/bootswatch/4.2.1/minty/bootstrap.min.css"
uinames.phantauth.net.	120	IN	TXT	"name=uinames"
uinames.phantauth.net.	120	IN	TXT	"script=https://www.phantauth.net/selfie/uinames.js"
```

### mockaroo

The [Mockaroo](https://phantauth.net/_mockaroo) tenant uses the https://mockaroo.com service to generate random users. The mockaroo.com service is called on the client side, the call is contained in the [mockaroo.js](https://www.phantauth.net/selfie/mockaroo.js) script given in the `script` parameter. Its DNS configuration is:

```
mockaroo.phantauth.net.	120	IN	TXT	"attribution=User data generated using [Mockaroo's Mock APIs](https://mockaroo.com/mock_apis)."
mockaroo.phantauth.net.	120	IN	TXT	"script=https://www.phantauth.net/selfie/mockaroo.js"
mockaroo.phantauth.net.	120	IN	TXT	"logo=https://www.phantauth.net/selfie/kongaroo.svg"
mockaroo.phantauth.net.	120	IN	TXT	"flags=small"
mockaroo.phantauth.net.	120	IN	TXT	"theme=https://stackpath.bootstrapcdn.com/bootswatch/4.2.1/minty/bootstrap.min.css"
mockaroo.phantauth.net.	120	IN	TXT	"name=Mockaroo"
```
