// App.js - Plataforma Educativa Chaski Bots Completa
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Configuración de la API
const API_BASE_URL = 'https://plataforma-educativa-backend-production.up.railway.app';
axios.defaults.baseURL = API_BASE_URL;

// Mapeo de grados ecuatorianos
const GRADOS_MAPPING = {
  'inicial-1': { nivel: 'Exploradores', edad: '3-4 años', color: '#10B981' },
  'inicial-2': { nivel: 'Exploradores', edad: '4-5 años', color: '#10B981' },
  '1-egb': { nivel: 'Exploradores', edad: '5-6 años', color: '#10B981' },
  '2-egb': { nivel: 'Exploradores', edad: '6-7 años', color: '#10B981' },
  '3-egb': { nivel: 'Constructores', edad: '7-8 años', color: '#3B82F6' },
  '4-egb': { nivel: 'Constructores', edad: '8-9 años', color: '#3B82F6' },
  '5-egb': { nivel: 'Constructores', edad: '9-10 años', color: '#3B82F6' },
  '6-egb': { nivel: 'Constructores', edad: '10-11 años', color: '#3B82F6' },
  '7-egb': { nivel: 'Constructores', edad: '11-12 años', color: '#3B82F6' },
  '8-egb': { nivel: 'Inventores', edad: '12-13 años', color: '#8B5CF6' },
  '9-egb': { nivel: 'Inventores', edad: '13-14 años', color: '#8B5CF6' },
  '10-egb': { nivel: 'Inventores', edad: '14-15 años', color: '#8B5CF6' },
  '1-bachillerato': { nivel: 'Ingenieros', edad: '15-16 años', color: '#EF4444' },
  '2-bachillerato': { nivel: 'Ingenieros', edad: '16-17 años', color: '#EF4444' },
  '3-bachillerato': { nivel: 'Ingenieros', edad: '17-18 años', color: '#EF4444' }
};

// Contexto para manejar estado global
const AppContext = React.createContext();

// Componente de Header
const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl">🤖</span>
            <h1 className="text-2xl font-bold">Chaski Bots LAB</h1>
          </div>
          <nav className="hidden md:flex space-x-6 items-center">
            <button onClick={() => navigate('/')} className="hover:text-blue-200">Inicio</button>
            <button onClick={() => navigate('/grados')} className="hover:text-blue-200">Niveles</button>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Hola, {user.nombre}</span>
                <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button onClick={() => navigate('/grados')} className="hover:text-blue-200">Ingresar</button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

// Componente de selección de grados
const GradosPage = () => {
  const navigate = useNavigate();
  
  const grados = [
    { id: 'inicial-1', label: 'Inicial 1', descripcion: '3-4 años' },
    { id: 'inicial-2', label: 'Inicial 2', descripcion: '4-5 años' },
    { id: '1-egb', label: '1.° de EGB', descripcion: '5-6 años' },
    { id: '2-egb', label: '2.° de EGB', descripcion: '6-7 años' },
    { id: '3-egb', label: '3.° de EGB', descripcion: '7-8 años' },
    { id: '4-egb', label: '4.° de EGB', descripcion: '8-9 años' },
    { id: '5-egb', label: '5.° de EGB', descripcion: '9-10 años' },
    { id: '6-egb', label: '6.° de EGB', descripcion: '10-11 años' },
    { id: '7-egb', label: '7.° de EGB', descripcion: '11-12 años' },
    { id: '8-egb', label: '8.° de EGB', descripcion: '12-13 años' },
    { id: '9-egb', label: '9.° de EGB', descripcion: '13-14 años' },
    { id: '10-egb', label: '10.° de EGB', descripcion: '14-15 años' },
    { id: '1-bachillerato', label: '1.° de Bachillerato', descripcion: '15-16 años' },
    { id: '2-bachillerato', label: '2.° de Bachillerato', descripcion: '16-17 años' },
    { id: '3-bachillerato', label: '3.° de Bachillerato', descripcion: '17-18 años' }
  ];

  const handleGradoSelect = (gradoId) => {
    navigate(`/login/${gradoId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Selecciona tu Grado Escolar
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada grado tiene contenido específico diseñado para tu edad y nivel de aprendizaje
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {grados.map(grado => {
            const nivelInfo = GRADOS_MAPPING[grado.id];
            return (
              <button 
                key={grado.id}
                onClick={() => handleGradoSelect(grado.id)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 text-center border-2 border-transparent hover:border-blue-300"
                style={{borderTopColor: nivelInfo.color, borderTopWidth: '4px'}}
              >
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold"
                  style={{backgroundColor: nivelInfo.color}}
                >
                  {grado.label.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{grado.label}</h3>
                <p className="text-sm text-gray-600 mb-2">{grado.descripcion}</p>
                <p className="text-xs text-gray-500 font-medium">{nivelInfo.nivel}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Componente de Login
const LoginPage = () => {
  const { grado } = useParams();
  const navigate = useNavigate();
  const { setUser } = React.useContext(AppContext);
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    codigo_institucion: ''
  });

  const gradoInfo = GRADOS_MAPPING[grado] || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        // Registro
        const response = await axios.post('/api/auth/registro-estudiante', {
          ...formData,
          grado
        });
        
        if (response.data.success) {
          setUser(response.data.user);
          navigate('/dashboard');
        }
      } else {
        // Login
        const response = await axios.post('/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        
        if (response.data.success) {
          setUser(response.data.user);
          navigate('/dashboard');
        }
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Info del grado */}
          <div className="mb-8 text-center">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              style={{backgroundColor: gradoInfo.color}}
            >
              {grado?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{grado?.replace('-', ' ').toUpperCase()}</h2>
            <p className="text-gray-600">{gradoInfo.nivel} • {gradoInfo.edad}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegistering && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input 
                      type="text" 
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                    <input 
                      type="text" 
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Código de Institución</label>
                    <input 
                      type="text" 
                      name="codigo_institucion"
                      value={formData.codigo_institucion}
                      onChange={handleInputChange}
                      placeholder="Ejemplo: DEMO2025"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">Tu institución te proporcionará este código</p>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Cargando...' : (isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/grados')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Volver a seleccionar grado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Dashboard
const Dashboard = () => {
  const { user, setUser } = React.useContext(AppContext);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        // Obtener cursos para el nivel del usuario
        const gradoInfo = GRADOS_MAPPING[user?.grado];
        if (gradoInfo) {
          const response = await axios.get(`/api/cursos?nivel=${gradoInfo.nivel}`);
          setCursos(response.data.cursos || []);
        }
      } catch (error) {
        console.error('Error cargando cursos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCursos();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/grados" replace />;
  }

  const gradoInfo = GRADOS_MAPPING[user.grado] || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              style={{backgroundColor: gradoInfo.color}}
            >
              {user.nombre.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">¡Bienvenido, {user.nombre}!</h1>
              <p className="text-gray-600">{user.grado?.replace('-', ' ').toUpperCase()} • Nivel: {gradoInfo.nivel}</p>
              {user.institucion && <p className="text-sm text-gray-500">{user.institucion}</p>}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-xl">Cargando cursos...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cursos.map((curso) => (
                <div key={curso.id} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-bold text-gray-800 mb-2">{curso.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-4">{curso.descripcion}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Comenzar Curso
                  </button>
                </div>
              ))}
              
              {cursos.length === 0 && (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No hay cursos disponibles para tu nivel aún.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal de Home (página de inicio)
const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    niveles: 0,
    instituciones: 0, 
    cursos: 0,
    apiStatus: 'Loading...'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [healthRes, nivelesRes, institucionesRes] = await Promise.all([
          axios.get('/api/health'),
          axios.get('/api/niveles'),
          axios.get('/api/instituciones')
        ]);
        
        setStats({
          niveles: nivelesRes.data.count || 0,
          instituciones: institucionesRes.data.count || 0,
          cursos: 12, // Número fijo basado en tu DB
          apiStatus: healthRes.data.status
        });
      } catch (error) {
        setStats(prev => ({ ...prev, apiStatus: 'ERROR' }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
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
          <button 
            onClick={() => navigate('/grados')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Comenzar Ahora
          </button>
        </div>
      </section>

      {/* Stats Section */}
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
    </div>
  );
};

// Provider del contexto
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chaskiUser');
  };

  return (
    <AppContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// Componente principal de la aplicación
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <AppContext.Consumer>
            {({ user, logout }) => (
              <>
                <Header user={user} onLogout={logout} />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/grados" element={<GradosPage />} />
                  <Route path="/login/:grado" element={<LoginPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </>
            )}
          </AppContext.Consumer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
