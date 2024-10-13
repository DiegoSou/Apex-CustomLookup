import { LightningElement, api } from 'lwc';

export default class CustomLookupModalNoResults extends LightningElement 
{
    // Ex: 'Burlington Textiles'
    @api searchTerm;

    // Ex: 'Conta'
    @api selectedObjectLabel;

    //
    // gets
    //

    get illustrationMessage()
    {
        return 'Nenhum resultado para "' + this.searchTerm + '" em ' + this.selectedObjectLabel + '(s)';
    }
}