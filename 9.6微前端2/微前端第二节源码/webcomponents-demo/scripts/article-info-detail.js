(()=>{

    //1. 创建模板
    const template = document.createElement('template');
    template.innerHTML = `<section class="card-info-detail-detail">
            <dl class="card-info-detail__cover">
                <dt>
                    <img src="https://cdn.pixabay.com/photo/2015/01/28/23/35/landscape-615429__480.jpg" class="card-info-detail__cover--image" />
                    <h3 class="card-info-detail__cover--title">autumn</h3>
                    <span class="card-info-detail__cover--back">←</span>
                </dt>
                <dd>
                    <div>
                        <img class="card-info-detail__avatar" src="http://b-ssl.duitang.com/uploads/item/201505/19/20150519164024_mdRTY.jpeg" />
                        <span class="card-info-detail__author">Damiao Alee</span>
                        <span class="card-info-detail__comment">Comments  </span>
                        <span class="card-info-detail__divider-line"></span>
                    </div>
                    <div>
                        <h4 class="card-info-detail__title">In my dual profession as an educator and health care provider</h4>
                        <p class="card-info-detail__paragraph">
                           
                        </p>
                        <ul>
                            <li class="card-info-detail__likes"><i>❤</i>  Likes</li>
                            <li class="card-info-detail__shares"><i>➫</i>  Shares</li>
                        </ul>
                    </div>
                </dd>
            </dl>
        </section>

        <style>
            *{margin:0;padding:0;}
            ul,li{list-style: none; list-style-type: none;}
            .card-info-detail{width:100%;height:auto;}
            .card-info-detail__cover{width:100%;background-color: #fff;}
            .card-info-detail__cover dt{width:100%;height:300px;position: relative;}
            .card-info-detail__cover .card-info-detail__cover--image{width:100%;height:100%;object-fit: cover;}
            .card-info-detail__cover .card-info-detail__cover--title{color:rgba(255, 255, 255, .5);width:100%;height:60px;line-height:60px;text-align:center;position: absolute;left:0;top:0;text-transform: uppercase;letter-spacing: 2px;font-size:18px;}
            .card-info-detail__cover .card-info-detail__cover--back{ font-size:18px;color:rgba(255, 255, 255, .5);position: absolute;left:20px;top:0;z-index:2;height:60px;line-height:60px;}

            .card-info-detail__cover dd{width:100%;margin-left:0;}
            .card-info-detail__cover dd div{ width:100%; position: relative;box-sizing: border-box;padding:0 10px;}
            .card-info-detail__cover dd div:nth-child(1){height:60px;display: flex;justify-content: space-between;box-sizing: border-box;padding-top:15px;}
            .card-info-detail__cover dd div:nth-child(1) .card-info-detail__avatar{width:30px;height:30px;border-radius:50%;}
            .card-info-detail__cover dd div:nth-child(1) .card-info-detail__author{height:30px;line-height:30px;color:#999;position:absolute;left:50px;text-transform:uppercase;font-size:13px;}
            .card-info-detail__cover dd div:nth-child(1) .card-info-detail__comment{color:#d1d1d1;font-size:13px;height:30px;line-height:30px;}
            .card-info-detail__cover dd div:nth-child(1) .card-info-detail__divider-line{position: absolute; bottom:0;width:calc(100% - 30px);height:1px;background-color:#eee;}

            .card-info-detail__cover dd div:nth-child(2) .card-info-detail__title{font-size: 20px;color:#444;line-height: 30px;min-height: 50px;overflow: hidden;text-transform: capitalize;padding-top:10px;}
            .card-info-detail__cover dd div:nth-child(2) .card-info-detail__paragraph{font-size:15px;line-height: 25px;}
            .card-info-detail__cover dd div:nth-child(2) ul{display: flex;justify-content: flex-start;margin:0;padding:0;}
            .card-info-detail__cover dd div:nth-child(2) li{color:#d1d1d1;font-size:12px;height:30px;line-height:30px;margin-right: 10px;}
            .card-info-detail__cover dd div:nth-child(2) li i{color:red;font-size:15px;font-style: normal;margin-right: 2px;}
            .card-info-detail__cover dd div:nth-child(2) li:nth-child(2) i{color:#d1d1d1;}
        </style>`;


    // 2. 创建文章卡片详情组件类 
    class ArticleInfoDetail extends HTMLElement {
        constructor(){
            // first 
            super();

            // 创建 shadow DOM
            this.attachShadow({mode:'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.initEvent();

        }

        // 初始化事件
        initEvent(){
            const backBtn = this.$('.card-info-detail__cover--back');
            backBtn.addEventListener('click',(ev) => {
                let myEvent = new CustomEvent('card-back-click',{
                    composed: true,
                    bubbles: true
                });
                this.dispatchEvent(myEvent);
            })
        }

        // 选择器 简化
        $(selector){
            return this.shadowRoot.querySelector(selector);
        }

        // 初始化渲染文章卡片详情组件内容 从属性获取
        initRenderer(){
            this.$(".card-info-detail__cover--image").src = this.getAttribute('cover');
            this.$('.card-info-detail__cover--title').innerText = this.getAttribute('theme');
            this.$('.card-info-detail__avatar').src = this.getAttribute('avatar');
            this.$('.card-info-detail__author').innerText = this.getAttribute('author');
            this.$('.card-info-detail__title').innerText = this.getAttribute('title');
            this.$('.card-info-detail__comment').innerText = 'Comments '+this.getAttribute('comments');
            this.$('.card-info-detail__likes').innerHTML = `<i>❤</i> ${this.getAttribute('likes')}  Likes`;
            this.$('.card-info-detail__shares').innerHTML = `<i>➫</i> ${this.getAttribute('shares')}  Shares`;
            this.$('.card-info-detail__paragraph').innerText = this.getAttribute('paragraph');
        }   

        // 插入DOM 触发
        connectedCallback(){
            this.initRenderer();
        }

        // 生命周期方法 attributeChangedCallback(name, oldValue, newValue)
        attributeChangedCallback(name,oldV,newV){
            this.initRenderer();
        }

        // 监听属性的变化
        // 返回的每一个属性名对应的属性值 发生变化，都会触发对应的attributeChangedCallback方法
        static get observedAttributes(){
            return ['cover','theme','avatar','author','title','comments','likes','shares','paragraph'];
        }
    }

    // 全局注册 文章卡片 自定义标签组件
    window.customElements.define('article-info-detail', ArticleInfoDetail);

})();