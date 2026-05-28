import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Building2, User, Phone, Mail, MapPin } from "lucide-react";
import { BUSINESS_TYPES, BUSINESS_STATES, PROVINCES } from "../data";
import { BusinessData } from "../types";

interface CaptureInfoProps {
  onComplete: (data: BusinessData) => void;
}

export function CaptureInfo({ onComplete }: CaptureInfoProps) {
  const [formData, setFormData] = useState<BusinessData>({
    contactName: "",
    companyName: "",
    role: "",
    whatsapp: "",
    email: "",
    province: "",
    district: "",
    businessType: "",
    businessState: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto py-8 px-6"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Conozcamos tu operación</h2>
        <p className="text-slate-500 mt-2">Completa estos datos para personalizar tu diagnóstico.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" /> Nombre del contacto
              </label>
              <input required type="text" name="contactName" value={formData.contactName} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" placeholder="Ej. Juan Pérez" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" /> Cargo o rol
              </label>
              <input required type="text" name="role" value={formData.role} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" placeholder="Ej. Gerente, Dueño" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" /> WhatsApp
              </label>
              <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" placeholder="Ej. 6XXX-XXXX" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" /> Correo electrónico
              </label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" placeholder="correo@empresa.com" />
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" /> Nombre de la empresa o local
            </label>
            <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" placeholder="La empresa" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Provincia</label>
              <select required name="province" value={formData.province} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none">
                <option value="" disabled>Seleccione...</option>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Distrito / Zona</label>
              <input required type="text" name="district" value={formData.district} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" placeholder="Ej. Ciudad de Panamá" />
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-sm font-medium text-slate-700">Tipo de Negocio</label>
            <select required name="businessType" value={formData.businessType} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none">
              <option value="" disabled>Selecciona el tipo de negocio principal</option>
              {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Estado actual del negocio</label>
            <select required name="businessState" value={formData.businessState} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none">
              <option value="" disabled>Selecciona en qué etapa se encuentra</option>
              {BUSINESS_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" 
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-100 active:scale-[0.98]">
            Comenzar diagnóstico <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
