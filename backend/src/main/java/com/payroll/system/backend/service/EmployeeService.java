package com.payroll.system.backend.service;

import com.payroll.system.backend.model.Employee;
import com.payroll.system.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        System.out.println(id);

        var employee = employeeRepository.findById(id);
        System.out.println(employee.toString());
        return employee;
    }

    public Optional<Employee> getEmployeeByUserId(Long userId) {
        return employeeRepository.findById(userId);
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}