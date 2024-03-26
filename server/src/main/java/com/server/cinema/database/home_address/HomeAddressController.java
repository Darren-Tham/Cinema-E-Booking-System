package com.server.cinema.database.home_address;

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

import com.server.cinema.database.home_address.dto.HomeAddressDTOCustomerId;
import com.server.cinema.database.home_address.dto.HomeAddressDTOAddressId;

@CrossOrigin
@RestController
@RequestMapping("api/home_address")
public class HomeAddressController {

    private final HomeAddressService homeAddressService;

    @Autowired
    public HomeAddressController(HomeAddressService homeAddressService) {
        this.homeAddressService = homeAddressService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addHomeAddress(@RequestBody final HomeAddressDTOCustomerId homeAddress) {
        homeAddressService.addHomeAddress(homeAddress);
        return new ResponseEntity<>("Home address successfully added.", HttpStatus.CREATED);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<HomeAddressDTOAddressId> getHomeAddress(@PathVariable final int customerId) {
        final HomeAddressDTOAddressId homeAddress = homeAddressService.getHomeAddress(customerId);
        return ResponseEntity.ok(homeAddress);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateHomeAddress(@RequestBody final HomeAddressDTOAddressId homeAddress) {
        homeAddressService.updateHomeAddress(homeAddress);
        return ResponseEntity.ok("Home address successfully updated.");
    }

}
