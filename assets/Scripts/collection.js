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
        more: cc.Node,

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
        // cc.director.runScene("main");
    },

    // 成就flag/文章article/更多more 版块切换
    initFlag () {
        this.iconDefault();
        let iconFlag = this.menu[0].getComponent(cc.Sprite);
        iconFlag.spriteFrame = this.menuOn[0];
        this.article.active = false;
        this.flag.active = true;
        this.more.active = false;
    },
    initArticle () {
        this.iconDefault();
        let iconArticle = this.menu[1].getComponent(cc.Sprite);
        iconArticle.spriteFrame = this.menuOn[1];
        this.flag.active = false;
        this.article.active = true;
        this.more.active = false;
    },
    initMore () {
        this.iconDefault();
        let iconMore = this.menu[2].getComponent(cc.Sprite);
        iconMore.spriteFrame = this.menuOn[2];
        this.article.active = false;
        this.flag.active = false;
        this.more.active = true;
    },
    iconDefault () {
        for( let i=0; i<3; i++){
            let icon = this.menu[i].getComponent(cc.Sprite)
            icon.spriteFrame = this.menuOff[i];
        }
    },

    // 文章articles版块
    btnArticle1: function () {
        cc.sys.openURL('https://img.library.sh.cn/gmwx/firstimg/ske1rd5y5fi1pc28.jpg');
    },
    btnArticle2: function () {
        cc.sys.openURL('https://img.library.sh.cn/gmwx/firstimg/4yw95zpf4vvp6bil.jpg');
    },
    btnArticle3: function () {
        cc.sys.openURL('https://img.library.sh.cn/gmwx/firstimg/74f568rtb6tyuxtc.jpg');
    },
    btnArticle5: function () {
        cc.sys.openURL('https://img.library.sh.cn/gmwx/firstimg/1wbwjt3veuwz7gu1.jpg');
    },
    btnArticle6: function () {
        cc.sys.openURL('https://img.library.sh.cn/gmwx/firstimg/5ngpsk2r6if44rb1.jpg');
    },
    btnArticle7: function () {
        cc.sys.openURL('https://img.library.sh.cn/gmwx/firstimg/r1mj4fvhbokr89bu.jpg');
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

    // More更多版块
    btnMore: function() {
        cc.director.loadScene("begin");
    },
    // update (dt) {},
});
