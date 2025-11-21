const crypto = require('crypto');

function genPassword(){
    let pwd = '';

    for(let i = 0;i < 8;i++){
        pwd += crypto.randomInt(0,10);
    }

    return pwd;
}

module.exports = genPassword;