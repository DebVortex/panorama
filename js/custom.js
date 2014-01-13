var theme_cookieName = "panorama-theme";

function saveChoosenTheme(day_or_night) {
    $.cookie(dashboard_cookieName, day_or_night);
}

function loadChoosenTheme() {
    var day_or_night = $.cookie(dashboard_cookieName);
    if (day_or_night === null) {
        $('#theme-switcher').bootstrapSwitch('setState', true);
    } else {
        if (day_or_night == 'night') {
            $('#theme-switcher').bootstrapSwitch('setState', true);
        } else {
            $('#theme-switcher').bootstrapSwitch('setState', false);
        }
    }
}


$(document).ready(function() {
    $('#theme-switcher').bootstrapSwitch();
    $('#theme-switcher').on('switch-change', function (e, data) {
        var theme_file = $('#theme-file');
        var sub_brand = $('.sub-brand');
        if(data.value) {
            theme_file.attr('href', 'css/by-night.css');
            sub_brand.html('by night');
            saveChoosenTheme('night');
        } else {
            theme_file.attr('href', 'css/by-day.css');
            sub_brand.html('by day');
            saveChoosenTheme('day');
        }
    });
    loadChoosenTheme();

    $('html').niceScroll();

    $('#widgetcontent_calendar').datepicker({
        showWeek: true,
        firstDay: 1});

    $( ".column" ).sortable({
        connectWith: ".column",
        cursor: "move",
        cancel: ".widget-content, .btn",
        delay: 150,
        forceHelperSize: true,
        forcePlaceholderSize: true,
        toleranceType: "pointer",
        stop: function() { saveOrder(); }
    });

    $('.widget-content')
        .on('shown.bs.collapse', function() {
            saveOrder();
        })
        .on('hidden.bs.collapse', function() {
            saveOrder();
        });

    $('#restore-widget-order').click(function () {
        defaultOrder();
    });
    restoreOrder();
});
