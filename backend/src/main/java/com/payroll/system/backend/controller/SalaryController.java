package com.payroll.system.backend.controller;

import com.payroll.system.backend.model.Salary;
import com.payroll.system.backend.model.SalaryStatus;
import com.payroll.system.backend.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/salaries")
public class SalaryController {
    @Autowired
    private SalaryService salaryService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Salary>> getAllSalaries() {
        List<Salary> salaries = salaryService.getAllSalaries();
        return new ResponseEntity<>(salaries, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEmployeeOwner(authentication, #employeeId)")
    public ResponseEntity<Salary> getSalaryById(@PathVariable Long id) {
        Optional<Salary> salary = salaryService.getSalaryById(id);
        return salary.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEmployeeOwner(authentication, #employeeId)")
    public ResponseEntity<List<Salary>> getSalariesByEmployeeId(@PathVariable Long employeeId) {
        List<Salary> salaries = salaryService.getSalariesByEmployeeId(employeeId);
        return new ResponseEntity<>(salaries, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Salary>> getSalariesByStatus(@PathVariable SalaryStatus status) {
        List<Salary> salaries = salaryService.getSalariesByStatus(status);
        return new ResponseEntity<>(salaries, HttpStatus.OK);
    }

    @GetMapping("/month-year")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Salary>> getSalariesByMonthAndYear(
            @RequestParam String month, @RequestParam int year) {
        List<Salary> salaries = salaryService.getSalariesByMonthAndYear(month, year);
        return new ResponseEntity<>(salaries, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Salary> createSalary(@RequestBody Salary salary) {
        Salary savedSalary = salaryService.saveSalary(salary);
        return new ResponseEntity<>(savedSalary, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Salary> updateSalary(@PathVariable Long id, @RequestBody Salary salary) {
        Optional<Salary> existingSalary = salaryService.getSalaryById(id);
        if (existingSalary.isPresent()) {
            salary.setId(id);
            Salary updatedSalary = salaryService.saveSalary(salary);
            return new ResponseEntity<>(updatedSalary, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteSalary(@PathVariable Long id) {
        try {
            salaryService.deleteSalary(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}