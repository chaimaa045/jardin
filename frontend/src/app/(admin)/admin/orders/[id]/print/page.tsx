'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { orderApi } from '@/services/api';
import type { Order } from '@/types/admin';
import { Loader2, Printer, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { clientProfile } from '@/data/profile';

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
    <div className="bg-[#f8f9fa] min-h-screen text-black p-8 font-sans print:bg-white print:p-0 print:m-0 flex justify-center">
      
      {/* Boutons d'action visibles seulement à l'écran */}
      <div className="print:hidden absolute top-8 left-8 flex flex-col gap-4">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-primary bg-white shadow-sm font-bold hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" /> Retour
        </button>
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 bg-[#142C14] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#142C14]/90 transition-colors shadow-md"
        >
          <Printer className="w-5 h-5" /> Lancer l'impression
        </button>
      </div>

      {/* Reçu de commande - A4 Conteneur (A4 = 210mm x 297mm) */}
      <div className="w-[210mm] min-h-[297mm] bg-white print:shadow-none shadow-2xl border border-gray-200 print:border-none p-12 print:p-6 rounded-none relative">
        
        {/* Ligne de décoration en haut */}
        <div className="absolute top-0 left-0 w-full h-3 bg-[#142C14] print:bg-black"></div>

        {/* En-tête : Logo et Infos Entreprise vs Infos Commande */}
        <div className="flex justify-between items-start mt-4 mb-8">
          <div className="flex flex-col max-w-[55%]">
            <h1 className="text-3xl font-black text-[#142C14] print:text-black font-serif uppercase tracking-wider mb-2">
              {clientProfile.company.businessName}
            </h1>
            <div className="space-y-1 mt-2 text-sm text-gray-600 print:text-gray-800">
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {clientProfile.company.address}, {clientProfile.company.city}</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {clientProfile.company.gsm} / {clientProfile.company.telFax}</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {clientProfile.company.email}</p>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="bg-[#142C14] print:bg-black text-white px-5 py-2 rounded-md mb-4">
              <h2 className="text-xl font-bold uppercase tracking-widest">Reçu de Caisse</h2>
            </div>
            <div className="space-y-1 text-sm text-gray-700">
              <p>Facture N°: <span className="font-bold text-black ml-1">{new Date(order.createdAt).getFullYear()}-{String(order.id).padStart(4, '0')}</span></p>
              <p>Date: <span className="font-bold text-black ml-1">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span></p>
              <p>Statut: <span className="font-bold text-black ml-1 uppercase">{order.status}</span></p>
            </div>
          </div>
        </div>

        {/* Informations Client */}
        <div className="mb-8 border border-gray-200 print:border-gray-400 p-5 rounded-lg bg-gray-50 print:bg-transparent">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Facturé à</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-lg text-[#142C14] print:text-black">{order.customerName}</p>
              <p className="text-sm text-gray-700 mt-1">{order.customerPhone}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-700">{order.customerAddress}</p>
            </div>
          </div>
        </div>

        {/* Tableau des Articles */}
        <div className="mb-8 flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#142C14] print:border-black text-[#142C14] print:text-black">
                <th className="py-2 px-2 font-bold text-sm uppercase">Désignation</th>
                <th className="py-2 px-2 font-bold text-sm uppercase text-center w-24">Qté</th>
                <th className="py-2 px-2 font-bold text-sm uppercase text-right w-32">P.U (DH)</th>
                <th className="py-2 px-2 font-bold text-sm uppercase text-right w-32">Montant (DH)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 print:divide-gray-400">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-2 text-sm font-semibold text-gray-800">{item.productName}</td>
                  <td className="py-3 px-2 text-sm text-center text-gray-800">{item.quantity}</td>
                  <td className="py-3 px-2 text-sm text-right text-gray-600">{item.price.toFixed(2)}</td>
                  <td className="py-3 px-2 text-sm text-right font-bold text-black">{((item.price * item.quantity)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section Bas : Signatures + Total */}
        <div className="flex justify-between items-start pt-4 border-t-2 border-[#142C14] print:border-black">
          
          {/* Signatures */}
          <div className="flex gap-12 flex-1 pt-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-16">Signature Client</p>
              <div className="w-32 border-t border-gray-400"></div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-16">Cachet / Signature</p>
              <div className="w-32 border-t border-gray-400"></div>
            </div>
          </div>

          {/* Total Box */}
          <div className="w-72 bg-[#142C14]/5 print:bg-transparent print:border print:border-black p-4 rounded-lg">
            <div className="flex justify-between items-center text-gray-600 mb-2">
              <span className="text-sm">Sous-total</span>
              <span className="text-sm font-medium">{order.totalAmount.toFixed(2)} DH</span>
            </div>
            <div className="flex justify-between items-center text-gray-600 mb-3 pb-3 border-b border-gray-300 print:border-gray-400">
              <span className="text-sm">Livraison</span>
              <span className="text-sm font-medium text-emerald-600 print:text-black">Offerte</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-black text-[#142C14] print:text-black">TOTAL NET</span>
              <span className="text-lg font-black text-[#142C14] print:text-black">{order.totalAmount.toFixed(2)} DH</span>
            </div>
          </div>
          
        </div>

        {/* Footer text (absolu en bas de la page A4) */}
        <div className="absolute bottom-6 left-0 w-full px-12 print:px-6 text-center text-[10px] text-gray-400 print:text-gray-600">
          <div className="border-t border-gray-200 print:border-gray-400 pt-4 mb-2 flex justify-center gap-4">
            <span>ICE: {clientProfile.company.ice}</span>
            <span>RC: {clientProfile.company.rc}</span>
            <span>Patente: {clientProfile.company.pat}</span>
            <span>IF: {clientProfile.company.tva}</span>
          </div>
          <p>Merci de votre confiance. En cas de réclamation, veuillez nous contacter sous 48h.</p>
          <p className="mt-1 font-bold">{clientProfile.company.businessName} © {new Date().getFullYear()}</p>
        </div>

      </div>
    </div>
  );
}
