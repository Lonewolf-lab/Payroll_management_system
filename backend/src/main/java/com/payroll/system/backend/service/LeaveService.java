package com.payroll.system.backend.service;

import com.payroll.system.backend.model.Leave;
import com.payroll.system.backend.model.LeaveStatus;
import com.payroll.system.backend.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveService {
    @Autowired
    private LeaveRepository leaveRepository;

    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }

    public Optional<Leave> getLeaveById(Long id) {
        return leaveRepository.findById(id);
    }

    public List<Leave> getLeavesByEmployeeId(Long employeeId) {
        return leaveRepository.findByEmployeeId(employeeId);
    }

    public List<Leave> getLeavesByStatus(LeaveStatus status) {
        return leaveRepository.findByStatus(status);
    }

    public Leave saveLeave(Leave leave) {
        return leaveRepository.save(leave);
    }

    public Leave updateLeaveStatus(Long id, LeaveStatus status, String adminRemarks) {
        Optional<Leave> leaveOpt = leaveRepository.findById(id);
        if (leaveOpt.isPresent()) {
            Leave leave = leaveOpt.get();
            leave.setStatus(status);
            leave.setAdminRemarks(adminRemarks);
            return leaveRepository.save(leave);
        }
        return null;
    }

    public void deleteLeave(Long id) {
        leaveRepository.deleteById(id);
    }
}