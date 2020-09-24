const list = {
  init() {
    // $("#js-btn").click(function () {
    //   alert("数据加载成功");
    // });

    //把点击事件代理到document上，避免动态加载的html上的事件绑定失效
    $(document).on("click", "#js-btn", function (event) {
      alert("数据加载成功");
    });
    console.log("list");
  },
};

export default list;
