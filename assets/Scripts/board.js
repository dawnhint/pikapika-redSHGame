
cc.Class({
    extends: cc.Component,

    properties: {
        boardL: cc.Node,
        article3: cc.Node,
        article6: cc.Node,
        sudoku: cc.Node,

        gongJuRen: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

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
    },

    btn2: function () {
        this.article6.active = true;
    },

    btn3: function () {
        this.sudoku.active = true;
    },


    // update (dt) {},
});
