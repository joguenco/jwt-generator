let homeLink = document.querySelector('#home')
let generateButton = document.querySelector('#generate')
let pingButton = document.querySelector('#ping')
let closeModalButton = document.querySelector('#closeModal')
if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        const modal = bootstrap.Modal.getInstance(modalElement)
        if (modal) modal.hide()
    })
}

const server = homeLink.href

const modalElement = document.getElementById('modalDialog')
const modalDialog = new bootstrap.Modal(modalElement)
let modalMessage = document.querySelector('#modalMessage')
let modalTitle = document.querySelector('#modalTitle')
let copyButton = document.querySelector('#copyBtn')

generateButton.addEventListener('click', generate)
pingButton.addEventListener('click', ping)
if (copyButton) copyButton.addEventListener('click', copyModalMessage)

function generate() {
    const url = `${server}jwt`
    const data = validateData()
    if (!data) return

    modalTitle.textContent = 'Generate Token'

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
            // modalMessage.textContent = `audience: ${data.audience}\ntoken: ${data.token}`
            modalMessage.textContent = `URL_BACKUP_SERVER=https://bakuryu.resolvedor.dev/
                                        TOKEN_SECRET=${data.token}`
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

function copyModalMessage() {
    const text = modalMessage.textContent || ''
    if (!text.trim()) return

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            const prev = modalTitle.textContent
            modalTitle.textContent = 'Copied to clipboard'
            setTimeout(() => { modalTitle.textContent = prev }, 1500)
        }).catch(() => {
            modalTitle.textContent = 'Copy failed'
        })
    } else {
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        try {
            document.execCommand('copy')
            const prev = modalTitle.textContent
            modalTitle.textContent = 'Copied to clipboard'
            setTimeout(() => { modalTitle.textContent = prev }, 1500)
        } catch (e) {
            modalTitle.textContent = 'Copy failed'
        }
        document.body.removeChild(ta)
    }
}
