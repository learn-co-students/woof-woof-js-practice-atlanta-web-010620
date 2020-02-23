document.addEventListener("DOMContentLoaded", () => {
    fetchDogs();
}); 

// fetch dog data 
function fetchDogs(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(function(json){
        // debugger; 
        json.forEach(dog => makeDogSpan(dog.name, dog.id))
    })
}


// make spans for dog bar 
function makeDogSpan(name,id){
    let newSpan = document.createElement('span'); 
    newSpan.innerText = name;
    newSpan.dataset.id = id; 
    // add event listener per dog 
    newSpan.addEventListener('click', function(e){
        // use e.target.dataset.id to find the dog in a fetch request by id 

        // inside that fetch, remove the dog-info div's child, then append the new child to it 
        fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
            .then(resp => resp.json())
            .then(function(dog){
                console.log(dog); 
                // location to append dog info to 
                const dogInfo = document.querySelector("#dog-info"); 
                // clear that container 
                dogInfo.innerHTML = ''
                const dogContainer = document.createElement('div'); 
                dogContainer.dataset.id = dog.id;   
                // make container to append dog info to, that will be appended to dog-info container
                const dogImage = document.createElement('img'); 
                dogImage.src = dog.image;
                const dogName = document.createElement('p')
                dogName.innerText = dog.name; 
                // make this a button that displays is good/bad dog and toggles them 
                const dogButton = document.createElement('button'); 
                // set button's text appropriately 
                // debugger 
                if (dog.isGoodDog){
                    dogButton.innerText = 'Good Dog!'; 
                }else{
                    dogButton.innerText = 'Bad Dog!'; 
                }
                // add event to dog button to change its status and send fetch request to tell the server 
                dogButton.addEventListener('click', function(e){
                    // debugger;
                    let dogId = this.parentElement.dataset.id
                    // make fetch to edit data, then rerender the button 
                    if (this.innerText === "Good Dog!"){
                        updateData("isGoodDog",false, `http://localhost:3000/pups/${dogId}`);
                        this.innerText = "Bad Dog!"; 
                    } else {
                        updateData("isGoodDog", true,`http://localhost:3000/pups/${dogId}`)
                        this.innerText = "Good Dog!"; 
                    }
                })          
                dogContainer.appendChild(dogImage); 
                dogContainer.appendChild(dogName); 
                dogContainer.appendChild(dogButton); 
                dogInfo.appendChild(dogContainer); 
            })
    })
    document.querySelector("#dog-bar").appendChild(newSpan); 
}





function updateData(key,value,url){
    let objectData = {
      [key]:value
    }
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json", 
        "Accept": "application/json"
    }, 
    body: JSON.stringify(objectData) 
    };
    return fetch(url,configObj)
    .then(response => response.json())
    .then(function(e){
      // e.preventDefault();
    //   debugger;

    })
  }