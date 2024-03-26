package com.server.cinema.database.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(final AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/login/{username}/{password}")
    public ResponseEntity<Boolean> isAdminCredentialsCorrect(@PathVariable final String username,
            @PathVariable final String password) {
        return ResponseEntity.ok(adminService.adminCredentialsCorrect(username, password));
    }

}
