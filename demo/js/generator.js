$(function() {

    var divs = [];
    var num = 30;

    // Generate some random divs
    for (var i = 0; i <= num; i++) {
        divs.push('#div-0' + (i + 1));
        
        var top = (Math.random() * 800);
        var left = (Math.random() * 1200);
        
        var el = $('<div id="div-0' + (i + 1) + '" class="block" style="left:' + left + 'px; top:' + top + 'px;">' + (i + 1) + '</div>');

        $('#container').append(el);
    }

});