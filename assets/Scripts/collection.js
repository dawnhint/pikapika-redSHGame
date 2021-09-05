// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        mainGame: cc.Node,
        collection: cc.Node,
        articleL: cc.Node,

        menu: {
            default: [],
            type: cc.Node,
        },
        menuOff: {
            default: [],
            type: cc.SpriteFrame,
        },
        menuOn: {
            default: [],
            type: cc.SpriteFrame,
        },

        article: cc.Node,
        flag: cc.Node,

        // 成就区域
        lockedPic: {
            default: [],
            type: cc.Node,
        },
        unlockPic: {
            default: [],
            type: cc.Node,
        },
        page1: cc.Node,
        page2: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initFlag ();
        // for (let i=0; i<8; i++) {
        //     this.lockedPic[i].active = true;
        //     this.unlockPic[i].active =false;
        //     console.log('1')
        // }
    },

    // 返回游戏
    btnBack: function () {
        this.collection.active = false;
        this.mainGame.active = true;
        // cc.director.loadScene("main");
        // cc.director.loadScene("main");
        // cc.director.runScene("main");
    },

    // 成就flag/文章article/历史history 版块切换
    initFlag () {
        this.iconDefault();
        let iconFlag = this.menu[0].getComponent(cc.Sprite);
        iconFlag.spriteFrame = this.menuOn[0];
        this.article.active = false;
        this.flag.active = true;
    },
    initArticle () {
        this.iconDefault();
        let iconArticle = this.menu[1].getComponent(cc.Sprite);
        iconArticle.spriteFrame = this.menuOn[1];
        this.flag.active = false;
        this.article.active = true;
    },
    initHistory () {
        this.iconDefault();
        let iconHistory = this.menu[2].getComponent(cc.Sprite);
        iconHistory.spriteFrame = this.menuOn[2];
    },

    iconDefault () {
        for( let i=0; i<3; i++){
            let icon = this.menu[i].getComponent(cc.Sprite)
            icon.spriteFrame = this.menuOff[i];
        }
    },

    // 文章articles版块
    btnArticle: function () {
        this.articleL.active = true;
    },
    btnAticleBack: function () {
        this.articleL.active = false;
    },

    // 成就flag版块
    // 用来切换是否解锁的贴图
    unlockFlag: function (i) {
        this.lockedPic[i].active = false;
        this.unlockPic[i].active = true;
        // console.log('解锁了',i)
    },
    toPage1: function () {
        this.page1.active = true;
        this.page2.active = false;
    },
    toPage2: function () {
        this.page1.active = false;
        this.page2.active = true;
    },
    btnTest: function () {
        this.unlockFlag(1);
    },

    // update (dt) {},
});
