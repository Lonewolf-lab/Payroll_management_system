package com.payroll.system.backend.service;

import com.payroll.system.backend.model.Employee;
import com.payroll.system.backend.repository.EmployeeRepository;
import com.payroll.system.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SecurityService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public boolean isUserOwner(Authentication authentication, Long userId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getId().equals(userId);
    }

    public boolean isEmployeeOwner(Authentication authentication, Long employeeId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        return employee.isPresent() && employee.get().getUser().getId().equals(userDetails.getId());
    }
}