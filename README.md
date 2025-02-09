# Instalar
<a href="https://githubsfdeploy.herokuapp.com?owner=DiegoSou&repo=Apex-CustomLookup&ref=main">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

---

# Documentação
O componente principal se chama customLookupForm. Para funcionar, ele precisa de uma configuração nesse formato:
```js
{
    label:  "ROTULO_EXIBICAO",
    objectsToSearch: ["SOBJ_1__c", "SOBJ_2__c"],
    objectLabelByObjectMap: { "SOBJ_1__c": "ROTULO_SOBJ_1", "SOBJ_2__c": "ROTULO_SOBJ_2" },
    objectIconByObjectMap: { "SOBJ_1__c": "SLDS_ICON_1", "SOBJ_2__c": "SLDS_ICON_2" },
    fieldsToSearchByObjectMap: { "SOBJ_1__c": ['Id', 'Name'], "SOBJ_2__c": ['Id', 'Name'] }
}
``` 

Em que: <br/><br/>
* <b>label</b> é o rótulo que o input terá, mesmo comportamento do input padrão. <br/>
* <b>objectsToSearch</b> é um array que contém o nome de api dos sobjects que você vai buscar.
* <b>objectLabelByObjectMap</b> é um objeto com as chaves igual aos nomes de api dos sobjects que você vai buscar, e os valores sendo os rótulos que você utiliza para estes sobjects. <br/>
* <b>objectIconByObjectMap</b> é um objeto com as chaves igual aos nomes de api dos sobjects que você vai buscar, e os valores sendo os ícones que você utiliza para estes sobjects. <br/>
* <b>fieldsToSearchByObjectMap</b> é um objeto com as chaves igual aos nomes de api dos sobjects que você vai buscar, e os valores sendo arrays com cada campo que você irá utilizar, o primeiro campo será sempre o Id, e o segundo campo é o campo para fazer a busca. <br/>

---

# Código de exemplo
Você pode encontrar um exemplo no diretório force-app/main/example/aura/CustomLookupInputExample

---

# Prints
<p align="center"><img src="https://github.com/user-attachments/assets/6d8e6527-1058-458f-b164-ec157ecb1be0" width="50%"></img></p>
<p align="center"><img src="https://github.com/user-attachments/assets/68aa0129-e6f8-42b8-af41-c45f5e5274ae" width="50%"></img></p>
<p align="center"><img src="https://github.com/user-attachments/assets/69d5bba8-e53c-43a7-bf66-fae063acd36a" width="50%"></img></p>

