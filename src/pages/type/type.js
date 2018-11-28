// import itemImg from '@/assets/images/item.jpg'
import { getCornsImg } from '@/service/api/corns.js'
// let Base64 = require('js-base64').Base64

export default {
  data () {
    return {
      type: {
        id: 'type-echarts'
      },
      loadingCornImg: false,
      loadingCornInfo: false,
      // 搜索病状
      selectOptions: {
        selectCategory: '',
        selectPartRoots: [],
        selectPartStems: [],
        selectPartLeaves: [],
        selectPartFruits: []
      },
      // 搜索病状图片
      getCornImg: [],
      // 获取的病状分析
      getCornInfo: [],
      // 下拉框value
      cropsOptions: {
        // 农作物种类
        cropsCategory: [{
          value: 'corn',
          label: '玉米'
        }, {
          value: 'onion',
          label: '洋葱'
        }, {
          value: 'soy',
          label: '大豆'
        }, {
          value: 'garlic',
          label: '大蒜'
        }],

        // 农作物组成部分
        partOption: {

          // 根状态
          roots: [
            {
              value: '1',
              label: '湿腐'
            }, {
              value: '2',
              label: '软腐'
            }
          ],

          // 茎状态
          stems: [
            {
              value: '3',
              label: '猝倒'
            }, {
              value: '4',
              label: '黄萎'
            },
            {
              value: '5',
              label: '青枯'
            },
            {
              value: '6',
              label: '增大'
            },
            {
              value: '7',
              label: '变态'
            },
            {
              value: '8',
              label: '霉菌'
            }
          ],

          // 叶子状态
          leaves: [
            {
              value: '9',
              label: '叶枯'
            },
            {
              value: '10',
              label: '叶烧'
            },
            {
              value: '11',
              label: '轮斑'
            },
            {
              value: '12',
              label: '环斑'
            },
            {
              value: '13',
              label: '点斑'
            },
            {
              value: '14',
              label: '圆斑'
            },
            {
              value: '15',
              label: '穿孔'
            },
            {
              value: '16',
              label: '形状大小不同，轮廓清晰'
            }
          ],

          // 果实
          fruits: [
            {
              value: '17',
              label: '异常'
            }
          ]
        }
      }
    }
  },
  methods: {
    selectSubmit () {
      console.log(1)
    },
    handleGetImg (value) {
      const params = { }
      // console.log(value)
      this.loadingCornImg = true
      if (value.length && this.selectOptions.selectCategory) {
        params.corns = this.selectOptions.selectCategory
        value = parseInt(value[value.length - 1])
        params.number = value
        getCornsImg(params).then(res => {
          res._source.corn = this.selectOptions.selectCategory
          this.getCornImg.push(res._source)
          this.loadingCornImg = false
        }).catch(err => {
          this.loadingCornImg = false
          console.log(err)
          this.$message({
            showClose: true,
            message: '请求失败，请检查后再请求',
            type: 'error'
          })
        })
        this.getCornImg = []
      } else {
        this.loadingCornImg = false
        console.log('需要选择农作物或查询的特征')
      }
    }
  }
}
