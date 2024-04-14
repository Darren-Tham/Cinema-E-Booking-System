package com.server.cinema.database.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.database.admin.dto.AdminDTO;

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
    public ResponseEntity<AdminDTO> isAdminCredentialsCorrect(@PathVariable final String username,
            @PathVariable final String password) {
        AdminDTO admin = null;
        if (adminService.adminCredentialsCorrect(username, password)) {
            admin = new AdminDTO(1, password, username);
            return ResponseEntity.ok(admin);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

}
