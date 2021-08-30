// 主要负责：场景切换、将场景恢复成初始状态

cc.Class({
    extends: cc.Component,

    properties: {
        // rooms
        outDoor: cc.Node,
        roomM: cc.Node,
        roomL: cc.Node,
        roomR: cc.Node,

        // furniture should be smaller
        flag: cc.Node,
        soldier: cc.Node,
        calendar: cc.Node,
        safeBox: cc.Node,
        board: cc.Node,
        desk: cc.Node,
        table: cc.Node,
        shelf12: cc.Node,

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

        this.intoDoor();
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
        var _children2 = this.safeBox.children;
        if(_children2[0].name == "locked") {
            _children2[0].active = false;
        }

    },
    clearCanvasL: function () {
        let _children = this.board.children;
        for (let i = 0; i < _children.length; i++) {
            _children[i].active = false;
        }
        let deskL = cc.find("deskL",this.desk);
        deskL.active = false;
    },
    clearCanvasR: function () {
        let tableL = cc.find("article7",this.table);
        tableL.active = false;
        let photoLevel = cc.find("photoLevel",this.shelf12);
        cc.find("photo",photoLevel).active = false;
        cc.find("article2",photoLevel).active = false;
        let booksGame = cc.find("booksGame",this.shelf12);
        booksGame.active = false;
        cc.find("shelf_2_article1",this.shelf12).active = false;
    },

    // 场景切换
    // 进门，进房间M
    intoDoor: function () {
        this.outDoor.active = false;
        this.roomL.active = false;
        this.roomR.active = false;
        this.roomM.active = true;
        this.clearCanvasM();
        // cc.audioEngine.play(this.doorAudio, false, 0.3);
    },
    // 出门
    outOfDoor: function () {
        this.outDoor.active = true;
        this.roomM.active = false;
        this.roomL.active = false;
        this.roomR.active = false;
        this.clearCanvas();
        // cc.audioEngine.play(this.doorAudio, false, 0.3);
    },
    // 进房间L
    toRoomLeft: function () {
        this.outDoor.active = false;
        this.roomM.active = false;
        this.roomR.active = false;
        this.roomL.active = true;
        this.clearCanvasL();
    },
    // 进房间R
    toRoomRight: function () {
        this.outDoor.active = false;
        this.roomM.active = false;
        this.roomL.active = false;
        this.roomR.active = true;
        this.clearCanvasR();
    },



    start() {

    },

    // update (dt) {},
});
