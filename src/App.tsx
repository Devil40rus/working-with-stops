import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { loadData, clearError } from './store/appSlice';

import Map from './components/Map';
import './styles/App.scss';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, sites } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  const handleErrorClose = () => {
    dispatch(clearError());
  };

  if (loading) {
    return (
      <div className="loading-container">
        Загрузка данных...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          Ошибка: {error}
        </div>
        <button 
          onClick={handleErrorClose}
          className="error-button"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <div className="no-data-container">
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div className="app">
      <div className="legend">
        <h3 className="legend__title">Легенда цветов:</h3>
        <div className="legend__list">
          <div className="legend__item">
            <div className="legend__dot legend__dot--green"></div>
            <span>≤ 5 мин</span>
          </div>
          <div className="legend__item">
            <div className="legend__dot legend__dot--yellow"></div>
            <span>5-15 мин</span>
          </div>
          <div className="legend__item">
            <div className="legend__dot legend__dot--red"></div>
            <span>15-30 мин</span>
          </div>
          <div className="legend__item">
            <div className="legend__dot legend__dot--purple"></div>
            <span>&gt; 30 мин</span>
          </div>
          <div className="legend__item">
            <div className="legend__dot legend__dot--black"></div>
            <span>Недоступно</span>
          </div>
        </div>
      </div>
      <Map />
    </div>
  );
}

export default App;
