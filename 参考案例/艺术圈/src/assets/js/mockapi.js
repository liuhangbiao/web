// 使用 Mock
import {Mock} from 'js/lib/Mock'
export const  data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
export default Mock.mock('/logo',{'name|1-10':[{'xxx|+1': 1}]});
export const dd= Mock.mock('/logos',{'aaaa|1-10':[{'bbbb|+1': 1}]});
// export default Mock.mock('/logox',{'list|1-8':[{'id|+1': 1}]});

