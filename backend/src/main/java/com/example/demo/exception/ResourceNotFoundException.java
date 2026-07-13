package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception levée lorsqu'une ressource demandée n'est pas trouvée en BDD.
 * Spring renverra automatiquement un HTTP 404.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resourceName, Long id) {
        super(String.format("Ressource '%s' avec l'id %d introuvable.", resourceName, id));
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
