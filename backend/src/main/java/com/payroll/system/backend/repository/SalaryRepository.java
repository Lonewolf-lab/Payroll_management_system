package com.payroll.system.backend.repository;

import com.payroll.system.backend.model.Salary;
import com.payroll.system.backend.model.SalaryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {
    List<Salary> findByEmployeeId(Long employeeId);
    List<Salary> findByStatus(SalaryStatus status);
    List<Salary> findByMonthAndYear(String month, Integer year);
}