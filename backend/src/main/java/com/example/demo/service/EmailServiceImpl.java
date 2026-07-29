package com.example.demo.service;

import com.example.demo.model.Order;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.example.demo.model.SiteSettings;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final SiteSettingsService siteSettingsService;

    @Value("${spring.mail.properties.mail.from:onboarding@resend.dev}")
    private String mailFrom;

    @Async
    @Override
    public void sendNewOrderEmail(Order order) {
        SiteSettings settings = siteSettingsService.getSettings();
        String adminDest = settings.getEmail();

        if (adminDest == null || adminDest.isEmpty() || adminDest.equals("votre.email@gmail.com")) {
            System.out.println("Email non configuré. Commande #" + order.getId() + " reçue mais non notifiée par email.");
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(mailFrom);
            helper.setTo(adminDest);
            helper.setSubject("🌿 Souss Garden - Nouvelle Commande #" + order.getId());

            String htmlContent = "<h2>Nouvelle commande reçue !</h2>"
                    + "<p><strong>Client :</strong> " + order.getCustomerName() + "</p>"
                    + "<p><strong>Téléphone :</strong> " + order.getCustomerPhone() + "</p>"
                    + "<p><strong>Montant Total :</strong> " + order.getTotalAmount() + " MAD</p>"
                    + "<p><strong>Paiement :</strong> À la livraison (Cash)</p>"
                    + "<br>"
                    + "<p><a href='http://localhost:3000/admin/orders'>Voir la commande dans l'administration</a></p>";

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            System.err.println("Erreur lors de l'envoi de l'email : " + e.getMessage());
        }
    }

    @Async
    @Override
    public void sendCustomerConfirmationEmail(Order order) {
        if (order.getCustomerEmail() == null || order.getCustomerEmail().isEmpty()) {
            System.out.println("Email client non fourni. Commande #" + order.getId() + " - email non envoyé.");
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(mailFrom);
            helper.setTo(order.getCustomerEmail());
            helper.setSubject("🌿 Souss Garden - Confirmation de votre commande #" + order.getId());

            String htmlContent = "<h2>Merci pour votre commande !</h2>"
                    + "<p>Bonjour " + order.getCustomerName() + ",</p>"
                    + "<p>Nous avons bien reçu votre commande d'un montant total de <strong>" + order.getTotalAmount() + " MAD</strong>.</p>"
                    + "<p>Le paiement se fera à la livraison.</p>"
                    + "<br>"
                    + "<p>Nous vous contacterons très prochainement au <strong>" + order.getCustomerPhone() + "</strong> pour la livraison à l'adresse suivante :</p>"
                    + "<p><em>" + order.getCustomerAddress() + "</em></p>"
                    + "<br>"
                    + "<p>À très bientôt sur Jardin Souss !</p>";

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            System.err.println("Erreur lors de l'envoi de l'email client : " + e.getMessage());
        }
    }
}
