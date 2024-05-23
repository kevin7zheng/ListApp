import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-a876e-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shopinDb = ref(database, "shop")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shop")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

    push(shopinDb, inputValue)

    clearinputFieldEl()

})

onValue(shopinDb, function(snapshot){

    if(snapshot.exists()) {

     let itemsArray =Object.entries(snapshot.val())

    clearShoppingListEl()
    
    shoppingListEl.innerHTML = ""
        
     for (let i = 0; i<itemsArray.length; i++) {
         let currentItem = itemsArray[i]
         let currentItemID = currentItem[0]
         let currentItemValue = currentItem[1]
         appendToShopEl(currentItem)
     }

    } else {
        shoppingListEl.style.color = "white";
        shoppingListEl.innerHTML = "<span style='color: black;'>No Items</span>";
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}
function clearinputFieldEl() {
    inputFieldEl.value = ""
}

function appendToShopEl(item) {
    
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click",function() {
        let exactLocationOfIteminDB = ref(database, `shop/${itemID}`);
        remove(exactLocationOfIteminDB)
    })

    shoppingListEl.append(newEl)
}