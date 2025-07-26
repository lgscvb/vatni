import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Calculator, FileText, Users, Shield, Award, Globe, Phone, Mail, MessageCircle, Download, CheckCircle, AlertTriangle, TrendingUp, DollarSign, Clock, Star, ArrowRight, Building, Briefcase, Scale, Target, Eye, UserCheck, AlertCircle, BookOpen, Heart } from 'lucide-react';

const VnTwServiceWebsite = () => {
  const [currentLang, setCurrentLang] = useState('zh');
  const [currentPage, setCurrentPage] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [calculatorData, setCalculatorData] = useState({});
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [emailForPDF, setEmailForPDF] = useState('');
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showRiskCalculator, setShowRiskCalculator] = useState(false);
  const [riskAssessmentData, setRiskAssessmentData] = useState({});

  // 多語言內容
  const translations = {
    zh: {
      nav: {
        home: '首頁',
        services: '服務方案',
        tools: '互動工具',
        success: '成功案例',
        pricing: '收費比較',
        faq: '常見問題'
      },
      hero: {
        title: '越南人來台灣，一站式簽證・稅務・公司設立與法務服務',
        subtitle: 'B00 高階經理人簽證｜工作簽證｜居留證｜台灣稅務申報｜公司/行號設立',
        highlight: '經濟部國際育成中心・勞動部TTQS認證・法院通譯',
        cta1: '立即免費諮詢',
        cta2: '稅務快速試算',
        urgency: '本月限量20個免費深度諮詢名額'
      },
      painPoints: {
        title: '您是否正面臨這些困擾？',
        subtitle: '每年有超過3000位越南人因為不了解台灣法規而付出慘痛代價',
        points: [
          {
            title: '簽證被拒，投資泡湯',
            description: '不清楚B00/工作簽/居留證真正的申請條件，準備錯誤文件導致被拒簽',
            consequence: '損失：投資金額無法回收，時間成本浪費'
          },
          {
            title: '稅務補繳，罰金翻倍',
            description: '不懂台灣稅制（18%非稅籍、累進稅率、營業稅5%），錯報或漏報',
            consequence: '損失：補稅+罰款可能是原本稅額的2-3倍'
          },
          {
            title: '公司選錯，責任無限',
            description: '不知道公司或行號的差別，選錯組織型態承擔無限責任',
            consequence: '損失：個人資產可能因商業債務被查封'
          },
          {
            title: '文件錯誤，重新來過',
            description: '中文法規看不懂，文件準備錯誤或不齊全',
            consequence: '損失：案件被退件，重新申請費時6個月以上'
          },
          {
            title: '找錯顧問，錢財兩失',
            description: '找不到會越文、真正專業的顧問，被不良代辦欺騙',
            consequence: '損失：服務費付了但沒結果，還要重新找人處理'
          }
        ]
      },
      services: {
        title: '專業服務方案',
        subtitle: '我們不只代辦，更是您在台灣的商業策略夥伴',
        packages: [
          {
            name: '入境前規劃包',
            icon: 'FileText',
            services: ['B00簽證可行性評估', '投資結構規劃', '工作簽證路徑分析', '文件清單制定'],
            price: '諮詢報價',
            timeframe: '2-4週',
            highlight: '90%客戶避免投資失敗'
          },
          {
            name: '法遵安居包',
            icon: 'Shield',
            services: ['居留證申請/延期', '台灣駕照換發', '健保投保', '銀行開戶協助'],
            price: 'NT$ 25,000起',
            timeframe: '3-6週',
            highlight: '100%成功率保證'
          },
          {
            name: '創業稅務包',
            icon: 'Building',
            services: ['公司/行號設立', '營業登記', '稅務申報代理', '會計記帳'],
            price: 'NT$ 35,000起',
            timeframe: '2-3週',
            highlight: '合法節稅每年省10萬+'
          },
          {
            name: '全方位顧問包',
            icon: 'Award',
            services: ['年度稅務規劃', '法務諮詢', '政府補助申請', '24小時緊急諮詢'],
            price: 'NT$ 100,000/年',
            timeframe: '全年服務',
            highlight: 'VIP客戶專享'
          }
        ]
      },
      calculator: {
        title: '免費稅務試算工具',
        subtitle: '2分鐘了解您的稅務負擔，但隱藏的風險需要專業顧問協助',
        personalTax: '個人綜合所得稅',
        companyTax: '公司營業稅',
        vatCalculator: 'VAT補稅計算',
        b00Calculator: 'B00投資門檻檢核'
      },
      fearMarketing: {
        title: '真實案例：代價慘痛的錯誤決定',
        subtitle: '這些都是我們客戶在找到我們之前的真實遭遇',
        cases: [
          {
            title: '代辦消失，15萬泡湯',
            story: '阮先生在台北找了一家便宜的代辦公司申請B00簽證，預付了15萬服務費。3個月後發現那家公司已經關門，負責人失聯，不但簽證沒辦成，錢也拿不回來。',
            lesson: '便宜的代價往往最昂貴',
            prevention: '選擇有政府認證的合法業者'
          },
          {
            title: '稅務補繳，負債50萬',
            story: '陳小姐在台灣做電商兩年，不知道要申報營業稅。被國稅局查到後，除了要補繳兩年的稅金，還有滯納金和罰鍰，總共50萬元。',
            lesson: '無知不是藉口，法律面前人人平等',
            prevention: '提早了解稅務義務，主動合規'
          },
          {
            title: '選錯組織，房產被凍結',
            story: '黃先生選擇設立行號經營貿易業務，因為一筆交易糾紛被客戶告上法院。由於行號負責人要負無限責任，他的個人房產被法院查封。',
            lesson: '組織型態的選擇影響一生',
            prevention: '根據業務風險選擇適當的組織型態'
          }
        ]
      },
      comparison: {
        title: '為什麼選擇我們？同業比較一目了然',
        subtitle: '市場上有很多代辦，但真正專業的寥寥無幾',
        competitors: ['一般代辦', '我們的服務', '低價同業'],
        features: [
          {
            feature: '專業資格',
            general: '一般業務人員',
            us: '法院認證通譯 + 政府認證',
            lowCost: '無專業認證'
          },
          {
            feature: '服務範圍',
            general: '單一代辦服務',
            us: '全方位商業策略規劃',
            lowCost: '只跑流程'
          },
          {
            feature: '風險保障',
            general: '無責任保證',
            us: '全額退費保證 + 責任保險',
            lowCost: '風險自負'
          },
          {
            feature: '後續支援',
            general: '服務後即結束',
            us: '終身諮詢服務',
            lowCost: '無後續服務'
          },
          {
            feature: '成功率',
            general: '未公開',
            us: '95%以上（可查證）',
            lowCost: '約60%'
          }
        ]
      },
      testimonials: {
        title: '客戶真實見證',
        subtitle: '超過1000位客戶的成功經驗',
        reviews: [
          {
            name: '阮文強',
            title: 'IT公司創辦人',
            location: '台北',
            rating: 5,
            content: '我的B00簽證申請很複雜，因為涉及多國投資結構。其他代辦都說很困難，只有這裡的顧問仔細分析了我的情況，最後成功獲批。現在公司發展很好，已經準備申請永久居留了。',
            result: 'B00簽證順利獲批，投資回收期縮短1年',
            image: '/api/placeholder/60/60'
          },
          {
            name: '陳美玲',
            title: '電商經營者',
            location: '台中',
            rating: 5,
            content: '之前完全不知道電商也要繳營業稅，被國稅局查到很緊張。顧問不但幫我處理了補稅問題，還教我合法的節稅方法。現在每年可以省下好幾萬的稅金。',
            result: '合法節稅每年省下8萬元',
            image: '/api/placeholder/60/60'
          },
          {
            name: '黎志明',
            title: '餐飲業投資人',
            location: '高雄',
            rating: 5,
            content: '原本想自己辦營業登記，結果文件準備錯誤被退件兩次。找到這裡後，不但快速辦好了所有手續，還幫我申請到政府補助30萬元。專業就是不一樣！',
            result: '獲得政府補助30萬元',
            image: '/api/placeholder/60/60'
          }
        ]
      },
      urgency: {
        quota: '本月免費諮詢名額',
        remaining: '剩餘',
        total: '20個',
        warning: '每月限量，預約從速'
      }
    },
    vi: {
      nav: {
        home: 'Trang chủ',
        services: 'Dịch vụ',
        tools: 'Công cụ',
        success: 'Thành công',
        pricing: 'Giá cả',
        faq: 'FAQ'
      },
      hero: {
        title: 'Dịch vụ một cửa cho người Việt tại Đài Loan: Visa, thuế, thành lập công ty & pháp lý',
        subtitle: 'Visa B00 cao cấp | Visa lao động | Thẻ cư trú | Khai thuế Đài Loan | Thành lập công ty',
        highlight: 'Được chứng nhận bởi Bộ Kinh tế・Bộ Lao động・Tòa án',
        cta1: 'Tư vấn miễn phí ngay',
        cta2: 'Tính thuế nhanh',
        urgency: 'Tháng này chỉ có 20 suất tư vấn miễn phí'
      }
    },
    en: {
      nav: {
        home: 'Home',
        services: 'Services',
        tools: 'Tools',
        success: 'Success',
        pricing: 'Pricing',
        faq: 'FAQ'
      },
      hero: {
        title: 'One-stop Visa, Tax, Company Setup & Legal Services for Vietnamese in Taiwan',
        subtitle: 'B00 Executive Visa | Work Visa | Resident Card | Taiwan Tax Filing | Company Setup',
        highlight: 'MOEA Certified・MOL TTQS Certified・Court Interpreter',
        cta1: 'Free Consultation',
        cta2: 'Quick Tax Calculator',
        urgency: 'Limited 20 free consultation slots this month'
      }
    }
  };

  const t = translations[currentLang];

  // 複雜的稅務試算功能
  const calculateAdvancedTax = (income, days183, hasOverseasIncome, businessType) => {
    let personalTax = 0;
    let businessTax = 0;
    let vatTax = 0;
    let warnings = [];
    let hiddenRisks = [];

    // 個人所得稅計算
    if (days183) {
      if (income <= 560000) personalTax = income * 0.05;
      else if (income <= 1260000) personalTax = 28000 + (income - 560000) * 0.12;
      else if (income <= 2520000) personalTax = 112000 + (income - 1260000) * 0.20;
      else if (income <= 4720000) personalTax = 364000 + (income - 2520000) * 0.30;
      else personalTax = 1024000 + (income - 4720000) * 0.40;
    } else {
      personalTax = income * 0.18;
      warnings.push('非稅務居民適用18%預扣稅率');
    }

    // 營業稅計算（電商相關）
    if (businessType === 'ecommerce') {
      vatTax = income * 0.05; // 一般稅率
      if (income < 480000) { // 小規模營業人
        vatTax = income * 0.01;
        warnings.push('符合小規模營業人資格，稅率1%');
      }
    }

    // 隱藏風險識別
    if (hasOverseasIncome) {
      hiddenRisks.push('海外收入可能涉及租稅協定申請');
      hiddenRisks.push('CRS共同申報準則下的資訊交換風險');
    }

    if (income > 2000000) {
      hiddenRisks.push('高收入者適用最低稅負制，需要額外評估');
      hiddenRisks.push('可能需要考慮移轉訂價文據準備');
    }

    if (businessType === 'ecommerce') {
      hiddenRisks.push('跨境電商可能涉及關稅和貿易法規');
      hiddenRisks.push('數位服務稅的適用可能性');
    }

    hiddenRisks.push('健保費補充保費計算的複雜規則');
    hiddenRisks.push('扣繳憑單申報義務可能被忽略');

    return {
      income,
      personalTax: Math.round(personalTax),
      businessTax: Math.round(businessTax),
      vatTax: Math.round(vatTax),
      totalTax: Math.round(personalTax + businessTax + vatTax),
      warnings,
      hiddenRisks,
      recommendation: income > 2000000 ? '建議尋求專業稅務規劃' : '基本申報即可，但需注意合規'
    };
  };

  // B00投資門檻評估
  const assessB00Eligibility = (investment, revenue, employees, experience) => {
    let score = 0;
    let issues = [];
    let recommendations = [];

    // 投資額評估
    if (investment >= 20000000) score += 30;
    else if (investment >= 15000000) score += 25;
    else if (investment >= 10000000) score += 20;
    else issues.push('投資額可能不足，建議至少1500萬台幣');

    // 營收評估
    if (revenue >= 30000000) score += 25;
    else if (revenue >= 20000000) score += 20;
    else if (revenue >= 10000000) score += 15;
    else issues.push('預估營收偏低，需要更詳細的商業計畫');

    // 員工數評估
    if (employees >= 5) score += 20;
    else if (employees >= 3) score += 15;
    else if (employees >= 1) score += 10;
    else issues.push('需要聘僱台灣員工以符合規定');

    // 經驗評估
    if (experience >= 10) score += 25;
    else if (experience >= 5) score += 20;
    else if (experience >= 3) score += 15;
    else issues.push('管理經驗可能不足，需要強化履歷');

    // 生成建議
    if (score >= 80) {
      recommendations.push('條件優秀，建議立即準備申請');
    } else if (score >= 60) {
      recommendations.push('條件良好，建議優化部分項目後申請');
    } else {
      recommendations.push('條件需要改善，建議先諮詢專業顧問');
    }

    return { score, issues, recommendations, eligibility: score >= 60 };
  };

  // 風險評估工具
  const calculateBusinessRisk = (businessType, location, investment) => {
    let riskLevel = 0;
    let risks = [];
    
    const riskFactors = {
      'restaurant': { level: 3, factors: ['食品安全法規', '勞動法規複雜', '營業場所限制'] },
      'ecommerce': { level: 2, factors: ['跨境稅務', '消費者保護法', '個資法規範'] },
      'manufacturing': { level: 4, factors: ['環保法規', '工安法規', '土地使用分區'] },
      'consulting': { level: 1, factors: ['專業責任', '智財權保護', '合約法規'] }
    };

    const locationRisks = {
      'taipei': { level: 1, factors: ['高租金壓力', '競爭激烈'] },
      'taichung': { level: 2, factors: ['交通限制', '人才相對稀缺'] },
      'kaohsiung': { level: 2, factors: ['產業轉型中', '南北資源差距'] }
    };

    if (riskFactors[businessType]) {
      riskLevel += riskFactors[businessType].level;
      risks.push(...riskFactors[businessType].factors);
    }

    if (locationRisks[location]) {
      riskLevel += locationRisks[location].level;
      risks.push(...locationRisks[location].factors);
    }

    if (investment > 50000000) {
      riskLevel += 1;
      risks.push('大額投資審查');
    }

    return { riskLevel, risks, recommendation: riskLevel > 5 ? '建議尋求專業風險評估' : '風險可控' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 增強版導航欄 */}
      <nav className="bg-white shadow-lg sticky top-0 z-40 border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">VN-TW Service</div>
                <div className="text-xs text-gray-500">越南人在台專業服務</div>
              </div>
            </div>
            
            {/* 緊急聯絡資訊 */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <div className="flex items-center text-green-600">
                <Phone className="w-4 h-4 mr-1" />
                <span className="font-semibold">+886-2-1234-5678</span>
              </div>
              <div className="flex items-center text-green-600">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span className="font-semibold">LINE: @vntw-service</span>
              </div>
            </div>
            
            {/* 語言與導航 */}
            <div className="flex items-center space-x-4">
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="zh">繁體中文</option>
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
              
              {/* 桌面導航 */}
              <div className="hidden md:flex space-x-1">
                {Object.entries(t.nav).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setCurrentPage(key)}
                    className={`px-4 py-2 rounded-lg transition-all font-medium ${
                      currentPage === key 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
              {/* 行動裝置選單按鈕 */}
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* 行動裝置選單 */}
          {showMobileMenu && (
            <div className="md:hidden border-t py-4 bg-gray-50">
              {Object.entries(t.nav).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentPage(key);
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* 主要內容將在下一個檔案中繼續 */}
      <main>
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">React 應用程式載入中...</h1>
          <p className="text-gray-600">正在準備完整的網站功能</p>
        </div>
      </main>
    </div>
  );
};

export default VnTwServiceWebsite;