let isRaining = false;
        let leaves = [];
        const leafImages = [
            './assets/maple1.png',  // 替换为你的枫叶图片路径
            './assets/maple2.png', 
            './assets/maple3.png', 
            './assets/maple4.png', 
        ];

        function createLeaf() {
            const leaf = document.createElement('img');
            leaf.className = 'leaf';
            leaf.src = leafImages[Math.floor(Math.random() * leafImages.length)];
            
            // 随机初始位置
            leaf.style.left = Math.random() * 100 + '%';
            
            // 随机动画参数
            const duration = 8 + Math.random() * 4;  // 8-12秒
            const delay = Math.random() * 3;         // 0-3秒延迟
            const rotate = Math.random() * 360;     // 初始旋转角度
            
            leaf.style.animation = `
                fall ${duration}s 0s linear forwards,
                fadeIn 0.5s forwards
            `;

            document.body.appendChild(leaf);
            // leaves.push(leaf);
			setTimeout(() => leaf.remove(), 12000);
        }

        function toggleLeaves() {
            isRaining = !isRaining;
            if (isRaining) {
                // 创建15片枫叶
                for (let i = 0; i < 10; i++) {
                    createLeaf();
                }
                // 持续生成枫叶
                leafInterval = setInterval(() => {
                    createLeaf();
                }, 500);
            } else {
                // 移除所有枫叶并清除定时器
                clearInterval(leafInterval);
                // leaves.forEach(leaf => {
                //     leaf.style.animation = 'none';
                //     leaf.style.opacity = '0';
                //     setTimeout(() => leaf.remove(), 1000);
                // });
                // leaves = [];
            }
        }