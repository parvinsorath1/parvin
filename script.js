let highestZ = 1;

class Paper {

    holdingPaper = false;

    prevX = 0;
    prevY = 0;

    currentX = 0;
    currentY = 0;

    velocityX = 0;
    velocityY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {

        const startDrag = (x, y) => {
            this.holdingPaper = true;

            paper.style.zIndex = highestZ;
            highestZ += 1;

            this.prevX = x;
            this.prevY = y;
        };

        const drag = (x, y) => {
            this.currentX = x;
            this.currentY = y;

            this.velocityX = this.currentX - this.prevX;
            this.velocityY = this.currentY - this.prevY;

            if (this.holdingPaper) {

                this.currentPaperX += this.velocityX;
                this.currentPaperY += this.velocityY;

                this.prevX = this.currentX;
                this.prevY = this.currentY;

                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
            }
        };

        const endDrag = () => {
            this.holdingPaper = false;
        };

        // Mouse events
        paper.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                startDrag(e.clientX, e.clientY);
            }
        });

        document.addEventListener('mousemove', (e) => {
            drag(e.clientX, e.clientY);
        });

        window.addEventListener('mouseup', (e) => {
            endDrag();
        });

        // Touch events
        paper.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startDrag(touch.clientX, touch.clientY);
        });

        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            drag(touch.clientX, touch.clientY);
        });

        window.addEventListener('touchend', (e) => {
            endDrag();
        });
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});
