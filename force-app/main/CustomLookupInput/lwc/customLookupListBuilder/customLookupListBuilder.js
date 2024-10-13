import { LightningElement, api } from 'lwc';

export default class CustomLookupListBuilder extends LightningElement 
{
    @api value; // Ex: 00198765432 - (Could predefine values)
    @api selectedResultSOBJ; // Ex: SObject(Id='00198765432', Name='Example')

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

    get selectedObjectPlaceholder()
    {
        return 'Buscar por '+this.selectedObjectLabel+"(s)";
    }

    get searchInputResults()
    {
        let objArray = [];
        for (let obj of this.searchResults)
        {
            objArray.push({key: obj.Id, name: obj[this.fieldsToSearch[1]]});
        }
        return objArray;
    }

    //
    // Other
    //

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

    sendChooseResultEvent()
    {
        this.dispatchEvent(new CustomEvent('chooseresult', {
            detail: {
                record: this.selectedResultSOBJ
            }
        }));
    }

    searchResultInputChange(e)
    {
        this.searchResults = [];
        this.searchTerm = e.target.value;

        this.dispatchEvent(new CustomEvent('inputchange', {
            detail: {
                searchTerm: e.target.value,
                fieldsToSearch: this.fieldsToSearch,
                selectedObject: this.selectedObject
            }
        }));
    }
}