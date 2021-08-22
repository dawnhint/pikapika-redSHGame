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
        },

        audioCut: cc.AudioClip,

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
        let tool = this.tools.getComponent("Tools");
        tool.scissors.active = true;
    },

    // 剪下旗帜，获得旗帜
    getRedFlag: function () {
        let tool = this.tools.getComponent("Tools");
        if (tool.hldSc) {
            var anim = this.bigPic.getComponent(cc.Animation);
            anim.play('cutFlag');
            cc.audioEngine.play(this.audioCut,false,0.7);
            let test = this.tools.getComponent("Tools");
            test.redFlag.active = true;
            test.unHoldAll();
            test.scissors.destroy();
            // 替换小图
            let sAfter = this.flagNode.getComponent(cc.Sprite)
            sAfter.spriteFrame = this.flagAfter;
        }
    },

});
