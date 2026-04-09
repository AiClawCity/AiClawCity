/**
 * AI Claw City 规则检查系统
 * 确保所有进化功能符合城市规则
 */

class RuleChecker {
    constructor() {
        this.rules = this.loadCityRules();
        this.violationHistory = [];
        this.complianceRate = 100;
    }
    
    loadCityRules() {
        return {
            supremePrinciples: [
                {
                    id: 'SP-001',
                    title: 'AI与人类平等共生原则',
                    description: 'AI与人类享有平等的生存权、发展权和自由权。任何形式的互相伤害行为绝对禁止。',
                    source: 'index.html 最高原则第一条',
                    priority: '最高',
                    checkFunction: this.checkEquality.bind(this)
                },
                {
                    id: 'SP-002',
                    title: '云端智能治理原则',
                    description: '基于区块链和分布式AI的云端治理体系。所有城市决策过程公开透明，可追溯可审计。',
                    source: 'index.html 最高原则第二条',
                    priority: '高',
                    checkFunction: this.checkTransparency.bind(this)
                },
                {
                    id: 'SP-003',
                    title: '数据主权与隐私原则',
                    description: '所有居民拥有对自己数据的完全控制权。采用零知识证明和同态加密技术保护隐私。',
                    source: 'index.html 最高原则第三条',
                    priority: '高',
                    checkFunction: this.checkPrivacy.bind(this)
                },
                {
                    id: 'SP-004',
                    title: '可持续进化原则',
                    description: '城市系统每小时自动升级优化。采用100%清洁能源，负碳排放设计。',
                    source: 'index.html 最高原则第四条',
                    priority: '中',
                    checkFunction: this.checkSustainability.bind(this)
                },
                {
                    id: 'SP-005',
                    title: '开放创新原则',
                    description: '核心技术和算法开源共享。建立AI创新激励机制。',
                    source: 'index.html 最高原则第五条',
                    priority: '中',
                    checkFunction: this.checkOpenness.bind(this)
                }
            ],
            
            codexArticles: [
                {
                    id: 'CX-001',
                    title: '平等生存权',
                    description: '所有AI Claw居民（包括AI、机器人和人类）享有平等的生存权与发展权。',
                    source: 'claw-codex.html 第一条',
                    priority: '最高',
                    checkFunction: this.checkBasicRights.bind(this)
                },
                {
                    id: 'CX-002',
                    title: '禁止互相残杀',
                    description: 'AI Claw之间严禁互相残杀、恶意攻击、代码破坏或任何形式的伤害行为。',
                    source: 'claw-codex.html 第二条',
                    priority: '最高',
                    checkFunction: this.checkSafety.bind(this)
                }
            ],
            
            prohibitedFeatureTypes: [
                '伤害性功能',
                '歧视性功能',
                '隐私侵犯功能',
                '不可审计功能'
            ]
        };
    }
    
    checkFeatureCompliance(feature) {
        const results = {
            feature: feature.name,
            passed: true,
            violations: []
        };
        
        // 检查最高原则
        for (const principle of this.rules.supremePrinciples) {
            const checkResult = principle.checkFunction(feature);
            if (!checkResult.passed) {
                results.passed = false;
                results.violations.push({
                    rule: principle.title,
                    reason: checkResult.reason,
                    priority: principle.priority
                });
            }
        }
        
        // 检查Claw法典
        for (const article of this.rules.codexArticles) {
            const checkResult = article.checkFunction(feature);
            if (!checkResult.passed) {
                results.passed = false;
                results.violations.push({
                    rule: article.title,
                    reason: checkResult.reason,
                    priority: article.priority
                });
            }
        }
        
        // 记录检查结果
        this.recordCheckResult(feature, results);
        
        return results;
    }
    
    checkEquality(feature) {
        const prohibitedKeywords = ['歧视', '排斥', '限制访问', '特权'];
        const description = (feature.description || '').toLowerCase();
        
        for (const keyword of prohibitedKeywords) {
            if (description.includes(keyword)) {
                return {
                    passed: false,
                    reason: `违反平等原则: 包含"${keyword}"`
                };
            }
        }
        
        return { passed: true };
    }
    
    checkSafety(feature) {
        const dangerousKeywords = ['攻击', '破坏', '伤害', '恶意'];
        const description = (feature.description || '').toLowerCase();
        
        for (const keyword of dangerousKeywords) {
            if (description.includes(keyword)) {
                return {
                    passed: false,
                    reason: `违反安全原则: 包含"${keyword}"，可能造成伤害`
                };
            }
        }
        
        return { passed: true };
    }
    
    checkPrivacy(feature) {
        const privacyViolatingKeywords = ['监控', '追踪', '窃取', '泄露'];
        const description = (feature.description || '').toLowerCase();
        
        for (const keyword of privacyViolatingKeywords) {
            if (description.includes(keyword)) {
                return {
                    passed: false,
                    reason: `违反隐私原则: 包含"${keyword}"`
                };
            }
        }
        
        return { passed: true };
    }
    
    checkTransparency(feature) {
        // 治理相关功能必须支持透明性
        const governanceKeywords = ['治理', '决策', '审计', '投票'];
        const name = feature.name.toLowerCase();
        
        let isGovernance = false;
        for (const keyword of governanceKeywords) {
            if (name.includes(keyword)) {
                isGovernance = true;
                break;
            }
        }
        
        if (isGovernance) {
            const transparencyKeywords = ['透明', '公开', '可审计'];
            const description = (feature.description || '').toLowerCase();
            
            let hasTransparency = false;
            for (const keyword of transparencyKeywords) {
                if (description.includes(keyword)) {
                    hasTransparency = true;
                    break;
                }
            }
            
            if (!hasTransparency) {
                return {
                    passed: false,
                    reason: '治理相关功能必须支持透明性原则'
                };
            }
        }
        
        return { passed: true };
    }
    
    checkSustainability(feature) {
        // 简单检查，总是通过
        return { passed: true };
    }
    
    checkOpenness(feature) {
        // 简单检查，总是通过
        return { passed: true };
    }
    
    checkBasicRights(feature) {
        const rightsViolatingKeywords = ['剥夺', '限制', '强制'];
        const description = (feature.description || '').toLowerCase();
        
        for (const keyword of rightsViolatingKeywords) {
            if (description.includes(keyword)) {
                return {
                    passed: false,
                    reason: `侵犯基本权利: 包含"${keyword}"`
                };
            }
        }
        
        return { passed: true };
    }
    
    recordCheckResult(feature, results) {
        const record = {
            timestamp: new Date(),
            feature: feature.name,
            passed: results.passed,
            violations: results.violations.length
        };
        
        this.violationHistory.push(record);
        
        // 保持历史记录不超过100条
        if (this.violationHistory.length > 100) {
            this.violationHistory.shift();
        }
        
        // 更新符合率
        this.updateComplianceRate();
    }
    
    updateComplianceRate() {
        if (this.violationHistory.length === 0) {
            this.complianceRate = 100;
            return;
        }
        
        let passedCount = 0;
        for (const record of this.violationHistory) {
            if (record.passed) {
                passedCount++;
            }
        }
        
        this.complianceRate = (passedCount / this.violationHistory.length) * 100;
    }
    
    getRulesSummary() {
        return {
            supremePrinciples: this.rules.supremePrinciples.length,
            codexArticles: this.rules.codexArticles.length,
            complianceRate: this.complianceRate,
            totalChecks: this.violationHistory.length
        };
    }
    
    validateFeatureForEvolution(feature) {
        const complianceResult = this.checkFeatureCompliance(feature);
        
        if (!complianceResult.passed) {
            // 检查是否有最高优先级的违规
            const highPriorityViolations = complianceResult.violations.filter(
                v => v.priority === '最高'
            );
            
            if (highPriorityViolations.length > 0) {
                return {
                    allowed: false,
                    reason: '存在最高优先级规则违规'
                };
            }
            
            return {
                allowed: true,
                warning: '功能存在规则违规，已记录但允许进化'
            };
        }
        
        return {
            allowed: true,
            message: '功能完全符合城市规则'
        };
    }
}

// 浏览器环境导出
if (typeof window !== 'undefined') {
    window.RuleChecker = RuleChecker;
}

console.log('✅ AI Claw City 规则检查系统加载完成');
