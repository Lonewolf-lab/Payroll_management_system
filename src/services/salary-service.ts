import apiClient from './api-client';

interface Salary {
  id?: number;
  employeeId: number;
  amount: number;
  month: string;
  year: number;
  status: string;
  paymentDate?: string;
}

const SalaryService = {
  getAllSalaries: async () => {
    return await apiClient.get('/salaries');
  },

  getSalaryById: async (id: number) => {
    return await apiClient.get(`/salaries/${id}`);
  },

  getSalariesByEmployeeId: async (employeeId: number) => {
    return await apiClient.get(`/salaries/employee/${employeeId}`);
  },

  createSalary: async (salary: Salary) => {
    return await apiClient.post('/salaries', salary);
  },

  updateSalary: async (id: number, salary: Salary) => {
    return await apiClient.put(`/salaries/${id}`, salary);
  },

  deleteSalary: async (id: number) => {
    return await apiClient.delete(`/salaries/${id}`);
  }
};

export default SalaryService;
export type { Salary };