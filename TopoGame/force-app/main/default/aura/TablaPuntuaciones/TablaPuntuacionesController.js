({
    myAction : function(component, event, helper) {

    },
    doInit: function(component) {
    
        var getListScores = component.get("c.getListScores");

        getListScores.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var accounts = response.getReturnValue();
                component.set("v.puntuaciones", accounts);
                
            }
        });

        $A.enqueueAction(getListScores);

    }
})
