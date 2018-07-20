import * as usersService from '../services/alarn';
import { message } from 'antd';
export default {
  namespace: 'alarn',
  state: {
  	list: [],
    total: null,
    testId:0
  },
  reducers: {
    'test'(state, {}) {
      return '测试选项';
    },
  	save(state, { payload: { data: list, total } }) {
      return { ...state, list, total };
    },
    update(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
  	*fetch({ payload: { page } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({ type: 'save', payload: { data, total: headers['x-total-count'] } });
    },
     *update({ payload }, { call, put }) {
          yield put({ type: 'showModal', payload });
    },
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      return history.listen(({pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
         if (pathname === '/alarn/test') {
            //初始化testId的值为10
            dispatch({
              type: 'update',
              payload: { ...location.query, testId: 10 },
            });
          }
      });
    }
  },
};
