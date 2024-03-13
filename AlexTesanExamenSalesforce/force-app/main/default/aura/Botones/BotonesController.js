({
    Clikado: function(component, event, helper) {
        var valorNumero = event.target.getAttribute('data-name'); 
        var Mapeo = component.get("v.MapeoClicks");

        if (Mapeo[valorNumero]) {                            //si hay registro de que el boton ya ha sido pulsado,
            Mapeo[valorNumero]++;                            //el registro se incrementa en uno
        } else {
            Mapeo[valorNumero] = 1;
        }

        component.set("v.MapeoClicks", Mapeo);               //se actualiza el registro de pulsaciones

        var buttonClickEvent = $A.get("e.c:Evento");            //se crea un evento de la clase :Evento
        buttonClickEvent.setParams({ "valorNumero": valorNumero });//se le pasa al evento el valor del boton pulsado
        buttonClickEvent.fire();
    },
})
