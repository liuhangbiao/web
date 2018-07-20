import * as waveService from '../services/wave';
export default {
  namespace: 'wave',
  state: {
    infolist: [],
    alist:[],
  	// list: [],
   //  total: null,
    id:10,
    page:1
  },
  reducers: {
    info(state, { payload: { data: infolist } }) {
       return { ...state, infolist };
    },
    infoa(state, { payload: { data: alist } }) {
       return { ...state, alist };
    },
  	// save(state, { payload: { data: list, total } }) {
   //    return { ...state, list, total };
   //  },
   //  update(state, action) {
   //    return { ...state, ...action.payload };
   //  }
  },
  effects: {
    *getInfo({ payload: { page } }, { call, put }){
       const { data} = yield call(waveService.getInfo,  { page });
       yield put({ type: 'info', payload:{data}});
    },
    *getInfoa({ payload: { page } }, { call, put }){
       const { data} = yield call(waveService.getInfoa,  { page });
       yield put({ type: 'infoa', payload:{data}});
    },
  	// *fetch({ payload: { page } }, { call, put }) {
  	//   //调用方法并传如参数
   //    const { data, headers } = yield call(waveService.fetch, { page });
   //    //保存状态
   //    yield put({ type: 'save', payload: { data, total: 100 } });
   //  },
   //  *update({ payload }, { call, put }) {
   //        yield put({ type: 'update', payload });
   //  },
    *add({ payload: id }, { call, put }) {
      console.log('添加zzz')
      yield call(waveService.add, id);
    },
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      return history.listen(({pathname, query }) => {
        if (pathname === '/wave') {
          dispatch({ type: 'getInfo', payload: query });
          dispatch({ type: 'getInfoa', payload: query });
          // dispatch({ type: 'fetch', payload: query });
        }
      });
    }
  },
};
