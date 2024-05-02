package com.server.cinema.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.dto.AdminDTO;
import com.server.cinema.service.AdminService;

@CrossOrigin
@RestController
@RequestMapping("api/admins")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(final AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/{username}/{password}")
    public AdminDTO getAdmin(@PathVariable final String username,
            @PathVariable final String password) {
        return adminService.getAdmin(username, password);
    }

}
