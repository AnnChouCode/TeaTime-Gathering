import AES from 'crypto-js/aes'; //加密
import encUtf8 from 'crypto-js/enc-utf8'; //解密

/**
 * 將已加密的 token 解密後傳出
 * @param {string} _token - 使用者登入時，將 UID 加密成 token 產生的字串
 * @param {string} originalText - 將已加密的 token 傳入，傳出還原成 UID 的資料
 */

function cryptoToken(_token){
    if (!_token){return}

    const bytes = AES.decrypt(_token, 'TeaTime-Gathering');
    const originalText = bytes.toString(encUtf8);

    return originalText
}

export default cryptoToken;