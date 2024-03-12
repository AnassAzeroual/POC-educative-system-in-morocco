/*
    created by: Sublime Text
    user: Amine Bensaid
    date: 04/08/2018 (edit)
    time: 11:00 AM
*/

(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    $(function () {

        $('#pin').keypress(function (event) {
            event.preventDefault();
            return false;
        });
    });
    var input = $('.validate-input .input100');
    $('#form-login').on('submit', function () {
        var rememberCheck = $('#rememberCheck').is(':checked'); // check if checkbox remember me is checked (true/false)!
        var var_this = $(this),
            url = var_this.attr('action'),
            type = var_this.attr('method'),
            data = {};


        //console.log(data);
        var_this.find('[name]').each(function (index, value) {
            var var_that = $(this),
                name = var_that.attr('name'),
                value = var_that.val();
            data[name] = value;
        });
        data = JSON.stringify(data);

        $.ajax({
            url: url,
            type: type,
            data: data,
            success: function (response) {
                $('#info').val(response);
                $('input[name="remember"]').val($('#rememberCheck').prop('checked') ? 1 : 0);
                $('.form2').submit();
            },
            error: function (response) {
                alert('المرجو التأكد من صحة المعلومات');
                $('#pin').val('');
            }

        });
        return false;

    });

    //template functions
    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });
    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });
    //PIN buttons
    $(".num").click(function () {
        if ($('#pin').val().length !== 5) {
            $('#pin').val($('#pin').val() + parseInt($(this).attr('num')));
        }
        if ($('#pin').val().length == 5) {
            $('#pincheck').removeClass('yellow').addClass('green');
        }
    });
    
    /*setInterval(function(){
        if ($('#pin').val().length == 5) {
            $('#pincheck').removeClass('yellow').addClass('green');
                console.log('is enter' + $('#pin').val().length);
            $('.im').each(function(){
                $(this).attr('src', '../public/images/blue.png');
            });
        }
     }, 1000);*/

    $('.close').click(function () {
        $('#pin').val('');
        $('img').attr('src', '../public/images/grey.png');
        $('#pincheck').removeClass('green').addClass('yellow');

    });
    $("#pincheck").click(function () {
        if ($('#pin').val().length != 5)
            alert('المرجو التأكد من صحة المعلومات');
        else
            $('#form-login').submit();
    });

    $("#pinback").click(function () {
        /*if($('img[nom="here"]').attr('nom')=='here'&& $('img[nom="here"]').attr('src')== '../public/images/blue.png')
               $('img[nom="here"]').attr('src' , '../public/images/grey.png');
         else
            $('img[nom="here"]').prev().attr('src' , '../public/images/grey.png');
         if($('#i1').attr('nom')!='here' ){
         $('img[nom="here"]').attr('nom','').prev().attr('nom','here');
         }*/

        $('#pin').val($('#pin').val().slice(0, -1));
        if ($('#pin').val().length == 4)
            $('#pincheck').removeClass('green').addClass('yellow');
        switch ($('#pin').val().length) {
            case 0:
                $('#i1').attr('src', '../public/images/grey.png');
                $('#i2').attr('src', '../public/images/grey.png');
                $('#i3').attr('src', '../public/images/grey.png');
                $('#i4').attr('src', '../public/images/grey.png');
                $('#i5').attr('src', '../public/images/grey.png');
                break;
            case 1:
                $('#i1').attr('src', '../public/images/blue.png');
                $('#i2').attr('src', '../public/images/grey.png');
                $('#i3').attr('src', '../public/images/grey.png');
                $('#i4').attr('src', '../public/images/grey.png');
                $('#i5').attr('src', '../public/images/grey.png');
                break;
            case 2:
                $('#i1').attr('src', '../public/images/blue.png');
                $('#i2').attr('src', '../public/images/blue.png');
                $('#i3').attr('src', '../public/images/grey.png');
                $('#i4').attr('src', '../public/images/grey.png');
                $('#i5').attr('src', '../public/images/grey.png');
                break;
            case 3:
                $('#i1').attr('src', '../public/images/blue.png');
                $('#i2').attr('src', '../public/images/blue.png');
                $('#i3').attr('src', '../public/images/blue.png');
                $('#i4').attr('src', '../public/images/grey.png');
                $('#i5').attr('src', '../public/images/grey.png');
                break;
            case 4:
                $('#i1').attr('src', '../public/images/blue.png');
                $('#i2').attr('src', '../public/images/blue.png');
                $('#i3').attr('src', '../public/images/blue.png');
                $('#i4').attr('src', '../public/images/blue.png');
                $('#i5').attr('src', '../public/images/grey.png');
                break;
        }
    });

    //allow submit from username
    $('#username').keypress(function (e) {
        if (e.which == 13) {
            event.preventDefault;
            $('.login100-form').submit();
        }
    });

    //compte types click
    $('#famille').click(function () {
        $('#loading-div').load('form_user.html');
        $('#type-compte').val('famille');
        $('#defaut-titre').hide();

    });
    $('#etablissement').click(function () {
        $('#type-compte').val('etablissement');
        $('#defaut-titre').hide();
        $('#etablissement-titre').removeClass('form-hidden');

    });
    $('#individu').click(function () {
        $('#loading-div').load('form_individu.html');
        $('#type-compte').val('individu');
        $('#defaut-titre').hide();
        $('#individu-titre').removeClass('form-hidden');
    });
    $('.num').click(function () {

        switch ($('#pin').val().length) {
            case 1:
                $('#i1').attr('src', '../public/images/blue.png');
                $('#i2').attr('src', '../public/images/grey.png');
                $('#i3').attr('src', '../public/images/grey.png');
                $('#i4').attr('src', '../public/images/grey.png');
                $('#i5').attr('src', '../public/images/grey.png');
                break;
            case 2:
                $('#i1').attr('src', '../public/images/blue.png');
                $('#i2').attr('src', '../public/images/blue.png');
                $('#i3').attr('src', '../public/images/grey.png');
                $('#i4').attr('src', '../public/images/grey.png');
                $('#i5').attr('src', '../public/images/grey.png');
                break;
            case 3:
                $('#i1').attr('src', '../public/images/blue.png');
                $('#i2').attr('src', '../public/images/blue.png');
                $('#i3').attr('src', '../public/images/blue.png');
                $('#i4').attr('src', '../public/images/grey.png');
                $('#i5').attr('src', '../public/images/grey.png');
                break;
            case 4:
                $('#i1').attr('src', '../public/images/blue.png');
                $('#i2').attr('src', '../public/images/blue.png');
                $('#i3').attr('src', '../public/images/blue.png');
                $('#i4').attr('src', '../public/images/blue.png');
                $('#i5').attr('src', '../public/images/grey.png');
                break;
            case 5:
                $('#i1').attr('src', '../public/images/blue.png');
                $('#i2').attr('src', '../public/images/blue.png');
                $('#i3').attr('src', '../public/images/blue.png');
                $('#i4').attr('src', '../public/images/blue.png');
                $('#i5').attr('src', '../public/images/blue.png');
                break;
            default:
                $('img').attr('src', '../public/images/grey.png');
                break;
        }


    });





    //template functions
    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);
