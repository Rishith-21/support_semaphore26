import React, { useMemo, useState } from 'react';
import {
  IconHelpCircle,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconShield,
  IconCheck
} from './Icons';
import { ruleCategories } from '../data/rulesData';

export function FaqSection({ faqData, categories, globalSearch }) {
  const [activeTab, setActiveTab] = useState('faq'); // 'faq' or 'rules'

  // FAQ states
  const [selectedCat, setSelectedCat] = useState('All FAQs');
  const [localSearch, setLocalSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Open first items by default
  const [openItems, setOpenItems] = useState({
    'cat-Registration & Entry': true,
    'faq-01': true,
    'rule-general': true
  });

  // Debounce search input to make filtering efficient
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(localSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch]);

  const effectiveSearch = globalSearch || debouncedSearch;
  const normalizedSearch = effectiveSearch.trim().toLowerCase();

  const toggleItem = (id) => {
    setOpenItems(prev => {
      const newState = { ...prev };

      // Determine the type of accordion being clicked (Category, Rule, or FAQ)
      const isCat = id.startsWith('cat-');
      const isRule = id.startsWith('rule-');

      // Close all other items of the SAME type
      Object.keys(newState).forEach(key => {
        const keyIsCat = key.startsWith('cat-');
        const keyIsRule = key.startsWith('rule-');

        // If they are the same type, close it (unless it's the one we are toggling)
        if (key !== id) {
          if (isCat && keyIsCat) newState[key] = false;
          else if (isRule && keyIsRule) newState[key] = false;
          else if (!isCat && !isRule && !keyIsCat && !keyIsRule) newState[key] = false;
        }
      });

      // Toggle the target item
      newState[id] = !newState[id];
      return newState;
    });
  };

  // Instant Suggestions (no debounce) for autocomplete
  const suggestions = useMemo(() => {
    const term = localSearch.trim().toLowerCase();
    if (!term || term.length < 2) return [];

    const matchedFaqs = faqData
      .filter(f => f.question.toLowerCase().includes(term))
      .slice(0, 4)
      .map(f => ({
        id: `s-faq-${f.id}`,
        type: 'FAQ',
        text: f.question,
        targetIds: [`cat-${f.category}`, f.id]
      }));

    const matchedRules = ruleCategories.flatMap(cat =>
      cat.rules.filter(r => r.toLowerCase().includes(term)).map(r => ({
        id: `s-rule-${cat.id}-${Math.random()}`,
        type: 'RULE',
        text: r,
        targetIds: [`rule-${cat.id}`]
      }))
    ).slice(0, 3);

    return [...matchedFaqs, ...matchedRules];
  }, [localSearch]);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = selectedCat === 'All FAQs' || item.category === selectedCat;
      if (!normalizedSearch) return matchesCategory;
      const searchable = `${item.question} ${item.answer} ${item.category}`.toLowerCase();
      return matchesCategory && searchable.includes(normalizedSearch);
    });
  }, [faqData, selectedCat, normalizedSearch]);

  // Filter Rules
  const filteredRules = useMemo(() => {
    if (!normalizedSearch) return ruleCategories;
    return ruleCategories.map(cat => ({
      ...cat,
      rules: cat.rules.filter(r =>
        r.toLowerCase().includes(normalizedSearch) ||
        cat.title.toLowerCase().includes(normalizedSearch)
      )
    })).filter(cat => cat.rules.length > 0);
  }, [normalizedSearch]);

  return (
    <section id="faq-page-wrapper">
      <style>{`
        #faq-page-wrapper {
          background-color: #F8FAFC;
          color: #1E293B;
          padding: 4rem 1rem;
          min-height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .faq-page-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .faq-page-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .faq-page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1E293B;
          margin-bottom: 1rem;
        }
        .faq-page-subtitle {
          color: #475569;
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .faq-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .faq-tab-btn {
          background: #FFFFFF;
          color: #1E293B;
          border: 2px solid transparent;
          padding: 0.875rem 2.5rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .faq-tab-btn.active {
          background: #4F46E5;
          color: #FFFFFF;
          box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
        }
        .faq-tab-btn:hover:not(.active) {
          border-color: #4F46E5;
          color: #4F46E5;
        }
        
        /* --- Animations & Premium Effects --- */
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .faq-answer, .rule-list {
          animation: fadeInDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top;
        }

        .faq-page-header {
          text-align: center;
          margin-bottom: 2.5rem;
          padding: 3.5rem 1rem 1rem 1rem;
        }

        .faq-page-title {
          font-size: 3.25rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: #1E293B;
          letter-spacing: -0.03em;
        }

        .faq-page-subtitle {
          color: #64748B;
          font-size: 1.15rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .faq-search-bar {
          position: relative;
          max-width: 650px;
          margin: 0 auto 3rem auto;
          z-index: 10;
        }
        .faq-search-bar input {
          width: 100%;
          padding: 1.25rem 1.5rem 1.25rem 3.5rem;
          border-radius: 9999px;
          border: 1px solid #E2E8F0;
          font-size: 1.1rem;
          background: #FFFFFF;
          color: #1E293B;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        .faq-search-bar input:focus {
          border-color: #4F46E5;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        .faq-search-icon {
          position: absolute;
          left: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94A3B8;
          transition: color 0.3s;
          z-index: 2;
        }
        .faq-search-bar input:focus + .faq-search-icon,
        .faq-search-bar input:not(:placeholder-shown) + .faq-search-icon {
          color: #4F46E5;
        }

        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 1rem;
          right: 1rem;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 1rem;
          margin-top: 0.75rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          z-index: 50;
          overflow: hidden;
          list-style: none;
          padding: 0;
        }
        .suggestion-item {
          padding: 1rem 1.25rem;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          border-bottom: 1px solid #F1F5F9;
          transition: background-color 0.2s;
          text-align: left;
          width: 100%;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          color: #1E293B;
          font-size: 1rem;
        }
        .suggestion-item:last-child {
          border-bottom: none;
        }
        .suggestion-item:hover, .suggestion-item:focus {
          background-color: #F8FAFC;
          outline: none;
        }

        .section-toggle-container {
          display: flex;
          justify-content: center;
          margin-bottom: 3.5rem;
          position: relative;
          z-index: 20;
        }

        .faq-category-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 3rem;
          justify-content: center;
        }
        .faq-cat-pill {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          padding: 0.6rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          color: #475569;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .faq-cat-pill.active {
          background: #4F46E5;
          color: #FFFFFF;
          border-color: #4F46E5;
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
          transform: translateY(-2px);
        }
        .faq-cat-pill:hover:not(.active) {
          border-color: #4F46E5;
          color: #4F46E5;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .faq-card, .rule-card {
          background: #FFFFFF;
          border-radius: 1rem;
          padding: 1.5rem 1.75rem;
          margin-bottom: 1.25rem;
          border: 2px solid #E2E8F0;
          border-left: 6px solid #4F46E5;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .faq-card:hover, .rule-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04);
          border-color: #818CF8;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: none;
          border: none;
          padding: 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: #1E293B;
          cursor: pointer;
          text-align: left;
          transition: color 0.2s ease;
        }
        .faq-question:hover {
          color: #4F46E5;
        }
        .faq-answer {
          margin-top: 1.25rem;
          color: #475569;
          line-height: 1.7;
          font-size: 1rem;
          padding-top: 1rem;
          border-top: 1px dashed #E2E8F0;
        }
        .faq-badge {
          display: inline-block;
          background: linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(217, 119, 6, 0.15));
          color: #D97706;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        
        .rule-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #1E293B;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          transition: color 0.2s;
        }
        .rule-card:hover .rule-title {
          color: #4F46E5;
        }
        .rule-list {
          list-style: none;
          padding: 0;
          margin: 0;
          padding-top: 1.25rem;
          border-top: 1px dashed #E2E8F0;
        }
        .rule-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          margin-bottom: 1.15rem;
          color: #475569;
          line-height: 1.7;
          font-size: 1rem;
        }
        .rule-item:last-child {
          margin-bottom: 0;
        }
        .rule-icon {
          color: #D97706;
          flex-shrink: 0;
          margin-top: 0.3rem;
        }
        
        .empty-state {
          text-align: center;
          padding: 5rem 2rem;
          background: linear-gradient(to bottom, #FFFFFF, #F8FAFC);
          border-radius: 1.5rem;
          color: #64748B;
          border: 1px dashed #CBD5E1;
        }

        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 0.75rem;
          margin-top: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          z-index: 50;
          overflow: hidden;
          list-style: none;
          padding: 0;
        }
        .suggestion-item {
          padding: 1rem;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          border-bottom: 1px solid #F1F5F9;
          transition: background-color 0.2s;
          text-align: left;
          width: 100%;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          color: #1E293B;
          font-size: 0.95rem;
        }
        .suggestion-item:last-child {
          border-bottom: none;
        }
        .suggestion-item:hover, .suggestion-item:focus {
          background-color: #F8FAFC;
          outline: none;
        }
        .suggestion-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          background: #E0E7FF;
          color: #4F46E5;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        /* Sliding Toggle */
        .section-toggle-container {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 20;
        }
        .section-toggle {
          position: relative;
          display: flex;
          background: #FFFFFF;
          border: 2px solid #E2E8F0;
          border-radius: 9999px;
          padding: 0.375rem;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        }
        .toggle-slider {
          position: absolute;
          top: 0.375rem;
          bottom: 0.375rem;
          width: calc(50% - 0.375rem);
          background: #4F46E5;
          border-radius: 9999px;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
        }
        .toggle-slider.left {
          transform: translateX(0);
        }
        .toggle-slider.right {
          transform: translateX(100%);
        }
        .toggle-btn {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border: none;
          background: transparent;
          font-weight: 700;
          font-size: 1.1rem;
          color: #475569;
          cursor: pointer;
          transition: color 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .toggle-btn:hover:not(.active) {
          color: #1E293B;
        }
        .toggle-btn.active {
          color: #FFFFFF;
        }

        /* Mobile Optimization */
        @media (max-width: 768px) {
          #faq-page-wrapper {
            padding: 2rem 0.5rem;
          }
          .faq-page-title {
            font-size: 1.75rem;
          }
          .faq-page-subtitle {
            font-size: 1rem;
            padding: 0 0.5rem;
          }
          .faq-search-bar {
            margin-bottom: 1.5rem;
          }
          .faq-search-bar input {
            padding: 1rem 1rem 1rem 2.75rem;
            font-size: 16px;
          }
          .faq-category-pills {
            gap: 0.35rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 1.5rem;
          }
          .faq-cat-pill {
            font-size: 0.75rem;
            padding: 0.35rem 0.65rem;
            white-space: nowrap;
          }
          .faq-card {
            padding: 1rem;
          }
          .faq-question {
            font-size: 1rem;
            gap: 0.5rem;
          }
          .rule-card {
            padding: 1.25rem;
          }
          .rule-title {
            font-size: 1.125rem;
          }
          .rule-item {
            font-size: 0.95rem;
            gap: 0.5rem;
          }
          .empty-state {
            padding: 2.5rem 1rem;
          }
          .section-toggle-container {
            margin-bottom: 2rem;
            padding: 0 0.5rem;
          }
          .section-toggle {
            max-width: 100%;
            padding: 0.375rem;
            border-radius: 1rem;
          }
          .toggle-slider {
            border-radius: 0.75rem;
          }
          .toggle-btn {
            font-size: 1rem;
            padding: 0.875rem 0.5rem;
            gap: 0.5rem;
            border-radius: 0.75rem;
          }
        }
      `}</style>

      <div className="faq-page-container">

        <div className="faq-page-header">
          <h2 className="faq-page-title">Help Center & Guidelines</h2>
          <p className="faq-page-subtitle">
            Find answers to common questions and review the official rules of SEMAPHORE 2K26.
          </p>
        </div>

        <div className="faq-search-bar">
          <IconSearch className="faq-search-icon" size={24} />
          <input
            type="text"
            placeholder="Search FAQs and Rules..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((sug) => (
                <li key={sug.id}>
                  <button
                    type="button"
                    className="suggestion-item"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevents input onBlur from firing before this executes
                      setLocalSearch(sug.text);
                      setShowSuggestions(false);
                      // Switch tab based on suggestion type automatically
                      setActiveTab(sug.type === 'FAQ' ? 'faq' : 'rules');

                      // Auto-open the accordions for this suggestion exclusively!
                      if (sug.targetIds) {
                        setOpenItems(prev => {
                          const newState = { ...prev };
                          sug.targetIds.forEach(targetId => {
                            const isCat = targetId.startsWith('cat-');
                            const isRule = targetId.startsWith('rule-');

                            // Close all other items of the SAME type
                            Object.keys(newState).forEach(key => {
                              const keyIsCat = key.startsWith('cat-');
                              const keyIsRule = key.startsWith('rule-');

                              if (key !== targetId) {
                                if (isCat && keyIsCat) newState[key] = false;
                                else if (isRule && keyIsRule) newState[key] = false;
                                else if (!isCat && !isRule && !keyIsCat && !keyIsRule) newState[key] = false;
                              }
                            });

                            // Open the target
                            newState[targetId] = true;
                          });
                          return newState;
                        });
                      }
                    }}
                  >
                    <span className="suggestion-badge">{sug.type}</span>
                    <span style={{ lineHeight: 1.4 }}>{sug.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sliding Toggle Button */}
        <div className="section-toggle-container">
          <div className="section-toggle">
            <div className={`toggle-slider ${activeTab === 'faq' ? 'left' : 'right'}`} />
            <button
              className={`toggle-btn ${activeTab === 'faq' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('faq');
                setLocalSearch('');
                setDebouncedSearch('');
              }}
            >
              <IconHelpCircle size={18} />
              <span>FAQs</span>
            </button>
            <button
              className={`toggle-btn ${activeTab === 'rules' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('rules');
                setLocalSearch('');
                setDebouncedSearch('');
              }}
            >
              <IconShield size={18} />
              <span>Rules</span>
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        {activeTab === 'faq' && (
          <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              <IconHelpCircle size={24} style={{ marginRight: '0.5rem', color: '#4F46E5' }} />
              Frequently Asked Questions
            </h3>

            <div className="faq-category-pills">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`faq-cat-pill ${selectedCat === cat ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCat(cat);
                    setLocalSearch(''); // Clear search to show full category content
                    setDebouncedSearch('');

                    // Auto-open the accordion for the selected category
                    setOpenItems(prev => {
                      const newState = { ...prev };

                      // Close all other category accordions
                      Object.keys(newState).forEach(key => {
                        if (key.startsWith('cat-')) {
                          newState[key] = false;
                        }
                      });

                      // Open the target category (or default to the first one if "All FAQs")
                      if (cat !== 'All FAQs') {
                        newState[`cat-${cat}`] = true;
                      } else {
                        newState['cat-Registration & Entry'] = true;
                      }

                      return newState;
                    });
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="faq-list">
              {filteredFaqs.length === 0 ? (
                <div className="empty-state">
                  <IconHelpCircle size={40} style={{ marginBottom: '1rem', color: '#4F46E5', display: 'inline-block' }} />
                  <h3>No matching questions found</h3>
                  <p>Try adjusting your search or category filter.</p>
                </div>
              ) : (
                categories.map(cat => {
                  const faqsInCat = filteredFaqs.filter(f => f.category === cat);
                  if (faqsInCat.length === 0) return null;

                  // If there is an active search, automatically expand the matching categories so the user can see results!
                  const isCatOpen = openItems[`cat-${cat}`] || !!normalizedSearch;

                  return (
                    <div key={cat} style={{ marginBottom: '2.5rem' }}>
                      <button
                        onClick={() => toggleItem(`cat-${cat}`)}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '0.5rem 0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          textAlign: 'left',
                          marginBottom: '1rem',
                          borderBottom: '2px solid #E2E8F0'
                        }}
                      >
                        <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {cat}
                        </h4>
                        {isCatOpen ? <IconChevronUp size={24} style={{ color: '#475569' }} /> : <IconChevronDown size={24} style={{ color: '#475569' }} />}
                      </button>

                      {isCatOpen && (
                        <div>
                          {faqsInCat.map(faq => {
                            // Auto-expand questions if there is an active search too!
                            const isOpen = openItems[faq.id] || !!normalizedSearch;
                            return (
                              <div key={faq.id} className="faq-card">
                                <button className="faq-question" onClick={() => toggleItem(faq.id)}>
                                  <span>{faq.question}</span>
                                  {isOpen ? <IconChevronUp size={20} style={{ flexShrink: 0 }} /> : <IconChevronDown size={20} style={{ flexShrink: 0 }} />}
                                </button>
                                {isOpen && (
                                  <div className="faq-answer">
                                    {faq.answer}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Rules Section */}
        {activeTab === 'rules' && (
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              <IconShield size={24} style={{ marginRight: '0.5rem', color: '#4F46E5' }} />
              Fest Rules & Guidelines
            </h3>

            <div className="rules-list">
              {filteredRules.length === 0 ? (
                <div className="empty-state">
                  <IconShield size={40} style={{ marginBottom: '1rem', color: '#D97706', display: 'inline-block' }} />
                  <h3>No matching rules found</h3>
                  <p>Try adjusting your search terms.</p>
                </div>
              ) : (
                filteredRules.map(category => {
                  // Auto-expand rule categories if there is an active search!
                  const isOpen = openItems[`rule-${category.id}`] || !!normalizedSearch;
                  return (
                    <div key={category.id} className="rule-card">
                      <button
                        className="rule-title"
                        onClick={() => toggleItem(`rule-${category.id}`)}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          textAlign: 'left',
                          margin: 0
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <IconShield size={24} style={{ color: '#4F46E5', flexShrink: 0 }} />
                          <span>{category.title}</span>
                        </div>
                        {isOpen ? <IconChevronUp size={20} style={{ flexShrink: 0, color: '#475569' }} /> : <IconChevronDown size={20} style={{ flexShrink: 0, color: '#475569' }} />}
                      </button>

                      {isOpen && (
                        <ul className="rule-list" style={{ marginTop: '1.25rem' }}>
                          {category.rules.map((rule, idx) => (
                            <li key={idx} className="rule-item">
                              <IconCheck size={20} className="rule-icon" />
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}