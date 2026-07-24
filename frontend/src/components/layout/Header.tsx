"use client";

import { useState, useEffect } from "react";
// 1. On importe useTranslations !
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing"; 
// Ajout de ShoppingCart pour l'icône du panier
import { Menu, X, Leaf, Phone, Globe, ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { clientProfile as profile } from '@/data/profile';
// Ajout du hook pour lire l'état du panier
import { useCart } from "@/hooks/useCart";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  
  // Récupération du nombre d'articles dans le panier
  const { totalItems } = useCart();

  // 2. On connecte le traducteur spécifiquement au bloc "Header" de nos fichiers JSON
  const t = useTranslations("Header");

  // 3. Ajout de la route "Boutique" au menu
  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.shop"), href: "/shop" }, // Pensez à ajouter "shop": "Boutique" dans vos fichiers de traduction
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.portfolio"), href: "/realisations" },
    { name: t("nav.about"), href: "/a-propos" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const toggleLanguage = () => {
    const nextLocale = locale === "fr" ? "ar" : "fr";
    router.replace(pathname, { locale: nextLocale });
  };

  const telHref = profile?.company?.gsm?.replace(/^0/, "+212") || profile?.company?.gsm || "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-40 pointer-events-auto">
      <div 
        className={cn(
          "pointer-events-auto transition-all duration-300 relative z-50",
          "mt-3 mx-3 rounded-[2rem] md:mt-0 md:mx-0 md:rounded-none",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-card py-2 md:py-3" 
            : "bg-white/90 backdrop-blur-md shadow-lg md:shadow-none py-3 md:py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group z-50 flex-shrink-0">
            <div className="text-primary group-hover:text-secondary transition-colors">
              <Leaf className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl leading-none tracking-tight text-primary">
                FLORA DECOR
              </span>
              <span className="text-xs md:text-sm font-medium leading-none tracking-widest uppercase text-secondary">
                FIKRI S.A.R.L
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  locale={locale}
                  className={cn(
                    "text-sm transition-colors hover:text-secondary whitespace-nowrap",
                    isActive 
                      ? "text-secondary font-bold" 
                      : "text-zinc-600 font-medium"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink-0">
            
            {/* Bouton Panier Desktop */}
            <Link 
              href="/checkout" 
              className="relative p-2 text-zinc-600 hover:text-secondary transition-colors"
              aria-label="Voir le panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-sm font-bold hover:text-secondary transition-colors text-primary uppercase"
              aria-label="Changer de langue"
            >
              <Globe className="w-4 h-4" />
              {/* 4. Utilisation du traducteur pour le bouton */}
              {locale === "fr" ? t("buttons.switch_ar") : t("buttons.switch_fr")}
            </button>
            <a
              href={`tel:${telHref}`}
              className="flex items-center gap-2 text-sm font-medium hover:text-secondary transition-colors text-primary whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">{profile?.company?.gsm}</span>
            </a>
            <Link
              href="/contact"
              className={cn(buttonVariants({}), "rounded-full px-6 whitespace-nowrap inline-flex items-center justify-center")}
            >
              {/* 5. Traduction du bouton devis */}
              {t("buttons.quote")}
            </Link>
          </div>

          {/* Actions Mobile (Panier + Menu Burger) */}
          <div className="flex items-center gap-3 lg:hidden z-50">
            
            {/* Bouton Panier Mobile toujours visible */}
            <Link 
              href="/checkout" 
              className="p-2 text-primary bg-white/80 backdrop-blur rounded-lg shadow-card border border-gray-100 relative"
              aria-label="Voir le panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="p-2 text-primary bg-white/80 backdrop-blur rounded-lg shadow-card border border-gray-100 relative focus:outline-none"
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
          "fixed top-0 left-0 w-full h-[100dvh] bg-white z-40 transition-transform duration-300 lg:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto pointer-events-auto",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          locale === "ar" && isMobileMenuOpen ? "-translate-x-0" : ""
        )}
      >
        <nav className="flex flex-col gap-6 text-xl font-serif">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
            return (
              <Link
                key={item.href}
                href={item.href}
                locale={locale}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "pb-3 border-b border-gray-100 transition-colors",
                  isActive ? "text-secondary font-bold border-secondary/30" : "text-primary hover:text-secondary"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto space-y-4 pt-8">
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-xl text-primary font-medium uppercase"
          >
            <Globe className="w-5 h-5 text-secondary" />
            {/* 6. Traduction du bouton mobile */}
            {locale === "fr" ? t("buttons.switch_ar_mobile") : t("buttons.switch_fr_mobile")}
          </button>
          <a 
            href={`tel:${telHref}`} 
            className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-xl text-primary font-medium"
          >
            <Phone className="w-5 h-5 text-secondary" />
            <span dir="ltr">{profile?.company?.gsm}</span>
          </a>
          <Link 
            href="/contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(buttonVariants({ size: 'lg' }), "w-full text-lg rounded-xl inline-flex items-center justify-center")}
          >
            {/* 7. Traduction du bouton devis mobile */}
            {t("buttons.quote_mobile")}
          </Link>
        </div>
      </div>
    </header>
  );
}