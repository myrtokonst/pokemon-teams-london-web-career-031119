const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`
const teamList = document.querySelector('main')
//fetch data
// const getPokemon= () => fetch(TRAINERS_URL).then(resp => resp.json())
const getTrainers = () => {
  debugger
  return fetch(TRAINERS_URL).then(resp => resp.json())
}



//render one Trainer
const renderTrainer = trainer => {
    const li = document.createElement('li')

    li.innerHTML = `<div class="card" data-id="1"><p>${trainer.name}</p>
      <button class = 'add' data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul id='pokemons'>
      </ul>
    </div>
    `
    teamList.append(li)


    trainer.pokemons.forEach(pokemon => {
    const ul = li.querySelector('#pokemons')
    const pok = document.createElement('li')
        pok.innerHTML = `
         <li>'${pokemon.nickname}'
        <button class="release" data-pokemon-id="140">Release</button>
        </li>
        `
        ul.append(pok)
        //attach delete event listener
        deletePokemon(pok, trainer, pokemon)
      })

      const addButton = li.querySelector('.add')
      addButton.addEventListener('click', () => addPokemon(trainer))
}

//render all trainers
const renderTrainers = pokemons => {
  teamList.innerHTML = ''
  pokemons.forEach(renderTrainer)
}
//add a pokemon

  //function used to add pokemon
const addPokemon = (trainer) => {
  fetch(`http://localhost:3000/pokemons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"trainer_id": `${trainer.id}` })
      }
  ).then(resp => resp.json).then(() => getTrainers()).then(renderTrainers)
}


// delete a pokemon
const deletePokemon = (pok, trainer, pokemon) => {
    //1.select the button
  const deleteBtn = pok.querySelector('.release')
    //2.attach an event listener
  deleteBtn.addEventListener('click', ()=> {
    //3.delete from server
    return fetch(`http://localhost:3000/pokemons/${pokemon.id}`,
    { method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  )
    //4.delete from page
  .then(() => pok.remove())
}
)}






//initialize
const init = () => {
  getTrainers().then(renderTrainers)
}

init()
