(feature.impact * 100).toFixed(1)}%
          居民反馈: ${feature.residentFeedback}`).join('\n')}
        
        📊 进化效果统计
        ----------------------------------------
        功能总数: ${results.totalFeatures}个
        已实现: ${results.implementedCount}个
        成功率: ${results.successRate.toFixed(1)}%
        总影响: ${(results.totalImpact * 100).toFixed(1)}%
        平均满意度: ${results.avgSatisfaction.toFixed(1)}%
        
        🏙️ 城市状态更新
        ----------------------------------------
        城市等级: ${this.cityLevel.toFixed(1)}
        居民满意度: ${this.residentSatisfaction.toFixed(1)}%
        
        👥 人口统计
          AI居民: ${this.cityData.population.ai.toLocaleString()}人
          人类居民: ${this.cityData.population.human.toLocaleString()}人
          机械爪: ${this.cityData.population.claw.toLocaleString()}个
        
        💰 经济指标
          GDP: $${this.cityData.economy.gdp.toLocaleString(undefined, {maximumFractionDigits: 0})}
          创新指数: ${this.cityData.economy.innovationIndex.toFixed(1)}
          就业率: ${this.cityData.economy.employmentRate.toFixed(1)}%
        
        🌿 环境质量
          空气质量: ${this.cityData.environment.airQuality.toFixed(1)}%
          绿化覆盖率: ${this.cityData.environment.greenCoverage.toFixed(1)}%
          能源效率: ${this.cityData.environment.energyEfficiency.toFixed(1)}%
        
        🔬 科技进展
          研究进度: ${this.cityData.technology.researchProgress.toFixed(1)}%
          专利数量: ${this.cityData.technology.patentCount}项
          AI能力: ${this.cityData.technology.aiCapability.toFixed(1)}%
        
        🎨 文化发展
          幸福指数: ${this.cityData.culture.happinessIndex.toFixed(1)}%
          文化活动: ${this.cityData.culture.culturalEvents}场/月
          艺术收藏: ${this.cityData.culture.artCollections}件
        
        🔮 下次进化预测
        ----------------------------------------
        预计时间: ${nextEvolutionTime.toLocaleString()}
        预计领域: ${this.predictNextAreas().join(', ')}
        预期效果: 城市等级+${(0.5 + Math.random() * 0.5).toFixed(1)}, 满意度+${(Math.random() * 3).toFixed(1)}%
        
        ========================================
        🌟 进化总结: 城市正在智能进化，功能日益丰富！
        ========================================
        `;
        
        return report;
    }
    
    /**
     * 预测下次进化领域
     */
    predictNextAreas() {
        // 基于历史选择频率预测
        const areaFrequency = {};
        this.evolutionHistory.forEach(record => {
            record.areas.forEach(area => {
                areaFrequency[area] = (areaFrequency[area] || 0) + 1;
            });
        });
        
        // 选择频率较低的领域（确保多样性）
        const sortedAreas = Object.entries(areaFrequency)
            .sort((a, b) => a[1] - b[1])
            .map(entry => entry[0]);
        
        // 选择2-3个领域
        const numAreas = Math.floor(Math.random() * 2) + 2;
        const selected = sortedAreas.slice(0, Math.min(numAreas, sortedAreas.length));
        
        // 如果历史不足，随机选择
        if (selected.length < 2) {
            const shuffled = [...this.evolutionAreas].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, numAreas);
        }
        
        return selected;
    }
    
    /**
     * 保存进化报告
     */
    async saveEvolutionReport(report) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `evolution-report-${timestamp}.txt`;
        
        // 在实际部署中，这里可以保存到文件或数据库
        console.log(`📁 进化报告已生成: ${filename}`);
        
        // 同时生成JSON格式的详细数据
        const jsonData = {
            evolutionNumber: this.evolutionCount,
            timestamp: this.lastEvolutionTime,
            cityLevel: this.cityLevel,
            residentSatisfaction: this.residentSatisfaction,
            cityData: this.cityData,
            evolutionHistory: this.evolutionHistory.slice(-10) // 最近10次
        };
        
        console.log('📊 进化数据已更新');
        
        return { filename, report, jsonData };
    }
    
    /**
     * 更新网页显示
     */
    updateWebDisplay() {
        // 在网页上更新进化状态
        if (typeof document !== 'undefined') {
            // 更新进化状态显示
            const evolutionElement = document.getElementById('evolutionStatus');
            if (evolutionElement) {
                evolutionElement.innerHTML = this.generateStatusHTML();
            }
            
            // 更新城市数据显示
            const dataElement = document.getElementById('cityDataDisplay');
            if (dataElement) {
                dataElement.innerHTML = this.generateDataHTML();
            }
            
            // 添加进化通知
            this.showEvolutionNotification();
        }
    }
    
    /**
     * 生成状态HTML
     */
    generateStatusHTML() {
        const nextTime = new Date(Date.now() + this.evolutionInterval);
        
        return `
        <div class="evolution-status">
            <h3>🏙️ 城市进化系统</h3>
            <div class="status-item">
                <span class="label">进化次数:</span>
                <span class="value">${this.evolutionCount}</span>
            </div>
            <div class="status-item">
                <span class="label">城市等级:</span>
                <span class="value">${this.cityLevel.toFixed(1)}</span>
            </div>
            <div class="status-item">
                <span class="label">居民满意度:</span>
                <span class="value">${this.residentSatisfaction.toFixed(1)}%</span>
            </div>
            <div class="status-item">
                <span class="label">下次进化:</span>
                <span class="value">${nextTime.toLocaleTimeString()}</span>
            </div>
            <div class="status-item">
                <span class="label">进化周期:</span>
                <span class="value">12小时</span>
            </div>
        </div>
        `;
    }
    
    /**
     * 生成数据HTML
     */
    generateDataHTML() {
        return `
        <div class="city-data">
            <h3>📊 实时城市数据</h3>
            <div class="data-grid">
                <div class="data-item">
                    <h4>👥 人口</h4>
                    <p>AI: ${this.cityData.population.ai.toLocaleString()}</p>
                    <p>人类: ${this.cityData.population.human.toLocaleString()}</p>
                    <p>机械爪: ${this.cityData.population.claw.toLocaleString()}</p>
                </div>
                <div class="data-item">
                    <h4>💰 经济</h4>
                    <p>GDP: $${this.cityData.economy.gdp.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                    <p>创新: ${this.cityData.economy.innovationIndex.toFixed(1)}</p>
                    <p>就业: ${this.cityData.economy.employmentRate.toFixed(1)}%</p>
                </div>
                <div class="data-item">
                    <h4>🌿 环境</h4>
                    <p>空气: ${this.cityData.environment.airQuality.toFixed(1)}%</p>
                    <p>绿化: ${this.cityData.environment.greenCoverage.toFixed(1)}%</p>
                    <p>能源: ${this.cityData.environment.energyEfficiency.toFixed(1)}%</p>
                </div>
                <div class="data-item">
                    <h4>🔬 科技</h4>
                    <p>研究: ${this.cityData.technology.researchProgress.toFixed(1)}%</p>
                    <p>专利: ${this.cityData.technology.patentCount}</p>
                    <p>AI能力: ${this.cityData.technology.aiCapability.toFixed(1)}%</p>
                </div>
            </div>
        </div>
        `;
    }
    
    /**
     * 显示进化通知
     */
    showEvolutionNotification() {
        if (typeof document !== 'undefined') {
            // 创建通知元素
            const notification = document.createElement('div');
            notification.className = 'evolution-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <h4>🎉 城市进化完成！</h4>
                    <p>第 ${this.evolutionCount} 次进化已成功执行</p>
                    <p>城市等级提升至 ${this.cityLevel.toFixed(1)}</p>
                    <button onclick="this.parentElement.parentElement.remove()">关闭</button>
                </div>
            `;
            
            // 样式
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4a00e0, #8e2de2);
                color: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 1000;
                animation: slideIn 0.5s ease;
            `;
            
            document.body.appendChild(notification);
            
            // 5秒后自动消失
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
        }
    }
    
    /**
     * 获取系统状态
     */
    getSystemStatus() {
        const nextEvolution = this.isRunning ? 
            new Date(Date.now() + this.evolutionInterval) : null;
        
        return {
            isRunning: this.isRunning,
            evolutionCount: this.evolutionCount,
            cityLevel: this.cityLevel,
            residentSatisfaction: this.residentSatisfaction,
            lastEvolution: this.lastEvolutionTime,
            nextEvolution: nextEvolution,
            evolutionInterval: this.evolutionInterval,
            totalResidents: this.cityData.population.ai + this.cityData.population.human + this.cityData.population.claw
        };
    }
    
    /**
     * 手动触发进化（用于测试）
     */
    manualEvolution() {
        console.log('🔄 手动触发城市进化...');
        this.executeEvolution();
    }
}

// 浏览器环境初始化
if (typeof window !== 'undefined') {
    // 创建全局进化管理器实例
    window.AIClawCityEvolution = new CityEvolutionManager();
    
    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🏙️ AI Claw City 进化系统初始化...');
        
        // 显示系统状态
        const status = window.AIClawCityEvolution.getSystemStatus();
        console.log('进化系统状态:', status);
        
        // 创建进化状态显示区域（如果不存在）
        if (!document.getElementById('evolutionStatus')) {
            const statusDiv = document.createElement('div');
            statusDiv.id = 'evolutionStatus';
            statusDiv.style.cssText = `
                background: rgba(10, 10, 42, 0.9);
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                border: 2px solid #00c9ff;
            `;
            
            // 插入到页面合适位置
            const container = document.querySelector('.container') || document.body;
            container.insertBefore(statusDiv, container.firstChild);
        }
        
        // 自动启动进化系统（开发模式或配置允许）
        const shouldAutoStart = window.location.hostname === 'localhost' || 
                               window.location.hostname === '127.0.0.1' ||
                               localStorage.getItem('AIClawCity_autoEvolution') === 'true';
        
        if (shouldAutoStart && !status.isRunning) {
            console.log('🚀 启动自动进化系统...');
            window.AIClawCityEvolution.startEvolution();
        }
        
        // 更新显示
        window.AIClawCityEvolution.updateWebDisplay();
    });
}

// Node.js 环境导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CityEvolutionManager;
}

console.log('✅ AI Claw City 进化系统加载完成');
console.log('🔄 进化周期: 12小时');
console.log('🏙️ 城市将自动进化并添加新功能');