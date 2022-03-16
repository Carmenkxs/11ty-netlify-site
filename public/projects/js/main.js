//create class to contain all the elements we are displaying
class Calculator {
    constructor(prevTextElement, currentTextElement) {
        this.prevTextElement = prevTextElement
        this.currentTextElement = currentTextElement
        //every time a new calculator is created, we want to clear all inputs
        this.clear()
    }

    clear() {
        this.currentOperand = ''   
        this.previousOperand = ''
        this.operation = undefined
      }

      delete(){
        this.currentOperand = this.currentOperand.slice(0,this.currentOperand.length-1)
    }
    
    

    appendNumber(number){
        //prevent multiple decimal places from being added. this terminates by returning if the numbers already contain a period
        if(number === '.' && this.currentOperand.includes('.')) return
        //append number to the end of current operand
        this.currentOperand = this.currentOperand.toString() + number
        //make change prev operand to prevOperand
    }

    identifiesOperation(operation){
        //only applies if there is a number already selected or if it is negative
        if(this.currentOperand === '' && operation != '-') return
        // if prev operand not empty, then it runs compute
        if(this.previousOperand !== ''){
            this.compute()
        }
        //change current operand to prev operand and empty the current string
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    
    }

    compute() {
        //if there is no prev operand, it returns
        if(this.previousOperand === '') return
        //if there is prev operand, then take prev and and current, convert to number.
        //then add the operation return result into current operand and clear prev operand
        let result
        const prev = Number(this.previousOperand)
        const current = Number(this.currentOperand)

        switch (this.operation) {
            case '+':
                result = prev + current
                break

            case '-':
                result = prev - current
                break

            case 'x':
                result = prev * current
                break

            case '÷':
                result = prev / current
                break
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    //update display
    updateDisplay(){
        this.currentTextElement.innerText = this.getsCommaSeparatedNumbers(this.currentOperand)
        //if operation was selected then update prev to show prev + operation
        if (this.operation != null) {
            this.prevTextElement.innerText =
             this.getsCommaSeparatedNumbers(this.previousOperand) + ' ' + this.operation
        } else {
            this.prevTextElement.innerText = ''
        }
    }
    //returns comma separated values if required
    getsCommaSeparatedNumbers(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalNumbers = stringNumber.split('.')[1]

        let integerToDisplay
        let decimaltoDisplay
        //if  integar digits is not a number, that means user has entered "."
        if(isNaN(integerDigits)) {
            integerToDisplay = ''
        } else {
            integerToDisplay = integerDigits.toLocaleString('en')
        }

        if(decimalNumbers!=null) {
            return integerToDisplay + '.' + decimalNumbers
        } else {
            return integerToDisplay
        }
        
    }
}

// selectors
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const computeButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const prevTextElement = document.querySelector('[data-previous-input]');
const currentTextElement = document.querySelector('[data-current-input]');


const calculator = new Calculator(prevTextElement,currentTextElement);

//EVENT LISTENERS

//numberbuttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    });
} );

//operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.identifiesOperation(button.innerText)
        calculator.updateDisplay()
    });
} );

//clear button
clearButton.addEventListener('click',button => {
    calculator.clear()
    calculator.updateDisplay()
})

//delete button
deleteButton.addEventListener('click',button => {
    calculator.delete()
    calculator.updateDisplay()
})

//equals button
computeButton.addEventListener('click',button => {
    calculator.compute()
    calculator.updateDisplay()
})







//FUNCTIONS

