---
path: "/doc/integration"
title: "Integration"
index: 1
---

# Integration

Primarily, PhantAuth is an OpenID Connect Provider that supports the workflows listed in the OpenID Connect specifications (Hybrid, Implicit, Authorization Code), as well as the Resource Owner Password grant type, specified in the OAuth 2.0 specifications. The method of integration depends on the given authentication library or identity integrator service. This document contains the information and methods required for the integration, and demonstrates some steps of integration into a spcific environment.

## Parameters

Normally, the following parameters are required for the integration:

- [Issuer](#issuer)
- [Discovery Endpoint](#discovery-endpoint)
- [Authorization Endpoint](#authorization-endpoint)
- [Token Endpoint](#token-endpoint)
- [Client Credentials](#client-credentials)
- [Scope](#scope)

### Issuer

The Issuer URL identifies the OpenID Connect Provider. For PhantAuth default [tenant](tenant), it takes the following value:

```
https://phantauth.net
```

If PhantAuth is used, the Issuer URL also functions as a documentation web page that contains the information necessary for the use of the given [tenant](tenant).

### Discovery Endpoint

If the given authentication library supports the configuration protocol defined in chapter "Obtain OpenID Provider Configuration Information" of the OpenID Connect Discovery 1.0 specifications, you don't need to configure each endpoint. Although the specifications define the address of the Discovery Endpoint related to the Issuer URL, some authentication libraries require manual settings. For PhantAuth default [tenant](tenant), the address of the Discovery Endpoint is:

```
https://phantauth.net/.well-known/openid-configuration
```

### Authorization Endpoint

The address of the Authorization Endpoint is required for all three OpenID Connect Flows if the given authentication library does not implement the OpenID Connect Discovery specifications. For PhantAuth default [tenant](tenant), the address of the Authorization Endpoint is:

```
https://phantauth.ml/auth/authorize
```

### Token Endpoint

For the Authorization Code Flow and Hybrid Flow, you have to specify the Token Endpoint address, if the given authentication library does not implement the OpenID Connect Discovery specifications. For PhantAuth default [tenant](tenant), the address of the Token Endpoint is:

```
https://phantauth.ml/auth/token
```

### Client Credentials

To integrate with the OAuth 2.0 and OpenID Connect providers (similar to PhantAuth), the client program requires two essential credential values:  `client_id` and `client_secret`.

Contrary to the majority of OpenID Connect Providers, PhantAuth doesn't require a pre-registered client program. All client data is generated from the `client_id`, either in a random or a customized way.

#### Random client_id

The randomly generated clients are perfect for automated tests, or for trying PhantAuth. In this case, the client name or logo that the user can see, for example, on the consent page is irrelevant. To create a randomly generated client, you simply need to get the client endpoint of the PhantAuth generator without parameters and on each occasion, you'll get a new randomly generated client.

```bash
curl https://phantauth.net/client
```

In the response, the properties of the generated client will include the values of the `client_id` and `client_secret`.

```json
{
  "client_id": "domainer~bneq2uxl4ne",
  "client_secret": "HkXeFv39",
  "client_name": "Domainer",
  "software_id": "k-evxHCu77yOuXjiC21hug",
  "software_version": "8.9.9",
  "client_uri": "https://phantauth.net/client/domainer%7Ebneq2uxl4ne/profile",
  "logo_uri": "https://www.gravatar.com/avatar/ed23979b656f48420bec4552ce903baa?s=256&d=https%3A%2F%2Favatars.phantauth.net%2Ficon%2FqaQWD7dn.png",
  "logo_email": "domainer.VB3SUYQ@mailinator.com",
  "policy_uri": "https://phantauth.net/client/domainer%7Ebneq2uxl4ne/policy",
  "tos_uri": "https://phantauth.net/client/domainer%7Ebneq2uxl4ne/tos",
  "@id": "https://phantauth.net/client/domainer%7Ebneq2uxl4ne"
}
```

In this case, the client logo will be the gravatar picture that belongs to the email address associated with the `logo_email` in the response. The picture can be customized on gravatar.com.

#### Customized client_id

For a presentation or demo, it is advised to use a custom client, so that the client name and logo match the name and logo of the client used for testing or demonstration purposes. All you need to do is create a tagged email address at an email address provider that supports this solution. To separate the tag, the `+` character is normally used.

First, create an email account for testing purposes (you can also use your private email address, but it is not advised, because it will be included in the client_id and so, it will probably be used in a variety of logs).

```
mytestaccount@PROVIDER
```

The `PROVIDER` can be any provider that supports the use of tagged email addresses, like gmail.com, zoho.com, outlook.com, protonmail.com, etc.

Then create a tagged email address with the client name (e.g. "Super Toolbox"), and replace the space characters with a dot (messages sent to this email address will be delivered to the original `mytestaccount` mailbox).

```
mytestaccount+Super.Toolbox@PROVIDER
```

Use this email address as a `client_id` value. By setting the parameters of the PhantAuth client endpoint with this `client_id`, you can get the client data, including the `client_id`:

```bash
curl https://phantauth.net/client/mytestaccount%2bSuper.Toolbox@gmail.com
```

The response contains the `client_secret` value generated for the `client_id`.

```json
{
  "logo_email": "mytestaccount+super.toolbox@gmail.com",
  "client_id": "mytestaccount+super.toolbox@gmail.com",
  "client_secret": "0FnvGbKV",
  "client_name": "Super Toolbox",
  "tos_uri": "https://phantauth.ga/client/mytestaccount%2Bsuper.toolbox%40gmail.com/tos",
  "software_id": "iAVFmT30EG2fzz_kpS-fhA",
  "software_version": "3.0.3",
  "client_uri": "https://phantauth.ga/client/mytestaccount%2Bsuper.toolbox%40gmail.com/profile",
  "logo_uri": "https://www.gravatar.com/avatar/a4d8b22302e6111b5630b3e32827060b?s=256&d=https%3A%2F%2Favatars.phantauth.net%2Ficon%2FDdwpAXe1.png",
  "policy_uri": "https://phantauth.ga/client/mytestaccount%2Bsuper.toolbox%40gmail.com/policy",
  "@id": "https://phantauth.ga/client/mytestaccount%2Bsuper.toolbox%40gmail.com"
}
```

In this case, as you can see, the value of the `logo_email` is the email address given as a parameter, that is, the logo can be customized by customizing the gravatar. com avatar of the email address that you previously created. The `client_name` will be the name that you specified, the dot characters are replaced with space characters, and the initials of the words change to capital letters.

### Scope

PhantAuth supports the scope values specified in the OpenID Connect specifications, so any of them can be used. To get the user's standard data, the following scope list is required:

```
openid profile email phone address
```

In certain cases, the value of the `sub` claim returned by PhantAuth may be too long for the given environment (e.g. Auth0). In such cases, you can use the `uid` scope, that is, get the `uid` claim that contains the shortened user ID of the given user. The full list of supported scopes:

```
openid profile email phone address uid
```

The `uid` scope and claim are not standard values, they are PhantAuth-specific!

### User Info Endpoint

In general (with few exceptions), the authentication libraries do not require the setting of the User Info Endpoint, however, it may be useful if you want to get the data of the given user. For PhantAuth default [tenant](tenant), the address of the User Info Endpoint:

```
https://phantauth.ml/auth/userinfo
```

### Client Registration Endpoint

PhantAuth implements the OAuth 2.0 Dynamic Client Registration Protocol. If the given library supports dynamic registration, you don't need to set the credential values decribed in section [Client Credentials](#client-credentials). For PhantAuth default [tenant](tenant), the address of the Client Registration Endpoint:

```
https://phantauth.ml/auth/register
```

### JWKS Endpoint

In general, the authentication libraries don't require the setting of the JWKS Endpoint. For PhantAuth default [tenant](tenant), its value is:

```
https://phantauth.ml/auth/jwks
```

## Direct integration

The [oidc-client](https://github.com/IdentityModel/oidc-client-js) library enables the HTML/Javacript applications to easily integrate the OpenID Connect. When using this library, all you need is the `issuer` and the `client_id`.

```javascript
  Oidc.OidcClient(
    {
      authority: 'https://phantauth.net',
      client_id: 'mytestaccount+super.toolbox@gmail.com',
      redirect_uri: window.location.href,
      response_type: 'id_token token',
      scope: 'openid profile email phone address uid',
      filterProtocolClaims: false,
      loadUserInfo: false
    }
  );
```

To try and test the integration, you are advised to use the [OpenID Connect Test Page](https://www.phantauth.net/test/oidc). The source of the page can also be used as an example of integration.

## Auth0

[Auth0](https://auth0.com) is one of the most popular authentication integrator services designed to integrate a wide variety of identity providers into an application in a uniform manner. The scope of the integrated providers can be extended or modified without having to modify the application. As PhantAuth is only used for testing purposes, you are advised to integrate it in the application by the use of an integrator similar to Auth0, which will allow you to enable or disable it at any time. Additionally, it can be added to the various environments of the application (test, demo, etc.) without having to modify the application..

For integration with Auth0, you need the **Custom Social Connections** extension of Auth0, which is accessible in the **Extensions** menu option.

> ![extensions](img/auth0-extensions.png)

> ![custom social connections](img/auth0-custom-social-connections.png)

To define a new OpenID Connect connection, select the **NEW CONNECTION** button.

> ![new connection](img/auth0-new-connection.png)

In addition to the usual [parameters](#parameters), you need a JavaScript method that, in possession of the `access token`, gets the data of the signed-in user. The simplest way is to get the `userinfo endpoint`. The below code snippet gets the parameter and completes the required property mapping (the standard sub property of the OpenID Connect on the user_id property of Auth0):

```javascript
function(accessToken, ctx, cb) {
  request.get(
    'https://phantauth.net/auth/userinfo', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    },
    function(e, r, b) {
      if (e) return cb(e);
      if (r.statusCode !== 200)
        return cb(new Error(r.statusCode));
      var profile = JSON.parse(b);
      profile.user_id = profile.sub
      cb(null, profile);
    }
  );
}
```

To test the Auth0 integration, go to the PhantAuth [Auth0 Test Page](https://www.phantauth.net/test/auth0).
The page was created by the use of the *Auth0 JavaScript SDK*.

## Azure AD B2C

The Azure Active Directory B2C is a Microsoft-developed authentication integration solution for end-user applications. The OpenID Connect support is currently in preview status and allows the use of only a limited number of properties. As an identity provider integrator, it offers similar benefits when used with Auth0, that is, the application as an identity provider can be simply integrated into a PhantAuth test environment (test, demo, etc.), without any modification.

On the Azure portal, the configured identity providers are under the Azure AD B2C *Identity Providers* menu option.

> ![identity providers](img/azure-identity-providers.png)

To add a new provider, click on the **Add** button.

> ![add identity provider](img/azure-add-identity-provider.png)

Select **OpenID Connect** as the identity provider type, and set the PhantAuth parameters under the **Setup this identity provider** menu option. As the *OpenID Connect Discovery* is supported, you don't need to set the individual end-point addresses, setting the metadata URL is enough. Please note that, rather than the `issuer` URL, you need to set the full metadata URL recorded in the *OpenID Connect Discovery* specifications, that is, the '/.well-known/openid-configuration' suffix will obligatorily follow the issuer. For PhantAuth, you need to set the following URL:

```
https://phantauth.net/.well-known/openid-configuration
```

In addition to the usual parameters, you have to set the value of the *Response type*, which must be an `id_token`, and the value of the *Response mode*, which must be a `query`.

> ![setup identity provider](img/azure-setup-identity-provider.png)

In addition to the parameters, you also have to set a mapping, which defines how the OpenID Connect claims are assigned to the Azure AD B2C properties. To complete the assignment, you have to set the values provided in the following table:

Field label | Value
--- | ---
User ID | sub
Display Name | name
Given name | given_name
Surname | family_name
Email | email

> ![map identity providers claims](img/azure-map-this-identity-providers-claims.png)

To try the Azure AD B2C integration, go to the PhantAuth [Azure AD B2C Test Page](https://www.phantauth.net/test/azure).
The page was developed by the use of the *Microsoft Authentication Library for JavaScript (MSAL.js)*.

## Other Integrations

The above exmples are for demonstration purposes only, PhantAuth as a standard OpenID Connect provider can be integrated in any environment that supports the OpenID Connect standard.

## Framework Support

Every library/framework with OpenID Connect support will also support PhantAuth with some configuration parameters (e.g. authorization URL, token URL). Some of them directly support PhantAuth, without the above mentioned parameters.

  - Parse Server: [PhantAuth authData](https://docs.parseplatform.org/parse-server/guide/#phantauth-authdata) section in manual
  - Passport JS: [passport-phantauth](https://www.npmjs.com/package/passport-phantauth) strategy for authenticating with PhantAuth

