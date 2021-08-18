const display1 = document.querySelector('.display-1')
const display2 = document.querySelector('.display-2')
const tempResultDisplay = document.querySelector('.temp-result-display')
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const equal = document.querySelector('.equal')
const clearAll = document.querySelector('.all-clear')
const clearLastEntity = document.querySelector('.last-entity-clear')

// console.log(display1)
// console.log(display2)
// console.log(tempResultDisplay)
// console.log(numbers)
// console.log(operations)
// console.log(equal)
// console.log(clearAll)
// console.log(clearLastEntity)

let dis1stNum = ''
let dis2ndNum = ''
let haveDot = false
let result = null
let lastOperation = ''

numbers.forEach( num => {
    num.addEventListener('click', () => {
        if (num.innerText === '.' && !haveDot) {
           haveDot = true
        } else if ( num.innerText === '.' && haveDot){
            return
        }
        dis2ndNum += num.innerText
        display2.innerText = dis2ndNum
    })
})

operations.forEach( (operation) => {
    operation.addEventListener('click', () => {
        if (!dis2ndNum){
            return
        }
        haveDot = false
        const operationName = operation.innerText
        if (dis1stNum && dis2ndNum && lastOperation) {
            countOperation()
        } else {
            result = parseFloat(dis2ndNum)
        }
        clearNum(operationName)
        lastOperation = operationName
    })
})

equal.addEventListener('click', () => {
    if (!dis1stNum || !dis2ndNum) {
        return
    }
    haveDot = false
    countOperation()
    clearNum()
    display2.innerText = result
    tempResultDisplay.innerText = ''
    dis1stNum = ''
    dis2ndNum = result
})

clearAll.addEventListener('click', () => {
    haveDot = false
    display1.innerText = '0'
    display2.innerText = '0'
    tempResultDisplay.innerText = '0'
    dis1stNum = ''
    dis2ndNum = ''
    lastOperation = ''
    result = null
})

clearLastEntity.addEventListener('click', () => {
    display2.innerText = ''
    dis2ndNum = ''
})

window.addEventListener('keydown', (btn) => {
    if (btn.key === '0' || 
        btn.key === '1' ||
        btn.key === '2' ||
        btn.key === '3' ||
        btn.key === '4' ||
        btn.key === '5' ||
        btn.key === '6' ||
        btn.key === '7' ||
        btn.key === '8' ||
        btn.key === '9' ||
        btn.key === '.'
    ) {
        clickButton(btn.key)
    } else if (
        btn.key === '+' ||
        btn.key === '-' ||
        btn.key === '/' ||
        btn.key === '%'
    ) {
        clickOperation(btn.key)
    } else if ( btn.key === '*') {
        clickOperation('x')
    } else if ( btn.key == 'Enter' || btn.key === '='){
        clickEqual()
    }
})


// FUNCTIONS 

function clearNum(name = '') {
    dis1stNum += dis2ndNum + ' ' + name + ' '
    display1.innerText = dis1stNum
    display2.innerText = ''
    dis2ndNum.innerText = ''
    dis2ndNum = ''
    tempResultDisplay.innerText = result
}

function countOperation() {
    if (lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2ndNum)
    } else if (lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2ndNum)
    } else if (lastOperation === 'x'){
        result = parseFloat(result) * parseFloat(dis2ndNum)
    } else if (lastOperation === '/'){
        result = parseFloat(result) / parseFloat(dis2ndNum)
    } else if (lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2ndNum)
    }
}

function clickButton(key) {
    numbers.forEach( button => {
        if (button.innerText === key) {
            button.click()
        }
    })
}

function clickOperation(key) {
    operations.forEach(button => {
        if (button.innerText === key) {
            button.click()
        }
    });
}

function clickEqual() {
    equal.click()
}

