
const workOrderInfo = {

  state: {
    workOrderList: [
      {
        workOrderID: 1,
        engineer: 'admin',
        workOrderType: '安装、移机、撤机',
        cabinetID: 'NO589901',
        address: '广州',
        SIM: '115706731',
        keyID: 'key-01',
        starTime: '2020-10-01 13:50:57',
        overTime: '2020-10-03 13:50:57',
        remark: '安装',
        state: 0,
        extensionRequest: {},
        outTime: {time: '2020-10-05 13:50:57', text: '路程太远！延期两天。'},
        finishedTime: '2020-10-05 10:50:57',
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        finished: {}
      }, {
        workOrderID: 2,
        engineer: '小王',
        workOrderType: '升级、改造',
        cabinetID: 'NO589902',
        address: '广州',
        SIM: '115706732',
        keyID: 'key-02',
        starTime: '2020-10-01 13:50:57',
        overTime: '2020-10-03 13:50:57',
        remark: '升级',
        state: 5,
        extensionRequest: {time: '2020-10-05 13:50:57', text: '路程太远！延期两天。'},
        outTime: {},
        finishedTime: '',
        img: '',
        finished: {}
      }, {
        workOrderID: 3,
        engineer: '小李',
        workOrderType: '升级、改造',
        cabinetID: '',
        address: '广州',
        SIM: '',
        keyID: '',
        starTime: '2020-10-02 13:50:57',
        overTime: '2020-10-05 13:50:57',
        remark: '改造',
        state: 5,
        extensionRequest: {},
        outTime: {},
        finishedTime: '',
        img: '',
        finished: {
          time: '2020-10-03 13:50:57',
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          cabinetID: 'NO589903',
          SIM: '115706733',
          keyID: 'key-03',
        }
      }
    ]
  },
  mutations:{
    addWorkOrder: (state,data = {}) =>{
      state.workOrderList.push(data)
    }
  }


}
export default workOrderInfo
