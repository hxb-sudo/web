

const workOrderTypeData = {
  state: {
    workOrderTypeData : [
      {workOrderID:1,workOrderType: '日常巡检',details: '计划巡检',remark: '不定时抽样巡检',able: true},
      {workOrderID:2,workOrderType: '日常巡检',details: '周期巡检',remark: '每一周巡检一次',able: true},
      {workOrderID:3,workOrderType: '商品运营',details: '物品上架、下架',remark: '工程人员对指定的柜机进行上架、下架操作',able: true},
      {workOrderID:4,workOrderType: '商品运营',details: '投诉、理赔',remark: '顾客对商品不满意时发起',able: false},
      {workOrderID:5,workOrderType: '常规维护',details: '故障维修',remark: '柜机出现问题时进行维修',able: true},
      {workOrderID:6,workOrderType: '常规维护',details: '升级、改造',remark: '工程人员对柜机进行升级',able: true},
      {workOrderID:7,workOrderType: '常规维护',details: '安装、移机、撤机',remark: '工程人员安装、移机、撤机操作',able: true},
    ],
    workType : [
      {ID:1,workName:'日常巡检'},
      {ID:2,workName:'商品运营'},
      {ID:3,workName:'常规维护'},
    ]
  },

  mutations: {
    setWorkOrderTypeData:(state,data = []) =>{
      state.workOrderTypeData = data
    }
  }

}
export default workOrderTypeData
