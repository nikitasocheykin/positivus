document.addEventListener('DOMContentLoaded', function() {
    class Slider {
        constructor() {
            this.slider = document.querySelector('.testimonials__cards');
            this.cards = document.querySelectorAll('.testimonial-card');
            this.prevBtn = document.querySelector('.testimonials-nav__btn--prev');
            this.nextBtn = document.querySelector('.testimonials-nav__btn--next');
            this.pagination = document.querySelectorAll('.testimonials-nav__pag-svg path');
            this.currentIndex = 0;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.pagination.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
            this.init();
        }

        init() {
            this.setupEventListeners();
            this.updateSlider();
        }

        setupEventListeners() {
            this.prevBtn.addEventListener('click', () => this.slide('prev'));
            this.nextBtn.addEventListener('click', () => this.slide('next'));
            
            this.slider.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, false);

            this.slider.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, false);

            window.addEventListener('resize', () => this.handleResize());
        }

        handleResize() {
            this.slider.style.transition = 'none';
            this.updateSlider();
            setTimeout(() => {
                this.slider.style.transition = 'transform 0.4s ease-in-out';
            }, 10);
        }

        handleSwipe() {
            const minSwipeDistance = 50;
            const swipeDistance = this.touchStartX - this.touchEndX;

            if (swipeDistance > minSwipeDistance) {
                this.slide('next');
            } else if (swipeDistance < -minSwipeDistance) {
                this.slide('prev');
            }
        }

        slide(direction) {
            if (direction === 'next' && this.currentIndex < this.cards.length - 1) {
                this.currentIndex++;
            } else if (direction === 'prev' && this.currentIndex > 0) {
                this.currentIndex--;
            }
            
            this.updateSlider();
        }

        updateSlider() {
            const cardWidth = this.cards[0].getBoundingClientRect().width;
            const offset = ((this.currentIndex * cardWidth)+(50*this.currentIndex)) * -1;
            this.slider.style.transform = `translateX(${offset}px)`;
            
            this.pagination.forEach((dot, index) => {
                dot.style.fill = index === this.currentIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)';
            });

            this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
            this.nextBtn.style.opacity = this.currentIndex === this.cards.length - 1 ? '0.3' : '1';
        }

        goToSlide(index) {
            if (index >= 0 && index < this.cards.length) {
                this.currentIndex = index;
                this.updateSlider();
            }
        }
    }

    new Slider();
});