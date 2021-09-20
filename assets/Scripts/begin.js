// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        home: cc.Node,

        chapter: cc.Node,
        chapterPic: {
            default: [],
            type: cc.SpriteFrame,
        },
        btn: cc.Node,
        btnPic: {
            default: [],
            type: cc.SpriteFrame,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 切换横屏 （web适用
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        let frameSize = cc.view.getFrameSize();
        let height = frameSize.height;
        let width = frameSize.width;
        if (height > width) {
            cc.view.setFrameSize(height, width)
        }

        this.num = 3;   //Chapter0123
        cc.director.preloadScene("main", function () {
            cc.log("Next scene preloaded");
        });
        this.canStart = true;
    },

    
    start () {

    },

    // update (dt) {},

    startGame: function() {
        if(this.canStart) {
            cc.tween(this.home)
            .to(1.5, { opacity: 0 } )
            // 当前面的动作都执行完毕后才会调用这个回调函数
            .call(() => { 
                cc.director.loadScene("main");
            })
            .start()
        }
    },

    btnLeft: function () {
        if (this.num == 0) {
            this.num = 3;
        } else {
            this.num--;
        }
        this.updateChapter();
    },

    btnRight: function () {
        if (this.num == 3) {
            this.num = 0;
        } else {
            this.num++;
        }
        this.updateChapter();
    },

    updateChapter: function () {
        let cpt = this.chapter.getComponent(cc.Sprite);
        cpt.spriteFrame = this.chapterPic[this.num];
        let btn = this.btn.getComponent(cc.Sprite);
        if (this.num <= 2) {
            btn.spriteFrame = this.btnPic[1];
            this.canStart = false;
        } else {
            btn.spriteFrame = this.btnPic[0];
            this.canStart = true;
        }
    },
});
