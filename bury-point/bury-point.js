(function () {
    //网页产生的事件列表
    var evSet = ['click', 'dbclick', 'mousepress', 'keypress'];

    //事件记录表 key为事件名称 value为事件路径序列的数组
    var eventMap = {};

    //body截获埋点事件
    evSet.forEach(function (ev) {
        document.body.addEventListener(ev, handleBuryPointer);
    })

    function handleBuryPointer(ev) {
        var el = ev.target;
        console.log(el.innerText)
        var eventArr = JSON.parse(el.getAttribute("event"));
        if (eventArr != null) {
            eventArr.forEach(function (v) {
                //如果触发类型不一样则返回
                if(v.trigger != ev.type) return;
                //根据事件name查找eventMap 如果不存在 则初始化为空数组
                // 继续判断sque是否为-1 如果是则向后台发送日志清空这条事件记录 否则push新的sque
                if (eventMap[v.name] == null) {
                    eventMap[v.name] = [];
                }
                eventMap[v.name].push(Object.assign({},v,{desc: el.innerText || el.value}));
                if (v.sque === -1) {
                    //here send log to server
                    console.log(v.name, eventMap[v.name]);
                    eventMap[v.name] = [];
                }
            })
        }
    }
})();