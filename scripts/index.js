let navRadios = document.querySelectorAll('input[name="nav"]')

function onRadioChange (element) {
    // let element = event.target

    document.querySelectorAll('.main-content').forEach(mainContent => {
        mainContent.hidden = true
        // mainContent.style.opacity = '0'
    })

    document.querySelector(`.main-content__${element.id}`).hidden = !element.checked;
    // document.querySelector(`.main-content__${element.id}`).style.opacity = '100'

    main()
}

navRadios.forEach(navRadio => {
    navRadio.addEventListener('change', () => onRadioChange(navRadio))
})

function main() {
    let checkedInput = document.querySelector('input[name="nav"]:checked + label')

    let selectorEl = document.querySelector('.selector');

    let centerCheckedPositionX
        = checkedInput.getBoundingClientRect().left
        + checkedInput.getBoundingClientRect().width / 2

    let centerCheckedPositionY
        = checkedInput.getBoundingClientRect().top
        + checkedInput.getBoundingClientRect().height / 2

    let centerSelectorX
        = selectorEl.getBoundingClientRect().width / 2
    
    let centerSelectorY
        = selectorEl.getBoundingClientRect().height / 2

    let toXPosition
        = centerCheckedPositionX - centerSelectorX

    let toYPosition
        = centerCheckedPositionY + centerSelectorY

    // animation
    const selectorAnimation = [
        { left: `${selectorEl.getBoundingClientRect().left}px` },
        { left: `${toXPosition}px`},
        { top: `${selectorEl.getBoundingClientRect().top}px` },
        { top: `${toYPosition}px` }
    ]

    const selectorAnimationTiming = {
        duration: 500,
        iterations: 1
    }

    
    setTimeout(() => {
        selectorEl.animate(selectorAnimation, selectorAnimationTiming);


        selectorEl.style.left = `${toXPosition}px`
        selectorEl.style.top = `${toYPosition}px`
    }, 150)
}

onRadioChange(document.querySelector('input[name="nav"]:checked'))
main()