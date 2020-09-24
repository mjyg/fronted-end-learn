(()=>{
   
    // 创建模板
    const template = document.createElement('template');
    // <template> 标签元素里面包含了我们组件里面的具体样式和DOM
    template.innerHTML = `
    <section class="datetime-box">
        <dl class="datetime-box__wrap">
            <dt class="datetime-box__wrap--day">06</dt>
            <dd class="datetime-box__wrap--year-month">
                <span class="datetime-box__wrap--month">april</span>
                <span class="datetime-box__wrap--year">2020</span>
            </dd>
        </dl>
    </section>

    <style>
        *{margin:0;padding:0;}
        .datetime-box{ color:#fff; }
        .datetime-box__wrap{display: flex;flex-wrap:nowrap;justify-content:flex-start;width:100%;height:100px;line-height:100px;box-sizing: border-box;padding-left:35px;margin:0;}
        .datetime-box__wrap--day{font-size:50px;font-weight:bold;letter-spacing: 3px;position: relative;padding-right:15px;}
        .datetime-box__wrap--day:before{content:'';display:block;position: absolute;right:0;top:50%;width:1px;height:35px;background-color:rgba(255,255,255,0.7);transform: translateY(-50%);}
        .datetime-box__wrap--year-month{height:35px;padding-left:18px;}
        .datetime-box__wrap--year-month span{display: block;width:100%;}
        .datetime-box__wrap--year-month .datetime-box__wrap--month{text-transform: uppercase;font-size:20px;height:20px;line-height:20px;letter-spacing: 3px;position: relative;top:32px;}
        .datetime-box__wrap--year-month .datetime-box__wrap--year{position: relative;top:-8px;font-size:13px;letter-spacing: 1px;}
    </style>`;

    // 创建自定义datetime组件类 DateTime 
    // 只要继承HTMLElement类 我们就可以编写自定义标签/元素
    class DateTime extends HTMLElement {
        // 生命周期 constructor 
        // 元素创建了，但是没并没有添加到页面，一般来说我们需要在constructor中创建 初始化状态，事件监听，创建影子DOM
        constructor(){
            // 首先第一步 调用 super 方法
            super();

            // open -> 允许外界访问 shadow DOM
            // closed -> 不允许
            this.attachShadow({mode:'open'});

            // template.content -> 文档碎片
            // cloneNode(params) params -> boolean [true|false] true -> 深度遍历克隆 false -> 相反
            this.shadowRoot.appendChild(template.content.cloneNode(true));

        }

        // 初始化时间
        initDateTime(){
            // 1. 获取当前的时间对象
            let date = new Date();
            // 2. 创建 英文鱼粉 枚举数组
            let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            // 3. 封装配置需要使用的 年 月 日
            let dateConfig = {
                date: date.getDate() >= 10 ? date.getDate() : '0'+date.getDate(),
                month: months[date.getMonth()],
                year: date.getFullYear()
            };
            
            // 4. datetime 内容渲染显示
            this.shadowRoot.querySelector('.datetime-box__wrap--day').innerText = dateConfig.date;
            this.shadowRoot.querySelector('.datetime-box__wrap--month').innerText = dateConfig.month;
            this.shadowRoot.querySelector('.datetime-box__wrap--year').innerText = dateConfig.year;

        }

        // 生命周期 - connectedCallback() 
        // 元素被插入DOM的时候执行 一般来说 用来获取数据 设置默认的显示样式或者内容
        connectedCallback(){
            this.initDateTime();
        }

    }


    // 全局注册组件
    // 把组件类挂载到DOM上去，使用自定义标签使用我们的组件
    window.customElements.define('date-time',DateTime);


})();