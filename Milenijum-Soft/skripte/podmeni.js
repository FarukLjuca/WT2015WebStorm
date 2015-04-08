$(document).ready(function() {
    $("#proizvodi").click(function () {
        if ($("#pomocniDiv").width() == 0)
            $("#pomocniDiv").animate({'width':90},"slow");
        else
            $("#pomocniDiv").animate({'width':0},"slow");
        $("#podmeni").slideToggle("slow");
    });
});