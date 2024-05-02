package com.server.cinema.controller;

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

import com.server.cinema.dto.CustomerDTO;
import com.server.cinema.dto.NewCustomerDTO;
import com.server.cinema.enums.UserState;
import com.server.cinema.service.CustomerService;

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
    public String getCustomerFirstName(@PathVariable final int customerId) {
        return customerService.getCustomerFirstName(customerId);
    }

    @GetMapping("/{customerId}/last-name")
    public String getCustomerLastName(@PathVariable final int customerId) {
        return customerService.getCustomerLastName(customerId);
    }

    @GetMapping("/{customerId}/phone-number")
    public String getCustomerPhoneNumber(@PathVariable final int customerId) {
        return customerService.getCustomerPhoneNumber(customerId);
    }

    @GetMapping("/{customerId}/is-subscribed-for-promotions")
    public boolean isCustomerSubscribedForPromotions(@PathVariable final int customerId) {
        return customerService.isCustomerSubscribedForPromotions(customerId);
    }

    @GetMapping("/status/{customerId}")
    public UserState getStatus(@PathVariable final int customerId) {
        return customerService.getStatus(customerId);
    }

    @GetMapping("/{customerId}/email")
    public String getCustomerEmail(@PathVariable final int customerId) {
        return customerService.getCustomerEmail(customerId);
    }

    @GetMapping("/{email}/id")
    public int getCustomerIdByEmail(@PathVariable final String email) {
        return customerService.getCustomerIdByEmail(email);
    }

    @GetMapping("/{email}/check")
    public boolean customerEmailExists(@PathVariable final String email) {
        return customerService.customerEmailExists(email);
    }

    @GetMapping("/{customerId}/{password}/check")
    public boolean customerPasswordIsValid(@PathVariable final int customerId,
            @PathVariable final String password) {
        return customerService.customerPasswordIsValid(customerId, password);
    }

    @GetMapping("/{email}/{password}")
    public CustomerDTO getCustomer(@PathVariable final String email,
            @PathVariable final String password) {
        return customerService.getCustomer(email, password);
    }

    @PostMapping("/add")
    public int addCustomer(@RequestBody final NewCustomerDTO customer) {
        return customerService.addCustomer(customer);
    }

    @PutMapping("/{customerId}/active-status")
    public void updateCustomerStatusToActive(@PathVariable final int customerId) {
        customerService.updateCustomerStatusToActive(customerId);
    }

    @PutMapping("/{customerId}/password/{password}")
    public void updateCustomerPassword(@PathVariable final int customerId,
            @PathVariable final String password) {
        customerService.updateCustomerPassword(customerId, password);
    }

    @PutMapping("/{customerId}/first-name/{firstName}")
    public void updateCustomerFirstName(@PathVariable final int customerId,
            @PathVariable final String firstName) {
        customerService.updateCustomerFirstName(customerId, firstName);
    }

    @PutMapping("/{customerId}/last-name/{lastName}")
    public void updateCustomerLastName(@PathVariable final int customerId,
            @PathVariable final String lastName) {
        customerService.updateCustomerLastName(customerId, lastName);
    }

    @PutMapping("/{customerId}/phone-number/{phoneNumber}")
    public void updateCustomerPhoneNumber(@PathVariable final int customerId,
            @PathVariable final String phoneNumber) {
        customerService.updateCustomerPhoneNumber(customerId, phoneNumber);
    }

    @PutMapping("/{customerId}/is-subscribed-for-promotions/{isSubscribedForPromotions}")
    public void updateCustomerSubscribedForPromotions(@PathVariable final int customerId,
            @PathVariable final boolean isSubscribedForPromotions) {
        customerService.updateCustomerSubscribedForPromotions(customerId, isSubscribedForPromotions);
    }

}
