package com.server.cinema.database.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/id/{email}")
    public ResponseEntity<Integer> getCustomerIdByEmail(@PathVariable final String email) {
        final int customerId = customerService.getCustomerIdByEmail(email);
        return ResponseEntity.ok(customerId);
    }

    @GetMapping("/email_exists/{email}")
    public ResponseEntity<Boolean> emailExists(@PathVariable final String email) {
        final boolean emailExists = customerService.emailExists(email);
        return ResponseEntity.ok(emailExists);
    }

    @GetMapping("/login_credentials/{email}/{password}")
    public ResponseEntity<String[]> login(@PathVariable final String email, @PathVariable final String password) {
        final String[] res = { email, "" + customerService.getCustomerIdByEmailAndPassword(email, password) };
        return ResponseEntity.ok(res);
    }

    @PostMapping("/add")
    public ResponseEntity<Integer> addInactiveCustomer(@RequestBody final InactiveCustomerDTO customer) {
        final int customerId = customerService.addInactiveCustomer(customer);
        return new ResponseEntity<>(customerId, HttpStatus.CREATED);
    }

    @PutMapping("/set_active_status/{customerId}")
    public ResponseEntity<String> setStatusToActive(@PathVariable final int customerId) {
        customerService.setStatusToActive(customerId);
        final String msg = String.format("The status of the customer with id %d has been changed to ACTIVE.",
                customerId);
        return ResponseEntity.ok(msg);
    }

    @PutMapping("/change_password/{customerId}/{password}")
    public ResponseEntity<String> changePassword(@PathVariable final int customerId,
            @PathVariable final String password) {
        customerService.changePassword(customerId, password);
        return ResponseEntity.ok("Password changed successfully.");
    }

    @PutMapping("/change_first_name/{customerId}/{firstName}")
    public ResponseEntity<String> changeFirstName(@PathVariable final int customerId,
            @PathVariable final String firstName) {
        customerService.changeFirstName(customerId, firstName);
        return ResponseEntity.ok("First name successfully changed.");
    }

}
