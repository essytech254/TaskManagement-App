// taskAPI.js
const taskAPI = {
  getTasks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Complete project proposal',
            description: 'Write and submit the quarterly project proposal',
            completed: false,
            priority: 'high',
            dueDate: '2025-07-10',
            assignee: 'John Doe',
          },
          {
            id: 2,
            title: 'Review code changes',
            description: 'Review pull requests from team members',
            completed: true,
            priority: 'medium',
            dueDate: '2025-07-05',
            assignee: 'Jane Smith',
          },
          {
            id: 3,
            title: 'Update documentation',
            description: 'Update API documentation with new endpoints',
            completed: false,
            priority: 'low',
            dueDate: '2025-07-15',
            assignee: 'Bob Johnson',
          },
          {
            id: 4,
            title: 'Fix bug in login system',
            description: 'Resolve authentication issues reported by users',
            completed: false,
            priority: 'high',
            dueDate: '2025-07-08',
            assignee: 'Alice Brown',
          },
        ]);
      }, 1500);
    });
  },

  createTask: (task) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...task, id: Date.now() });
      }, 800);
    });
  },

  updateTask: (task) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(task);
      }, 600);
    });
  },

  deleteTask: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 500);
    });
  },
};

export default taskAPI;
