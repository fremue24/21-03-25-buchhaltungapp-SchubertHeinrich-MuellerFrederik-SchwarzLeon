const itemCtrl = (function(){
    const Item = function(id, description, betrag){
        this.id = id;
        this.description = description;
        this.betrag = betrag;
    }
    
    const data = {
        items:[]
    }
   
    return{
        logData: function(){
            return data;
        },
        addMoney: function(description, betrag){
            
            let ID = itemCtrl.createID();
            
            newMoney = new Item(ID, description, betrag);
            
            data.items.push(newMoney);

            return newMoney;
        },
        createID: function(){
            
            const idNum = Math.floor(Math.random()*10000);
            return idNum;
        },
        getIdNumber: function(item){
            
            const betragId = (item.parentElement.id);
            
            const itemArr = betragId.split('-');
            
            const id = parseInt(itemArr[1]);

            return id;
        },
        deletebetragArr: function(id){
            
            const ids = data.items.map(function(item){
                
                return item.id
            });
           
            const index = ids.indexOf(id)
            
            data.items.splice(index, 1);
        }
    }
})();


const UICtrl = (function(){
    
    const UISelectors = {
        einnahmeBtn: '#add__einnahme',
        ausgabeBtn: '#add__ausgabe',
        description: '#description',
        betrag: '#betrag',
        geldEinnahme: '#betrag__eingenommen',
        geldKonto: '#betrag__kontostand',
        geldAusgabe: '#betrag__ausgegeben',
        einnahmeList: '#einkommen__container',
        augabenList: '#ausgaben__container',
        einkommenItem: '.einkommen__betrag',
        ausgabeItem: '.ausgabe__betrag',
        itemsContainer: '.items__container'
    }
    
    return{
        
        getSelectors: function(){
            return UISelectors
        },
        getDescriptionInput: function(){
            return {
                descriptionInput: document.querySelector(UISelectors.description).value
            }
        },
        getValueInput: function(){
            return{
                betragInput: document.querySelector(UISelectors.betrag).value
            }
        },
        addEinkommenItem: function(item){
            
            const div = document.createElement('div');
            
            div.classList = 'item einkommen'
            
            div.id = `item-${item.id}`
            
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__einkommen">
                <span class="einkommen__betrag">${item.betrag}</span>
                <p class="symbol">€</p>                
            </div>
            <i class="far fa-trash-alt"></i>
            `;
            
            document.querySelector(UISelectors.einnahmeList).insertAdjacentElement('beforeend', div);
        },
        clearInputs: function(){
            document.querySelector(UISelectors.description).value = ''
            document.querySelector(UISelectors.betrag).value = ''
        },
        updateEarned: function(){
            
            const alleinkommen = document.querySelectorAll(UISelectors.einkommenItem);
            
            const einkommenCount = [...alleinkommen].map(item => +item.innerHTML);
           
            const einkommenSum = einkommenCount.reduce(function(a,b){
                return a+b
            },0);
            
            const earnedTotal = document.querySelector(UISelectors.geldEinnahme).innerHTML = einkommenSum.toFixed(2);
        },
        addAusgabeItem: function(item){
            
            const div = document.createElement('div');
            
            div.classList = 'item ausgabe'
            
            div.id = `item-${item.id}`
            
            div.innerHTML = `
            <h4>${item.description}</h4>
            <div class="item__ausgabe">
                <span class="ausgabe__betrag">${item.betrag}</span>
                <p class="symbol">€</p>                
            </div>
            <i class="far fa-trash-alt"></i>
            `;
            
            document.querySelector(UISelectors.augabenList).insertAdjacentElement('beforeend', div);
        },
        updateausgabe: function(){
            
            const allausgaben = document.querySelectorAll(UISelectors.ausgabeItem);
            
            const ausgabeCount = [...allausgaben].map(item => +item.innerHTML)
            
            const ausgabeSum = ausgabeCount.reduce(function(a, b){
                return a+b
            },0)
            
            const ausgabenTotal = document.querySelector(UISelectors.geldAusgabe).innerHTML = ausgabeSum;
        },
        updateKontostand: function(){
            const earned = document.querySelector(UISelectors.geldEinnahme);
            const ausgabe = document.querySelector(UISelectors.geldAusgabe)
            const kontostand = document.querySelector(UISelectors.geldKonto);
            kontostand.innerHTML = ((+earned.innerHTML)-(+ausgabe.innerHTML)).toFixed(2)
        },
        deletebetrag: function(id){
            
            const betragId = `#item-${id}`;
            
            const betragDelete = document.querySelector(betragId);
            
            betragDelete.remove();
        }
    }
})();


const App = (function(){
    
    const loadEventListeners = function(){
        
        const UISelectors = UICtrl.getSelectors();        
        document.querySelector(UISelectors.einnahmeBtn).addEventListener('click', addEinkommen);        
        document.querySelector(UISelectors.ausgabeBtn).addEventListener('click', addAusgabe);        
        document.querySelector(UISelectors.itemsContainer).addEventListener('click', deleteItem);
    }

    
    const addEinkommen = function(){
        
        const description = UICtrl.getDescriptionInput();
        const betrag = UICtrl.getValueInput();
        
        if(description.descriptionInput !=='' && betrag.betragInput !== ''){
            
            const newMoney = itemCtrl.addMoney(description.descriptionInput, betrag.betragInput);
            
            UICtrl.addEinkommenItem(newMoney);
            
            UICtrl.clearInputs();
            
            UICtrl.updateEarned();
            
            UICtrl.updateKontostand();
        }
    }

   
    const addAusgabe = function(){
        
        const description = UICtrl.getDescriptionInput();
        const betrag = UICtrl.getValueInput();
        
        if(description.descriptionInput !=='' && betrag.betragInput !== ''){
            
            const newMoney = itemCtrl.addMoney(description.descriptionInput, betrag.betragInput);
           
            UICtrl.addAusgabeItem(newMoney);
            
            UICtrl.clearInputs();
            
            UICtrl.updateausgabe();
            
            UICtrl.updateKontostand();
        }
    }

    
    const deleteItem = function(e){
        if(e.target.classList.contains('far')){
            
            const id = itemCtrl.getIdNumber(e.target)
            
            UICtrl.deletebetrag(id);
            
            itemCtrl.deletebetragArr(id);
            
            UICtrl.updateEarned();
            
            UICtrl.updateausgabe();
            
            UICtrl.updateKontostand();
        }

        e.preventDefault()
    }

    
    return{
        init: function(){
            loadEventListeners();
        }
    }

})(itemCtrl, UICtrl);

App.init();