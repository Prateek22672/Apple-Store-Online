(() => {
    const carousels = document.querySelectorAll(".carousel");
    const wrapperElements = document.querySelectorAll(".wrapper");

    wrapperElements.forEach((wrapper, index) => {
        const carousel = carousels[index];
        const arrowBtns = wrapper.querySelectorAll("i");
        const firstCardWidth = carousel.querySelector(".card").offsetWidth;
        const dotsContainer = wrapper.querySelector(".dots-container");

        let isDragging = false, startX, startScrollLeft;
        let cardsPerView = Math.round(carousel.offsetWidth / firstCardWidth);

        // Create dots
        const createDots = () => {
            const numDots = Math.ceil(carousel.children.length / cardsPerView); // Number of dots based on the number of cards and cards per view
            for (let i = 0; i < numDots; i++) {
                const dot = document.createElement("span");
                dot.classList.add("dot");
                dotsContainer.appendChild(dot);

                // Scroll to the respective card when a dot is clicked
                dot.addEventListener("click", () => {
                    carousel.scrollLeft = i * firstCardWidth * cardsPerView;
                });
            }
        };

        // Update the active dot based on scroll position
        const updateDots = () => {
            const dots = dotsContainer.querySelectorAll(".dot");
            dots.forEach(dot => dot.classList.remove("active"));

            const activeIndex = Math.round(carousel.scrollLeft / (firstCardWidth * cardsPerView)) % dots.length; // Adjusted for dynamic dots
            dots[activeIndex].classList.add("active");
        };

        // Call createDots function
        createDots();
        updateDots();

        // Arrow button functionality
        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const scrollAmount = btn.id.includes("left") ? -firstCardWidth * cardsPerView : firstCardWidth * cardsPerView;
                carousel.scrollLeft += scrollAmount;
                setTimeout(updateDots, 50); // Adjust timing if necessary
            });
        });

        // Drag functionality
        const dragStart = (e) => {
            isDragging = true;
            carousel.classList.add("dragging");
            startX = e.pageX || e.touches[0].pageX;
            startScrollLeft = carousel.scrollLeft;
        };

        const dragging = (e) => {
            if (!isDragging) return;
            const x = e.pageX || e.touches[0].pageX;
            carousel.scrollLeft = startScrollLeft - (x - startX);
            e.preventDefault(); // Prevent default behavior
        };

        const dragStop = () => {
            isDragging = false;
            carousel.classList.remove("dragging");
            updateDots();
        };

        // Event listeners
        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);

        carousel.addEventListener("touchstart", dragStart);
        carousel.addEventListener("touchmove", dragging);
        document.addEventListener("touchend", dragStop);

        carousel.addEventListener("scroll", updateDots); // Update dots on scroll
    });
})();
