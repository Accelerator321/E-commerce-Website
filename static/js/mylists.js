let element = document.getElementById('list-container');
function append(name){
    let lists = JSON.parse(localStorage.getItem('lists'));

    // append the list items
    for(let list in lists){
        let ul = `<ul>`;
        let listName = list;
        for(let item in lists[list]){
            
            let price = lists[list][item];
            ul+=`<li><strong>${item}</strong>  ${price}</li>`
            // element.innerHTML += `${item} ${d[list][item]}`;
 
            // console.log(`${item} ${d[lists][item]}`);
        }
        ul+=`</ul>`
        
        element.innerHTML += `<div class="accordion my-4" id="accordionExample"> <div class="accordion-item"> <h2 class="accordion-header" id="headingOne"> <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> ${listName} </button> </h2> <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample"> <div class="accordion-body">${ul}</div> </div> </div> </div>`;
    }

// create the accordian

}

if (!localStorage.getItem('lists')){

    element.innerHTML = 'No lists Found';
    
}

else{
    append();
}