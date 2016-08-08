(function ( $ ) {
 
    $.fn.myPlagin = function( options ) {

		var settings = $.extend({
			h: "Обратная связь",
            p1: "Ваше имя",
            p2: "Телефон",
            p3: "Email",
            p4: "Сообщение"
        }, options );

		$("form").append("<h3>"+settings.h.toUpperCase()+"</h3>");

        for(var i=0;i<4;i++){
            $("form").append("<p></p>");
        }

        $("p:eq(0)").text(settings.p1);
        $("p:eq(1)").text(settings.p2);
        $("p:eq(2)").text(settings.p3);
        $("p:eq(3)").text(settings.p4);

        $("p").each(function(){
            var p=$( this );
            var text=p.text();
            p.append("</br><input class=\"input\" type=\"text\" name=\"your-name\" value=\"\" size=\"33\" />");
            var el=p.children('input');
            el.attr("placeholder", text);
        });


        $("form").append("<input class=\"buttom\" type=\"submit\" value=\"ОТПРАВИТЬ\" />");
        return this;
    };

    $("form").append("<span id=\"modal_close\">X</span>");

    $( "a" ).click(function( event ) {
        $('#overlay').fadeIn(200);//показать подложку
        $('#modal_form')
            .css('display', 'block')
            .animate({opacity: 1, top: '50%'}, 200);
    }); 

    $('#modal_close, #overlay').click( function(){ //закрытие
        $('#modal_form').css('display', 'none'); //display: none;
        $('#overlay').fadeOut(400); // скрываем подложку
    });
    
 
}( jQuery ));





$( "#modal_form" ).myPlagin({
	p1:"мое название"
}).css('background','white');
