document.addEventListener('DOMContentLoaded', function() {
    
    fetchDogs()

})

const dogURL = 'http://localhost:3000/pups/'

function fetchDogs() {
    fetch(dogURL)
    .then(res => res.json())
    .then(data => renderDogs(data))
}

function renderDogs(data) {
    data.forEach(dog => {
        dogCard(dog)
    })
}

function dogCard(dog) {
    const topDog = document.getElementById('dog-bar')
    const span = document.createElement('span')
    span.innerText = dog.name

    span.addEventListener('click', function() {
        dogInfo(dog)


    })
    
    
    
    topDog.appendChild(span)
}

function dogInfo(dog) {
    const dogInfoDiv = document.getElementById('dog-info')
    while (dogInfoDiv.firstChild) {
        dogInfoDiv.firstChild.remove();
    }
    const dogImage = document.createElement('img')
    const dogName = document.createElement('h2')
    const dogBtn = document.createElement('button')

    dogImage.src = dog.image
    dogName.innerText = dog.name
    
    if (dog.isGoodDog) {
        dogBtn.innerText = 'Good Dog!'
    } else {
        dogBtn.innerText = 'Bad Dog! 🙅🏻‍♂️'
    }

    dogBtn.dataset.id = dog.id
    dogBtn.addEventListener('click', function(e) {
        handleToggle(e)
    })

    
    // dogInfoDiv.innerHTML = ""
    dogInfoDiv.appendChild(dogImage)
    dogInfoDiv.appendChild(dogName)
    dogInfoDiv.appendChild(dogBtn)


}

function handleToggle(e) {
    let newInfo = (e.target.innerText === 'Good Dog!' ? false : true)
    
    fetch(dogURL + e.target.dataset.id, {
        method: 'PATCH',

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        body: JSON.stringify({isGoodDog: newInfo})
    })
    e.target.innerText = (newInfo ? 'Good Dog!' : 'Bad Dog! 🙅🏻‍♂️')
}