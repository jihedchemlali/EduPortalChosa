//Sticky header
$(document).ready(function() {

       var stickyHeader = $(".menuH").offset().top;

       var sticky = function(){
        var scrollTop = $(window).scrollTop(); 

        if (scrollTop > stickyHeader) { 
            $(".menuH").addClass("sticky");
        } else {
            $(".menuH").removeClass("sticky");
        }
    };
    
    sticky();
    
    $(window).scroll(function() {
        sticky();
    });
});

//scroll top
$(document).ready(function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('#haut').removeClass('affiche');
      } else {
        $('#haut').addClass('affiche');
      }
    });
    
    $(function(){
        $("#haut").click(function(){
            $("html, body").animate({scrollTop: 0},"slow");
            
        });
    });

  });