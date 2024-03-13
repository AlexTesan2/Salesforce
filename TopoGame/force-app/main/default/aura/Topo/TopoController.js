
({
    doInit: function(cmp) {
        var topo = cmp.find("topo");
        //Math.random() < 0.5 ? $A.util.addClass(topo, 'active') : $A.util.addClass(topo, 'inactive') ;
        
        //var number =Math.random() ;
        var randomNumberGenerator = cmp.get("c.random");

        randomNumberGenerator.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var number = response.getReturnValue();
                if(number < 0.5){
                    $A.util.addClass(topo, 'active');
                    cmp.set("v.isTopo",true)
                }else{
                    $A.util.addClass(topo, 'inactive');
                    cmp.set("v.isTopo",false)
                }
            }
        });

        // randomNumberGenerator.setParams({
        //     "min": 0,
        //     "max": 1
        // });

        $A.enqueueAction(randomNumberGenerator);



    
    
    },
    topoClick: function(cmp, event, helper) {
        // this function trigger an event
        // fire the event using that event name
        var isTopo = cmp.get("v.isTopo");
        console.log("isTopo: " + isTopo);
        var evt = $A.get("e.c:Puntuacion");
        console.log("evt: " + evt);
        evt.setParams({
            "molePoint": isTopo ? 2 : 0 
        });
        evt.fire();
    }
})

