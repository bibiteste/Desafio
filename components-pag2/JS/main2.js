// APIs Bases URL
const DOG_API_BASE_URL = "https://dog.ceo/api"

// Endpoints definitions
const imgUrlEndpoint = `${DOG_API_BASE_URL}/breeds/image/random/3`
const breedUrlEndpoint = `${DOG_API_BASE_URL}/breeds/list/all`

// Get HTML elements
const mainDivElement = document.getElementById('image-container')
const primaryDogBreedSelect = document.getElementById('primary-dog-breeds')
const formElement = document.getElementById('form')
const loader = document.getElementById('loader')

// Startup function
getRandomImages()
getDogBreeds()

// Get random images for random dogs
function getRandomImages(isReload = false) {
  formElement.style.visibility = 'hidden'
  console.log('entrouuu')
  
  fetch(imgUrlEndpoint)
    .then((res) => res.json())
    .then((data) => configureSuggestedBreedElements(data.message, isReload))
    .then(() => {
      sleep(2000).then(() => {
        loader.style.display = 'none'
        formElement.style.visibility = 'visible'

      })
    })
    .catch((err) => console.error('AQUI ESTÁ O ERRO', err))
}

// Get random images from a specific dog breed
function getDogBreeds() {
  fetch(breedUrlEndpoint).then((res) => res.json())
  .then((data) => addBreedListItems(data.message))
}

// Configure elements for suggested breed section
function configureSuggestedBreedElements(imgArr, isReload) {
  let suggestedBreedDivElement

  if (!isReload) {
    // Setting mainDiv and formElement to hidden
    mainDivElement.style.visibility = 'hidden'
    formElement.style.visibility = 'hidden'


    // Creating a new div for suggested breed
    suggestedBreedDivElement = document.createElement('div')
    suggestedBreedDivElement.id = 'suggested-breed'

    let informationsSuggestedBreedDivElement = document.createElement('div')

    informationsSuggestedBreedDivElement.id = 'informations-suggested-breed'

    let h1Element = document.createElement('h1')
    h1Element.innerHTML = 'Raças Sugeridas'

    let buttonRefreshElement = document.createElement('button')
    buttonRefreshElement.innerHTML = 'clica aqui'
    buttonRefreshElement.setAttribute('onclick', 'reloadRandomImages()')

    let pElementDescription = document.createElement('p')
    pElementDescription.innerHTML =
      'Aqui estão algumas raças que temos disponíveis para adoção'

    informationsSuggestedBreedDivElement.appendChild(h1Element)
    informationsSuggestedBreedDivElement.appendChild(buttonRefreshElement)
    informationsSuggestedBreedDivElement.appendChild(pElementDescription)

    suggestedBreedDivElement.appendChild(informationsSuggestedBreedDivElement)
  }

  let wrapBreedDetailsDivElement = document.createElement('div')
  wrapBreedDetailsDivElement.id = 'wrap-breed-details'

  imgArr.forEach((img, i) => {
    let breedDetailsDivElement = document.createElement('div')
    breedDetailsDivElement.id = `breed-details-${i + 1}`

    const dogImg = document.createElement('img')
    dogImg.src = img
    dogImg.classList.add('img-class')

    breedDetailsDivElement.appendChild(dogImg)

    let treatedBreedName = img.split('/')[4].replace('-', ' ')
    let pTagElement = document.createElement('p')
    pTagElement.innerHTML = capitalizeFirstLetter(treatedBreedName)

    breedDetailsDivElement.appendChild(pTagElement)

    breedDetailsDivElement.classList.add('nome-da-classe-pra-ficar-lado-a-lado')

    wrapBreedDetailsDivElement.appendChild(breedDetailsDivElement)
  })

  if (isReload) {
    wrapBreedDetailsDivElement.style.visibility = 'visible'
  }

  if (suggestedBreedDivElement == null) {
    suggestedBreedDivElement = document.getElementById('suggested-breed')
  }

  suggestedBreedDivElement.appendChild(wrapBreedDetailsDivElement)
  mainDivElement.appendChild(suggestedBreedDivElement)

  // let sectionBreedDivElement = document.createElement('div')

  //   sectionBreedDivElement.id = 'section-breed'

  //   const primaryDogBreedSelect = document.getElementById('primary-dog-breeds')

  //   sectionBreedDivElement.appendChild(primaryDogBreedSelect)

  //   suggestedBreedDivElement.appendChild(sectionBreedDivElement)

}

// Configure elements for dog breed select
// function configureSelectDogBreed(itemObject) {
//   const itemKeys = Object.entries(itemObject)
//   console.log('itemKeys', itemKeys)
//   let treatedBreedOptions = [];

//   for (const key in itemKeys) {
//     treatedBreedOptions.push(itemKeys[key])
//   }

//   treatedBreedOptions = treatedBreedOptions.sort()
//   console.log('treatedBreedOptions', treatedBreedOptions)

//   treatedBreedOptions.forEach(breed => {
//     breed = capitalizeFirstLetter(breed)
//     const breedOption = document.createElement('option')
//     breedOption.text = breed
//     breedOption.value = breed

//     primaryDogBreedSelect.append(breedOption)
//   });


//   console.log(itemKeys)
//   //itemKeys.forEach((item) => addBreedItem(item, itemObject[item]))
// }

// TODO: implement this function
// function selecionar(e) {
//   let label = document.getElementById('label-id')
//   let opcao = e.value
//   label.innerHTML = opcao
// }

// Set first letter as upper case
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Set a time(ms) to sleep the code
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Set personal informations
function sendPersonalInformations() {
  mainDivElement.style.visibility = 'visible'
  console.log('dados enviados')
}

// Reload random images
function reloadRandomImages() {
  let suggestedBreedDivElement = document.getElementById('suggested-breed')

  let wrapBreedDetailsDivElement = document.getElementById('wrap-breed-details')

  wrapBreedDetailsDivElement.style.visibility = 'hidden'

  suggestedBreedDivElement.removeChild(wrapBreedDetailsDivElement)

  getRandomImages(true)
}




function addBreedListItems(itemObject) {
  const itemKeys = Object.keys(itemObject)
  console.log('itemKeys', itemKeys)
  itemKeys.forEach((item) => addBreedItem(item, itemObject[item]))
}

function addBreedItem(breed, subBreeds) {
  addBreed(breed)
  subBreeds.forEach((sb) => addBreed(`${breed} ${sb}`))
}

function addBreed(breed) {
  const breedOption = document.createElement('option')
  breedOption.text = capitalizeFirstLetter(breed)
  breedOption.value = breed
  primaryDogBreedSelect.appendChild(breedOption)
}