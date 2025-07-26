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

  // HomePage 元件
  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-6">
                {t.hero.highlight}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                {t.hero.title}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                  {t.hero.cta1}
                </button>
                <button
                  onClick={() => setCurrentPage('tools')}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-lg font-bold text-lg transition-all"
                >
                  {t.hero.cta2}
                </button>
              </div>
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg inline-block animate-pulse">
                <Clock className="w-4 h-4 inline mr-2" />
                {t.hero.urgency}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">95%+</div>
                  <div className="text-lg">成功率保證</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">1000+</div>
                    <div className="text-sm">成功案例</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">5年</div>
                    <div className="text-sm">專業經驗</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 痛點分析 */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-red-800 mb-4">{t.painPoints.title}</h2>
            <p className="text-xl text-red-600">{t.painPoints.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.painPoints.points.map((point, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
                  <h3 className="text-xl font-bold text-red-800">{point.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{point.description}</p>
                <div className="bg-red-100 p-3 rounded-lg">
                  <p className="text-red-800 font-semibold text-sm">{point.consequence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服務方案 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.services.title}</h2>
            <p className="text-xl text-gray-600">{t.services.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.services.packages.map((pkg, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-blue-600 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {pkg.icon === 'FileText' && <FileText className="w-8 h-8 text-blue-600" />}
                    {pkg.icon === 'Shield' && <Shield className="w-8 h-8 text-blue-600" />}
                    {pkg.icon === 'Building' && <Building className="w-8 h-8 text-blue-600" />}
                    {pkg.icon === 'Award' && <Award className="w-8 h-8 text-blue-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{pkg.price}</div>
                  <div className="text-sm text-gray-500">{pkg.timeframe}</div>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.services.map((service, serviceIdx) => (
                    <li key={serviceIdx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-yellow-100 p-3 rounded-lg text-center">
                  <span className="text-yellow-800 font-semibold text-sm">{pkg.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 客戶見證 */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.testimonials.title}</h2>
            <p className="text-xl text-gray-600">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.reviews.map((review, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.title}</p>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm">{review.content}</p>
                <div className="bg-green-100 p-3 rounded-lg">
                  <p className="text-green-800 font-semibold text-sm">{review.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // ToolsPage 元件
  const ToolsPage = () => {
    const [taxData, setTaxData] = useState({
      income: '',
      days183: false,
      hasOverseasIncome: false,
      businessType: 'general'
    });
    const [b00Data, setB00Data] = useState({
      investment: '',
      revenue: '',
      employees: '',
      experience: ''
    });
    const [taxResult, setTaxResult] = useState(null);
    const [b00Result, setB00Result] = useState(null);

    const handleTaxCalculation = () => {
      const result = calculateAdvancedTax(
        parseInt(taxData.income) || 0,
        taxData.days183,
        taxData.hasOverseasIncome,
        taxData.businessType
      );
      setTaxResult(result);
    };

    const handleB00Assessment = () => {
      const result = assessB00Eligibility(
        parseInt(b00Data.investment) || 0,
        parseInt(b00Data.revenue) || 0,
        parseInt(b00Data.employees) || 0,
        parseInt(b00Data.experience) || 0
      );
      setB00Result(result);
    };

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t.calculator.title}</h1>
          <p className="text-xl text-gray-600">{t.calculator.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 稅務計算器 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-2" />
              {t.calculator.personalTax}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">年收入 (台幣)</label>
                <input
                  type="number"
                  value={taxData.income}
                  onChange={(e) => setTaxData({...taxData, income: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="例如：1000000"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={taxData.days183}
                  onChange={(e) => setTaxData({...taxData, days183: e.target.checked})}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">在台灣居住滿183天（稅務居民）</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={taxData.hasOverseasIncome}
                  onChange={(e) => setTaxData({...taxData, hasOverseasIncome: e.target.checked})}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">有海外收入</label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">業務類型</label>
                <select
                  value={taxData.businessType}
                  onChange={(e) => setTaxData({...taxData, businessType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">一般收入</option>
                  <option value="ecommerce">電商業務</option>
                  <option value="consulting">顧問服務</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleTaxCalculation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              計算稅務負擔
            </button>
            
            {taxResult && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">計算結果</h3>
                <div className="space-y-2 text-sm">
                  <div>個人所得稅：NT$ {taxResult.personalTax.toLocaleString()}</div>
                  <div>營業稅：NT$ {taxResult.vatTax.toLocaleString()}</div>
                  <div className="font-bold text-lg">總稅額：NT$ {taxResult.totalTax.toLocaleString()}</div>
                </div>
                {taxResult.warnings.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-orange-800">注意事項：</h4>
                    <ul className="list-disc list-inside text-sm text-orange-700">
                      {taxResult.warnings.map((warning, idx) => (
                        <li key={idx}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* B00評估工具 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2" />
              {t.calculator.b00Calculator}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">投資金額 (台幣)</label>
                <input
                  type="number"
                  value={b00Data.investment}
                  onChange={(e) => setB00Data({...b00Data, investment: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="例如：20000000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">預估年營收 (台幣)</label>
                <input
                  type="number"
                  value={b00Data.revenue}
                  onChange={(e) => setB00Data({...b00Data, revenue: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="例如：30000000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">預計聘僱員工數</label>
                <input
                  type="number"
                  value={b00Data.employees}
                  onChange={(e) => setB00Data({...b00Data, employees: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="例如：5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">管理經驗 (年)</label>
                <input
                  type="number"
                  value={b00Data.experience}
                  onChange={(e) => setB00Data({...b00Data, experience: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="例如：8"
                />
              </div>
            </div>
            
            <button
              onClick={handleB00Assessment}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              評估B00資格
            </button>
            
            {b00Result && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">評估結果</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span>綜合評分</span>
                    <span className="font-bold text-2xl text-green-600">{b00Result.score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{width: `${b00Result.score}%`}}
                    ></div>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${b00Result.eligibility ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <p className={`font-semibold ${b00Result.eligibility ? 'text-green-800' : 'text-yellow-800'}`}>
                    {b00Result.eligibility ? '✅ 符合申請條件' : '⚠️ 條件需要改善'}
                  </p>
                </div>
                {b00Result.issues.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-red-800">需要改善：</h4>
                    <ul className="list-disc list-inside text-sm text-red-700">
                      {b00Result.issues.map((issue, idx) => (
                        <li key={idx}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-6">
            <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-yellow-800 mb-2">免責聲明</h3>
            <p className="text-yellow-700 text-sm">
              以上計算結果僅供參考，實際稅務負擔和簽證申請條件可能因個人情況而異。
              建議諮詢專業顧問以獲得準確的評估和建議。
            </p>
          </div>
        </div>
      </div>
    );
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

      {/* 主要內容 */}
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'tools' && <ToolsPage />}
        {/* 其他頁面保持簡化版本以節省空間 */}
        {currentPage === 'services' && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">{t.services.title}</h1>
            <div className="text-center py-16 text-gray-500">
              <Building className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>詳細服務介紹與方案比較</p>
            </div>
          </div>
        )}
        {currentPage === 'success' && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">客戶成功案例</h1>
            <div className="text-center py-16 text-gray-500">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>超過1000位客戶成功案例</p>
              <p className="text-sm mt-2">5年平均成功率95%以上</p>
            </div>
          </div>
        )}
        {currentPage === 'pricing' && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">收費與比較</h1>
            <div className="text-center py-16 text-gray-500">
              <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>透明化收費，無隱藏費用</p>
              <p className="text-sm mt-2">依據服務複雜度提供客製化報價</p>
            </div>
          </div>
        )}
        {currentPage === 'faq' && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">常見問題</h1>
            <div className="space-y-4">
              {[
                { q: '我應該申請B00、工作簽證還是其他簽證？', a: '這需要根據您的投資額、學經歷、營運計畫來評估，建議預約免費諮詢，我們可以為您詳細分析最適合的簽證類型。' },
                { q: '非居留（未滿183天）為什麼要課18%？', a: '這是台灣稅法對非稅務居民的預扣稅率規定，但實際上還有很多細節需要注意，例如租稅協定的適用、海外收入的申報等。' },
                { q: '成立公司跟設立行號差在哪？', a: '主要差異在責任範圍、稅務結構、未來擴充性。行號負責人需承擔無限責任，公司股東責任僅限於出資額。詳細分析建議諮詢專業顧問。' }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-lg mb-2 text-blue-800">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 增強版Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">VN-TW Service</div>
                  <div className="text-xs text-gray-400">您的台灣事業夥伴</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                專為越南人提供在台灣的全方位法務、稅務、簽證服務。
                政府認證，值得信賴。
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">聯絡我們</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-400" />
                  <span>+886-2-1234-5678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  <span>info@vn-tw-service.com</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2 text-green-400" />
                  <span>LINE: @vntw-service</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">服務時間</h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>週一至週五：9:00-18:00</p>
                <p>週六：9:00-12:00</p>
                <p>緊急諮詢：24小時</p>
                <p className="text-green-400 font-semibold mt-2">越中英三語服務</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">認證資格</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-yellow-400" />
                  <span>經濟部國際育成中心</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-blue-400" />
                  <span>勞動部TTQS認證</span>
                </div>
                <div className="flex items-center">
                  <Scale className="w-4 h-4 mr-2 text-green-400" />
                  <span>法院認證通譯</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 VN-TW Service. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-2">
              本網站內容僅供參考，實際服務以正式合約為準
            </p>
          </div>
        </div>
      </footer>

      {/* PDF下載模態框 */}
      {showPDFModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">下載專業報告</h3>
            <p className="text-gray-600 mb-4">請輸入您的電子郵件，我們將發送詳細的稅務規劃報告給您。</p>
            <input
              type="email"
              value={emailForPDF}
              onChange={(e) => setEmailForPDF(e.target.value)}
              placeholder="您的電子郵件"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPDFModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  // 這裡可以添加發送郵件的邏輯
                  setShowPDFModal(false);
                  setEmailForPDF('');
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                發送報告
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 增強版浮動聯絡按鈕 */}
      <div className="fixed bottom-6 right-6 space-y-3 z-40">
        {/* 急迫性提醒 */}
        <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
          限時免費諮詢
        </div>
        
        <div className="flex flex-col space-y-2">
          <button className="group bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              LINE 免費諮詢
            </span>
          </button>
          
          <button className="group bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110">
            <Phone className="w-6 h-6" />
            <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              立即來電
            </span>
          </button>
          
          <button
            onClick={() => setCurrentPage('tools')}
            className="group bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110"
          >
            <Calculator className="w-6 h-6" />
            <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              免費試算
            </span>
          </button>
        </div>
      </div>

      {/* 返回頂部按鈕 */}
      <button
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="fixed bottom-6 left-6 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 z-40"
      >
        <ChevronDown className="w-5 h-5 transform rotate-180" />
      </button>
    </div>
  );
};

export default VnTwServiceWebsite;