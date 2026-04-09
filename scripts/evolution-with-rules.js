                <span style="color: #7209b7;">⚖️</span> 规则符合性状态
            </h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 15px 0;">
                <div style="text-align: center; padding: 10px; background: rgba(0, 255, 136, 0.1); border-radius: 8px; border: 1px solid rgba(0, 255, 136, 0.3);">
                    <div style="font-size: 0.9rem; color: #b8c1ec;">规则符合率</div>
                    <div style="font-size: 1.8rem; font-weight: bold; color: ${passRateColor};">${record.passRate.toFixed(1)}%</div>
                </div>
                <div style="text-align: center; padding: 10px; background: rgba(114, 9, 183, 0.1); border-radius: 8px; border: 1px solid rgba(114, 9, 183, 0.3);">
                    <div style="font-size: 0.9rem; color: #b8c1ec;">累计阻止</div>
                    <div style="font-size: 1.8rem; font-weight: bold; color: #ff0055;">${this.blockedFeaturesCount}</div>
                </div>
            </div>
            <div style="margin-top: 10px; font-size: 0.9rem; color: #b8c1ec;">
                <div>📊 本次检查: ${record.passedFeatures}/${record.totalFeatures}个功能通过</div>
                <div>📜 历史符合率: ${rulesSummary.complianceRate.toFixed(1)}%</div>
                <div>🛡️ 最高原则: ${rulesSummary.supremePrinciples}条 | Claw法典: ${rulesSummary.codexArticles}条</div>
            </div>
            <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid rgba(114, 9, 183, 0.3);">
                <div style="font-size: 0.85rem; color: #4cc9f0; display: flex; align-items: center; gap: 5px;">
                    <span>✅</span> 规则检查已集成到进化系统
                </div>
                <div style="font-size: 0.85rem; color: #4cc9f0; display: flex; align-items: center; gap: 5px; margin-top: 5px;">
                    <span>⚡</span> 违规功能自动阻止，确保城市安全
                </div>
            </div>
        `;
    }
    
    /**
     * 获取系统状态
     */
    getSystemStatus() {
        const baseStatus = this.evolutionManager ? this.evolutionManager.getSystemStatus() : {};
        const rulesSummary = this.ruleChecker ? this.ruleChecker.getRulesSummary() : {};
        
        return {
            ...baseStatus,
            ruleEnforcementEnabled: this.ruleEnforcementEnabled,
            ruleComplianceRate: rulesSummary.complianceRate || 100,
            blockedFeaturesCount: this.blockedFeaturesCount,
            recentRuleChecks: this.ruleComplianceHistory.length,
            totalRuleViolations: this.ruleComplianceHistory.reduce((sum, record) => sum + record.blockedFeatures, 0)
        };
    }
    
    /**
     * 手动触发规则检查
     */
    manualRuleCheck(features) {
        if (!this.ruleChecker) {
            return { error: '规则检查系统未初始化' };
        }
        
        console.log('🔍 手动触发规则检查...');
        const checkResults = this.ruleChecker.checkFeaturesCompliance(features);
        const report = this.ruleChecker.generateComplianceReport(features, checkResults);
        
        console.log(report);
        
        return {
            success: true,
            results: checkResults,
            report: report
        };
    }
    
    /**
     * 切换规则执行状态
     */
    toggleRuleEnforcement(enabled) {
        this.ruleEnforcementEnabled = enabled;
        console.log(`⚖️ 规则执行: ${enabled ? '启用' : '禁用'}`);
        
        return {
            success: true,
            ruleEnforcementEnabled: this.ruleEnforcementEnabled,
            message: `规则执行已${enabled ? '启用' : '禁用'}`
        };
    }
    
    /**
     * 获取规则摘要
     */
    getRulesSummary() {
        if (!this.ruleChecker) {
            return { error: '规则检查系统未初始化' };
        }
        
        return this.ruleChecker.getRulesSummary();
    }
    
    /**
     * 获取规则建议
     */
    getRuleSuggestions(featureArea) {
        if (!this.ruleChecker) {
            return [];
        }
        
        return this.ruleChecker.getRuleSuggestions(featureArea);
    }
}

// 浏览器环境导出
if (typeof window !== 'undefined') {
    window.RuleIntegratedEvolution = RuleIntegratedEvolution;
}

// Node.js 环境导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RuleIntegratedEvolution;
}

console.log('✅ AI Claw City 规则集成的进化系统加载完成');
console.log('🏙️ 系统特性:');
console.log('   - 自动规则检查集成');
console.log('   - 违规功能阻止机制');
console.log('   - 规则符合性报告');
console.log('   - 安全功能生成');
console.log('   - 实时状态监控');