document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('[data-selector]');
    const cards = document.querySelectorAll('.team-card');
    const allTab = document.querySelector('[data-selector="all"]');

    initialize = () => {
        allTab.classList.add('btn--secondary');
        allTab.classList.remove('btn--bordered');
        
        cards.forEach(card => card.style.display = 'block');
    }

    initialize();

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const selector = this.dataset.selector;
            const isAllTab = selector === 'all';

            if (isAllTab) {
                tabs.forEach(t => {
                    t.classList.remove('btn--secondary');
                    t.classList.add('btn--bordered');
                });
                this.classList.add('btn--secondary');
                this.classList.remove('btn--bordered');
                cards.forEach(card => card.style.display = 'block');
            } 
            else {
                this.classList.toggle('btn--secondary');
                this.classList.toggle('btn--bordered');

                const activeFilters = Array.from(tabs)
                    .filter(t => t !== allTab && t.classList.contains('btn--secondary'))
                    .map(t => t.dataset.selector);

                allTab.classList.remove('btn--secondary');
                allTab.classList.add('btn--bordered');

                if (activeFilters.length === 0) {
                    allTab.click();
                    return;
                }

                cards.forEach(card => {
                    const shouldShow = activeFilters.some(filter => 
                        card.hasAttribute(`data-selector-${filter}`)
                    );
                    card.style.display = shouldShow ? 'block' : 'none';
                });
            }
        });
    });
});