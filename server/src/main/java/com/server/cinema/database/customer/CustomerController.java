package com.server.cinema.database.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/customer")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(final CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/email/{customerId}")
    public ResponseEntity<String> getEmailByCustomerId(@PathVariable final int customerId) {
        final String email = customerService.getEmailByCustomerId(customerId);
        return ResponseEntity.ok(email);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Boolean> emailExists(@PathVariable final String email) {
        final boolean emailExists = customerService.emailExists(email);
        return ResponseEntity.ok(emailExists);
    }

    @PostMapping("/add")
    public ResponseEntity<Integer> addInactiveCustomer(@RequestBody final InactiveCustomerDTO customer) {
        final int customerId = customerService.addInactiveCustomer(customer);
        return new ResponseEntity<>(customerId, HttpStatus.CREATED);
    }

}
