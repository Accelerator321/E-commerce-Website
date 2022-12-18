

function addToList(name,price){

    let item = {};
    item[name] = price;

    if(!localStorage.getItem('lists')){
        let lists = {"mylist":item};
        lists = JSON.stringify(lists);
        localStorage.setItem('lists',lists);
    }
    else{
        let lists = JSON.parse(localStorage.getItem('lists'));
        let list= Object.keys(lists)[0];
        lists[list][name] = price;
        
 
        localStorage.setItem('lists',JSON.stringify(lists));
    }

    

}
// document.getElementById('addItem').addEventListener('click',addToList);