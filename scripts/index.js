let isGameStarted = false
let start = document.querySelector('#start')
let game = document.querySelector('#game')
let resultHeader = document.querySelector('#result-header')
let result = document.querySelector('#result')
const cells = []
let matrix = []
let reverseMatrix

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
        matrix[i] = []
        for (var j = 0; j < 15; j++) {
            const newTd = document.createElement('td')
            newTd.style.border = '.1px dashed #7e7c7c'
            newTd.style['border-radius'] = '100px'
            newTd.style['outline'] = 'none'
            newTr.appendChild(newTd)
            newTd.dataset.row = `${i}`
            newTd.dataset.col = `${j}`
            newTd.classList.add('cell')
            matrix[i][j] = newTd
        }
    }
    reverseMatrix = transponse(matrix)
}
function transponse(array) {
    let m = array.length
    let n = array[0].length 
    let transponseArray = []
    for (let i = 0; i < n; i++) { 
        transponseArray[i] = []
        for (var j = 0; j < m; j++) {
            transponseArray[i][j] = array[j][i]
        }
    }
    return transponseArray;
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
    if (event.target.tagName == 'TD') {
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
    Array.from(document.getElementsByTagName('TD')).forEach(item => {
        item.style['background-color'] = ''
    })
}
onload = newTable