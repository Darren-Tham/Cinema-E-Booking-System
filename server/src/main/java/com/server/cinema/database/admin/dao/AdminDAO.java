package com.server.cinema.database.admin.dao;

import java.util.Optional;

import com.server.cinema.database.admin.Admin;

public interface AdminDAO {

    Optional<Admin> findByUsername(final String username);

}
