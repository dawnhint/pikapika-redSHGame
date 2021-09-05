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
            
            ype: cc.Node,
        },
        // 新旗帜元素
        new: {
            default:[],
            type:cc.Node,
        },
        audioDing: cc.AudioClip,
        audioTear: {
            default: null,
            type:cc.AudioClip,
        },

        hint: cc.Node,

        collection: cc.Node,
        info: cc.Label,
    },



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.btnCount = 0;
        this.starCount = 0;
        this.lockOldFlag = true;
        this.lockNewFlag = true;
    },

    btnOld: function () {
        this.gongJuRen.getComponent("GameManager").clearCanvasM();
        if(this.lockOldFlag) {
            let cltn = this.collection.getComponent("collection");
            cltn.unlockFlag(1);
            this.info.string="解锁旗帜：民国国旗";
            var anim = this.info.getComponent(cc.Animation);
            anim.play('info');
            this.lockOldFlag = false;
        }
        if (this.btnCount <= 3) {
            if(this.btnCount==0){
                let tools = this.tools.getComponent("Tools");
                tools.nails.active = true;
                cc.audioEngine.play(this.audioDing, false, 0.7);  
            } else {
                cc.audioEngine.play(this.audioTear, false, 1);  
            }
            this.old[this.btnCount].active = false;
            this.old[this.btnCount+1].active = true;
            this.btnCount++;
            return;
        } else if (this.btnCount = 4) {
            this.newFlag.active = true;
            this.oldFlag.active = false;
            cc.audioEngine.play(this.audioTear, false, 1);
        }
    },

    mainGame: function () {
        if(!this.new[0].active) {
            this.addFlag();
        } else {
            let tools = this.tools.getComponent("Tools");
            if(tools.hldStar1 && tools.star1.isValid) {
                cc.audioEngine.play(this.audioDing, false, 0.7);  
                this.new[1].active = true;
                tools.star1.destroy();
            } else if (tools.hldStar2 && tools.star2.isValid) {
                cc.audioEngine.play(this.audioDing, false, 0.7);  
                this.new[2].active = true;
                tools.star2.destroy();
            } else if (tools.hldStar3 && tools.star3.isValid) {
                cc.audioEngine.play(this.audioDing, false, 0.7);  
                this.new[3].active = true;
                tools.star3.destroy();
            } else if (tools.hldStar4 && tools.star4.isValid) {
                cc.audioEngine.play(this.audioDing, false, 0.7);  
                this.new[4].active = true;
                tools.star4.destroy();
            } else if (tools.hldStar5 && tools.star5.isValid) {
                cc.audioEngine.play(this.audioDing, false, 0.7);  
                this.new[5].active = true;
                tools.star5.destroy();
            }
        }
        // checkFinished
        this.starsCheck = true;
        for ( let i = 0; i<5; i++) {
            if(!this.new[i+1].active){
                this.starsCheck = false;
            }
        }
        if(this.starsCheck && this.lockNewFlag) {
            let cltn = this.collection.getComponent("collection");
            cltn.unlockFlag(2);
            console.log('1');
            this.info.string="解锁旗帜：五星红旗";
            var anim = this.info.getComponent(cc.Animation);
            anim.play('info');
            this.lockNewFlag = false;
            // this.hint.active = true;
        }
    },
    
    addFlag: function () {
        let tools = this.tools.getComponent("Tools");
        if (tools.hldRed) {
           this.new[0].active = true;
           tools.nails.destroy();
           tools.redFlag.destroy();
           cc.audioEngine.play(this.audioDing, false, 0.7);  
        }
    },

    start() {

    },

    // update (dt) {},
});
