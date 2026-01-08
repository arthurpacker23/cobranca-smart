'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trash2, Send, UserPlus, Receipt, Users, Clock, 
  CheckCircle2, Circle, DollarSign, Settings, X, Save, 
  Wallet
} from 'lucide-react'

export default function Dashboard() {
  const params = useParams()
  const companyId = params.id // Pega o ID secreto da URL

  const [company, setCompany] = useState<any>(null)
  const [customers, setCustomers] = useState<any[]>([])
  const [billings, setBillings] = useState<any[]>([])
  const [showSettings, setShowSettings] = useState(false)
  
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [amount, setAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [description, setDescription] = useState('')
  const [editName, setEditName] = useState('')
  const [editPix, setEditPix] = useState('')

  async function fetchData() {
    // BUSCA PELO ID (UUID) PARA GARANTIR PRIVACIDADE TOTAL
    const { data: comp } = await supabase.from('companies').select('*').eq('id', companyId).single()
    if (!comp) return
    setCompany(comp)
    setEditName(comp.name)
    setEditPix(comp.pix_key || '')

    const { data: cust } = await supabase.from('customers').select('*').eq('company_id', comp.id).order('name')
    if (cust) setCustomers(cust)

    const { data: bill } = await supabase.from('billings').select('*, customers(name, phone)').eq('company_id', comp.id).order('due_date', { ascending: true })
    if (bill) setBillings(bill)
  }

  useEffect(() => { if (companyId) fetchData() }, [companyId])

  const totalPendente = billings.filter(b => b.status !== 'paid').reduce((acc, b) => acc + Number(b.amount), 0)
  const totalRecebido = billings.filter(b => b.status === 'paid').reduce((acc, b) => acc + Number(b.amount), 0)

  async function updateCompany() {
    await supabase.from('companies').update({ name: editName, pix_key: editPix }).eq('id', company.id)
    setShowSettings(false); fetchData()
  }

  async function handleAddCustomer() {
    if (!name || !phone) return
    await supabase.from('customers').insert([{ name, phone, company_id: company.id }])
    setName(''); setPhone(''); fetchData()
  }

  async function handleAddBilling() {
    if (!selectedCustomerId || !amount || !dueDate) return
    await supabase.from('billings').insert([{ customer_id: selectedCustomerId, company_id: company.id, amount: parseFloat(amount), due_date: dueDate, description: description }])
    setAmount(''); setDueDate(''); setDescription(''); fetchData()
  }

  async function togglePaid(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'paid' ? 'pending' : 'paid'
    await supabase.from('billings').update({ status: newStatus }).eq('id', id)
    fetchData()
  }

  function sendWhatsApp(bill: any) {
    const msg = `Olá, ${bill.customers.name}! 👋\n\nLembrete de pagamento de *R$ ${bill.amount}* (${bill.description || 'Serviços'}) vencendo em ${new Date(bill.due_date).toLocaleDateString('pt-BR')}.\n\n🔑 PIX: *${company.pix_key || 'Solicitar'}*\n\nAtenciosamente, ${company.name}`
    window.open(`https://api.whatsapp.com/send?phone=${bill.customers.phone}&text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (!company) return <div className="h-screen flex items-center justify-center bg-white text-slate-400 font-bold uppercase tracking-widest animate-pulse">Protegendo sua conexão...</div>

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans flex flex-col md:flex-row overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-[380px] bg-white border-r border-slate-200 p-8 flex flex-col gap-8 md:h-screen md:sticky md:top-0">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-100 italic font-black text-sm">CZ</div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-800 uppercase leading-none">{company.name}</h1>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">CobraZAP</p>
          </div>
        </div>

        <section className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 shadow-sm text-black font-bold">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-6 flex items-center gap-2">
            <UserPlus size={16} /> Novo Cliente
          </h2>
          <div className="space-y-3">
            <input className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 text-black font-medium" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 text-black font-medium" placeholder="WhatsApp (55...)" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button onClick={handleAddCustomer} className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 shadow-xl transition-all uppercase text-[10px] tracking-widest mt-2">Cadastrar</button>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200/50">
            <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                {customers.map(c => (
                    <div key={c.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                        <span className="text-[11px] font-bold text-slate-600 truncate max-w-[150px]">{c.name}</span>
                        <button onClick={() => { if(confirm('Excluir cliente?')) supabase.from('customers').delete().eq('id', c.id).then(() => fetchData()) }} className="text-slate-200 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                    </div>
                ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 shadow-sm text-black font-bold">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-6 flex items-center gap-2">
            <Wallet size={16} /> Nova Fatura
          </h2>
          <div className="space-y-3">
            <select className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-sm outline-none text-slate-600 font-bold bg-white" value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
              <option value="">Selecione o devedor</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-sm outline-none text-black font-medium" placeholder="O que é?" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="relative">
              <span className="absolute left-4 top-4 text-slate-300 font-black">R$</span>
              <input className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl text-sm outline-none font-black text-slate-800" type="number" placeholder="0,00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <input className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-xs outline-none text-slate-400 font-bold uppercase" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <button onClick={handleAddBilling} className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-700 shadow-xl transition-all uppercase text-[10px] tracking-widest mt-2">Gerar</button>
          </div>
        </section>

        <button onClick={() => setShowSettings(true)} className="mt-auto flex items-center justify-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-bold text-[10px] uppercase tracking-widest py-4 border-t border-slate-100">
          <Settings size={16} /> Configurações do Perfil
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 text-black font-bold">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-amber-50 group-hover:text-amber-100 transition-colors"><Clock size={100}/></div>
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] mb-4">Em Aberto</p>
            <h3 className="text-5xl font-black text-slate-800 tracking-tighter">R$ {totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          </div>

          <div className="bg-indigo-600 p-10 rounded-[40px] shadow-2xl shadow-indigo-100 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-indigo-500/50 group-hover:text-white/20 transition-colors"><CheckCircle2 size={100}/></div>
            <p className="text-indigo-200 text-[11px] font-black uppercase tracking-[0.2em] mb-4">Total Recebido</p>
            <h3 className="text-5xl font-black text-white tracking-tighter">R$ {totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          </div>
        </div>

        <div className="bg-white rounded-[48px] shadow-sm border border-slate-100 overflow-hidden text-black font-bold">
          <div className="p-10 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-700 uppercase tracking-widest flex items-center gap-3">
              <Clock className="text-orange-500" size={20} /> Histórico de Cobranças
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-bold text-black">
              <tbody className="divide-y divide-slate-50">
                {billings.map(b => (
                  <tr key={b.id} className={`hover:bg-slate-50 transition-all ${b.status === 'paid' ? 'opacity-40 grayscale' : ''}`}>
                    <td className="px-10 py-10 w-20">
                      <button onClick={() => togglePaid(b.id, b.status)} className="transition-transform active:scale-75 text-black">
                        {b.status === 'paid' ? <CheckCircle2 className="text-emerald-500" size={32} /> : <Circle className="text-slate-200 hover:text-indigo-400 transition-colors" size={32} />}
                      </button>
                    </td>
                    <td className="px-6 py-10 text-black">
                      <p className={`font-black text-slate-700 text-lg ${b.status === 'paid' ? 'line-through text-slate-300' : ''}`}>{b.customers?.name}</p>
                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1 italic leading-none">{b.description || 'Serviço'}</p>
                    </td>
                    <td className="px-6 py-10 text-right text-black font-bold">
                       <span className="text-[10px] font-black text-slate-300 uppercase block mb-1">Vencimento</span>
                       <span className="text-sm text-slate-500 font-bold">{new Date(b.due_date).toLocaleDateString('pt-BR')}</span>
                    </td>
                    <td className="px-6 py-10 text-right text-black font-bold">
                      <p className={`font-black text-3xl tracking-tighter ${b.status === 'paid' ? 'text-slate-200' : 'text-slate-900'}`}>R$ {Number(b.amount).toFixed(2)}</p>
                    </td>
                    <td className="px-10 py-10">
                      <div className="flex justify-end gap-3 text-black">
                        <button onClick={() => sendWhatsApp(b)} className="bg-indigo-600 text-white p-4 rounded-2xl hover:scale-110 shadow-lg active:scale-95 transition-all"><Send size={20} /></button>
                        <button onClick={() => { if(confirm('Excluir fatura?')) supabase.from('billings').delete().eq('id', b.id).then(() => fetchData()) }} className="text-slate-200 hover:text-rose-500 p-2"><Trash2 size={22}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL CONFIGURAÇÕES */}
      <AnimatePresence>
        {showSettings && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 text-black font-bold">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[50px] p-12 max-w-md w-full shadow-2xl relative text-black">
              <button onClick={() => setShowSettings(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
              <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Perfil da Empresa</h2>
              <div className="space-y-6">
                <input className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 text-black font-bold shadow-inner" placeholder="Nome da Empresa" value={editName} onChange={(e) => setEditName(e.target.value)} />
                <input className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 text-black font-bold shadow-inner" placeholder="Chave PIX" value={editPix} onChange={(e) => setEditPix(e.target.value)} />
                <button onClick={updateCompany} className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-indigo-600 transition-all uppercase text-[10px] tracking-widest mt-4">Salvar Alterações</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}