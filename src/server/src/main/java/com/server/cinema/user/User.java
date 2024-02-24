package com.server.cinema.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(
  name = "users",
  uniqueConstraints = {
    @UniqueConstraint(name = "user_email_unique", columnNames = "email"),
  }
)
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  public User() {}

  public User(Integer id, String email, String password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  public User(String email, String password) {
    this.email = email;
    this.password = password;
  }

  // Getters & Setters
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  // Spring Security
  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_USER"));
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User user = (User) o;
    return (
      Objects.equals(id, user.id) &&
      Objects.equals(email, user.email) &&
      Objects.equals(password, user.password)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, email, password);
  }
}
