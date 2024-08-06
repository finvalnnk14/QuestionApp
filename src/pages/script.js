let currentSlideIndex = 0;
const images = ["paketa.png", "paketb.png", "paketc.png", "paketd.png", "pakete.png", "paketf.png"]; // Tambahkan gambar sesuai kebutuhan

function showSlide(index) {
    const slide = document.getElementById("currentImage");
    if (index >= images.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = images.length - 1;
    } else {
        currentSlideIndex = index;
    }
    slide.src = images[currentSlideIndex];
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

// Inisialisasi tampilan slide pertama
showSlide(currentSlideIndex);
