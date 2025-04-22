let clickHistory = [];
        const maxSpeed = 0.3;  // 最快动画时长(秒)
        const stick = document.getElementById('stick');
        
        // 速度计算函数（基于网页8的时间戳方案）
        function calculateSpeed() {
            const now = Date.now();
            if(clickHistory.length >= 3) {
                const avgInterval = clickHistory
                    .slice(-3)
                    .reduce((a,b) => a + (now - b), 0) / 3;
                return Math.max(maxSpeed, avgInterval / 1000);
            }
            return 1; // 默认速度
        }

        // 物理模拟动画（参考网页5的弹性系统）
        function animateStick() {
            const speed = calculateSpeed();
            
            stick.animate([
                { transform: 'rotate(0deg) translateY(0px)' },
                { 
                    transform: 'rotate(-5deg) translateY(30px)',
                    offset: 0.4,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)' 
                },
                { 
                    transform: 'rotate(0deg) translateY(0px)',
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            ], {
                duration: 300,
                iterations: 1
            });
        }

        // 事件监听（网页8的交互方案）
        document.getElementById('hitBtn').addEventListener('click', () => {
            clickHistory.push(Date.now());
            animateStick();
            
            // 添加打击粒子（网页1的视觉效果）
            // createSpark();
        });

        // 粒子特效（参考网页1的实现）
        function createSpark() {
            const spark = document.createElement('div');
            spark.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #f1c40f;
                border-radius: 50%;
                animation: spark 0.6s linear;
            `;
            
            // 随机位置生成
            const x = stick.getBoundingClientRect().left + 100;
            const y = stick.getBoundingClientRect().bottom + 100;
            spark.style.left = `${x + Math.random()*40 -20}px`;
            spark.style.top = `${y}px`;

            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 600);
        }

        // 粒子动画
        document.styleSheets[0].insertRule(`
            @keyframes spark {
                0% { transform: translate(0,0); opacity:1; }
                100% { transform: translate(${Math.random()*100-50}px, -100px); opacity:0; }
            }
        `);