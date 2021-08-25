
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

        tools: cc.Node,
        gongJuRen: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.star.active = false;
        this.btn_star.active = false;
    },

    btn: function() {
        this.gongJuRen.getComponent("GameManager").clearCanvasL();
        this.deskL.active = true;
    },

    getScissors: function () {
        let tool = this.tools.getComponent("Tools");
        tool.scissors.active = true;
        this.scissors.destroy();
        this.scissorsL.destroy();
    },

    openDesk: function () {
        let tool = this.tools.getComponent("Tools");
        if (tool.hldKey) {
            let pic = this.desk.getComponent(cc.Sprite);
            pic.spriteFrame = this.desk_open;
            let pic2 = this.deskL.getComponent(cc.Sprite);
            pic2.spriteFrame = this.deskL_open;
            tool.key.destroy();
            this.btn_desk.destroy();
            this.star.active = true;
            this.btn_star.active = true;
        }
    },

    getStar3: function () {
        this.star.destroy();
        let tool = this.tools.getComponent("Tools");
        tool.star3.active = true;
    },

    start () {

    },

    // update (dt) {},
});
