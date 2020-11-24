

!function (win) {
    /**
    * * props
    * @defaults 公共配置
    * @handler 拦截器函数
    * * method
    * @create 初始化创建函数
    * @interceptors
    * */
    http = Object.create({
        create(config) {
            this.defaults = config;
            return this.request.bind(this);
        },
        interceptors: {
            request: {
                use: use
            },
            response: {
                use: use
            }
        },
        request: function ({
            method = 'get', // 请求方式
            url = '', // url
            async = true, // 异步
            headers,
            params,
            data,
            responseType = '',// ['text','blob','document','json','arrayBuffer']
        }) {
            const xhr = new XMLHttpRequest(),
                defaults = this.defaults,
                handler = this.handler;
            try {
                handler[0].fulfilled({ defaults, headers }); // 请求前拦截
                headers = Object.assign({ 'content-type': defaults['content-type'] }, headers); // content-type默认值
                isFormData(data) && delete headers['content-type']; // 如果data为formdata类型，那么删除content-type
                xhr.timeout = defaults.timeout || 30 * 1000;
                xhr.responseType = responseType;
                xhr.open(method.toUpperCase(), fillPath(defaults.baseURL + url, params), async); // 建立连接
                setHeader(headers, xhr); // 设置请求头
                xhr.send(data && setData(headers, data)) // 发送请求
            } catch (err) {
                handler[0].rejected(err); // 请求前拦截
            }
            return new Promise((resolve, reject) => {
                /* xhr.onloadstart;
                xhr.onloadend;
                xhr.onabort;
                xhr.onprogress;
                xhr.upload.onprogress; */
                xhr.onload = resolve;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
            }).then(res => {
                return handler[1].fulfilled(res.currentTarget); // 返回处理后的结果
            }).catch(err => {
                return handler[1].rejected(err); // 处理错误后
            })
        }
    }, {
        defaults: {
            value: null,
            writable: true,
            configurable: true,
            enumerable: true,
        },
        handler: {
            value: [],
            writable: true,
            configurable: true,
            enumerable: true,
        }
    })
    function use(fulfilled, rejected) {
        http.handler.push({
            fulfilled,
            rejected,
        })
    }

    // 设置请求头
    function setHeader(headers, xhr) {
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }
    // 填充路径
    function fillPath(url, params) {
        let qs = params ? Object.entries(params).join('&').replace(/,/g, '=') : '', search;
        [, (url), (search)] = url.match(/(.*)(\?.*)?$/);
        search = search ? search.replace(/\?/, '') + '&' : '';
        url = url + '?' + search + qs;
        return url.replace(/[^:]\/\//g, '/');// 去除除://的//
    }
    // 判断formdata数据
    function isFormData(data) {
        if (data && data instanceof FormData) return true;
    }
    // 设置data
    function setData(headers, data) {
        if (headers['content-type'] === 'application/json') return JSON.stringify(data);
        else return data;
    }
    win.http = http;
}(window)
