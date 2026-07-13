package com.example.demo.service;

import com.example.demo.model.Order;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${admin.username}")
    private String adminUsername; // Si on utilise l'username comme destinataire (ex: email)
    
    // On récupère plutôt une adresse dédiée, ou on envoie à SMTP_USERNAME par défaut
    @Value("${spring.mail.username}")
    private String adminEmail;

    public void sendNewOrderEmail(Order order) {
        if (adminEmail == null || adminEmail.isEmpty() || adminEmail.equals("votre.email@gmail.com")) {
            System.out.println("Email non configuré. Commande #" + order.getId() + " reçue mais non notifiée par email.");
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(adminEmail);
            helper.setTo(adminEmail);
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
}
