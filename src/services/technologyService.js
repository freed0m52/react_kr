// Сервис для работы с технологиями (пока с mock данными, но готов к реальному API)
class TechnologyService {
  // Имитация базы данных технологий
  static mockTechnologies = [
    {
      id: 1,
      title: 'React',
      description: 'Библиотека для создания пользовательских интерфейсов',
      category: 'frontend',
      difficulty: 'beginner',
      resources: ['https://react.dev', 'https://ru.reactjs.org'],
      status: 'not-started'
    },
    {
      id: 2,
      title: 'Node.js',
      description: 'Среда выполнения JavaScript на сервере',
      category: 'backend', 
      difficulty: 'intermediate',
      resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'],
      status: 'not-started'
    },
    {
      id: 3,
      title: 'TypeScript',
      description: 'Типизированное надмножество JavaScript',
      category: 'language',
      difficulty: 'intermediate',
      resources: ['https://www.typescriptlang.org'],
      status: 'not-started'
    },
    {
      id: 4,
      title: 'MongoDB',
      description: 'Документоориентированная NoSQL база данных',
      category: 'database',
      difficulty: 'intermediate',
      resources: ['https://www.mongodb.com'],
      status: 'not-started'
    },
    {
      id: 5,
      title: 'Docker',
      description: 'Платформа для контейнеризации приложений',
      category: 'devops',
      difficulty: 'advanced',
      resources: ['https://www.docker.com'],
      status: 'not-started'
    }
  ];

  // Имитация загрузки технологий из API
  static async fetchTechnologies() {
    // Имитируем задержку сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // В реальном приложении здесь был бы fetch к API
    return {
      success: true,
      data: this.mockTechnologies,
      total: this.mockTechnologies.length
    };
  }

  // Имитация поиска технологий
  static async searchTechnologies(query) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const filtered = this.mockTechnologies.filter(tech =>
      tech.title.toLowerCase().includes(query.toLowerCase()) ||
      tech.description.toLowerCase().includes(query.toLowerCase()) ||
      tech.category.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      success: true,
      data: filtered,
      total: filtered.length
    };
  }

  // Имитация добавления технологии
  static async addTechnology(techData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newTech = {
      id: Date.now(),
      ...techData,
      createdAt: new Date().toISOString()
    };
    
    this.mockTechnologies.push(newTech);
    
    return {
      success: true,
      data: newTech
    };
  }
}

export default TechnologyService;