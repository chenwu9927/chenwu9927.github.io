// Algolia Search Implementation
(function() {
  'use strict';

  // Check if Algolia search is enabled
  if (!window.algoliaConfig) {
    return;
  }

  // Initialize Algolia client
  const client = algoliasearch(window.algoliaConfig.applicationID, window.algoliaConfig.apiKey);
  const index = client.initIndex(window.algoliaConfig.indexName);

  // Get DOM elements
  const searchInput = document.getElementById('algolia-search-input');
  const searchResult = document.getElementById('algolia-search-result');

  if (!searchInput || !searchResult) {
    return;
  }

  // Search function
  function performSearch(query) {
    if (!query.trim()) {
      searchResult.innerHTML = '';
      return;
    }

    // Show loading state
    searchResult.innerHTML = '<div class="search-loading">Searching...</div>';

    // Perform search
    index.search(query, {
      hitsPerPage: window.algoliaConfig.hits ? window.algoliaConfig.hits.per_page : 10
    }).then(function(response) {
      displayResults(response, query);
    }).catch(function(error) {
      console.error('Algolia search error:', error);
      searchResult.innerHTML = '<div class="search-error">Search error occurred. Please try again.</div>';
    });
  }

  // Display search results
  function displayResults(response, query) {
    const hits = response.hits;
    const nbHits = response.nbHits;
    const processingTimeMS = response.processingTimeMS;

    if (hits.length === 0) {
      const emptyMessage = window.algoliaConfig.labels && window.algoliaConfig.labels.hits_empty 
        ? window.algoliaConfig.labels.hits_empty.replace('${query}', query)
        : `No results found for "${query}"`;
      searchResult.innerHTML = `<div class="search-empty">${emptyMessage}</div>`;
      return;
    }

    // Build results HTML
    let resultsHTML = '';
    
    // Add stats
    if (window.algoliaConfig.labels && window.algoliaConfig.labels.hits_stats) {
      const statsMessage = window.algoliaConfig.labels.hits_stats
        .replace('${hits}', nbHits)
        .replace('${time}', processingTimeMS);
      resultsHTML += `<div class="search-stats">${statsMessage}</div>`;
    }

    resultsHTML += '<ul class="search-result-list">';

    hits.forEach(function(hit) {
      const title = hit._highlightResult && hit._highlightResult.title 
        ? hit._highlightResult.title.value 
        : hit.title || 'Untitled';
      
      const excerpt = hit._highlightResult && hit._highlightResult.excerpt 
        ? hit._highlightResult.excerpt.value 
        : hit.excerpt || '';
      
      const url = hit.permalink || hit.path || '#';

      resultsHTML += `
        <li>
          <a href="${url}" class="search-result-title">${title}</a>
          ${excerpt ? `<p class="search-result">${excerpt}</p>` : ''}
        </li>
      `;
    });

    resultsHTML += '</ul>';
    searchResult.innerHTML = resultsHTML;
  }

  // Debounce function to limit search frequency
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = function() {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Add event listener with debouncing
  const debouncedSearch = debounce(performSearch, 300);
  searchInput.addEventListener('input', function() {
    debouncedSearch(this.value);
  });

  // Clear results when input is cleared
  searchInput.addEventListener('keyup', function() {
    if (!this.value.trim()) {
      searchResult.innerHTML = '';
    }
  });

})();