package com.server.cinema.user;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/user")
public class UserController {

  private final UserService userService;
  private final JWTUtil jwtUtil;

  public UserController(UserService userService, JWTUtil jwtUtil) {
    this.userService = userService;
    this.jwtUtil = jwtUtil;
  }

  @PostMapping
  public ResponseEntity<?> registerUser(
    @RequestBody UserRegistrationRequest request
  ) {
    userService.addUser(request);
    String jwtToken = jwtUtil.issueToken(requestEmail(), "ROLE_USER");
    return ResponseEntity
      .ok()
      .header(HttpHeaders.AUTHORIZATION, jwtToken)
      .build();
  }
}
