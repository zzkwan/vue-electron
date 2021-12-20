<!--
 * @Author: 卓智锴
 * @Date: 2021-12-16 16:46:29
 * @LastEditTime: 2021-12-20 11:34:43
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\components\PlaneWar.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
    <div>
        <canvas id='canvas'>
            您的浏览器不支持canvas绘图！
        </canvas>
    </div>
</template>

<script>
export default {
    data() {
        return {
            width: 0,// 画布宽度
            height: 0,// 画布高度
            canvas: {},// 画布
            ctx: {},// 画布2d
            // 游戏状态
            PHASE_DOWNLOAD: 1,
            PHASE_READY: 2,
            PHASE_LOADING: 3,
            PHASE_PLAY: 4,
            PHASE_PAUSE: 5,
            PHASE_GAMEOVER: 6,
            // 游戏当前状态
            curPhase: this.PHASE_DOWNLOAD,
            gameScore: 0,
            // 所有图片
            imgName: ['background.png', 'game_pause_nor.png', 'm1.png', 'start.png', 
                // 敌机1
                ['enemy1.png', 'enemy1_down1.png', 'enemy1_down2.png', 'enemy1_down3.png', 'enemy1_down4.png'],
                // 敌机2
                ['enemy2.png', 'enemy2_down1.png', 'enemy2_down2.png', 'enemy2_down3.png', 'enemy2_down4.png'],
                // 敌机3
                ['enemy3_n1.png', 'enemy3_n2.png', 'enemy3_hit.png', 'enemy3_down1.png', 'enemy3_down2.png', 'enemy3_down3.png', 'enemy3_down4.png', 'enemy3_down5.png', 'enemy3_down6.png', ],
                // 游戏loading图
                ['game_loading1.png', 'game_loading2.png', 'game_loading3.png', 'game_loading4.png'],
                // 玩家飞机图
                ['hero1.png', 'hero2.png', 'hero_blowup_n1.png', 'hero_blowup_n2.png', 'hero_blowup_n3.png', 'hero_blowup_n4.png']
            ],
            // 存储不同类型图片
            bg: null,
            pause: null,
            m: null,
            startImg: null,
            enemy1: [],
            enemy2: [],
            enemy3: [],
            gameLoad: [],
            heroImg: [],
            // 加载图片进度
            progress: 1,
            // 函数中的全局属性
            img: {},
            text: '',
            tw: 0,
            x: 0,// hero坐标
            y: 0,
            index: 0,// 
            count: 0,// 控制hero图片切换的频率
            hCount: 0,// 控制子弹发射的频率
            eCount: 0,// 控制敌机发射的频率
            n: 0,
            life: 0,
            d: 0,
            px: 0,
            py: 0,
            pBg: {},
            load: {},
            // 战机
            hero: {},
            offsetX: 0,
            offsetY: 0,
            w: 0,
            h: 0,
            nx: 0,
            ny: 0,
            // 敌机
            hullet: [],
            mx: 0,
            my: 0,
            removable: true,

            liveEnemy: [],// 用于存储画布上的所有敌机
            enemy: {},// 保存敌机图片的数组
            speed: 0,// 敌机速度
            lifes: 2,// 敌机生命
            die: false,// 敌机是否死亡

        }
    },
    methods: {
        init() {
            this.width = window.innerWidth > 480 ? 480 : window.innerWidth
            this.height = window.innerHeight > 650 ? 650 : window.innerHeight - 20
            this.canvas = document.getElementById('canvas')
            this.canvas.width = this.width
            this.canvas.height = this.height
            this.ctx = this.canvas.getContext('2d')
            this.curPhase = this.PHASE_DOWNLOAD
            this.download()
            this.pBg = this.paintBg()
            this.load = this.loading()
            setInterval(this.gameEngine, 50);
        },
        download() {
            this.bg = this.nImg(this.imgName[0]);
            this.pause = this.nImg(this.imgName[1]);
            this.m = this.nImg(this.imgName[2]);
            this.startImg = this.nImg(this.imgName[3]);
            for (let i = 0; i < this.imgName[4].length; i++) {
                this.enemy1[i] = this.nImg(this.imgName[4][i]);
            }
            for (let i = 0; i < this.imgName[5].length; i++) {
                this.enemy2[i] = this.nImg(this.imgName[5][i]);
            }
            for (let i = 0; i < this.imgName[6].length; i++) {
                this.enemy3[i] = this.nImg(this.imgName[6][i]);
            }
            for (let i = 0; i < this.imgName[7].length; i++) {
                this.gameLoad[i] = this.nImg(this.imgName[7][i]);
            }
            for (let i = 0; i < this.imgName[8].length; i++) {
                this.heroImg[i] = this.nImg(this.imgName[8][i]);
            }
        },
        nImg(src) {
            this.img = new Image();
            this.img.src = 'img/' + src;
            this.img.onload = this.imgLoad;
            return this.img;
        },
        // 绘制游戏加载进度画面
        imgLoad() {
            this.progress += 3;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var text = this.progress + '%';
            var tw = this.ctx.measureText(text).width;
            this.ctx.font = '60px arial';
            this.ctx.fillStyle = 'red';
            this.ctx.lineWidth = '0';
            this.ctx.strokeStyle = '#888';
            //ctx.strokeText(text,(width-tw)/2,height/2);
            this.ctx.fillText(text, (this.width - tw) / 2, this.height / 2);
            if (this.progress >= 100) {
                this.start();
            }
        },
        // 开始游戏
        start() {
            this.curPhase = this.PHASE_READY;
            this.canvas.onclick = () => {
                this.curPhase == this.PHASE_READY && (this.curPhase = this.PHASE_LOADING);
            }
            this.ctx.fillStyle = '#963';
            this.ctx.font = '24px arial';
            this.gameEngine();
        },
        // 画背景
        paintBg() {
            this.y = 0;
            function paintBg() {
                this.ctx.drawImage(this.bg, 0, this.y);
                this.ctx.drawImage(this.bg, 0, this.y - 852);
                this.y++ == 852 && (this.y = 0);
            }
            return paintBg;
        },
        // 画game开始图
        paintLogo() {
            this.ctx.drawImage(this.startImg, 40, 0);
        },
        // loading
        loading() {
            this.index = 0;

            function loading() {
                this.index % 1 == 0 && this.ctx.drawImage(this.gameLoad[this.index], 0, this.canvas.height - this.gameLoad[0].height);
                this.index += 0.5;
                if (this.index > 3) {
                    this.curPhase = this.PHASE_PLAY;
                    this.index =0;
                }
            }
            return loading;
        },
        // 游戏暂停
        drawPause() {
            this.ctx.drawImage(this.pause, (this.width - this.pause.width) / 2, (this.height - this.pause.height) / 2);
        },
        // 游戏结束
        gameover(){
            alert("游戏结束，成绩"+this.gameScore); 
            this.gameScore=0;  
            this.curPhase =this.PHASE_READY;  
            this.hero = null;
            this.hero = new this.Hero();  	    
        },
        // 游戏引擎
        gameEngine() {
            switch (this.curPhase) {
                case this.PHASE_READY:
                    this.pBg();
                    this.paintLogo();
                    break;
                case this.PHASE_LOADING:
                    this.pBg();
                    this.load();
                    break;
                case this.PHASE_PLAY:
                    this.pBg();
                    break;
                case this.PHASE_PAUSE:
                    this.drawPause();
                    break;
                case this.PHASE_GAMEOVER:
                    this.gameover();
                    break;    
            }
            //requestAnimationFrame(gameEngine);
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style type="text/css">
body {
    height: 0;
    margin: 0;
    text-align: center;
    overflow: hidden;
}

canvas {
    background-color: #ddd;
}
</style>