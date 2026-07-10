"use client";
import React from 'react';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import Image from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';

// Icône de corbeille (Trash) pour la suppression
const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7 21q-.825 0-1.412-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
);

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center py-24">
        <SectionTitle 
          title="Votre panier est vide" 
          subtitle="Oops!"
          centered 
        />
        <p className="text-lg text-gray-600 mb-8">
          Il semble que vous n'ayez encore rien ajouté. Explorez notre boutique pour trouver votre bonheur.
        </p>
        <Link href="/shop" passHref>
          <span className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
            Retour à la boutique
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <SectionTitle title="Mon Panier" subtitle="Récapitulatif" centered />

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section className="lg:col-span-8 bg-white rounded-xl shadow-md p-6">
          <ul role="list" className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="flex-shrink-0">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden border border-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gray-50">🪴</div>
                  </div>
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        <Link href={`/shop/${item.id}`} className="hover:text-primary">{item.name}</Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      <p className="mt-2 text-lg font-bold text-primary">{item.price} DH</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <div className="flex items-center">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                      <div className="absolute top-0 right-0">
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-gray-400 hover:text-red-600 transition-colors p-2"
                          aria-label="Supprimer l'article"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Résumé de la commande */}
        <section className="mt-16 lg:mt-0 lg:col-span-4 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Résumé du panier</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <p className="text-gray-600">Sous-total</p>
              <p className="font-semibold text-gray-800">{totalPrice} DH</p>
            </div>
            <div className="flex items-center justify-between text-lg">
              <p className="text-gray-600">Livraison</p>
              <p className="font-semibold text-gray-800">Calculée à la prochaine étape</p>
            </div>
            <div className="border-t pt-4 flex items-center justify-between text-xl font-bold text-gray-900">
              <p>Total</p>
              <p>{totalPrice} DH</p>
            </div>
          </div>
          <div className="mt-8">
            <button className="w-full bg-primary text-white py-3 px-4 rounded-lg font-bold hover:bg-primary/90 transition-transform duration-300 transform hover:scale-105 shadow-lg">
              Valider la commande
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link href="/shop" className="text-sm font-medium text-primary hover:text-primary/80">
              Continuer mes achats
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
