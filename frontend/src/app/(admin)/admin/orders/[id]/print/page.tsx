'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { orderApi } from '@/services/api';
import type { Order } from '@/types/admin';
import { Loader2, Printer, ArrowLeft } from 'lucide-react';

export default function OrderPrintPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (params.id) {
          const data = await orderApi.getAdminById(Number(params.id));
          setOrder(data as Order);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [params.id]);

  useEffect(() => {
    // Si la commande est chargée, on lance l'impression après un petit délai pour le rendu
    if (order) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [order]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-white">
        <p className="text-xl font-bold text-red-500 mb-4">Commande introuvable</p>
        <button onClick={() => window.close()} className="px-4 py-2 bg-primary text-white rounded-lg">Fermer</button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black p-8 font-sans print:p-0">
      
      {/* Boutons d'action visibles seulement à l'écran, cachés à l'impression */}
      <div className="print:hidden mb-8 flex items-center justify-between bg-surface p-4 rounded-xl border border-[#e5dfd5]">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-primary font-bold hover:bg-[#e5dfd5] px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Retour
        </button>
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 bg-secondary text-white font-bold px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors shadow-sm"
        >
          <Printer className="w-5 h-5" /> Lancer l'impression
        </button>
      </div>

      {/* Reçu de commande (A4 format roughly) */}
      <div className="max-w-3xl mx-auto bg-white print:max-w-none print:shadow-none shadow-lg border border-gray-200 print:border-none p-10 rounded-2xl">
        
        {/* En-tête */}
        <div className="flex justify-between items-start border-b-2 border-gray-200 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-black text-primary font-serif uppercase tracking-wider">JARDIN</h1>
            <p className="text-gray-500 mt-1">Boutique de Plantes & Décoration</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-widest">Bon de Livraison</h2>
            <p className="text-gray-500 mt-2">N° Commande: <span className="font-bold text-black">#{order.id}</span></p>
            <p className="text-gray-500">Date: <span className="font-bold text-black">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span></p>
          </div>
        </div>

        {/* Informations Client */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase">Informations du Client</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nom complet</p>
              <p className="font-bold text-lg">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Téléphone</p>
              <p className="font-bold text-lg">{order.customerPhone}</p>
            </div>
            <div className="col-span-2 mt-2">
              <p className="text-sm text-gray-500">Adresse de livraison</p>
              <p className="font-bold text-lg">{order.customerAddress}</p>
            </div>
          </div>
        </div>

        {/* Tableau des Articles */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase">Détails de la Commande</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="py-3 px-4 font-bold text-gray-700">Description</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-center">Qté</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-right">Prix Unitaire</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 px-4 font-bold">{item.productName}</td>
                  <td className="py-4 px-4 text-center font-bold">{item.quantity}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{item.price.toFixed(2)} DH</td>
                  <td className="py-4 px-4 text-right font-black">{((item.price * item.quantity)).toFixed(2)} DH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-end border-t-2 border-gray-800 pt-6">
          <div className="w-64">
            <div className="flex justify-between items-center text-xl font-black">
              <span>TOTAL</span>
              <span>{order.totalAmount.toFixed(2)} DH</span>
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="mt-20 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 italic mb-8">Merci pour votre commande ! Veuillez vérifier les articles lors de la livraison.</p>
          <div className="flex justify-between px-10">
            <div className="text-center">
              <p className="font-bold text-gray-800 border-t border-gray-300 pt-2 w-48">Cachet / Signature Boutique</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-800 border-t border-gray-300 pt-2 w-48">Signature Client</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
