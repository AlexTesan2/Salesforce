public with sharing class ElApex {
    public ElApex() {
    }

    @AuraEnabled
    public static void guardarTodasLasSecuencias(List<Object> todasLasSecuencias) {
        List<SObject> registrosAInsertar = new List<SObject>();
        
        for (Object elemento : todasLasSecuencias) {
            if (elemento instanceof SObject) {
                registrosAInsertar.add((SObject)elemento);
            } else {
                System.debug('Elemento no es un SObject: ' + elemento);
            }
        }
        
        try {
            insert registrosAInsertar;
            System.debug('Registros insertados con éxito: ' + registrosAInsertar);
            
            System.debug('registro:');
            for (SObject registro : registrosAInsertar) {
                System.debug('Contenido del registro insertado: ' + registro);
            }
        } catch (Exception e) {
            System.debug('Error al insertar registros: ' + e.getMessage());
        }
    }

    /*@AuraEnabled
    public static List<List<SObject>> obtenerSecuenciasGuardadas() {
        List<List<SObject>> secuenciasGuardadas = new List<List<String>>();
        
        try {
            List<SObject> secuenciasBD = [SELECT Secuencia__c FROM Secuencia__c];
            for (Secuencia__c secuencia : secuenciasBD) {
                secuenciasGuardadas.add(secuencia.Secuencia__c.split(','));
            }
        } catch (Exception e) {
            System.debug('Error al obtener las secuencias guardadas: ' + e.getMessage());
        }
        
        return secuenciasGuardadas;
    }*/
}