// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        safeBox: cc.Node,
        picAfter: cc.SpriteFrame,
        safeBoxL: cc.Node,
        star: cc.Node,
        // 工具
        gongJuRen: {
            default: null,
            type: cc.Node,
        },
        tools: {
            default: null,
            type: cc.Node,
        },
        btnCode: {
            default: [],
            type: cc.Node,
        },
        audioEnter: {
            default: null,
            type: cc.AudioClip,
        },
        audioWrong: {
            default: null,
            type: cc.AudioClip,
        },
        audioOpen: {
            default: null,
            type: cc.AudioClip,
        },
        audioDing: {
            default: null,
            type: cc.AudioClip,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.safeBoxL.active = false;
        this.star.active = false;
        this.codeJunk();
    },

    btn: function () {
        if(this.safeBoxL.isValid) {
            this.gongJuRen.getComponent("GameManager").clearCanvasM();
            this.safeBoxL.active = true;
            // 清零
            this.enteringNum = [];
            this.codeCnt = 0;
        }
    },

    btnStar: function () {
        cc.audioEngine.play(this.audioDing, false, 0.5);  
        let tools = this.tools.getComponent("Tools");
        this.star.active = false;
        tools.star2.active = true;
    },

    codeJunk:function () {
        for ( let n=0; n<9;n++) {
            // ((i)=>{
            //     this.btnCode[i].on('touchend', function ( event ) {
            //         cc.audioEngine.play(this.audioEnter,false,0.2);
            //         this.enteringNum.push(i+1);
            //         this.codeCnt++;
            //         // 输完密码
            //         if(this.codeCnt>=4) {
            //             // 判断密码
            //             if (this.enteringNum.join() == "1,9,2,1") {
            //                 this.open();
            //             } else {
            //                 this.scheduleOnce(function(){ 
            //                     cc.audioEngine.play(this.audioWrong,false,0.3);
            //                  },0.4);
            //             }
            //             this.enteringNum = [];
            //             this.codeCnt = 0;
            //         }
            //     }.bind(this));                  
            // })(i)
            // cpy教的写法 ↑ （看不懂55）
            // 我原来的写法 ↓
            this.btnCode[n].on('touchend', function ( event ) {
                    cc.audioEngine.play(this.audioEnter,false,0.2);
                    this.codeCnt++;
                let a = event.target.name;   // 非常之暴力
                this.enteringNum.push(a);
                // 输完密码
                if(this.codeCnt>=4) {
                    // 判断密码
                    if (this.enteringNum.join() == "1,9,2,1") {
                        this.open();
                    } else {
                        this.scheduleOnce(function(){ 
                            let animWrong = this.safeBoxL.getComponent(cc.Animation);
                            animWrong.play('openSafeBoxWrong');
                            cc.audioEngine.play(this.audioWrong,false,0.3);
                        },0.3);
                    }
                    this.enteringNum = [];
                    this.codeCnt = 0;
                }
            }.bind(this));                  
        }
    },

    // 打开箱子
    open () {
        var anim = this.safeBoxL.getComponent(cc.Animation);
        anim.play('openSafeBox');
        cc.audioEngine.play(this.audioOpen,false,4);
        // 动画播放停止时执行
        anim.on('finished', this.onFinished, this);
        this.canGet = true;
    },
    onFinished () {
        // 销毁节点
        this.safeBoxL.destroy();
        // 替换图片
        var pic = this.safeBox.getComponent(cc.Sprite)
        pic.spriteFrame = this.picAfter;
        this.star.active = true;
    },

    

    start () {

    },

    // update (dt) {},
});
