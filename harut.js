//┬ ┬┌─┐┬─┐┬ ┬┌┬┐
//├─┤├─┤├┬┘│ │ │ v0.5
//┴ ┴┴ ┴┴└─└─┘ ┴
//magnus.farje@gmail.com

(function ($) {
    var Harut = {
        init: function(el, options) {
            var me = this;
            me.$elem = el;
            me.newHtml = me.$elem.prop('outerHTML');
            me.options = $.extend({}, $.fn.harut.options, options);
            me.count = 0;
            me.url = me.options.url;

            me.ajaxWorker();   
        },
        getAjaxData: function(){
            var me = this;
            if (me.options.counterEnabled)
                me.options.arguments[me.options.counterName] = me.count;
            return me.options.arguments;
        },
        ajaxWorker: function() {
            var me = this;
            (function worker() {
                me.$elem.fadeOut(me.options.fadeSpeed, function () {
                    me.$elem.html(me.newHtml);
                    var request = ((function () { return $.post(me.url, me.getAjaxData()); })());
                    request.done(function (data) {
                        me.parser(data); 
                        me.$elem.fadeIn(me.options.fadeSpeed, function () { });
                        me.onComplete(data);
                        me.count += 1;
                        setTimeout(worker, me.options.speed);
                    });
                });
            }());
        },
        onComplete: function (data) {
            var me = this;
            me.options.onComplete();
        },
        parser: function(json) {
            var me = this;
            me.json = json;
            me.$elem.find(' > *').each(function() {
                me.modifyDom($(this), json);
            });
        },
        modifyDom: function(el, json) {
            var me = this;
            var data = el.data().harut;
            if (data != undefined) {
                var key = data.split(':')[0];
                var value = data.split(':')[1];
                if (key == 'foreach') {
                    var wrapper = el.wrapInner('<div class="harut-wrapper" />');
                    $.each(json[value], function (index, object) {
                        
                        var clone = wrapper.clone().insertAfter(wrapper);
                        clone.find(' > *').each(function() {
                            me.modifyDom($(this), object);
                        });
                    });
                    wrapper.remove();
                } else if (key == 'text') {
                    el.text(json[value]);
                }
            }
            if (el.children.length > 0) {
                el.find(' > *').each(function() {
                    me.modifyDom($(this), json);
                });
            }
        },
    }

    $.fn.harut = function(options) {
        var harut = Object.create(Harut);
        harut.init(this, options);

        return this;
    };

    $.fn.harut.options = {
        url: 'no url',
        arguments:{},
        speed: '10000',
        fadeSpeed: 'slow',
        onComplete: function () { },
        counterEnabled: false,
        counterName: 'count',
    }
}(jQuery));