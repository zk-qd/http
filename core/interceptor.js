const $errorCode = {
    // '404': '访问资源不存在',
    'default': '系统未知错误，请反馈给管理员',
    /* 未连接 */
    '0': '网络异常',

    '200': '请求成功',
    '4': '请求失败',
    '9': '访问资源不存在',
    '401': '登录状态已过期，您可以继续留在该页面，或者重新登录',
    '403': '当前操作没有权限',
    '500': '服务器异常',
}

http.interceptors.request.use(config => {
    // $setAuthorization(config);
    return config
}, err => {
    console.log($errorCode['0'])
    Promise.reject($errorCode['0'], err)
});
http.interceptors.response.use(res => {
    return $responseTips(res);
}, err => {
    console.log('接口未知错误', err)
    return Promise.reject(err);
})


function $setAuthorization(config) /* 是否需要设置 token */ {
    const isToken = config.isToken === false;
    if (getToken() && !isToken) {
        config.headers[/* 'Authorization' */'token'] = /* 'Bearer ' +  */(getToken()/*  || token */); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
}
function $responseTips(res) /* 响应提示 */ {
    // 未设置状态码则默认成功状态
    const code = Number(res.data.code || 200);
    // 获取错误信息  没有msg就 取自定义的msg
    const message = res.data.msg || $errorCode[code] || $errorCode['default']
    if (code === 401) {
        return Promise.reject({ code, message, res })
    } else if (code === 500 || code === 4 || code === 9 || code === 403) {
        return Promise.reject({ code, message, res })
    } else if (code !== 200) {
        return Promise.reject({ code, message, res })
    } else {
        return res;
    }
}


/**
 * 请求成功
 */
// SUCCESS(200),
/**
 * 请求失败
 */
  // FAILED(4),
/**
 * 登录失败
 */
  // LOGIN_ERROR(401),
/**
 * 鉴权失败
 */
  // PERMISSION_ERROR(403),
/**
 * 暂无数据
 */
  // DATA_NOTFOUND(9),
/**
 * 其他异常
 */
  // SERVICE_ERROR(500);