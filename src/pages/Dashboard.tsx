import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft, Code2, Bot, Save, AlertCircle, Trash2, Edit, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { ScraperData, WaBotData } from '../types';
import { useScrapers } from '../hooks/useScrapers';
import { useWaBots } from '../hooks/useWaBots';

type FormType = 'scraper' | 'wabot';
type Mode = 'add' | 'edit';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { scrapers, addScraper, removeScraper, editScraper } = useScrapers();
  const { waBots, addWaBot, removeWaBot, editWaBot } = useWaBots();
  const [activeForm, setActiveForm] = useState<FormType>('scraper');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<Mode>('add');
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | undefined>(undefined);
  
  const [scraperFormData, setScraperFormData] = useState<ScraperData>({
    title: '',
    description: '',
    creator: '',
    code: '',
    creatorUrl: '',
  });

  const [waBotFormData, setWaBotFormData] = useState<WaBotData>({
    name: '',
    description: '',
    creator: '',
    imageUrl: '',
    buttonType: 'download',
    buttonUrl: '',
  });

  const resetScraperForm = () => {
    setScraperFormData({
      title: '',
      description: '',
      creator: '',
      code: '',
      creatorUrl: '',
    });
    setMode('add');
    setSelectedItemId(undefined);
  };

  const resetWaBotForm = () => {
    setWaBotFormData({
      name: '',
      description: '',
      creator: '',
      imageUrl: '',
      buttonType: 'download',
      buttonUrl: '',
    });
    setMode('add');
    setSelectedItemId(undefined);
  };

  const handleScraperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let success = false;
      
      if (mode === 'add') {
        success = await addScraper(scraperFormData);
        if (success) {
          toast.success('Scraper added successfully!');
          resetScraperForm();
        } else {
          toast.error('Failed to add scraper');
        }
      } else {
        // Edit mode
        if (selectedItemId) {
          const updatedScraper = { ...scraperFormData, id: selectedItemId };
          console.log('Updating scraper with data:', updatedScraper);
          success = await editScraper(updatedScraper);
          if (success) {
            toast.success('Scraper updated successfully!');
            resetScraperForm();
          } else {
            toast.error('Failed to update scraper');
          }
        }
      }
    } catch (error) {
      console.error('Error in handleScraperSubmit:', error);
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWaBotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let success = false;
      
      if (mode === 'add') {
        success = await addWaBot(waBotFormData);
        if (success) {
          toast.success('WhatsApp Bot added successfully!');
          resetWaBotForm();
        } else {
          toast.error('Failed to add WhatsApp Bot');
        }
      } else {
        // Edit mode
        if (selectedItemId) {
          const updatedBot = { ...waBotFormData, id: selectedItemId };
          console.log('Updating WA bot with data:', updatedBot);
          success = await editWaBot(updatedBot);
          if (success) {
            toast.success('WhatsApp Bot updated successfully!');
            resetWaBotForm();
          } else {
            toast.error('Failed to update WhatsApp Bot');
          }
        }
      }
    } catch (error) {
      console.error('Error in handleWaBotSubmit:', error);
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditScraper = (scraper: ScraperData) => {
    setScraperFormData({
      title: scraper.title,
      description: scraper.description,
      creator: scraper.creator,
      code: scraper.code,
      creatorUrl: scraper.creatorUrl,
    });
    setSelectedItemId(scraper.id);
    setMode('edit');
    setActiveForm('scraper');
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditWaBot = (bot: WaBotData) => {
    setWaBotFormData({
      name: bot.name,
      description: bot.description,
      creator: bot.creator,
      imageUrl: bot.imageUrl,
      buttonType: bot.buttonType,
      buttonUrl: bot.buttonUrl,
    });
    setSelectedItemId(bot.id);
    setMode('edit');
    setActiveForm('wabot');
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteConfirm = (id: string, type: FormType) => {
    setItemToDelete(id);
    setActiveForm(type);
    setShowConfirmDelete(true);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      let success = false;
      
      if (activeForm === 'scraper') {
        success = await removeScraper(itemToDelete);
        if (success) {
          toast.success('Scraper deleted successfully!');
          // If we're editing this item, reset the form
          if (selectedItemId === itemToDelete) {
            resetScraperForm();
          }
        } else {
          toast.error('Failed to delete scraper');
        }
      } else {
        success = await removeWaBot(itemToDelete);
        if (success) {
          toast.success('WhatsApp Bot deleted successfully!');
          // If we're editing this item, reset the form
          if (selectedItemId === itemToDelete) {
            resetWaBotForm();
          }
        } else {
          toast.error('Failed to delete WhatsApp Bot');
        }
      }
    } catch (error) {
      console.error('Error in executeDelete:', error);
      toast.error('An error occurred');
    } finally {
      setShowConfirmDelete(false);
      setItemToDelete(undefined);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2F3136] to-[#36393F]">
      {/* Navbar */}
      <nav className="bg-[#2F3136] border-b border-gray-700 p-4 sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
              <button
                onClick={() => navigate('/')}
                className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="https://pomf2.lain.la/f/b4k5if9w.png"
                  alt="SCode Logo"
                  className="w-8 h-8"
                />
                <Code2 className="text-[#5865F2]" size={24} />
              </div>
              <button
                onClick={handleLogout}
                className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors sm:hidden"
              >
                <LogOut size={20} />
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="hidden sm:flex text-white items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Form Type Selector */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => {
                setActiveForm('scraper');
                if (mode === 'edit') resetScraperForm();
              }}
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeForm === 'scraper'
                  ? 'bg-[#5865F2] text-white shadow-lg'
                  : 'bg-[#40444B] text-gray-300 hover:text-white hover:bg-[#36393F]'
              }`}
            >
              <Code2 size={20} />
              <span className="hidden sm:inline">
                {mode === 'edit' && activeForm === 'scraper' ? 'Edit Scraper' : 'Add Scraper'}
              </span>
              <span className="sm:hidden">Scraper</span>
            </button>
            <button
              onClick={() => {
                setActiveForm('wabot');
                if (mode === 'edit') resetWaBotForm();
              }}
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeForm === 'wabot'
                  ? 'bg-[#5865F2] text-white shadow-lg'
                  : 'bg-[#40444B] text-gray-300 hover:text-white hover:bg-[#36393F]'
              }`}
            >
              <Bot size={20} />
              <span className="hidden sm:inline">
                {mode === 'edit' && activeForm === 'wabot' ? 'Edit WA Bot' : 'Add WA Bot'}
              </span>
              <span className="sm:hidden">WA Bot</span>
            </button>
          </div>

          {/* Form Section */}
          <div className="bg-[#2F3136] p-6 sm:p-8 rounded-xl border border-gray-700 shadow-xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {activeForm === 'scraper' ? <Code2 size={24} /> : <Bot size={24} />}
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {mode === 'add' 
                    ? (activeForm === 'scraper' ? 'Add New Scraper' : 'Add New WhatsApp Bot')
                    : (activeForm === 'scraper' ? 'Edit Scraper' : 'Edit WhatsApp Bot')
                  }
                </h2>
              </div>
              {mode === 'edit' && (
                <button
                  onClick={() => {
                    if (activeForm === 'scraper') {
                      resetScraperForm();
                    } else {
                      resetWaBotForm();
                    }
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              )}
            </div>

            {activeForm === 'scraper' ? (
              <form onSubmit={handleScraperSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Title</label>
                    <input
                      type="text"
                      value={scraperFormData.title}
                      onChange={(e) => setScraperFormData({ ...scraperFormData, title: e.target.value })}
                      className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Creator Name</label>
                    <input
                      type="text"
                      value={scraperFormData.creator}
                      onChange={(e) => setScraperFormData({ ...scraperFormData, creator: e.target.value })}
                      className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Description</label>
                  <textarea
                    value={scraperFormData.description}
                    onChange={(e) => setScraperFormData({ ...scraperFormData, description: e.target.value })}
                    className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] h-32 border border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Code</label>
                  <textarea
                    value={scraperFormData.code}
                    onChange={(e) => setScraperFormData({ ...scraperFormData, code: e.target.value })}
                    className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] h-64 font-mono border border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Creator URL</label>
                  <input
                    type="url"
                    value={scraperFormData.creatorUrl}
                    onChange={(e) => setScraperFormData({ ...scraperFormData, creatorUrl: e.target.value })}
                    className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] disabled:bg-[#4752C4]/50 text-white py-4 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{mode === 'add' ? 'Adding Scraper...' : 'Updating Scraper...'}</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>{mode === 'add' ? 'Add Scraper' : 'Update Scraper'}</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleWaBotSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Bot Name</label>
                    <input
                      type="text"
                      value={waBotFormData.name}
                      onChange={(e) => setWaBotFormData({ ...waBotFormData, name: e.target.value })}
                      className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Creator Name</label>
                    <input
                      type="text"
                      value={waBotFormData.creator}
                      onChange={(e) => setWaBotFormData({ ...waBotFormData, creator: e.target.value })}
                      className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Description</label>
                  <textarea
                    value={waBotFormData.description}
                    onChange={(e) => setWaBotFormData({ ...waBotFormData, description: e.target.value })}
                    className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] h-32 border border-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Image URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      value={waBotFormData.imageUrl}
                      onChange={(e) => setWaBotFormData({ ...waBotFormData, imageUrl: e.target.value })}
                      className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <AlertCircle size={20} />
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">Use a direct image URL (e.g., https://example.com/image.jpg)</p>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Button Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer border border-gray-700 transition-all duration-300"
                      style={{
                        backgroundColor: waBotFormData.buttonType === 'download' ? '#5865F2' : '#40444B',
                      }}
                    >
                      <input
                        type="radio"
                        value="download"
                        checked={waBotFormData.buttonType === 'download'}
                        onChange={() => setWaBotFormData({ ...waBotFormData, buttonType: 'download' })}
                        className="sr-only"
                      />
                      <span className="text-white font-medium">Download</span>
                    </label>
                    <label className="flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer border border-gray-700 transition-all duration-300"
                      style={{
                        backgroundColor: waBotFormData.buttonType === 'buy' ? '#5865F2' : '#40444B',
                      }}
                    >
                      <input
                        type="radio"
                        value="buy"
                        checked={waBotFormData.buttonType === 'buy'}
                        onChange={() => setWaBotFormData({ ...waBotFormData, buttonType: 'buy' })}
                        className="sr-only"
                      />
                      <span className="text-white font-medium">Buy</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Button URL</label>
                  <input
                    type="url"
                    value={waBotFormData.buttonUrl}
                    onChange={(e) => setWaBotFormData({ ...waBotFormData, buttonUrl: e.target.value })}
                    className="w-full bg-[#40444B] text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] disabled:bg-[#4752C4]/50 text-white py-4 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{mode === 'add' ? 'Adding WhatsApp Bot...' : 'Updating WhatsApp Bot...'}</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>{mode === 'add' ? 'Add WhatsApp Bot' : 'Update WhatsApp Bot'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Items List Section */}
          <div className="bg-[#2F3136] p-6 sm:p-8 rounded-xl border border-gray-700 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              {activeForm === 'scraper' ? <Code2 size={24} /> : <Bot size={24} />}
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {activeForm === 'scraper' ? 'Manage Scrapers' : 'Manage WhatsApp Bots'}
              </h2>
            </div>

            <div className="space-y-4">
              {activeForm === 'scraper' ? (
                scrapers.length > 0 ? (
                  scrapers.map((scraper) => (
                    <div 
                      key={scraper.id || `scraper-${Math.random().toString(36).substr(2, 9)}`} 
                      className="bg-[#36393F] p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{scraper.title}</h3>
                          <p className="text-gray-400 text-sm">By {scraper.creator}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditScraper(scraper)}
                            className="p-2 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteConfirm(scraper.id!, 'scraper')}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 mt-2 line-clamp-2">{scraper.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>No scrapers found. Add your first scraper above.</p>
                  </div>
                )
              ) : (
                waBots.length > 0 ? (
                  waBots.map((bot) => (
                    <div 
                      key={bot.id || `bot-${Math.random().toString(36).substr(2, 9)}`} 
                      className="bg-[#36393F] p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={bot.imageUrl} 
                              alt={bot.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Error';
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{bot.name}</h3>
                            <p className="text-gray-400 text-sm">By {bot.creator}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditWaBot(bot)}
                            className="p-2 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteConfirm(bot.id!, 'wabot')}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 mt-2 line-clamp-2">{bot.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>No WhatsApp bots found. Add your first bot above.</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2F3136] p-6 rounded-xl border border-gray-700 shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this {activeForm === 'scraper' ? 'scraper' : 'WhatsApp bot'}? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 bg-[#40444B] text-white py-3 rounded-xl font-semibold hover:bg-[#36393F] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};