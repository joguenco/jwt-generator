let homeLink = document.querySelector('#home')
let generateButton = document.querySelector('#generate')
let pingButton = document.querySelector('#ping')

const server = homeLink.href

generateButton.addEventListener('click', generate)
pingButton.addEventListener('click', ping)

function generate() {
    console.log('JWT Generator')
}

function ping() {

    const url = `${server}ping`

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    }).catch(function (error) {
        console.log(error)
    })
}
