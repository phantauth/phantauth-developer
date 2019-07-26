function initSearch() {
    docsearch({ apiKey: 'f5000379dc5e53c4b1f5c66dfd5c1b85', indexName: 'phantauth', inputSelector: '#search', debug: false });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initSearch, 200); // workaround, there is some sync issue with gatsby reacdom whatever
});
