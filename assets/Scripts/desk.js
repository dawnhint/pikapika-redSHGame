
cc.Class({
    extends: cc.Component,

    properties: {
        desk: cc.Node,
        scissors: cc.Node,
        deskL: cc.Node,
        scissorsL: cc.Node,
        star: cc.Node,
        desk_open: cc.SpriteFrame,
        deskL_open: cc.SpriteFrame,
        btn_desk: cc.Node,
        btn_star: cc.Node,
        btn_scissors: cc.Node,
        article5L: cc.Node,

        tools: cc.Node,
        gongJuRen: {
            default: null,
            type: cc.Node,
        },

        audio_locked: cc.AudioClip,
        audio_key: cc.AudioClip,
        audio_drawer: cc.AudioClip,
        audio_get: cc.AudioClip,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.star.active = false;
        this.btn_star.active = false;
        this.article5L.active = false;

    },

    btn: function() {
        this.gongJuRen.getComponent("GameManager").clearCanvasL();
        this.deskL.active = true;
        this.article5L.active = false;
    },

    showArticle5: function () {
        this.article5L.active = true;
    },

    getScissors: function () {
        let tool = this.tools.getComponent("Tools");
        tool.scissors.active = true;
        cc.audioEngine.play(this.audio_get,false,1);
        this.scissors.destroy();
        this.scissorsL.destroy();
        this.btn_scissors.active = false;
    },

    openDesk: function () {
        let tool = this.tools.getComponent("Tools");
        if (tool.hldKey) {
            cc.audioEngine.play(this.audio_key,false,1);
            this.scheduleOnce(function(){ 
                cc.audioEngine.play(this.audio_drawer,false,1);
            },0.1);
            this.scheduleOnce(function(){ 
                let pic = this.desk.getComponent(cc.Sprite);
                pic.spriteFrame = this.desk_open;
                let pic2 = this.deskL.getComponent(cc.Sprite);
                pic2.spriteFrame = this.deskL_open;
                tool.key.destroy();
                this.btn_desk.destroy();
                this.star.active = true;
                this.btn_star.active = true;
            },0.3);
        } else {
            cc.audioEngine.play(this.audio_locked,false,0.6);
        }
    },

    getStar3: function () {
        this.star.destroy();
        this.btn_star.active = false;
        let tool = this.tools.getComponent("Tools");
        tool.star3.active = true;
        cc.audioEngine.play(this.audio_get,false,1);
    },

    start () {

    },

    // update (dt) {},
});
