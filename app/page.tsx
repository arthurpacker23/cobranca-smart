'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, ShieldCheck, LayoutDashboard, MessageSquare, ArrowRight, Star, MousePointer2 } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between font-bold">
          <div className="flex items-center gap-3 text-black">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg"><MessageSquare size={24} /></div>
            <span className="text-2xl font-black tracking-tighter">Cobra<span className="text-indigo-600">ZAP</span></span>
          </div>
          <Link href="/comecar" className="bg-indigo-600 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            Começar Agora
          </Link>
        </div>
      </nav>

      <header className="relative pt-20 pb-32 px-6 overflow-hidden text-center">
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] mb-10 text-slate-900 uppercase italic">
            Cobre no automático. <br /> <span className="text-indigo-600 underline">Receba no dia.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Reduza a inadimplência com lembretes inteligentes via WhatsApp que seus clientes realmente leem.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 font-bold">
            <Link href="/comecar" className="w-full md:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl flex items-center justify-center gap-3 group uppercase">
              Criar meu Painel <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      <section className="py-24 bg-slate-50 border-y border-slate-100 px-6">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter italic">Planos Simples</h2>
            <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl max-w-sm mx-auto text-black font-bold">
                <div className="text-xs font-black uppercase text-indigo-400 mb-4 tracking-widest">Plano Profissional</div>
                <div className="text-6xl font-black mb-8">R$ 29<span className="text-lg font-normal text-slate-300 ml-2">/mês</span></div>
                <ul className="text-left space-y-4 mb-10 text-slate-600">
                    <li className="flex items-center gap-2"><Check className="text-emerald-500"/> Clientes Ilimitados</li>
                    <li className="flex items-center gap-2"><Check className="text-emerald-500"/> Link exclusivo</li>
                    <li className="flex items-center gap-2"><Check className="text-emerald-500"/> Suporte VIP</li>
                </ul>
                <Link href="/comecar" className="block w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Assinar Agora</Link>
            </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest">
        © 2026 CobraZAP - Tecnologia para Empreendedores
      </footer>
    </div>
  )
}