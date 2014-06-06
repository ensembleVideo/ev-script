define(function(require) {

    'use strict';

    var q = QUnit,
        _ = require('underscore'),
        cacheUtil = require('ev-script/util/cache'),
        eventsUtil = require('ev-script/util/events'),
        evSettings = require('ev-config'),
        FormsAuth = require('ev-script/auth/forms/auth'),
        BasicAuth = require('ev-script/auth/basic/auth'),
        NoneAuth = require('ev-script/auth/none/auth'),
        AppInfo = require('ev-script/models/app-info'),
        defaults = {
            // Callback called after config is setup
            configCallback: function() {},
            // Callback called before auth is setup
            preAuthCallback: function() {},
            // Callback called after auth is setup
            postAuthCallback: function() {},
            // Set to true to immediately authenticate
            authenticate: true
        };

    return {
        setupHelper: function(appId, options) {
            return function() {
                q.stop();
                var settings = _.extend({}, defaults, options);
                this.appId = appId;
                this.config = _.extend({}, evSettings);
                eventsUtil.initEvents(this.appId);
                cacheUtil.setAppConfig(this.appId, this.config);
                settings.configCallback.call(this);
                this.info = new AppInfo({}, {
                    appId: this.appId
                });
                cacheUtil.setAppInfo(this.appId, this.info);
                this.info.fetch({})
                .always(_.bind(function() {
                    settings.preAuthCallback.call(this);
                    switch (this.config.authType) {
                        case 'forms':
                            this.auth = new FormsAuth(this.appId);
                            break;
                        case 'none':
                            this.auth = new NoneAuth(this.appId);
                            break;
                        default:
                            this.auth = new BasicAuth(this.appId);
                            break;
                    }
                    cacheUtil.setAppAuth(this.appId, this.auth);
                    settings.postAuthCallback.call(this);
                    if (settings.authenticate && !this.auth.isAuthenticated()) {
                        this.auth.login({
                            username: evSettings.testUser,
                            password: evSettings.testPass
                        })
                        .then(function() {
                            q.start();
                        });
                    } else {
                        q.start();
                    }
                }, this));
            };
        },
        teardownHelper: function() {
            return function() {
                if (this.auth.isAuthenticated()) {
                    q.stop();
                    this.auth.logout()
                    .always(function() {
                        q.start();
                    });
                }
            };
        }
    };

});