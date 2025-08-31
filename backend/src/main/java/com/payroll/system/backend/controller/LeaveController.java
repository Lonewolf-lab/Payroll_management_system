package com.payroll.system.backend.controller;

import com.payroll.system.backend.model.Leave;
import com.payroll.system.backend.model.LeaveStatus;
import com.payroll.system.backend.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/leaves")
public class LeaveController {
    @Autowired
    private LeaveService leaveService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Leave>> getAllLeaves() {
        List<Leave> leaves = leaveService.getAllLeaves();
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEmployeeOwner(authentication, #employeeId)")
    public ResponseEntity<Leave> getLeaveById(@PathVariable Long id) {
        Optional<Leave> leave = leaveService.getLeaveById(id);
        return leave.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isEmployeeOwner(authentication, #employeeId)")
    public ResponseEntity<List<Leave>> getLeavesByEmployeeId(@PathVariable Long employeeId) {
        List<Leave> leaves = leaveService.getLeavesByEmployeeId(employeeId);
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Leave>> getLeavesByStatus(@PathVariable LeaveStatus status) {
        List<Leave> leaves = leaveService.getLeavesByStatus(status);
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Leave> createLeave(@RequestBody Leave leave) {
        leave.setStatus(LeaveStatus.PENDING);
        Leave savedLeave = leaveService.saveLeave(leave);
        return new ResponseEntity<>(savedLeave, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Leave> updateLeaveStatus(
            @PathVariable Long id,
            @RequestParam LeaveStatus status,
            @RequestParam(required = false) String adminRemarks) {
        Leave updatedLeave = leaveService.updateLeaveStatus(id, status, adminRemarks);
        if (updatedLeave != null) {
            return new ResponseEntity<>(updatedLeave, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteLeave(@PathVariable Long id) {
        try {
            leaveService.deleteLeave(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}