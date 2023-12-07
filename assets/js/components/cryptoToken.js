import AES from 'crypto-js/aes'; //加密
import encUtf8 from 'crypto-js/enc-utf8'; //解密

function cryptoToken(_token){
    if (!_token){return}

    const bytes = AES.decrypt(_token, 'TeaTime-Gathering');
    const originalText = bytes.toString(encUtf8);

    return originalText
}

export default cryptoToken;