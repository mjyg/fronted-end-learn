//负责加载list.html里需要用到的js脚本，交给webpack
//webpack反向把分析好的js文件塞到list.html

import banner from "@/components/banner/banner.js";
import list from "@/components/list/list.js";
banner.init();
list.init();
