document.addEventListener('DOMContentLoaded', function() {
    
    fetchDogs()

})

const dogURL = 'http://localhost:3000/pups/'
const dogbarDiv = document.getElementById('dog-bar')
const dogInfoDiv = document.getElementById('dog-info')

const fetchDogs = () => {
    fetch(dogURL)
    .then(res => res.json())
    .then(data => data.forEach(dog => renderDogs(dog)))
}

const renderDogs = (dog) => {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name

    dogbarDiv.appendChild(dogSpan)

    dogSpan.addEventListener('click', () => {
        showOneDog(dog)
    })
}

const showOneDog = (dog) => {
    while (dogInfoDiv.firstChild) {
        dogInfoDiv.firstChild.remove()
    }
    const dogImage = document.createElement('img')
    dogImage.src = dog.image
    
    const dogName = document.createElement('h2')
    dogName.innerText = dog.name

    const dogBtn = document.createElement('button')
    dogBtn.id = dog.id
    if (dog.isGoodDog === true) {
        dogBtn.innerText = "Good Dog! 🐶"
    } else {
        dogBtn.innerText = "Bad Dog! 🙅🏻‍♂️"
    }
    
    dogBtn.addEventListener('click', () => {
        dog.isGoodDog = !dog.isGoodDog
        if (dog.isGoodDog === true) {
            dogBtn.innerText = "Good Dog! 🐶"
        } else {
            dogBtn.innerText = "Bad Dog! 🙅🏻‍♂️"
        }
        // debugger
        fetch(`http://localhost:3000/pups/${dogBtn.id}`, {
            method: 'PATCH',

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: dog.isGoodDog
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        
    })
    dogInfoDiv.append(dogImage, dogName, dogBtn)
}




