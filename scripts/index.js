let isGameStarted = false
let start = document.querySelector('#start')
let game = document.querySelector('#game')
let resultHeader = document.querySelector('#result-header')
let result = document.querySelector('#result')
const cells = []
const matrix =[]

start.addEventListener('click', startGame)
game.addEventListener('click', handleBoxClick)

function newTable () { 
    const newTable = document.createElement('table')
    game.appendChild(newTable)
    newTable.setAttribute('id', 'table')
    const table = document.getElementById('table')
    hide(table)
    table.style['border-spacing'] = '0'
    table.style['border-radius'] = '10px'
    table.style['width'] = table.style['height'] = '500px'
    for (let i = 0; i < 15; i++) {
        const newTr = document.createElement('tr')
        table.appendChild(newTr)
        newTr.classList.add('row')
        for (let j = 0; j < 15; j++) {
            const newTh = document.createElement('th')
            newTh.style.border = '.1px dashed #7e7c7c'
            newTh.style['border-radius'] = '100px'
            newTh.style['outline'] = 'none'
            newTr.appendChild(newTh)
            newTh.dataset.row = `${i}`
            newTh.dataset.col = `${j}`
            newTh.classList.add('cell')
            //cells.push(`${newTh.outerHTML}`)
        }
    }
}

function show (el) {
    el.classList.remove('hide')
}
function hide (el) {
    el.classList.add('hide')
}
function startGame () {
    isGameStarted = true
    hide(start)
    hide(resultHeader)
    show(table)
}
function endGame () {
    isGameStarted = false
    show(start)
    hide(table)
    clearTable()
        result.style.color = '#fad64e'
        result.textContent = 'Вы победили'
        show(resultHeader)
}

function handleBoxClick(event){
    if (!isGameStarted){
        return
    }
    if (isChoosed(event.target)) {
        return 
    }
    if (event.target.tagName == 'TH') {
        event.target.style['background-color'] = 'black'
    }
    return  
}
function isChoosed (curcle) {
    if (curcle.style['background-color'] == ('black' || 'white')) {
        return true
    }
    return false
}
function pseudoAI () {
    if (!isGameStarted){
        return
    }
    if (isChoosed) {
        pseudoAI()
    } else {
        //Ход АИ
    }
}
function clearTable() {
    Array.from(document.getElementsByTagName('TH')).forEach(item => {
        item.style['background-color'] = ''
    })
}
onload = newTable