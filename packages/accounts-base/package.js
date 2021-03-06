Package.describe({
  summary: "A user account system",
  version: "1.1.4-winr.2"
});

Package.onUse(function (api) {
  api.use('underscore', ['client', 'server']);
  api.use('localstorage', 'client');
  api.use('tracker', 'client');
  api.use('check', 'server');
  api.use('random', ['client', 'server']);
  api.use('ejson', 'server');
  api.use('callback-hook', ['client', 'server']);

  // use unordered to work around a circular dependency
  // (service-configuration needs Accounts.connection)
  api.use('service-configuration', ['client', 'server'], { unordered: true });

  // needed for getting the currently logged-in user
  api.use('ddp', ['client', 'server']);

  // need this because of the Meteor.users collection but in the future
  // we'd probably want to abstract this away
  api.use('mongo', ['client', 'server']);

  // If the 'blaze' package is loaded, we'll define some helpers like
  // {{currentUser}}.  If not, no biggie.
  api.use('blaze', 'client', {weak: true});

  // Allow us to detect 'autopublish', and publish some Meteor.users fields if
  // it's loaded.
  api.use('autopublish', 'server', {weak: true});

  api.use('oauth-encryption', 'server', {weak: true});

  api.export('Accounts');
  api.export('AccountsTest', {testOnly: true});

  api.addFiles('accounts_common.js', ['client', 'server']);
  api.addFiles('accounts_server.js', 'server');
  api.addFiles('url_client.js', 'client');
  api.addFiles('url_server.js', 'server');

  // accounts_client must be before localstorage_token, because
  // localstorage_token attempts to call functions in accounts_client (eg
  // Accounts.callLoginMethod) on startup. And localstorage_token must be after
  // url_client, which sets autoLoginEnabled.
  api.addFiles('accounts_client.js', 'client');
  api.addFiles('localstorage_token.js', 'client');
});

Package.onTest(function (api) {
  api.use('accounts-base');
  api.use('tinytest');
  api.use('random');
  api.use('test-helpers');
  api.use('oauth-encryption');
  api.addFiles('accounts_tests.js', 'server');
  api.addFiles("accounts_url_tests.js", "client");
});
