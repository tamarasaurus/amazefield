'use strict';

var amazefield = (function() {
    var module_base = '/modules/';

    var amazefield = function() {
        this.fields = [];
    };

    amazefield.prototype = {
        addField: function(el) {
            $(el).addClass('amazefield').wrap('<div class="amaze-container"></div>');

            var field = {
                el: el,
                parent: $(el).parents('.amaze-container'),
                label: $(el).data('label'),
                addActive: function(){
                    $(this.parent).addClass('amaze-active');
                },
                isActive: function(){
                    return $(this.parent).hasClass('amaze-active');
                },
                removeActive: function(){
                    $(this.parent).removeClass('amaze-active');
                },
                setValue: function(){
                    $(this.parent).attr('data-label', $(el).data('label'));
                    $(':before', this.parent).css('content', $(this.el).data('label'));
                },
                hasValue: function(){
                    return this.el.val().replace(/^\s+|\s+$/g, '').length !== 0;
                },
                setInput: function(){
                    var _this = this;

                    $(this.el).on('focus', function(){
                        _this.addActive();
                    }).on('blur', function(){
                        if(!_this.hasValue()){
                            _this.removeActive();
                        }
                    });

                    $(this.el).on('keyup', function(e){
                        var code = (e.keyCode ? e.keyCode : e.which);
                        var hasValue = _this.hasValue();
                        var isActive = _this.isActive();

                        if(hasValue && !isActive){
                            $(_this.parent).addClass('amaze-active');
                        }

                        if (code === 8 && !hasValue) {
                            _this.removeActive();
                        }
                    });
                }
            };

            field.setValue();
            field.setInput();

            $(el).get(0).amazefield = field;
            this.fields.push(field);
            return field;
        }
    };
    return amazefield;
}());

var am = new amazefield();

$(document).on('ready', function(){
    $('[data-amazefield]').each(function(){
       var field = am.addField($(this));
    });
});