"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getContactFormSchema, ContactFormValues } from "@/lib/validations";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const tForm = useTranslations('Contact.form');
  const tVal = useTranslations('Contact.validation');
  
  const schema = getContactFormSchema(tVal);

  // 🟢 1. On ajoute un état pour gérer le message de statut (succès ou erreur)
  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ContactFormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        name: "",
        phone: "",
        email: "",
        projectType: "",
        message: "",
        consent: false,
      },
    });

  // 🟢 2. On utilise fetch pour envoyer les données en arrière-plan (AJAX)
  const onSubmit = async (data: ContactFormValues) => {
    setStatus(null); // On réinitialise le statut à chaque nouvel envoi

    try {
      // Attention à bien rajouter "/ajax/" dans l'URL de FormSubmit
      const res = await fetch('https://formsubmit.co/ajax/fakriabdul1966@gmail.com@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nom: data.name,
          Téléphone: data.phone,
          Email: data.email || "Non renseigné",
          Projet: data.projectType || "Non spécifié",
          Message: data.message || "Aucun message",
          _subject: `Nouveau lead depuis le site : ${data.name}`,
          _template: 'table'
        })
      });

      if (res.ok) {
        // Succès : on affiche le message et on vide le formulaire
        setStatus({ type: 'success', text: "✅ Votre message a été envoyé avec succès ! Nous vous recontacterons vite." });
        reset(); 
      } else {
        setStatus({ type: 'error', text: "❌ Une erreur est survenue lors de l'envoi." });
      }
    } catch (error) {
      setStatus({ type: 'error', text: "❌ Erreur de réseau. Veuillez vérifier votre connexion." });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-muted">{tForm('name_label')}</label>
        <input
          {...register("name")}
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder={tForm('name_placeholder')}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-muted">{tForm('phone_label')}</label>
        <input
          {...register("phone")}
          dir="ltr"
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-left rtl:text-right"
          placeholder={tForm('phone_placeholder')}
        />
        {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-muted">{tForm('email_label')}</label>
        <input
          {...register("email")}
          type="email"
          dir="ltr"
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-left rtl:text-right"
          placeholder={tForm('email_placeholder')}
        />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-muted">{tForm('project_label')}</label>
        <select
          {...register("projectType")}
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <option value="">{tForm('project_select')}</option>
          {/* 🟢 C'est ici que les options sont générées (de 0 à 5) */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <option key={i} value={tForm(`project_options.${i}`)}>
              {tForm(`project_options.${i}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted">
          {tForm('msg_label')} <span className="text-xs text-zinc-400 font-normal">(Optionnel)</span>
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
          placeholder={tForm('msg_placeholder')}
        />
        {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          type="checkbox"
          {...register("consent")}
          className="mt-1 h-4 w-4 rounded text-secondary focus:ring-secondary shrink-0"
        />
        <label htmlFor="consent" className="text-sm text-muted">
          {tForm('consent')}
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-600 mt-1">{errors.consent.message}</p>}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? tForm('submitting') : tForm('submit')}
        </button>
      </div>

      {/* 🟢 3. Affichage du message de succès ou d'erreur sous le bouton */}
      {status && (
        <div className={`p-4 rounded-lg text-sm font-medium text-center mt-4 ${status.type === 'success' ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
          {status.text}
        </div>
      )}

    </form>
  );
}