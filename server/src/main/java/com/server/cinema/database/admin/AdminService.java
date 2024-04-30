package com.server.cinema.database.admin;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.admin.dto.AdminDTO;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(final AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public AdminDTO getAdminCredentials(final String username, final String password) {
        return adminRepository.findByUsername(username).map(
                (final Admin admin) -> new AdminDTO(admin.getId(), admin.getEncryptedPassword(), admin.getUsername()))
                .orElseThrow();
    }

}
