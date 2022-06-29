# [Videogames SPA](https://videogamesspa.vercel.app/)

__[Spanish version](https://github.com/franodangelo/VideogamesProyect/blob/main/README-Spanish)__

#### App created using React, Redux, Node.js, PostgreSQL and Sequelize.
__3-week individual__ project.

### About the Videogames SPA

Inside the app you can see 100 available videogames with relevant information about them such as name, rating and genres, and also you have the opportunity to search for one in particular or just filter and order them. There's a button that allows you to create a brand new videogame in the platform. 

I used the external API __[rawg](https://rawg.io/apidocs)__ in this project.

## Front-End
It was developed using __React and Redux__. It has the following pages:

- [ ] Landing page.

- [ ] Home page with:
- A __Navbar__ with a __searchbar__ to search videogames by name, and a button to go to the videogame's creation __form__.
- A Panel for __filter__ by genre and original or created videogames, and __order__ them ascending or descending by rating or alphabetical order.
- A __Grid__ with all __100 videogames__, both original and created by the user. Each card shows the main info of the videogame: __image, name, genres and rating__.
- A __pagination__ configured to show __15 videogames per page__.

- [ ] __Videogame detail__ page, where you can find additional information like a __description, date of release and platforms__ where you can play it.

- [ ] __Creation form__ with the following fields:
  - Name
  - Description
  - Date of release
  - Rating
  - Genres
  - Platforms

## Back-End
Developed with __Node.js and Express__. It has the following routing:

- [ ] __GET /videogames__:
  - Gives you a list of videogames with the main information to show in the cards in the Home page.

- [ ] __GET /videogames?name="..."__:
  - Gives you a list of the first 15 videogames that match with the word you wrote in the searchbar. If there are no results, you'll receive an information message.

- [ ] __GET /videogame/{idVideogame}__:
  - Gives you the detail of a singular videogame, including its genres.

- [ ] __GET /genres__:
  - Gives you all the possible genres and then saves them in the database.

- [ ] __POST /videogame__:
  - Gives you all the collected data in the creation form and create a new videogame in the database.

#### Endpoints that I used:
  - GET https://api.rawg.io/api/games
  - GET https://api.rawg.io/api/games?search={game}
  - GET https://api.rawg.io/api/genres
  - GET https://api.rawg.io/api/games/{id}

## Database
Created in __PostgreSQL and Sequelize__. Includes the following entities:

- [ ] Videogame with the next properties:
  - ID
  - Name
  - Description
  - Date of release
  - Rating
  - Platforms

- [ ] Genres with the next properties:
  - ID
  - Name

The __relationships__ between entities were both __belongsToMany__ because a videogame can have many genres simultaneously, and so the genres can contain multiple videogames. 
