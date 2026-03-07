let homeLink = document.querySelector('#home')
let generateButton = document.querySelector('#generate')
let pingButton = document.querySelector('#ping')

const server = homeLink.href

const modalElement = document.getElementById('modalDialog')
const modalDialog = new bootstrap.Modal(modalElement)
let modalMessage = document.querySelector('#modalMessage')

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
        modalMessage.textContent = data.message
        modalDialog.show()
    }).catch(function (error) {
        modalMessage.textContent = error.message
    })
}
