let navRadios = document.querySelectorAll('input[name="nav"]')

function onRadioChange (element) {
    document.querySelectorAll('.main-content').forEach(mainContent => {
        mainContent.hidden = true
    })

    document.querySelector(`.main-content__${element.id}`).hidden = !element.checked;

    setSelectorPosition()
}

function ElementParameters (element) {
    this.element = element
    this.positionOnScreen = {
        x: element.getBoundingClientRect().left,
        y: element.getBoundingClientRect().top
    }
    this.centerOfElement = {
        x: element.getBoundingClientRect().width / 2,
        y: element.getBoundingClientRect().height / 2
    }
}

let checkedInput = {}
let selector = {}

function setSelectorPosition() {
    checkedInput = new ElementParameters(
        document.querySelector('input[name="nav"]:checked + label')
    )

    selector = new ElementParameters(
        document.querySelector('.selector')
    )

    let checkedInputXPostiionCenterOnScreen
        = checkedInput.positionOnScreen.x
        + checkedInput.centerOfElement.x

    let checkedInputYPostiionCenterOnScreen
        = checkedInput.positionOnScreen.y
        + checkedInput.centerOfElement.y

    let toXPosition
        = checkedInputXPostiionCenterOnScreen - selector.centerOfElement.x

    let toYPosition
        = checkedInputYPostiionCenterOnScreen + selector.centerOfElement.y

    // animation
    const selectorAnimation = [
        { left: `${selector.positionOnScreen.x}px` },
        { left: `${toXPosition}px`},
        { top: `${selector.positionOnScreen.y}px` },
        { top: `${toYPosition}px` }
    ]

    const selectorAnimationTiming = {
        duration: 500,
        iterations: 1
    }

    setTimeout(() => {
        selector.element.animate(selectorAnimation, selectorAnimationTiming);


        selector.element.style.left = `${toXPosition}px`
        selector.element.style.top = `${toYPosition}px`
    }, 150)
}

navRadios.forEach(navRadio => {
    navRadio.addEventListener('change', () => onRadioChange(navRadio))
})

onRadioChange(document.querySelector('input[name="nav"]:checked'))

setSelectorPosition()
