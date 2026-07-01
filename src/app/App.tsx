import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowUp, Star, Check, Phone, Mail, MapPin, Clock,
  Dumbbell, Zap, Heart, Target, Award, Users, Shield, TrendingUp,
  Instagram, Facebook, Twitter, Youtube, ArrowRight,
  ChevronLeft, ChevronRight, Flame, Activity, Leaf, BarChart2,
  Send, Calculator, CheckCircle2, ChevronDown,
} from "lucide-react";

// ─── DISPLAY / BODY FONT SHORTHANDS ──────────────────────────────────────────
const DISPLAY = "'Barlow Condensed', sans-serif";
const MONO = "'DM Mono', monospace";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Trainers", href: "#trainers" },
  { label: "Membership", href: "#membership" },
  { label: "Schedule", href: "#schedule" },
  { label: "Contact", href: "#contact" },
];

const PROGRAMS = [
  { title: "Strength & Muscle", icon: Dumbbell, img: "1613845205719-8c87760ab728", tag: "Power", desc: "Build raw strength with science-backed progressive overload protocols and expert coaching." },
  { title: "Weight Loss", icon: TrendingUp, img: "1541534741688-6078c6bfb5c5", tag: "Transform", desc: "Sustainable fat loss through metabolic conditioning, nutrition guidance, and real accountability." },
  { title: "CrossFit Training", icon: Zap, img: "1526506118085-60ce8714f8c5", tag: "Intensity", desc: "Functional movements at high intensity — forge elite fitness and unbreakable mental toughness." },
  { title: "Cardio & Endurance", icon: Activity, img: "1534258936925-c58bed479fcb", tag: "Endurance", desc: "Push your aerobic capacity with VO2 max training, interval runs, and rowing circuits." },
  { title: "Functional Training", icon: Target, img: "1601422407692-ec4eeec1d9b3", tag: "Movement", desc: "Real-world movement patterns to improve mobility, coordination, and injury resistance." },
  { title: "Yoga & Flexibility", icon: Leaf, img: "1599901860904-17e6ed7083a0", tag: "Balance", desc: "Increase flexibility, build core stability, and restore your nervous system completely." },
  { title: "HIIT Workouts", icon: Flame, img: "1648542036561-e1d66a5ae2b1", tag: "Burn", desc: "High-intensity intervals engineered to torch calories and boost your metabolism for hours after." },
  { title: "Nutrition Coaching", icon: BarChart2, img: "1519311965067-36d3e5f33d39", tag: "Fuel", desc: "Personalized meal planning, macro tracking, and habit coaching from certified nutritionists." },
];

const TRAINERS = [
  { name: "Marcus Rhodes", role: "Head Strength Coach", exp: "14 Years", certs: ["NSCA-CSCS", "NASM-CPT", "Precision Nutrition L2"], img: "1606335543586-137481155deb", bio: "Former competitive powerlifter. Specializes in strength periodization and athletic performance for all levels." },
  { name: "Serena Voss", role: "Yoga & Mobility Specialist", exp: "10 Years", certs: ["RYT-500", "FRC Mobility Specialist", "NASM-CES"], img: "1554244933-d876deb6b2ff", bio: "Dedicated to restoring movement quality and mind-body connection through advanced yoga practice." },
  { name: "Dakota Byrne", role: "CrossFit & HIIT Expert", exp: "8 Years", certs: ["CF-L3 Trainer", "NSCA-CPT", "USA Weightlifting L1"], img: "1758875569897-5e214ccc4e17", bio: "CrossFit Regionals competitor passionate about unlocking athletic potential in every single client." },
  { name: "Layla Chen", role: "Nutrition & Weight Loss Coach", exp: "12 Years", certs: ["RD", "CSSD", "Precision Nutrition L2"], img: "1548690312-e3b507d8c110", bio: "Registered dietitian and strength coach transforming bodies through evidence-based nutrition." },
];

const STATS = [
  { value: 5200, suffix: "+", label: "Active Members", icon: Users },
  { value: 48, suffix: "", label: "Expert Trainers", icon: Award },
  { value: 24, suffix: "", label: "Awards Won", icon: Star },
  { value: 15, suffix: "+", label: "Years in Business", icon: Target },
];

const PLANS = [
  {
    name: "Basic",
    monthlyPrice: 49,
    annualPrice: 39,
    highlight: false,
    badge: null as string | null,
    features: ["Full Equipment Access", "Locker Room & Showers", "Free WiFi", "Mobile App Access", "2 Guest Passes / Month"],
    excluded: ["Group Classes", "Personal Training", "Nutrition Plan", "Spa Access"],
  },
  {
    name: "Premium",
    monthlyPrice: 89,
    annualPrice: 69,
    highlight: true,
    badge: "Most Popular" as string | null,
    features: ["Full Equipment Access", "Locker Room & Showers", "Free WiFi", "Mobile App Access", "Unlimited Group Classes", "Nutrition Consultation", "4 Guest Passes / Month"],
    excluded: ["Personal Training Sessions", "Spa Access"],
  },
  {
    name: "Elite",
    monthlyPrice: 149,
    annualPrice: 119,
    highlight: false,
    badge: "All Inclusive" as string | null,
    features: ["Full Equipment Access", "Locker Room & Showers", "Free WiFi", "Mobile App Access", "Unlimited Group Classes", "Full Nutrition Plan", "8 PT Sessions / Month", "Unlimited Guest Passes", "Spa & Recovery Access"],
    excluded: [],
  },
];

const SCHEDULE: Record<string, { time: string; name: string; trainer: string; duration: string; spots: number }[]> = {
  Monday: [
    { time: "6:00 AM", name: "Morning HIIT Blast", trainer: "Dakota Byrne", duration: "45 min", spots: 12 },
    { time: "9:00 AM", name: "Yoga Flow", trainer: "Serena Voss", duration: "60 min", spots: 15 },
    { time: "12:00 PM", name: "Strength Fundamentals", trainer: "Marcus Rhodes", duration: "60 min", spots: 10 },
    { time: "5:30 PM", name: "CrossFit WOD", trainer: "Dakota Byrne", duration: "60 min", spots: 18 },
    { time: "7:00 PM", name: "Pilates Core", trainer: "Serena Voss", duration: "45 min", spots: 4 },
  ],
  Tuesday: [
    { time: "7:00 AM", name: "Power Lifting", trainer: "Marcus Rhodes", duration: "60 min", spots: 8 },
    { time: "10:00 AM", name: "Cardio Endurance", trainer: "Layla Chen", duration: "45 min", spots: 20 },
    { time: "12:30 PM", name: "Functional Movement", trainer: "Dakota Byrne", duration: "45 min", spots: 14 },
    { time: "6:00 PM", name: "HIIT Circuit", trainer: "Layla Chen", duration: "45 min", spots: 3 },
    { time: "7:30 PM", name: "Stretching & Recovery", trainer: "Serena Voss", duration: "45 min", spots: 20 },
  ],
  Wednesday: [
    { time: "6:00 AM", name: "Morning CrossFit", trainer: "Dakota Byrne", duration: "60 min", spots: 18 },
    { time: "9:30 AM", name: "Body Sculpt", trainer: "Layla Chen", duration: "45 min", spots: 15 },
    { time: "12:00 PM", name: "Yoga & Meditation", trainer: "Serena Voss", duration: "75 min", spots: 12 },
    { time: "5:00 PM", name: "Olympic Lifting", trainer: "Marcus Rhodes", duration: "60 min", spots: 8 },
    { time: "7:00 PM", name: "Boxing Fitness", trainer: "Dakota Byrne", duration: "60 min", spots: 2 },
  ],
  Thursday: [
    { time: "7:00 AM", name: "Strength & Power", trainer: "Marcus Rhodes", duration: "60 min", spots: 10 },
    { time: "9:00 AM", name: "Vinyasa Yoga", trainer: "Serena Voss", duration: "60 min", spots: 15 },
    { time: "12:30 PM", name: "HIIT Tabata", trainer: "Dakota Byrne", duration: "45 min", spots: 20 },
    { time: "6:00 PM", name: "Weight Loss Circuit", trainer: "Layla Chen", duration: "50 min", spots: 5 },
    { time: "7:30 PM", name: "Core Fundamentals", trainer: "Marcus Rhodes", duration: "45 min", spots: 12 },
  ],
  Friday: [
    { time: "6:00 AM", name: "Friday Fury HIIT", trainer: "Dakota Byrne", duration: "50 min", spots: 20 },
    { time: "9:00 AM", name: "Pilates Flow", trainer: "Serena Voss", duration: "60 min", spots: 12 },
    { time: "12:00 PM", name: "Cardio Kickboxing", trainer: "Layla Chen", duration: "45 min", spots: 20 },
    { time: "5:30 PM", name: "Deadlift Workshop", trainer: "Marcus Rhodes", duration: "60 min", spots: 3 },
    { time: "7:00 PM", name: "Flexibility Masterclass", trainer: "Serena Voss", duration: "60 min", spots: 15 },
  ],
  Saturday: [
    { time: "8:00 AM", name: "Weekend Warrior CrossFit", trainer: "Dakota Byrne", duration: "75 min", spots: 20 },
    { time: "10:00 AM", name: "Nutrition Workshop", trainer: "Layla Chen", duration: "90 min", spots: 25 },
    { time: "12:00 PM", name: "Partner HIIT", trainer: "Dakota Byrne", duration: "45 min", spots: 7 },
    { time: "2:00 PM", name: "Restorative Yoga", trainer: "Serena Voss", duration: "75 min", spots: 15 },
  ],
  Sunday: [
    { time: "9:00 AM", name: "Active Recovery Flow", trainer: "Serena Voss", duration: "60 min", spots: 15 },
    { time: "11:00 AM", name: "Strength Assessment", trainer: "Marcus Rhodes", duration: "60 min", spots: 8 },
    { time: "1:00 PM", name: "Outdoor Bootcamp", trainer: "Dakota Byrne", duration: "60 min", spots: 25 },
  ],
};

const FAQS = [
  { q: "What are your operating hours?", a: "We're open Monday–Friday 5:00 AM to 11:00 PM, Saturday 6:00 AM to 10:00 PM, and Sunday 7:00 AM to 8:00 PM. Elite members enjoy 24/7 keycard access to the entire facility." },
  { q: "Can I freeze or pause my membership?", a: "Yes. Members can freeze their membership for up to 3 months per year for medical reasons or extended travel. A $10/month maintenance fee applies during the freeze period." },
  { q: "Do you offer a free trial?", a: "Absolutely. New members receive a complimentary 3-day trial pass that includes full facility access, one group class, and a fitness assessment with a certified trainer — no commitment required." },
  { q: "What is your cancellation policy?", a: "Memberships can be cancelled with 30 days written notice. No long-term contracts are required. We believe in earning your loyalty through results, not fine print." },
  { q: "Are personal training sessions included?", a: "Personal training is included in Elite memberships (8 sessions/month). Premium members can add sessions at a discounted $60 each. Basic members pay the standard $85/session rate." },
  { q: "Do you have nutrition support?", a: "Yes. Our certified sports dietitians offer one-on-one consultations, personalized meal plans, and macro tracking. Elite members receive ongoing monthly nutrition coaching included in their plan." },
  { q: "Is parking available?", a: "We provide free parking for up to 3 hours in our dedicated underground garage. Additional parking is available in nearby public lots at discounted member rates." },
  { q: "What equipment do you have?", a: "Our 18,000 sq ft facility features Olympic lifting platforms, a full powerlifting suite, 200+ cardio machines, functional training turf, dedicated yoga studios, infrared saunas, and a cold plunge pool." },
];

const TESTIMONIALS = [
  { name: "James Harrington", age: 34, result: "Lost 42 lbs in 5 months", stars: 5, text: "Forge completely changed my life. The trainers don't just guide you — they push you past limits you didn't know you had. I lost 42 pounds and gained a community I'll never leave.", program: "Weight Loss Program" },
  { name: "Anika Patel", age: 28, result: "Completed first marathon", stars: 5, text: "I came in as a total beginner and left as a marathon runner. The cardio program is meticulously designed. Serena's yoga sessions were the secret weapon for my recovery.", program: "Cardio & Endurance" },
  { name: "Ryan Kowalski", age: 41, result: "Added 180 lbs to squat", stars: 5, text: "Marcus is a wizard. In eight months my squat went from 185 to 365. The strength program is brutally effective — built for serious people who want serious results.", program: "Strength Program" },
  { name: "Priya Santos", age: 31, result: "Dropped 3 dress sizes", stars: 5, text: "The nutrition coaching alone is worth the Elite membership. Layla gave me a plan that didn't feel like a diet — it felt like fueling a machine. The results speak for themselves.", program: "Nutrition + HIIT" },
];

const FACILITIES = [
  { name: "Olympic Lifting Zone", img: "1734630341082-0fec0e10126c", desc: "6 dedicated platforms" },
  { name: "Cardio Deck", img: "1637870473618-8c9fa7d11f0a", desc: "100+ premium machines" },
  { name: "Functional Turf", img: "1534258936925-c58bed479fcb", desc: "5,000 sq ft open floor" },
  { name: "Yoga Studio", img: "1599901860904-17e6ed7083a0", desc: "Heated & non-heated rooms" },
  { name: "Recovery Lounge", img: "1693214674451-2111f7690877", desc: "Saunas & ice baths" },
  { name: "Free Weights Floor", img: "1693214674451-d6bd02e642d1", desc: "Up to 200 lb dumbbells" },
];

const WHY_US = [
  { icon: Award, title: "Expert Certified Trainers", desc: "Every coach holds multiple elite certifications and 8+ years of real-world training experience." },
  { icon: Dumbbell, title: "Premium Equipment", desc: "18,000 sq ft of world-class Rogue, Eleiko, and Life Fitness gear — nothing dated or broken." },
  { icon: Shield, title: "Personalized Approach", desc: "No cookie-cutter programs. Every member receives a customized plan built around their specific goals." },
  { icon: Heart, title: "Nutrition Integration", desc: "Fitness without nutrition is incomplete. Our in-house dietitians bridge the gap between training and eating." },
  { icon: Users, title: "Thriving Community", desc: "5,200+ members who push, encourage, and celebrate each other. The energy here is unlike anywhere else." },
  { icon: Clock, title: "Flexible Scheduling", desc: "60+ weekly classes across every discipline, plus 24/7 access for Elite members. Life doesn't wait." },
];

const GALLERY_IDS = [
  "1637430308606-86576d8fef3c",
  "1693214674451-d6bd02e642d1",
  "1734630341082-0fec0e10126c",
  "1637870473618-8c9fa7d11f0a",
  "1526506118085-60ce8714f8c5",
  "1648542036561-e1d66a5ae2b1",
  "1541534741688-6078c6bfb5c5",
  "1601422407692-ec4eeec1d9b3",
  "1534258936925-c58bed479fcb",
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useCounter(target: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let current = 0;
    const step = target / (2000 / 16);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, trigger]);
  return count;
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function SectionHeader({ overline, title, dark = false }: { overline: string; title: React.ReactNode; dark?: boolean }) {
  return (
    <div className="text-center mb-16">
      <span className={`text-[#C8963C] text-xs tracking-[0.35em] uppercase`} style={{ fontFamily: MONO }}>
        — {overline} —
      </span>
      <h2
        className={`font-black uppercase mt-3 tracking-tight leading-none ${dark ? "text-[#080808]" : "text-[#F2EDE6]"}`}
        style={{ fontFamily: DISPLAY, fontSize: "clamp(36px, 5vw, 60px)" }}
      >
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-[#C8963C] mx-auto mt-5" />
    </div>
  );
}

function StatCounter({ stat, trigger }: { stat: typeof STATS[0]; trigger: boolean }) {
  const count = useCounter(stat.value, trigger);
  return (
    <div className="text-center">
      <stat.icon className="text-[#080808]/40 mx-auto mb-3" size={28} />
      <div
        className="font-black text-[#080808] mb-1"
        style={{ fontFamily: DISPLAY, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
      >
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-[#080808]/65 text-xs tracking-[0.25em] uppercase" style={{ fontFamily: MONO }}>
        {stat.label}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  // Loading
  const [loading, setLoading] = useState(true);
  const [loadOut, setLoadOut] = useState(false);

  // Nav
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // UI state
  const [showTop, setShowTop] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [activeDay, setActiveDay] = useState("Monday");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testIdx, setTestIdx] = useState(0);
  const [galleryImg, setGalleryImg] = useState<string | null>(null);

  // Stats
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  // BMI
  const [bmiH, setBmiH] = useState("");
  const [bmiW, setBmiW] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  // Forms
  const [trialForm, setTrialForm] = useState({ name: "", email: "", phone: "", program: "" });
  const [trialSent, setTrialSent] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [nlSent, setNlSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  // Loading
  useEffect(() => {
    const t1 = setTimeout(() => setLoadOut(true), 2300);
    const t2 = setTimeout(() => setLoading(false), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Scroll tracking
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Stats intersection
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsTriggered(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Testimonial auto-advance
  useEffect(() => {
    const t = setInterval(() => setTestIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const calcBmi = () => {
    const h = parseFloat(bmiH) / 100;
    const w = parseFloat(bmiW);
    if (!h || !w || h <= 0 || w <= 0) return;
    setBmi(Math.round((w / (h * h)) * 10) / 10);
  };

  const bmiInfo = bmi === null ? null
    : bmi < 18.5 ? { label: "Underweight", color: "#60A5FA", pct: Math.min((bmi / 40) * 100, 100) }
    : bmi < 25   ? { label: "Normal Weight", color: "#34D399", pct: Math.min((bmi / 40) * 100, 100) }
    : bmi < 30   ? { label: "Overweight", color: "#FBBF24", pct: Math.min((bmi / 40) * 100, 100) }
    :               { label: "Obese", color: "#F87171", pct: Math.min((bmi / 40) * 100, 100) };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F2EDE6] overflow-x-hidden" style={{ fontFamily: "'Karla', sans-serif" }}>
      <style>{`
        @keyframes fillBar { from { width: 0% } to { width: 100% } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulseGold { 0%,100% { box-shadow:0 0 0 0 rgba(200,150,60,0.5) } 60% { box-shadow:0 0 0 14px rgba(200,150,60,0) } }
        .anim-hero   { animation: fadeUp 1s ease both; }
        .anim-hero1  { animation: fadeUp 1s ease 0.25s both; }
        .anim-hero2  { animation: fadeUp 1s ease 0.5s both; }
        .card-lift   { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-lift:hover { transform: translateY(-6px); box-shadow: 0 24px 64px rgba(0,0,0,0.6); }
        .img-zoom img { transition: transform 0.6s ease; }
        .img-zoom:hover img { transform: scale(1.06); }
        .nav-ul::after { content:''; display:block; height:1px; background:#C8963C; width:0; transition:width 0.3s; }
        .nav-ul:hover::after { width:100%; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#0A0A0A; }
        ::-webkit-scrollbar-thumb { background:#C8963C; border-radius:2px; }
        * { scrollbar-width:thin; scrollbar-color:#C8963C #0A0A0A; }
      `}</style>

      {/* ── LOADING SCREEN ──────────────────────────────────────────────────── */}
      {loading && (
        <div
          className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center"
          style={{ transition: "opacity 0.7s ease", opacity: loadOut ? 0 : 1, pointerEvents: loadOut ? "none" : "all" }}
        >
          <div className="text-[#C8963C]/50 text-[11px] tracking-[0.6em] uppercase mb-3" style={{ fontFamily: MONO }}>
            Premium Fitness Club
          </div>
          <div
            className="text-[#F2EDE6] font-black tracking-[0.15em] uppercase mb-10"
            style={{ fontFamily: DISPLAY, fontSize: "72px", lineHeight: 1 }}
          >
            FOR<span className="text-[#C8963C]">GE</span>
          </div>
          <div className="w-60 h-px bg-white/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[#C8963C]"
              style={{ animation: "fillBar 2.3s ease-out forwards" }}
            />
          </div>
          <div className="text-[#F2EDE6]/20 text-[10px] tracking-[0.3em] uppercase mt-6" style={{ fontFamily: MONO }}>
            Loading…
          </div>
        </div>
      )}

      {/* ── STICKY NAV ──────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,8,8,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,150,60,0.12)" : "none",
          paddingTop: scrolled ? "14px" : "24px",
          paddingBottom: scrolled ? "14px" : "24px",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center">
            <span className="font-black tracking-[0.12em] uppercase text-2xl text-[#F2EDE6]" style={{ fontFamily: DISPLAY }}>
              FOR<span className="text-[#C8963C]">GE</span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="nav-ul text-[#F2EDE6]/70 hover:text-[#C8963C] text-[11px] tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ fontFamily: MONO }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <button
              onClick={() => scrollTo("#trial")}
              className="px-6 py-2.5 bg-[#C8963C] text-[#080808] font-black text-xs uppercase tracking-widest hover:bg-[#E0AA50] transition-colors duration-200"
              style={{ fontFamily: DISPLAY, fontSize: "13px" }}
            >
              Free Trial
            </button>
          </div>

          <button className="lg:hidden text-[#F2EDE6] hover:text-[#C8963C] transition-colors" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: navOpen ? "360px" : "0", opacity: navOpen ? 1 : 0 }}
        >
          <div className="bg-[#0A0A0A] border-t border-[#C8963C]/10 px-6 py-5 flex flex-col gap-5">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="text-left text-[#F2EDE6]/65 hover:text-[#C8963C] text-[11px] tracking-[0.25em] uppercase transition-colors" style={{ fontFamily: MONO }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#trial")} className="py-3 bg-[#C8963C] text-[#080808] font-black text-sm uppercase tracking-wider text-center mt-1" style={{ fontFamily: DISPLAY }}>
              Book Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <img
            src="https://images.unsplash.com/photo-1637430308606-86576d8fef3c?w=1920&h=1080&fit=crop&auto=format"
            alt="Forge Gym — premium exercise equipment in a cinematic training floor"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-[#080808]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>

        {/* Gold vertical accent */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#C8963C]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="anim-hero mb-5">
              <span className="text-[#C8963C] text-[11px] tracking-[0.45em] uppercase" style={{ fontFamily: MONO }}>
                — Los Angeles Premium Fitness Club —
              </span>
            </div>
            <h1
              className="anim-hero1 font-black uppercase leading-none mb-8 text-[#F2EDE6]"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(64px, 10vw, 130px)", lineHeight: "0.93" }}
            >
              FORGE<br />
              <span className="text-[#C8963C]">YOUR</span><br />
              LIMITS.
            </h1>
            <p className="anim-hero2 text-[#F2EDE6]/65 text-lg leading-relaxed max-w-md mb-10">
              Where elite athletes and everyday champions come to become extraordinary. 18,000 sq ft. 48 certified coaches. Zero excuses.
            </p>
            <div className="anim-hero2 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#trial")}
                className="px-8 py-4 bg-[#C8963C] text-[#080808] font-black text-sm uppercase tracking-widest hover:bg-[#E0AA50] transition-all duration-200 hover:scale-105 active:scale-100"
                style={{ fontFamily: DISPLAY }}
              >
                Book Free Trial →
              </button>
              <button
                onClick={() => scrollTo("#programs")}
                className="px-8 py-4 border border-[#F2EDE6]/25 text-[#F2EDE6]/80 font-bold text-sm uppercase tracking-wider hover:border-[#C8963C] hover:text-[#C8963C] transition-all duration-200"
                style={{ fontFamily: DISPLAY }}
              >
                View Programs
              </button>
            </div>
          </div>

          {/* Hero mini stat cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { v: "5,200+", l: "Active Members" },
              { v: "48", l: "Expert Coaches" },
              { v: "60+", l: "Weekly Classes" },
              { v: "15 YRS", l: "In Business" },
            ].map((s, i) => (
              <div key={i} className="border border-[#C8963C]/15 bg-[#080808]/50 backdrop-blur-sm p-7 card-lift">
                <div className="font-black text-[#C8963C] mb-1" style={{ fontFamily: DISPLAY, fontSize: "42px", lineHeight: 1 }}>{s.v}</div>
                <div className="text-[#F2EDE6]/40 text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: MONO }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[#F2EDE6]/50 text-[9px] tracking-[0.4em] uppercase" style={{ fontFamily: MONO }}>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C8963C] to-transparent" />
        </div>
      </section>

      {/* ── ANIMATED STATS ───────────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-20 bg-[#C8963C] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 18px,rgba(0,0,0,0.12) 18px,rgba(0,0,0,0.12) 19px)" }}
        />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STATS.map((stat, i) => <StatCounter key={i} stat={stat} trigger={statsTriggered} />)}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-5 -left-5 w-full h-full border border-[#C8963C]/15" style={{ pointerEvents: "none" }} />
            <div className="relative overflow-hidden img-zoom bg-[#111114]">
              <img
                src="https://images.unsplash.com/photo-1693214674451-d6bd02e642d1?w=900&h=720&fit=crop&auto=format"
                alt="Forge Gym training floor with world-class premium equipment"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-[#C8963C] p-5">
                <div className="font-black text-[#080808] leading-none" style={{ fontFamily: DISPLAY, fontSize: "28px" }}>EST.</div>
                <div className="font-black text-[#080808] leading-none" style={{ fontFamily: DISPLAY, fontSize: "32px" }}>2009</div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[#C8963C] text-[11px] tracking-[0.35em] uppercase" style={{ fontFamily: MONO }}>— About Forge —</span>
            <h2
              className="font-black uppercase mt-3 mb-6 leading-tight text-[#F2EDE6]"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(36px, 4vw, 58px)" }}
            >
              NOT JUST A GYM.<br /><span className="text-[#C8963C]">A MOVEMENT.</span>
            </h2>
            <p className="text-[#F2EDE6]/60 leading-relaxed mb-5">
              Forge was founded in 2009 with one conviction: premium fitness shouldn't be reserved for professional athletes. We built an 18,000 sq ft temple of performance where every member — from first-timers to competitive athletes — receives world-class coaching, equipment, and community.
            </p>
            <p className="text-[#F2EDE6]/60 leading-relaxed mb-10">
              Fifteen years later, that conviction hasn't changed. What has: our methods are sharper, our coaches are more certified, and our results are more documented than ever. We don't sell gym memberships. We sell transformations.
            </p>
            <div className="grid grid-cols-2 gap-5 mb-10">
              {[
                { label: "Members Transformed", value: "12,000+" },
                { label: "Classes Per Week", value: "60+" },
                { label: "Sq Ft of Floor Space", value: "18,000" },
                { label: "Industry Awards", value: "24" },
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-[#C8963C] pl-4">
                  <div className="font-black text-[#C8963C] text-2xl" style={{ fontFamily: DISPLAY }}>{item.value}</div>
                  <div className="text-[#F2EDE6]/40 text-[10px] tracking-widest uppercase mt-0.5" style={{ fontFamily: MONO }}>{item.label}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollTo("#trial")}
              className="px-8 py-4 border border-[#C8963C] text-[#C8963C] font-black text-sm uppercase tracking-wider hover:bg-[#C8963C] hover:text-[#080808] transition-all duration-300"
              style={{ fontFamily: DISPLAY }}
            >
              Start Your Journey →
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0D0D10]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader overline="Why Forge" title="Built Different. By Design." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((item, i) => (
              <div key={i} className="border border-white/5 bg-[#111114] p-8 group card-lift cursor-default">
                <div className="w-11 h-11 border border-[#C8963C]/25 flex items-center justify-center mb-6 group-hover:border-[#C8963C] group-hover:bg-[#C8963C]/8 transition-all duration-300">
                  <item.icon size={20} className="text-[#C8963C]" />
                </div>
                <h3 className="font-black text-lg uppercase text-[#F2EDE6] mb-3" style={{ fontFamily: DISPLAY }}>{item.title}</h3>
                <p className="text-[#F2EDE6]/50 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-6 h-px bg-[#C8963C]/20 group-hover:bg-[#C8963C] transition-all duration-500 group-hover:w-12 w-6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ──────────────────────────────────────────────────────────── */}
      <section id="programs" className="py-28 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader overline="Fitness Programs" title="Train With Purpose." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROGRAMS.map((prog, i) => (
              <div key={i} className="group relative overflow-hidden bg-[#111114] card-lift cursor-pointer">
                <div className="overflow-hidden h-52 bg-[#1A1A1A] img-zoom relative">
                  <img
                    src={`https://images.unsplash.com/photo-${prog.img}?w=420&h=360&fit=crop&auto=format`}
                    alt={`${prog.title} fitness program at Forge Gym`}
                    className="w-full h-full object-cover opacity-65 group-hover:opacity-85 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/30 to-transparent" />
                  <div className="absolute top-4 right-4 border border-[#C8963C]/50 bg-[#080808]/60 px-2 py-0.5">
                    <span className="text-[#C8963C] text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: MONO }}>{prog.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <prog.icon size={13} className="text-[#C8963C]" />
                  </div>
                  <h3 className="font-black text-lg uppercase text-[#F2EDE6] mb-2" style={{ fontFamily: DISPLAY }}>{prog.title}</h3>
                  <p className="text-[#F2EDE6]/45 text-xs leading-relaxed">{prog.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-[#C8963C] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] uppercase tracking-wider font-bold" style={{ fontFamily: MONO }}>Learn More</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONAL TRAINING ─────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=1920&h=900&fit=crop&auto=format"
            alt="Personal trainer coaching an athlete with a fist bump"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#C8963C] text-[11px] tracking-[0.35em] uppercase" style={{ fontFamily: MONO }}>— Personal Training —</span>
            <h2
              className="font-black uppercase mt-3 mb-6 leading-tight text-[#F2EDE6]"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              YOUR COACH.<br />YOUR PLAN.<br /><span className="text-[#C8963C]">YOUR RESULTS.</span>
            </h2>
            <p className="text-[#F2EDE6]/60 leading-relaxed mb-8 text-lg">
              Our certified personal trainers don't follow templates — they engineer custom programs built around your body, your goals, and your schedule. Guaranteed results in 90 days or we restructure your program for free.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Fully personalized assessment & program design",
                "Progress tracking with monthly benchmarks",
                "Nutrition planning integrated with your training",
                "Priority scheduling & flexible session times",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#F2EDE6]/65 text-sm">
                  <CheckCircle2 size={15} className="text-[#C8963C] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button onClick={() => scrollTo("#trial")} className="px-8 py-4 bg-[#C8963C] text-[#080808] font-black uppercase tracking-wider hover:bg-[#E0AA50] transition-colors" style={{ fontFamily: DISPLAY }}>
              Book a Free Consultation
            </button>
          </div>

          <div className="hidden lg:flex flex-col gap-4">
            {[
              { label: "Single Session", price: "$85", note: "One-time, no commitment required" },
              { label: "10-Session Bundle", price: "$750", note: "Save $100 vs single session rate", highlight: true },
              { label: "Monthly Unlimited", price: "$299", note: "Included in Elite membership" },
            ].map((pkg, i) => (
              <div key={i} className={`border p-6 flex items-center justify-between ${pkg.highlight ? "border-[#C8963C] bg-[#C8963C]/5" : "border-white/8 bg-[#111114]/60 backdrop-blur-sm"}`}>
                <div>
                  <div className="font-bold text-[#F2EDE6]" style={{ fontFamily: DISPLAY, fontSize: "18px" }}>{pkg.label}</div>
                  <div className="text-[#F2EDE6]/35 text-[11px] mt-1" style={{ fontFamily: MONO }}>{pkg.note}</div>
                </div>
                <div className="font-black text-3xl text-[#C8963C]" style={{ fontFamily: DISPLAY }}>{pkg.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP PLANS ──────────────────────────────────────────────────── */}
      <section id="membership" className="py-28 bg-[#0D0D10]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader overline="Membership Plans" title="Invest in Yourself." />

          <div className="flex items-center justify-center gap-4 mb-14">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${!annual ? "text-[#F2EDE6]" : "text-[#F2EDE6]/35"}`} style={{ fontFamily: MONO }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-14 h-7 transition-colors duration-300"
              style={{ background: annual ? "#C8963C" : "rgba(255,255,255,0.12)" }}
            >
              <span
                className="absolute top-1 w-5 h-5 bg-white transition-all duration-300"
                style={{ left: annual ? "calc(100% - 24px)" : "4px" }}
              />
            </button>
            <span className={`text-[11px] font-bold uppercase tracking-widest ${annual ? "text-[#F2EDE6]" : "text-[#F2EDE6]/35"}`} style={{ fontFamily: MONO }}>Annual</span>
            {annual && (
              <span className="text-[9px] text-[#C8963C] tracking-widest uppercase border border-[#C8963C] px-2 py-0.5" style={{ fontFamily: MONO }}>
                Save 20%
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className="relative flex flex-col"
                style={{
                  border: `1px solid ${plan.highlight ? "#C8963C" : "rgba(255,255,255,0.06)"}`,
                  background: plan.highlight ? "rgba(200,150,60,0.04)" : "#111114",
                }}
              >
                {plan.badge && (
                  <div
                    className="absolute -top-3.5 left-6 px-4 py-1 text-[11px] font-black uppercase tracking-wider"
                    style={{ fontFamily: DISPLAY, background: plan.highlight ? "#C8963C" : "rgba(255,255,255,0.12)", color: plan.highlight ? "#080808" : "#F2EDE6" }}
                  >
                    {plan.badge}
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-black text-2xl uppercase text-[#F2EDE6] mb-1" style={{ fontFamily: DISPLAY }}>{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-3 mb-1">
                    <span className="font-black text-[#C8963C]" style={{ fontFamily: DISPLAY, fontSize: "52px", lineHeight: 1 }}>
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-[#F2EDE6]/35 text-sm mb-2">/mo</span>
                  </div>
                  {annual && <div className="text-[10px] text-[#C8963C] mb-2" style={{ fontFamily: MONO }}>Billed annually</div>}

                  <div className="flex-1 space-y-3 mt-6 mb-8">
                    {plan.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-3 text-sm text-[#F2EDE6]/75">
                        <Check size={13} className="text-[#C8963C] mt-0.5 shrink-0" />
                        {f}
                      </div>
                    ))}
                    {plan.excluded.map((f, j) => (
                      <div key={j} className="flex items-start gap-3 text-sm text-[#F2EDE6]/20 line-through">
                        <X size={13} className="text-[#F2EDE6]/15 mt-0.5 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollTo("#trial")}
                    className="w-full py-3.5 font-black text-sm uppercase tracking-wider transition-all duration-200"
                    style={{
                      fontFamily: DISPLAY,
                      background: plan.highlight ? "#C8963C" : "transparent",
                      color: plan.highlight ? "#080808" : "#C8963C",
                      border: plan.highlight ? "none" : "1px solid rgba(200,150,60,0.4)",
                    }}
                    onMouseEnter={e => { if (!plan.highlight) { (e.target as HTMLElement).style.background = "rgba(200,150,60,0.1)"; } }}
                    onMouseLeave={e => { if (!plan.highlight) { (e.target as HTMLElement).style.background = "transparent"; } }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[#F2EDE6]/25 text-[10px] mt-8 tracking-wide" style={{ fontFamily: MONO }}>
            No long-term contracts · Cancel anytime with 30 days notice · Free 3-day trial available for new members
          </p>
        </div>
      </section>

      {/* ── TRAINERS ──────────────────────────────────────────────────────────── */}
      <section id="trainers" className="py-28 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader overline="Expert Coaches" title="Your Unfair Advantage." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((trainer, i) => (
              <div key={i} className="group bg-[#111114] overflow-hidden card-lift">
                <div className="relative overflow-hidden h-72 bg-[#1A1A1A] img-zoom">
                  <img
                    src={`https://images.unsplash.com/photo-${trainer.img}?w=400&h=500&fit=crop&auto=format`}
                    alt={`${trainer.name}, ${trainer.role} at Forge Gym`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="text-[#C8963C] text-[9px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: MONO }}>{trainer.role}</div>
                  <h3 className="font-black text-xl uppercase text-[#F2EDE6] mb-0.5" style={{ fontFamily: DISPLAY }}>{trainer.name}</h3>
                  <div className="text-[#F2EDE6]/30 text-[11px] mb-3" style={{ fontFamily: MONO }}>{trainer.exp} Experience</div>
                  <p className="text-[#F2EDE6]/50 text-xs leading-relaxed mb-4">{trainer.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.certs.map((cert, j) => (
                      <span key={j} className="border border-[#C8963C]/25 text-[#C8963C]/80 px-2 py-0.5 text-[9px] tracking-wide" style={{ fontFamily: MONO }}>{cert}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BMI CALCULATOR ────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0D0D10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[#C8963C] text-[11px] tracking-[0.35em] uppercase" style={{ fontFamily: MONO }}>— Health Tool —</span>
              <h2 className="font-black uppercase mt-3 mb-4 leading-tight text-[#F2EDE6]" style={{ fontFamily: DISPLAY, fontSize: "clamp(36px, 4vw, 54px)" }}>
                BMI CALCULATOR
              </h2>
              <p className="text-[#F2EDE6]/55 leading-relaxed mb-8">
                Calculate your Body Mass Index and understand where you stand. BMI is a starting point, not the finish line — our coaches use it as one of many data points in your personalized plan.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="text-[10px] text-[#F2EDE6]/40 tracking-widest uppercase mb-2 block" style={{ fontFamily: MONO }}>Height (cm)</label>
                  <input
                    type="number"
                    value={bmiH}
                    onChange={e => setBmiH(e.target.value)}
                    placeholder="e.g. 175"
                    className="w-full bg-[#111114] border border-white/10 text-[#F2EDE6] px-4 py-3.5 focus:outline-none focus:border-[#C8963C] transition-colors placeholder:text-[#F2EDE6]/20 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#F2EDE6]/40 tracking-widest uppercase mb-2 block" style={{ fontFamily: MONO }}>Weight (kg)</label>
                  <input
                    type="number"
                    value={bmiW}
                    onChange={e => setBmiW(e.target.value)}
                    placeholder="e.g. 75"
                    className="w-full bg-[#111114] border border-white/10 text-[#F2EDE6] px-4 py-3.5 focus:outline-none focus:border-[#C8963C] transition-colors placeholder:text-[#F2EDE6]/20 text-sm"
                  />
                </div>
                <button
                  onClick={calcBmi}
                  className="w-full py-4 bg-[#C8963C] text-[#080808] font-black uppercase tracking-wider hover:bg-[#E0AA50] transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: DISPLAY }}
                >
                  <Calculator size={17} /> Calculate BMI
                </button>
              </div>

              {/* BMI scale reference */}
              <div className="mt-10 space-y-2">
                {[
                  { label: "Underweight", range: "< 18.5", c: "#60A5FA" },
                  { label: "Normal Weight", range: "18.5 – 24.9", c: "#34D399" },
                  { label: "Overweight", range: "25 – 29.9", c: "#FBBF24" },
                  { label: "Obese", range: "30+", c: "#F87171" },
                ].map((cat, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.c }} />
                      <span className="text-sm text-[#F2EDE6]/60">{cat.label}</span>
                    </div>
                    <span className="text-[11px] text-[#F2EDE6]/35" style={{ fontFamily: MONO }}>{cat.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Result panel */}
            <div className="border border-white/5 bg-[#111114] p-8 min-h-[420px] flex flex-col">
              {bmi === null ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center">
                  <Calculator size={52} className="text-[#C8963C]/20 mb-4" />
                  <p className="text-[#F2EDE6]/25 text-sm" style={{ fontFamily: MONO }}>
                    Enter your measurements and tap Calculate to see your BMI result.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col flex-1">
                  <div className="text-center mb-8">
                    <div className="text-[#F2EDE6]/40 text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: MONO }}>Your BMI Score</div>
                    <div className="font-black mb-2" style={{ fontFamily: DISPLAY, fontSize: "96px", lineHeight: 1, color: bmiInfo?.color }}>{bmi}</div>
                    <div className="font-black text-2xl uppercase" style={{ fontFamily: DISPLAY, color: bmiInfo?.color }}>{bmiInfo?.label}</div>
                  </div>

                  {/* Gauge bar */}
                  <div className="mb-8">
                    <div className="w-full h-2 bg-white/5 relative overflow-hidden mb-3">
                      <div
                        className="absolute inset-y-0 left-0 transition-all duration-1000"
                        style={{ width: `${bmiInfo?.pct ?? 0}%`, background: bmiInfo?.color }}
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-px">
                      {[
                        { l: "Under", c: "#60A5FA" },
                        { l: "Normal", c: "#34D399" },
                        { l: "Over", c: "#FBBF24" },
                        { l: "Obese", c: "#F87171" },
                      ].map((cat, j) => (
                        <div key={j} className="text-center">
                          <div className="w-full h-px mb-1" style={{ background: cat.c, opacity: 0.5 }} />
                          <div className="text-[9px] tracking-wide" style={{ fontFamily: MONO, color: cat.c }}>{cat.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-[#C8963C]/20 bg-[#C8963C]/5 p-4 text-xs text-[#F2EDE6]/55 leading-relaxed mb-4">
                    <strong className="text-[#C8963C]">Note:</strong> BMI doesn't account for muscle mass, bone density, or individual health factors. Our coaches use it alongside other assessments for a complete picture.
                  </div>
                  <button
                    onClick={() => scrollTo("#trial")}
                    className="w-full py-3.5 border border-[#C8963C] text-[#C8963C] font-black uppercase tracking-wider hover:bg-[#C8963C] hover:text-[#080808] transition-all"
                    style={{ fontFamily: DISPLAY }}
                  >
                    Book a Free Assessment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLASS SCHEDULE ────────────────────────────────────────────────────── */}
      <section id="schedule" className="py-28 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader overline="Class Timetable" title="Find Your Time." />

          {/* Day tabs */}
          <div className="flex overflow-x-auto gap-1.5 mb-8 pb-1">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className="shrink-0 px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold transition-all duration-200"
                style={{
                  fontFamily: MONO,
                  background: activeDay === day ? "#C8963C" : "transparent",
                  color: activeDay === day ? "#080808" : "rgba(242,237,230,0.45)",
                  border: activeDay === day ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>

          <div className="border border-white/5 overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-12 bg-[#111114] border-b border-white/5 px-6 py-3">
              {[["Time", "col-span-2"], ["Class Name", "col-span-4"], ["Trainer", "col-span-3"], ["Duration", "col-span-2"], ["Spots", "col-span-1"]].map(([h, cls], i) => (
                <div key={i} className={`text-[#C8963C] text-[10px] tracking-[0.2em] uppercase ${cls}`} style={{ fontFamily: MONO }}>{h}</div>
              ))}
            </div>

            {SCHEDULE[activeDay]?.map((cls, i) => (
              <div
                key={i}
                className="flex flex-col md:grid md:grid-cols-12 px-6 py-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.01)" : "transparent" }}
              >
                <div className="md:col-span-2 font-bold text-[#C8963C] text-sm mb-1 md:mb-0" style={{ fontFamily: MONO }}>{cls.time}</div>
                <div className="md:col-span-4 font-black uppercase text-[#F2EDE6] text-sm mb-0.5 md:mb-0" style={{ fontFamily: DISPLAY, fontSize: "16px" }}>{cls.name}</div>
                <div className="md:col-span-3 text-[#F2EDE6]/55 text-sm mb-0.5 md:mb-0">{cls.trainer}</div>
                <div className="md:col-span-2 text-[#F2EDE6]/35 text-xs" style={{ fontFamily: MONO }}>{cls.duration}</div>
                <div className="md:col-span-1 text-xs font-bold" style={{ fontFamily: MONO, color: cls.spots <= 5 ? "#F87171" : "#34D399" }}>
                  {cls.spots}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[#F2EDE6]/25 text-[10px] mt-5 tracking-wide" style={{ fontFamily: MONO }}>
            Green = spots available · Red = almost full · Reserve your spot through the mobile app
          </p>
        </div>
      </section>

      {/* ── FACILITIES ────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0D0D10]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader overline="Facilities & Equipment" title="World-Class. Every Sq Ft." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACILITIES.map((f, i) => (
              <div key={i} className="group relative overflow-hidden h-64 bg-[#111114] img-zoom cursor-pointer">
                <img
                  src={`https://images.unsplash.com/photo-${f.img}?w=700&h=450&fit=crop&auto=format`}
                  alt={`${f.name} — ${f.desc}`}
                  className="w-full h-full object-cover opacity-55 group-hover:opacity-75 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D10] via-[#0D0D10]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-black text-xl uppercase text-[#F2EDE6] mb-0.5" style={{ fontFamily: DISPLAY }}>{f.name}</h3>
                  <div className="text-[#C8963C] text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader overline="Photo Gallery" title="See the Forge Life." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY_IDS.map((id, i) => (
              <div
                key={i}
                className={`relative overflow-hidden bg-[#111114] cursor-pointer group img-zoom ${i === 0 ? "col-span-2 h-72" : "h-44"}`}
                onClick={() => setGalleryImg(id)}
              >
                <img
                  src={`https://images.unsplash.com/photo-${id}?w=700&h=500&fit=crop&auto=format`}
                  alt={`Forge Gym gallery — training space image ${i + 1}`}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-95 transition-opacity duration-500"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(8,8,8,0.25)" }}
                >
                  <div className="w-10 h-10 border border-white/60 flex items-center justify-center">
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {galleryImg && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.93)" }}
            onClick={() => setGalleryImg(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10" onClick={() => setGalleryImg(null)}>
              <X size={30} />
            </button>
            <img
              src={`https://images.unsplash.com/photo-${galleryImg}?w=1400&h=900&fit=crop&auto=format`}
              alt="Gallery image fullscreen view"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}
      </section>

      {/* ── SUCCESS STORIES ───────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0D0D10]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader overline="Member Transformations" title="Real People. Real Results." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "James H.", age: 34, loss: "–42 lbs", gained: "Confidence", duration: "5 Months", img: "1613845205719-8c87760ab728", program: "Weight Loss + HIIT" },
              { name: "Anika P.", age: 28, loss: "–22 lbs", gained: "Marathon Finisher", duration: "8 Months", img: "1541534741688-6078c6bfb5c5", program: "Cardio & Endurance" },
            ].map((story, i) => (
              <div key={i} className="border border-white/5 bg-[#111114] overflow-hidden">
                <div className="relative h-52 bg-[#1A1A1A]">
                  <img
                    src={`https://images.unsplash.com/photo-${story.img}?w=800&h=350&fit=crop&auto=format`}
                    alt={`${story.name} transformation story at Forge Gym`}
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#111114]/90 to-[#111114]/30" />
                  <div className="absolute inset-0 p-8 flex items-center">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="font-black uppercase text-[#F2EDE6]/40 line-through" style={{ fontFamily: DISPLAY, fontSize: "28px" }}>Before</div>
                      </div>
                      <ArrowRight className="text-[#C8963C]" size={22} />
                      <div className="text-center">
                        <div className="font-black uppercase text-[#34D399]" style={{ fontFamily: DISPLAY, fontSize: "28px" }}>After</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#C8963C] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#080808]" style={{ fontFamily: MONO }}>
                    {story.program}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="font-black text-2xl uppercase text-[#F2EDE6]" style={{ fontFamily: DISPLAY }}>{story.name}, {story.age}</h3>
                      <div className="text-[#F2EDE6]/35 text-[11px] mt-1" style={{ fontFamily: MONO }}>{story.duration} transformation journey</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1A1A1A] p-5 text-center">
                      <div className="font-black text-3xl text-[#C8963C] mb-1" style={{ fontFamily: DISPLAY }}>{story.loss}</div>
                      <div className="text-[10px] text-[#F2EDE6]/35 tracking-widest uppercase" style={{ fontFamily: MONO }}>Weight Lost</div>
                    </div>
                    <div className="bg-[#1A1A1A] p-5 text-center">
                      <div className="font-black text-xl text-[#34D399] mb-1" style={{ fontFamily: DISPLAY }}>+{story.gained}</div>
                      <div className="text-[10px] text-[#F2EDE6]/35 tracking-widest uppercase" style={{ fontFamily: MONO }}>What They Gained</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#080808] relative overflow-hidden">
        <div
          className="absolute top-0 left-0 font-black select-none pointer-events-none text-white/[0.015]"
          style={{ fontFamily: DISPLAY, fontSize: "300px", lineHeight: 1 }}
        >
          ❝
        </div>
        <div className="max-w-4xl mx-auto px-6 relative">
          <SectionHeader overline="Member Reviews" title="What They're Saying." />

          <div className="relative border border-white/5 bg-[#111114] p-10 md:p-14">
            <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-[#C8963C]/25" />
            <div className="absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 border-[#C8963C]/25" />

            <div className="flex gap-1 mb-6">
              {Array.from({ length: TESTIMONIALS[testIdx].stars }).map((_, i) => (
                <Star key={i} size={15} className="text-[#C8963C] fill-[#C8963C]" />
              ))}
            </div>
            <blockquote className="text-[#F2EDE6]/75 text-xl leading-relaxed mb-10 italic">
              "{TESTIMONIALS[testIdx].text}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#C8963C]/15 border border-[#C8963C]/30 flex items-center justify-center shrink-0">
                <span className="font-black text-[#C8963C] text-xl" style={{ fontFamily: DISPLAY }}>
                  {TESTIMONIALS[testIdx].name[0]}
                </span>
              </div>
              <div>
                <div className="font-black uppercase text-[#F2EDE6]" style={{ fontFamily: DISPLAY, fontSize: "18px" }}>
                  {TESTIMONIALS[testIdx].name}, {TESTIMONIALS[testIdx].age}
                </div>
                <div className="text-[#C8963C] text-[11px]" style={{ fontFamily: MONO }}>
                  {TESTIMONIALS[testIdx].result} · {TESTIMONIALS[testIdx].program}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2 items-center">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestIdx(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === testIdx ? "28px" : "6px",
                    height: "6px",
                    background: i === testIdx ? "#C8963C" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {[
                { icon: ChevronLeft, fn: () => setTestIdx((testIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length) },
                { icon: ChevronRight, fn: () => setTestIdx((testIdx + 1) % TESTIMONIALS.length) },
              ].map(({ icon: Icon, fn }, i) => (
                <button key={i} onClick={fn} className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#F2EDE6]/40 hover:border-[#C8963C] hover:text-[#C8963C] transition-colors">
                  <Icon size={17} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROMOTIONAL OFFER ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#C8963C] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg,transparent,transparent 14px,rgba(0,0,0,0.15) 14px,rgba(0,0,0,0.15) 15px)" }}
        />
        <div className="max-w-7xl mx-auto px-6 relative grid lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-2">
            <div className="text-[#080808]/55 text-[10px] tracking-[0.5em] uppercase mb-3" style={{ fontFamily: MONO }}>— Limited Time Offer —</div>
            <h2
              className="font-black uppercase leading-none mb-4 text-[#080808]"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(32px, 5vw, 72px)" }}
            >
              JOIN THIS MONTH.<br />GET 3 MONTHS FREE.
            </h2>
            <p className="text-[#080808]/65 text-lg">
              New Elite memberships signed in July receive 3 bonus months added automatically — plus a complimentary starter kit worth $120. No catch. No fine print. Just results.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => scrollTo("#trial")}
              className="w-full py-5 bg-[#080808] text-[#C8963C] font-black uppercase tracking-wider hover:bg-[#111] transition-colors"
              style={{ fontFamily: DISPLAY, fontSize: "20px" }}
            >
              Claim Your Offer →
            </button>
            <p className="text-[#080808]/40 text-[10px] text-center" style={{ fontFamily: MONO }}>Offer expires July 31, 2026 · Elite memberships only</p>
          </div>
        </div>
      </section>

      {/* ── BOOK FREE TRIAL ───────────────────────────────────────────────────── */}
      <section id="trial" className="py-28 bg-[#0D0D10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[#C8963C] text-[11px] tracking-[0.35em] uppercase" style={{ fontFamily: MONO }}>— No Commitment —</span>
              <h2
                className="font-black uppercase mt-3 mb-6 leading-tight text-[#F2EDE6]"
                style={{ fontFamily: DISPLAY, fontSize: "clamp(36px, 4vw, 60px)" }}
              >
                BOOK YOUR<br /><span className="text-[#C8963C]">FREE 3-DAY</span><br />TRIAL.
              </h2>
              <p className="text-[#F2EDE6]/55 leading-relaxed mb-8 text-lg">
                Experience Forge with zero commitment. Three full days of access, a one-on-one assessment with a certified coach, and one group class. We're confident you'll never want to leave.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Full 3-day facility access — all areas",
                  "1-on-1 fitness assessment ($150 value)",
                  "One group class of your choice",
                  "Personalized trial workout plan",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#F2EDE6]/65 text-sm">
                    <div className="w-5 h-5 bg-[#C8963C]/10 border border-[#C8963C]/35 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-[#C8963C]" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <div className="border border-[#C8963C]/15 bg-[#C8963C]/5 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Phone size={16} className="text-[#C8963C]" />
                  <span className="font-bold text-[#F2EDE6]">Questions? Call us directly.</span>
                </div>
                <div className="text-[#F2EDE6]/50 text-sm">+1 (555) 247-9830 · Mon–Fri 8 AM – 8 PM</div>
              </div>
            </div>

            {trialSent ? (
              <div className="flex flex-col items-center justify-center text-center border border-[#C8963C]/20 bg-[#111114] p-16 min-h-[480px]">
                <CheckCircle2 size={60} className="text-[#C8963C] mb-5" />
                <h3 className="font-black text-3xl uppercase mb-3 text-[#F2EDE6]" style={{ fontFamily: DISPLAY }}>You're In!</h3>
                <p className="text-[#F2EDE6]/50 text-sm leading-relaxed max-w-xs">
                  We'll call you within 24 hours to confirm your free trial slot. Welcome to the Forge family.
                </p>
              </div>
            ) : (
              <div className="border border-white/5 bg-[#111114] p-8">
                <h3 className="font-black text-2xl uppercase mb-7 text-[#F2EDE6]" style={{ fontFamily: DISPLAY }}>Book Your Free Trial</h3>
                <div className="space-y-5">
                  {(
                    [
                      { key: "name" as const, label: "Full Name", placeholder: "Alex Johnson", type: "text" },
                      { key: "email" as const, label: "Email Address", placeholder: "alex@email.com", type: "email" },
                      { key: "phone" as const, label: "Phone Number", placeholder: "+1 (555) 000-0000", type: "tel" },
                    ]
                  ).map(field => (
                    <div key={field.key}>
                      <label className="text-[10px] text-[#F2EDE6]/40 tracking-widest uppercase mb-2 block" style={{ fontFamily: MONO }}>{field.label}</label>
                      <input
                        type={field.type}
                        value={trialForm[field.key]}
                        onChange={e => setTrialForm(f => ({ ...f, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full bg-[#0D0D10] border border-white/10 text-[#F2EDE6] px-4 py-3 focus:outline-none focus:border-[#C8963C] transition-colors placeholder:text-[#F2EDE6]/18 text-sm"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] text-[#F2EDE6]/40 tracking-widest uppercase mb-2 block" style={{ fontFamily: MONO }}>Interested Program</label>
                    <select
                      value={trialForm.program}
                      onChange={e => setTrialForm(f => ({ ...f, program: e.target.value }))}
                      className="w-full bg-[#0D0D10] border border-white/10 text-[#F2EDE6] px-4 py-3 focus:outline-none focus:border-[#C8963C] transition-colors text-sm appearance-none cursor-pointer"
                      style={{ color: trialForm.program ? "#F2EDE6" : "rgba(242,237,230,0.3)" }}
                    >
                      <option value="" style={{ color: "#888" }}>Select a program…</option>
                      {PROGRAMS.map(p => <option key={p.title} value={p.title} style={{ color: "#F2EDE6", background: "#111114" }}>{p.title}</option>)}
                    </select>
                  </div>
                  <button
                    onClick={() => { if (trialForm.name && trialForm.email) setTrialSent(true); }}
                    className="w-full py-4 bg-[#C8963C] text-[#080808] font-black uppercase tracking-wider hover:bg-[#E0AA50] transition-colors flex items-center justify-center gap-2 mt-1"
                    style={{ fontFamily: DISPLAY }}
                  >
                    <Send size={15} /> Book My Free Trial
                  </button>
                  <p className="text-[#F2EDE6]/22 text-[10px] text-center" style={{ fontFamily: MONO }}>
                    We'll contact you within 24 hours to confirm your slot. No payment required.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader overline="FAQ" title="Common Questions." />
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-white/5 bg-[#111114] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-[#F2EDE6] pr-6 text-sm leading-snug">{faq.q}</span>
                  <span
                    className="shrink-0 text-[#C8963C] transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <ChevronDown size={17} />
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-350"
                  style={{ maxHeight: openFaq === i ? "200px" : "0" }}
                >
                  <p className="px-6 pb-5 pt-2 text-[#F2EDE6]/55 text-sm leading-relaxed border-t border-white/5">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0D0D10] border-y border-white/5">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="text-[#C8963C] text-[11px] tracking-[0.35em] uppercase" style={{ fontFamily: MONO }}>— Stay Updated —</span>
          <h2
            className="font-black uppercase mt-3 mb-3 text-[#F2EDE6]"
            style={{ fontFamily: DISPLAY, fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            FORGE TIPS & EXCLUSIVE OFFERS
          </h2>
          <p className="text-[#F2EDE6]/45 mb-8 text-sm">Weekly training insights, nutrition tips, and member-only promotions. No spam — ever.</p>
          {nlSent ? (
            <div className="flex items-center justify-center gap-3 text-[#C8963C]">
              <CheckCircle2 size={20} />
              <span className="font-bold uppercase tracking-wider" style={{ fontFamily: DISPLAY }}>You're subscribed! Welcome aboard.</span>
            </div>
          ) : (
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                value={newsletter}
                onChange={e => setNewsletter(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-[#111114] border border-white/10 border-r-0 text-[#F2EDE6] px-5 py-4 focus:outline-none focus:border-[#C8963C] placeholder:text-[#F2EDE6]/20 text-sm"
              />
              <button
                onClick={() => { if (newsletter.includes("@")) setNlSent(true); }}
                className="px-6 py-4 bg-[#C8963C] text-[#080808] font-black uppercase tracking-wider hover:bg-[#E0AA50] transition-colors shrink-0"
                style={{ fontFamily: DISPLAY }}
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader overline="Get In Touch" title="We're Here for You." />
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Info column */}
            <div className="space-y-10">
              <div>
                <h3 className="font-black text-lg uppercase text-[#C8963C] mb-5" style={{ fontFamily: DISPLAY }}>Contact Info</h3>
                {[
                  { icon: Phone, label: "+1 (555) 247-9830" },
                  { icon: Mail, label: "hello@forgefit.com" },
                  { icon: MapPin, label: "4800 Athletic Drive, Suite 100\nLos Angeles, CA 90001" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 mb-5">
                    <div className="w-8 h-8 border border-[#C8963C]/25 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={13} className="text-[#C8963C]" />
                    </div>
                    <span className="text-[#F2EDE6]/55 text-sm leading-relaxed whitespace-pre-line">{item.label}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-black text-lg uppercase text-[#C8963C] mb-4" style={{ fontFamily: DISPLAY }}>Business Hours</h3>
                {[
                  { day: "Mon – Fri", hours: "5:00 AM – 11:00 PM", gold: false },
                  { day: "Saturday", hours: "6:00 AM – 10:00 PM", gold: false },
                  { day: "Sunday", hours: "7:00 AM – 8:00 PM", gold: false },
                  { day: "Elite Members", hours: "24 / 7 Access", gold: true },
                ].map((h, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-white/5">
                    <span className={`text-sm font-medium ${h.gold ? "text-[#C8963C]" : "text-[#F2EDE6]/60"}`}>{h.day}</span>
                    <span className={`text-sm ${h.gold ? "text-[#C8963C]" : "text-[#F2EDE6]/40"}`} style={{ fontFamily: MONO }}>{h.hours}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-black text-lg uppercase text-[#C8963C] mb-4" style={{ fontFamily: DISPLAY }}>Follow Us</h3>
                <div className="flex gap-3">
                  {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#F2EDE6]/35 hover:border-[#C8963C] hover:text-[#C8963C] transition-colors cursor-pointer">
                      <Icon size={15} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            {contactSent ? (
              <div className="flex flex-col items-center justify-center text-center border border-white/5 bg-[#111114] p-10">
                <CheckCircle2 size={52} className="text-[#C8963C] mb-4" />
                <h3 className="font-black text-2xl uppercase mb-2 text-[#F2EDE6]" style={{ fontFamily: DISPLAY }}>Message Sent!</h3>
                <p className="text-[#F2EDE6]/45 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="border border-white/5 bg-[#111114] p-8">
                <h3 className="font-black text-2xl uppercase mb-6 text-[#F2EDE6]" style={{ fontFamily: DISPLAY }}>Send a Message</h3>
                <div className="space-y-4">
                  {(
                    [
                      { key: "name" as const, label: "Full Name", type: "text", placeholder: "Your name" },
                      { key: "email" as const, label: "Email", type: "email", placeholder: "your@email.com" },
                      { key: "subject" as const, label: "Subject", type: "text", placeholder: "Membership inquiry" },
                    ]
                  ).map(f => (
                    <div key={f.key}>
                      <label className="text-[10px] text-[#F2EDE6]/35 tracking-widest uppercase mb-1.5 block" style={{ fontFamily: MONO }}>{f.label}</label>
                      <input
                        type={f.type}
                        value={contactForm[f.key]}
                        onChange={e => setContactForm(c => ({ ...c, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full bg-[#0D0D10] border border-white/10 text-[#F2EDE6] px-4 py-3 focus:outline-none focus:border-[#C8963C] transition-colors placeholder:text-[#F2EDE6]/18 text-sm"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] text-[#F2EDE6]/35 tracking-widest uppercase mb-1.5 block" style={{ fontFamily: MONO }}>Message</label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={e => setContactForm(c => ({ ...c, message: e.target.value }))}
                      placeholder="Tell us how we can help…"
                      className="w-full bg-[#0D0D10] border border-white/10 text-[#F2EDE6] px-4 py-3 focus:outline-none focus:border-[#C8963C] transition-colors placeholder:text-[#F2EDE6]/18 text-sm resize-none"
                    />
                  </div>
                  <button
                    onClick={() => { if (contactForm.name && contactForm.email && contactForm.message) setContactSent(true); }}
                    className="w-full py-4 bg-[#C8963C] text-[#080808] font-black uppercase tracking-wider hover:bg-[#E0AA50] transition-colors"
                    style={{ fontFamily: DISPLAY }}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            )}

            {/* Location / Map placeholder */}
            <div
              className="border border-white/5 bg-[#111114] relative overflow-hidden min-h-[320px] lg:min-h-0"
              style={{
                backgroundImage: "linear-gradient(rgba(200,150,60,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,150,60,0.04) 1px,transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="w-12 h-12 border border-[#C8963C]/30 bg-[#C8963C]/8 flex items-center justify-center mb-4">
                  <MapPin size={22} className="text-[#C8963C]" />
                </div>
                <div className="font-black text-xl uppercase mb-2 text-[#F2EDE6]" style={{ fontFamily: DISPLAY }}>Find Us</div>
                <div className="text-[#F2EDE6]/45 text-sm mb-2">4800 Athletic Drive, Suite 100</div>
                <div className="text-[#F2EDE6]/45 text-sm mb-6">Los Angeles, CA 90001</div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-[#C8963C]/35 text-[#C8963C] text-[11px] uppercase tracking-wider font-bold hover:bg-[#C8963C] hover:text-[#080808] transition-all"
                  style={{ fontFamily: MONO }}
                >
                  Open in Google Maps →
                </a>
                <div className="mt-8 text-[10px] text-[#F2EDE6]/20 tracking-wide" style={{ fontFamily: MONO }}>
                  Underground parking available · 3 hrs free
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="bg-[#040404] border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
            <div className="col-span-2 md:col-span-1">
              <div className="font-black tracking-[0.12em] uppercase mb-4 text-[#F2EDE6]" style={{ fontFamily: DISPLAY, fontSize: "32px" }}>
                FOR<span className="text-[#C8963C]">GE</span>
              </div>
              <p className="text-[#F2EDE6]/35 text-sm leading-relaxed mb-6">
                Premium fitness club in Los Angeles. 15 years of transformations. 5,200+ members strong.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 border border-white/8 flex items-center justify-center text-[#F2EDE6]/25 hover:border-[#C8963C] hover:text-[#C8963C] transition-colors cursor-pointer">
                    <Icon size={14} />
                  </div>
                ))}
              </div>
            </div>

            {[
              {
                title: "Programs",
                links: ["Strength & Muscle", "Weight Loss", "CrossFit Training", "Cardio & Endurance", "Yoga & Flexibility", "HIIT Workouts"],
              },
              {
                title: "Company",
                links: ["About Forge", "Our Trainers", "Membership Plans", "Class Schedule", "Success Stories", "Careers"],
              },
              {
                title: "Support",
                links: ["Book Free Trial", "Contact Us", "FAQ", "Privacy Policy", "Terms of Service", "Member Portal"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4
                  className="font-black uppercase text-[#F2EDE6] mb-5"
                  style={{ fontFamily: DISPLAY, fontSize: "14px", letterSpacing: "0.1em" }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <button
                        onClick={() => scrollTo("#about")}
                        className="text-[#F2EDE6]/30 hover:text-[#C8963C] text-sm transition-colors text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#F2EDE6]/20 text-[11px]" style={{ fontFamily: MONO }}>
              © 2026 Forge Premium Fitness Club, LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-[#F2EDE6]/20 text-[11px]" style={{ fontFamily: MONO }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" style={{ animation: "pulse 2s infinite" }} />
              All systems operational · Los Angeles, CA
            </div>
          </div>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ─────────────────────────────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-[#C8963C] text-[#080808] flex items-center justify-center hover:bg-[#E0AA50] transition-all duration-300"
        style={{
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0)" : "translateY(16px)",
          pointerEvents: showTop ? "all" : "none",
          animation: showTop ? "pulseGold 2s infinite" : "none",
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={19} />
      </button>
    </div>
  );
}
