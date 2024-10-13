// Arquivo: NewRecordFormSearchController.cls

/** 
 * @author Diego
 * @description Search last viewed sobjects or param based sobjects
 */
public with sharing class CustomLookupController 
{
    @AuraEnabled
    public static List<SObject> search(String selectedObject, String fieldToSearch, String searchTerm, Integer intLimit, Boolean debugMode) {
        // SQL Injection protect
        Schema.SObjectType sobjType = Schema.getGlobalDescribe().get(selectedObject);
        if (sobjType == null) { throw new AuraHandledException('SObject not recognized: '+selectedObject); }
        if (sobjType.getDescribe().fields.getMap().get(fieldToSearch) == null) { throw new AuraHandledException('Field not recognized: '+fieldToSearch); }
        String search = '%'+String.escapeSingleQuotes(searchTerm)+'%';
        String query = 'SELECT Id, '+String.escapeSingleQuotes(fieldToSearch)+' FROM ' +String.escapeSingleQuotes(selectedObject)+ ' WHERE ' +String.escapeSingleQuotes(fieldToSearch)+ ' LIKE :search ORDER BY LastViewedDate DESC LIMIT '+ intLimit;
        List<SObject> results = Database.query(query);

        if (debugMode) {
            System.debug('CustomLookup query: '+query);
            System.debug('Search value: '+search);
            System.debug('Results: '+results);
        }

        return results;
    }
}