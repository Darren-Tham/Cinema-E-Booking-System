package com.server.cinema.database.customer;

import java.util.List;

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

import com.server.cinema.database.customer.dto.InactiveCustomerDTO;
import com.server.cinema.database.customer.dto.LoginCustomerDTO;
import com.server.cinema.database.customer.enums.UserState;

@CrossOrigin
@RestController
@RequestMapping("api/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(final CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/subscribed/emails")
    public List<String> getSubscribedCustomerEmails() {
        return customerService.getSubscribedCustomerEmails();
    }

    @GetMapping("/{customerId}/first-name")
    public String getFirstNameByCustomerId(@PathVariable final int customerId) {
        return customerService.getFirstNameByCustomerId(customerId);
    }

    @GetMapping("/{customerId}/last-name")
    public ResponseEntity<String> getLastNameByCustomerId(@PathVariable final int customerId) {
        final String lastName = customerService.getLastNameByCustomerId(customerId);
        return ResponseEntity.ok(lastName);
    }

    @GetMapping("/phone_number/{customerId}")
    public ResponseEntity<String> getPhoneNumberByCustomerId(@PathVariable final int customerId) {
        final String phoneNumber = customerService.getPhoneNumberByCustomerId(customerId);
        return ResponseEntity.ok(phoneNumber);
    }

    @GetMapping("/promotions/{customerId}")
    public ResponseEntity<Boolean> getIsSubscribedForPromotionsByCustomerId(@PathVariable final int customerId) {
        final boolean isSubscribedForPromotions = customerService.isSubscribedForPromotions(customerId);
        return ResponseEntity.ok(isSubscribedForPromotions);
    }

    @GetMapping("/status/{customerId}")
    public ResponseEntity<UserState> getStatus(@PathVariable final int customerId) {
        final UserState status = customerService.getStatus(customerId);
        return ResponseEntity.ok(status);
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

    @GetMapping("/password/{customerId}/{password}")
    public ResponseEntity<Boolean> isValidPassword(@PathVariable final int customerId,
            @PathVariable final String password) {
        final boolean isValidPassword = customerService.isValidPassword(customerId, password);
        return ResponseEntity.ok(isValidPassword);
    }

    @GetMapping("/login_credentials/{email}/{password}")
    public ResponseEntity<LoginCustomerDTO> login(@PathVariable final String email,
            @PathVariable final String password) {
        final LoginCustomerDTO customer = customerService.getCustomerByEmailAndPassword(email, password);
        return ResponseEntity.ok(customer);
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

    @PutMapping("/{customerId}/first-name/{firstName}")
    public ResponseEntity<String> changeFirstName(@PathVariable final int customerId,
            @PathVariable final String firstName) {
        customerService.changeFirstName(customerId, firstName);
        return ResponseEntity.ok("First name successfully changed.");
    }

    @PutMapping("/{customerId}/last-name/{lastName}")
    public ResponseEntity<String> changeLastName(@PathVariable final int customerId,
            @PathVariable final String lastName) {
        customerService.changeLastName(customerId, lastName);
        return ResponseEntity.ok("Last name successfully changed.");
    }

    @PutMapping("/change_phone_number/{customerId}/{phoneNumber}")
    public ResponseEntity<String> changePhoneNumber(@PathVariable final int customerId,
            @PathVariable final String phoneNumber) {
        customerService.changePhoneNumber(customerId, phoneNumber);
        return ResponseEntity.ok("Last name successfully changed.");
    }

    @PutMapping("/change_promotion/{customerId}/{isSubscribedForPromotions}")
    public ResponseEntity<String> changeIsSubscribedForPromotions(@PathVariable final int customerId,
            @PathVariable final boolean isSubscribedForPromotions) {
        customerService.changeSubscribedForPromotions(customerId, isSubscribedForPromotions);
        return ResponseEntity.ok("Promotion subscription status successfully changed.");
    }

}
