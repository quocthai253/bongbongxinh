
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  PartyPopper, 
  Gift, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  ArrowRight,
  Menu,
  X,
  Loader2,
  Star,
  Award,
  Layers,
  Target,
  ChevronRight,
  Send,
  Sparkle,
  MessageSquare
} from 'lucide-react';
import { Service, Feature, Testimony } from './types';
import { getDecorAdvice } from './services/geminiService';

const LOGO_URL = "http://www.bongbongxinh.com/wp-content/uploads/2026/02/cropped-admin-ajax-1.png";
const NEW_CONSULT_IMG = "http://www.bongbongxinh.com/wp-content/uploads/2026/02/Tu-van-mien-phi.png";
const IN_LOGO_LINK = "https://www.bongbongxinh.com/bong-bong-in-logo-2/";

// --- Components ---

const FloatingBalloon = ({ 
  className, 
  size = "w-14 h-20", 
  color = "cyan",
  delayClass = "" 
}: { 
  className?: string, 
  size?: string, 
  color?: "cyan" | "navy" | "white",
  delayClass?: string
}) => {
  const gradient = color === "cyan" 
    ? "radial-gradient(circle at 30% 30%, #E0F7FA, #33C1E3, #00ACC1)" 
    : color === "navy"
    ? "radial-gradient(circle at 30% 30%, #E0F2F1, #007BA7, #01579B)"
    : "radial-gradient(circle at 30% 30%, #FFFFFF, #F1F5F9, #CBD5E1)";
  
  return (
    <div className={`absolute pointer-events-none animate-float ${delayClass} hidden lg:block ${className}`}>
      <div className={`${size} rounded-[50%_50%_50%_50%/40%_40%_60%_60%] relative shadow-lg opacity-80 backdrop-blur-sm`} style={{ background: gradient }}>
        <div className="absolute top-[15%] left-[15%] w-[20%] h-[20%] bg-white/40 rounded-full blur-[2px]"></div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-inherit opacity-80" style={{ borderBottomColor: '#33C1E3' }}></div>
      </div>
    </div>
  );
};

const SectionHeading = ({ badge, title, subtitle, light = false, align = "center" }: { badge?: string, title: string, subtitle?: string, light?: boolean, align?: "center" | "left" }) => (
  <div className={`mb-12 md:mb-20 reveal ${align === "center" ? "text-center" : "text-left"}`}>
    {badge && (
      <span className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-full border ${light ? 'border-white/20 text-white bg-white/10' : 'border-slate-200 text-slate-600 bg-white'} text-[11px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md shadow-sm`}>
        {badge}
      </span>
    )}
    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-[1.1] ${light ? 'text-white' : 'text-slate-900'} text-balance`}>
      {title}
    </h2>
    {subtitle && <p className={`text-base md:text-lg leading-relaxed font-light ${light ? 'text-slate-300' : 'text-slate-500'} ${align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"}`}>{subtitle}</p>}
  </div>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // AI Form State
  const [partyType, setPartyType] = useState('Thôi nôi');
  const [budget, setBudget] = useState('Dưới 5 triệu');
  const [guestCount, setGuestCount] = useState('30-50 khách');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      hiddenElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleGetAiAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiLoading(true);
    const advice = await getDecorAdvice(partyType, budget, guestCount);
    setAiAdvice(advice);
    setIsAiLoading(false);
    
    // Smooth scroll to advice
    setTimeout(() => {
      document.getElementById('ai-result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const services: Service[] = [
    {
      id: '1',
      title: 'Sinh Nhật & Thôi Nôi',
      description: 'Hiện thực hóa thế giới thần tiên với concept pastel ngọt ngào, thiết kế riêng cho từng bé.',
      icon: <PartyPopper className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '2',
      title: 'Sự Kiện & Khai Trương',
      description: 'Nâng tầm thương hiệu với cổng chào bong bóng nghệ thuật và backdrop check-in chuyên nghiệp.',
      icon: <Award className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '3',
      title: 'In Logo Quảng Bá',
      description: 'Giải pháp Marketing hiệu quả với bong bóng in logo sắc nét, độ bền cao cho doanh nghiệp.',
      icon: <Target className="w-5 h-5" />,
      image: NEW_CONSULT_IMG
    }
  ];

  const testimonials: Testimony[] = [
    {
      id: 1,
      name: "Nguyễn Thùy Chi",
      role: "Mẹ bé Annie - Tiệc Thôi Nôi",
      text: "Mình rất kỹ tính nhưng Bong Bóng Xinh đã thuyết phục hoàn toàn. Tông màu pastel thực tế còn đẹp hơn trong ảnh demo 3D.",
      avatar: NEW_CONSULT_IMG
    },
    {
      id: 2,
      name: "Trần Minh Tuấn",
      role: "CEO TechEvent",
      text: "Hợp tác với bên em nhiều sự kiện khai trương, chưa bao giờ thất vọng. Đội ngũ support cực kỳ nhanh và chuyên nghiệp.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 3,
      name: "Phạm Hương Giang",
      role: "Khách hàng thân thiết",
      text: "Giá cả rất hợp lý so với chất lượng nhận được. Các bạn nhân viên thi công dọn dẹp sạch sẽ sau khi tiệc tan.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src={LOGO_URL} alt="Bong Bong Xinh" className="w-10 h-10 rounded-lg shadow-md object-contain bg-white p-1" />
            <div>
              <span className={`block text-lg font-bold tracking-tight leading-none ${scrolled ? 'text-slate-900' : 'text-slate-800'}`}>BONG BÓNG XINH</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#33C1E3] uppercase block">Elite Event Decoration</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-slate-600">
            {['Dịch vụ', 'Tư vấn AI', 'In Logo', 'Liên hệ'].map((item, i) => (
              <a 
                key={i} 
                href={item === 'In Logo' ? IN_LOGO_LINK : `#${item === 'Dịch vụ' ? 'dich-vu' : item === 'Tư vấn AI' ? 'ai-consultant' : 'lien-he'}`}
                {...(item === 'In Logo' ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="hover:text-[#33C1E3] transition-colors uppercase tracking-wide"
              >
                {item}
              </a>
            ))}
            <a 
              href="#ai-consultant" 
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-[#33C1E3] transition-all shadow-lg hover:shadow-cyan-500/30 flex items-center gap-2"
            >
              Nhận Tư Vấn <ArrowRight size={14} />
            </a>
          </div>

          <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[80vh]' : 'max-h-0'}`}>
          <div className="flex flex-col p-6 gap-4 text-sm font-semibold text-slate-700">
            <a href="#dich-vu" onClick={() => setIsMenuOpen(false)} className="py-3 border-b border-slate-100">Dịch vụ</a>
            <a href="#ai-consultant" onClick={() => setIsMenuOpen(false)} className="py-3 border-b border-slate-100">Tư vấn AI Miễn Phí</a>
            <a href={IN_LOGO_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="py-3 border-b border-slate-100 flex items-center justify-between">In Logo Quảng Cáo <ArrowRight size={14} className="text-[#33C1E3]" /></a>
            <a href="#lien-he" onClick={() => setIsMenuOpen(false)} className="py-3 text-[#33C1E3]">Liên hệ báo giá</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(51,193,227,0.05),transparent_40%)]"></div>
        <FloatingBalloon className="top-32 left-[8%]" color="cyan" delayClass="float-delay-1" />
        <FloatingBalloon className="bottom-20 right-[12%]" color="navy" delayClass="float-delay-2" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left reveal">
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm mb-8">
                <Sparkle className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Nghệ Thuật Bong Bóng Đỉnh Cao</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-slate-900 leading-[1] tracking-tight mb-8">
                Không Gian <br/>
                <span className="blue-text italic">Của Những Giấc Mơ</span>
              </h1>
              
              <p className="text-lg text-slate-600 font-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                Từ tiệc thôi nôi ngọt ngào đến sự kiện doanh nghiệp đẳng cấp. Bong Bóng Xinh hiện thực hóa mọi ý tưởng bằng sự tận tâm và sáng tạo không giới hạn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#ai-consultant" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-[#33C1E3] transition-all shadow-xl hover:shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2">
                  Tư Vấn AI Miễn Phí <ArrowRight size={18} />
                </a>
                <a href="#dich-vu" className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:border-slate-400 transition-all active:scale-95 flex items-center justify-center">
                  Khám Phá Dịch Vụ
                </a>
              </div>
            </div>

            <div className="relative reveal reveal-delay-200">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&q=80&w=600" 
                    alt="Birthday Event" 
                    className="rounded-3xl shadow-2xl w-full h-80 object-cover"
                  />
                  <div className="bg-[#33C1E3] p-8 rounded-3xl text-white shadow-xl">
                    <p className="text-4xl font-bold mb-1">10k+</p>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-80">Khách Hàng Tin Tưởng</p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
                    <p className="text-4xl font-bold mb-1">Top 1</p>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-80">Decor Tại Việt Nam</p>
                  </div>
                  <img 
                    src="http://www.bongbongxinh.com/wp-content/uploads/2026/02/bong-bong-hoa-cuc-trang-hoa-mi-bong-mai-huong-duong-mat-cuoi-trang-tri-sinh-nhat-ngay-le-P4808-1645055300693.jpg" 
                    alt="Balloon Art" 
                    className="rounded-3xl shadow-2xl w-full h-80 object-cover"
                  />
                </div>
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-cyan-100/30 to-blue-100/30 rounded-full blur-[100px]"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section id="dich-vu" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading 
            badge="Dịch Vụ Đẳng Cấp"
            title="Chúng Tôi Có Thể Làm Gì?"
            subtitle="Mỗi chi tiết đều được chăm chút tỉ mỉ để tạo nên khoảnh khắc khó quên."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group bg-slate-50 rounded-[2.5rem] overflow-hidden hover:bg-white transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-slate-100 reveal">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="p-10">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#33C1E3] shadow-sm mb-8 group-hover:bg-[#33C1E3] group-hover:text-white transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8 font-light">{service.description}</p>
                  <a href={service.title === 'In Logo Quảng Bá' ? IN_LOGO_LINK : "#lien-he"} {...(service.title === 'In Logo Quảng Bá' ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex items-center text-[13px] font-bold text-slate-900 uppercase tracking-widest group/link">
                    Chi Tiết <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Consultant Section - NEW */}
      <section id="ai-consultant" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#33C1E3,transparent_30%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 text-[#33C1E3] font-bold tracking-widest uppercase text-xs mb-6">
                <Sparkles size={16} /> Chuyên Gia AI Của Bạn
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                Lên Ý Tưởng Tiệc <br/> 
                <span className="text-slate-500 italic">Chỉ Trong 30 Giây</span>
              </h2>
              <p className="text-slate-400 text-lg font-light mb-10 leading-relaxed">
                Đừng lo lắng nếu bạn chưa có ý tưởng. Trí tuệ nhân tạo của Bong Bóng Xinh sẽ gợi ý phong cách trang trí phù hợp nhất với ngân sách và quy mô bữa tiệc của bạn.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                <form onSubmit={handleGetAiAdvice} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Loại Hình Tiệc</label>
                      <select 
                        value={partyType}
                        onChange={(e) => setPartyType(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#33C1E3] transition-colors appearance-none"
                      >
                        <option value="Thôi nôi">Thôi nôi / Sinh nhật bé</option>
                        <option value="Đám cưới">Đám cưới / Kỷ niệm</option>
                        <option value="Khai trương">Khai trương / Sự kiện</option>
                        <option value="Tiệc tùng">Tiệc ngoài trời / Pool Party</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Ngân Sách Dự Kiến</label>
                      <select 
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#33C1E3] transition-colors appearance-none"
                      >
                        <option value="Dưới 5 triệu">Dưới 5.000.000đ</option>
                        <option value="5-15 triệu">5.000.000đ - 15.000.000đ</option>
                        <option value="Trên 20 triệu">Trên 20.000.000đ</option>
                        <option value="Tầm trung">Tầm trung (Liên hệ tư vấn)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Số Lượng Khách</label>
                    <select 
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#33C1E3] transition-colors appearance-none"
                    >
                      <option value="Dưới 30 khách">Dưới 30 khách</option>
                      <option value="30-50 khách">30 - 50 khách</option>
                      <option value="50-100 khách">50 - 100 khách</option>
                      <option value="Trên 100 khách">Trên 100 khách</option>
                    </select>
                  </div>

                  <button 
                    disabled={isAiLoading}
                    className="w-full bg-[#33C1E3] text-slate-900 font-bold py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isAiLoading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                    {isAiLoading ? 'Đang Phân Tích...' : 'Nhận Tư Vấn Ngay'}
                  </button>
                </form>
              </div>
            </div>
            
            <div className="relative">
              <div id="ai-result" className={`transition-all duration-700 ${aiAdvice ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none absolute'}`}>
                <div className="bg-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6">
                    <MessageSquare className="text-slate-100 w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-serif font-bold text-slate-900 mb-6">Gợi Ý Từ Bong Bóng Xinh</h4>
                    <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                      {aiAdvice}
                    </div>
                    <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                      <p className="text-xs text-slate-400">Tư vấn hoàn thành bởi BongBongXinh AI</p>
                      <a href="tel:0909084174" className="text-[#33C1E3] font-bold text-sm flex items-center gap-2">
                        Gọi Chốt Ngay <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {!aiAdvice && !isAiLoading && (
                <div className="reveal reveal-delay-300">
                  <img src={NEW_CONSULT_IMG} alt="Tư vấn miễn phí" className="w-full max-w-md mx-auto rounded-3xl animate-float" />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white px-8 py-6 rounded-2xl shadow-xl border border-slate-100 w-max">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hotline 24/7</p>
                        <p className="text-xl font-bold text-slate-900">0909.084.174</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {isAiLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-white">
                  <Loader2 className="w-16 h-16 animate-spin text-[#33C1E3] mb-6" />
                  <p className="text-xl font-serif">Đang phân tích dữ liệu...</p>
                  <p className="text-slate-400 text-sm mt-2">Chờ xíu nhé, chúng mình đang tìm phong cách phù hợp nhất!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate In-Logo Section */}
      <section id="in-logo" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 reveal">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-64 bg-slate-100 rounded-3xl p-8 flex flex-col justify-end">
                      <Layers className="text-[#33C1E3] mb-4" size={32} />
                      <h4 className="text-xl font-bold text-slate-900">Bền Màu</h4>
                      <p className="text-slate-500 text-sm">Công nghệ in lụa 3 lớp.</p>
                    </div>
                    <img src="https://trangtrisinhnhat.com/wp-content/uploads/2021/12/Bong-bong-sinh-nhat-phi-hanh-gia.jpg" className="h-48 w-full object-cover rounded-3xl" alt="Balloon printing" />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img src={NEW_CONSULT_IMG} className="h-48 w-full object-cover rounded-3xl" alt="Consultation banner" />
                    <div className="h-64 bg-slate-900 rounded-3xl p-8 flex flex-col justify-end text-white">
                      <Clock className="text-[#33C1E3] mb-4" size={32} />
                      <h4 className="text-xl font-bold">24H</h4>
                      <p className="text-slate-400 text-sm">Giao hàng cực nhanh.</p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="order-1 lg:order-2 reveal">
                <span className="text-[#33C1E3] font-bold tracking-widest uppercase text-xs mb-4 block">Bong Bóng In Logo</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">Nâng Tầm Nhận Diện <br/> Thương Hiệu Doanh Nghiệp</h2>
                <p className="text-slate-600 text-lg font-light mb-8 leading-relaxed">
                  Giải pháp quảng bá thông minh, chi phí thấp nhưng mang lại hiệu ứng thị giác cực kỳ ấn tượng tại các sự kiện khai trương, lễ hội, workshop.
                </p>
                <div className="space-y-4 mb-10">
                  {['Mực in nhập khẩu, không bong tróc.', 'Đáp ứng số lượng lớn (10k+ bóng/ngày).', 'Hỗ trợ thiết kế file in miễn phí.'].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle2 className="text-[#33C1E3] w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{text}</span>
                    </div>
                  ))}
                </div>
                <a href={IN_LOGO_LINK} target="_blank" rel="noopener noreferrer" className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-[#33C1E3] transition-all inline-block shadow-lg">
                  Nhận Báo Giá In Logo
                </a>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Khách Hàng Chia Sẻ"
            subtitle="Hạnh phúc của chúng tôi là được góp phần tạo nên những kỷ niệm đẹp của bạn."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={t.id} className="bg-white p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-500 reveal">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-slate-600 italic mb-8 leading-relaxed font-light">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="lien-he" className="bg-slate-900 text-slate-400 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-20 border-b border-white/5 pb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-8 p-1">
                <img src={LOGO_URL} alt="Bong Bong Xinh" className="w-full h-full object-contain" />
              </div>
              <p className="text-sm leading-relaxed mb-8 pr-4">
                Đơn vị dẫn đầu trong nghệ thuật trang trí bong bóng tại Việt Nam. Chúng tôi mang đến sự sang trọng và khác biệt cho mọi sự kiện.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#33C1E3] hover:text-white transition-all"><Facebook size={20} /></a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#33C1E3] hover:text-white transition-all"><Instagram size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-8">Hạng Mục Trang Trí</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><a href="#" className="hover:text-white transition-colors">Trang trí thôi nôi cao cấp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cổng chào sự kiện nghệ thuật</a></li>
                <li><a href={IN_LOGO_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">In logo bong bóng quảng cáo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Backdrop Check-in chuyên nghiệp</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-8">Về Chúng Tôi</h4>
              <ul className="space-y-4 text-sm font-light">
                <li><a href="#" className="hover:text-white transition-colors">Dự án đã thực hiện</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chính sách thi công</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Báo giá tổng hợp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[11px] mb-8">Kết Nối Với Chúng Tôi</h4>
              <ul className="space-y-5 text-sm font-light">
                <li className="flex items-center gap-4"><Phone size={18} className="text-[#33C1E3]" /> 0909.084.174</li>
                <li className="flex items-center gap-4"><Mail size={18} className="text-[#33C1E3]" /> admin@bongbongxinh.com</li>
                <li className="flex items-start gap-4"><Target size={18} className="text-[#33C1E3] mt-1" /> 17/14 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <p>© 2024 Bong Bóng Xinh. Tất cả quyền được bảo lưu.</p>
            <p className="mt-4 md:mt-0">Thiết kế bởi 52Growth.</p>
          </div>
        </div>
      </footer>
      
      {/* Sticky Support */}
      <div className="fixed bottom-safe right-4 md:right-8 z-40 flex flex-col gap-4">
        <a 
          href="https://zalo.me/0909084174" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#0068FF] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
        >
          <span className="font-bold text-[10px]">ZALO</span>
          <div className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Chat Zalo Ngay</div>
        </a>
        <a 
          href="tel:0909084174" 
          className="bg-[#33C1E3] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-bounce relative group"
        >
          <Phone size={24} />
          <div className="absolute right-full mr-4 bg-[#33C1E3] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Gọi Hotline</div>
        </a>
      </div>
    </div>
  );
};

export default App;
