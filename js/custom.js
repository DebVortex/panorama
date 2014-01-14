var theme_cookieName = "panorama-theme";
var feeds = new Array('https://www.djangoproject.com/rss/weblog/');


function saveChoosenTheme(day_or_night) {
    $.cookie(theme_cookieName, day_or_night);
}

function loadChoosenTheme() {
    var day_or_night = $.cookie(theme_cookieName);
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

function weatherWidget() {
    $('.weather-temperature').openWeather({
        city: 'Leipzig, Germany',
        placeTarget: '.weather-place',
        units: 'c',
        descriptionTarget: '.weather-description',
        windSpeedTarget: '.weather-wind-speed',
        humidityTarget: '.weather-humidity',
        sunriseTarget: '.weather-sunrise',
        sunsetTarget: '.weather-sunset',
        iconTarget: '.weather-icon',
        customIcons: 'img/weather/',
        error: function(message) {
            console.log(message);
        }
    });
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

    parseRSS(feeds);

    weatherWidget();
});
