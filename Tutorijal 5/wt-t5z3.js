/*
setInterval(function(){

    var ajax =  new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementsByTagName("body").innerHTML = ajax.responseText;

            var feed = new google.feeds.Feed("http://www.klix.ba/rss/naslovnica");
            feed.load( function (data) {
                // Parse data depending on the specified response format, default is JSON.
                console.dir(data);
            });
        }
    }

    var grad = document.getElementById("grad").value;
    ajax.open("GET", "http://www.klix.ba/rss/naslovnica", true);
    ajax.send();

    $.ajax({
        url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://stackoverflow.com/feeds'),
        dataType : 'json',
        success  : function (data) {
            if (data.responseData.feed && data.responseData.feed.entries) {
                var tekst = "";
                $.each(data.responseData.feed.entries, function (i, e) {
                    alert(tekst);
                    tekst += "------------------------";
                    tekst += "Naslov: " + e.title;
                    tekst += "Link: " + e.id;
                });
                document.getElementsByTagName("body").innerHTML = tekst;
            }
        }
    });
}, 1);
*/
$(document).ready(function() {
    $.ajax({
        url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://stackoverflow.com/feeds'),
        dataType : 'json',
        success  : function (data) {
            if (data.responseData.feed && data.responseData.feed.entries) {
                var tekst = "";
                $.each(data.responseData.feed.entries, function (i, e) {
                    alert(tekst);
                    tekst += "<h3>" + e.title + "</h3>";
                    tekst += "<p>Pitanje se nalazi na <a href='" + e.id + "'>ovom</a> linku</p>";
                });
                document.getElementById("tekst").innerHTML = tekst;
            }
        }
    });
});