// Arquivo: NewRecordFormHelper.js

({
    setLookupInfo : function(component, helper)
    {
        component.set('v.customLookupBuild', {
            label: 'Choose record',
            objectsToSearch: ['Account', 'Opportunity'],
            objectLabelByObjectMap: { 'Account': 'Conta', 'Opportunity': 'Oportunidade' },
            objectIconByObjectMap: { 'Account': 'standard:account', 'Opportunity': 'standard:opportunity' },
            fieldsToSearchByObjectMap: { 'Account': ['Id', 'Name'], 'Opportunity': ['Id', 'Name'] }
        });
    },

    searchResults : function(component, helper, selectedObject, fieldToSearch, searchTerm)
    {
        var action = component.get("c.search");
        action.setParams({ 
            selectedObject : selectedObject,
            fieldToSearch : fieldToSearch,
            searchTerm : searchTerm,
            intLimit : component.get('v.resultsLimit'),
            debugMode : true
        });
        action.setCallback(this, function(response) {
            if (response.getState() == 'SUCCESS')
            {
                component.set('v.results', response.getReturnValue());
                if (response.getReturnValue().length > 0) {
                    component.set('v.hasResults', 'true');
                }
            }
        });
        $A.enqueueAction(action);
    }
})