// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        changeTarget: {
            default: null,
            type: cc.Node,
        },
        Prop: {
            default: null,
            type: cc.SpriteFrame,
        },
        gongJuRen: {
            default: null,
            type: cc.Node,
        },
        starPic: cc.Node,
        starPic2: cc.SpriteFrame,
        bookPic: cc.Node,
        // 大头
        soldierL: cc.Node,
        soldierLAfter: {
            default: null,
            type: cc.SpriteFrame,
        },
        tools: cc.Node,
        starArea: cc.Node,
        bookArea: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('touchend', this.onTouch, this);
    },

    onTouch: function () {
        // 调用一下工具人的函数，清除画布
        let gongJu = this.gongJuRen.getComponent("GameManager");
        gongJu.clearCanvas();
        // 清除子节点的图片
        this.bookPic.active = false;
        this.starPic.active = false;
        // 激活士兵大图
        this.soldierL.active = true;
    },

    // 点击星星步骤（之后改成一步到位的动画）
    onStar: function () {
        this.starPic.active = true;
    },
    onStar2: function () {
        var starPic = this.starPic.getComponent(cc.Sprite)
        starPic.spriteFrame = this.starPic2;

        // 士兵大图更换
        var LPic = this.soldierL.getComponent(cc.Sprite)
        LPic.spriteFrame = this.soldierLAfter;

        // 士兵小图更换
        var touchedPic = this.changeTarget.getComponent(cc.Sprite)
        touchedPic.spriteFrame = this.Prop;

    },
    onStar3: function () {
        // 获取星星到物品栏
        let func = this.tools.getComponent("Tools");
        func.star1.active = true;
        // 使starArea的btn失效
        this.starArea.getComponent(cc.Button).interactable = false;
    },

    onBook: function () {
        this.bookPic.active = true;

    },


    // update (dt) {},
});
