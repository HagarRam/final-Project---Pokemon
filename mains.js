import data from './data.json' assert { type: 'json' };
console.log(data);
let allThepokemon = document.getElementById('allThePokeman');

let i = 0;

function fillElementWithPokemonData(pokemonIndex, newElement, creatorType) {
	let pokemonImage = createPokemonImage(pokemonIndex, creatorType);
	let pokemonName = createPokemonName(pokemonIndex, creatorType);
	let pokemonIDElement = createPokemonID(pokemonIndex, creatorType);

	newElement.appendChild(pokemonIDElement);
	newElement.appendChild(pokemonImage);
	newElement.appendChild(pokemonName);
}

function createPokemonName(pokemonIndex, creatorType) {
	let pokemonName = document.createElement('div'); // open the modal when clicking the pokemon box

	pokemonName.className = `plemonName${creatorType}`;
	pokemonName.innerHTML = data[pokemonIndex].name.english;

	return pokemonName;
}

function createPokemonImage(pokemonIndex, creatorType) {
	let pokemonImage = document.createElement('img');

	pokemonImage.className = `pkemonImage${creatorType}`;
	pokemonImage.src = data[pokemonIndex].image.hires;
	pokemonImage.id = `pokemonImage${creatorType} ${pokemonIndex}`; //openIdToTheImg

	return pokemonImage;
}

function createPokemonID(pokemonIndex, creatorType) {
	let pokemonIDElement = document.createElement('div');
	pokemonIDElement.className = `pokemonID${creatorType}`;

	//index and counter//
	if (data[pokemonIndex].id < 10) {
		pokemonIDElement.innerHTML = '#00' + data[pokemonIndex].id;
	} else if (data[pokemonIndex].id < 100) {
		pokemonIDElement.innerHTML = '#0' + data[pokemonIndex].id;
	} else {
		pokemonIDElement.innerHTML = '#' + data[pokemonIndex].id;
	}

	return pokemonIDElement;
}

function createPokemon(pokemonIndex) {
	let pokemon = document.createElement('div'); //open div

	pokemon.addEventListener('click', () => openPokemonModal(pokemonIndex));

	//OpenclassName
	pokemon.className = 'pokemon';

	fillElementWithPokemonData(pokemonIndex, pokemon, '');

	return pokemon;
}

function listPokemon(x) {
	for (let i = x; i < x + 12; i++) {
		let pokemon = createPokemon(i);
		allThepokemon.appendChild(pokemon);
	}
}

listPokemon(i);

//modal//

const pokemonContainer = document.getElementById('pokemon-container');

function createStatsBox(pokemonIndex) {
	let statsBox = document.createElement('div');
	statsBox.innerHTML = 'stats:';
	statsBox.className = 'stats';
	let allTheBoxes = document.createElement('div');
	allTheBoxes.className = 'allTheBoxes';

	for (let stat of Object.keys(data[pokemonIndex].base)) {
		let statBox = document.createElement('div');
		let statTitle = document.createElement('p');
		let statValue = document.createElement('p');
		statTitle.className = 'statTitle';
		statValue.className = 'statValue';

		statBox.className = `statBox`;
		statTitle.innerHTML = `${stat}:`;
		statValue.innerHTML = data[pokemonIndex].base[stat];
		statBox.appendChild(statTitle);
		statBox.appendChild(statValue);
		allTheBoxes.appendChild(statBox);
		statsBox.appendChild(allTheBoxes);
	}

	return statsBox;
}

function createPokeEgg(pokemonIndex) {
	let pokeEgg = document.createElement('div');

	for (let egg of data[pokemonIndex].profile.egg) {
		let eggBox = document.createElement('div');
		// add class to egg
		let fatherEgg = document.createElement('div');
		fatherEgg.className = 'fatherEgg';
		eggBox.id = egg;
		eggBox.innerHTML = egg;
		fatherEgg.appendChild(eggBox);
		pokeEgg.appendChild(fatherEgg);
		pokeEgg.className = 'poke';
	}
	return pokeEgg;
}

function createPokeProfile(pokemonIndex) {
	let pokeEgg = createPokeEgg(pokemonIndex);
	let pokeProfile = document.createElement('div');

	pokeProfile.appendChild(pokeEgg);

	return pokeProfile;
}

function createDescriptionBox(pokemonIndex) {
	let descriptionBox = document.createElement('div');
	let descriptionText = document.createElement('p');
	let descriptionTitle = document.createElement('div');

	descriptionTitle.innerHTML = 'Description';
	descriptionText.innerHTML = data[pokemonIndex].description;

	descriptionBox.className = 'descriptionBox';
	descriptionTitle.className = 'descriptionTitle';
	descriptionText.className = 'descriptionText';
	descriptionBox.appendChild(descriptionTitle);
	descriptionBox.appendChild(descriptionText);

	return descriptionBox;
}

function createPokemonDetailsBox(pokemonIndex) {
	let descriptionBox = createDescriptionBox(pokemonIndex);
	let statsBox = createStatsBox(pokemonIndex);
	let pokemonDetailsBox = document.createElement('div');
	// pokemonDetailsBox.innerHTML = 'stats';
	pokemonDetailsBox.className = 'boxDetails';

	pokemonDetailsBox.appendChild(descriptionBox);
	pokemonDetailsBox.appendChild(statsBox);

	return pokemonDetailsBox;
}

function fillPokemonData(pokemonIndex, pokemonElement) {
	let pokeProfile = createPokeProfile(pokemonIndex);
	let pokemonDetailsBox = createPokemonDetailsBox(pokemonIndex);
	let Line = document.createElement('hr');
	Line.className = 'line';

	fillElementWithPokemonData(pokemonIndex, pokemonElement, 'Modal');

	pokemonElement.appendChild(pokeProfile);
	pokemonElement.appendChild(pokemonDetailsBox);
	pokemonElement.appendChild(Line);
	pokemonContainer.appendChild(pokemonElement);
}
function closeModal() {
	let modal = document.getElementById('myModal');
	modal.style.display = 'none';

	// cleanup
	pokemonContainer.innerHTML = '';
}

let closeBtn = document.getElementById('close-modal');
console.log(closeBtn);
closeBtn.addEventListener('click', (event) => closeModal());

function openPokemonModal(pokemonIndex) {
	let i = 0;
	let modal = document.getElementById('myModal');
	let pokemonElement = document.createElement('div');
	modal.style.display = 'block';
	fillPokemonData(pokemonIndex, pokemonElement);
}

//load more//
let button = document.getElementById('loadMore');
button.addEventListener('click', (event) => {
	event.preventDefault();
	i += 12;
	listPokemon(i);
});
