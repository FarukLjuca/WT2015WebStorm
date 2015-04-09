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
}, 1);