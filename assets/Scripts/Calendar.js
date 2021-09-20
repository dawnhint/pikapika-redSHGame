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
        audioPage: {
            default: null,
            type: cc.AudioClip,
        },

        collection: cc.Node,
        info: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.calendarL.active = false;
        this.lockTime = true;
    },

    // 日历大图
    btn: function() {
        this.gongJuRen.getComponent("GameManager").clearCanvasM();
        this.calendarL.active = true;
        if(this.lockTime) {
            let cltn = this.collection.getComponent("collection");
            cltn.unlockFlag(6);
            this.info.string="解锁时间：1949年5月27日";
            var anim = this.info.getComponent(cc.Animation);
            anim.play('info');
            this.lockTime = false;
        }
    },

    // 撕日历
    tearPage: function () {
        // 放动画
        var anim = this.calendarL.getComponent(cc.Animation);
        anim.play('calendar');
        // 延时0.1s放音效
        this.scheduleOnce(function(){ 
            cc.audioEngine.play(this.audioPage,false,1);
         },0.1);
        // 大图替换
        var picL = this.calendarL.getComponent(cc.Sprite)
        picL.spriteFrame = this.picLAfter;
        // 小图替换
        var pic = this.calendar.getComponent(cc.Sprite)
        pic.spriteFrame = this.picAfter;
        // // 延时执行
        // this.schedule(function() {
        //     this.star.active = true;
        // }, 0.4);

    },

    start () {

    },

    // update (dt) {},
});
