function isLoggedIn(_token){
    _token = localStorage.getItem("token");

    //如果 token 內無值，則返回未登入
    if (!_token){return false}

    //如果 token 內有值，則返回登入
    return true
}

export default isLoggedIn;