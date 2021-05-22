$(document).ready(function() {
//     $("input").focus(function() {
//         $(this).parent().parent().css("border-bottom", "2px solid red");
//     });

function changePsColor(color) {
    $("#ps-status").css("color", `${color}`);
    $("#ps-bar").css("background-color",  `${color}`);
}

var currentWidth = 0;
var currentValue = "null";


    // When they unfcous the input check for mistakes
    $("input").blur(function() {
        if ($(this).attr("name") == "password") {
            $("#ps").slideUp();
        }
        if ($(this).attr("name") == "email") {
            let value = $(this).val();

            if (!String(value).includes("@")) {
                console.log("Doesn't have @");
                $(this).css("border-bottom", "1px solid red");
                $("#invalid").text("Email invalid missing '@' symbol.");
                $('#invalid').show();
            } 
            else if (!String(value).includes(".")) {
                $("#invalid").text("Please enter a valid email address, like: yourname@email.com");
                $('#invalid').show();
            } 
            else if ($("#invalid").is(":visible")) {
                $(this).css("border-bottom", "1px solid #A0A0A0");
                $('#invalid').hide();
            }
        }
    });
    

    var password = document.querySelector("#password");

    if (password.addEventListener('focus', () => {
        $("#ps").slideDown();
    }));

    //  Remove invalid error when changes made
    $("input").on('input', function() {
        if ($(this).attr("name") == "email") {
            let value = String($(this).val());

            if (value.includes("@") && value.includes(".")) {
                $(this).css("border-bottom", "1px solid #A0A0A0");
                $('#invalid').hide();
            }
        }


        if ($(this).attr("name") == "password") {
            let value = String($(this).val());
            currentWidth = value.length * 3;
            console.log(currentWidth);
            

            if (currentWidth != 0) currentWidth+=1;
            $("#ps-bar").css("width", `${Math.round(currentWidth)}%`);
            
            if (value.includes("!")) {
                currentWidth += 15;
                $("#ps-bar").css("width", `${currentWidth}%`);
            }
            if (value.includes("9")) {
                currentWidth += 15;
                $("#ps-bar").css("width", `${currentWidth}%`);
            }
            if (value.includes("M")) {
                currentWidth += 15;
                $("#ps-bar").css("width", `${currentWidth}%`);
            }


            if (value < 4) {
                changePsColor("red");
                $("#ps-status").text("TOO SHORT");
                return;
            }
            if (value < 10) {
                changePsColor("red");
                $("#ps-status").text("WEAK");
                return;
            }
            if (currentWidth >= 30) {
                changePsColor("orange");
                $("#ps-status").text("FAIR");
            }

            if (currentWidth >= 50) {
                changePsColor("lightgreen");
                $("#ps-status").text("STRONG");
            }

            if (currentWidth > 85) {
                currentWidth = 100;
                $("#ps-bar").css("width", `${currentWidth}%`);
                console.log("Broke");
                return;
            }
        }


    });


});
