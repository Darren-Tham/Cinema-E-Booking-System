package com.server.cinema.database.home_address;

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

import com.server.cinema.database.home_address.dto.HomeAddressDTO;
import com.server.cinema.database.home_address.dto.HomeAddressDTONoId;

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
    public ResponseEntity<String> addHomeAddress(@RequestBody final HomeAddressDTO homeAddress) {
        homeAddressService.addHomeAddress(homeAddress);
        return new ResponseEntity<>("Home address successfully added.", HttpStatus.CREATED);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<HomeAddressDTONoId> getHomeAddress(@PathVariable final int customerId) {
        final HomeAddressDTONoId homeAddress = homeAddressService.getHomeAddress(customerId);
        return ResponseEntity.ok(homeAddress);
    }

}
