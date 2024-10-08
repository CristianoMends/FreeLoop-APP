

const endpoint = 'http://localhost:8080/api';

async function getAllGamesAlwaysFree() {
    try {
        const response = await fetch(endpoint + '/always');
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const games = await response.json();

        const gamesContainer = document.querySelector('.games-aways-free-container');
        gamesContainer.innerHTML = '';
        let i = 0;
        games.forEach(game => {
            const gameElement = document.createElement('a');
            gameElement.href = game.link;
            gameElement.innerHTML = `
          <h4>${game.name}</h3>
          <img src="${game.image}" alt="${game.name}" width="200px"/>
          <p>Status: ${game.status}</p>
        `;
            gamesContainer.appendChild(gameElement);
        });

    } catch (error) {
        console.error('Erro ao buscar os jogos gratuitos:', error);
    }
}
//--------------------------------------------------------------------------------------------
async function getAllWeeklyFree() {
    try {
        const response = await fetch(endpoint + '/weekly');
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const games = await response.json();

        const gamesContainer = document.querySelector('.free-games-weekly-container');
        gamesContainer.innerHTML = '';

        games.forEach(game => {
            const gameElement = document.createElement('a');

            const date = new Date(game.updateDate);
            const d = String(date.getDate()).padStart(2, '0');
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const y = date.getFullYear();

            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const formatedDate = `${d}/${m}/${y} ${hours}:${minutes}`;

            gameElement.href = game.link;
            gameElement.innerHTML = `
            <div>
                <img src="${game.image}" alt="${game.name}" width="150"/>
            </div>
            <div>
                <h4>${game.name}</h3>
                <p>Status: ${game.status}</p>
                <p>${game.description}</p>
                <p>Período: ${game.period}</p>
                <p>Atualizado em:  ${formatedDate}</p>
            </div>
            `;
            gamesContainer.appendChild(gameElement);
        });

    } catch (error) {
        console.error('Erro ao buscar os jogos gratuitos:', error);
    }
}
//---------------------------------------------------------------------------------------
function onLoad() {
    getAllGamesAlwaysFree();
    getAllWeeklyFree();
}