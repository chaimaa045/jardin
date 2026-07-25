"use client";
import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { orderApi } from '@/services/api';
import { useRouter } from 'next/navigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Trash2 } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart, removeFromCart } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setShowConfirmModal(true);
  };

  const confirmAndSubmitOrder = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    setError(null);

    try {
      const orderData = {
        ...formData,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      await orderApi.create(orderData);
      setSuccess(true);
      clearCart();
    } catch (err) {
      setError("Une erreur est survenue lors de la commande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-2xl">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>
        <h1 className="text-3xl font-bold text-primary font-serif mb-4">Commande confirmée !</h1>
        <p className="text-primary/70 mb-8">
          Merci pour votre confiance. Nous avons bien reçu votre commande et nous vous contacterons
          très prochainement pour organiser la livraison.
        </p>
        <button 
          onClick={() => router.push('/shop')}
          className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary/90 transition-colors"
        >
          Retour à la boutique
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Votre panier est vide</h1>
        <button 
          onClick={() => router.push('/shop')}
          className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary/90 transition-colors"
        >
          Découvrir nos produits
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-5xl">
      <SectionTitle 
        title="Finaliser la commande" 
        subtitle="Paiement à la livraison"
        centered 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        {/* Formulaire */}
        <div className="bg-white p-8 rounded-3xl border border-[#e5dfd5] shadow-sm">
          <h2 className="text-xl font-bold text-primary font-serif mb-6">Vos coordonnées</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Nom complet *</label>
              <input
                type="text" name="customerName" required value={formData.customerName} onChange={handleChange}
                className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none"
                placeholder="ex: Ahmed Ben Ali"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Numéro de téléphone *</label>
              <input
                type="tel" name="customerPhone" required value={formData.customerPhone} onChange={handleChange}
                pattern="^(?:(?:\+|00)212|0)\s*[5-7](?:\s*\d){8}$"
                title="Veuillez saisir un numéro de téléphone marocain valide (ex: 06 00 00 00 00 ou +212 6 00 00 00 00)"
                className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none"
                placeholder="ex: 06 00 00 00 00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Adresse de livraison *</label>
              <textarea
                name="customerAddress" required value={formData.customerAddress} onChange={handleChange} rows={3}
                className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none resize-none"
                placeholder="Votre adresse complète..."
              />
            </div>

            <div className="bg-accent/10 text-accent p-4 rounded-xl text-sm font-medium border border-accent/20">
              ℹ️ Le paiement se fera en espèces à la livraison.
            </div>

            <button
              type="submit" disabled={isSubmitting}
              className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:bg-secondary/90 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Traitement en cours...' : 'Confirmer ma commande'}
            </button>
          </form>
        </div>

        {/* Récapitulatif */}
        <div>
          <div className="bg-surface p-8 rounded-3xl border border-[#e5dfd5]">
            <h2 className="text-xl font-bold text-primary font-serif mb-6">Récapitulatif</h2>
            
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-[#e5dfd5] relative group">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  ) : (
                    <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center text-xl">🪴</div>
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-primary text-sm">{item.name}</p>
                    <p className="text-xs text-primary/60">{item.price.toFixed(2)} DH x {item.quantity}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-bold text-secondary text-sm whitespace-nowrap">
                      {(item.price * item.quantity).toFixed(2)} DH
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1 bg-red-50 rounded-md transition-colors"
                      title="Retirer du panier"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#e5dfd5] pt-4 space-y-3">
              <div className="flex justify-between text-primary/70">
                <span>Sous-total</span>
                <span>{totalPrice.toFixed(2)} DH</span>
              </div>
              <div className="flex justify-between text-primary/70">
                <span>Frais de livraison</span>
                <span>À calculer</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-primary pt-3 border-t border-[#e5dfd5]">
                <span>Total estimé</span>
                <span className="text-secondary">{totalPrice.toFixed(2)} DH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation personnalisée */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-primary font-serif text-center mb-2">
              Confirmer la commande ?
            </h3>
            
            <p className="text-center text-primary/70 mb-8">
              Votre commande d'un total de <span className="font-bold text-secondary">{totalPrice.toFixed(2)} DH</span> sera validée. Le paiement se fera en espèces au moment de la livraison.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-primary bg-surface hover:bg-[#e5dfd5] transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={confirmAndSubmitOrder}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-secondary hover:bg-secondary/90 transition-colors shadow-md"
              >
                Oui, je confirme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
