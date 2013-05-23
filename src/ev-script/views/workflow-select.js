define(function(require) {

    'use strict';

    var _ = require('underscore'),
        BaseView = require('ev-script/views/base');

    return BaseView.extend({
        template: _.template(require('text!ev-script/templates/options.html')),
        initialize: function(options) {
            BaseView.prototype.initialize.call(this, options);
            _.bindAll(this, 'render');
            this.$el.html('<option value="-1">Loading...</option>');
            this.collection.on('reset', this.render);
        },
        render: function() {
            this.$el.html(this.template({
                selectedId: '',
                collection: this.collection
            }));
        }
    });

});