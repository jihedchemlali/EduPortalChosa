// //Sticky header
// $(document).ready(function() {
//
//   var stickyHeader = $(".menuH").offset().top;
//
//   var sticky = function(){
//     var scrollTop = $(window).scrollTop();
//
//     if (scrollTop > stickyHeader) {
//       $(".menuH").addClass("sticky");
//     } else {
//       $(".menuH").removeClass("sticky");
//     }
//   };
//   var top = ($('.menuH').offset() || { "top": NaN }).top;
//   if (isNaN(top)) {
//   } else {
//   }
//   sticky();
//
//   $(window).scroll(function() {
//     sticky();
//   });
//
//   $('ul.navbar-nav li.dropdown').hover(function() {
//     $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(300);
//   }, function() {
//     $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(300);
//   });
// });
//
// //scroll top
// $(document).ready(function() {
//   $(window).scroll(function() {
//     if ($(this).scrollTop() > 100) {
//       $('#haut').removeClass('affiche');
//     } else {
//       $('#haut').addClass('affiche');
//     }
//   });
//
//   $(function(){
//     $("#haut").click(function(){
//       $("html, body").animate({scrollTop: 0},"slow");
//
//     });
//   });
//
// });
//
// $(document).ready(function(){
//   // au clic sur un lien
//   $('a').on('click', function(evt){
//     // bloquer le comportement par défaut: on ne rechargera pas la page
//     evt.preventDefault();
//     // enregistre la valeur de l'attribut  href dans la variable target
//     var target = $(this).attr('href');
//     /* le sélecteur $(html, body) permet de corriger un bug sur chrome
//     et safari (webkit) */
//     $('html, body')
//     // on arrête toutes les animations en cours
//       .stop()
//       /* on fait maintenant l'animation vers le haut (scrollTop) vers
//        notre ancre target */
//       .animate({scrollTop: $(target).offset().top}, 1000 );
//   });
// });
