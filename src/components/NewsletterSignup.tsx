'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Por favor, insira um e-mail válido.');
      return;
    }

    setStatus('loading');

    // TODO: Integrate with email service (e.g., ConvertKit, Mailchimp, or custom API)
    // For now, just simulate success
    setTimeout(() => {
      setStatus('success');
      setMessage('✅ Inscrição confirmada! Você receberá alertas sobre novos golpes.');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-4">
          🔔 Receba Alertas de Novos Golpes
        </h2>
        <p className="text-lg mb-6 opacity-90">
          Cadastre seu e-mail e receba notificações toda vez que um novo golpe é detectado no Brasil.
          100% gratuito, sem spam.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-6 py-4 rounded-lg text-black font-medium text-lg border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            {status === 'loading' ? 'Enviando...' : 'Inscrever-se'}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-4 rounded-lg font-bold ${
              status === 'success'
                ? 'bg-green-100 text-green-800 border-2 border-green-600'
                : 'bg-red-100 text-red-800 border-2 border-red-600'
            }`}
          >
            {message}
          </div>
        )}

        <p className="text-sm mt-4 opacity-75">
          🔒 Seus dados estão seguros. Você pode cancelar a inscrição a qualquer momento.
        </p>
      </div>
    </div>
  );
}
