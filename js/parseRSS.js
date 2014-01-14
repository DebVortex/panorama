var feed_base_url = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=2&callback=?&q=';

function feedToWidget(data) {
    var rss_widget = $('#widgetcontent_rss-reader');
    rss_widget.append($('<h2>').html(data.responseData.feed.title));
    rss_widget.append('<hr>');
    for (var i = 0; i<data.responseData.feed.entries.length; i++) {
        var entry = data.responseData.feed.entries[i];
        var entry_title = $('<h3>').append($('<a>').attr('href', entry.link).html(entry.title));
        rss_widget.append(entry_title);
        rss_widget.append($('<p>').html(entry.contentSnippet));
    }
}

function parseRSS(urls) {
    var protocol = document.location.protocol;
    if (protocol == 'file:') {
        protocol = 'http:';
    }
    $('#widgetcontent_rss-reader').html('');
    for (var i = 0; i<urls.length; i++) {
        url = protocol + feed_base_url + encodeURIComponent(urls[i]);
        $.ajax({
            url: url,
            dataType: 'json',
            success: feedToWidget,
        });
    }
}