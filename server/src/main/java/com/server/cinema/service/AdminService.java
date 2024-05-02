package com.server.cinema.service;

import java.util.NoSuchElementException;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.dto.AdminDTO;
import com.server.cinema.entity.Admin;
import com.server.cinema.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(final AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public AdminDTO getAdmin(final String username, final String password) {
        final Admin admin = adminRepository.findByUsername(username)
                .orElseThrow();
        if (BCrypt.checkpw(password, admin.getEncryptedPassword())) {
            return new AdminDTO(admin.getId(), admin.getUsername());
        } else {
            throw new NoSuchElementException();
        }

    }

}
