import { LightningElement, api } from 'lwc';

export default class CustomLookupModal extends LightningElement 
{
    @api value;

    // Ex: 'Burlington Textiles'
    @api searchTerm;

    // Ex: ['Id', 'Name']
    @api fieldsToSearch;

    // Ex: 'Account'
    @api selectedObject;

    // Ex: 'Conta'
    @api selectedObjectLabel;

    // Ex: 'standard:account'
    @api selectedObjectIcon;

    // Ex: [SObject, SObject]
    @api searchResults;

    //
    // gets
    //

    get modalTitle()
    {
        return this.selectedObject + ': ' + this.fieldsToSearch[1]; 
    }

    get noResults()
    {
        return this.searchResults.length == 0;
    }

    //
    // Other
    //

    // Triggered when click in 'X' or 'Cancel'

    closeModal()
    {
        this.searchTerm = '';
        this.fieldToSearch = '';
        this.selectedObject = '';
        this.selectedObjectLabel = '';
        this.searchResults = [];

        this.sendCloseModal();
    }

    //
    // Custom Events
    //

    sendCloseModal()
    {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }

    handleChooseResult(e)
    {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent('chooseresult', {
            detail: {
                record: e.detail.record
            }
        }));
    }

    handleInputChange(e)
    {
        this.dispatchEvent(new CustomEvent('inputchange', {
            detail: { 
                searchTerm: e.detail.searchTerm, 
                fieldsToSearch: e.detail.fieldsToSearch, 
                selectedObject: e.detail.selectedObject
            }
        }));
    }
}