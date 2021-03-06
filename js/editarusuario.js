$(document).ready(function(){
    
    // Cubrimos los campos del formulario con los datos recibidos por AJAX.
    $.post("peticiones.php?op=4",function(respuesta){
        // gestionar los datos recibidos...
        // Creamos un objeto persona con el JSON que recibimos de la petición AJAX
        var persona=jQuery.parseJSON(respuesta);
       
        // Cubrimos los campos del formulario.
        $("#nick").val(persona.nick);
        $("#password").val(persona.password);
        $("#nombre").val(persona.nombre);
        $("#apellidos").val(persona.apellidos);
        $("#dni").val(persona.dni);
        $("#email").val(persona.email);
        $("#telefono").val(persona.telefono);
        
        if (persona.token=='ldap')
        {
            // Indicamos que son datos obtenidos de LDAP.
            $("#titulo").append(" (usuario LDAP).");
            // Sólo permitimos modificar los campos: 
            // DNI y teléfono. Desactivamos los otros.
            $("#password").attr("disabled","disabled");
            $("#nombre").attr("disabled","disabled");
            $("#apellidos").attr("disabled","disabled");
            $("#email").attr("disabled","disabled");
        }
            
        if (persona.token=='twitter')
        {
            // Indicamos que son datos obtenidos de LDAP.
            $("#titulo").append(" (usuario TWITTER).");
            // Sólo permitimos modificar los campos: 
            // DNI y teléfono. Desactivamos los otros.
            $("#password").attr("disabled","disabled");
            $("#nombre").attr("disabled","disabled");
        }
    });
   
   
    // CUando se produzca el submit...
    // hacemos la petición ajax enviando las actualizaciones al servidor.
   
    $("#formulario").submit(function(evento){
       
        // Cancelamos el evento por defecto de envío de datos.
        evento.preventDefault();

        // Activamos todos los campos antes de enviar
        $("input").attr("disabled",false);
        
        // Metemos todos los datos del formulario en la variable datos.
        var datos=$("#formulario").serializeArray();
       
        // Hacemos la petición AJAX. op=5 Actualizar datos usuario logueado.
        $.post("peticiones.php?op=5",datos,function(resultado){
            $("#formulario").fadeOut(function(){
                $("#mensajes").fadeTo(0,0).css("background-color","green").html(resultado).fadeTo(500,1);
            });
        });
    });
   

    $("#bajausuario").click(function()
    {
        if (confirm("¿Está seguro/a de darse de baja en la web?")) 
        {
            // Petición ajax de borrado.
            $.post("peticiones.php?op=6",function(resultado)
            {
                if (resultado=='OK')
                    window.location.href="desconectar.php";
           
            })
        }
    });


    $("#imprimircarnet").click(function()
    {
            // Generamos el carnet PDF y lo enviamos
            document.location="imprimircarnet.php";
            
            // Hacemos el envío del carnet pdf
            $.post("imprimircarnet.php?fichero=1",function(resultado)
            {
                $("#mensajillos").fadeOut(0,function(){
                    $(this).html(resultado).fadeIn();
                });
            })
    });
   
    
}); // Fin document.ready()