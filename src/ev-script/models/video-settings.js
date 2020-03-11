define(['backbone'], function(Backbone) {

    'use strict';

    return Backbone.Model.extend({
        defaults: {
            type: 'video',
            width: '848',
            height: '480',
            showtitle: true,
            autoplay: false,
            showcaptions: false,
            hidecontrols: false,
            socialsharing: false,
            annotations: true,
            captionsearch: true,
            attachments: true,
            audiopreviewimage: true,
            links: true,
            metadata: true,
            dateproduced: true,
            embedcode: false,
            download: false,
            viewersreport: true,
            embedthumbnail: false,
            axdxs: false,
            search: '',
            sourceId: 'content',
            isaudio: false,
            contenttype: '',
            embedtype: 'fixed',
            forceembedtype: false
        }
    });
});
