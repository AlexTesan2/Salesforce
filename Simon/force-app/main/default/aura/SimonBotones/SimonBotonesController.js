({
    handleButtonClick: function(component, event, helper) {
        var buttonNumber = event.target.getAttribute('data-name');   //valor del boton sobre el que se ha hecho click
        var buttonClicks = component.get("v.buttonClicks");          //mapeador de pulsaciones de botones

        if (buttonClicks[buttonNumber]) {                            //si hay registro de que el boton ya ha sido pulsado,
            buttonClicks[buttonNumber]++;                            //el registro se incrementa en uno
        } else {
            buttonClicks[buttonNumber] = 1;
        }

        component.set("v.buttonClicks", buttonClicks);               //se actualiza el registro de pulsaciones

        // Fire the button click event
        var buttonClickEvent = $A.get("e.c:ButtonClick");            //se crea un evento de la clase :ButtonClick
        buttonClickEvent.setParams({ "buttonNumber": buttonNumber });//se le pasa al evento el valor del boton pulsado
        buttonClickEvent.fire();
    },
})