({
    myAction : function(component, event, helper) {

    },

    RecuperarEvento: function(component, event, helper) {
        var grabando = component.get("v.grabando");
    
        if (grabando) {
            var valorNumero = event.getParam("valorNumero");            //numero del boton pulsado, que se recibe del evento
            var SecuenciaActual = component.get("v.SecuenciaActual");   //secuencia/Mapeo de botones pulsados
    
            SecuenciaActual += valorNumero + ",";                        //añao el numero a la secuencia
    
            component.set("v.SecuenciaActual", SecuenciaActual);        //actualizo la secuencia
        }
    },

    Grabar: function(component, event, helper) {
        component.set("v.grabando", true);
        component.set("v.SecuenciaActual", "");
    },

    Stop: function(component, event, helper) {
        if (component.get("v.SecuenciaActual") !== "") {
            component.set("v.grabando", false);

            var SecuenciaActual = component.get("v.SecuenciaActual").split(",");
            var TodasLasSecuencias = component.get("v.TodasLasSecuencias").slice();

            TodasLasSecuencias.push(SecuenciaActual);

            component.set("v.TodasLasSecuencias", TodasLasSecuencias);
            component.set("v.SecuenciaActual", "");
        }
    },
    
    Clear: function(component, event, helper) {
        component.set("v.TodasLasSecuencias", []);
    },


    Play: function(component, event, helper) {
        var todasLasSecuencias = component.get("v.TodasLasSecuencias");
        
        todasLasSecuencias.forEach(function(secuencia, index) {
            setTimeout(function() {
                console.log("Reproduciendo secuencia #" + (index + 1) + ": " + secuencia.join(","));
            }, index * 1000); 
        });
    },


    Guardar: function(component, event, helper) {
        var todasLasSecuencias = component.get("v.TodasLasSecuencias");
        if(todasLasSecuencias.length > 0) {
            var apex = component.get("c.guardarTodasLasSecuencias");
            apex.setParams({ "todasLasSecuencias": todasLasSecuencias });
            apex.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log("Objeto TodasLasSecuencias guardado con éxito.");
                    alert("Se guardo")
                    component.set("v.TodasLasSecuencias", []);
                } else {
                    console.error("Error al guardar el objeto TodasLasSecuencias: ", response.getError());
                }
            });
            $A.enqueueAction(apex);
        } else 
            alert("deben haber elementos en la lista");
    },

    onInit: function(component, event, helper) {
        console.log("Se carga");
        /*var action = component.get("c.obtenerSecuenciasGuardadas");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var secuencias = response.getReturnValue();
                component.set("v.TodasLasSecuencias", secuencias);
                console.log("Secuencias cargadas al cargar la página:", secuencias);
            } else {
                console.error("Error al cargar las secuencias: ", response.getError());
            }
        });
        
        $A.enqueueAction(action);*/
    },

})

