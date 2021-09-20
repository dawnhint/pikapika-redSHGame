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
        bookPic: cc.Node,
        bookL: cc.Node,
        starL: cc.Node,
        // 大头
        soldierL: cc.Node,
        soldierLAfter: {
            default: null,
            type: cc.SpriteFrame,
        },
        tools: cc.Node,
        starArea: cc.Node,
        bookArea: cc.Node,
        audioDing: cc.AudioClip,

        collection: cc.Node,
        info: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.node.on('touchend', this.onTouch, this);
        this.lockBook = true;
        this.lockSoldier = true;
    },

    onTouch: function () {
        // 调用一下工具人的函数，清除画布
        let gongJu = this.gongJuRen.getComponent("GameManager");
        gongJu.clearCanvas();
        // 清除子节点的图片
        this.bookPic.active = false;
        // 激活士兵大图
        this.soldierL.active = true;
        // 解锁士兵
        if(this.lockSoldier) {
            let cltn = this.collection.getComponent("collection");
            cltn.unlockFlag(3);
            this.info.string="解锁人物：解放军";
            var anim = this.info.getComponent(cc.Animation);
            anim.play('info');
            this.lockSoldier = false;
        }
    },

    // 点击星星步骤（之后改成一步到位的动画）
    onStar: function() {
        this.starL.active = true;
    },

    onStarBig: function () {
        // 放段动画
        var anim = this.starL.getComponent(cc.Animation);
        anim.play('getStarBig');
        // 动画播放停止时执行
        anim.on('finished', this.gotStar, this);
        cc.audioEngine.play(this.audioDing, false, 2);  
    },

    gotStar: function() {
        // 士兵大图更换
        let LPic = this.soldierL.getComponent(cc.Sprite)
        LPic.spriteFrame = this.soldierLAfter;
        // 士兵小图更换
        let touchedPic = this.changeTarget.getComponent(cc.Sprite)
        touchedPic.spriteFrame = this.Prop;
        // 获取星星到物品栏
        let func = this.tools.getComponent("Tools");
        func.star1.active = true;
        // 使starArea的btn失效
        this.starArea.getComponent(cc.Button).interactable = false;
        // 销毁大星星节点
        this.starL.destroy();
    },

    onBook: function () {
        this.bookL.active = false;
        this.bookPic.active = true;
    },
    bookDetail: function () {
        this.bookL.active = true;
        // 解锁书
        if(this.lockBook) {
            let cltn = this.collection.getComponent("collection");
            cltn.unlockFlag(0);
            this.info.string="解锁成就：《入城十大守则》";
            var anim = this.info.getComponent(cc.Animation);
            anim.play('info');
            this.lockBook = false;
        }
    },


    // update (dt) {},
});
