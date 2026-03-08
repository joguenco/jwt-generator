let homeLink = document.querySelector('#home')
let generateButton = document.querySelector('#generate')
let pingButton = document.querySelector('#ping')

const server = homeLink.href

const modalElement = document.getElementById('modalDialog')
const modalDialog = new bootstrap.Modal(modalElement)
let modalMessage = document.querySelector('#modalMessage')
let modalTitle = document.querySelector('#modalTitle')

generateButton.addEventListener('click', generate)
pingButton.addEventListener('click', ping)

function generate() {
    const url = `${server}jwt`
    const data = validateData()
    if (!data) return

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            console.log('Success:', data)
            modalMessage.textContent = `audience: ${data.audience}\ntoken: ${data.token}`
            modalDialog.show()
        })
        .catch(error => {
            console.error('Error:', error)
            modalMessage.textContent = `Cannot connect to server ${url}`
            modalDialog.show()
        })
}

function validateData() {
    const identifier = document.getElementById('identifier')
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const role = document.getElementById('role')
    const private_key = document.getElementById('private_key')
    const audience = document.getElementById('audience')
    const issuer = document.getElementById('issuer')
    const expiration_date = document.getElementById('expiration_date')

    const fields = [
        { el: identifier, name: 'Identifier' },
        { el: name, name: 'Name' },
        { el: email, name: 'Email' },
        { el: role, name: 'Role' },
        { el: private_key, name: 'Private key' },
        { el: audience, name: 'Audience' },
        { el: issuer, name: 'Issuer' },
        { el: expiration_date, name: 'Expiration date' }
    ]

    for (const { el, name } of fields) {
        if (!el.value || !el.value.trim()) {
            modalTitle.textContent = 'Validation Error'
            modalMessage.textContent = `${name} cannot be blank`
            modalDialog.show()
            return null
        }
    }

    return {
        identifier: identifier.value.trim(),
        name: name.value.trim(),
        email: email.value.trim(),
        role: [role.value.trim()],
        private_key: private_key.value.trim(),
        audience: audience.value.trim(),
        issuer: issuer.value.trim(),
        expiration_date: expiration_date.value.trim()
    }
}

function ping() {
    const url = `${server}ping`
    modalTitle.textContent = 'Ping to Server'

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        modalMessage.textContent = data.message
        modalDialog.show()
    }).catch(function (error) {
        modalMessage.textContent = error.message
        modalDialog.show()
    })
}
