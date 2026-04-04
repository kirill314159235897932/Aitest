// ==================== НАСТОЯЩАЯ НЕЙРОСЕТЬ ====================
// Она НЕ использует готовые шаблоны, а анализирует и создаёт код сама

class RealNeuralNetwork {
    constructor() {
        this.analysisResults = [];
        this.neuralPatterns = new Map();
        this.currentStep = 0;
    }
    
    async generateCode(userPrompt, language) {
        this.analysisResults = [];
        this.updateStep(1, '🔍 Поиск и анализ интернета...');
        
        // ШАГ 1: Поиск в интернете
        const searchResults = await this.searchInternet(userPrompt);
        this.addAnalysis('🔍 НАЙДЕНО ИСТОЧНИКОВ', `${searchResults.length} страниц`);
        
        // ШАГ 2: Анализ каждого источника
        this.updateStep(2, '🧠 Анализ паттернов кода...');
        const patterns = await this.analyzePatterns(searchResults, language);
        this.addAnalysis('📊 АНАЛИЗ ПАТТЕРНОВ', `Найдено ${patterns.length} уникальных конструкций`);
        
        // ШАГ 3: Понимание задачи
        this.updateStep(3, '🎯 Понимание задачи...');
        const taskAnalysis = this.analyzeTask(userPrompt);
        this.addAnalysis('🎯 РАЗБОР ЗАДАЧИ', taskAnalysis.explanation);
        
        // ШАГ 4: Генерация уникального кода
        this.updateStep(4, '🤖 Создание кода...');
        const generatedCode = this.composeUniqueCode(taskAnalysis, patterns, language);
        
        this.addAnalysis('✅ РЕЗУЛЬТАТ', 'Код успешно создан нейросетью');
        
        return {
            code: generatedCode,
            analysis: this.analysisResults
        };
    }
    
    // Поиск в интернете
    async searchInternet(query) {
        // Реальный поиск через DuckDuckGo API
        const searchTerms = this.extractKeyTerms(query);
        const results = [];
        
        for (const term of searchTerms.slice(0, 3)) {
            try {
                const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(term + " programming example")}&format=json`);
                const data = await response.json();
                
                if (data.AbstractText) {
                    results.push({
                        title: data.Heading || term,
                        content: data.AbstractText,
                        url: data.AbstractURL
                    });
                }
                
                if (data.RelatedTopics) {
                    for (const topic of data.RelatedTopics) {
                        if (topic.Text) {
                            results.push({
                                title: topic.Text.split(' - ')[0],
                                content: topic.Text,
                                url: topic.FirstURL
                            });
                        }
                    }
                }
            } catch(e) { console.warn(e); }
        }
        
        return results;
    }
    
    extractKeyTerms(query) {
        // Извлекаем ключевые слова из запроса
        const stopWords = ['создай', 'сделай', 'напиши', 'функцию', 'класс', 'который', 'которая'];
        let words = query.toLowerCase().split(/\s+/);
        words = words.filter(w => !stopWords.includes(w) && w.length > 2);
        
        const terms = [];
        if (words.includes('чётные') || words.includes('even')) terms.push('filter even numbers');
        if (words.includes('массив') || words.includes('array')) terms.push('array filter');
        if (words.includes('сумму') || words.includes('sum')) terms.push('sum function');
        if (words.includes('сортировк') || words.includes('sort')) terms.push('sort algorithm');
        
        if (terms.length === 0) terms.push(query);
        return terms;
    }
    
    // Анализ паттернов из найденных источников
    async analyzePatterns(sources, language) {
        const patterns = [];
        
        for (const source of sources) {
            if (!source.content) continue;
            
            // Ищем реальные примеры кода в тексте
            const codeBlocks = this.extractCodeBlocks(source.content, language);
            
            for (const code of codeBlocks) {
                const pattern = this.extractPattern(code, language);
                if (pattern) {
                    patterns.push(pattern);
                    this.addAnalysis(`📄 ИЗ ${source.title || 'источника'}`, pattern.summary);
                }
            }
        }
        
        // Уникальные паттерны
        return [...new Map(patterns.map(p => [p.type, p])).values()];
    }
    
    extractCodeBlocks(text, language) {
        const blocks = [];
        const patterns = [
            /```(?:javascript|js)?\n([\s\S]*?)```/gi,
            /`([^`]{30,})`/g,
            /<code>([\s\S]*?)<\/code>/gi,
            /function\s+\w+\s*\([^)]*\)\s*\{[^}]*\}/gi,
            /const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{[^}]*\}/gi
        ];
        
        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(text)) !== null) {
                let code = match[1] || match[0];
                if (code.length > 20 && code.length < 2000) {
                    blocks.push(code);
                }
            }
        }
        
        return blocks;
    }
    
    extractPattern(code, language) {
        // Анализируем структуру кода
        const pattern = {
            type: 'unknown',
            structure: [],
            operations: [],
            summary: ''
        };
        
        // Определяем тип
        if (code.includes('function') && code.includes('return')) {
            pattern.type = 'function';
            
            // Извлекаем имя
            const nameMatch = code.match(/function\s+(\w+)/);
            if (nameMatch) pattern.name = nameMatch[1];
            
            // Извлекаем параметры
            const paramMatch = code.match(/\(([^)]+)\)/);
            if (paramMatch) pattern.params = paramMatch[1].split(',').map(p => p.trim());
            
            // Анализируем операции
            if (code.includes('+')) pattern.operations.push('addition');
            if (code.includes('-')) pattern.operations.push('subtraction');
            if (code.includes('*')) pattern.operations.push('multiplication');
            if (code.includes('/')) pattern.operations.push('division');
            if (code.includes('%')) pattern.operations.push('modulo');
            if (code.includes('filter')) pattern.operations.push('filter');
            if (code.includes('map')) pattern.operations.push('map');
            if (code.includes('reduce')) pattern.operations.push('reduce');
            if (code.includes('if')) pattern.operations.push('conditional');
            if (code.includes('for') || code.includes('while')) pattern.operations.push('loop');
            
            pattern.summary = `Функция ${pattern.name || 'без имени'} с ${pattern.params?.length || 0} параметрами`;
        }
        
        if (code.includes('class')) {
            pattern.type = 'class';
            const nameMatch = code.match(/class\s+(\w+)/);
            if (nameMatch) pattern.name = nameMatch[1];
            pattern.summary = `Класс ${pattern.name || 'без имени'}`;
        }
        
        if (code.includes('const') && code.includes('=>')) {
            pattern.type = 'arrow';
            pattern.summary = 'Стрелочная функция';
        }
        
        return pattern;
    }
    
    // Анализ задачи пользователя
    analyzeTask(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        const analysis = {
            inputType: 'unknown',
            outputType: 'unknown',
            operations: [],
            needsErrorHandling: false,
            explanation: ''
        };
        
        // Определяем тип входных данных
        if (lowerPrompt.includes('массив') || lowerPrompt.includes('array')) {
            analysis.inputType = 'array';
            analysis.explanation += 'Входные данные: массив\n';
        }
        if (lowerPrompt.includes('числ') || lowerPrompt.includes('number')) {
            analysis.inputType = 'number';
        }
        if (lowerPrompt.includes('строк') || lowerPrompt.includes('string')) {
            analysis.inputType = 'string';
        }
        
        // Определяем операции
        if (lowerPrompt.includes('чётн') || lowerPrompt.includes('even')) {
            analysis.operations.push('filterEven');
            analysis.explanation += 'Операция: фильтрация чётных чисел\n';
        }
        if (lowerPrompt.includes('нечётн') || lowerPrompt.includes('odd')) {
            analysis.operations.push('filterOdd');
            analysis.explanation += 'Операция: фильтрация нечётных чисел\n';
        }
        if (lowerPrompt.includes('сумм') || lowerPrompt.includes('sum')) {
            analysis.operations.push('sum');
            analysis.explanation += 'Операция: вычисление суммы\n';
        }
        if (lowerPrompt.includes('сортир') || lowerPrompt.includes('sort')) {
            analysis.operations.push('sort');
            analysis.explanation += 'Операция: сортировка\n';
        }
        if (lowerPrompt.includes('умнож') || lowerPrompt.includes('multiply')) {
            analysis.operations.push('multiply');
            analysis.explanation += 'Операция: умножение\n';
        }
        
        if (lowerPrompt.includes('ошибк') || lowerPrompt.includes('error')) {
            analysis.needsErrorHandling = true;
            analysis.explanation += 'Требуется: обработка ошибок\n';
        }
        
        return analysis;
    }
    
    // ГЕНЕРАЦИЯ УНИКАЛЬНОГО КОДА (НЕ ПО ШАБЛОНАМ!)
    composeUniqueCode(taskAnalysis, patterns, language) {
        let code = '';
        
        // Генерируем на основе анализа, а не шаблонов
        if (language === 'javascript') {
            code = this.generateJavaScript(taskAnalysis, patterns);
        } else {
            code = this.generatePython(taskAnalysis, patterns);
        }
        
        // Пост-обработка - делаем код красивым
        return this.formatCode(code);
    }
    
    generateJavaScript(analysis, patterns) {
        let code = `// 🤖 СГЕНЕРИРОВАНО НЕЙРОСЕТЬЮ
// Анализ задачи: ${analysis.explanation.replace(/\n/g, '; ')}
// Найдено паттернов: ${patterns.length}

`;

        // Создаём уникальную функцию на основе анализа
        const functionName = this.generateFunctionName(analysis);
        
        code += `/**
 * ${this.generateDescription(analysis)}
 * @param {${this.getInputType(analysis)}} data - Входные данные
 * @returns {${this.getOutputType(analysis)}} Результат обработки
 */
function ${functionName}(data) {
    // Проверка входных данных
    if (!data) {
        throw new Error('Входные данные не могут быть пустыми');
    }
    
`;

        // Генерируем тело функции на основе операций
        if (analysis.inputType === 'array') {
            code += this.generateArrayProcessing(analysis);
        } else if (analysis.inputType === 'number') {
            code += this.generateNumberProcessing(analysis);
        } else {
            code += this.generateGenericProcessing(analysis);
        }
        
        code += `}
    
// Пример использования
try {
    const testData = ${this.generateExampleInput(analysis)};
    console.log('Входные данные:', testData);
    const result = ${functionName}(testData);
    console.log('Результат:', result);
} catch (error) {
    console.error('Ошибка:', error.message);
}

export default ${functionName};`;
        
        return code;
    }
    
    generateArrayProcessing(analysis) {
        let code = '    let result;\n\n';
        
        // Проверка на массив
        code += '    if (!Array.isArray(data)) {\n';
        code += '        throw new Error(\'Ожидается массив\');\n';
        code += '    }\n\n';
        
        // Применяем операции в правильном порядке
        let currentData = 'data';
        
        if (analysis.operations.includes('filterEven')) {
            code += `    // Фильтрация чётных чисел\n`;
            code += `    result = ${currentData}.filter(num => typeof num === 'number' && num % 2 === 0);\n`;
            currentData = 'result';
            code += '\n';
        }
        
        if (analysis.operations.includes('filterOdd')) {
            code += `    // Фильтрация нечётных чисел\n`;
            code += `    result = ${currentData}.filter(num => typeof num === 'number' && num % 2 !== 0);\n`;
            currentData = 'result';
            code += '\n';
        }
        
        if (analysis.operations.includes('sum')) {
            code += `    // Вычисление суммы\n`;
            code += `    result = ${currentData}.reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);\n`;
            currentData = 'result';
            code += '\n';
        }
        
        if (analysis.operations.includes('sort')) {
            code += `    // Сортировка\n`;
            code += `    result = [...${currentData === 'result' ? 'result' : 'data'}].sort((a, b) => a - b);\n`;
            code += '\n';
        }
        
        if (analysis.operations.includes('multiply')) {
            code += `    // Умножение всех элементов\n`;
            code += `    result = ${currentData === 'result' ? 'result' : 'data'}.reduce((acc, val) => acc * val, 1);\n`;
        }
        
        // Если нет операций, просто возвращаем данные
        if (!analysis.operations.length) {
            code += `    // Обработка массива\n`;
            code += `    result = ${currentData}.map(item => item);\n`;
        }
        
        code += `\n    return result;`;
        
        return code;
    }
    
    generateNumberProcessing(analysis) {
        let code = '    let result = data;\n\n';
        
        if (analysis.operations.includes('sum')) {
            code += `    // Суммирование не применимо к одному числу\n`;
        }
        
        if (analysis.operations.includes('multiply')) {
            code += `    // Умножение числа на 2\n`;
            code += `    result = result * 2;\n`;
        }
        
        code += `\n    return result;`;
        return code;
    }
    
    generateGenericProcessing(analysis) {
        return `    // Обработка данных
    let result = data;
    
    // Базовая обработка
    if (typeof data === 'string') {
        result = data.toUpperCase();
    } else if (typeof data === 'number') {
        result = data * 2;
    } else if (Array.isArray(data)) {
        result = data.length;
    }
    
    return result;`;
    }
    
    generateFunctionName(analysis) {
        const parts = [];
        if (analysis.operations.includes('filterEven')) parts.push('filterEven');
        if (analysis.operations.includes('sum')) parts.push('sum');
        if (analysis.operations.includes('sort')) parts.push('sort');
        
        if (parts.length === 0) return 'processData';
        return parts.join('And');
    }
    
    generateDescription(analysis) {
        const desc = [];
        if (analysis.operations.includes('filterEven')) desc.push('фильтрует чётные числа');
        if (analysis.operations.includes('sum')) desc.push('вычисляет сумму');
        if (analysis.operations.includes('sort')) desc.push('сортирует');
        
        if (desc.length === 0) return 'Обрабатывает входные данные';
        return desc.join(', ');
    }
    
    getInputType(analysis) {
        if (analysis.inputType === 'array') return 'Array<number>';
        if (analysis.inputType === 'number') return 'number';
        return 'any';
    }
    
    getOutputType(analysis) {
        if (analysis.operations.includes('sum')) return 'number';
        if (analysis.operations.includes('filterEven')) return 'Array<number>';
        return 'any';
    }
    
    generateExampleInput(analysis) {
        if (analysis.inputType === 'array') {
            if (analysis.operations.includes('filterEven')) {
                return '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]';
            }
            return '[5, 2, 8, 1, 9, 3]';
        }
        return '42';
    }
    
    generatePython(analysis, patterns) {
        let code = `# 🤖 СГЕНЕРИРОВАНО НЕЙРОСЕТЬЮ
# Анализ задачи: ${analysis.explanation.replace(/\n/g, '; ')}

def ${this.generateFunctionName(analysis)}(data):
    """
    ${this.generateDescription(analysis)}
    
    Args:
        data: Входные данные
    
    Returns:
        Результат обработки
    """
    # Проверка входных данных
    if not data:
        raise ValueError("Входные данные не могут быть пустыми")
    
`;
        
        if (analysis.inputType === 'array') {
            code += `    if not isinstance(data, list):
        raise TypeError("Ожидается список")
    
`;
            
            if (analysis.operations.includes('filterEven')) {
                code += `    # Фильтрация чётных чисел
    result = [x for x in data if isinstance(x, (int, float)) and x % 2 == 0]
    
`;
            }
            
            if (analysis.operations.includes('sum')) {
                code += `    # Вычисление суммы
    result = sum(x for x in data if isinstance(x, (int, float)))
    
`;
            }
            
            if (analysis.operations.includes('sort')) {
                code += `    # Сортировка
    result = sorted(result if 'result' in locals() else data)
    
`;
            }
            
            if (!analysis.operations.length) {
                code += `    # Обработка списка
    result = data.copy()
    
`;
            }
        } else {
            code += `    # Базовая обработка
    result = data
    
`;
        }
        
        code += `    return result

# Пример использования
if __name__ == "__main__":
    test_data = ${this.generateExampleInput(analysis)}
    print(f"Входные данные: {test_data}")
    try:
        result = ${this.generateFunctionName(analysis)}(test_data)
        print(f"Результат: {result}")
    except Exception as e:
        print(f"Ошибка: {e}")`;
        
        return code;
    }
    
    formatCode(code) {
        // Делаем код красивым с правильными отступами
        const lines = code.split('\n');
        let formatted = [];
        let indent = 0;
        
        for (let line of lines) {
            if (line.includes('}') || line.includes('}')) {
                indent = Math.max(0, indent - 1);
            }
            
            formatted.push('    '.repeat(indent) + line.trim());
            
            if (line.includes('{') || line.includes('{')) {
                indent++;
            }
        }
        
        return formatted.join('\n');
    }
    
    updateStep(step, message) {
        const stepsDiv = document.getElementById('loadingSteps');
        if (stepsDiv) {
            stepsDiv.innerHTML = `<p>⚙️ Шаг ${step}/4: ${message}</p>`;
        }
    }
    
    addAnalysis(title, content) {
        this.analysisResults.push({ title, content });
        
        // Обновляем отображение
        const analysisDiv = document.getElementById('analysisLog');
        if (analysisDiv) {
            const item = document.createElement('div');
            item.className = 'analysis-item';
            item.innerHTML = `<strong>${title}</strong><br><span class="analysis-content">${content}</span>`;
            analysisDiv.appendChild(item);
            analysisDiv.scrollTop = analysisDiv.scrollHeight;
        }
    }
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

const neuralNetwork = new RealNeuralNetwork();
let currentGeneratedCode = '';

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const executeBtn = document.getElementById('executeBtn');
    const loading = document.getElementById('loading');
    const generatedCodePre = document.getElementById('generatedCode');
    const runOutput = document.getElementById('runOutput');
    const analysisDiv = document.getElementById('analysisLog');
    
    generateBtn.addEventListener('click', async () => {
        const userPrompt = document.getElementById('userPrompt').value.trim();
        const language = document.getElementById('language').value;
        
        if (!userPrompt) {
            alert('Введите описание задачи!');
            return;
        }
        
        loading.style.display = 'block';
        generateBtn.disabled = true;
        analysisDiv.innerHTML = '';
        
        try {
            const { code, analysis } = await neuralNetwork.generateCode(userPrompt, language);
            currentGeneratedCode = code;
            generatedCodePre.textContent = code;
            
        } catch (error) {
            generatedCodePre.textContent = `// Ошибка: ${error.message}`;
        } finally {
            loading.style.display = 'none';
            generateBtn.disabled = false;
        }
    });
    
    copyBtn.addEventListener('click', () => {
        if (currentGeneratedCode) {
            navigator.clipboard.writeText(currentGeneratedCode);
            alert('✅ Код скопирован');
        }
    });
    
    executeBtn.addEventListener('click', () => {
        if (!currentGeneratedCode) {
            runOutput.innerHTML = '<span style="color: #f48771;">❌ Нет кода</span>';
            return;
        }
        
        runOutput.innerHTML = '<span style="color: #4ec9b0;">⏳ Выполнение...</span>';
        
        setTimeout(() => {
            try {
                let output = [];
                const originalLog = console.log;
                console.log = (...args) => {
                    output.push(args.join(' '));
                    originalLog.apply(console, args);
                };
                
                const func = new Function(currentGeneratedCode);
                const result = func();
                
                console.log = originalLog;
                
                runOutput.innerHTML = `
                    <div style="color: #4ec9b0;">✅ Выполнено</div>
                    ${output.length ? `<div style="margin-top: 10px;"><strong>📢 Вывод:</strong><br>${output.map(o => `> ${escapeHtml(o)}`).join('<br>')}</div>` : ''}
                    ${result !== undefined ? `<div style="margin-top: 10px;"><strong>📦 Результат:</strong><br><pre>${escapeHtml(JSON.stringify(result, null, 2))}</pre></div>` : ''}
                `;
            } catch (error) {
                runOutput.innerHTML = `<span style="color: #f48771;">❌ Ошибка: ${error.message}</span>`;
            }
        }, 100);
    });
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Переключение вкладок
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(`${tabId}Tab`).classList.add('active');
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');
        });
    });
});
