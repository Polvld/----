const start = document.querySelector('#start')
const game = document.querySelector('#game')
const resultHeader = document.querySelector('#result-header')
const result = document.querySelector('#result')
const TD = document.getElementsByTagName('TD')
const playerCells = document.querySelectorAll('.player')
const AICells = document.querySelectorAll('.AI')

let matrix = []
let AI = []
let isGameStarted = false
let isAIStep = false

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
function endGame (msg) {
    isGameStarted = false
    isAIStep = false
    if (!isCanPlay()) {
        result.style.color = '#fad64e'
        result.textContent = 'Ничья, все клетки заняты'
        show(resultHeader)
    } else {
        result.style.color = '#fad64e'
        result.textContent = msg
        show(resultHeader)
    }
    show(start)
    hide(table)
    clearTable()
        
}
function checkWin (side) {
    let coords = []
    Array.from(document.querySelectorAll(`.${side}`)).map((el, index, arr) => {
        coords[index] = {
            row: el.dataset.row,
            col: el.dataset.col
        }
    })
    for (let i = 0; i < coords.length; i++) {
        checkRow = Number(coords[i].row)
        checkCol = Number(coords[i].col)
        //Проверка горизонталь
        if (i + 1 < coords.length) {
            if (checkRow === Number(coords[i + 1].row) && checkCol === Number(coords[i + 1].col) - 1) {
                if (i + 2 < coords.length) {
                    if (checkRow === Number(coords[i + 2].row) && checkCol === Number(coords[i + 2].col) - 2) {
                        if (i + 3 < coords.length) {
                            if (checkRow === Number(coords[i + 3].row) && checkCol === Number(coords[i + 3].col) - 3) {
                                if (i + 4 < coords.length) {
                                    if (checkRow === Number(coords[i + 4].row) && checkCol === Number(coords[i + 4].col) - 4) {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //Проверка вертикаль
        if (checkRow < 14 && checkCol < 14) {
            if (matrix[checkRow + 1][checkCol].classList == `${side}`) {
                if (checkRow < 13 && checkCol < 14) {
                    if (matrix[checkRow + 2][checkCol].classList == `${side}`) {
                        if (checkRow < 12 && checkCol < 14) {
                            if (matrix[checkRow + 3][checkCol].classList == `${side}`) {
                                if (checkRow < 11 && checkCol < 14) {
                                    if (matrix[checkRow + 4][checkCol].classList == `${side}`) {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //Проверка диагональ вправо
        if (checkRow < 14 && checkCol < 14) {
            if (matrix[checkRow + 1][checkCol + 1].classList == `${side}`) {
                if (checkRow < 13 && checkCol < 13) {
                    if (matrix[checkRow + 2][checkCol + 2].classList == `${side}`) {
                        if (checkRow < 12 && checkCol < 12) {
                            if (matrix[checkRow + 3][checkCol + 3].classList == `${side}`) {
                                if (checkRow < 11 && checkCol < 11) {
                                    if (matrix[checkRow + 4][checkCol + 4].classList == `${side}`) {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //Проверка диагональ влево
        if (checkRow < 14 && checkCol > 0) {
            if (matrix[checkRow + 1][checkCol - 1].classList == `${side}`) {
                if (checkRow < 13 && checkCol > 1) {
                    if (matrix[checkRow + 2][checkCol - 2].classList == `${side}`) {
                        if (checkRow < 12 && checkCol > 2) {
                            if (matrix[checkRow + 3][checkCol - 3].classList == `${side}`) {
                                if (checkRow < 11 && checkCol > 3) {
                                    if (matrix[checkRow + 4][checkCol - 4].classList == `${side}`) {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false
}
function isCanPlay () {
    return Array.from(TD).some(el => !el.dataset.block)
}
function handleBoxClick(event){
    if (!isGameStarted || isChoosed(event.target)){
        return
    }
    if (event.target.tagName == 'TD') {
        event.target.style['background-color'] = 'black'
        event.target.dataset.block = true
        event.target.classList.add('player')
        isAIStep = true
    }
    if (checkWin('player')) {
        return endGame('Вы выиграли')
    }
    AIStep(event.target)
}
function AIStep (playerStep) {
    if (isAIStep) {
        setTimeout(() => {
            pseudoAI(playerStep)
            if (checkWin('AI')) {
                return endGame('Вы проиграли')
            }
            isAIStep = false
            if (!isCanPlay()) {
                return setTimeout(() => {
                    endGame()
                }, 1000)
            }
        }, 200)
    }  
}
function isChoosed (curcle) {
    try {
        if (!curcle.dataset.block) {
            return false
        }
        return true
    }
    catch {
        return true
    }
}
function pseudoAI (playerChoice) {
    try {
        if (!isGameStarted || !isAIStep){
            return
        }
        if (!isCanPlay()) {
            return setTimeout(() => {
                endGame()
            }, 1000)
        }
        const x = Number(playerChoice.getAttribute('data-col')) + Math.round(Math.random() * 2 - 1)
        const y = Number(playerChoice.getAttribute('data-row')) + Math.round(Math.random() * 2 - 1)
        const cell = matrix[y][x]
        if (isChoosed(cell)) {
            pseudoAI(playerChoice)
        } else {
            cell.dataset.block = true 
            cell.style['background-color'] = 'white'
            cell.classList.add('AI')
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
        const cell = matrix[y][x]
        if (isChoosed(cell)) {
            pseudoAI(playerChoice)
        } else {
            cell.dataset.block = true 
            cell.style['background-color'] = 'white'
            cell.classList.add('AI')
            // AI.push({
            //     row: cell.dataset.row,
            //     col: cell.dataset.col
            // })
        }
    }
}
function clearTable() {
    Array.from(document.getElementsByTagName('TD')).forEach(item => {
        item.style['background-color'] = ''
        delete item.dataset.block
        item.classList.remove('player')
        item.classList.remove('AI')
    })
}
function fillTable() {
    Array.from(document.getElementsByTagName('TD')).forEach(item => {
        item.style['background-color'] = 'black'
        item.dataset.block = true
    })
    matrix[0][0].style['background-color'] = ''
    matrix[0][0].dataset.block = ''
    // matrix[0][1].style['background-color'] = ''
    // matrix[0][1].dataset.block = ''
    isAIStep = false
    if (!isCanPlay()) {
        return endGame()
    }
}
onload = newTable