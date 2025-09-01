package com.payroll.system.backend.security.services;

import com.payroll.system.backend.model.User;
import com.payroll.system.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        // Try to find user by username first
        User user = userRepository.findByUsername(usernameOrEmail)
                .orElseGet(() -> {
                    // If not found by username, try by email
                    return userRepository.findByEmail(usernameOrEmail)
                            .orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail));
                });

        return UserDetailsImpl.build(user);
    }
}