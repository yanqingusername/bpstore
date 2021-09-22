Component({
  data: {
    option: [
      {
        value: 0,
        option: [
          { text: '全部商品', value: 0 },
          { text: '新款商品', value: 1 },
          { text: '活动商品', value: 2 }
        ]
      },
      {
        value: 'a',
        option: [
          { text: '全部商品', value: 'a' },
          { text: '新款商品', value: 'b' },
          { text: '活动商品', value: 'c' }
        ]
      }
    ]
  },
  methods: {
    handleClickToOpenItem(e) {
      const { current } = e.target.dataset
    },
    navigationToPage() {
      console.log('sss=>>>');
    }
  }
})