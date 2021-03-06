$(document).ready(function() {
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
    var modal = "";
    var toggled = false;
    $(".visibilityToggle").click(function() {
        var input = $(this).prev();
        if (!toggled) {
            input.attr('type','text') ;
            $(this).find(".fa-eye").addClass("hidden");
            $(this).find(".fa-eye-slash").removeClass("hidden");
            toggled = true;
        }
        else{
            input.attr('type','password');
            $(this).find(".fa-eye-slash").addClass("hidden");
            $(this).find(".fa-eye").removeClass("hidden");
            toggled = false;
        }
        input.trigger("focus");

    })

    function showError(elem) {
        var elem = elem.find(".notifBox .notif-error");
        elem.removeClass("hidden");
        setTimeout(function() {
            elem.addClass("hidden");
        }, 600);
    }
    
    $(".checkModal1").click(function() {
        modal = $("#submit");
    });
    $(".checkModal2").click(function() {
        modal = $("#login");
    });
    $(document).keydown(function(event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
            if (modal) {
                modal.trigger('click');
            }
        }
    });
});
