
cc.Class({
    extends: cc.Component,

    properties: {
        // rooms
        outDoor: cc.Node,
        roomM: cc.Node,

        // furniture
        flag: cc.Node,
        soldier: cc.Node,

        // tools
        tools: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.outDoor.active = false;
        this.roomM.active = true;
    },


    // 把场景恢复成家具小图
    clearCanvas: function () {
        // flag和soldier的子节点的active变成false
        var _children = this.flag.children;
        for (i = 0; i < _children.length; i++) {
            _children[i].active = false;
        }
        var _children = this.soldier.children;
        for (i = 0; i < _children.length; i++) {
            _children[i].active = false;
        }
    },

    // 跳转
    // 点击进门
    intoDoor: function () {
        this.outDoor.active = false;
        this.roomM.active = true;
        this.clearCanvas();
    },
    // 点击出门
    outOfDoor: function () {
        this.outDoor.active = true;
        this.roomM.active = false;
        // 同时禁用左右btn
    },



    start() {

    },

    // update (dt) {},
});
