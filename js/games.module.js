import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

class Games {
    constructor() {
        this.ui = new Ui();
        this.initMenu();
        this.getGames("mmorpg");
    }

    initMenu() {
        const menuLinks = document.querySelectorAll(".menu a");
        menuLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                this.handleMenuClick(e);
            });
        });
    }

    handleMenuClick(event) {
        const activeLink = document.querySelector(".menu .active");
        if (activeLink) {
            activeLink.classList.remove("active");
        }
        event.target.classList.add("active");
        const category = event.target.dataset.category;
        this.getGames(category);
    }

    async getGames(category) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("d-none");

        const options = {
            method: "GET",
            headers: {
                'x-rapidapi-key': '2dc7b8dfc8msha967383707712c8p19d878jsn17b850c976d6',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
                'Accept': "application/json",
                'Content-Type': "application/json",
            },
        };

        try {
            const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.ui.displayDataGame(data);
            this.startEvent();
        } catch (error) {
            console.error(error);
        } finally {
            loading.classList.add("d-none");
        }
    }

    startEvent() {
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                const id = card.dataset.id;
                this.showDetails(id);
            });
        });
    }

    showDetails(idGame) {
        new Details(idGame);
        document.querySelector(".games").classList.add("d-none");
        document.querySelector(".details").classList.remove("d-none");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new Games();
});