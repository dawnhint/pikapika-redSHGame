
cc.Class({
    extends: cc.Component,

    properties: {
        // rooms
        outDoor: cc.Node,
        roomM: cc.Node,

        // furniture should be smaller
        flag: cc.Node,
        soldier: cc.Node,
        calendar: cc.Node,
        safeBox: cc.Node,

        // tools
        tools: cc.Node,

        doorAudio: {
            default: null,
            type: cc.AudioClip,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.outDoor.active = false;
        this.roomM.active = true;
    },


    // 把场景恢复成家具小图
    // outDoor
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
    // roomMiddle
    clearCanvasM: function () {
        var _children = this.calendar.children;
        for (i = 0; i < _children.length; i++) {
            _children[i].active = false;
        }
        var _children = this.safeBox.children;
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
        // 这个声音太长了，换掉
        // cc.audioEngine.play(this.doorAudio, false, 0.8);
    },
    // 点击出门
    outOfDoor: function () {
        this.outDoor.active = true;
        this.roomM.active = false;
        this.clearCanvasM();
        // cc.audioEngine.play(this.doorAudio, false, 0.8);
        // 同时禁用左右btn
    },



    start() {

    },

    // update (dt) {},
});
