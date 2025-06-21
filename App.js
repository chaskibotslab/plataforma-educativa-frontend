// App.js - Plataforma Educativa Chaski Bots
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Configuración de la API
const API_BASE_URL = 'https://plataforma-educativa-backend-production.up.railway.app';

// Configurar axios
axios.defaults.baseURL = API_BASE_URL;

// Componente de Header
const Header = () => (
  <header className="bg-blue-600 text-white shadow-lg">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🤖</span>
          <h1 className="text-2xl font-bold">Chaski Bots LAB</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-blue-200">Inicio</a>
          <a href="#niveles" className="hover:text-blue-200">Niveles</a>
          <a href="#instituciones" className="hover:text-blue-200">Instituciones</a>
          <a href="#login" className="hover:text-blue-200">Ingresar</a>
        </nav>
      </div>
    </div>
  </header>
);

// Componente de Footer
const Footer = () => (
  <footer className="bg-gray-800 text-white py-8 mt-12">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; 2025 Chaski Bots LAB - Plataforma Educativa de Robótica</p>
      <p className="text-gray-400 mt-2">Desarrollando el futuro, un robot a la vez</p>
    </div>
  </footer>
);

// Componente de Card para niveles
const NivelCard = ({ nivel }) => {
  const getColorClass = (color) => {
    const colorMap = {
      '#10B981': 'bg-green-500',
      '#3B82F6': 'bg-blue-500', 
      '#8B5CF6': 'bg-purple-500',
      '#EF4444': 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-full ${getColorClass(nivel.color)} flex items-center justify-center text-white text-xl`}>
          {nivel.icono}
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-800">{nivel.nombre}</h3>
          <p className="text-gray-600">{nivel.edad_minima} - {nivel.edad_maxima} años</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{nivel.descripcion}</p>
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
        Explorar Cursos
      </button>
    </div>
  );
};

// Componente de estadísticas
const StatsSection = ({ stats }) => (
  <div className="bg-gray-100 py-12">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Estado de la Plataforma</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.niveles}</div>
          <div className="text-gray-600">Niveles Educativos</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{stats.instituciones}</div>
          <div className="text-gray-600">Instituciones</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{stats.cursos}</div>
          <div className="text-gray-600">Cursos Disponibles</div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${stats.apiStatus === 'OK' ? 'text-green-600' : 'text-red-600'}`}>
            {stats.apiStatus === 'OK' ? '✅' : '❌'}
          </div>
          <div className="text-gray-600">Estado API</div>
        </div>
      </div>
    </div>
  </div>
);

// Componente principal de Home
const Home = () => {
  const [niveles, setNiveles] = useState([]);
  const [stats, setStats] = useState({
    niveles: 0,
    instituciones: 0, 
    cursos: 0,
    apiStatus: 'Loading...'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Verificar estado de la API
        const healthResponse = await axios.get('/api/health');
        
        // Obtener niveles
        const nivelesResponse = await axios.get('/api/niveles');
        
        // Obtener instituciones
        const institucionesResponse = await axios.get('/api/instituciones');
        
        setNiveles(nivelesResponse.data.niveles || []);
        setStats({
          niveles: nivelesResponse.data.count || 0,
          instituciones: institucionesResponse.data.count || 0,
          cursos: nivelesResponse.data.niveles?.length * 3 || 0, // Estimado
          apiStatus: healthResponse.data.status
        });
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error conectando con la API');
        setStats(prev => ({ ...prev, apiStatus: 'ERROR' }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🤖</div>
          <div className="text-xl">Cargando plataforma...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Aprende Robótica y Programación
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Desde tus primeros pasos con bloques visuales hasta inteligencia artificial avanzada. 
            Una plataforma educativa diseñada para todas las edades.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Comenzar Ahora
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Niveles Section */}
      <section id="niveles" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Niveles Educativos</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {niveles.map((nivel) => (
              <NivelCard key={nivel.id} nivel={nivel} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">¿Por qué elegir Chaski Bots?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-2">Aprendizaje Gamificado</h3>
              <p className="text-gray-600">Sistema de badges, logros y competencias que mantienen a los estudiantes motivados.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-2">Simuladores Integrados</h3>
              <p className="text-gray-600">Practica con Arduino, ESP32 y Raspberry Pi sin necesidad de hardware físico.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold mb-2">Para Instituciones</h3>
              <p className="text-gray-600">Dashboard completo para profesores con seguimiento de progreso y asignación de tareas.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Componente principal de la aplicación
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          {/* Aquí agregaremos más rutas después */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
