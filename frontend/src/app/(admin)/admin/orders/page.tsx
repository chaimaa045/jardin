'use client';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { orderApi } from '@/services/api';
import type { Order } from '@/types/admin';
import { Loader2, ShoppingBag, User, Phone, MapPin, Eye, AlertCircle, ChevronDown, Package, Trash2, Printer } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, orderId: number | null, newStatus: string}>({
    isOpen: false,
    orderId: null,
    newStatus: ''
  });
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{isOpen: boolean, orderId: number | null}>({
    isOpen: false,
    orderId: null
  });

  const toggleOrder = (id: number) => {
    setExpandedOrder(prev => prev === id ? null : id);
  };

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
      toast.success('Statut mis à jour avec succès.');
      await loadOrders();
    } catch (e) {
      toast.error('Erreur lors de la mise à jour du statut.');
    } finally {
      setConfirmModal({ isOpen: false, orderId: null, newStatus: '' });
    }
  };

  const confirmDeleteOrder = async () => {
    if (deleteConfirmModal.orderId === null) return;
    try {
      await orderApi.delete(deleteConfirmModal.orderId);
      toast.success('Commande supprimée avec succès.');
      await loadOrders();
    } catch (e) {
      toast.error('Erreur lors de la suppression de la commande.');
    } finally {
      setDeleteConfirmModal({ isOpen: false, orderId: null });
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
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary font-serif">Commandes</h1>
          <p className="text-primary/60 mt-2">Gérez les commandes de vos clients</p>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 bg-white border border-[#e5dfd5] rounded-2xl text-primary/60">
              <Loader2 className="w-8 h-8 animate-spin mr-3 text-secondary" />
              Chargement des commandes…
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#e5dfd5] rounded-2xl">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e5dfd5]">
                <ShoppingBag className="w-8 h-8 text-primary/30" />
              </div>
              <p className="text-primary/60 text-lg">Aucune commande pour l'instant.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white border border-[#e5dfd5] rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                {/* Header Carte Commande */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-primary text-xl font-serif">Commande #{order.id}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-primary/50 mt-1 flex items-center gap-1">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  <div className="flex items-center flex-wrap sm:flex-nowrap gap-3">
                    <div className="text-right mr-2">
                      <p className="font-black text-secondary text-xl">{order.totalAmount.toFixed(2)} DH</p>
                      <p className="text-xs font-bold text-primary/50">{order.items.length} article(s)</p>
                    </div>
                    
                    <select 
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          setConfirmModal({ isOpen: true, orderId: order.id, newStatus: e.target.value });
                        }
                      }}
                      className="bg-surface border border-[#e5dfd5] text-primary text-sm font-semibold rounded-xl focus:ring-secondary focus:border-secondary p-2.5 outline-none cursor-pointer"
                    >
                      <option value="">Modifier statut...</option>
                      <option value="NOUVELLE">Nouvelle</option>
                      <option value="ACCEPTEE">Accepter</option>
                      <option value="LIVREE">Marquer Livrée</option>
                      <option value="ANNULEE">Annuler</option>
                      <option value="RETOURNEE">Retournée</option>
                    </select>
                    
                    <button 
                      onClick={() => toggleOrder(order.id)}
                      className="p-2.5 bg-surface hover:bg-[#e5dfd5] rounded-xl transition-colors border border-[#e5dfd5] text-primary"
                      title={expandedOrder === order.id ? "Masquer les détails" : "Voir les détails"}
                    >
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedOrder === order.id ? 'rotate-180' : ''}`} />
                    </button>

                    <a 
                      href={`/admin/orders/${order.id}/print`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex p-2.5 rounded-xl transition-colors border ${order.status === 'ACCEPTEE' ? 'bg-secondary text-white border-secondary hover:bg-secondary/90' : 'bg-surface hover:bg-[#e5dfd5] border-[#e5dfd5] text-primary'}`}
                      title="Imprimer le reçu de livraison"
                    >
                      <Printer className="w-5 h-5" />
                    </a>
                    
                    <button 
                      onClick={() => setDeleteConfirmModal({ isOpen: true, orderId: order.id })}
                      className="p-2.5 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-200 text-red-600"
                      title="Supprimer la commande"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Contenu Étendu (Détails + Articles) */}
                {expandedOrder === order.id && (
                  <div className="mt-6 pt-6 border-t border-[#e5dfd5] grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    
                    {/* Infos Client */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary font-serif flex items-center gap-2">
                        <User className="w-4 h-4 text-secondary" />
                        Informations Client
                      </h4>
                      <div className="bg-surface p-4 rounded-xl text-sm space-y-3 border border-[#e5dfd5]/50">
                        <div className="flex items-start gap-3">
                          <User className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-primary/50 block text-xs">Nom complet</span>
                            <span className="font-bold text-primary">{order.customerName}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-primary/50 block text-xs">Téléphone</span>
                            <span className="font-bold text-primary">{order.customerPhone}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-primary/50 block text-xs">Adresse de livraison</span>
                            <span className="font-bold text-primary">{order.customerAddress}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Articles Commandés */}
                    <div className="lg:col-span-2 space-y-4">
                      <h4 className="font-semibold text-primary font-serif flex items-center gap-2">
                        <Package className="w-4 h-4 text-secondary" />
                        Articles commandés
                      </h4>
                      <div className="bg-surface rounded-xl overflow-hidden border border-[#e5dfd5]/50">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-[#e5dfd5]/30 text-primary/70 text-xs uppercase font-semibold">
                              <tr>
                                <th className="px-4 py-3">Produit</th>
                                <th className="px-4 py-3 text-center">Qté</th>
                                <th className="px-4 py-3 text-right">Prix Unité</th>
                                <th className="px-4 py-3 text-right">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e5dfd5]/50">
                              {order.items.map((item) => (
                                <tr key={item.id} className="hover:bg-white/50 transition-colors">
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-3 min-w-[200px]">
                                      {item.productImageUrl ? (
                                        <img src={item.productImageUrl.startsWith('http') || item.productImageUrl.startsWith('/') ? item.productImageUrl : `/${item.productImageUrl}`} alt={item.productName} className="w-10 h-10 rounded-lg object-cover border border-[#e5dfd5]" />
                                      ) : (
                                        <div className="w-10 h-10 rounded-lg bg-[#e5dfd5] flex items-center justify-center text-primary/30 text-xs">Img</div>
                                      )}
                                      <span className="font-bold text-primary">{item.productName}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-center font-black text-primary bg-[#e5dfd5]/20">{item.quantity}</td>
                                  <td className="px-4 py-3 text-right text-primary/70 font-medium">{item.price.toFixed(2)} DH</td>
                                  <td className="px-4 py-3 text-right font-black text-secondary">{(item.price * item.quantity).toFixed(2)} DH</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            ))
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
      {/* Modal de Confirmation Supression */}
      {deleteConfirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-primary font-serif text-center mb-2">
              Supprimer la commande
            </h3>
            
            <p className="text-center text-primary/70 mb-8">
              Voulez-vous vraiment supprimer la commande <span className="font-bold">#{deleteConfirmModal.orderId}</span> ? Cette action est irréversible. Le stock ne sera recrédité que si la commande n'était pas déjà annulée.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteConfirmModal({ isOpen: false, orderId: null })}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-primary bg-surface hover:bg-[#e5dfd5] transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={confirmDeleteOrder}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-md"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
