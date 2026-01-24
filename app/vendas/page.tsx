'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, ShieldCheck, LayoutDashboard, MessageSquare, ArrowRight, Star, MousePointer2 } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 text-black font-bold">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg">
              <MessageSquare size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter">Cobra<span className="text-indigo-600">ZAP</span></span>
          </div>
          
          <Link href="/" className="bg-indigo-600 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            Acessar Painel
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-5 py-2 rounded-full text-xs font-black mb-10 uppercase tracking-widest"
          >
            <Star size={14} className="fill-indigo-700" /> O Futuro das Cobranças chegou
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] mb-10 text-slate-900 italic">
            Cobre com classe. <br />
            <span className="text-indigo-600 font-black">Receba no Zap.</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Automatize seus lembretes de pagamento com uma linguagem que converte e respeita o Código de Defesa do Consumidor.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/" className="w-full md:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl flex items-center justify-center gap-3 group">
              Começar Agora <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl -z-10" />
      </header>

      {/* PLANOS */}
      <section id="planos" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 text-black font-bold">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Investimento Simples</h2>
          <p className="text-slate-400 text-xl font-medium">Escolha o plano perfeito para o seu momento.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* PLANO GRÁTIS */}
          <div className="p-10 md:p-14 rounded-[40px] border border-slate-200 bg-white flex flex-col justify-between hover:shadow-2xl transition-all duration-500">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Iniciante</div>
              <div className="text-6xl font-black mb-10 text-black">R$ 0<span className="text-lg font-normal text-slate-300 ml-2">/mês</span></div>
              <ul className="space-y-6 mb-12">
                <PricingItem text="Até 5 clientes cadastrados" />
                <PricingItem text="Cobranças manuais ilimitadas" />
              </ul>
            </div>
            <Link href="/" className="w-full text-center py-5 rounded-2xl font-black text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all uppercase text-xs tracking-widest">
              Criar Conta Grátis
            </Link>
          </div>

          {/* PLANO PRO */}
          <div className="p-10 md:p-14 rounded-[40px] bg-slate-900 text-white flex flex-col justify-between relative shadow-2xl shadow-indigo-200 transform md:scale-105">
            <div className="absolute top-8 right-8 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Mais Vendido</div>
            <div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-8">Profissional</div>
              <div className="text-6xl font-black mb-10">R$ 29<span className="text-lg font-normal text-slate-500 ml-2">/mês</span></div>
              <ul className="space-y-6 mb-12">
                <PricingItem text="Clientes ilimitados" isWhite />
                <PricingItem text="Mensagens automáticas" isWhite />
                <PricingItem text="Texto jurídico premium" isWhite />
              </ul>
            </div>
            {/* LINK DO CHECKOUT KIWIFY VAI AQUI */}
            <Link href="https://pay.kiwify.com.br/SEU_LINK" className="w-full text-center py-5 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/40 uppercase text-xs tracking-widest">
              Assinar Plano Pro
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100 text-center text-slate-300 font-bold uppercase tracking-[0.3em] text-[10px]">
        © 2026 CobraZAP • Tecnologia Brasileira para Empreendedores
      </footer>
    </div>
  )
}

function PricingItem({ text, isWhite }: { text: string, isWhite?: boolean }) {
  return (
    <li className={`flex items-center gap-4 text-sm font-bold ${isWhite ? 'text-slate-300' : 'text-slate-600'}`}>
      <div className="bg-emerald-500 text-white p-0.5 rounded-full"><Check size={14} /></div>
      {text}
    </li>
  )
}