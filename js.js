(function ( $ ) {

	var methods={
        $form: null,
        $butt:null,

		init: function( options ){

			var settings = $.extend({},$.fn.myPlugin.defaults, options);
            $("#modal_form").append("<span id='modal_close'>X</span>");       

            $form = $(this);
            $butt = $form.find( ".button" );

			$("h3").text(settings.h.toUpperCase());
			$("lable:eq(0)").text( settings.p1 );
        	$("lable:eq(1)").text( settings.p2 );
        	$("lable:eq(2)").text( settings.p3 );
        	$("lable:eq(3)").text( settings.p4 );
        	$butt.val( settings.b.toUpperCase() );          

            $form.find( ".ness_chek" ).addClass( "empty" );

            $butt.click( methods.clickButton );
            $('#modal_close, #overlay').click(methods.closeForm);
            $( "a" ).click(methods.showForm);

            return this;
		},

        showForm: function(event){
            $('#overlay').fadeIn(200);//показать подложку
            $('#modal_form')
            .css('display', 'block')
            .animate({opacity: 1, top: '50%'}, 200);
        },

        closeForm: function(){
            $('#modal_form').css('display', 'none'); //display: none;
            $('#overlay').fadeOut(400); // скрываем подложку
        },

        logic: function(){ //логика проверки
            methods.chekInput(); 
            var count =$form.find( ".empty" ).length; //подсчет пустых

            if(count > 0){
                if($butt.hasClass('disabled')){
                    return false
                } else {
                    $butt.addClass('disabled')
                }
            } else {
                $butt.removeClass('disabled')
            }
        },

        chekInput: function(){ //проверка полей
            $form.find( ".ness_chek" ).each(function(){
                if($(this).val() != ''){
                    //поле не пустое 
                    $(this).removeClass( "empty" );
                } else {
                    //поле пустое 
                    $(this).addClass( "empty" );                }
            });
        },

        attention: function(){
            $form.find(".empty").css('border-color','grey');
            setTimeout(function(){
                $form.find('.empty').removeAttr('style');
            },500);
        },

		clickButton: function(){
			methods.logic();
            if($(this).hasClass('disabled')){
                methods.attention();
                return false
            } else {
            //отправка
            $form.submit();
            }
		}
	};

	$.fn.myPlugin = function ( options ) {
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
        b: "отправить"
	}

}( jQuery ));











