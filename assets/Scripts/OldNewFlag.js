// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 工具
        gongJuRen: {
            default: null,
            type: cc.Node,
        },
        tools: {
            default: null,
            type: cc.Node,
        },
        // 掉落过程图
        oldFlag: {
            default: null,
            type: cc.Node,
        },
        old: {
            default: [],
            type: cc.Node,
        },
        newFlag: {
            default: null,
            type: cc.Node,
        },
        // 新旗帜元素
        new: {
            default:[],
            type:cc.Node,
        }

    },



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.btnCount = 0;
    },

    btnOld: function () {
        this.gongJuRen.getComponent("GameManager").clearCanvasM();
        if (this.btnCount <= 3) {
            this.old[this.btnCount].active = false;
            this.old[this.btnCount+1].active = true;
            this.btnCount++;
            return;
        } else if (this.btnCount = 4) {
            this.newFlag.active = true;
            this.oldFlag.active = false;
        }
    },

    mainGame: function () {
        if(!this.new[0].active) {
            this.addFlag();
        } else {
            let tools = this.tools.getComponent("Tools");
            if(tools.hldStar1) {
                this.new[1].active = true;
            } else if (tools.hldStar2) {
                this.new[2].active = true;
            }
        }
    },
    
    addFlag: function () {
        let tools = this.tools.getComponent("Tools");
        if (tools.hldRed) {
           this.new[0].active = true;
           tools.redFlag.destroy();
        }
    },

    start() {

    },

    // update (dt) {},
});
