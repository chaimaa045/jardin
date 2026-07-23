"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing"; 
import { Menu, X, Leaf, Phone, Globe, ShoppingCart, Search, User, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { clientProfile as profile } from '@/data/profile';
import { useCart } from "@/hooks/useCart";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { totalItems } = useCart();
  const t = useTranslations("Header");

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.portfolio"), href: "/realisations" },
    { 
      name: t("nav.shop"), 
      href: "/shop",
      hasDropdown: true,
      dropdownItems: [
        { name: t("shopCategories.plants"), href: "/shop?category=plants" },
        { name: t("shopCategories.shrubs"), href: "/shop?category=shrubs" },
        { name: t("shopCategories.tools"), href: "/shop?category=tools" },
        { name: t("shopCategories.furniture"), href: "/shop?category=furniture" },
        { name: t("shopCategories.accessories"), href: "/shop?category=accessories" }
      ]
    },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.about"), href: "/a-propos" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const toggleLanguage = () => {
    const nextLocale = locale === "fr" ? "ar" : "fr";
    router.replace(pathname, { locale: nextLocale });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
       router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
       setIsSearchOpen(false);
    }
  };

  const telHref = profile?.company?.gsm?.replace(/^0/, "+212") || profile?.company?.gsm || "";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobileItem(null);
  }, [pathname]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-40 pointer-events-none flex flex-col">
      {/* Topbar */}
      <div className={cn(
        "bg-primary-dark text-white/90 px-4 text-xs font-medium pointer-events-auto transition-all duration-300 hidden lg:block",
        isScrolled ? "h-0 opacity-0 overflow-hidden py-0" : "h-[36px] opacity-100 py-2"
      )}>
        <div className="container mx-auto flex justify-end items-center h-full gap-6">
          <a href={`tel:${telHref}`} className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span dir="ltr">{profile?.company?.gsm}</span>
          </a>
          <button onClick={toggleLanguage} className="flex items-center gap-1.5 hover:text-accent transition-colors uppercase">
            <Globe className="w-3.5 h-3.5" />
            {locale === "fr" ? t("buttons.switch_ar") : t("buttons.switch_fr")}
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div 
        className={cn(
          "pointer-events-auto transition-all duration-300 relative z-50",
          "mt-3 mx-3 rounded-[2rem] lg:mt-0 lg:mx-0 lg:rounded-none",
          isScrolled 
            ? "bg-background/95 backdrop-blur-md shadow-elegant py-2 lg:py-3" 
            : "bg-background/90 backdrop-blur-md shadow-lg lg:shadow-none py-3 lg:py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group z-50 flex-shrink-0">
            <div className="text-primary group-hover:text-secondary transition-colors">
              <Leaf className="w-6 h-6 lg:w-8 lg:h-8" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg lg:text-xl leading-none tracking-tight text-primary">
                FLORA DECOR
              </span>
              <span className="text-[10px] lg:text-xs font-medium leading-none tracking-widest uppercase text-secondary mt-0.5">
                FIKRI S.A.R.L
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    locale={locale}
                    className={cn(
                      "text-sm transition-colors flex items-center gap-1 whitespace-nowrap py-2",
                      isActive 
                        ? "text-secondary font-bold" 
                        : "text-text font-medium hover:text-secondary"
                    )}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                      <div className="bg-white rounded-2xl shadow-elegant border border-surface p-2 w-56 flex flex-col gap-1 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
                        {item.dropdownItems?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            locale={locale}
                            className="px-4 py-2.5 text-sm text-text font-medium hover:text-secondary hover:bg-surface rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 group/item"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary/30 group-hover/item:bg-secondary transition-colors"></span>
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA & Utilities */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            
            {/* Search */}
            <div className="relative flex items-center">
              <form 
                onSubmit={handleSearchSubmit}
                className={cn(
                  "flex items-center overflow-hidden transition-all duration-300 ease-in-out bg-surface rounded-full",
                  isSearchOpen ? "w-48 px-3 opacity-100 mr-1" : "w-0 opacity-0 pointer-events-none"
                )}
              >
                <input 
                  ref={searchInputRef}
                  type="text"
                  placeholder={t("utils.search") + "..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-sm py-1.5 text-text placeholder:text-zinc-400"
                />
                <button type="submit" className="text-zinc-400 hover:text-primary transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </form>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 text-text hover:text-secondary transition-colors rounded-full hover:bg-surface"
                aria-label={t("utils.search")}
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
            </div>

            {/* Account */}
            <Link 
              href="/account"
              className="p-2.5 text-text hover:text-secondary transition-colors rounded-full hover:bg-surface"
              aria-label={t("utils.account")}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link 
              href="/checkout" 
              className="relative p-2.5 text-text hover:text-secondary transition-colors rounded-full hover:bg-surface group"
              aria-label="Voir le panier"
            >
              <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/contact"
              className={cn(buttonVariants({}), "bg-accent hover:bg-accent/90 text-white rounded-full px-6 whitespace-nowrap inline-flex items-center justify-center ml-2 transition-transform hover:-translate-y-0.5 shadow-md")}
            >
              {t("buttons.quote")}
            </Link>
          </div>

          {/* Actions Mobile (Panier + Menu Burger) */}
          <div className="flex items-center gap-2 lg:hidden z-50">
            {/* Bouton Panier Mobile toujours visible */}
            <Link 
              href="/checkout" 
              className="p-2 text-primary bg-white/80 backdrop-blur rounded-lg shadow-card border border-surface relative"
              aria-label="Voir le panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="p-2 text-primary bg-white/80 backdrop-blur rounded-lg shadow-card border border-surface relative focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        className={cn(
          "fixed top-0 left-0 w-full h-[100dvh] bg-background z-40 transition-transform duration-300 lg:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto pointer-events-auto",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          locale === "ar" && isMobileMenuOpen ? "-translate-x-0" : ""
        )}
      >
        {/* Mobile Search */}
        <form onSubmit={handleSearchSubmit} className="relative mb-6">
          <input 
            type="text"
            placeholder={t("utils.search") + "..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-surface rounded-2xl py-3 px-4 text-text outline-none focus:border-secondary transition-colors"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-secondary">
            <Search className="w-5 h-5" />
          </button>
        </form>

        <nav className="flex flex-col gap-4 text-xl font-serif">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
            const isExpanded = expandedMobileItem === item.name;
            return (
              <div key={item.name} className="flex flex-col border-b border-surface/50 pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    locale={locale}
                    onClick={() => {
                      if (!item.hasDropdown) setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "py-2 transition-colors flex-1",
                      isActive ? "text-secondary font-bold" : "text-primary hover:text-secondary"
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <button 
                      onClick={() => setExpandedMobileItem(isExpanded ? null : item.name)}
                      className="p-2 text-primary bg-surface/50 rounded-lg ml-2"
                    >
                      <ChevronDown className={cn("w-5 h-5 transition-transform", isExpanded ? "rotate-180 text-secondary" : "")} />
                    </button>
                  )}
                </div>
                
                {/* Mobile Submenu Accordion */}
                {item.hasDropdown && (
                  <div className={cn(
                    "flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out font-sans",
                    isExpanded ? "max-h-64 opacity-100 mt-2 mb-2" : "max-h-0 opacity-0"
                  )}>
                    {item.dropdownItems?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        locale={locale}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="pl-4 py-2 text-base text-text/80 hover:text-secondary border-l-2 border-secondary/20 transition-colors flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-secondary/50"></span>
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          <Link
            href="/account"
            locale={locale}
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-2 transition-colors flex-1 text-primary hover:text-secondary border-b border-surface/50 pb-4 flex items-center gap-3"
          >
            <User className="w-5 h-5" />
            {t("utils.account")}
          </Link>
        </nav>
        
        <div className="mt-auto space-y-3 pt-8">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white shadow-sm hover:shadow-md border border-surface transition-all rounded-xl text-primary font-medium uppercase"
            >
              <Globe className="w-4 h-4 text-secondary" />
              {locale === "fr" ? t("buttons.switch_ar") : t("buttons.switch_fr")}
            </button>
            <a 
              href={`tel:${telHref}`} 
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white shadow-sm hover:shadow-md border border-surface transition-all rounded-xl text-primary font-medium"
            >
              <Phone className="w-4 h-4 text-secondary" />
              <span dir="ltr">{profile?.company?.gsm}</span>
            </a>
          </div>
          <Link 
            href="/contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(buttonVariants({ size: 'lg' }), "w-full text-lg rounded-xl inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white shadow-md")}
          >
            {t("buttons.quote_mobile")}
          </Link>
        </div>
      </div>
    </header>
  );
}