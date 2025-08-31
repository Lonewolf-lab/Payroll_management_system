import apiClient from './api-client';

interface Leave {
  id?: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  type: string;
}

const LeaveService = {
  getAllLeaves: async () => {
    return await apiClient.get('/leaves');
  },

  getLeaveById: async (id: number) => {
    return await apiClient.get(`/leaves/${id}`);
  },

  getLeavesByEmployeeId: async (employeeId: number) => {
    return await apiClient.get(`/leaves/employee/${employeeId}`);
  },

  createLeave: async (leave: Leave) => {
    return await apiClient.post('/leaves', leave);
  },

  updateLeave: async (id: number, leave: Leave) => {
    return await apiClient.put(`/leaves/${id}`, leave);
  },

  approveLeave: async (id: number) => {
    return await apiClient.put(`/leaves/${id}/approve`);
  },

  rejectLeave: async (id: number) => {
    return await apiClient.put(`/leaves/${id}/reject`);
  },

  deleteLeave: async (id: number) => {
    return await apiClient.delete(`/leaves/${id}`);
  }
};

export default LeaveService;
export type { Leave };