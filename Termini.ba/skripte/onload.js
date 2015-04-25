function iscrtaj (ctx, boja) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 75);
    ctx.lineTo(0, 170);
    ctx.closePath();
    ctx.fillStyle = boja;
    ctx.fill();
}

function napisiIme() {

    alert("aaaaa");

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token
            // and signed request each expire
            //var uid = response.authResponse.userID;
            //var accessToken = response.authResponse.accessToken;
            FB.api('/me', function(response) {
                alert(response.name);  //response is the basic user object
            });
        } else if (response.status === 'not_authorized') {
        } else {
        }
    });
}

function foo() {
    var can1 = document.getElementById("canvasJedan");
    var can2 = document.getElementById("canvasDva");
    var can3 = document.getElementById("canvasTri");
    var ctx1 = can1.getContext("2d");
    var ctx2 = can2.getContext("2d");
    var ctx3 = can3.getContext("2d");
    iscrtaj (ctx1, "red");
    iscrtaj (ctx2, "green");
    iscrtaj (ctx3, "blue");
    var sakrij = document.getElementById("rezervacije");
    sakrij.style.display = "none";

    FB.Event.subscribe('statusChange', napisiIme());
}
onload = foo();
$(document).ready(function(){
   $("-rezervacijeMeni").onclick(function(){
       var sakrij = document.getElementById("rezervacije");
       sakrij.style.display = "block";
   });
});