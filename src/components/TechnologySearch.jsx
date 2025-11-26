import './TechnologySearch.css';

function TechnologySearch({ searchQuery, onSearchChange, resultsCount }) {
  return (
    <div className="technology-search">
      <div className="search-header">
        <h3>🔍 Поиск технологий</h3>
        <span className="results-count">Найдено: {resultsCount}</span>
      </div>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Введите название или описание технологии..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      
      {/* Подсказки для поиска */}
      <div className="search-hints">
        <small>Ищите по названию или описанию технологии</small>
      </div>
    </div>
  );
}

export default TechnologySearch;