// //scroll top
// $(document).ready(function() {
//
// // sticky
//   var stickyHeader = $(".stickyElement").offset().top;
//
//   var stickyEspace = function(){
//    var scrollTop = $(window).scrollTop();
//
//    if (scrollTop > stickyHeader) {
//        $(".stickyElement").addClass("stickyZone");
//    } else {
//        $(".stickyElement").removeClass("stickyZone");
//    }
// };
//
// stickyEspace();
//
//     $(window).scroll(function() {
//       if ($(this).scrollTop() > 100) {
//         $('#haut').removeClass('affiche');
//       } else {
//         $('#haut').addClass('affiche');
//       }
//
//
//       stickyEspace();
//
//
//     });
//
//     $(function(){
//         $("#haut").click(function(){
//             $("html, body").animate({scrollTop: 0},"slow");
//
//         });
//     });
//
//   });
//
// // Style input file
//   $('.form-control-file').on("change", function(){
//     // Name of file and placeholder
//     var file = this.files[0].name;
//     var dflt = $(this).attr("placeholder");
//     if($(this).val()!=""){
//       $(this).next().text(file);
//     } else {
//       $(this).next().text(dflt);
//     }
//   });
