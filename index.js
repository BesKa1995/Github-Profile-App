const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  getUser(search.value)
})

async function getUser(username) {
  //fetching user prfile 
  try {
    const { data } = await axios.get(`${APIURL + username}`)
    creatUserCard(data)
    getRepos(username)
  } catch (error) {
    /*if something will go wrong creatErrorCard function will display
      an error message within card
    */
    creatErrorCard('No profile with this username')
  }
}

async function getRepos(username) {
  //fetching repository of searched user
  try {
    const { data } = await axios.get(APIURL + username + '/repos')
    addReposToCard(data)
  } catch (error) {
    console.log(error)
  }

}
function addReposToCard(repos) {
  //creating repo element and adding it to HTML DOM.
  //element addding is limited by 10 with 'slice' function.
  const reposEl = document.getElementById('repos')
  repos
    .slice(0, 10)
    .forEach(({ name, html_url }) => {
      const repoEl = document.createElement('a')
      repoEl.classList.add('repo')
      repoEl.href = html_url
      repoEl.target = '_blank'
      repoEl.innerHTML = name
      reposEl.appendChild(repoEl)
    })
}

function creatUserCard(data) {
  console.log(data)
  const { name,
    avatar_url,
    bio,
    followers,
    following,
    public_repos } = data

  const cardHTML = `
  <div class="card">
    <div>
      <img src="${avatar_url}" alt="${name}"   class="avatar">
    </div>

    <div class="user-info">
      <h2>${name}</h2>
      <p>${bio ? bio : 'nothing is descripted in the bio'}</p>
      <ul>
        <li>${followers} <strong>Followers</strong></li>
        <li>${following} <strong>Following</strong></li>
        <li>${public_repos} <strong>Repos</strong></li>
      </ul>
      <div id="repos"></div>
    </div>
  </div>
  `
  main.innerHTML = cardHTML
}

function creatErrorCard(msg) {
  const cardHTML = `
    <div class="card">
      <h1>${msg}</h1>
    </div>
  
 `
  main.innerHTML = cardHTML
}


