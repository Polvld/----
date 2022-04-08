let start = document.querySelector('#start')
let game = document.querySelector('#game')
let resultHeader = document.querySelector('#result-header')
let result = document.querySelector('#result')


let matrix = []
let reverseMatrix
let isGameStarted = false
let isAIStep = false
let TD = []

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
        matrix[i] = []
        for (var j = 0; j < 15; j++) {
            const newTd = document.createElement('td')
            newTd.style.border = '.1px solid #7e7c7c'
            newTd.style['border-radius'] = '100px'
            newTd.style['outline'] = 'none'
            newTr.appendChild(newTd)
            matrix[i][j] = newTd
            newTd.dataset.row = `${i}`
            newTd.dataset.col = `${j}`
            //newTd.dataset.block = false
        }
    }
    reverseMatrix = transponse(matrix)
}
TD = document.getElementsByTagName('TD')
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
        // result.style.color = '#fad64e'
        // result.textContent = 'Вы победили'
        // show(resultHeader)
}
function isCanPlay () {
    const checkChoosedCells = (el) => !el.dataset.block
    //console.log('Array.from(TD).some(checkChoosedCells)', Array.from(TD).some(checkChoosedCells))
    return Array.from(TD).some(checkChoosedCells)
}
function handleBoxClick(event){
    if (!isGameStarted || isChoosed(event.target)){
        // console.log('!isGameStarted = ', !isGameStarted)
        // console.log('isChoosed(event.target) = ', isChoosed(event.target))
        return
    }
    if (!isCanPlay()) {
        return endGame()
    }
    //console.log('Прошли проверки в Хэндлбоксклик', isCanPlay())
    if (event.target.tagName == 'TD') {
        event.target.style['background-color'] = 'black'
        event.target.dataset.block = true
        event.target.classList.add('player')
        isAIStep = true
    }
    //console.log('Я походил')
    let playerStep = event.target
    if (!isCanPlay()) {
        return endGame()
    }
    if (isAIStep) {
        setTimeout(() => {
            pseudoAI(playerStep);
            //console.log('АИ запустил цикл хода')
            if (!isCanPlay()) {
                return endGame()
            }
        }, 200)
    }  
}
function isChoosed (curcle) {
    try {
        if (!curcle.dataset.block) {
            // console.log('!curcle.dataset.block = ', !curcle.dataset.block)
            return false
        }
        // console.log('Try: !curcle.dataset.block = ', !curcle.dataset.block)
        return true
    }
    catch {
        // console.log('Catch: !curcle.dataset.block = ', !curcle.dataset.block)
        return true
    }
}
function pseudoAI (playerChoice) {
    try {
        if (!isGameStarted || !isAIStep){
            return
        }
        if (!isCanPlay()) {
            return endGame()
        }
        //console.log('Прошла проверка в ходе АИ')
        const x = Number(playerChoice.getAttribute('data-col')) + Math.round(Math.random() * 2 - 1)
        const y = Number(playerChoice.getAttribute('data-row')) + Math.round(Math.random() * 2 - 1)
        const cell = matrix[y][x];
        //console.log(y, x)
        if (isChoosed(cell)) {
            pseudoAI(playerChoice)
        } else {
            cell.dataset.block = true 
            cell.style['background-color'] = 'white'
            cell.classList.add('AI')
            isAIStep = false
            //console.log('АИ походил в Трай')
        }
    }
    catch {
        if (!isGameStarted || !isAIStep){
            return
        }
        if (!isCanPlay()) {
            return endGame()
        }
        const x = Math.floor(Math.random() * matrix[0].length)
        const y = Math.floor(Math.random() * matrix.length)
        const cell = matrix[y][x];
        console.log(y, x, 'Данные из catch')
        if (isChoosed(cell)) {
            pseudoAI(playerChoice)
        } else {
            cell.dataset.block = true 
            cell.style['background-color'] = 'white'
            cell.classList.add('AI')
            isAIStep = false
        }
    }
}
function clearTable() {
    Array.from(document.getElementsByTagName('TD')).forEach(item => {
        item.style['background-color'] = ''
        item.dataset.block = false
    })
}
function fillTable() {
    Array.from(document.getElementsByTagName('TD')).forEach(item => {
        item.style['background-color'] = 'black'
        item.dataset.block = true
    })
    matrix[0][0].style['background-color'] = ''
    matrix[0][0].dataset.block = ''
    matrix[0][1].style['background-color'] = ''
    matrix[0][1].dataset.block = ''
    isAIStep = false
    if (!isCanPlay()) {
        return endGame()
    }
}
onload = newTable