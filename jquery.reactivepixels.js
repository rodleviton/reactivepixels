;
(function($, window, document, undefined) {

    // Create the defaults once
    var reactivePixels = "reactivePixels",
        defaults = {
            delay: 400,
            offset: 10,
            timer: {},
            selector: '.block'
        };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = reactivePixels;
        this.init();
    }

    Plugin.prototype = {

        init: function() {
            this.element.on('mouseover', null, $.proxy(this.enter, this));
            this.element.on('mouseout', null, $.proxy(this.leave, this));
            this.update();
        },
        
        // Stores data attributes for element
        update: function() {
            $(this.element).data({
                'left': this.element.css('left'),
                'top': this.element.css('top')
            });
        },

        enter: function(e) {
            var that = this;
            this.element.stop(); // Stop any current animations
            this.check();

            this.timer = setInterval(function() {
                that.check();
            }, this._defaults.delay);
        },

        leave: function(e) {
            var that = this;
            clearInterval(this.timer); // Clear any existing timers

            $('.block').each(function(index, value) {
                $(value).stop().animate({
                    'top': $(value).data('top'),
                    'left': $(value).data('left')
                }, that._defaults.delay, 'swing');
            });
        },

        // Check if elements intersect
        check: function() {
            var that = this;
            clearInterval(this.timer); // Clear timer

            $('.block').each(function(index, value) {
                var el2 = $(value);
                if (el2[0] != that.element[0]) {
                    if (that.collision(that.element, el2)) {
                        var coords = that.getArea(that.element, el2);
                        that.animate(el2, coords);
                    }
                }
            });
        },

        // Collision detection
        collision: function(el1, el2) {
            var element1 = el1;
            var element2 = el2;

            var x1 = element1.offset().left;
            var y1 = element1.offset().top;
            var h1 = element1.outerHeight(true);
            var w1 = element1.outerWidth(true);
            var b1 = y1 + h1;
            var r1 = x1 + w1;

            var x2 = element2.offset().left;
            var y2 = element2.offset().top;
            var h2 = element2.outerHeight(true);
            var w2 = element2.outerWidth(true);
            var b2 = y2 + h2;
            var r2 = x2 + w2;

            if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
            return true;
        },

        // Calculate area of overlap and direction to remove overlap
        getArea: function(el1, el2) {
            var element1 = el1;
            var element2 = el2;

            var leftMost = (element1.offset().left < element2.offset().left ? element1 : element2);
            var rightMost = (element1.offset().left > element2.offset().left ? element1 : element2);
            var topMost = (element1.offset().top < element2.offset().top ? element1 : element2);
            var bottomMost = (element1.offset().top > element2.offset().top ? element1 : element2);

            var xDir;
            var yDir;

            if ((element2.offset().top + element2.height()) > (element1.offset().top + element1.height())) {
                yDir = 'down';
            }
            else {
                yDir = 'up';
            }

            if ((element2.offset().left + element2.width()) > (element1.offset().left + element1.width())) {
                xDir = 'right';
            }
            else {
                xDir = 'left';
            }
            var overlap = {
                'x': (leftMost.offset().left + leftMost.outerWidth()) - rightMost.offset().left,
                'y': (topMost.offset().top + topMost.outerHeight()) - bottomMost.offset().top,
                'xDir': xDir,
                'yDir': yDir
            };

            return overlap;
        },

        animate: function(el, coords) {
            var leftPos;
            var topPos;
            var offset;

            switch (coords.xDir) {
            case 'right':
                leftPos = coords.x;
                offset = this._defaults.offset;
                break;

            case 'left':
                leftPos = coords.x;
                offset = this._defaults.offset;
                break;
            }

            switch (coords.yDir) {
            case 'down':
                topPos = coords.y;
                offset = this._defaults.offset;
                break;

            case 'up':
                topPos = (coords.y * -1);
                offset = (this._defaults.offset * -1);
                break;
            }

            $(el).stop().animate({
                'top': ($(el).offset().top + (topPos + offset)),
                'left': ($(el).offset().left + (leftPos + offset))
            }, 300, 'swing');
        }
    };

    $.fn[reactivePixels] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + reactivePixels)) {
                $.data(this, "plugin_" + reactivePixels, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);