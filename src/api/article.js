import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/article/list',
        method: 'get',
        params: query
    })
}

export function createArticle(data) {
    return request({
        url: '/article/create',
        method: 'post',
        data
    })
}