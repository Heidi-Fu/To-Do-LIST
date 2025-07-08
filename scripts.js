
    // 任务管理类 - 体现面向对象编程概念
    class TaskManager {
      constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        
        // DOM元素
        this.taskInput = document.getElementById('task-input');
        this.addTaskBtn = document.getElementById('add-task');
        this.taskList = document.getElementById('task-list');
        this.emptyState = document.getElementById('empty-state');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        
        // 初始化事件监听
        this.initEventListeners();
      }
      
      // 初始化事件监听函数 - 体现事件驱动编程概念
      initEventListeners() {
        // 添加任务按钮点击事件
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        
        // 任务输入框回车事件
        this.taskInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            this.addTask();
          }
        });
        
        // 筛选按钮点击事件
        this.filterBtns.forEach(btn => {
          btn.addEventListener('click', () => this.filterTasks(btn.dataset.filter));
        });
        
        // 任务列表委托事件 - 体现事件委托概念
        this.taskList.addEventListener('click', (e) => {
          const taskItem = e.target.closest('.task-item');
          const deleteBtn = e.target.closest('.delete-btn');
          
          if (taskItem) {
            this.toggleTaskStatus(taskItem);
          } else if (deleteBtn) {
            this.deleteTask(deleteBtn.closest('.task-item'));
          }
        });
      }
      
      // 添加任务函数 - 体现函数复用概念
      addTask() {
        const taskText = this.taskInput.value.trim();
        if (!taskText) return;
        
        const newTask = {
          id: Date.now(),
          text: taskText,
          completed: false
        };
        
        this.tasks.push(newTask);
        this.renderTask(newTask);
        this.taskInput.value = '';
        this.updateEmptyState();
      }
      
      // 渲染单个任务函数
      renderTask(task) {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item${task.completed ? ' completed' : ''}`;
        taskItem.dataset.id = task.id;
        
        taskItem.innerHTML = `
          <div class="task-content">${task.text}</div>
          <button class="delete-btn">删除</button>
        `;
        
        this.taskList.appendChild(taskItem);
      }
      
      // 切换任务状态函数
      toggleTaskStatus(taskItem) {
        const taskId = parseInt(taskItem.dataset.id);
        const task = this.tasks.find(t => t.id === taskId);
        
        if (task) {
          task.completed = !task.completed;
          taskItem.classList.toggle('completed', task.completed);
        }
      }
      
      // 删除任务函数
      deleteTask(taskItem) {
        const taskId = parseInt(taskItem.dataset.id);
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        taskItem.remove();
        this.updateEmptyState();
      }
      
      // 筛选任务函数
      filterTasks(filter) {
        this.currentFilter = filter;
        
        // 更新筛选按钮状态
        this.filterBtns.forEach(btn => {
          btn.classList.remove('active');
          if (btn.dataset.filter === filter) {
            btn.classList.add('active');
          }
        });
        
        // 过滤并重新渲染任务
        this.taskList.innerHTML = '';
        const filteredTasks = this.filterTasksByStatus(filter);
        
        filteredTasks.forEach(task => {
          this.renderTask(task);
        });
        
        this.updateEmptyState();
      }
      
      // 按状态筛选任务的辅助函数
      filterTasksByStatus(filter) {
        if (filter === 'all') {
          return this.tasks;
        } else if (filter === 'active') {
          return this.tasks.filter(task => !task.completed);
        } else if (filter === 'completed') {
          return this.tasks.filter(task => task.completed);
        }
        return this.tasks;
      }
      
      // 更新空状态显示函数
      updateEmptyState() {
        const hasTasks = this.tasks.length > 0;
        this.emptyState.style.display = hasTasks ? 'none' : 'block';
      }
    }
    
    // 初始化应用 - 体现程序入口概念
    document.addEventListener('DOMContentLoaded', () => {
      const taskManager = new TaskManager();
    });
