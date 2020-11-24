

let tests = {
    system: {
        user: {
            page(query) {
                return test({
                    url: '/system/user/page',
                    method: 'get',
                    params: query,
                })
            },
            insert(params) {
                return test({
                    url: '/system/user/insert',
                    method: 'post',
                    data: params,
                })
            },
            find(id) {
                return test({
                    url: '/system/user/find/' + id,
                    method: 'get',
                })
            },
            update(params) {
                return test({
                    url: '/system/user/update/' + params.id,
                    method: 'put',
                    data: params,
                })
            },
            delete(id) {
                return test({
                    url: '/system/user/delete/' + id,
                    method: 'delete',
                })
            },
        }
    }
}

