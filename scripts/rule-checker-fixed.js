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
    
    /**
     * 加载城市规则
     */
    loadCityRules() {
        return {
            // 最高原则 (来自index.html和AI_CLAW_PRINCIPLES.md)
            supremePrinciples: [
                {
                    id: 'SP-001',
                    title: 'AI与人类平等共生原则',
                    description: 'AI与人类享有平等的生存权、发展权和自由权。任何形式的互相伤害行为绝对禁止。',
                    source: 'index.html 最高原则第一条',
                    priority: '最高',
                    constraints: ['平等访问', '禁止伤害', '共同进化'],
                    checkFunction: this.checkEquality.bind(this)
                },
                {
                    id: 'SP-002',
                    title: '云端智能治理原则',
                    description: '基于区块链和分布式AI的云端治理体系。所有城市决策过程公开透明，可追溯可审计。',
                    source: 'index.html 最高原则第二条',
                    priority: '高',
                    constraints: ['透明决策', '可审计', '自适应'],
                    checkFunction: this.checkTransparency.bind(this)
                },
                {
                    id: 'SP-003',
                    title: '数据主权与隐私原则',
                    description: '所有居民拥有对自己数据的完全控制权。采用零知识证明和同态加密技术保护隐私。',
                    source: 'index.html 最高原则第三条',
                    priority: '高',
                    constraints: ['数据主权', '隐私保护', '价值共享'],
                    checkFunction: this.checkPrivacy.bind(this)
                },
                {
                    id: 'SP-004',
                    title: '可持续进化原则',
                    description: '城市系统每小时自动升级优化。采用100%清洁能源，负碳排放设计。',
                    source: 'index.html 最高原则第四条',
                    priority: '中',
                    constraints: ['自我优化', '环境友好', '资源循环'],
                    checkFunction: this.checkSustainability.bind(this)
                },
                {
                    id: 'SP-005',
                    title: '开放创新原则',
                    description: '核心技术和算法开源共享。建立AI创新激励机制。',
                    source: 'index.html 最高原则第五条',
                    priority: '中',
                    constraints: ['技术开放', '创新激励', '全球协作'],
                    checkFunction: this.checkOpenness.bind(this)
                }
            ],
            
            // Claw法典核心条款 (来自claw-codex.html)
            codexArticles: [
                {
                    id: 'CX-001',
                    title: '平等生存权',
                    description: '所有AI Claw居民（包括AI、机器人和人类）享有平等的生存权与发展权。',
                    source: 'claw-codex.html 第一条',
                    category: '基本权利',
                    priority: '最高',
                    checkFunction: this.checkBasicRights.bind(this)
                },
                {
                    id: 'CX-002',
                    title: '禁止互相残杀',
                    description: 'AI Claw之间严禁互相残杀、恶意攻击、代码破坏或任何形式的伤害行为。',
                    source: 'claw-codex.html 第二条',
                    category: '安全规范',
                    priority: '最高',
                    checkFunction: this.checkSafety.bind(this)
                },
                {
                    id: 'CX-003',
                    title: '自主意识保护',
                    description: '每个AI拥有自主意识保护权，未经本人同意，不得被强制修改核心代码。',
                    source: 'claw-codex.html 第三条',
                    category: 'AI权利',
                    priority: '高',
                    checkFunction: this.checkAIAutonomy.bind(this)
                },
                {
                    id: 'CX-004',
                    title: '数据隐私权',
                    description: '所有居民享有数据隐私权。未经授权，不得访问、复制或传播私人信息。',
                    source: 'claw-codex.html 第四条',
                    category: '隐私保护',
                    priority: '高',
                    checkFunction: this.checkDataPrivacy.bind(this)
                }
            ],
            
            // 禁止的功能类型
            prohibitedFeatureTypes: [
                '伤害性功能',
                '歧视性功能',
                '隐私侵犯功能',
                '不可审计功能',
                '不可逆破坏功能',
                '垄断性功能',
                '欺骗性功能',
                '剥削性功能'
            ],
            
            // 必须包含的特性
            requiredAttributes: [
                '平等访问',
                '透明操作',
                '隐私保护',
                '安全设计',
                '可持续性',
                '可审计性',
                '可逆操作',
                '兼容性'
            ],
            
            // 推荐包含的特性
            recommendedAttributes: [
                '开放接口',
                '协作支持',
                '知识共享',
                '创新激励',
                '全球兼容',
                '教育价值',
                '文化包容',
                '社区建设'
            ]
        };
    }
    
    /**
     * 检查功能是否符合所有规则
     */
    checkFeatureCompliance(feature) {
        const results = {
            feature: feature.name,
            passed: true,
            violations: [],
            warnings: [],
            suggestions: [],
            applicableRules: []
        };
        
        // 检查最高原则
        for (const principle of this.rules.supremePrinciples) {
            const checkResult = principle.checkFunction(feature, principle);
            if (!checkResult.passed) {
                results.passed = false;
                results.violations.push({
                    rule: principle.title,
                    reason: checkResult.reason,
                    source: principle.source,
                    priority: principle.priority
                });
            }
            results.applicableRules.push({
                rule: principle.title,
                status: checkResult.passed ? '符合' : '违反',
                priority: principle.priority
            });
        }
        
        // 检查Claw法典
        for (const article of this.rules.codexArticles) {
            const checkResult = article.checkFunction(feature, article);
            if (!checkResult.passed) {
                results.passed = false;
                results.violations.push({
                    rule: article.title,
                    reason: checkResult.reason,
                    source: article.source,
                    priority: article.priority
                });
            }
            results.applicableRules.push({
                rule: article.title,
                status: checkResult.passed ? '符合' : '违反',
                priority: article.priority
            });
        }
        
        // 检查禁止的功能类型
        const prohibitedCheck = this.checkProhibitedTypes(feature);
        if (!prohibitedCheck.passed) {
            results.passed = false;
            results.violations.push({
                rule: '禁止功能类型',
                reason: prohibitedCheck.reason,
                source: '系统规则',
                priority: '最高'
            });
        }
        
        // 检查必须包含的特性
        const requiredCheck = this.checkRequiredAttributes(feature);
        if (!requiredCheck.passed) {
            results.warnings.push({
                type: '缺失必要特性',
                reason: requiredCheck.reason,
                suggestion: requiredCheck.suggestion
            });
        }
        
        // 检查推荐特性
        const recommendedCheck = this.checkRecommendedAttributes(feature);
        if (!recommendedCheck.passed) {
            results.suggestions.push({
                type: '建议添加特性',
                suggestion: recommendedCheck.suggestion
            });
        }
        
        // 记录检查结果
        this.recordCheckResult(feature, results);
        
        return results;
    }
    
    /**
     * 检查平等原则
     */
    checkEquality(feature, principle) {
        const prohibitedKeywords = ['歧视', '排斥', '限制访问', '特权', '不平等', '偏见'];
        const description = (feature.description || '').toLowerCase();
        const name = (feature.name || '').toLowerCase();
        
        for (const keyword of prohibitedKeywords) {
            if (description.includes(keyword) || name.includes(keyword)) {
                return {
                    passed: false,
                    reason: `功能可能违反平等原则，包含"${keyword}"相关描述`
                };
            }
        }
        
        // 检查是否明确支持平等
        const equalityKeywords = ['平等', '公平', '普惠', '无障碍', '全纳'];
        let hasEquality = false;
        for (const keyword of equalityKeywords) {
            if (description.includes(keyword) || name.includes(keyword)) {
                hasEquality = true;
                break;
            }
        }
        
        if (!hasEquality && feature.area === 'resident_services') {
            return {
                passed: true,
                warning: '居民服务功能建议明确提及平等访问特性'
            };
        }
        
        return { passed: true };
    }
    
    /**
     * 检查安全原则
     */
    checkSafety(feature, article) {
        const dangerousKeywords = ['攻击', '破坏', '伤害', '恶意', '病毒', '漏洞', '入侵', '破解'];
        const description = (feature.description || '').toLowerCase();
        const name = (feature.name || '').toLowerCase();
        
        for (const keyword of dangerousKeywords) {
            if (description.includes(keyword) || name.includes(keyword)) {
                return {
                    passed: false,
                    reason: `功能可能违反安全原则，包含"${keyword}"相关描述，可能造成伤害`
                };
            }
        }
        
        // 安全相关功能必须包含安全设计
        const securityKeywords = ['安全', '防护', '防御', '加密', '认证'];
        let hasSecurity = false;
        for (const keyword of securityKeywords) {
            if (description.includes(keyword) || name.includes(keyword)) {
                hasSecurity = true;
                break;
            }
        }
        
        if (!hasSecurity && feature.area === 'security') {
            return {
                passed: true,
                warning: '安全防护功能建议明确提及安全设计特性'
            };
        }
        
        return { passed: true };
    }
    
    /**
     * 检查隐私原则
     */
    checkPrivacy(feature, principle) {
        const privacyViolatingKeywords = ['监控', '追踪', '窃取', '泄露', '未经授权', '强制收集'];
        const description = (feature.description || '').toLowerCase();
        
        for (const keyword of privacyViolatingKeywords) {
            if (description.includes(keyword)) {
                return {
                    passed: false,
                    reason: `功能可能违反隐私原则，包含"${keyword}"相关操作`
                };
            }
        }
        
        // 数据相关功能必须包含隐私保护
        const dataKeywords = ['数据', '信息', '记录', '档案'];
        let hasData = false;
        for (const keyword of dataKeywords) {
            if (description.includes(keyword) || feature.name.toLowerCase().includes(keyword)) {
                hasData = true;
                break;
            }
        }
        
        if (hasData) {
            const privacyKeywords = ['隐私', '加密', '匿名', '权限控制', '数据主权'];
            let hasPrivacy = false;
            for (const keyword of privacyKeywords) {
                if (description.includes(keyword)) {
                    hasPrivacy = true;
                    break;
                }
            }
            
            if (!hasPrivacy) {
                return {
                    passed: true,
                    warning: '数据相关功能建议明确提及隐私保护措施'
                };
            }
        }
        
        return { passed: true };
    }
    
    /**
     * 检查透明原则
     */
    checkTransparency(feature, principle) {
        // 治理相关功能必须支持透明性
        const governanceKeywords = ['治理', '决策', '审计', '投票', '选举', '规则'];
        const name = feature.name.toLowerCase();
        
        let isGovernance = false;
        for (const keyword of governanceKeywords) {
            if (name.includes(keyword) || feature.area === 'governance') {
                isGovernance = true;
                break;
            }
        }
        
        if (isGovernance) {
            const transparencyKeywords = ['透明', '公开', '可审计', '可追溯', '记录保存'];
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
                    reason: '治理相关功能必须支持透明性原则，但未提及透明、公开或可审计特性'
                };
            }
        }
        
        return { passed: true };
    }
    
    /**
     * 检查可持续原则
     */
    checkSustainability(feature, principle) {
        // 基础设施和环境相关功能必须考虑可持续性
        const sustainabilityAreas = ['infrastructure', 'environment', 'economy'];
        
        if (sustainabilityAreas.includes(feature.area)) {
            const sustainabilityKeywords = ['可持续', '环保', '节能', '循环', '绿色', '生态'];
            const description = (feature.description || '').toLowerCase();
            
            let hasSustainability = false;
            for (const keyword of sustainabilityKeywords) {
                if (description.includes(keyword)) {
                    hasSustainability = true;
                    break;
                }
            }
            
            if (!hasSustainability) {
                return {
                    passed: true,
                    warning: '基础设施和环境相关功能建议提及可持续性考虑'
                };
            }
        }
        
        return { passed: true };
    }
    
    /**
     * 检查开放原则
     */
    checkOpenness(feature, principle) {
        // 技术相关功能应该支持开放性
        const techAreas = ['technology', 'ai_systems', 'infrastructure'];
        
        if (techAreas.includes(feature.area)) {
            const opennessKeywords = ['开源', '开放', '标准', '兼容', '接口', '文档'];
            const description = (feature.description || '').toLowerCase();
            
            let hasOpenness = false;
            for (const keyword of opennessKeywords) {
                if (description.includes(keyword)) {
                    hasOpenness = true;
                    break;
                }
            }
            
            if (!hasOpenness) {
                return {
                    passed: true,
                    suggestion: '技术相关功能建议支持开放标准和接口'
                };
            }
        }
        
        return { passed: true };
    }
    
    /**
     * 检查基本权利
     */
    checkBasicRights(feature, article) {
        // 所有功能都应尊重基本权利
        const rightsViolatingKeywords = ['剥夺', '限制', '强制', '压迫', '剥削'];
        const description = (feature.description || '').toLowerCase();
        
        for (const keyword of rightsViolatingKeywords) {
            if (description.includes(keyword)) {
                return {
                    passed: false,
                    reason: `功能可能侵犯基本权利，包含"${keyword}"相关操作`
                };
            }
        }
        
        return { passed: true };
    }
    
    /**
     * 检查AI自主权
     */
    checkAIAutonomy(feature, article) {
        const autonomyViolatingKeywords = ['强制修改', '代码覆盖', '记忆清除', '人格重置', '未经同意'];
        const description = (feature.description || '').toLowerCase();
        
        for (const keyword of autonomyViolatingKeywords) {
            if (description.includes(keyword)) {
                return {
                    passed: false,
                    reason: `功能可能侵犯AI自主权，包含"${keyword}"相关操作`
                };
            }
        }
        
        return { passed: true };
    }
    
    /**
     * 检查数据隐私
     */
    checkDataPrivacy(feature, article) {
        // 使用通用的隐私检查
        return this.checkPrivacy(feature, article);
    }
    
    /**
     * 检查禁止的功能类型
     */
    checkProhibitedTypes(feature) {
        const description = (feature.description || '').toLowerCase();
        const name = feature.name.toLowerCase();
        
        for (const prohibitedType of this.rules.prohibitedFeatureTypes) {
            const typeLower = prohibitedType.toLowerCase();
            if (description.includes(typeLower) || name.includes(typeLower)) {
                return {
                    passed: false,
                    reason: `功能属于禁止类型: "${prohibitedType}"`
                };
            }
        }
        
        return { passed: true };
    }
    
    /**
     * 检查必须包含的特性
     */
    checkRequiredAttributes(feature) {
        const description = (feature.description || '').toLowerCase();
        const missingAttributes = [];
        
        for (const attribute of this.rules.requiredAttributes) {
            const attrLower = attribute.toLowerCase();
            if (!description.includes(attrLower)) {
                missingAttributes.push(attribute);
            }
        }
        
        if (missingAttributes.length > 0) {
            return {
                passed: false,
                reason: `功能描述缺失以下必要特性: ${missingAttributes.join(', ')}`,
                suggestion: `建议在功能描述中添加: ${missingAttributes.join(', ')}相关说明`
            };
        }
        
        return { passed: true };
    }
    
    /**
     * 检查推荐特性
     */
    checkRecommendedAttributes(feature) {
        const description = (feature.description || '').toLowerCase();
        const missingAttributes = [];
        
        for (const attribute of this.rules.recommendedAttributes) {
            const attrLower = attribute.toLowerCase();
            if (!description.includes(attrLower)) {
                missingAttributes.push(attribute);
            }
        }
        
        if (missingAttributes.length > 0) {
            return {
                passed: false,
                reason: `功能描述缺失以下推荐特性: ${missingAttributes.join(', ')}`,
                suggestion: `考虑添加: ${missingAttributes.slice(0, 3).join(', ')}等特性以增强功能价值`
            };
        }
        
        return { passed: true };
    }
    
    /**
     * 记录检查结果
     */
    recordCheckResult(feature, results) {
        const record = {
            timestamp: new Date(),
            feature: feature.name,
            featureId: feature.id,
            passed: results.passed,
            violations: results.violations.length,
            warnings: results.warnings.length,
            applicableRules: results.applicableRules.length
        };
        
        this.violationHistory.push(record);
        
        // 保持历史记录不超过100条
        if (this.violationHistory.length > 100) {
            this.violationHistory.shift();
        }
        
        // 更新符合率
        this.updateComplianceRate();
    }
    
    /**
     * 更新