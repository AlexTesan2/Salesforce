public with sharing class RandomApex {
    public RandomApex() {

    }

    // Returns a random number between 0 (inclusive) and 1 (exclusive)
    @AuraEnabled
    public static Double random() {
        return Math.random();
    }

    @AuraEnabled
    public static Void insertScore(String nombre, String puntuacion) {
        Account account = new Account(Name=nombre, DunsNumber=puntuacion);
        insert account;
    }
    
    @AuraEnabled
    public static List<Account> getListScores(){
        try {
            Account[] accounts = [SELECT Name, DunsNumber FROM Account];
            return accounts;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static void guardarTodasLasSecuencias(List<Object> todasLasSecuencias) {
        List<SObject> registrosAInsertar = new List<SObject>();
        
        // Iterar sobre cada elemento en la lista
        for (Object elemento : todasLasSecuencias) {
            // Verificar si el elemento es un SObject (objeto de Salesforce)
            if (elemento instanceof SObject) {
                registrosAInsertar.add((SObject)elemento);
            } else {
                System.debug('Elemento no es un SObject: ' + elemento);
            }
        }
        
        // Insertar los registros en la base de datos
        try {
            insert registrosAInsertar;
            System.debug('Registros insertados con éxito: ' + registrosAInsertar);
            
            // Mostrar el contenido de los registros insertados en la base de datos
            System.debug('registro:');
            for (SObject registro : registrosAInsertar) {
                System.debug('Contenido del registro insertado: ' + registro);
            }
        } catch (Exception e) {
            System.debug('Error al insertar registros: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static List<SObject> recuperarTodosLosRegistros(String nombreDelObjeto) {
        // Crear la consulta SOQL
        String consulta = 'SELECT Id FROM ' + nombreDelObjeto;
        
        // Ejecutar la consulta y devolver los resultados
        try {
            List<SObject> registros = Database.query(consulta);
            System.debug('Registros recuperados con éxito: ' + registros);
            return registros;
        } catch (Exception e) {
            System.debug('Error al recuperar registros: ' + e.getMessage());
            return null;
        }
    }

    @AuraEnabled
    public static List<SObject> recuperarTodosLosRegistros2() {
        // Crear la consulta SOQL
        String consulta = 'SELECT Id FROM MyCustomObject__c';
        
        // Ejecutar la consulta y devolver los resultados
        try {
            List<SObject> registros = Database.query(consulta);
            System.debug('Registros recuperados con éxito: ' + registros);
            return registros;
        } catch (Exception e) {
            System.debug('Error al recuperar registros: ' + e.getMessage());
            return null;
        }
    }


    /*@AuraEnabled
    public static List<List<SObject>> getTodasLasSecuencias() {
        List<List<String>> secuencias = new List<List<String>>();
        try {
            List<SObject> registros = [SELECT DunsNumber FROM Account];
            for (SObject registro : registros) {
                String dunsNumber = (String) registro.get('DunsNumber');
                List<String> secuencia = new List<String>();
                if (!String.isEmpty(dunsNumber)) {
                    secuencia = dunsNumber.split(',');
                }
                secuencias.add(secuencia);
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return secuencias;
    }*/


}