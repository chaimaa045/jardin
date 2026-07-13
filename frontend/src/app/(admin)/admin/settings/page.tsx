'use client';
import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Shield, Key, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { authApi } from '@/services/api';

export default function AdminSettingsPage() {
  const { user } = useAuth();
  
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    try {
      // Simulation pour l'instant
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Le mot de passe a été mis à jour (simulation).' });
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Erreur lors du changement de mot de passe.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary font-serif">Paramètres</h1>
          <p className="text-primary/60 mt-2">Informations du compte et configuration</p>
        </div>

        <div className="max-w-3xl grid gap-8">
          {/* Infos compte */}
          <div className="bg-white border border-[#e5dfd5] rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 font-serif">
              <Shield className="w-5 h-5 text-secondary" />
              Compte administrateur
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#e5dfd5]">
                <span className="text-primary/60 font-semibold">Identifiant</span>
                <span className="text-primary font-bold bg-surface px-4 py-1.5 rounded-lg border border-[#e5dfd5]">{user?.username || 'admin'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#e5dfd5]">
                <span className="text-primary/60 font-semibold">Rôle</span>
                <span className="text-secondary font-bold text-sm bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full">
                  Administrateur
                </span>
              </div>
            </div>
          </div>

          {/* Changer le mot de passe */}
          <div className="bg-white border border-[#e5dfd5] rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 font-serif">
              <Key className="w-5 h-5 text-secondary" />
              Changer le mot de passe
            </h2>

            {message && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border ${
                message.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-red-50 text-red-600 border-red-200'
              }`}>
                {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                {message.text}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Mot de passe actuel</label>
                <input
                  type="password" required value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})}
                  className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Nouveau mot de passe</label>
                  <input
                    type="password" required value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})}
                    className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Confirmer le mot de passe</label>
                  <input
                    type="password" required value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                    className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit" disabled={isSubmitting}
                  className="bg-secondary text-white font-bold py-3 px-8 rounded-xl hover:bg-secondary/90 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                  Enregistrer le mot de passe
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
