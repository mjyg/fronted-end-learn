(()=>{
    console.log(cardData);
    let container = document.querySelector('.container');
    let str = '';

    // 便利获取所有的文章信息卡片
    cardData.forEach(item => {
        str += `<article-info
            id="${item.id}"
            cover="${item.cover}"
            theme="${item.theme}"
            avatar="${item.avatar}"
            author="${item.author}"
            title="${item.title}"
        >
            <em slot="comments">${item.comments}</em>
            <em slot="likes">${item.likes}</em>
            <em slot="shares">${item.shares}</em>
        </article-info>`
    });

    // append container 去
    container.innerHTML = str;


    // accept custom event from article card component
    document.body.addEventListener('card-click',(ev) => {
        let id = ev.detail.id;
        let detailWrap = document.querySelector('.container-detail-wrap');
        let cardDetail = document.querySelector('article-info-detail');

        // get article data from id
        let articleSelectData = cardData.filter(v => v.id == id)[0];
        Object.keys(articleSelectData).forEach(key => {
            cardDetail.setAttribute(key, articleSelectData[key]);
        })

        // 动画显示 文章详情页
        detailWrap.style.left = 0;
        detailWrap.style.opacity = 1;
    })

    // accept custom event from article card detail component
    document.body.addEventListener('card-back-click',(ev) => {
        let detailWrap = document.querySelector('.container-detail-wrap');

        // 动画关闭 文章详情页
        detailWrap.style.left = '100%';
        detailWrap.style.opacity = 0;
    })



})();