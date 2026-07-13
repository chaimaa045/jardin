'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Mail, CheckCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-4 shadow-sm">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary font-serif">Souss Garden</h1>
          <p className="text-primary/60 text-sm mt-1">Espace Administration</p>
        </div>

        {/* Carte du formulaire */}
        <div className="bg-white border border-[#e5dfd5] rounded-3xl p-8 shadow-md">
          <h2 className="text-xl font-bold text-primary mb-6">Connexion</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Champ Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-primary mb-2">
                Identifiant
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="admin"
                className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3
                           placeholder-primary/40 focus:outline-none focus:ring-2 focus:ring-secondary/50
                           focus:border-secondary transition-all duration-200"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-primary">
                  Mot de passe
                </label>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowForgotModal(true);
                    setForgotSent(false);
                    setForgotEmail('');
                  }}
                  className="text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3 pr-12
                             placeholder-primary/40 focus:outline-none focus:ring-2 focus:ring-secondary/50
                             focus:border-secondary transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary transition-colors"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-secondary hover:bg-secondary/90 disabled:opacity-50
                         disabled:cursor-not-allowed text-white font-bold rounded-xl py-3.5
                         transition-all duration-200 flex items-center justify-center gap-2 shadow-sm mt-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Pied de carte */}
          <p className="text-center text-xs text-primary/40 mt-6 font-medium">
            Accès réservé au propriétaire • Souss Garden
          </p>
        </div>
      </div>

      {/* Modal Mot de Passe Oublié */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl animate-in zoom-in-95 duration-200 relative">
            <button 
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-primary/40 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {forgotSent ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary font-serif mb-2">Email envoyé !</h3>
                <p className="text-sm text-primary/60 mb-6">
                  Si cette adresse est associée à votre compte, vous recevrez un lien pour réinitialiser votre mot de passe d'ici quelques minutes.
                </p>
                <button 
                  onClick={() => setShowForgotModal(false)}
                  className="w-full bg-surface text-primary py-3 rounded-xl font-bold hover:bg-[#e5dfd5] transition-colors"
                >
                  Retour à la connexion
                </button>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-primary font-serif mb-2">Mot de passe oublié</h3>
                <p className="text-sm text-primary/60 mb-6">
                  Entrez l'adresse email associée à votre compte pour recevoir un lien de réinitialisation.
                </p>

                <form onSubmit={(e) => { e.preventDefault(); setForgotSent(true); }} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full bg-surface border border-[#e5dfd5] text-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={!forgotEmail}
                    className="w-full bg-secondary text-white py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Envoyer le lien
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
