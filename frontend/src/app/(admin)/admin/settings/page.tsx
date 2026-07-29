'use client';
import { useState, useEffect } from 'react';
import { AdminPageLayout } from '@/components/admin/AdminPageLayout';
import { useAuth } from '@/hooks/useAuth';
import { Shield, Key, CheckCircle, AlertCircle, Loader2, Lock, Eye, EyeOff, Settings } from 'lucide-react';
import { authApi, settingsApi } from '@/services/api';

export default function AdminSettingsPage() {
  const { user } = useAuth();
  
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [usernameForm, setUsernameForm] = useState({ newUsername: user?.username || '' });
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Settings state
  const [siteSettings, setSiteSettings] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    facebookUrl: '',
    instagramUrl: '',
    whatsappNumber: '',
    aboutText: ''
  });
  const [isSubmittingSettings, setIsSubmittingSettings] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    settingsApi.get().then(data => setSiteSettings(data)).catch(console.error);
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    try {
      await authApi.updatePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new
      });
      
      setMessage({ type: 'success', text: 'Le mot de passe a été mis à jour avec succès.' });
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Erreur lors du changement de mot de passe.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameForm.newUsername.trim()) return;

    setIsSubmittingProfile(true);
    setProfileMessage(null);
    try {
      const res = await authApi.updateProfile({
        newUsername: usernameForm.newUsername
      });
      setProfileMessage({ type: 'success', text: 'Identifiant mis à jour.' });
      // On rafraîchit la page pour forcer la mise à jour du contexte utilisateur
      setTimeout(() => window.location.reload(), 1500);
    } catch (err: any) {
      setProfileMessage({ type: 'error', text: err.message || 'Erreur lors de la modification.' });
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handleSettingsChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingSettings(true);
    setSettingsMessage(null);
    try {
      await settingsApi.update(siteSettings);
      setSettingsMessage({ type: 'success', text: 'Paramètres mis à jour avec succès.' });
    } catch (err: any) {
      setSettingsMessage({ type: 'error', text: err.message || 'Erreur lors de la modification.' });
    } finally {
      setIsSubmittingSettings(false);
    }
  };

  return (
    <AdminPageLayout>
      <div className="p-4 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary font-serif">Paramètres</h1>
          <p className="text-primary/60 mt-2">Informations du compte et configuration</p>
        </div>

        <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne Gauche: Infos compte */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white border border-[#e5dfd5] rounded-3xl p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors"></div>
              
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 border border-secondary/20 relative z-10">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              
              <h2 className="text-2xl font-bold text-primary mb-2 font-serif relative z-10">
                Profil Admin
              </h2>
              <p className="text-sm text-primary/50 mb-6 relative z-10">Gérez vos accès et informations de sécurité de la boutique.</p>
              
              <div className="space-y-4 relative z-10">
                <div className="bg-surface p-4 rounded-xl border border-[#e5dfd5]">
                  <span className="text-primary/50 text-xs font-bold uppercase tracking-wider block mb-1">Identifiant Actuel</span>
                  <span className="text-primary font-bold">{user?.username || 'admin'}</span>
                </div>
                <div className="bg-surface p-4 rounded-xl border border-[#e5dfd5]">
                  <span className="text-primary/50 text-xs font-bold uppercase tracking-wider block mb-1">Rôle Système</span>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3" /> Administrateur
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite: Formulaires */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Changer l'identifiant */}
            <div className="bg-white border border-[#e5dfd5] rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 font-serif">
                <Shield className="w-6 h-6 text-secondary" />
                Changer l'identifiant
              </h2>

              {profileMessage && (
                <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm font-medium border animate-in fade-in slide-in-from-top-2 ${
                  profileMessage.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}>
                  {profileMessage.type === 'success' ? <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />}
                  <p>{profileMessage.text}</p>
                </div>
              )}

              <form onSubmit={handleProfileChange} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Nouvel identifiant</label>
                  <input
                    type="text" required value={usernameForm.newUsername} onChange={e => setUsernameForm({newUsername: e.target.value})}
                    className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    placeholder={user?.username || 'Nouveau nom'}
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit" disabled={isSubmittingProfile || usernameForm.newUsername === user?.username}
                    className="w-full sm:w-auto bg-primary text-white font-bold py-3.5 px-8 rounded-xl hover:bg-primary/90 disabled:opacity-70 transition-all shadow-sm flex items-center justify-center gap-2 group"
                  >
                    {isSubmittingProfile ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    Mettre à jour l'identifiant
                  </button>
                </div>
              </form>
            </div>

            {/* Changer le mot de passe */}
            <div className="bg-white border border-[#e5dfd5] rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 font-serif">
                <Key className="w-6 h-6 text-secondary" />
                Sécurité du compte
              </h2>

              {message && (
                <div className={`mb-8 p-4 rounded-xl flex items-start gap-3 text-sm font-medium border animate-in fade-in slide-in-from-top-2 ${
                  message.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}>
                  {message.type === 'success' ? <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />}
                  <p>{message.text}</p>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-6">
                
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Mot de passe actuel</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-primary/40" />
                    </div>
                    <input
                      type={showPassword.current ? "text" : "password"} required value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})}
                      className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(prev => ({...prev, current: !prev.current}))} className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary/40 hover:text-secondary">
                      {showPassword.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="border-t border-[#e5dfd5] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Nouveau mot de passe</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-secondary/60" />
                      </div>
                      <input
                        type={showPassword.new ? "text" : "password"} required value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})}
                        className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                        placeholder="••••••••"
                      />
                      <button type="button" onClick={() => setShowPassword(prev => ({...prev, new: !prev.new}))} className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary/40 hover:text-secondary">
                        {showPassword.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Confirmer le nouveau</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-secondary/60" />
                      </div>
                      <input
                        type={showPassword.confirm ? "text" : "password"} required value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                        className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                        placeholder="••••••••"
                      />
                      <button type="button" onClick={() => setShowPassword(prev => ({...prev, confirm: !prev.confirm}))} className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary/40 hover:text-secondary">
                        {showPassword.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full sm:w-auto bg-secondary text-white font-bold py-3.5 px-8 rounded-xl hover:bg-secondary/90 disabled:opacity-70 transition-all shadow-sm flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    Mettre à jour la sécurité
                  </button>
                </div>
              </form>
            </div>

            {/* Paramètres du Site */}
            <div className="bg-white border border-[#e5dfd5] rounded-3xl p-8 shadow-sm mt-8">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 font-serif">
                <Settings className="w-6 h-6 text-secondary" />
                Paramètres du site (Informations publiques)
              </h2>

              {settingsMessage && (
                <div className={`mb-8 p-4 rounded-xl flex items-start gap-3 text-sm font-medium border animate-in fade-in slide-in-from-top-2 ${
                  settingsMessage.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}>
                  {settingsMessage.type === 'success' ? <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />}
                  <p>{settingsMessage.text}</p>
                </div>
              )}

              <form onSubmit={handleSettingsChange} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Nom de l'entreprise</label>
                    <input
                      type="text" value={siteSettings.companyName || ''} onChange={e => setSiteSettings({...siteSettings, companyName: e.target.value})}
                      className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Email de contact</label>
                    <input
                      type="email" value={siteSettings.email || ''} onChange={e => setSiteSettings({...siteSettings, email: e.target.value})}
                      className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Téléphone principal</label>
                    <input
                      type="tel" value={siteSettings.phone || ''} onChange={e => setSiteSettings({...siteSettings, phone: e.target.value})}
                      pattern="^(?:(?:\+|00)212|0)\s*[5-7](?:\s*\d){8}$"
                      title="Veuillez saisir un numéro de téléphone marocain valide (ex: 06 00 00 00 00 ou +212 6 00 00 00 00)"
                      className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Numéro WhatsApp</label>
                    <input
                      type="tel" value={siteSettings.whatsappNumber || ''} onChange={e => setSiteSettings({...siteSettings, whatsappNumber: e.target.value})}
                      pattern="^(?:(?:\+|00)212|0)\s*[5-7](?:\s*\d){8}$"
                      title="Veuillez saisir un numéro de téléphone marocain valide (ex: 06 00 00 00 00 ou +212 6 00 00 00 00)"
                      className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Lien Facebook</label>
                    <input
                      type="url" value={siteSettings.facebookUrl || ''} onChange={e => setSiteSettings({...siteSettings, facebookUrl: e.target.value})}
                      className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Lien Instagram</label>
                    <input
                      type="url" value={siteSettings.instagramUrl || ''} onChange={e => setSiteSettings({...siteSettings, instagramUrl: e.target.value})}
                      className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Adresse</label>
                  <textarea
                    rows={2} value={siteSettings.address || ''} onChange={e => setSiteSettings({...siteSettings, address: e.target.value})}
                    className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Texte "À propos" (bas de page)</label>
                  <textarea
                    rows={3} value={siteSettings.aboutText || ''} onChange={e => setSiteSettings({...siteSettings, aboutText: e.target.value})}
                    className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit" disabled={isSubmittingSettings}
                    className="w-full sm:w-auto bg-primary text-white font-bold py-3.5 px-8 rounded-xl hover:bg-primary/90 disabled:opacity-70 transition-all shadow-sm flex items-center justify-center gap-2 group"
                  >
                    {isSubmittingSettings ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    Sauvegarder les paramètres
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </AdminPageLayout>
  );
}
