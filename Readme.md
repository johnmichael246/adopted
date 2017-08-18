# Adopted | Perfecting your pet adoption experience

![Adopted](http://i.imgur.com/5cDtZvD.png "Introduction")

Adopted was created by three dog-loving developers who are set out on a mission to match adobatable pets to their new forever homes. By utilizing internet technology and the resources it can generate, we want to:

* Increase public awareness of the availability of high-quality adoptable pets

* Increase the overall effectiveness of pet adoption programs across North America to the extent that the euthanasia of adoptable pets is eliminated

* Ease of usability for the users

##### Pet Details
![Screenshot](http://i.imgur.com/YBmYwKn.png "Show Pet Screenshot")
Easily search and find all adorable and adoptable pets in your area. For more about the pet, click the pets picture to see detailed information about the pet, add them to your favorites or send the shelter a message about the pet!

![Technologies](http://i.imgur.com/NLs9sbH.png "Technologies Used")

* HTML5
* CSS3
* Bootstrap
* JavaScript
* jQuery
* VS Code
* Node.js
* Express
* MongoDB
* Mongoose
* mLab Cloud Database
* PetFinder API - database with over 300,000 adoptable pets and 11,000 animal welfare organizations
* Git for version control
* GitHub for team remote repositories control
* Trello for project management  
* Imgur for display
* Heroku
* OAuth

#### Restful API Routes
Verb | URI Path | Purpose 
---- | -------- | -------
GET | '/api/results' | Retrieves all pets from petfinder API
POST | '/api/favorites/:id' | Add pet to your favorites
GET | '/api/favorites/:id' | Retrieves one favorite pet
POST | '/:petId/comments' | Add new comment on specific pet 
DELETE | '/:petId/comments/:commentId' | Delete comments from a specific pet 
PUT | '/users' | Create users initial preferences
POST | '/users/profile' | Update users preferences on their profile 



[Adopted](https://adopted.herokuapp.com/ "Adopted on Heroku")

[Adopted Trello Board](https://trello.com/b/0c88vfvE/pet-finder "Adopted on Trello")

[Adopted Pitch Deck](https://ga-students.slack.com/files/jessbakk/F6N2A9A0P/adopted_pitch_deck.key)

![Problems](http://i.imgur.com/zGB99kW.png "Unsolved Problems")

* **Search by Radius** - One of our next steps is to include a feature to search for pets within a certain mile radius. We will include Google maps for a better user experience.

![Enhancements](http://i.imgur.com/DGsB3Pg.png "Future Enhancements")

* **Put my pet up for adoption** - Put your pet up for adoption to a reputable shelter and match them with active users looking for a new addition to their family.

* **Pet's History** - See a history of all the pets including their shot records, their background (if known)

* **Pet Accessory Options** - Once you have favorited pets or adopted a new friend, show relevant pet accessories based off of your preferences and the pet's needs.

* **Volunteer Opportunities** - If you are unable to adopt or are looking for opportunities to help out, find all the information you need from shelters right through Adopted.

* **Donations** - Users to be able to make donations directly to the shelters, organizations or sponsor a pet directly, if unable to adopt or would like to help many pets.

* **Share Success Stories** - Social platform to share success stories and pictures.

![Thank You](http://i.imgur.com/GnnLNQs.png "Thank You")

<3 The Adopted Team
![Adopted Team](http://i.imgur.com/vVHZhTg.png "Furry Friends")