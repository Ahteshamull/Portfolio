"use client";
import React, { useState, useEffect } from 'react';
import { mockDb } from '@/services/mockDb';
import { Plus, Edit2, Trash2, X, Settings } from 'lucide-react';
import * as Icons from 'lucide-react';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    iconName: 'Code',
    price: ''
  });

  const loadServices = () => {
    setServices(mockDb.getServices());
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openAddModal = () => {
    setCurrentService(null);
    setFormData({
      title: '',
      description: '',
      iconName: 'Code',
      price: 'Starting at $300'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setCurrentService(service);
    setFormData({
      title: service.title,
      description: service.description,
      iconName: service.iconName,
      price: service.price
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      mockDb.deleteService(id);
      loadServices();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const serviceData = {
      title: formData.title,
      description: formData.description,
      iconName: formData.iconName,
      price: formData.price
    };

    if (currentService) {
      serviceData.id = currentService.id;
    }

    mockDb.saveService(serviceData);
    setIsModalOpen(false);
    loadServices();
  };

  const renderIcon = (iconName) => {
    const IconComp = Icons[iconName];
    if (IconComp) {
      return <IconComp className="h-4 w-4 text-purple-650" />;
    }
    return <Icons.HelpCircle className="h-4 w-4 text-purple-650" />;
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Services Manager</h1>
          <p className="text-xs text-slate-505 dark:text-slate-400 mt-1">Configure service cards dynamically displayed on your services and overview screens.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-650 hover:bg-purple-550 shadow-md shadow-purple-500/10 cursor-pointer transition-all"
        >
          <Plus size={16} />
          New Service
        </button>
      </div>

      {/* Services List Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-500 dark:text-slate-400">
            <thead className="text-[10px] uppercase font-bold text-slate-450 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80">
              <tr>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-255">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded bg-purple-500/10 dark:bg-purple-500/20 shrink-0">
                        {renderIcon(service.iconName)}
                      </div>
                      <span>{service.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-sm truncate text-slate-500 dark:text-slate-400">
                    {service.description}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-350">
                    {service.price}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="p-1.5 rounded-lg text-slate-450 hover:text-purple-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-1.5 rounded-lg text-slate-450 hover:text-red-650 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-955/40 dark:bg-slate-950/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-md p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl space-y-4 z-10 animate-slide-up">
            
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3">
              <h2 className="text-base font-black text-slate-800 dark:text-white">
                {currentService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              {/* Title */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 dark:text-slate-400">Service Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-650 transition-colors"
                  placeholder="e.g. Next.js App Development"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 dark:text-slate-400">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-850 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-650 transition-colors resize-none"
                  placeholder="Explain offering specifications..."
                />
              </div>

              {/* Icon Name and Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Icon Component</label>
                  <select
                    name="iconName"
                    value={formData.iconName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-805 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900"
                  >
                    <option value="Code">Code Symbol</option>
                    <option value="LayoutDashboard">Dashboard Grid</option>
                    <option value="Server">Backend Database</option>
                    <option value="Figma">Figma / Paint</option>
                    <option value="Settings">Gear settings</option>
                    <option value="Monitor">Monitor screen</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Pricing Estimation</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 text-slate-850 dark:text-slate-200 focus:outline-none focus:bg-white"
                    placeholder="e.g. Starting at $300"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-slate-200/50 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-705 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-white bg-purple-650 hover:bg-purple-550 shadow cursor-pointer font-bold"
                >
                  {currentService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageServices;
