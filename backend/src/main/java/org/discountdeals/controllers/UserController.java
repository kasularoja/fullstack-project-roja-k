package org.discountdeals.controllers;

import org.discountdeals.model.User;
import org.discountdeals.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Get all users (used for login credential check)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
