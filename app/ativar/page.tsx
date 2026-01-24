'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Rocket, CheckCircle2, ArrowRight } from 'lucide-react'

export default function AtivarPainel() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)

  async function handleCreate() {
    if (!name) return alert('Digite o nome da sua empresa!')
    setLoading(true)
    
    // Gera um link amigável (slug)
    const generatedSlug = name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    
    const { error } = await supabase.from('companies').insert([
      { name: name, slug: generatedSlug }
    ])

    if (error) {
      alert('Este nome já está em uso ou houve um erro. Tente outro!')
    } else {
      setSlug(generatedSlug)
      setCreated(true)
    }
    setLoading(false)
  }

  if (created) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-sans">
        <div className="max-w-md w-full text-center bg-slate-800 p-10 rounded-[40px] shadow-2xl border border-indigo-500/30">
          <CheckCircle2 size={80} className="text-emerald-400 mx-auto mb-6" />
          <h1 className="text-3xl font-black mb-4 italic">PARABÉNS!</h1>
          <p className="text-slate-400 mb-8">Seu painel de cobrança foi criado com sucesso. **Salve o link abaixo nos seus favoritos.**</p>
          <div className="bg-slate-900 p-4 rounded-2xl mb-8 break-all border border-slate-700">
            <code className="text-indigo-400 font-bold">https://cobranca-smart-eg3p.vercel.app/v/{slug}</code>
          </div>
          <a href={`/v/${slug}`} className="block w-full bg-indigo-600 py-4 rounded-2xl font-black hover:bg-indigo-500 transition-all uppercase tracking-widest text-xs">
            Acessar Meu Painel Agora
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl text-center">
        <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-indigo-100">
          <Rocket size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2 italic">QUASE LÁ!</h1>
        <p className="text-slate-400 text-sm font-medium mb-10 uppercase tracking-widest">Digite o nome da sua empresa para gerar seu painel exclusivo.</p>
        
        <input 
          className="w-full bg-slate-50 border-none p-5 rounded-3xl mb-6 outline-none focus:ring-2 focus:ring-indigo-600 text-black font-bold text-center text-lg shadow-inner"
          placeholder="Ex: Marcio Info"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button 
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-5 rounded-[30px] font-black hover:bg-indigo-600 transition-all shadow-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em]"
        >
          {loading ? 'GERANDO...' : 'GERAR MEU ACESSO'} <ArrowRight size={18} />
        </button>
        
        <p className="mt-8 text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed">
          Ao clicar, você receberá um link único de acesso. <br />Não perca este link!
        </p>
      </div>
    </div>
  )
}