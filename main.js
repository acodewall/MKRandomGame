const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai'],
  attack: function (name) {
    console.log(name + ' fight')
  },
}

const player2 = {
  player: 2,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Ice Sword'],
  attack: function (name) {
    console.log(name + ' fight')
  },
}

function createElement(tag, className) {
  const $tag = document.createElement(tag)
  if (className) {
    $tag.classList.add(className)
  }
  return $tag
}

function createPlayer(playerObj) {
  const $player = createElement('div', 'player' + playerObj.player)
  const $progressbar = createElement('div', 'progressbar')
  const $life = createElement('div', 'life')
  const $name = createElement('div', 'name')
  const $character = createElement('div', 'character')
  const $img = createElement('img')

  $player.appendChild($progressbar)
  $player.appendChild($character)
  $progressbar.appendChild($life)
  $progressbar.appendChild($name)
  $character.appendChild($img)

  $life.style.width = playerObj.hp + '%'
  $name.innerText = playerObj.name
  $img.src = playerObj.img

  return $player
}

function changeHP(player) {
  const $playerLife = document.querySelector(
    '.player' + player.player + ' .life'
  )
  player.hp -= Math.ceil(Math.random() * 20)
  //player.hp -= 20;
  if (player.hp < 0) {
    player.hp = 0
  }
  $playerLife.style.width = player.hp + '%'

  if (player.hp <= 0) {
    player.hp = 0
    $randomButton.disabled = true
  }
  console.log(player.hp)
}

function playerWin(name) {
  const $winTitle = createElement('div', 'winTitle')
  $winTitle.innerText = name + ' win'

  return $winTitle
}

function tie() {
  const $tieTitle = createElement('div', 'tieTitle')
  $tieTitle.innerText = 'Tie. Fight Again'

  return $tieTitle
}

$randomButton.addEventListener('click', function () {
  console.log('#####: Click me button')
  changeHP(player1)
  changeHP(player2)

  if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(tie())
  } else if (player2.hp === 0 && player1.hp > 0) {
    $arenas.appendChild(playerWin(player1.name))
  } else if (player1.hp === 0 && player2.hp > 0) {
    $arenas.appendChild(playerWin(player2.name))
  }
})

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
