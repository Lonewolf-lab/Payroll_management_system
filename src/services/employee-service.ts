import apiClient from './api-client';

interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  salary: number;
  userId?: number;
}

const EmployeeService = {
  getAllEmployees: async () => {
    return await apiClient.get('/employees');
  },

  getEmployeeById: async (id: number) => {
    return await apiClient.get(`/employees/${id}`);
  },

  getEmployeeByUserId: async (userId: number) => {
    return await apiClient.get(`/employees/user/${userId}`);
  },

  createEmployee: async (employee: Employee) => {
    return await apiClient.post('/employees', employee);
  },

  updateEmployee: async (id: number, employee: Employee) => {
    return await apiClient.put(`/employees/${id}`, employee);
  },

  deleteEmployee: async (id: number) => {
    return await apiClient.delete(`/employees/${id}`);
  }
};

export default EmployeeService;
export type { Employee };