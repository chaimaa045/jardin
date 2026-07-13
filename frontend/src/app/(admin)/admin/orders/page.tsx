'use client';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { orderApi } from '@/services/api';
import type { Order } from '@/types/admin';
import { Loader2, ShoppingBag, User, Phone, MapPin, Eye, AlertCircle } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, orderId: number | null, newStatus: string}>({
    isOpen: false,
    orderId: null,
    newStatus: ''
  });

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await orderApi.getAdminAll();
      setOrders(data as Order[]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const confirmStatusUpdate = async () => {
    if (confirmModal.orderId === null || !confirmModal.newStatus) return;
    try {
      await orderApi.updateStatus(confirmModal.orderId, confirmModal.newStatus);
      await loadOrders();
    } catch (e) {
      alert('Erreur lors de la mise à jour du statut.');
    } finally {
      setConfirmModal({ isOpen: false, orderId: null, newStatus: '' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NOUVELLE': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'ACCEPTEE': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'LIVREE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ANNULEE': return 'bg-red-100 text-red-700 border-red-200';
      case 'RETOURNEE': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'NOUVELLE': return 'Nouvelle';
      case 'ACCEPTEE': return 'Acceptée';
      case 'LIVREE': return 'Livrée';
      case 'ANNULEE': return 'Annulée';
      case 'RETOURNEE': return 'Retournée';
      default: return status;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary font-serif">Commandes</h1>
          <p className="text-primary/60 mt-2">Gérez les commandes de vos clients</p>
        </div>

        <div className="bg-white border border-[#e5dfd5] rounded-2xl overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-primary/60">
              <Loader2 className="w-8 h-8 animate-spin mr-3 text-secondary" />
              Chargement des commandes…
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e5dfd5]">
                <ShoppingBag className="w-8 h-8 text-primary/30" />
              </div>
              <p className="text-primary/60 text-lg">Aucune commande pour l'instant.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-surface text-primary/70 text-xs uppercase font-semibold border-b border-[#e5dfd5]">
                  <tr>
                    <th className="px-6 py-4">Commande</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Montant</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5dfd5]">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-primary">{order.id}</p>
                        <p className="text-xs text-primary/50 mt-1">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-primary/40" />
                          <span className="font-bold text-primary">{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <Phone className="w-4 h-4 text-primary/40" />
                          <span className="text-xs text-primary/80 font-medium">{order.customerPhone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                          <span className="text-xs text-primary/60 line-clamp-2" title={order.customerAddress}>
                            {order.customerAddress}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-secondary text-base">{order.totalAmount.toFixed(2)} DH</span>
                        <p className="text-xs font-semibold text-primary/50 bg-surface border border-[#e5dfd5] inline-block px-2 py-0.5 rounded-md mt-1">
                          {order.items.length} article(s)
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <select 
                          value=""
                          onChange={(e) => {
                            if (e.target.value) {
                              setConfirmModal({ isOpen: true, orderId: order.id, newStatus: e.target.value });
                            }
                          }}
                          className="bg-surface border border-[#e5dfd5] text-primary text-sm font-semibold rounded-xl focus:ring-secondary focus:border-secondary block w-full p-2"
                        >
                          <option value="">Modifier statut...</option>
                          <option value="NOUVELLE">Nouvelle</option>
                          <option value="ACCEPTEE">Accepter</option>
                          <option value="LIVREE">Marquer Livrée</option>
                          <option value="ANNULEE">Annuler</option>
                          <option value="RETOURNEE">Retournée</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Confirmation */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-primary font-serif text-center mb-2">
              Confirmer le changement
            </h3>
            
            <p className="text-center text-primary/70 mb-8">
              Voulez-vous vraiment passer la commande <span className="font-bold">#{confirmModal.orderId}</span> au statut <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(confirmModal.newStatus)}`}>{getStatusLabel(confirmModal.newStatus)}</span> ?
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setConfirmModal({ isOpen: false, orderId: null, newStatus: '' })}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-primary bg-surface hover:bg-[#e5dfd5] transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={confirmStatusUpdate}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-secondary hover:bg-secondary/90 transition-colors shadow-md"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
