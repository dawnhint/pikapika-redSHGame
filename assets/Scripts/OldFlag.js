// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        // 掉落过程图
        pic: cc.Node,
        old: {
            default: [],
            type: cc.SpriteFrame,
        }

    },



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.btnCount = 0;
    },

    btn: function () {
        if (this.btnCount <= 2) {
            var nextPic = this.pic.getComponent(cc.Sprite)
            nextPic.spriteFrame = this.old[this.btnCount];
            this.btnCount++;
            return;
        } else {
            this.pic.active = false;
        }
    },

    start() {

    },

    // update (dt) {},
});
