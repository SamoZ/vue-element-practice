import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        timestamp: +Mock.Random.date('T'),
        author: '@first',
        reviewer: '@first',
        title: '@title(5,10)',
        forecast: '@float(0,100,2,2)',
        importance: '@integer(1,3)',
        'type|1': ['CN', 'US', 'JP', 'EU'],
        'status|1': ['published', 'draft', 'deleted'],
        display_time: '@datetime',
        pageviews: '@integer(300,500)'
    }))
}

export default {
    getList: config => {
        const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

        let mockList = List.filter(item => {
            if (importance && item.importance !== +importance) return false
            if (type && item.type !== type) return false
            if (title && item.title.indexOf(title) < 0) return false
            return true
        })
        
        if (sort === '-id') {
            mockList = mockList.reverse()
        }

        const pageList = mockList.filter((item, index) => {
            // 绕晕！！一直陷在 && 运算符都为 true 则返回后面的值
            // var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
            // const result = words.filter((word,index) => index < 4 && index >= 0);
            // console.log(result);
            // index < 4 限制了数组，判断当前数组中 index >= 0 的值
            return index < limit * page && index >= limit * (page - 1)
        })

        return {
            total: mockList.length,
            items: pageList
        }
    },
    createArticle: () => ({
        data: 'success'
    })
}


