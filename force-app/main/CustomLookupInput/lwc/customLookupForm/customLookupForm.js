import { LightningElement, api } from 'lwc';

export default class CustomLookupForm extends LightningElement 
{
    @api value; // Ex: 00198765432 - (Could predefine values)
    @api selectedResultSOBJ; // Ex: SObject(Id='00198765432', Name='Example')

    // Custom Lookup Imput Params
    @api label; // Ex: Conta
    @api objectsToSearch; // Ex: ['Account'];
    @api objectLabelByObjectMap; // Ex: { 'Account': 'Conta', 'Case': 'Caso' };
    @api objectIconByObjectMap; // Ex: 'Account': 'standard:account', 'Case': 'standard:case' };
    @api fieldsToSearchByObjectMap; // Ex: { 'Account': ['Id', 'Name'], 'Case': ['Id', 'CaseNumber'] };
    @api searchResults; // Ex: [SObject, SObject]

    // Ex: 'Burlington Textiles'
    @api searchTerm;

    // Ex: ['Id', 'Name']
    @api fieldsToSearch;

    // Ex: 'Account'
    @api selectedObject;

    // Ex: 'Conta'
    @api selectedObjectLabel;

    // Triggers the custom lookup modal
    _showModalOfResults = false;

    isChanging = false;

    //
    // gets
    //

    get showModalOfResults()
    {
        return this._showModalOfResults;
    }

    //
    // Event handlers
    //

    handleOpenModal(e)
    {
        this.searchTerm = e.detail.searchTerm;
        this.fieldsToSearch = e.detail.fieldsToSearch;
        this.selectedObject = e.detail.selectedObject;
        this.selectedObjectLabel = e.detail.selectedObjectLabel;
        this.selectedObjectIcon = e.detail.selectedObjectIcon;

        this._showModalOfResults = true;
        this.dispatchEvent(new CustomEvent('openmodal', {
            detail: {
                searchTerm: this.searchTerm,
                fieldToSearch: this.fieldsToSearch[1],
                selectedObject: this.selectedObject,
            }
        }));
    }

    handleCloseModal(e)
    {
        this.searchTerm = '';
        this._showModalOfResults = false;
        this.dispatchEvent(new CustomEvent('closemodal'));
    }

    handleChooseResult(e)
    {
        this.value = e.target.value;
        this.selectedResultSOBJ = e.detail.record;

        if (this._showModalOfResults) 
        { 
            this.template.querySelector('c-custom-lookup-input').chooseResultFromModal(this.value, this.selectedResultSOBJ);
            this.handleCloseModal(e);
        }
    }

    handleRemoveSelectedResult()
    {
        this.dispatchEvent(new CustomEvent('removeselectedresult'));
    }

    handleInputChange(e)
    {
        this.isChanging = true;
        this.searchTerm = e.detail.searchTerm;
        this.fieldsToSearch = e.detail.fieldsToSearch;
        this.selectedObject = e.detail.selectedObject;

        setTimeout(() => {
            if (!this.isChanging)
            {
                this.isChanging = true;
                this.dispatchEvent(new CustomEvent('inputchange', {
                    detail: { 
                        searchTerm: this.searchTerm, 
                        fieldToSearch: this.fieldsToSearch[1], 
                        selectedObject: this.selectedObject
                    }
                }));
            }
        }, 1000);

        setTimeout(() => { this.isChanging = false; }, 500);
    }
}