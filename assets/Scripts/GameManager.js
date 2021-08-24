
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
        // 切换横屏 （web适用
        let frameSize = cc.view.getFrameSize()
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
        if (frameSize.height > frameSize.width)
        cc.view.setFrameSize(frameSize.height, frameSize.width)
        // this.canvas.designResolution = cc.size(1920, 1080);

        this.outDoor.active = false;
        this.roomM.active = true;
    },


    // 把场景恢复成家具小图
    // outDoor
    clearCanvas: function () {
        // flag和soldier的子节点的active变成false
        var _children = this.flag.children;
        for (let i = 0; i < _children.length; i++) {
            _children[i].active = false;
        }
        var _children = this.soldier.children;
        for (let i = 0; i < _children.length; i++) {
            _children[i].active = false;
        }
    },
    // roomMiddle
    clearCanvasM: function () {
        var _children = this.calendar.children;
        for (let i = 0; i < _children.length; i++) {
            _children[i].active = false;
        }
        var _children = this.safeBox.children;
        for (let i = 0; i < _children.length; i++) {
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
