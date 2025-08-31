package com.payroll.system.backend.service;

import com.payroll.system.backend.model.Salary;
import com.payroll.system.backend.model.SalaryStatus;
import com.payroll.system.backend.repository.SalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalaryService {
    @Autowired
    private SalaryRepository salaryRepository;

    public List<Salary> getAllSalaries() {
        return salaryRepository.findAll();
    }

    public Optional<Salary> getSalaryById(Long id) {
        return salaryRepository.findById(id);
    }

    public List<Salary> getSalariesByEmployeeId(Long employeeId) {
        return salaryRepository.findByEmployeeId(employeeId);
    }

    public List<Salary> getSalariesByStatus(SalaryStatus status) {
        return salaryRepository.findByStatus(status);
    }

    public List<Salary> getSalariesByMonthAndYear(String month, int year) {
        return salaryRepository.findByMonthAndYear(month, year);
    }

    public Salary saveSalary(Salary salary) {
        // Calculate net pay before saving
        salary.calculateNetPay();
        return salaryRepository.save(salary);
    }

    public void deleteSalary(Long id) {
        salaryRepository.deleteById(id);
    }
}