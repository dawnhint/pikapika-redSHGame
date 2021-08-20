
cc.Class({
    extends: cc.Component,

    properties: {
        tools: cc.Node,
        redFlag: cc.Node,
        scissors: cc.Node,
        star1: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initTools();
    },

    // 工具栏初始化，所有道具未激活
    initTools: function() {
        var _children = this.tools.children;
        for(i=0;i<_children.length; i++){
            _children[i].active = false;
        }
        this.unHoldAll();
        this.getScissors();
    },

    // 获取道具相关
    getScissors: function() {
        this.scissors.active = true;
    },
    getRedFlag: function() {
        this.redFlag.active = true;
    },
    getStar1: function() {
        this.star1.active = true;
    },

    // 使用道具相关
    holdScissors: function(){
        this.unHoldAll();
        this.hldSc = true;
    },
    unHoldAll: function() {
        this.hldSc = false;
    },

    // 删除道具
    removeScissors: function() {
        this.scissors.active = false;
    },


    start () {

    },

    // update (dt) {},
});
