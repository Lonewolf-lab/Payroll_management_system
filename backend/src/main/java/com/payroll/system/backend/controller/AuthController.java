package com.payroll.system.backend.controller;

import com.payroll.system.backend.payload.request.LoginRequest;
import com.payroll.system.backend.payload.request.SignupRequest;
import com.payroll.system.backend.payload.response.JwtResponse;
import com.payroll.system.backend.payload.response.MessageResponse;
import com.payroll.system.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        MessageResponse messageResponse = authService.registerUser(signUpRequest);
        if (messageResponse.getMessage().startsWith("Error:")) {
            return ResponseEntity.badRequest().body(messageResponse);
        }
        return ResponseEntity.ok(messageResponse);
    }
}