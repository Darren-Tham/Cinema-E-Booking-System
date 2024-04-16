package com.server.cinema.database.admin.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.server.cinema.database.admin.Admin;
import com.server.cinema.database.admin.AdminRepository;

@Repository
public class AdminDAOJPA implements AdminDAO {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminDAOJPA(final AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Optional<Admin> findByUsername(final String username) {
        return adminRepository.findByUsername(username);
    }

}
