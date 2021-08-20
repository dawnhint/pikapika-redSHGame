// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        flagNode: {
            default: null,
            type: cc.Node,
        },
        flagAfter: {
            default: null,
            type: cc.SpriteFrame,
        },
        bigPic: {
            default: null,
            type: cc.Node,
        },
        bigPicCutting: cc.SpriteFrame,
        bigPicAfter: {
            default: null,
            type: cc.SpriteFrame,
        },
        gongJuRen: {
            default: null,
            type: cc.Node,
        },
        tools: {
            default: null,
            type: cc.Node,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.cutting = false;
        this.node.on('touchend', this.onTouch, this);
    },

    // 点击旗帜，显示大图
    onTouch: function () {
        let gongJu = this.gongJuRen.getComponent("GameManager");
        gongJu.clearCanvas();
        this.bigPic.active = true;
    },

    // 触发：获得剪刀
    testOnTouch: function () {
        let test = this.tools.getComponent("Tools");
        test.getScissors();
    },

    // 剪下旗帜，获得旗帜
    // 现在分两步，后期改成动画
    getRedFlag1: function () {
        let tool = this.tools.getComponent("Tools");
        if (this.cutting) {
            this.getRedFlag2();
            return;
        }
        if (tool.hldSc) {
            let pic = this.bigPic.getComponent(cc.Sprite);
            pic.spriteFrame = this.bigPicCutting;
            this.cutting = true;
            return;
        }
    },
    getRedFlag2: function () {
        // 替换大图
        let pic = this.bigPic.getComponent(cc.Sprite)
        pic.spriteFrame = this.bigPicAfter;
        // 添加道具红旗，删除道具剪刀
        let test = this.tools.getComponent("Tools");
        test.getRedFlag();
        test.unHoldAll();
        test.removeScissors();
        // 替换小图
        let sAfter = this.flagNode.getComponent(cc.Sprite)
        sAfter.spriteFrame = this.flagAfter;
    },

});
