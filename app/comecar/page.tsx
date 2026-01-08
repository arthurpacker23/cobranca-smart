'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Receipt, ArrowRight, Rocket } from 'lucide-react'

export default function SetupPage() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCreate() {
    if (!name) return alert('Digite o nome da sua empresa!')
    setLoading(true)
    
    // Gera um nome de link amigável (slug)
    const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
    
    const { data, error } = await supabase
      .from('companies')
      .insert([{ name, slug }])
      .select()

    if (error) {
      alert('Erro ao criar painel. Tente outro nome.')
      setLoading(false)
    } else {
      // Redireciona para o link que acabamos de criar usando o ID secreto (UUID)
      window.location.href = `/v/${data[0].id}`
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 text-black">
      <div className="bg-white p-12 rounded-[50px] shadow-2xl max-w-md w-full text-center">
        <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-indigo-100">
          <Rocket size={32} />
        </div>
        <h1 className="text-3xl font-black mb-4 tracking-tighter uppercase italic">Quase lá!</h1>
        <p className="text-slate-400 text-sm font-bold mb-8 leading-relaxed">DIGITE O NOME DA SUA EMPRESA PARA GERAR SEU PAINEL EXCLUSIVO.</p>
        
        <input 
          className="w-full bg-slate-50 p-5 rounded-3xl text-center text-xl font-black outline-none focus:ring-2 focus:ring-indigo-600 mb-6 border-none shadow-inner"
          placeholder="Ex: Marcio Info"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <button 
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl uppercase text-xs tracking-[0.2em]"
        >
          {loading ? 'GERANDO...' : 'CRIAR MEU PAINEL'} <ArrowRight size={18} />
        </button>
        <p className="mt-8 text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed">
          Salve o link que será gerado nos seus favoritos. <br/> Ele é a sua chave de acesso.
        </p>
      </div>
    </div>
  )
}