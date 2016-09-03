/**
 * Created by evga on 15.08.16.
 */
(function ($) {

    var methods;
    methods = {
        $form: null,
        $butt: null,
        $this: null,

        init: function (options) {
            this.$this = $(this);
            methods.createForm();

            var settings = $.extend({}, $.fn.myPlugin.defaults, options);
            this.$form = $("#modal_form").children();//.detach();//на время удалить для обработки
            //this.$butt = this.$form.find(".button");
            this.$butt = this.$form.find(".button");

            if (settings.p1_check) {
                $("input:eq(0)", this.$form).addClass("ness_chek");
            }
            $("input:eq(0)", this.$form).attr('name','name');
            if (settings.p2_check) {
                $("input:eq(1)", this.$form).addClass("ness_chek");
            }
            $("input:eq(1)", this.$form).attr('name','tel');
            if (settings.p3_check) {
                $("input:eq(2)", this.$form).addClass("ness_chek");
            }
            $("input:eq(2)", this.$form).attr('name','email');
            if (settings.p4_check) {
                $("input:eq(3)", this.$form).addClass("ness_chek");
            }
            $("input:eq(3)", this.$form).attr('name','sms');

            $("h3").text(settings.h.toUpperCase());
            $("lable:eq(0)", this.$form).text(settings.p1);
            $("lable:eq(1)", this.$form).text(settings.p2);
            $("lable:eq(2)", this.$form).text(settings.p3);
            $("lable:eq(3)", this.$form).text(settings.p4);
            this.$butt.val(settings.b.toUpperCase());

            //$("#forma").append($("lable:eq(0)", this.$form)).append($("input:eq(0)"));

            //this.$form.find(".ness_chek").addClass("empty");
            $(".ness_chek", this.$form).addClass("empty");

            //this.$butt.click(methods.clickButton);
            this.$butt.on('click', methods.clickButton);

            //$('#modal_close, #overlay').click(methods.closeForm);
            $('#modal_close, #overlay').on('click', methods.closeForm);
            //this.$this.click(methods.showForm);
            this.$this.on('click', methods.showForm);

            //this.$this.append(this.$form);//востановить
            return this;
        },

        showForm: function () {
            $('#overlay').fadeIn(200);//показать подложку
            $("#modal_form")
                .css('display', 'block')
                .animate({opacity: 1, top: '50%'}, 200);
        },

        createForm: function () {
            $("body").append("<div id='overlay'></div> <div id='modal_form'></div>");

            var $form = $("#modal_form"),
                code='';

            $form
                .append("<form action='' method='post' class='form'></form> <span id='modal_close'>X</span>")
                .find(".form").append("<h3>");

            for (var i = 4; i--;) {
                code+="<lable></lable> <input type='text'/>";
            }
            $form.find(".form")
                .append(code)
                .append("<input class='button' id='butt' type='submit' />");

            //$form.find("#butt").attr("disabled",true);
            $("#butt", $form).data('disabled', false);
        },

        closeForm: function () {
            $("#modal_form").css('display', 'none');
            $('#overlay').fadeOut(400); // скрываем подложку
        },

        logic: function () { //логика проверки
            methods.chekInput();
            var $form = $("#modal_form"),
            count = $(".empty", $form).length; //подсчет пустых

            if (count) {
                if ($("#butt", $form).data('disabled')) {
                    return false
                } else {
                    $("#butt", $form).data('disabled', false);
                }
            } else {
                $("#butt", $form).data('disabled', true);

            }

        },

        chekInput: function () { //проверка полей
            $("#modal_form").find(".ness_chek").each(function () {
                if ($(this).val() != '') {
                    //поле не пустое
                    $(this).removeClass("empty");

                } else {
                    //поле пустое
                    $(this).addClass("empty");
                }
            });
        },

        attention: function () {
            $(".empty", $("#modal_form")).css('border-color', 'red');

            setTimeout(function () {
                $(".empty", $("#modal_form")).removeAttr('style');
            }, 500);
        },

        clickButton: function () {
            methods.logic();

            if (!$(this).data('disabled')) {
                methods.attention();
                return false
            } else {
                //отправка
                methods.send();
                //$("#modal_form").submit(methods.send);
            }
        },

        send: function (){
            var msg =  $("#modal_form").find(".form").serialize();
            alert('Ваши данные\n\r'+ msg);

            $.ajax({
                type: 'POST',
                url: $.fn.myPlugin.defaults.url,
                data: msg,
                success: function(data) {
                    alert("Ваши данные отправлены!");
                },
                error:  function(xhr, str){
                    //alert('Возникла ошибка: ' + xhr.responseCode);
                }
            });
        }

    };

    $.fn.myPlugin = function(options) {

        if ( methods[options] ) {
            return methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof options === 'object' || ! options ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод ' +  options + ' в jQuery.tooltip не существует' );
        }
    };

    $.fn.myPlugin.defaults = {
        h: "Обратная связь",
        p1: "Ваше имя",
        p2: "Телефон",
        p3: "Email",
        p4: "Сообщение",
        b: "отправить",
        p1_check: true,
        p2_check: false,
        p3_check: false,
        p4_check: false,
        url: "'send.php'"
    }

}( jQuery ));
