
cc.Class({
    extends: cc.Component,

    properties: {
        tools: {
            default: null,
            type: cc.Node
        },
        redFlag: cc.Node,
        scissors: cc.Node,
        nails: cc.Node,
        star1: cc.Node,
        star2: cc.Node,
        star3: cc.Node,
        key: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initTools();
    },

    // 工具栏初始化，所有道具未激活
    initTools: function () {
        let _children = this.tools.children;
        for (let i = 0; i < _children.length; i++) {
            _children[i].active = false;
        }
        this.unHoldAll();
        this.key.active = true;
    },

    // 使用道具相关
    unHoldAll: function () {
        this.hldSc = false;     //拿剪刀
        this.hldRed = false;    //拿红旗
        this.hldStar1 = false;  //拿五角星
        this.hldStar2 = false; 
        this.hldStar3 = false; 
        this.hldKey = false;    //拿钥匙 
        let _children = this.tools.children;
        for (let i = 0; i < _children.length; i++) {
            let bg = cc.find("tool_bg",_children[i]);
            bg.active = false;
        }
    },
    holdRedFlag: function () {
        this.unHoldAll();
        this.hldRed = true;
        let bg = cc.find("tool_bg",this.redFlag);
        bg.active = true;
    },
    holdScissors: function () {
        this.unHoldAll();
        this.hldSc = true;
        // 添加背景
        let bg = cc.find("tool_bg",this.scissors);
        bg.active = true;
    },
    holdNails: function () {
        this.unHoldAll();
        let bg = cc.find("tool_bg",this.nails);
        bg.active = true;
    },
    holdStar1: function () {
        this.unHoldAll();
        this.hldStar1= true;
        let bg = cc.find("tool_bg",this.star1);
        bg.active = true;
    },
    holdStar2: function () {
        this.unHoldAll();
        this.hldStar2= true;
        let bg = cc.find("tool_bg",this.star2);
        bg.active = true;
    },
    holdStar3: function () {
        this.unHoldAll();
        this.hldStar3= true;
        console.log('1');
        let bg = cc.find("tool_bg",this.star3);
        bg.active = true;
    },
    holdKey: function () {
        this.unHoldAll();
        this.hldKey= true;
        let bg = cc.find("tool_bg",this.key);
        bg.active = true;
    },



    start() {

    },

    // update (dt) {},
});
