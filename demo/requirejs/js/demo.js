(function() {

    'use strict';

    /*global document*/
    require.config({
        baseUrl: '../../lib/bower',
        paths: {
            'ev-script': '../../dist/ev-script',
            'jquery':  'jquery/jquery',
            'jquery-ui': 'jquery-ui/jquery-ui',
            'jquery.cookie': 'jquery.cookie/jquery.cookie',
            'underscore': 'lodash/lodash',
            'backbone': 'backbone/backbone',
            'ev-config': '../../ev-config'
        },
        shim: {
            'jquery': {
                exports: 'jQuery'
            },
            'jquery-ui': ['jquery'],
            'jquery.cookie': ['jquery'],
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['jquery', 'underscore'],
                exports: 'Backbone'
            }
        }
    });

    require(['ev-config', 'ev-script', 'jquery'], function(evSettings, EV, $) {


        var app = new EV.EnsembleApp({
            authId: evSettings.authId,
            authPath: evSettings.authPath,
            ensembleUrl: evSettings.ensembleUrl,
            pageSize: evSettings.pageSize,
            urlCallback: function(url) {
                return evSettings.proxyPath + '?authId=' + evSettings.authId + '&request=' + encodeURIComponent(url);
            }
        });

        app.appEvents.bind('fieldUpdated', function($field, value) {
            var $videoEmbed = $('.video-embed');
            var $playlistEmbed = $('.playlist-embed');
            if ($field[0].id === 'video') {
                if (value) {
                    app.handleEmbed($videoEmbed, new EV.VideoSettings(value));
                } else {
                    $videoEmbed.html('');
                }
            } else if ($field[0].id === 'playlist') {
                if (value) {
                    app.handleEmbed($playlistEmbed, new EV.PlaylistSettings(value));
                } else {
                    $playlistEmbed.html('');
                }
            }
        });

        $(document).ready(function() {
            app.handleField($('#video').parent(), new EV.VideoSettings(), '#video');
            app.handleField($('#playlist').parent(), new EV.PlaylistSettings(), '#playlist');
        });
    });

}());