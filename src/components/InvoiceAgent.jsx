import React, { useState } from 'react';
import { Plus, Trash2, Send, Download, ArrowLeft, FileText, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const generateInvoiceNumber = () => `INV-${Date.now().toString().slice(-6)}`;

const EMPTY_ITEM = { description: '', qty: 1, price: '' };

const formatCurrency = (n) => `$${Number(n || 0).toFixed(2)}`;

const InvoiceAgent = () => {
  const navigate = useNavigate();
  const [invoiceNo] = useState(generateInvoiceNumber);
  const [step, setStep] = useState('form'); // form | preview

  const [from, setFrom] = useState({ name: '', email: '', phone: '', address: '' });
  const [to, setTo] = useState({ name: '', email: '', phone: '', whatsapp: '' });
  const [meta, setMeta] = useState({
    date: new Date().toISOString().split('T')[0],
    due: '',
    notes: '',
  });
  const [items, setItems] = useState([{ ...EMPTY_ITEM }]);
  const [tax, setTax] = useState(0);
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const setFrom_ = (k, v) => setFrom((f) => ({ ...f, [k]: v }));
  const setTo_ = (k, v) => setTo((f) => ({ ...f, [k]: v }));
  const setMeta_ = (k, v) => setMeta((f) => ({ ...f, [k]: v }));

  const addItem = () => setItems((i) => [...i, { ...EMPTY_ITEM }]);
  const removeItem = (idx) => setItems((i) => i.filter((_, n) => n !== idx));
  const setItem = (idx, k, v) =>
    setItems((i) => i.map((it, n) => (n === idx ? { ...it, [k]: v } : it)));

  const subtotal = items.reduce((s, it) => s + (it.qty || 0) * (parseFloat(it.price) || 0), 0);
  const taxAmount = (subtotal * (parseFloat(tax) || 0)) / 100;
  const total = subtotal + taxAmount;

  const buildWhatsAppText = () => {
    const lineItems = items
      .filter((it) => it.description)
      .map((it) => `  • ${it.description} (x${it.qty}) — ${formatCurrency(it.qty * parseFloat(it.price || 0))}`)
      .join('\n');

    return encodeURIComponent(
      `🧾 *INVOICE ${invoiceNo}*\n\n` +
      `*From:* ${from.name || 'N/A'}\n` +
      `*To:* ${to.name || 'N/A'}\n` +
      `*Date:* ${meta.date}${meta.due ? `\n*Due:* ${meta.due}` : ''}\n\n` +
      `*ITEMS:*\n${lineItems}\n\n` +
      `Subtotal: ${formatCurrency(subtotal)}\n` +
      (tax ? `Tax (${tax}%): ${formatCurrency(taxAmount)}\n` : '') +
      `*TOTAL: ${formatCurrency(total)}` +
      (meta.notes ? `\n\n_${meta.notes}_` : '') +
      `\n\nThank you! 🙏`
    );
  };

  const sendWhatsApp = () => {
    const num = (whatsappNumber || to.whatsapp || '').replace(/\D/g, '');
    const url = num
      ? `https://wa.me/${num}?text=${buildWhatsAppText()}`
      : `https://wa.me/?text=${buildWhatsAppText()}`;
    window.open(url, '_blank');
  };

  const inputCls = 'w-full border border-border-default rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pink bg-bg-tertiary text-text-primary placeholder:text-text-muted';
  const labelCls = 'block text-xs font-medium text-text-muted mb-1';

  const SectionTitle = ({ children }) => (
    <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">{children}</h3>
  );

  return (
    <>
      <div className="min-h-screen bg-bg-tertiary">
        {/* Header */}
        <div className="bg-bg-elevated border-b border-border-default px-4 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-accent-pink text-sm font-medium hover:opacity-80 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Home
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-accent-pink p-1.5 rounded-lg">
                <FileText className="w-4 h-4 text-text-primary" />
              </div>
              <span className="font-bold text-text-primary">Invoice Agent</span>
            </div>
            <div className="flex items-center gap-2">
              {step === 'form' ? (
                <button
                  onClick={() => setStep('preview')}
                  className="bg-accent-pink text-text-primary px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                >
                  Preview
                </button>
              ) : (
                <button
                  onClick={() => setStep('form')}
                  className="border border-border-default text-text-secondary px-4 py-2 rounded-xl text-sm font-medium hover:bg-bg-tertiary transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {step === 'form' ? (
            <div className="space-y-5">
              {/* Invoice number + dates */}
              <div className="bg-bg-elevated rounded-card p-5 border border-border-default">
                <SectionTitle>Invoice Details</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelCls}>Invoice #</label>
                    <input value={invoiceNo} readOnly className={`${inputCls} bg-bg-tertiary text-text-muted`} />
                  </div>
                  <div>
                    <label className={labelCls}>Date</label>
                    <input type="date" value={meta.date} onChange={(e) => setMeta_('date', e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Due Date</label>
                    <input type="date" value={meta.due} onChange={(e) => setMeta_('due', e.target.value)} className={inputCls} />
                  </div>
                </div>
              </div>

              {/* From / To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-bg-elevated rounded-card p-5 border border-border-default">
                  <SectionTitle>From (You)</SectionTitle>
                  <div className="space-y-3">
                    <div>
                      <label className={labelCls}>Your Name / Business</label>
                      <input value={from.name} onChange={(e) => setFrom_('name', e.target.value)} placeholder="Muhammad Salihu" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input value={from.email} onChange={(e) => setFrom_('email', e.target.value)} placeholder="you@musaj.space" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input value={from.phone} onChange={(e) => setFrom_('phone', e.target.value)} placeholder="+1 234 567 890" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Address (optional)</label>
                      <input value={from.address} onChange={(e) => setFrom_('address', e.target.value)} placeholder="City, Country" className={inputCls} />
                    </div>
                  </div>
                </div>

                <div className="bg-bg-elevated rounded-card p-5 border border-border-default">
                  <SectionTitle>Bill To (Client)</SectionTitle>
                  <div className="space-y-3">
                    <div>
                      <label className={labelCls}>Client Name / Company</label>
                      <input value={to.name} onChange={(e) => setTo_('name', e.target.value)} placeholder="Client Name" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input value={to.email} onChange={(e) => setTo_('email', e.target.value)} placeholder="client@company.com" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input value={to.phone} onChange={(e) => setTo_('phone', e.target.value)} placeholder="+1 234 567 890" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>WhatsApp Number (for sending)</label>
                      <input
                        value={to.whatsapp}
                        onChange={(e) => setTo_('whatsapp', e.target.value)}
                        placeholder="+1 234 567 890"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Line items */}
              <div className="bg-bg-elevated rounded-card p-5 border border-border-default">
                <SectionTitle>Line Items</SectionTitle>
                <div className="space-y-2 mb-4">
                  {/* Header row (desktop) */}
                  <div className="hidden sm:grid sm:grid-cols-12 gap-2 text-xs font-medium text-text-muted px-1">
                    <span className="col-span-6">Description</span>
                    <span className="col-span-2 text-center">Qty</span>
                    <span className="col-span-3">Unit Price</span>
                    <span className="col-span-1" />
                  </div>

                  {items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        value={item.description}
                        onChange={(e) => setItem(idx, 'description', e.target.value)}
                        placeholder="Service / item description"
                        className={`${inputCls} col-span-11 sm:col-span-6`}
                      />
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => setItem(idx, 'qty', parseInt(e.target.value) || 1)}
                        className={`${inputCls} col-span-5 sm:col-span-2 text-center`}
                      />
                      <div className="col-span-5 sm:col-span-3 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => setItem(idx, 'price', e.target.value)}
                          placeholder="0.00"
                          className={`${inputCls} pl-6`}
                        />
                      </div>
                      <button
                        onClick={() => removeItem(idx)}
                        disabled={items.length === 1}
                        className="col-span-2 sm:col-span-1 flex justify-center p-2 text-text-muted hover:text-accent-pink transition disabled:opacity-30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addItem}
                  className="flex items-center gap-2 text-accent-pink text-sm font-medium hover:opacity-80 transition"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>

                {/* Totals */}
                <div className="mt-6 pt-4 border-t border-border-default space-y-2 ml-auto max-w-xs">
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-text-secondary gap-4">
                    <div className="flex items-center gap-2">
                      <span>Tax</span>
                      <div className="relative w-20">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={tax}
                          onChange={(e) => setTax(e.target.value)}
                          className="w-full border border-border-default rounded-lg px-2 py-1 text-sm text-right pr-6 focus:outline-none focus:ring-1 focus:ring-accent-pink bg-bg-tertiary text-text-primary"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted text-xs">%</span>
                      </div>
                    </div>
                    <span>{formatCurrency(taxAmount)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-text-primary pt-2 border-t border-border-default">
                    <span>Total</span>
                    <span className="text-accent-pink">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-bg-elevated rounded-card p-5 border border-border-default">
                <SectionTitle>Notes (optional)</SectionTitle>
                <textarea
                  value={meta.notes}
                  onChange={(e) => setMeta_('notes', e.target.value)}
                  rows={3}
                  placeholder="Payment instructions, bank details, thank-you note..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pb-6">
                <button
                  onClick={sendWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 bg-accent-lime/20 text-accent-lime py-3 rounded-xl font-medium hover:bg-accent-lime/30 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send via WhatsApp
                </button>
                <button
                  onClick={() => setStep('preview')}
                  className="flex-1 flex items-center justify-center gap-2 bg-accent-pink text-text-primary py-3 rounded-xl font-medium hover:opacity-90 transition"
                >
                  <FileText className="w-5 h-5" />
                  Preview Invoice
                </button>
              </div>
            </div>
          ) : (
            /* Preview */
            <div className="bg-bg-elevated rounded-card border border-border-default overflow-hidden">
              {/* Invoice header */}
              <div className="bg-bg-primary px-6 py-8 text-text-primary">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{from.name || 'Your Business'}</h1>
                    {from.email && <p className="text-text-muted text-sm">{from.email}</p>}
                    {from.phone && <p className="text-text-muted text-sm">{from.phone}</p>}
                    {from.address && <p className="text-text-muted text-sm">{from.address}</p>}
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-accent-pink font-bold text-lg">INVOICE</div>
                    <div className="text-text-secondary text-sm">{invoiceNo}</div>
                    <div className="text-text-muted text-xs mt-1">Date: {meta.date}</div>
                    {meta.due && <div className="text-text-muted text-xs">Due: {meta.due}</div>}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Bill to */}
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Bill To</p>
                  <p className="font-semibold text-text-primary">{to.name || 'Client Name'}</p>
                  {to.email && <p className="text-text-muted text-sm">{to.email}</p>}
                  {to.phone && <p className="text-text-muted text-sm">{to.phone}</p>}
                </div>

                {/* Items table */}
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-default text-text-muted text-xs uppercase tracking-wide">
                      <th className="text-left py-2 font-medium">Description</th>
                      <th className="text-center py-2 font-medium w-16">Qty</th>
                      <th className="text-right py-2 font-medium w-24">Price</th>
                      <th className="text-right py-2 font-medium w-24">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-default">
                    {items.filter((it) => it.description).map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 text-text-primary">{item.description}</td>
                        <td className="py-3 text-center text-text-muted">{item.qty}</td>
                        <td className="py-3 text-right text-text-muted">{formatCurrency(item.price)}</td>
                        <td className="py-3 text-right font-medium text-text-primary">
                          {formatCurrency((item.qty || 0) * parseFloat(item.price || 0))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="ml-auto max-w-xs space-y-2 pt-4 border-t border-border-default">
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
                  </div>
                  {tax > 0 && (
                    <div className="flex justify-between text-sm text-text-secondary">
                      <span>Tax ({tax}%)</span><span>{formatCurrency(taxAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border-default">
                    <span>Total</span><span className="text-accent-pink">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Notes */}
                {meta.notes && (
                  <div className="bg-bg-tertiary rounded-xl p-4">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">Notes</p>
                    <p className="text-text-secondary text-sm whitespace-pre-wrap">{meta.notes}</p>
                  </div>
                )}

                {/* WhatsApp send */}
                <div className="border-t border-border-default pt-6">
                  <p className="text-sm font-medium text-text-primary mb-3">Send this invoice</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                        <MessageCircle className="w-4 h-4" />
                      </span>
                      <input
                        type="tel"
                        value={whatsappNumber || to.whatsapp}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="Client WhatsApp number (e.g. +234...)"
                        className="w-full border border-border-default rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-lime bg-bg-tertiary text-text-primary placeholder:text-text-muted"
                      />
                    </div>
                    <button
                      onClick={sendWhatsApp}
                      className="flex items-center justify-center gap-2 bg-accent-lime/20 text-accent-lime px-6 py-2.5 rounded-xl font-medium hover:bg-accent-lime/30 transition"
                    >
                      <Send className="w-4 h-4" />
                      Send via WhatsApp
                    </button>
                  </div>
                  <p className="text-xs text-text-muted mt-2">
                    Leave blank to open WhatsApp and choose a contact manually.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvoiceAgent;
