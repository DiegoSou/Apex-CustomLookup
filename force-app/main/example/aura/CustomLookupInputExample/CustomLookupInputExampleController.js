// Arquivo: NewRecordFormController.js

({
    doInit: function (component, event, helper)
    {
        helper.setLookupInfo(component, helper);

        var lookupBuild =  component.get('v.customLookupBuild');
        helper.searchResults(component, helper, lookupBuild.objectsToSearch[0], lookupBuild.fieldsToSearchByObjectMap[lookupBuild.objectsToSearch[0]][1], '');
    },

    handleSearchChange: function(component, event, helper)
    {
        helper.searchResults(component, helper, event.getParam('selectedObject'), event.getParam('fieldToSearch'), event.getParam('searchTerm'));
    },

    expandLimit: function(component, event, helper)
    {
        component.set('v.resultsLimit', 50);
        helper.searchResults(component, helper, event.getParam('selectedObject'), event.getParam('fieldToSearch'), event.getParam('searchTerm'));
    },

    decreaseLimit: function(component, event, helper)
    {
        component.set('v.resultsLimit', 5);

        var lookupBuild =  component.get('v.customLookupBuild');
        helper.searchResults(component, helper, lookupBuild.objectsToSearch[0], lookupBuild.fieldsToSearchByObjectMap[lookupBuild.objectsToSearch[0]][1], '');
    }
})