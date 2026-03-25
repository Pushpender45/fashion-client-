document.addEventListener('DOMContentLoaded', () => {
    // Thumbnail switching
    const thumbs = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('mainProdImg');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Update active state
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            // Update main image
            const newImg = thumb.getAttribute('data-img');
            mainImg.style.opacity = '0';
            
            setTimeout(() => {
                mainImg.src = newImg;
                mainImg.style.opacity = '1';
            }, 200);
        });
    });

    // Size selection
    const sizeBtns = document.querySelectorAll('.size-btn:not(.disabled)');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    // Accordion functionality
    const accTriggers = document.querySelectorAll('.accordion-trigger');
    accTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const accordion = trigger.parentElement;
            const content = trigger.nextElementSibling;
            const icon = trigger.querySelector('.icon');

            // Toggle active state
            const isActive = accordion.classList.contains('active');

            if (isActive) {
                accordion.classList.remove('active');
                content.style.display = 'none';
                icon.innerText = '+';
            } else {
                accordion.classList.add('active');
                content.style.display = 'block';
                icon.innerText = '−';
            }
        });
    });

    // Add to cart click
    const addToCartBtn = document.querySelector('.btn-black');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const selectedSize = document.querySelector('.size-btn.selected');
            const size = selectedSize ? selectedSize.innerText : 'None';
            
            addToCartBtn.innerText = 'ADDING...';
            addToCartBtn.style.opacity = '0.7';

            setTimeout(() => {
                addToCartBtn.innerText = 'ADDED TO CART';
                addToCartBtn.style.backgroundColor = '#2ecc71'; // Green success
                console.log(`Product: VIVIENNE WORK, Size: ${size} added to cart.`);
                
                setTimeout(() => {
                    addToCartBtn.innerText = 'ADD TO CART';
                    addToCartBtn.style.backgroundColor = '';
                    addToCartBtn.style.opacity = '1';
                }, 2000);
            }, 800);
        });
    }
});
