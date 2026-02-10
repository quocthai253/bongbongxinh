
import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  PartyPopper, 
  Store, 
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
  Send,
  Loader2,
  Star,
  Award,
  Waves,
  Printer,
  Zap,
  Target,
  BarChart3,
  Layers
} from 'lucide-react';
import { Service, Feature } from './types';
import { getDecorAdvice } from './services/geminiService';

const LOGO_URL = "http://www.bongbongxinh.com/wp-content/uploads/2026/02/cropped-admin-ajax-1.png";

// --- Sub-components ---

// Enhanced Floating Balloon with delay support for natural movement
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
    <div className={`absolute pointer-events-none animate-float ${delayClass} hidden md:block ${className}`}>
      <div className={`${size} rounded-[50%_50%_50%_50%/40%_40%_60%_60%] relative shadow-2xl overflow-hidden backdrop-blur-[1px]`} style={{ background: gradient }}>
        <div className="absolute top-[15%] left-[15%] w-[20%] h-[20%] bg-white/40 rounded-full blur-[3px]"></div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px] border-b-inherit opacity-80" style={{ borderBottomColor: '#33C1E3' }}></div>
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[0.5px] h-12 bg-gradient-to-b from-cyan-400/50 to-transparent"></div>
      </div>
    </div>
  );
};

const SectionHeading = ({ badge, title, subtitle, light = false }: { badge?: string, title: string, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-12 md:mb-24 px-4 reveal">
    {badge && (
      <span className="inline-block py-2 px-6 rounded-full border border-[#33C1E3]/30 text-[#33C1E3] text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8 bg-white/50 backdrop-blur-sm">
        {badge}
      </span>
    )}
    <h2 className={`text-3xl md:text-7xl font-serif font-bold mb-6 md:mb-8 leading-tight ${light ? 'text-white' : 'text-slate-900'} ${!light ? 'text-shimmer' : ''}`}>
      {title}
    </h2>
    {subtitle && <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light ${light ? 'text-slate-300' : 'text-slate-500'}`}>{subtitle}</p>}
    <div className="w-24 md:w-32 h-1 blue-gradient mx-auto mt-6 md:mt-10 rounded-full opacity-60"></div>
  </div>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [adviceResult, setAdviceResult] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [formData, setFormData] = useState({ partyType: '', budget: '', guests: '' });

  // Scroll Observer for "Reveal" animation
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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

  const services: Service[] = [
    {
      id: '1',
      title: 'Sinh Nhật & Thôi Nôi',
      description: 'Hiện thực hóa thế giới thần tiên với những cụm bóng nghệ thuật tinh xảo cho bé yêu.',
      icon: <PartyPopper className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '2',
      title: 'Tiệc Cưới & Kỷ Niệm',
      description: 'Lộng lẫy và tinh khôi với các thiết kế bóng Jumbo phối cùng hoa tươi và lụa cao cấp.',
      icon: <Heart className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '3',
      title: 'Sự Kiện Doanh Nghiệp',
      description: 'Thu hút mọi ánh nhìn với cổng chào rực rỡ và backdrop chuyên nghiệp cho khai trương.',
      icon: <Award className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '4',
      title: 'In Logo Bong Bóng Bay',
      description: 'Giải pháp quảng bá thương hiệu sáng tạo với in logo sắc nét trên bong bóng bay cao cấp.',
      icon: <Printer className="w-5 h-5" />,
      image: 'https://drawmarketing.wordpress.com/wp-content/uploads/2020/07/in-bong-bc3b3ng-theo-yc3aau-c-u5.jpg?w=1024'
    },
    {
      id: '5',
      title: 'Bóng Jumbo In Tên',
      description: 'Dòng sản phẩm quà tặng cá nhân hóa đỉnh cao với chất lượng mực in bền bỉ theo thời gian.',
      icon: <Gift className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const features: Feature[] = [
    {
      title: 'Sáng Tạo Không Giới Hạn',
      description: 'Mỗi concept là một câu chuyện riêng biệt được nghệ nhân chúng tôi thổi hồn vào.',
      icon: <Sparkles className="text-[#33C1E3]" />
    },
    {
      title: 'Thi Công Thần Tốc',
      description: 'Cam kết tiến độ tuyệt đối, đảm bảo không gian hoàn hảo trước giờ đón khách.',
      icon: <Clock className="text-[#33C1E3]" />
    },
    {
      title: 'Vật Liệu An Toàn',
      description: 'Bóng nhập khẩu từ các thương hiệu hàng đầu, an toàn cho trẻ em và thân thiện môi trường.',
      icon: <ShieldCheck className="text-[#33C1E3]" />
    },
    {
      title: 'Tư Vấn Chuyên Sâu',
      description: 'Hỗ trợ khảo sát mặt bằng và lên bản vẽ phác thảo 3D cho các sự kiện lớn.',
      icon: <CheckCircle2 className="text-[#33C1E3]" />
    }
  ];

  const handleGetAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.partyType) return;
    setLoadingAdvice(true);
    const result = await getDecorAdvice(formData.partyType, formData.budget, formData.guests);
    setAdviceResult(result);
    setLoadingAdvice(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-xl py-3' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-white p-1.5 md:p-2 rounded-xl shadow-md border border-slate-100 transition-transform group-hover:scale-105">
              <img src={LOGO_URL} alt="Bong Bóng Xinh" className={`transition-all duration-500 ${scrolled ? 'h-8 md:h-10' : 'h-10 md:h-14'}`} />
            </div>
            <div className="hidden sm:block">
              <span className={`block text-lg md:text-xl font-serif font-bold tracking-wider leading-none text-slate-900`}>BONG BÓNG XINH</span>
              <span className="text-[8px] md:text-[9px] font-black tracking-[0.3em] md:tracking-[0.4em] text-[#33C1E3] uppercase">Exquisite Decoration</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
            {['dich-vu', 'in-logo-spotlight', 'tu-van-ai', 'lien-he'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className={`${item === 'lien-he' ? 'blue-gradient text-white px-8 py-3.5 rounded-full hover:shadow-2xl hover:scale-105 transition-all active:scale-95 btn-luxury' : 'hover:text-[#33C1E3] transition-colors relative group py-2'}`}
              >
                {item === 'dich-vu' ? 'Dịch vụ' : item === 'in-logo-spotlight' ? 'In Logo' : item === 'tu-van-ai' ? 'Tư vấn' : 'Liên hệ ngay'}
                {item !== 'lien-he' && <span className="absolute bottom-0 left-0 w-0 h-0.5 blue-gradient transition-all duration-300 group-hover:w-full"></span>}
              </a>
            ))}
          </div>

          <button className="md:hidden p-2 text-slate-900 bg-white/50 backdrop-blur rounded-lg border border-slate-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'}`}>
          <div className="flex flex-col p-6 gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-700">
            <a href="#dich-vu" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-slate-50">Dịch vụ</a>
            <a href="#in-logo-spotlight" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-slate-50">In Logo</a>
            <a href="#tu-van-ai" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-slate-50">Tư vấn</a>
            <a href="#lien-he" onClick={() => setIsMenuOpen(false)} className="blue-gradient text-white px-6 py-4 rounded-xl text-center shadow-lg">Liên hệ ngay</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm66-3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-46-15c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm39-33c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM25 26c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm18 40c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z' fill='%2333C1E3' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
        
        <FloatingBalloon className="top-40 left-[10%] opacity-40 scale-125" color="cyan" delayClass="float-delay-1" />
        <FloatingBalloon className="bottom-40 right-[15%] opacity-30 scale-150" color="navy" delayClass="float-delay-2" />
        <FloatingBalloon className="top-60 right-[5%] opacity-20 scale-110" color="white" delayClass="float-delay-3" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
          <div className="space-y-6 md:space-y-10 text-center lg:text-left reveal">
            <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-cyan-100 shadow-sm mx-auto lg:mx-0 hover:scale-105 transition-transform">
              <Waves className="w-4 h-4 text-[#33C1E3] animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] text-[#33C1E3] uppercase">Luxury Balloon Artistry</span>
            </div>
            
            <h1 className="text-4xl md:text-8xl font-serif font-bold text-slate-900 leading-[1.1] md:leading-[1.05]">
              Nâng tầm <br /><span className="blue-text">Khoảnh khắc</span> mơ ước
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 md:max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
              Bong Bóng Xinh mang đến những trải nghiệm trang trí thượng lưu, nơi mỗi quả bóng là một tác phẩm nghệ thuật góp phần tạo nên kỉ niệm vô giá.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start pt-4">
              <a href="#lien-he" className="group relative px-10 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-2xl md:rounded-[2rem] font-bold overflow-hidden transition-all btn-luxury shadow-lg shadow-blue-900/20">
                <span className="relative z-10 flex items-center justify-center gap-3 text-xs md:text-sm tracking-widest uppercase font-black">Nhận Báo Giá <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></span>
              </a>
              <a href="#dich-vu" className="px-10 md:px-12 py-4 md:py-5 bg-transparent text-slate-900 rounded-2xl md:rounded-[2rem] font-bold border border-slate-200 hover:border-[#33C1E3] hover:text-[#33C1E3] transition-all text-xs md:text-sm tracking-widest uppercase font-black hover:bg-white hover:shadow-lg">
                Dịch Vụ Trọn Gói
              </a>
            </div>
          </div>
          
          <div className="relative mt-12 lg:mt-0 reveal reveal-delay-200">
            <div className="absolute -inset-10 bg-[#33C1E3]/10 rounded-full filter blur-3xl animate-pulse hidden md:block"></div>
            <div className="relative grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-6 space-y-4 md:space-y-6 pt-8 md:pt-16">
                <div className="rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl luxury-shadow group relative transform hover:-translate-y-2 transition-all duration-700">
                  <img src="https://m.media-amazon.com/images/I/61BBgKjcJjL.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Bong bóng hoa cúc trắng" fetchPriority="high" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent"></div>
                </div>
                <div className="rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl luxury-shadow group aspect-[4/5] relative transform hover:-translate-y-2 transition-all duration-700">
                  <img src="https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Decoration 2" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent"></div>
                </div>
              </div>
              <div className="col-span-6 space-y-4 md:space-y-6">
                <div className="rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl luxury-shadow group aspect-square relative transform hover:-translate-y-2 transition-all duration-700">
                  <img src="https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Decoration 3" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent"></div>
                </div>
                <div className="rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl luxury-shadow group relative transform hover:-translate-y-2 transition-all duration-700">
                  <img src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Decoration 4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="dich-vu" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeading 
            badge="Premium Collections"
            title="Dịch Vụ Đặc Quyền"
            subtitle="Mỗi bữa tiệc là một tác phẩm duy nhất, được đo ni đóng giày theo gu thẩm mỹ của từng khách hàng."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, idx) => (
              <div key={service.id} className={`reveal reveal-delay-${(idx % 3) * 100} group bg-[#F8FAFC] rounded-3xl md:rounded-[3rem] overflow-hidden transition-all duration-500 border border-slate-100 flex flex-col hover:-translate-y-4 luxury-shadow`}>
                <div className="h-56 md:h-72 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    loading="lazy" 
                    decoding="async" 
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-4 md:top-8 left-4 md:left-8 w-10 md:w-12 h-10 md:h-12 bg-white/90 backdrop-blur rounded-xl md:rounded-2xl flex items-center justify-center text-[#33C1E3] shadow-lg group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-4 md:mb-5 group-hover:text-[#33C1E3] transition-colors">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 md:mb-8 flex-grow font-light">{service.description}</p>
                  <button className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#33C1E3] flex items-center gap-3 group/btn">
                    Khám phá <div className="w-8 md:w-10 h-[1px] bg-[#33C1E3] group-hover/btn:w-16 transition-all duration-500"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICE SPOTLIGHT: Logo Printing */}
      <section id="in-logo-spotlight" className="py-20 md:py-32 bg-slate-900 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[100px] md:blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/10 rounded-full blur-[100px] md:blur-[120px] translate-y-1/2 -translate-x-1/2 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-8 md:space-y-12 reveal">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 md:px-6 py-2.5 md:py-3 rounded-full backdrop-blur-md">
                <Printer className="w-4 md:w-5 h-4 md:h-5 text-[#33C1E3]" />
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white">Đối tác doanh nghiệp</span>
              </div>
              
              <h2 className="text-4xl md:text-8xl font-serif font-bold text-white leading-[1.2] md:leading-[1.1]">
                Chiến lược <br />
                <span className="blue-text italic font-normal">Quảng Bá</span> <br />
                Bằng Bong Bóng In Logo
              </h2>
              
              <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-xl">
                Dịch vụ in logo chuyên nghiệp của Bong Bóng Xinh biến những quả bóng bay thành "đại sứ thương hiệu" linh động. Với công nghệ in sắc nét vượt trội, chúng tôi giúp thương hiệu của bạn phủ sóng mọi không gian sự kiện.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 md:gap-10 pt-2">
                <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-3xl md:rounded-[2.5rem] hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="w-10 md:w-12 h-10 md:h-12 blue-gradient rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Layers className="w-5 md:w-6 h-5 md:h-6" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">In Sắc Nét 3 Lớp</h4>
                  <p className="text-xs md:text-sm text-slate-400 font-light">Độ phân giải cao, mực in chuyên dụng không bong tróc, giữ màu tươi sáng suốt sự kiện.</p>
                </div>
                
                <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-3xl md:rounded-[2.5rem] hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="w-10 md:w-12 h-10 md:h-12 blue-gradient rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Target className="w-5 md:w-6 h-5 md:h-6" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Khai Trương & Sự Kiện</h4>
                  <p className="text-xs md:text-sm text-slate-400 font-light">Tạo hiệu ứng thu hút mạnh mẽ, là món quà tặng thương hiệu yêu thích của mọi khách hàng.</p>
                </div>
              </div>
              
              <div className="pt-4 text-center lg:text-left">
                <a href="#lien-he" className="inline-flex items-center gap-4 bg-white text-slate-900 px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] hover:bg-[#33C1E3] hover:text-white transition-all btn-luxury shadow-2xl">
                   Nhận báo giá in Logo Sỉ <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="relative reveal reveal-delay-200">
              <div className="absolute -inset-10 bg-[#33C1E3]/20 rounded-full blur-[100px] animate-pulse hidden md:block"></div>
              <div className="relative rounded-3xl md:rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-2xl luxury-shadow group">
                <img 
                  src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200" 
                  alt="Corporate Balloon Branding" 
                  className="w-full h-[400px] md:h-[700px] object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[2000ms]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                
                {/* Floating Tags */}
                <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 bg-white/10 backdrop-blur-xl p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/10 hover:bg-white/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#33C1E3] mb-1">Dự án quy mô lớn</p>
                      <p className="text-white font-serif text-lg md:text-2xl font-bold">In Logo Doanh Nghiệp</p>
                    </div>
                    <div className="hidden sm:flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 md:w-10 h-8 md:h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden hover:-translate-y-1 transition-transform">
                           <img src={`https://i.pravatar.cc/40?img=${i+20}`} alt="client" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="vi-sao-chon" className="py-20 md:py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm66-3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-46-15c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm39-33c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM25 26c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm18 40c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z' fill='%2333C1E3' fill-opacity='0.6' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading 
            badge="Our Quality"
            title="Đẳng Cấp Làm Nên Sự Khác Biệt"
            subtitle="Từ chất liệu đến quy trình thi công, Bong Bóng Xinh luôn đặt tiêu chuẩn cao nhất cho sự hài lòng của bạn."
            light
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {features.map((feature, idx) => (
              <div key={idx} className={`reveal reveal-delay-${(idx % 4) * 100} group text-center`}>
                <div className="w-20 md:w-24 h-20 md:h-24 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 transition-all duration-700 group-hover:bg-[#33C1E3] group-hover:scale-110 group-hover:rotate-6">
                  <div className="text-3xl md:text-4xl transition-colors group-hover:text-white">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-serif font-bold text-white mb-4">{feature.title}</h4>
                <p className="text-slate-400 text-sm font-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 md:mt-32 rounded-3xl md:rounded-[4rem] overflow-hidden relative group h-[300px] md:h-[500px] shadow-2xl reveal">
            <img 
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1600" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" 
              alt="Gallery" 
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent flex flex-col md:flex-row items-center md:items-end justify-between p-8 md:p-16 text-center md:text-left">
              <div className="text-white max-w-lg mb-6 md:mb-0">
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-3 md:mb-4">Dấu Ấn Kỉ Niệm</h3>
                <p className="text-slate-200 font-light text-sm md:text-base">Mỗi dự án là một kiệt tác tâm huyết từ đội ngũ nghệ nhân lành nghề.</p>
              </div>
              <button className="bg-white text-slate-900 px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-[#33C1E3] hover:text-white transition-all btn-luxury">
                Xem Thư Viện Ảnh
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Consulting Concierge */}
      <section id="tu-van-ai" className="py-20 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl md:rounded-[4rem] p-8 md:p-24 shadow-2xl border border-slate-100 relative overflow-hidden luxury-shadow reveal">
            <div className="absolute top-0 right-0 w-60 md:w-80 h-60 md:h-80 blue-gradient opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] md:blur-[100px]"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12 md:mb-20">
                <div className="inline-flex items-center gap-3 bg-[#33C1E3]/10 px-5 md:px-6 py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#33C1E3] mb-6 md:mb-8">
                  <Sparkles className="w-4 h-4" /> Smart Design Concierge
                </div>
                <h2 className="text-3xl md:text-6xl font-serif font-bold text-slate-900 mb-6 md:mb-8 leading-tight">Kiến Tạo Ý Tưởng Thông Minh</h2>
                <p className="text-slate-500 font-light text-lg md:text-xl leading-relaxed">
                  Trí tuệ nhân tạo sẽ giúp bạn phác thảo concept trang trí dựa trên loại tiệc và ngân sách đầu tư.
                </p>
              </div>

              <form onSubmit={handleGetAdvice} className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="space-y-3 md:space-y-4 input-underline group">
                  <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Chủ đề tiệc</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-slate-700 focus:outline-none focus:bg-white transition-all font-medium text-sm cursor-pointer hover:bg-white"
                    onChange={(e) => setFormData({...formData, partyType: e.target.value})}
                    value={formData.partyType}
                    required
                  >
                    <option value="">Chọn loại tiệc...</option>
                    <option value="Sinh nhật bé trai/bé gái">Sinh nhật cho bé</option>
                    <option value="Tiệc cưới sang trọng">Tiệc cưới (Wedding)</option>
                    <option value="Khai trương & Sự kiện">Khai trương/Sự kiện</option>
                    <option value="Tiệc sinh nhật người lớn">Sinh nhật người lớn</option>
                    <option value="In logo bong bóng quảng bá doanh nghiệp">In logo thương hiệu</option>
                  </select>
                </div>
                <div className="space-y-3 md:space-y-4 input-underline group">
                  <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Ngân sách dự kiến</label>
                  <input 
                    type="text" 
                    placeholder="VD: 5 - 15 triệu"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all font-medium text-sm"
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    value={formData.budget}
                    required
                  />
                </div>
                <div className="space-y-3 md:space-y-4 flex flex-col justify-end">
                  <button 
                    type="submit"
                    disabled={loadingAdvice}
                    className="w-full blue-gradient text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 btn-luxury shadow-lg shadow-blue-500/30"
                  >
                    {loadingAdvice ? <Loader2 className="animate-spin w-5 h-5" /> : <>Bắt đầu tư vấn <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>
              </form>

              {adviceResult && (
                <div className="bg-[#33C1E3]/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-[#33C1E3]/10 animate-in fade-in slide-in-from-bottom-12 duration-700">
                  <div className="flex items-center gap-4 mb-8 md:mb-10">
                    <div className="w-10 md:w-12 h-10 md:h-12 blue-gradient rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                      <Star className="w-5 md:w-6 h-5 md:h-6" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-serif font-bold text-slate-900">Concept Đề Xuất Độc Quyền</h4>
                  </div>
                  <div className="text-slate-600 leading-[1.8] whitespace-pre-line text-base md:text-lg font-light">
                    {adviceResult}
                  </div>
                  <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-[#33C1E3]/10 flex flex-col sm:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">
                    <p className="text-xs italic text-slate-400">Concept này được tạo riêng cho yêu cầu của bạn.</p>
                    <a href="#lien-he" className="blue-gradient text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all btn-luxury w-full sm:w-auto text-center">Chat Cùng Nghệ Nhân</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="lien-he" className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 md:gap-32 items-start">
          <div className="lg:sticky lg:top-32 text-center lg:text-left">
            <SectionHeading 
              badge="Get In Touch"
              title="Khởi Đầu Của Một Bữa Tiệc Đẹp"
              subtitle="Hãy để chuyên gia của chúng tôi hiện thực hóa ý tưởng của bạn ngay hôm nay."
            />
            
            <div className="grid sm:grid-cols-2 gap-10 md:gap-16">
              <div className="space-y-2 reveal reveal-delay-100">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#33C1E3]">Hotline / Zalo</p>
                <p className="text-2xl md:text-3xl font-serif font-bold text-slate-900 hover:text-[#33C1E3] transition-colors cursor-pointer">0909084174</p>
                <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest">Ms. Quỳnh Giang</p>
              </div>
              <div className="space-y-2 reveal reveal-delay-200">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#33C1E3]">Email Contact</p>
                <p className="text-xl md:text-2xl font-serif font-bold text-slate-900 break-words hover:text-[#33C1E3] transition-colors cursor-pointer">admin@bongbongxinh.com</p>
              </div>
              <div className="space-y-4 col-span-full reveal reveal-delay-300">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#33C1E3]">Social Media</p>
                <div className="flex gap-6 pt-2 justify-center lg:justify-start">
                  <a href="https://www.facebook.com/Bongbongxinhcom" target="_blank" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 hover:text-white hover:bg-[#1877F2] hover:shadow-xl hover:-translate-y-2 transition-all border border-slate-100"><Facebook /></a>
                  <a href="https://www.instagram.com/bongbongxinh_official" target="_blank" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:shadow-xl hover:-translate-y-2 transition-all border border-slate-100"><Instagram /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-6 sm:p-12 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 luxury-shadow relative reveal">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8 md:mb-12 text-slate-900 text-center lg:text-left">Gửi Yêu Cầu Tư Vấn</h3>
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
                <div className="space-y-2 group input-underline">
                  <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Tên của bạn</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 focus:outline-none focus:border-transparent transition-all font-light text-base md:text-lg placeholder:text-slate-300" 
                    placeholder="Nhập tên..." 
                  />
                </div>
                <div className="space-y-2 group input-underline">
                  <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Điện thoại</label>
                  <input 
                    type="tel" 
                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 focus:outline-none focus:border-transparent transition-all font-light text-base md:text-lg placeholder:text-slate-300" 
                    placeholder="Nhập số..." 
                  />
                </div>
              </div>
              <div className="space-y-2 group input-underline">
                <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Ngân sách dự kiến</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b-2 border-slate-200 py-3 focus:outline-none focus:border-transparent transition-all font-light text-base md:text-lg placeholder:text-slate-300" 
                  placeholder="VD: 5.000.000đ - 10.000.000đ" 
                />
              </div>
              <div className="space-y-2 group input-underline">
                <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Lời nhắn cho chúng tôi</label>
                <textarea 
                  rows={3} 
                  className="w-full bg-transparent border-b-2 border-slate-200 py-3 focus:outline-none focus:border-transparent transition-all font-light text-base md:text-lg resize-none placeholder:text-slate-300" 
                  placeholder="Hãy mô tả sự kiện của bạn..."
                ></textarea>
              </div>
              <button className="w-full py-5 md:py-6 blue-gradient text-white rounded-2xl md:rounded-3xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] hover:shadow-2xl transition-all duration-500 shadow-xl group btn-luxury mt-4">
                <span className="flex items-center justify-center gap-4">Gửi Thông Tin <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" /></span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-24">
            <div className="sm:col-span-2 space-y-8 md:space-y-12 reveal">
              <div className="bg-white p-2.5 md:p-3 rounded-2xl w-fit shadow-2xl">
                <img src={LOGO_URL} alt="Bong Bóng Xinh" className="h-12 md:h-16" loading="lazy" decoding="async" />
              </div>
              <p className="text-xl md:text-2xl font-serif font-light leading-relaxed max-w-md italic text-slate-300">
                "Kiến tạo những giấc mơ, lưu giữ những khoảnh khắc - Bong Bóng Xinh cam kết chất lượng nghệ thuật trong từng chi tiết."
              </p>
            </div>
            
            <div className="reveal reveal-delay-100">
              <h4 className="text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12">Sitemap</h4>
              <ul className="space-y-4 md:space-y-6 text-sm font-light">
                <li><a href="#dich-vu" className="hover:text-[#33C1E3] transition-colors">Dịch vụ đặc quyền</a></li>
                <li><a href="#in-logo-spotlight" className="hover:text-[#33C1E3] transition-colors">Dịch vụ in Logo</a></li>
                <li><a href="#vi-sao-chon" className="hover:text-[#33C1E3] transition-colors">Về chúng tôi</a></li>
                <li><a href="#tu-van-ai" className="hover:text-[#33C1E3] transition-colors">Tư vấn thông minh</a></li>
              </ul>
            </div>

            <div className="reveal reveal-delay-200">
              <h4 className="text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12">Thông Tin Liên Hệ</h4>
              <ul className="space-y-4 md:space-y-6 text-sm font-light">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#33C1E3]" /> 0909084174</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#33C1E3] shrink-0" /> admin@bongbongxinh.com</li>
                <li className="text-xs opacity-60">Địa chỉ: Hệ thống chi nhánh toàn quốc</li>
                <li className="text-[#33C1E3] font-bold">Hỗ trợ khách hàng: 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-center md:text-left">
            <p className="text-slate-500">© 2024 Bong Bóng Xinh. Crafting Memories with Luxury Art.</p>
            <p>Designed by <span className="text-[#33C1E3]">52Growth.com</span></p>
          </div>
        </div>
      </footer>

      {/* Persistent Sticky Contact */}
      <div className="fixed bottom-6 md:bottom-12 right-6 md:right-12 z-50 flex flex-col gap-4 md:gap-6 pointer-events-none">
        <a href="https://zalo.me/0909084174" target="_blank" className="pointer-events-auto w-14 md:w-16 h-14 md:h-16 bg-[#33C1E3] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform luxury-shadow group">
          <span className="font-black text-[9px] md:text-[10px] tracking-widest">ZALO</span>
        </a>
        <a href="tel:0909084174" className="pointer-events-auto w-14 md:w-16 h-14 md:h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-float shadow-cyan-500/20">
          <Phone className="w-6 md:w-7 h-6 md:h-7" />
        </a>
      </div>
    </div>
  );
};

export default App;
    