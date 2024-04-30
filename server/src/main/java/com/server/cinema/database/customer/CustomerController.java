package com.server.cinema.database.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    public String getLastNameByCustomerId(@PathVariable final int customerId) {
        return customerService.getLastNameByCustomerId(customerId);
    }

    @GetMapping("/{customerId}/phone-number")
    public String getPhoneNumberByCustomerId(@PathVariable final int customerId) {
        return customerService.getPhoneNumberByCustomerId(customerId);
    }

    @GetMapping("/{customerId}/is-subscribed-for-promotions")
    public boolean isCustomerSubscribedForPromotions(@PathVariable final int customerId) {
        return customerService.isSubscribedForPromotions(customerId);
    }

    @GetMapping("/status/{customerId}")
    public UserState getStatus(@PathVariable final int customerId) {
        return customerService.getStatus(customerId);
    }

    @GetMapping("/email/{customerId}")
    public String getEmailByCustomerId(@PathVariable final int customerId) {
        return customerService.getEmailByCustomerId(customerId);
    }

    @GetMapping("/{email}/id")
    public int getCustomerIdByEmail(@PathVariable final String email) {
        return customerService.getCustomerIdByEmail(email);
    }

    @GetMapping("/email_exists/{email}")
    public boolean emailExists(@PathVariable final String email) {
        return customerService.emailExists(email);
    }

    @GetMapping("/{customerId}/{password}/check")
    public boolean isValidPassword(@PathVariable final int customerId,
            @PathVariable final String password) {
        return customerService.isValidPassword(customerId, password);
    }

    @GetMapping("/login_credentials/{email}/{password}")
    public LoginCustomerDTO login(@PathVariable final String email,
            @PathVariable final String password) {
        return customerService.getCustomerByEmailAndPassword(email, password);
    }

    @PostMapping("/add")
    public int addInactiveCustomer(@RequestBody final InactiveCustomerDTO customer) {
        return customerService.addInactiveCustomer(customer);
    }

    @PutMapping("/set_active_status/{customerId}")
    public void setStatusToActive(@PathVariable final int customerId) {
        customerService.setStatusToActive(customerId);
    }

    @PutMapping("/{customerId}/password/{password}")
    public void changePassword(@PathVariable final int customerId,
            @PathVariable final String password) {
        customerService.changePassword(customerId, password);
    }

    @PutMapping("/{customerId}/first-name/{firstName}")
    public void changeFirstName(@PathVariable final int customerId,
            @PathVariable final String firstName) {
        customerService.changeFirstName(customerId, firstName);
    }

    @PutMapping("/{customerId}/last-name/{lastName}")
    public void changeLastName(@PathVariable final int customerId,
            @PathVariable final String lastName) {
        customerService.changeLastName(customerId, lastName);
    }

    @PutMapping("/{customerId}/phone-number/{phoneNumber}")
    public void changePhoneNumber(@PathVariable final int customerId,
            @PathVariable final String phoneNumber) {
        customerService.changePhoneNumber(customerId, phoneNumber);
    }

    @PutMapping("/{customerId}/is-subscribed-for-promotions/{isSubscribedForPromotions}")
    public void changeIsSubscribedForPromotions(@PathVariable final int customerId,
            @PathVariable final boolean isSubscribedForPromotions) {
        customerService.changeSubscribedForPromotions(customerId, isSubscribedForPromotions);
    }

}
