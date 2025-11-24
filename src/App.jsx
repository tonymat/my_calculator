import React, { useState, useEffect, useRef } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { logLogoutEvent } from './firestoreService';
import Calculator from './components/Calculator';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const loginTimeRef = useRef(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Store login time when user logs in
      if (currentUser && !loginTimeRef.current) {
        loginTimeRef.current = Date.now();
      }

      // Clear login time when user logs out
      if (!currentUser) {
        loginTimeRef.current = null;
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    loginTimeRef.current = Date.now();
  };

  const handleLogout = async () => {
    try {
      // Calculate session duration
      const sessionDuration = loginTimeRef.current
        ? Math.round((Date.now() - loginTimeRef.current) / 1000)
        : 0;

      // Log logout event before signing out
      if (user) {
        await logLogoutEvent(user.uid, user.email, sessionDuration);
      }

      await signOut(auth);
      loginTimeRef.current = null;
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="App" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: '#fff'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      {user && (
        <button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#e53935',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '25px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'transform 0.2s, background 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.background = '#d32f2f'}
          onMouseLeave={(e) => e.target.style.background = '#e53935'}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          Logout
        </button>
      )}
      {user ? (
        <Calculator />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
