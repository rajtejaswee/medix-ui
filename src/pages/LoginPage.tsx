import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Activity } from 'lucide-react';
import { signIn } from '@/services/authService';
import { requestNotificationPermission, showLocalNotification } from '@/services/notificationService';
import { useNotification } from '@/hooks/useNotification';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';

const errorMessages: Record<string, string> = {
  'auth/user-not-found':         'No account found with this email.',
  'auth/wrong-password':         'Incorrect password. Please try again.',
  'auth/invalid-credential':     'Invalid credentials. Please check your email and password.',
  'auth/invalid-email':          'Please enter a valid email address.',
  'auth/too-many-requests':      'Too many failed attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { notify } = useNotification();

  const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(!!localStorage.getItem('rememberedEmail'));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // If already logged in, go to dashboard
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const validateEmail = (val: string) => {
    if (!val) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address.';
    return '';
  };

  const validatePassword = (val: string) => {
    if (!val) return 'Password is required.';
    if (val.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);
    if (eErr || pErr) return;

    setLoading(true);
    setFirebaseError('');

    try {
      await signIn(email, password);
      if (remember) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      await requestNotificationPermission();
      showLocalNotification('Welcome back!', 'You are now logged in to HealthOS.');
      notify({ type: 'success', title: 'Welcome back!', message: 'You have logged in successfully.' });
      navigate('/dashboard');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      setFirebaseError(errorMessages[code] ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 p-12 relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 left-1/4 w-56 h-56 rounded-full bg-white/5" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Activity size={20} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">HealthOS</span>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Empowering Healthcare with<br />
            <span className="text-blue-200">Intelligent Management</span>
          </h1>
          <p className="text-blue-200 text-lg mb-10">
            The all-in-one platform for modern healthcare providers.
          </p>
          <div className="space-y-4">
            {[
              '🏥  Unified patient management across all departments',
              '📊  Real-time analytics and performance insights',
              '🔔  Instant critical alerts and smart notifications',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <p className="text-white text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-blue-300 text-sm">© 2024 HealthOS. All rights reserved.</p>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
              <Activity size={18} className="text-white" />
            </div>
            <span className="text-gray-900 font-bold text-xl">HealthOS</span>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h2>
            <p className="text-gray-500 text-sm mb-6">Enter your credentials to access the platform</p>

            {firebaseError && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {firebaseError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
              <Input
                label="Email address"
                id="email-input"
                type="email"
                placeholder="demo@healthos.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                onBlur={(e) => setEmailError(validateEmail(e.target.value))}
                error={emailError}
                autoComplete="email"
              />

              <Input
                label="Password"
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(''); }}
                onBlur={(e) => setPasswordError(validatePassword(e.target.value))}
                error={passwordError}
                autoComplete="current-password"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    id="toggle-password"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-sm text-primary-600 hover:underline">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                id="login-submit"
                size="lg"
              >
                Sign in
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-center text-xs text-gray-400 mb-2">Demo credentials</p>
              <div className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                <p className="text-xs text-gray-500">
                  <span className="font-mono font-medium text-gray-700">demo@healthos.com</span>
                  {' / '}
                  <span className="font-mono font-medium text-gray-700">Demo@1234</span>
                </p>
      
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
