import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Droplets,
  FlaskConical,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  Wifi,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Nav Links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "Technology", href: "#technology" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// ─── Features Data ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Droplets,
    title: "Advanced Purification",
    desc: "Removes 99.9% of contaminants using multi-stage filtration technology.",
  },
  {
    icon: FlaskConical,
    title: "Mineral Balance",
    desc: "Retains essential minerals while eliminating harmful substances.",
  },
  {
    icon: Clock,
    title: "Long-Life Filters",
    desc: "Filters last up to 12 months, saving you time and money.",
  },
  {
    icon: Wifi,
    title: "Smart Monitoring",
    desc: "Real-time water quality monitoring via our mobile app.",
  },
];

// ─── Products Data ────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    name: "Water Softener 7.5L",
    type: "Industrial Filter",
    stages: "Heavy-Duty Softening System",
    rating: 4.8,
    price: "Contact Us",
    image:
      "/assets/uploads/water_softner_7.5_liter-019d2593-658b-75df-b851-f72f762eb746-1.jpeg",
    badge: "Best Value",
  },
  {
    name: "Aqua Dropz RO",
    type: "RO Water Purifier",
    stages: "12-Stage Purification System",
    rating: 4.9,
    price: "Contact Us",
    image: "/assets/uploads/1-019d2593-65cd-736c-82e6-97e654c39322-2.jpeg",
    badge: "Most Popular",
  },
  {
    name: "Aqua Classic White",
    type: "RO+UV Purifier",
    stages: "9-Stage + UV Filtration",
    rating: 4.9,
    price: "Contact Us",
    image: "/assets/uploads/white-019d2593-67b5-74af-9a1f-244378dc6b80-3.jpeg",
    badge: "Smart Choice",
  },
  {
    name: "Aqua Classic Black",
    type: "Premium RO Purifier",
    stages: "5-Stage Alkaline Filtration",
    rating: 5.0,
    price: "Contact Us",
    image: "/assets/uploads/black-019d2593-67ed-70c9-85dd-2bf0fae302d5-4.jpeg",
    badge: "Premium",
  },
];

// ─── Testimonials Data ────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "The water tastes incredibly fresh! My family loves it. We've noticed such a big difference in taste and clarity.",
    name: "Priya S.",
    location: "Mumbai",
    initials: "PS",
    stars: 5,
  },
  {
    quote:
      "Best investment for our home. Installation was super easy and the support team was fantastic throughout.",
    name: "Rajan M.",
    location: "Delhi",
    initials: "RM",
    stars: 5,
  },
  {
    quote:
      "Water quality improved drastically. Highly recommended to anyone looking for safe, clean drinking water!",
    name: "Anita K.",
    location: "Bangalore",
    initials: "AK",
    stars: 5,
  },
];

const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

// ─── Star Rating Component ────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {STAR_POSITIONS.map((pos) => (
        <Star
          key={pos}
          className={`w-4 h-4 ${
            pos <= Math.floor(rating)
              ? "fill-brand-gold text-brand-gold"
              : pos - 1 < rating
                ? "fill-brand-gold/50 text-brand-gold"
                : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-semibold text-brand-body">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-card"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
            data-ocid="header.link"
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Droplets className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-extrabold text-lg text-brand-navy tracking-tight">
              Aquaman <span className="text-brand-blue">Care</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-brand-body hover:text-brand-blue transition-colors cursor-pointer"
                data-ocid="header.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              type="button"
              onClick={() => handleNavClick("#products")}
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-5 font-semibold shadow-sm"
              data-ocid="header.primary_button"
            >
              Get Pure Water
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-brand-body hover:text-brand-navy transition-colors"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
            data-ocid="header.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm font-medium text-brand-body hover:text-brand-blue transition-colors py-1"
                  data-ocid="header.link"
                >
                  {link.label}
                </button>
              ))}
              <Button
                type="button"
                onClick={() => handleNavClick("#products")}
                className="rounded-full bg-primary text-primary-foreground w-full mt-2 font-semibold"
                data-ocid="header.primary_button"
              >
                Get Pure Water
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16"
      style={{
        backgroundImage: "url(/assets/generated/hero-bg.dim_1400x700.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(14,60,87,0.88) 0%, rgba(14,60,87,0.72) 40%, rgba(43,121,168,0.45) 70%, rgba(43,121,168,0.15) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6">
            <Droplets className="w-4 h-4 text-brand-aqua" />
            <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">
              Advanced Water Purification
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase leading-none tracking-tight mb-6">
            Pure, Safe,
            <br />
            <span className="text-[oklch(0.78_0.12_200)]">&amp; Healthy</span>
            <br />
            Water
          </h1>

          <p className="text-lg text-white/80 font-medium leading-relaxed mb-8 max-w-md">
            Advanced filtration for your home with Aquaman Care. Protect your
            family with water that&apos;s truly clean.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              type="button"
              onClick={() => scrollTo("#products")}
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 shadow-lg hover:shadow-xl transition-all"
              data-ocid="hero.primary_button"
            >
              Shop Now <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              type="button"
              onClick={() => scrollTo("#features")}
              size="lg"
              variant="outline"
              className="rounded-full border-white/50 text-white bg-white/10 hover:bg-white/20 hover:border-white font-bold px-8 backdrop-blur-sm transition-all"
              data-ocid="hero.secondary_button"
            >
              Learn More
            </Button>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/20"
          >
            {[
              { value: "99.9%", label: "Contaminants Removed" },
              { value: "50K+", label: "Happy Families" },
              { value: "12mo", label: "Filter Lifespan" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Why Choose Aquaman Care?
          </h2>
          <p className="mt-4 text-brand-body max-w-xl mx-auto">
            We combine cutting-edge technology with thoughtful design to deliver
            the purest water possible for your family.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          id="technology"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <f.icon className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-brand-navy text-base mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-brand-body leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────────
function ProductsSection() {
  return (
    <section id="products" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-3 block">
            Our Products
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Featured Purifiers
          </h2>
          <p className="mt-4 text-brand-body max-w-xl mx-auto">
            Choose from our range of award-winning water purifiers designed for
            every home and budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group"
              data-ocid={`products.item.${i + 1}`}
            >
              <div className="relative bg-secondary/60 p-4 flex items-center justify-center h-56">
                <span className="absolute top-3 left-3 bg-brand-blue text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {p.badge}
                </span>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <div className="text-xs font-semibold text-brand-blue uppercase tracking-wide mb-1">
                  {p.type}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-0.5">
                  {p.name}
                </h3>
                <p className="text-sm text-brand-muted mb-3">{p.stages}</p>

                <StarRating rating={p.rating} />

                <div className="flex items-center justify-between mt-4">
                  <span className="text-base font-bold text-brand-navy">
                    {p.price}
                  </span>
                  <Button
                    type="button"
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-4"
                    data-ocid={`products.item.${i + 1}.button`}
                  >
                    Enquire
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIAL_STARS = [1, 2, 3, 4, 5] as const;

// ─── Testimonials Section ─────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-brand-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-brand-aqua mb-3 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Real Stories, Real Pure Water
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Thousands of families trust Aquaman Care for their daily water
            needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="bg-white/8 border border-white/12 rounded-2xl p-6 hover:bg-white/12 transition-colors"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <div className="flex gap-1 mb-4">
                {TESTIMONIAL_STARS.slice(0, t.stars).map((pos) => (
                  <Star
                    key={pos}
                    className="w-4 h-4 fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>

              <p className="text-white/85 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">
                    {t.name}
                  </div>
                  <div className="text-white/50 text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setStatus("loading");
    try {
      if (actor) {
        await actor.submitContactForm(name, email, message);
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent! We'll get back to you shortly.");
    } catch {
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-3 block">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-4">
              Have Questions?
              <br />
              We&apos;re Here to Help
            </h2>
            <p className="text-brand-body leading-relaxed mb-8">
              Reach out to our team for product queries, service requests, or
              anything else. We typically respond within 24 hours.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-brand-muted uppercase tracking-wide">
                    Phone
                  </div>
                  <div className="font-semibold text-brand-navy">
                    +91 98765 43210
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-brand-muted uppercase tracking-wide">
                    Email
                  </div>
                  <div className="font-semibold text-brand-navy">
                    hello@aquamancare.com
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-card"
          >
            {status === "success" ? (
              <div
                className="flex flex-col items-center justify-center py-10 text-center"
                data-ocid="contact.success_state"
              >
                <CheckCircle2 className="w-14 h-14 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  Message Sent!
                </h3>
                <p className="text-brand-body mb-6">
                  Thanks for reaching out. Our team will get back to you within
                  24 hours.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setStatus("idle")}
                  data-ocid="contact.secondary_button"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <Label
                    htmlFor="contact-name"
                    className="text-brand-navy font-semibold mb-1.5 block text-sm"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="contact-name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border-border focus-visible:ring-ring"
                    data-ocid="contact.input"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="contact-email"
                    className="text-brand-navy font-semibold mb-1.5 block text-sm"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border-border focus-visible:ring-ring"
                    data-ocid="contact.input"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="contact-message"
                    className="text-brand-navy font-semibold mb-1.5 block text-sm"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us how we can help you..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="rounded-xl border-border focus-visible:ring-ring resize-none"
                    data-ocid="contact.textarea"
                    required
                  />
                </div>
                {status === "error" && (
                  <p
                    className="text-destructive text-sm"
                    data-ocid="contact.error_state"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 text-base mt-1"
                  data-ocid="contact.submit_button"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">
                Aquaman <span className="text-brand-aqua">Care</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Advanced water purification for healthier homes. Pure water, happy
              families.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/80 mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {["Home", "Products", "Features", "Testimonials", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() =>
                        scrollTo(
                          `#${item.toLowerCase() === "home" ? "home" : item.toLowerCase()}`,
                        )
                      }
                      className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                      data-ocid="footer.link"
                    >
                      {item}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/80 mb-4">
              Support
            </h4>
            <ul className="flex flex-col gap-2.5">
              {["FAQ", "Warranty", "Service Center", "Blog"].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                    data-ocid="footer.link"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/80 mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +91 98765 43210
              </a>
              <a
                href="mailto:hello@aquamancare.com"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                hello@aquamancare.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {year} Aquaman Care. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Built with &#10084;&#65039; using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
