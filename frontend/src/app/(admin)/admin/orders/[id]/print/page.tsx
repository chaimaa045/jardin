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
    <div className="bg-white min-h-screen text-black p-8 font-sans print:p-0 print:m-0">
      
      {/* Boutons d'action visibles seulement à l'écran */}
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

      {/* Reçu de commande - A4 Conteneur */}
      <div className="max-w-[210mm] mx-auto bg-white print:max-w-none print:shadow-none shadow-xl border border-gray-200 print:border-none p-10 print:p-2 rounded-2xl print:rounded-none">
        
        {/* En-tête : Logo et Infos Entreprise vs Infos Commande */}
        <div className="flex justify-between items-start border-b-2 border-primary/20 pb-6 print:pb-4 mb-6 print:mb-4">
          <div className="flex flex-col">
            <h1 className="text-4xl print:text-3xl font-black text-primary font-serif uppercase tracking-wider flex items-center gap-2">
              JARDIN
            </h1>
            <p className="text-gray-500 print:text-gray-600 text-sm print:text-xs mt-1">Boutique de Plantes & Décoration</p>
            <p className="text-gray-400 print:text-gray-500 text-xs mt-1">Agadir, Maroc • contact@jardin.ma</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl print:text-xl font-bold text-gray-800 uppercase tracking-widest bg-gray-100 print:bg-transparent px-4 py-1 rounded-lg inline-block">Bon de Livraison</h2>
            <div className="mt-4 print:mt-2 space-y-1">
              <p className="text-gray-500 text-sm print:text-xs">N° Commande: <span className="font-bold text-black ml-2">#{order.id}</span></p>
              <p className="text-gray-500 text-sm print:text-xs">Date: <span className="font-bold text-black ml-2">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span></p>
            </div>
          </div>
        </div>

        {/* Informations Client */}
        <div className="mb-8 print:mb-4 bg-gray-50 print:bg-transparent p-6 print:p-0 rounded-xl">
          <h3 className="text-sm font-bold text-gray-400 border-b border-gray-200 pb-2 mb-3 uppercase tracking-wider">Destinataire</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 print:gap-y-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">Nom complet</p>
              <p className="font-bold text-base print:text-sm text-primary">{order.customerName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Téléphone</p>
              <p className="font-bold text-base print:text-sm text-primary">{order.customerPhone}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500 mb-1">Adresse de livraison</p>
              <p className="font-bold text-base print:text-sm text-primary">{order.customerAddress}</p>
            </div>
          </div>
        </div>

        {/* Tableau des Articles */}
        <div className="mb-8 print:mb-4 min-h-[250px] print:min-h-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary text-white print:bg-gray-200 print:text-black">
                <th className="py-3 px-4 print:py-2 print:px-2 font-bold text-sm print:text-xs rounded-l-lg print:rounded-none">Désignation de l'article</th>
                <th className="py-3 px-4 print:py-2 print:px-2 font-bold text-sm print:text-xs text-center w-24">Quantité</th>
                <th className="py-3 px-4 print:py-2 print:px-2 font-bold text-sm print:text-xs text-right w-32">P.U (DH)</th>
                <th className="py-3 px-4 print:py-2 print:px-2 font-bold text-sm print:text-xs text-right w-32 rounded-r-lg print:rounded-none">Montant (DH)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.items.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-transparent' : 'bg-gray-50/50 print:bg-transparent'}>
                  <td className="py-4 px-4 print:py-2 print:px-2 text-sm print:text-xs font-bold text-gray-800">{item.productName}</td>
                  <td className="py-4 px-4 print:py-2 print:px-2 text-sm print:text-xs text-center font-bold text-gray-800">{item.quantity}</td>
                  <td className="py-4 px-4 print:py-2 print:px-2 text-sm print:text-xs text-right text-gray-500">{item.price.toFixed(2)}</td>
                  <td className="py-4 px-4 print:py-2 print:px-2 text-sm print:text-xs text-right font-black text-primary">{((item.price * item.quantity)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section Bas : Signatures + Total (Côte à côte pour gagner de la place) */}
        <div className="flex justify-between items-end border-t-2 border-primary/20 pt-6 print:pt-4">
          
          {/* Signatures */}
          <div className="flex gap-16 print:gap-12 flex-1">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-12 print:mb-8 uppercase tracking-widest font-bold">Signature Boutique</p>
              <div className="w-40 border-t border-gray-300"></div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-12 print:mb-8 uppercase tracking-widest font-bold">Signature Client</p>
              <div className="w-40 border-t border-gray-300"></div>
            </div>
          </div>

          {/* Total Box */}
          <div className="bg-surface print:bg-transparent border border-[#e5dfd5] print:border-gray-800 p-6 print:p-4 rounded-xl w-72">
            <div className="flex justify-between items-center text-gray-500 mb-2 print:mb-1">
              <span className="text-sm print:text-xs">Sous-total</span>
              <span className="text-sm print:text-xs font-medium">{order.totalAmount.toFixed(2)} DH</span>
            </div>
            <div className="flex justify-between items-center text-gray-500 mb-4 print:mb-2 pb-4 print:pb-2 border-b border-gray-200">
              <span className="text-sm print:text-xs">Livraison</span>
              <span className="text-sm print:text-xs font-medium text-emerald-600">Offerte</span>
            </div>
            <div className="flex justify-between items-center text-xl print:text-lg font-black text-primary">
              <span>TOTAL</span>
              <span>{order.totalAmount.toFixed(2)} DH</span>
            </div>
          </div>
          
        </div>

        {/* Footer text */}
        <div className="mt-8 print:mt-6 text-center text-xs print:text-[10px] text-gray-400">
          <p>Merci pour votre confiance. En cas de réclamation, veuillez nous contacter sous 48h.</p>
          <p className="mt-1">Souss Garden © {new Date().getFullYear()} - Document généré électroniquement</p>
        </div>

      </div>
    </div>
  );
}
