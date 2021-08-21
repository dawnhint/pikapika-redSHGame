// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        safeBox: cc.Node,
        picAfter: cc.SpriteFrame,
        safeBoxL: cc.Node,
        star: cc.Node,
        // 工具
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

    onLoad () {
        this.safeBoxL.active = false;
        this.star.active = false;
    },

    btn: function () {
        this.gongJuRen.getComponent("GameManager").clearCanvasM();
        if(this.safeBoxL.isValid) {
            this.safeBoxL.active = true;
        } else {
            let tools = this.tools.getComponent("Tools");
            tools.star2.active = true;
        }
    },

    enterPassward () {
        // 输入密码还没做
        // 后期要测试手机上的点击区域是否足够，不够调整图片大小
        // 先做成点击开锁
        var anim = this.safeBoxL.getComponent(cc.Animation);
        anim.play('openSafeBox');
        // 动画播放停止时执行？
        anim.on('finished', this.onFinished, this);
    },

    onFinished () {
        // 销毁节点
        this.safeBoxL.destroy();
        // 替换图片
        var pic = this.safeBox.getComponent(cc.Sprite)
        pic.spriteFrame = this.picAfter;
        this.star.active = true;
    },
    

    start () {

    },

    // update (dt) {},
});
