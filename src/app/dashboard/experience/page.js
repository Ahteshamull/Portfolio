"use client";
import React, { useState, useEffect } from 'react';
import { 
  useGetExperiencesQuery, 
  useCreateExperienceMutation, 
  useUpdateExperienceMutation, 
  useDeleteExperienceMutation 
} from '@/store/apiSlice';
import { Plus, Edit2, Trash2, Calendar, Briefcase, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageExperiences = () => {
  const { data: experiencesData } = useGetExperiencesQuery();
  const [createExperience] = useCreateExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const experiences = experiencesData || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    period: '',
    description: ''
  });

  const openAddModal = () => {
    setCurrentExperience(null);
    setFormData({
      role: '',
      company: '',
      period: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setCurrentExperience(exp);
    setFormData({
      role: exp.role,
      company: exp.company,
      period: exp.period,
      description: exp.description
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this work experience?')) {
      try {
        await deleteExperience(id).unwrap();
        toast.success('Experience deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete experience.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const expData = {
      role: formData.role,
      company: formData.company,
      period: formData.period,
      description: formData.description
    };

    try {
      if (currentExperience) {
        await updateExperience({ id: currentExperience.id, ...expData }).unwrap();
        toast.success('Experience updated successfully!');
      } else {
        await createExperience(expData).unwrap();
        toast.success('Experience created successfully!');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to save experience: ' + (err?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Experience Manager</h1>
          <p className="text-xs text-slate-505 dark:text-slate-400 mt-1">Configure your professional roles and career timeline entries.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-650 hover:bg-purple-550 shadow-md shadow-purple-500/10 cursor-pointer transition-all"
        >
          <Plus size={14} />
          Add Experience
        </button>
      </div>

      {/* Experience Table */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Role & Company</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {experiences.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-slate-400">
                    No work experiences configured. Click Add Experience to get started.
                  </td>
                </tr>
              ) : (
                experiences.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 dark:text-white text-sm">{exp.role}</div>
                      <div className="text-slate-400 mt-0.5">{exp.company}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-purple-600 dark:text-purple-400">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={exp.description}>
                      {exp.description}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(exp)}
                          className="p-1.5 rounded-lg text-slate-505 hover:text-purple-600 hover:bg-purple-500/10 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="p-1.5 rounded-lg text-slate-550 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fade-in">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/40 dark:bg-slate-955/70 dark:bg-slate-950/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-md p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto z-10 animate-slide-up">
            
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3">
              <h2 className="text-base font-black text-slate-800 dark:text-white">
                {currentExperience ? 'Edit Experience Details' : 'Add Work Experience'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-650 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* Role */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 dark:text-slate-400">Job Role / Position</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-650 transition-colors"
                  placeholder="e.g. Lead Full-Stack Developer"
                />
              </div>

              {/* Company */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 dark:text-slate-400">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-955 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-650 transition-colors"
                  placeholder="e.g. Upwork Freelancer"
                />
              </div>

              {/* Period */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 dark:text-slate-400">Employment Period</label>
                <input
                  type="text"
                  name="period"
                  value={formData.period}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-955 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500"
                  placeholder="e.g. 2024 - Present"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 dark:text-slate-400">Job Description & Accomplishments</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-955 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-650 transition-colors resize-none"
                  placeholder="Summarize key accomplishments and technical responsibilities..."
                />
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
                  {currentExperience ? 'Save Changes' : 'Create Entry'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExperiences;
