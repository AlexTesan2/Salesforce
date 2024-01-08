({//las llaves permiten crear un objeto, 
    myAction : function(component, event, helper) {

    },

    saludar : function(component, event, helper) {
        alert("Hola mundo");
        alert("antes eras " + component.get("v.nombre")+" y ahora eres Alert");
        component.set("v.nombre", "Alert!")//cambiar el valor de la variable nombre
        var evt= $A.get("e.c:evtData");
        evt.setParams({
            "nombre": component.get("v.nombre"),
            "apellido": "Alert!",
        });
        evt.fire();
    }
})
