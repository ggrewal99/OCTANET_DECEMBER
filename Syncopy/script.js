document.addEventListener("DOMContentLoaded", () => {

    const primaryMovies = {
        0: {
            img: 'assets/img/oppenheimer_lg.jpg',
            title: 'Oppenheimer',
        },
        1: {
            img: 'assets/img/dunkirk_lg.jpg',
            title: 'Dunkirk',
        },
        2: {
            img: 'assets/img/interstellar_lg.jpg',
            title: 'Interstellar',
        }
    };

    const movieSwitcherBtns = document.querySelectorAll(".switcher-btn");
    const primaryHeading = document.querySelector(".primary-heading");
    const lg_poster = document.querySelector(".lg-poster-container img");
    const sm_posters = document.querySelectorAll(".sm_poster");
    const viewMoreBtn = document.querySelector(".view-more-btn");
    let viewMoreClicked = false;

    movieSwitcherBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            movieSwitcherBtns.forEach(otherBtn => otherBtn.classList.remove("active"));

            btn.classList.add("active");
            lg_poster.setAttribute("src", primaryMovies[btn.dataset.index].img);
            primaryHeading.textContent = primaryMovies[btn.dataset.index].title;
        });
    });

    viewMoreBtn.addEventListener("click", () => {

        sm_posters.forEach(poster => {
            poster.style.display = "block";
            viewMoreBtn.style.display = "none";
        });
        viewMoreClicked = true;
    });

    window.addEventListener('resize', () => {
        if (viewMoreClicked) {
            return;
        }
        let windowWidth = window.innerWidth;

        if (windowWidth < 450) {
            sm_posters.forEach((poster, index) => {
                if (index != 0) {
                    poster.style.display = "none";
                    viewMoreBtn.style.display = "block";
                }
            });
        } else {
            sm_posters.forEach(poster => {
                poster.style.display = "block";
                viewMoreBtn.style.display = "none";
            });
        }
    });
});