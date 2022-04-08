let el = document.getElementById('progress-bar');
let percentage = el.ariaValueNow;
$('.progress-bar').animate({width: percentage +'%'},3000);


$('.count').each(function() {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
        duration: 3000,
        easing: 'swing',
        step: function(now) {
            $(this).text(Math.ceil(now));
        }
    });
});
