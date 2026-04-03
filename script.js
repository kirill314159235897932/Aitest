// ==================== НЕЙРОСЕТЬ ДЛЯ ГЕНЕРАЦИИ КОДА ====================

const CodeNeuralNetwork = (function() {
    'use strict';
    
    class NeuralNetwork {
        constructor() {
            this.version = "2.0.0";
            this.name = "CodeGen AI";
            console.log(`🧠 ${this.name} v${this.version} загружена`);
        }
        
        // Главный метод генерации кода
        generate(type, projectName, customParams) {
            switch(type) {
                case 'calculator':
                    return this.generateCalculator(projectName);
                case 'todo':
                    return this.generateTodoApp(projectName);
                case 'api':
                    return this.generateApiClient(projectName);
                case 'game':
                    return this.generateGame(projectName);
                default:
                    return this.generateCalculator(projectName);
            }
        }
        
        // Генерация калькулятора
        generateCalculator(projectName) {
            return `
// 🤖 СГЕНЕРИРОВАНО НЕЙРОСЕТЬЮ CodeGen AI
// Проект: ${projectName} - Калькулятор

class Calculator {
    constructor() {
        this.history = [];
        console.log('🧮 Калькулятор инициализирован');
    }
    
    add(a, b) {
        const result = a + b;
        this.history.push(\`\${a} + \${b} = \${result}\`);
        console.log(\`✅ \${a} + \${b} = \${result}\`);
        return result;
    }
    
    subtract(a, b) {
        const result = a - b;
        this.history.push(\`\${a} - \${b} = \${result}\`);
        console.log(\`✅ \${a} - \${b} = \${result}\`);
        return result;
    }
    
    multiply(a, b) {
        const result = a * b;
        this.history.push(\`\${a} × \${b} = \${result}\`);
        console.log(\`✅ \${a} × \${b} = \${result}\`);
        return result;
    }
    
    divide(a, b) {
        if (b === 0) throw new Error('❌ Деление на ноль невозможно');
        const result = a / b;
        this.history.push(\`\${a} ÷ \${b} = \${result}\`);
        console.log(\`✅ \${a} ÷ \${b} = \${result}\`);
        return result;
    }
    
    power(a, b) {
        const result = Math.pow(a, b);
        this.history.push(\`\${a}^\${b} = \${result}\`);
        console.log(\`✅ \${a}^\${b} = \${result}\`);
        return result;
    }
    
    sqrt(a) {
        const result = Math.sqrt(a);
        this.history.push(\`√\${a} = \${result}\`);
        console.log(\`✅ √\${a} = \${result}\`);
        return result;
    }
    
    getHistory() {
        console.log('\\n📜 История операций:');
        this.history.forEach((op, i) => console.log(\`  \${i + 1}. \${op}\`));
        return this.history;
    }
    
    clearHistory() {
        this.history = [];
        console.log('🗑️ История очищена');
    }
}

// Демонстрация работы
const calc = new Calculator();
console.log('\\n🎯 Демонстрация калькулятора:');
calc.add(15, 25);
calc.subtract(100, 45);
calc.multiply(8, 7);
calc.divide(144, 12);
calc.power(5, 3);
calc.sqrt(64);
calc.getHistory();

return calc;
`;
        }
        
        // Генерация Todo-листа
        generateTodoApp(projectName) {
            return `
// 🤖 СГЕНЕРИРОВАНО НЕЙРОСЕТЬЮ CodeGen AI
// Проект: ${projectName} - Todo-лист

class TodoApp {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
        console.log('📋 Todo-лист создан');
    }
    
    addTask(title, priority = 'medium', dueDate = null) {
        const task = {
            id: this.nextId++,
            title: title,
            priority: priority,
            dueDate: dueDate ? new Date(dueDate) : null,
            completed: false,
            createdAt: new Date(),
            tags: []
        };
        this.tasks.push(task);
        console.log(\`✅ Добавлена задача: "\${title}" (${priority})\`);
        return task;
    }
    
    addTag(taskId, tag) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.tags.push(tag);
            console.log(\`🏷️ Добавлен тег "\${tag}" к задаче "\${task.title}"\`);
        }
    }
    
    completeTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = true;
            task.completedAt = new Date();
            console.log(\`✅ Завершена: "\${task.title}"\`);
        }
    }
    
    deleteTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            const deleted = this.tasks.splice(index, 1)[0];
            console.log(\`🗑️ Удалена: "\${deleted.title}"\`);
        }
    }
    
    filterByPriority(priority) {
        const filtered = this.tasks.filter(t => t.priority === priority);
        console.log(\`\\n📌 Задачи с приоритетом "\${priority}": \${filtered.length}\`);
        filtered.forEach(t => console.log(\`  \${t.completed ? '✅' : '⏳'} \${t.title}\`));
        return filtered;
    }
    
    filterByTag(tag) {
        const filtered = this.tasks.filter(t => t.tags.includes(tag));
        console.log(\`\\n🏷️ Задачи с тегом "\${tag}": \${filtered.length}\`);
        return filtered;
    }
    
    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const highPriority = this.tasks.filter(t => t.priority === 'high').length;
        
        console.log('\\n📊 Статистика:');
        console.log(\`  Всего: \${total}\`);
        console.log(\`  ✅ Выполнено: \${completed}\`);
        console.log(\`  ⏳ Осталось: \${pending}\`);
        console.log(\`  🔴 Высокий приоритет: \${highPriority}\`);
        
        return { total, completed, pending, highPriority };
    }
    
    showAllTasks() {
        console.log('\\n📋 ВСЕ ЗАДАЧИ:');
        if (this.tasks.length === 0) {
            console.log('  Нет задач');
            return;
        }
        
        this.tasks.forEach(task => {
            const status = task.completed ? '✅' : '⏳';
            const priorityIcon = task.priority === 'high' ? '🔴' : task.priority === 'low' ? '🟢' : '🟡';
            console.log(\`  \${status} \${priorityIcon} #\${task.id}: \${task.title}\`);
            if (task.tags.length) console.log(\`      Теги: \${task.tags.join(', ')}\`);
        });
    }
}

// Демонстрация
const todo = new TodoApp();
todo.addTask('Купить продукты', 'high');
todo.addTask('Сделать домашнее задание', 'high', '2024-12-20');
todo.addTask('Позвонить другу', 'low');
todo.addTag(1, 'личное');
todo.addTag(1, 'срочное');
todo.completeTask(3);
todo.showAllTasks();
todo.getStats();
todo.filterByPriority('high');

return todo;
`;
        }
        
        // Генерация API клиента
        generateApiClient(projectName) {
            return `
// 🤖 СГЕНЕРИРОВАНО НЕЙРОСЕТЬЮ CodeGen AI
// Проект: ${projectName} - API клиент

class ApiClient {
    constructor(baseURL = 'https://jsonplaceholder.typicode.com') {
        this.baseURL = baseURL;
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        this.cache = new Map();
        console.log(\`🌐 API клиент создан: \${baseURL}\`);
    }
    
    setAuthToken(token) {
        this.headers['Authorization'] = \`Bearer \${token}\`;
        console.log('🔑 Токен установлен');
    }
    
    async get(endpoint, useCache = true) {
        const cacheKey = \`GET:\${endpoint}\`;
        if (useCache && this.cache.has(cacheKey)) {
            console.log(\`📦 Загружено из кэша: \${endpoint}\`);
            return this.cache.get(cacheKey);
        }
        
        console.log(\`📡 GET запрос: \${endpoint}\`);
        try {
            const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
                method: 'GET',
                headers: this.headers
            });
            
            if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
            
            const data = await response.json();
            this.cache.set(cacheKey, data);
            console.log(\`✅ Получено: \${Array.isArray(data) ? data.length : 1} записей\`);
            return data;
        } catch (error) {
            console.error(\`❌ Ошибка GET: \${error.message}\`);
            throw error;
        }
    }
    
    async post(endpoint, data) {
        console.log(\`📡 POST запрос: \${endpoint}\`, data);
        try {
            const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            console.log(\`✅ Создано, ID: \${result.id}\`);
            return result;
        } catch (error) {
            console.error(\`❌ Ошибка POST: \${error.message}\`);
            throw error;
        }
    }
    
    async put(endpoint, data) {
        console.log(\`📡 PUT запрос: \${endpoint}\`);
        try {
            const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            console.log(\`✅ Обновлено\`);
            return result;
        } catch (error) {
            console.error(\`❌ Ошибка PUT: \${error.message}\`);
            throw error;
        }
    }
    
    async delete(endpoint) {
        console.log(\`📡 DELETE запрос: \${endpoint}\`);
        try {
            const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
                method: 'DELETE',
                headers: this.headers
            });
            
            console.log(\`✅ Удалено\`);
            return true;
        } catch (error) {
            console.error(\`❌ Ошибка DELETE: \${error.message}\`);
            throw error;
        }
    }
    
    clearCache() {
        this.cache.clear();
        console.log('🗑️ Кэш очищен');
    }
}

// Пример использования
async function demo() {
    const api = new ApiClient();
    
    // Получаем посты
    const posts = await api.get('/posts');
    console.log(\`\\n📝 Первые 3 поста:\`);
    posts.slice(0, 3).forEach(post => {
        console.log(\`  - \${post.title.substring(0, 50)}...\`);
    });
    
    // Создаем новый пост
    const newPost = await api.post('/posts', {
        title: 'Мой новый пост',
        body: 'Содержимое',
        userId: 1
    });
    
    return api;
}

// Запуск демо (раскомментируйте для реальных запросов)
// demo();

console.log('💡 Для демо раскомментируйте demo()');
return { ApiClient, message: 'API клиент готов' };
`;
        }
        
        // Генерация игры
        generateGame(projectName) {
            return `
// 🤖 СГЕНЕРИРОВАНО НЕЙРОСЕТЬЮ CodeGen AI
// Проект: ${projectName} - Угадай число

class GuessNumberGame {
    constructor(maxAttempts = 7, maxNumber = 100) {
        this.maxAttempts = maxAttempts;
        this.maxNumber = maxNumber;
        this.secretNumber = null;
        this.attempts = 0;
        this.isGameOver = false;
        this.history = [];
        console.log(\`🎮 Игра "Угадай число" создана\`);
        console.log(\`  Диапазон: 1-\${maxNumber}\`);
        console.log(\`  Попыток: \${maxAttempts}\`);
    }
    
    start() {
        this.secretNumber = Math.floor(Math.random() * this.maxNumber) + 1;
        this.attempts = 0;
        this.isGameOver = false;
        this.history = [];
        console.log('\\n🎮 Новая игра начата!');
        console.log('🔢 Я загадал число от 1 до ' + this.maxNumber);
        console.log(\`💡 У тебя \${this.maxAttempts} попыток\`);
        return this.secretNumber;
    }
    
    guess(number) {
        if (this.isGameOver) {
            console.log('❌ Игра окончена. Начни новую игру методом start()');
            return null;
        }
        
        if (this.attempts >= this.maxAttempts) {
            console.log(\`❌ Игра проиграна! Загаданное число было \${this.secretNumber}\`);
            this.isGameOver = true;
            return null;
        }
        
        this.attempts++;
        const guessInfo = {
            number: number,
            attempts: this.attempts,
            timestamp: new Date()
        };
        
        if (number === this.secretNumber) {
            console.log(\`🎉 ПОБЕДА! Ты угадал число \${this.secretNumber} за \${this.attempts} попыток!\`);
            this.isGameOver = true;
            guessInfo.result = 'win';
            this.history.push(guessInfo);
            return true;
        } else if (number < this.secretNumber) {
            console.log(\`📈 Загаданное число БОЛЬШЕ, чем \${number} (попытка \${this.attempts}/\${this.maxAttempts})\`);
            guessInfo.result = 'higher';
        } else {
            console.log(\`📉 Загаданное число МЕНЬШЕ, чем \${number} (попытка \${this.attempts}/\${this.maxAttempts})\`);
            guessInfo.result = 'lower';
        }
        
        this.history.push(guessInfo);
        
        if (this.attempts >= this.maxAttempts) {
            console.log(\`❌ Игра проиграна! Загаданное число было \${this.secretNumber}\`);
            this.isGameOver = true;
        }
        
        return false;
    }
    
    getHint() {
        if (!this.secretNumber) return null;
        
        const hint = Math.floor(this.secretNumber / 10) * 10;
        console.log(\`💡 Подсказка: число между \${hint} и \${hint + 9}\`);
        return { min: hint, max: hint + 9 };
    }
    
    getStats() {
        console.log('\\n📊 Статистика игры:');
        console.log(\`  Попыток сделано: \${this.attempts}\`);
        console.log(\`  Осталось попыток: \${Math.max(0, this.maxAttempts - this.attempts)}\`);
        console.log(\`  История ходов: \${this.history.length}\`);
        return {
            attempts: this.attempts,
            remaining: Math.max(0, this.maxAttempts - this.attempts),
            history: this.history
        };
    }
    
    showHistory() {
        console.log('\\n📜 История ходов:');
        this.history.forEach((h, i) => {
            const icon = h.result === 'win' ? '🎉' : h.result === 'higher' ? '⬆️' : '⬇️';
            console.log(\`  \${icon} Ход \${i + 1}: \${h.number}\`);
        });
    }
}

// Демонстрация игры
const game = new GuessNumberGame(5, 50);
game.start();

// Симуляция игры (автоматические ходы)
let guess = 25;
for (let i = 0; i < 5; i++) {
    const result = game.guess(guess);
    if (result === true) break;
    guess = result === false && guess < game.secretNumber ? guess + 10 : guess - 5;
}

game.showHistory();
game.getStats();

return game;
`;
        }
    }
    
    // Создаем экземпляр нейросети
    const neuralNetwork = new NeuralNetwork();
    
    return {
        generate: (type, projectName, customParams) => neuralNetwork.generate(type, projectName, customParams),
        version: neuralNetwork.version
    };
})();

// Делаем нейросеть глобальной
window.CodeNeuralNetwork = CodeNeuralNetwork;

console.log('🧠 Нейросеть CodeGen AI загружена!');
console.log('📌 Используйте CodeNeuralNetwork.generate(тип, название)');
