package com.server.cinema.database.admin;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.cinema.database.admin.dao.AdminDAO;

@Service
public class AdminService {

    private final AdminDAO adminDAO;

    @Autowired
    public AdminService(final AdminDAO adminDAO) {
        this.adminDAO = adminDAO;
    }

    public boolean adminCredentialsCorrect(final String username, final String password) {
        Optional<Admin> admin = adminDAO.findByUsername(username);
        return admin.isPresent() && BCrypt.checkpw(password, admin.get().getEncryptedPassword());
    }

}
