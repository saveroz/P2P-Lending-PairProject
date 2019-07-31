
function GenerateSecret() {

    let output = []

    for (let i = 0; i < 6; i++) {

        let number = Math.floor(Math.random() * (122 - 97 + 1)) + 97
        let char = String.fromCharCode(number)

        if (!output.includes(char)) {
            output.push(char)
        }
        else {
            i -= 1
        }
        // console.log('a')
    }

    return output.join("")

}

function EncryptPass(pass, secret) {

    const crypto = require('crypto');
    const hash = crypto.createHmac('sha256', secret)
        .update(pass)
        .digest('hex');

    return hash

}

module.exports = {GenerateSecret, EncryptPass}