({
    handleButtonClickEvent: function(component, event, helper) {
        var isRecording = component.get("v.isRecording");
    
        if (isRecording) {
            var buttonName = event.getParam("buttonNumber");            //numero del boton pulsado, que se recibe del evento
            var SecuenciaActual = component.get("v.SecuenciaActual");   //secuencia/Mapeo de botones pulsados
    
            SecuenciaActual += buttonName + ",";                        //añao el numero a la secuencia
    
            component.set("v.SecuenciaActual", SecuenciaActual);        //actualizo la secuencia
        }
    },

    handleRecordClick: function(component, event, helper) {
        component.set("v.isRecording", true);
        component.set("v.SecuenciaActual", "");
    },

    handleStopClick: function(component, event, helper) {
        if (component.get("v.SecuenciaActual") !== "") {
            component.set("v.isRecording", false);

            var SecuenciaActual = component.get("v.SecuenciaActual").split(",");
            var TodasLasSecuencias = component.get("v.TodasLasSecuencias").slice();

            TodasLasSecuencias.push(SecuenciaActual);

            component.set("v.TodasLasSecuencias", TodasLasSecuencias);
            component.set("v.SecuenciaActual", "");
        }
    },

    handlePlay: function(component, event, helper) {
    var action = component.get("c.recuperarTodosLosRegistros2");
    action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
            var secuencias = response.getReturnValue();
            console.log("Secuencias guardadas en la base de datos:");
            secuencias.forEach(function(secuencia) {
                console.log(secuencia);
            });
        } else {
            console.error("Error al obtener las secuencias: ", response.getError());
        }
    });
    $A.enqueueAction(action);
},

    handleGuardar: function(component, event, helper) {
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



    /*handlePlay : function(component, event, helper) {
        var action = component.get("c.recuperarTodosLosRegistros");
        action.setParams({
            nombreDelObjeto : 'YourObjectName' // replace with your object name
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Fetch successful. Records: ", response.getReturnValue());
                component.set("v.records", response.getReturnValue());
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        
        $A.enqueueAction(action);
    }*/
})