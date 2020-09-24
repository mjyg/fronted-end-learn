(()=>{

    //1. 创建模板
    const template = document.createElement('template');
    template.innerHTML = `<section class="card-info">
        <dl class="card-info__cover">
            <dt>
                <img src="https://cdn.pixabay.com/photo/2015/01/28/23/35/landscape-615429__480.jpg" class="card-info__cover--image" />
                <h3 class="card-info__cover--title">autumn</h3>
            </dt>
            <dd>
                <div>
                    <img class="card-info__avatar" src="http://b-ssl.duitang.com/uploads/item/201505/19/20150519164024_mdRTY.jpeg" />
                    <span class="card-info__author">Damiao Alee</span>
                    <span class="card-info__comment">Comments <slot name="comments"></slot> </span>
                    <span class="card-info__divider-line"></span>
                </div>
                <div>
                    <h4 class="card-info__title">In my dual profession as an educator and health care provider</h4>
                    <ul>
                        <li class="card-info__likes"><i>❤</i> <slot name="likes"></slot> Likes</li>
                        <li class="card-info__shares"><i>➫</i> <slot name="shares"></slot> Shares</li>
                    </ul>
                </div>
            </dd>
        </dl>
    </section>

    <style>
        *{margin:0;padding:0;}
        ul,li{list-style: none; list-style-type: none;}
        .card-info{width:100%;height:auto;margin-top:30px;}
        .card-info__cover{width:100%;border-radius:5px;background-color: #fff;}
        .card-info__cover dt{width:100%;height:200px;position: relative;}
        .card-info__cover .card-info__cover--image{width:100%;height:100%;border-radius:5px 5px 0 0;object-fit: cover;}
        .card-info__cover .card-info__cover--title{color:rgba(255, 255, 255, .5);width:100%;height:60px;line-height:60px;text-align:center;position: absolute;left:0;bottom:0;text-transform: uppercase;letter-spacing: 2px;font-size:18px;}

        .card-info__cover dd{width:100%;margin-left:0;}
        .card-info__cover dd div{ width:100%; position: relative;box-sizing: border-box;padding:0 10px;}
        .card-info__cover dd div:nth-child(1){height:60px;display: flex;justify-content: space-between;box-sizing: border-box;padding-top:15px;}
        .card-info__cover dd div:nth-child(1) .card-info__avatar{width:30px;height:30px;border-radius:50%;}
        .card-info__cover dd div:nth-child(1) .card-info__author{height:30px;line-height:30px;color:#999;position:absolute;left:50px;text-transform:uppercase;font-size:13px;}
        .card-info__cover dd div:nth-child(1) .card-info__comment{color:#d1d1d1;font-size:13px;height:30px;line-height:30px;}
        .card-info__cover dd div:nth-child(1) .card-info__divider-line{position: absolute; bottom:0;width:calc(100% - 30px);height:1px;background-color:#eee;}

        .card-info__cover dd div:nth-child(2) .card-info__title{font-size: 13px;color:#444;line-height: 18px;min-height: 50px;overflow: hidden;text-transform: capitalize;padding-top:10px;}
        .card-info__cover dd div:nth-child(2) ul{display: flex;justify-content: flex-start;margin:0;padding:0;}
        .card-info__cover dd div:nth-child(2) li{color:#d1d1d1;font-size:12px;height:30px;line-height:30px;margin-right: 10px;}
        .card-info__cover dd div:nth-child(2) li i{color:red;font-size:15px;font-style: normal;margin-right: 2px;}
        .card-info__cover dd div:nth-child(2) li:nth-child(2) i{color:#d1d1d1;}
    </style>`;


    // 2. 创建文章卡片组件类 
    class ArticleInfo extends HTMLElement {
        constructor(){
            // first 
            super();

            // 创建 shadow DOM
            this.attachShadow({mode:'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.initEvent();
        }

        // 点击事件初始化
        initEvent(){
            let cardInfo = this.shadowRoot.querySelector('.card-info');
            cardInfo.addEventListener('click',(ev) => {
                let myEvent = new CustomEvent('card-click',{
                    composed: true,
                    bubbles: true,
                    detail: {
                        event: ev,
                        id: this.getAttribute('id')
                    }
                });
                this.dispatchEvent(myEvent);
            })
        }

        // 选择器 简化
        $(selector){
            return this.shadowRoot.querySelector(selector);
        }

        // 初始化渲染文章卡片组件内容 从属性获取
        initRenderer(){
            this.$(".card-info__cover--image").src = this.getAttribute('cover');
            this.$('.card-info__cover--title').innerText = this.getAttribute('theme');
            this.$('.card-info__avatar').src = this.getAttribute('avatar');
            this.$('.card-info__author').innerText = this.getAttribute('author');
            this.$('.card-info__title').innerText = this.getAttribute('title');
        }

        // 插入DOM 触发
        connectedCallback(){
            this.initRenderer();
            // console.log(this.getAttribute('id'));
        }

    }

    // 全局注册 文章卡片 自定义标签组件
    window.customElements.define('article-info',ArticleInfo);

})();