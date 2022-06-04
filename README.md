We all know most important feature in every application is authentication. To make that authentication much more secured and make better user experience we need to use refresh and access token based authentication in your app. You might be thinking what is refresh token?, why should we use?, how should we use ?

First let's take a look at older way of authenticating user which is called token based authentication.  When user logged in we send a access token which is valid for certain time. When that token expires we have to ask user again to login, Which is tedious user experience. To solve that problem we have to use refresh token.

A refresh token is nothing but a access token but it has life time about 1 or 2 months. Access token has expire time about 10 to 15 minutes. Whenever  this access token expire. we don't ask user to login again to get new access token instead we send refresh token to the server here we verify that token and send new access token to the client. with this method user don't have to login again and again. this makes user experience much more easier to user.

I hope you learn something new today.
