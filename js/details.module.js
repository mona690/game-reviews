import { Ui } from "./ui.module.js";

export class Details {
   constructor(id) {
      this.ui = new Ui();

      document.getElementById("btnClose").addEventListener("click", () => {
         document.querySelector(".games").classList.remove("d-none");
         document.querySelector(".details").classList.add("d-none");
      });

      this.getDetails(id);
   }

   async getDetails(idGames) {
      const loading = document.querySelector(".loading");
      loading.classList.remove("d-none");

      const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`;
      const options = {
          method: 'GET',
          headers: {
              'x-rapidapi-key': '2dc7b8dfc8msha967383707712c8p19d878jsn17b850c976d6',
              'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
          }
      };

      try {
         const response = await fetch(url, options);
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         const data = await response.json();
         this.ui.displayDetails(data);
      } catch (error) {
         console.error(error);
      } finally {
         loading.classList.add("d-none");
      }
   }
}
