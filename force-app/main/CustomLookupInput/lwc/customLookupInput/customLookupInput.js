/** 
 * @author Diego
 * @description Lookup input objectives:
 * Search records selecting custom objects with their icons and labels 
 * Send custom events to parent
*/

import { LightningElement, api } from 'lwc';

export default class CustomLookupInput extends LightningElement 
{
    @api value; // Ex: 00198765432 - (Could predefine values)
    @api selectedResultSOBJ; // Ex: SObject(Id='00198765432', Name='Example')

    @api label;
    @api objectsToSearch // Ex: ['Account'];
    @api objectLabelByObjectMap // Ex: { 'Account': 'Conta', 'Case': 'Caso' };
    @api objectIconByObjectMap // Ex: 'Account': 'standard:account', 'Case': 'standard:case' };
    @api fieldsToSearchByObjectMap // Ex: { 'Account': ['Id', 'Name'], 'Case': ['Id', 'CaseNumber'] };
    @api useParentRule = !false;

    // Ex: 'Account'
    @api selectedObject;

    // Ex: 'Burlington Textiles'
    @api searchTerm = '';

    // Ex: [SObject, SObject]
    @api searchResults;

    // Ex: True if the mouse is over object results selection
    mouseOverObjectResults

    // Ex: True if the mouse is over search results selection
    mouseOverSearchResults;

    //
    // gets
    //

    get selectedObjectLabel()
    {
        return this.objectLabelByObjectMap[this.selectedObject];
    }

    get selectedObjectIcon()
    {
        return this.objectIconByObjectMap[this.selectedObject];
    }

    get selectedObjectFieldsToSearch()
    {
        return this.fieldsToSearchByObjectMap[this.selectedObject];
    }

    get selectedObjectPlaceholder()
    {
        return 'Buscar por '+this.selectedObjectLabel+"(s)";
    }

    get availableObjects()
    {
        let objArray = [];
        for (let objApi of this.objectsToSearch)
        {
            if (this.selectedObject == objApi) continue;
            objArray.push({apiName: objApi, label: this.objectLabelByObjectMap[objApi], icon: this.objectIconByObjectMap[objApi]});
        }
        return objArray;
    }

    get searchInputResults()
    {
        let objArray = [];
        for (let obj of this.searchResults)
        {
            objArray.push({key: obj[this.selectedObjectFieldsToSearch[0]], name: obj[this.selectedObjectFieldsToSearch[1]]});
        }
        return objArray;
    }

    get selectedResult()
    {
        return {key: this.selectedResultSOBJ[this.selectedObjectFieldsToSearch[0]], name: this.selectedResultSOBJ[this.selectedObjectFieldsToSearch[1]]};
    }

    get haveMoreOneSObject()
    {
        return this.objectsToSearch.length > 1;
    }

    //
    // Lifecycle Hooks
    //

    connectedCallback()
    {
        this.selectedObject = this.objectsToSearch[0];
    }

    //
    // DOM Event handlers
    //

    // Object Selection Results

    selectObjectInputClick(e)
    {
        this.template.querySelector('[data-id="search-input-menu"]').classList.remove('slds-is-open');
        this.template.querySelector('[data-id="select-object-menu"]').classList.toggle('slds-is-open');
    }

    selectObjectInputBlur(e)
    {
        if (this.mouseOverObjectResults) return;
        this.template.querySelector('[data-id="select-object-menu"]').classList.remove('slds-is-open');
    }

    mouseEnterObjectResults(e)
    {
        this.mouseOverObjectResults = true;
    }

    mouseLeaveObjectResults(e)
    {
        this.mouseOverObjectResults = false;
    }

    chooseObject(e)
    {
        this.selectedObject = e.currentTarget.dataset.id;
        this.searchResults = [];
        this.value = '';
        this.searchTerm = '';
        this.selectedResultSOBJ = undefined;
    }

    // Search Item Selection Results

    searchResultInputClick(e)
    {
        if (this.haveMoreOneSObject) {
            this.template.querySelector('[data-id="select-object-menu"]').classList.remove('slds-is-open');
        }
        this.template.querySelector('[data-id="search-input-menu"]').classList.add('slds-is-open');   
    }

    searchResultInputBlur(e)
    {
        if (this.mouseOverSearchResults) return;
        this.template.querySelector('[data-id="search-input-menu"]').classList.remove('slds-is-open');
    }

    mouseEnterSearchResults(e)
    {
        this.mouseOverSearchResults = true;
    }

    mouseLeaveSearchResults(e)
    {
        this.mouseOverSearchResults = false;
    }

    chooseResult(e)
    {
        this.value = e.currentTarget.dataset.id;
        for(let obj of this.searchResults)
        {
            if (obj['Id'] != this.value) continue;
            this.selectedResultSOBJ = obj;
        }
        this.sendChooseResultEvent();
    }

    @api chooseResultFromModal(value, selectedSObj)
    {
        this.value = value;
        this.selectedResultSOBJ = selectedSObj;
    }

    removeSelectedResult()
    {
        this.value = '';
        this.selectedResultSOBJ = undefined;
        this.sendRemoveSelectedResultEvent();
    }

    //
    // Other
    //

    showResultsClick(e)
    {
        this.sendOpenModalEvent();

        // Focus on input again
        this.template.querySelector('[data-id="search-input-text"]').focus();
    }

    searchResultInputChange(e)
    {
        this.searchResults = [];
        this.searchTerm = e.target.value;

        this.dispatchEvent(new CustomEvent('inputchange', {
            detail: {
                searchTerm: e.target.value,
                fieldsToSearch: this.selectedObjectFieldsToSearch,
                selectedObject: this.selectedObject
            }
        }));
    }

    //
    // Custom Events
    //

    sendOpenModalEvent() 
    {
        this.dispatchEvent(new CustomEvent('openmodal', {
            detail: {
                searchTerm: this.searchTerm,
                fieldsToSearch: this.selectedObjectFieldsToSearch,
                selectedObject: this.selectedObject,
                selectedObjectLabel: this.selectedObjectLabel,
                selectedObjectIcon: this.selectedObjectIcon
            }
        }));
    }

    sendChooseResultEvent()
    {
        this.dispatchEvent(new CustomEvent('chooseresult', {
            detail: {
                record: this.selectedResultSOBJ
            }
        }));
    }

    sendRemoveSelectedResultEvent()
    {
        this.dispatchEvent(new CustomEvent('removeselectedresult'));
    }
}