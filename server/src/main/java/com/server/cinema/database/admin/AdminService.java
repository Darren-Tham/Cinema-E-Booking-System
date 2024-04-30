package com.server.cinema.database.admin;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(final AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public AdminDTO getAdmin(final String username, final String password) {
        final String msg = String.format("Admin with username `%s` and password `%s` does not exist.", username,
                password);
        final AdminNotFoundException e = new AdminNotFoundException(msg);
        final Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() -> e);
        if (!BCrypt.checkpw(password, admin.getEncryptedPassword())) {
            throw e;
        }

        return new AdminDTO(admin.getId(), admin.getUsername());
    }

}
