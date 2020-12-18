module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },
    'postcss-pxtorem': {
      //根元素的值
      // rootValue: 37.5,
      rootValue({
        file
      }) {
        // console.log(file)
        return file.indexOf('vant') !== -1 ? 37.5 : 75

      },
      //转换所有css属性
      propList: ['*'],
      exclude: 'github-markdown'
    },
  },
};