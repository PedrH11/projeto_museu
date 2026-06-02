'use client';
import { AlertCircle, Home, RefreshCw, WifiOff } from 'lucide-react';
import Link from 'next/link';

export default function ServiceUnavailablePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
        {/* Ícone de Alerta Animado */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-25"></div>
            <div className="relative bg-red-50 p-5 rounded-full">
              <WifiOff className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Mensagem Principal */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Serviço Temporariamente Indisponível</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Não conseguimos carregar os recursos necessários do servidor HATEOAS. Isso pode ser uma manutenção programada
          ou uma falha de conexão.
        </p>

        {/* Detalhes Técnicos (Opcional/Sutil) */}
        <div className="bg-slate-50 rounded-lg p-4 mb-8 flex items-start gap-3 text-left">
          <AlertCircle className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-slate-500">
            <p className="font-semibold text-slate-600 mb-1">Status do Erro:</p>
            <p>Resource Provider Offline (503)</p>
            <p className="mt-1 italic">Verifique se o backend do IFSP Birigui está em execução.</p>
          </div>
        </div>

        {/* Ações */}
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl border border-slate-200 transition-all"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} IFSP Birigui - Sistema de Gestão de Recursos
        </p>
      </div>
    </div>
  );
}
