$(document).ready(function() {
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
