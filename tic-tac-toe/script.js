const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

const cellElements =  document.querySelectorAll('[data-cell]')
let circleTurn

cellElements.forEach(cell=>{
    cell.addEventListener('click', handleClick, {once : true})
})

function handleClick(e){
    const cell = e.target
    const currentCLASS = circleTurn ? CIRCLE_CLASS : X_CLASS
    //place mark
    //check for win
    // check for draw
    // switch turns
}