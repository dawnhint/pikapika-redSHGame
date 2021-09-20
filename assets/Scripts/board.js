
cc.Class({
    extends: cc.Component,

    properties: {
        boardL: cc.Node,
        article3: cc.Node,
        article6: cc.Node,
        sudoku: cc.Node,
        star5: cc.Node,

        tools: cc.Node,

        gongJuRen: {
            default: null,
            type: cc.Node,
        },

        audio_get: cc.AudioClip,

        collection: cc.Node,
        info: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.lockIncident = true;
    },

    start () {

    },


    btn: function () {
        this.gongJuRen.getComponent("GameManager").clearCanvasL();
        this.boardL.active = true;
        this.article3.active = false;
        this.article6.active = false;
        this.sudoku.active = false;
    },

    btn1: function () {
        this.article3.active = true;
        this.unlockIncident();
    },

    btn2: function () {
        this.article6.active = true;
        this.unlockIncident();
    },

    // 解锁事件
    unlockIncident: function () {
        if(this.lockIncident) {
            let cltn = this.collection.getComponent("collection");
            cltn.unlockFlag(7);
            this.info.string="解锁事件：上海解放";
            var anim = this.info.getComponent(cc.Animation);
            anim.play('info');
            this.lockIncident = false;
        }
    },


    btn3: function () {
        this.sudoku.active = true;
    },

    getStar5: function () {
        cc.audioEngine.play(this.audio_get,false,0.7);
        this.star5.destroy();
        let tools = this.tools.getComponent("Tools");
        tools.star5.active = true;
    }


    // update (dt) {},
});
