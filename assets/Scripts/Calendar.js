// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        calendar: cc.Node,
        calendarL:cc.Node,
        picAfter: cc.SpriteFrame,
        picLAfter: cc.SpriteFrame,
        // 工具
        gongJuRen: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.calendarL.active = false;
    },

    // 日历大图
    btn: function() {
        this.gongJuRen.getComponent("GameManager").clearCanvasM();
        this.calendarL.active = true;
    },

    // 撕日历
    tearPage: function () {
        // 放动画
        var anim = this.calendarL.getComponent(cc.Animation);
        anim.play('calendar');
        // 大图替换
        var picL = this.calendarL.getComponent(cc.Sprite)
        picL.spriteFrame = this.picLAfter;
        // 小图替换
        var pic = this.calendar.getComponent(cc.Sprite)
        pic.spriteFrame = this.picAfter;
    },

    start () {

    },

    // update (dt) {},
});
