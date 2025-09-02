package com.payroll.system.backend.config;

import com.payroll.system.backend.model.ERole;
import com.payroll.system.backend.model.Role;
import com.payroll.system.backend.model.User;
import com.payroll.system.backend.model.Employee;
import com.payroll.system.backend.repository.RoleRepository;
import com.payroll.system.backend.repository.UserRepository;
import com.payroll.system.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmployeeService employeeService;

    @Override
    public void run(String... args) throws Exception {
        // Create roles if they don't exist
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName(ERole.ROLE_ADMIN);
                    return roleRepository.save(role);
                });

        Role employeeRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName(ERole.ROLE_EMPLOYEE);
                    return roleRepository.save(role);
                });

        // Create admin user if not exists
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User(
                    "admin",
                    "admin@payroll.com",
                    passwordEncoder.encode("Admin@123")
            );

            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(adminRole);
            admin.setRoles(adminRoles);

            User savedAdmin = userRepository.save(admin);

            // Create admin employee record
            Employee adminEmployee = new Employee();
            adminEmployee.setFirstName("System");
            adminEmployee.setLastName("Administrator");
            adminEmployee.setEmail("admin@payroll.com");
            adminEmployee.setJoiningDate(LocalDate.now());
            adminEmployee.setDepartment("Administration");
            adminEmployee.setDesignation("System Administrator");
            adminEmployee.setUser(savedAdmin);
            employeeService.saveEmployee(adminEmployee);
        }

        // Create sample employee if not exists
        if (!userRepository.existsByUsername("employee")) {
            User employee = new User(
                    "employee",
                    "employee@gmail.com",
                    passwordEncoder.encode("Employee@123")
            );

            Set<Role> employeeRoles = new HashSet<>();
            employeeRoles.add(employeeRole);
            employee.setRoles(employeeRoles);

            User savedEmployee = userRepository.save(employee);

            // Create employee record
            Employee emp = new Employee();
            emp.setFirstName("emp");
            emp.setEmail("emp@company.com");
            emp.setJoiningDate(LocalDate.now().minusMonths(6));
            emp.setDepartment("Engineering");
            emp.setDesignation("Software Engineer");
            emp.setPhone("+91 62615XXX566");
            emp.setAddress("Hauz Khas, New Delhi");
            emp.setUser(savedEmployee);
            employeeService.saveEmployee(emp);
        }
    }
}