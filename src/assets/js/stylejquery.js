$(function () {
    //  $('.res-mat').slideUp();

//   });
  
  
  //scroll
//   $(function() {
    var header = $("#addshadownav");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
  
        if (scroll >= 20) {
            header.addClass("addshadow").removeClass("sampleshadownav");
        } else {
            header.removeClass("addshadow").addClass("sampleshadownav");
        }
    });
//   });
  
//profile
//   $(document).ready(function () {
     
    //   });


// $(document).ready(function () {

    $('tr[routerLink]').on("click", function() {
      document.location = $(this).data('href');
  });
// });

//hover quiz
   /* $(document).on('mouseover','.icon-cours',function(){
        $(this).addClass("icon-cours-hover");
        $('.cours').addClass("cours-hover");
    });*/


 });
//# sourceMappingURL=scripts.js.map

