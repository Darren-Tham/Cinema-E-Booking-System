package com.server.cinema.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The purpose of this class is to make sure the server
 * is up and running before the frontend uses the server.
 * In the docker-compose.yml, a request will be made to
 * this controller, and when the request is success, that
 * means the server can now be used for the frontend.
 */
@RestController
@RequestMapping("api/health")
final class HealthController {

    private HealthController() {
    }

    @GetMapping
    static String health() {
        return "OK";
    }
}
