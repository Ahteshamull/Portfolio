"use client";
import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Layers } from 'lucide-react';

import { useGetProjectsQuery } from '@/store/apiSlice';

const Projects = () => {
  const { data: projectsData } = useGetProjectsQuery();
  const projects = projectsData || [];
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const getFilteredProjects = () => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(search.toLowerCase()));
      
      if (!matchesSearch) return false;

      if (filter === 'all') return true;
      if (filter === 'personal') return project.type === 'personal';
      if (filter === 'client') return project.type === 'client';
      return project.category.toLowerCase() === filter.toLowerCase();
    });
  };

  const filterTabs = [
    { name: 'All Work', value: 'all' },
    { name: 'Fullstack', value: 'fullstack' },
    { name: 'Frontend', value: 'frontend' },
    { name: 'Backend', value: 'backend' },
    { name: 'Personal', value: 'personal' },
    { name: 'Client', value: 'client' },
  ];

  const filteredProjects = getFilteredProjects();

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-955 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            My Projects
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            A comprehensive catalog of applications, automation tools, and services I have built.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800/80 pb-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.value
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search tech, name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-purple-500 text-slate-800 dark:text-slate-250 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400">
              <Layers size={36} />
            </div>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Projects Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-455 max-w-sm">
              We couldn't find any projects matching the selected filters or search input. Try resetting filters.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Projects;
