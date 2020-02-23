let dogBar = document.querySelector('#dog-bar')
let dogInfo = document.querySelector('#dog-info')
let goodDogFilter = document.querySelector('#good-dog-filter')

document.addEventListener('DOMContentLoaded', (e) => {
    addDogsToSpan()
    let dogBar = document.querySelector('#dog-bar')
    let goodDogFilter = document.querySelector('#good-dog-filter')
    goodDogFilter.addEventListener('click', function(e) {
        dogBar.innerHTML = ''
        if (e.target.innerHTML === "Filter good dogs: ON") {
            addDogsToSpan()
            // debugger
            e.target.innerHTML = "Filter good dogs: OFF"
            
        } else {
            e.target.innerHTML = "Filter good dogs: ON"
            fetch("http://localhost:3000/pups")
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                let dogBar = document.querySelector('#dog-bar')
                let goodDogs = myJson.filter(dog => dog.isGoodDog === true)
                goodDogs.forEach( function(dog) {
                    let dogSpan = document.createElement('span')
                    dogSpan.innerText = dog.name
                    dogSpan.dataset.id = dog.id
                    dogBar.appendChild(dogSpan)
                    dogSpan.addEventListener('click', function(e) {
                        showDog(dogSpan.dataset.id)
                    })
                })
                
            });
            
            
        }
    })
});



function addDogsToSpan() {
    fetch("http://localhost:3000/pups")
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        let dogBar = document.querySelector('#dog-bar')
        myJson.forEach( function(dog) {
            let dogSpan = document.createElement('span')
            dogSpan.innerText = dog.name
            dogSpan.dataset.id = dog.id
            dogBar.appendChild(dogSpan)
            dogSpan.addEventListener('click', function(e) {
                showDog(dogSpan.dataset.id)
            })
        })
        
    });
}

function showDog(dog_id) {
    let dogInfo = document.querySelector('#dog-info')
    dogInfo.innerHTML = ''
    fetch(`http://localhost:3000/pups/${dog_id}`)
    .then((response) => {
        return response.json();
    })
    .then((dog) => {
        let dogImg = document.createElement('img')
        dogImg.src = dog.image
        let dogName = document.createElement('h2')
        dogName.innerText = dog.name
        let dogButton = document.createElement('button')
        if (dog.isGoodDog) {
            dogButton.innerHTML = 'Good Dog!'
            dogButton.addEventListener('click', function(e) {
                goodBadToggle(dog_id, false)
            })
        } else {
            dogButton.innerHTML = 'Bad Dog!'
            dogButton.addEventListener('click', function(e) {
                goodBadToggle(dog_id, true)
            })
        }
        dogInfo.appendChild(dogImg)
        dogInfo.appendChild(dogName)
        dogInfo.appendChild(dogButton)
    });
}


function goodBadToggle(dog_id, boy) {
    const data = { isGoodDog: boy };
    fetch(`http://localhost:3000/pups/${dog_id}`, {
        method: 'PATCH', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((data) => { showDog(dog_id)})
}