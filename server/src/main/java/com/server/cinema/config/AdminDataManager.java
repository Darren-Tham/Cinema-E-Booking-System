package com.server.cinema.config;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.server.cinema.entity.Admin;
import com.server.cinema.repository.AdminRepository;
import com.server.cinema.config.interfaces.InitRunnable;

@Component
public class AdminDataManager implements InitRunnable {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminDataManager(final AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public void init() {
        final String username = "admin";
        if (adminRepository.findByUsername(username).isPresent()) {
            return;
        }
        final String encryptedPassword = BCrypt.hashpw("swe12345", BCrypt.gensalt());
        final Admin admin = new Admin(username, encryptedPassword);
        adminRepository.save(admin);
    }

}
