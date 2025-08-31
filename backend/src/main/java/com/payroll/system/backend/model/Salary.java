package com.payroll.system.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "salaries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Salary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @NotNull
    private BigDecimal basicSalary;

    private BigDecimal allowances;

    private BigDecimal deductions;

    @NotNull
    private BigDecimal netPay;

    @NotNull
    private LocalDate paymentDate;

    private String month;

    private Integer year;

    @Enumerated(EnumType.STRING)
    private SalaryStatus status = SalaryStatus.PENDING;

    // Calculate net pay
    @PrePersist
    @PreUpdate
    public void calculateNetPay() {
        this.netPay = this.basicSalary
                .add(this.allowances != null ? this.allowances : BigDecimal.ZERO)
                .subtract(this.deductions != null ? this.deductions : BigDecimal.ZERO);
    }
}