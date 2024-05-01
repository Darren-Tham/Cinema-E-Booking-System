package com.server.cinema.database.home_address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.cinema.database.home_address.dto.CustomerHomeAddressDTO;
import com.server.cinema.database.home_address.dto.ProfileHomeAddressDTO;

@CrossOrigin
@RestController
@RequestMapping("api/home-addresses")
public class HomeAddressController {

    private final HomeAddressService homeAddressService;

    @Autowired
    public HomeAddressController(HomeAddressService homeAddressService) {
        this.homeAddressService = homeAddressService;
    }

    @PostMapping("/add")
    public void addHomeAddress(@RequestBody final CustomerHomeAddressDTO homeAddress) {
        homeAddressService.addHomeAddress(homeAddress);
    }

    @GetMapping("/{customerId}")
    public ProfileHomeAddressDTO getHomeAddress(@PathVariable final int customerId) {
        return homeAddressService.getHomeAddress(customerId);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateHomeAddress(@RequestBody final ProfileHomeAddressDTO homeAddress) {
        homeAddressService.updateHomeAddress(homeAddress);
        return ResponseEntity.ok("Home address successfully updated.");
    }

    @DeleteMapping("{homeAddressId}")
    public ResponseEntity<String> deleteHomeAddress(@PathVariable final int homeAddressId) {
        homeAddressService.removeHomeAddress(homeAddressId);
        return ResponseEntity.ok("Home address successfully deleted.");
    }

}
