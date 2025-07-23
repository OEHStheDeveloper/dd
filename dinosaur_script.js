mk1 = "Mortal Kombat (1992)"
            mk2 = "Mortal Kombat 2"
            mk3 = "Mortal Kombat 3"
            mkt = "Mortal Kombat Trilogy"
            mkmsz = "Mortal Kombat Mythologies: Sub-Zero"
            mk4 = "Mortal Kombat 4"
            mksf = "Mortal Kombat: Special Forces"
            mkda = "Mortal Kombat: Deadly Alliance"
            mkd = "Mortal Kombat: Deception"
            mka = "Mortal Kombat: Armageddon"
            mk9 = "Mortal Kombat (2011)"
            mkx = "Mortal Kombat X"
            mk11 = "Mortal Kombat 11"
            mkone = "Mortal Kombat 1"

            /* "Template": {Name: "", Gender: "", Race: "", Faction: "", Realm: "", Alignment: "", Debut: }, */
const characterDatabase = {
                "ankylosaurus": { Name: "Ankylosaurus", Trait: "Armored", Diet: "Herbivore", Weight: "8000 kg", Length: "8 m", Area: "Canada, USA", Age: "Cretaceous" },
                "velociraptor": { Name: "Velociraptor", Trait: "Predator (Theropod)", Diet: "Carnivore", Weight: "7 kg", Length: "1.8", Area: "Mongolia", Age: "Cretaceous" },
                "allosaurus": { Name: "Allosaurus", Trait: "Predator (Theropod)", Diet: "Carnivore", Weight: "2700 kg", Length: "9.7m", Area: "USA", Age: "Jurrasic" },
                "spinosaurus": { Name: "Spinosaurus", Trait: "Predator (Theropod)", Diet: "Carnivore", Weight: "7400 kg", Length: "14m", Area: "Egypt, Morocco", Age: "Cretaceous" },
                "brontosaurus": { Name: "Brontosaurus", Trait: "Long-necked", Diet: "Herbivore", Weight: "46900m", Length: "22m", Area: "USA", Age: "Jurrasic" },
                "triceratops": { Name: "Triceratops", Trait: "Horned", Diet: "Herbivore", Weight: "10000", Length: "9m", Area: "USA", Age: "Cretaceous" },
                "stegosaurus": { Name: "Stegosaurus", Trait: "Armored", Diet: "Herbivore", Weight: "5000", Length: "9m", Area: "USA", Age: "Jurrasic" },
                "tyranosaurus rex": { Name: "Tyrannosaurus Rex", Trait: "Predator (Theropod)", Diet: "Carnivore", Weight: "7000 kg", Length: "12m", Area: "Canada, USA", Age: "Cretaceous" },
                "pterodactyl": { Name: "Pterodactyl", Trait: "Flying (Pterosauria)", Diet: "Carnivore", Weight: "250", Length: "2", Area: "USA", Age: "Jurrasic, Cretaceous" },
                "mosasaurus": { Name: "Mosasaurus", Trait: "Aquatic", Diet: "Carnivore", Weight: "10000", Length: "17", Area: "Ocean", Age: "Cretaceous" },
            }

const pictureDatabase = {
                "ankylosaurus": { picture_url: "ankylosaurus.jpg" },
                "velociraptor": { picture_url: "velociraptor1.jpg" },
                "allosaurus": { picture_url: "allosaurus1.avif" },
                "spinosaurus": { picture_url: "spinosaurus1.png" },
                "brontosaurus": { picture_url: "brontosaurus1.webp" },
                "triceratops": { picture_url: "triceratops.webp" },
                "stegosaurus": { picture_url: "stegosaurus.jpg" },
                "tyranosaurus rex": { picture_url: "tyrannosaurus1.jpg" },
                "pterodactyl": { picture_url: "pterodactyl.jpg" },
                "mosasaurus": { picture_url: "mosasaurus1.webp" },
            }

            let banned_list = JSON.parse(localStorage.getItem("banned_list")) || []; // Retrieve banned list from local storage or initialize as empty

            let hard_mode = localStorage.getItem("hard_mode") === "true"; // Retrieve and convert to boolean

            if (hard_mode === true) {
                banned_list = JSON.parse(localStorage.getItem("banned_list3D")) || [];
            }

            let correct_counter = 0

            let victory = false

            let no_text = false

            let guess_counter = 0

            let selection = -1;

            let flawless_victory = false

            var answer_container = document.getElementById('answer-container');

            function guess(character) {
                let database = null;

                if (hard_mode === false) {
                    database = characterDatabase
                } else {
                    database = hardmode_characterbase
                }


                if (victory === true) {
                    return;
                }
                const suggestionsDiv = document.getElementById('suggestions');
                suggestionsDiv.style.display = 'none';
                selection = -1
                console.log("selection is ", selection)
                console.log(character)
                document.getElementById("searchinput").value = character
                let iteration_count = 0

                let correct_counter = 0
                guess_counter += 1
                var raw_input_value = document.getElementById("searchinput").value;
                document.getElementById("searchinput").value = ""
                var input_value = raw_input_value.toLowerCase()
                var container = document.createElement("div")
                container.className = "square-container"
                //const characterObject = characterDatabase[input_value];

                const characterObject = database[input_value];

                //let guess = characterDatabase[input_value]
                let guess = database[input_value]
                const new_row = document.createElement("div")


                let debut_value = 0


               

                if (banned_list.includes(input_value)) {
                    console.log("Error: Guess can't be made due to it already being guessed: ", input_value)
                } else if (!(input_value in database)) {
                    console.log("Error: character name is not in database")
                }
                else {
                    answer_container.prepend(container)
                    banned_list.push(input_value); // Add guessed character to banned list
                    localStorage.setItem("banned_list", JSON.stringify(banned_list)); // Save updated banned list to local storage
                    for (let key in guess) {

                        iteration_count += 1
                        const square = document.createElement('div');
                        if (iteration_count === 1) {
                            // Behavior for first iteration aka. the square that needs pictures and hover elements
                            if (pictureDatabase[input_value] === undefined) {
                                console.log("ERROR: Missing image on guess")
                                console.log("The data type of the image path is: ", pictureDatabase[input_value])
                            } else {
                                square.style.backgroundImage = `url("${pictureDatabase[input_value].picture_url}")`;
                            }
                            //square.style.backgroundImage = `url(icons/${guess.Image})`;
                            square.style.backgroundSize = "cover"; // or "cover" depending on the effect you want
                            square.style.backgroundRepeat = "no-repeat"; // Prevents tiling
                            square.style.backgroundPosition = "center"; // Centers the image
                            square.classList.add('square');
                            square.classList.add("picturesquare")
                            square.style.backgroundColor = "rgb(0, 209, 17)";
                            correct_counter += 1;
                            const textSpan = document.createElement("span"); // Create a span element
                            textSpan.textContent = guess[key];
                            textSpan.classList.add("namehover")
                            square.appendChild(textSpan);
                            container.appendChild(square);
                        } else {
                            //console.log(guess[key])

                            if (guess[key] == answer_data[key]) {
                                //  const square = document.createElement('div');
                                square.classList.add('square');
                                square.style.backgroundColor = "rgb(0, 209, 17)";
                                correct_counter += 1;
                                //const textNode = document.createTextNode(guess[key]);
                                // square.appendChild(textNode);
                                //container.appendChild(square);
                                const textSpan = document.createElement("span"); // Create a span element
                                textSpan.textContent = guess[key];
                                textSpan.classList.add("squaretext")
                                square.appendChild(textSpan);
                                if (guess[key].split(" ").some(word => word.length > 9)) {
                                    textSpan.style.fontSize = "17px";
                                }

                                container.appendChild(square);
                            } else {
                                const guessParts = guess[key].split(",").map(part => part.trim());
                                const answerParts = answer_data[key].split(",").map(part => part.trim());
                                const partialMatch = guessParts.some(part => answerParts.includes(part));

                                if (partialMatch) {
                                    // Partial match
                                    // const square = document.createElement('div');
                                    square.classList.add('square');
                                    square.style.backgroundColor = "rgb(255, 153, 0)";
                                    //const textNode = document.createTextNode(guess[key]);
                                    //square.appendChild(textNode);
                                    // container.appendChild(square);
                                    const textSpan = document.createElement("span"); // Create a span element
                                    textSpan.textContent = guess[key];
                                    textSpan.classList.add("squaretext")
                                    if (guess[key].split(" ").some(word => word.length > 9)) {
                                        textSpan.style.fontSize = "17px";
                                    }
                                    square.appendChild(textSpan);
                                    container.appendChild(square);
                                } else {
                                    // Completely incorrect guess
                                    // const square = document.createElement('div');

                                    let number_key = parseFloat(guess[key].toString().replace(/[^\d.]/g, ""));
                                    let number_key2 = parseFloat(answer_data[key].toString().replace(/[^\d.]/g, ""));

                                    if (!isNaN(number_key) && !isNaN(number_key2)) {
                                        if (number_key > number_key2) {
                                            square.style.backgroundImage = 'url(black_arrow_down.png)';
                                        } else if (number_key < number_key2) {
                                            square.style.backgroundImage = 'url(black_arrow.webp)';
                                        }
                                    }

                                    if (square.style.backgroundImage !== "none") {
                                        square.style.backgroundSize = "cover";
                                        square.style.backgroundRepeat = "no-repeat";
                                        square.style.backgroundPosition = "center";
                                    }

                                    square.classList.add('square');
                                    square.style.backgroundColor = "red";
                                    // const textNode = document.createTextNode(guess[key]);
                                    //square.appendChild(textNode);
                                    //container.appendChild(square);
                                    const textSpan = document.createElement("span"); // Create a span element
                                    textSpan.textContent = guess[key];
                                    textSpan.classList.add("squaretext")
                                    if (guess[key].split(" ").some(word => word.length > 9)) {
                                        textSpan.style.fontSize = "17px";
                                    } //earthrealm
                                    square.appendChild(textSpan);
                                    container.appendChild(square);
                                }
                            }
                        }

                    }
                }

                // console.log(correct_counter)
                if (correct_counter === 7) {

                    victory = true;
                    console.log("victory pending...")
                    correct_counter = 0
                } else {
                    correct_counter = 0
                }

                if (banned_list.includes(input_value)) {
                    // console.log("The banned list already has the inputted value")
                }
                else if (input_value in characterDatabase) {
                    banned_list.push(input_value)
                    // console.log(banned_list)
                }
                else {
                    //console.log("Value is not equal to a name in the database")
                }
                animatesquares(container)
                //correct_counter = 0;

                if (guess_counter === 1 & victory === true) {
                    flawless_victory = true;
                    console.log("flawless victory!")
                    let flawless_victory_text = document.getElementById("flawless-victory")
                    flawless_victory_text.innerHTML = "Perfect Victory!"
                    document.getElementById("guess-count").innerHTML = `You guessed the dinosaur in a single attempt. Well done!`
                }

                const stored_squares = Array.from(answer_container.children).map(div => div.outerHTML);


                if (hard_mode === false) {
                    localStorage.setItem('savedDivs', JSON.stringify(stored_squares));
                } else {
                    localStorage.setItem("savedDivs3D", JSON.stringify(stored_squares));
                }

            }





            async function animatesquares(container_parameter) {
                let green_counter = 0
                const squares = document.querySelectorAll(".square");

                const container_children = container_parameter.children

                //let correct_counter = 0    

                for (const anim_square of container_children) {
                    // console.log(anim_square);
                    // Reset animation
                    anim_square.style.animation = "none";
                    anim_square.offsetHeight; // Trigger reflow

                    // Apply animation again
                    anim_square.style.animation = "scale 0.5s forwards";
                    await new Promise(resolve => {
                        anim_square.addEventListener("animationend", () => {
                            resolve()
                            if (anim_square.style.backgroundColor === "rgb(0, 209, 17)") {
                                green_counter += 1
                            }
                        }, { once: true });

                    });
                }

                if (green_counter === 7) {
                    console.log("game won!")
                    //  alert("You win!")
                    victory_screen()
                } else {
                    correct_counter === 0;
                }


            }

            let answer_data = null;
            let random_key = null;

            // Function to get today's character
            function getDailyCharacter() {
                // localStorage.removeItem("streak_possible")
                const date = new Date();
                const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
                //let keys = Object.keys(characterDatabase); 
                let keys = null
                if (hard_mode === false) {
                    keys = Object.keys(characterDatabase);
                    console.log("Easy mode activated")
                    const randomIndex = parseInt(dateStr, 10) % keys.length;
                    randomKey = keys[randomIndex];
                    answer_data = characterDatabase[randomKey]
                } else {
                    console.log("Hard mode activated")
                    keys = Object.keys(hardmode_characterbase)
                    console.log(hardmode_characterbase)
                    const randomIndex = parseInt(dateStr, 10) % keys.length;
                    
                    randomKey = keys[randomIndex];

                    answer_data = hardmode_characterbase[randomKey]

                }


                //Der skal skrives kode her som gør at databaserne bliver opdateret på en passende måde

                //randomKey = keys.find(key => key === "hsu hao");

                //answer_data = characterDatabase[randomKey]
                console.log("The selected character is:")
                console.log(randomKey)
            }

            getDailyCharacter()

            function showSuggestions() {
                const input = document.getElementById('searchinput').value.toLowerCase();
                const suggestionsDiv = document.getElementById('suggestions');
                let keys = null
                if (hard_mode === false) {
                    console.log("easy mode!!")
                    keys = Object.keys(characterDatabase);
                } else {
                    keys = Object.keys(hardmode_characterbase);
                }

                const filteredKeys = keys.filter(key => key.toLowerCase().includes(input));
                suggestionsDiv.innerHTML = '';

                if (filteredKeys.length > 0 && input !== '') {
                    suggestionsDiv.style.display = 'block';
                    filteredKeys.forEach(key => {

                        // console.log(key)
                        const suggestionDiv = document.createElement('div');
                        if (banned_list.includes(key)) {
                            console.log("This suggestion shouldn't be present!")
                        } else {
                            suggestionDiv.textContent = key;
                            suggestionDiv.onclick = function () {
                                document.getElementById('searchinput').value = key;
                                guess(key)
                                suggestionsDiv.style.display = 'none';
                                selection = -1
                            };
                            suggestionsDiv.appendChild(suggestionDiv);
                        }

                    });
                } else {
                    hide_suggestions()
                }
            }

            function hide_suggestions() {
                let suggestionsDiv = document.getElementById('suggestions');
                selection = -1
                console.log("Suggestions are now gone")
                highlighted_value = null
            }

            document.addEventListener('click', function (event) {
                const suggestionsDiv = document.getElementById('suggestions');
                const inputField = document.getElementById('searchinput');
            });

            $('.button').click(function () {
                // console.log("it worked")
                var buttonId = $(this).attr('id');
                $('#modal-container').removeAttr('class').addClass(buttonId);
                $('body').addClass('modal-active');
            })

            $('#modal-container').click(function () {
                $(this).addClass('out');
                $('body').removeClass('modal-active');
            });

            const section = document.getElementById("victory-section"),
                overlay = document.querySelector(".overlay"),
                closeBtn = document.querySelector(".close-btn");
            closeBtn.addEventListener("click", () => {
                section.classList.remove("active")
                document.getElementById("overlay").style.display = "none";
            }
            );

            const Today = new Date();
            Today.setHours(0, 0, 0, 0);

            let pastvictory_string = localStorage.getItem("today");

            if (pastvictory_string) {
                let pastvictory_data = new Date(pastvictory_string)

                let differenceindays = (Today - pastvictory_data) / (1000 * 60 * 60 * 24)

                console.log("Data found for previous victory on :", pastvictory_string)
                console.log("difference in days is", differenceindays)

                if (differenceindays > 1) {
                    console.log("Streak has been reset, due to a day being missed")
                    Number(localStorage.removeItem("streak"))
                } else if (differenceindays === 1) {
                    console.log("Streak can be increased today because a day has passed!");
                } else {
                    console.log("Streak can't be increased because you already played", localStorage.getItem("streak"))
                }

            } else {
                console.log("No previous date stored")
            }

            if (localStorage.getItem("today") === null) {
                localStorage.setItem("today", "");
            }

            function checkNewDay() {
                // OVERVEJ AT SLET DET HER, FORDI DER FINDES ALLEREDE EN FUNKTION TIL DET
                let today = new Date().toDateString(); // Get today's date as a string
                let lastVisit = localStorage.getItem("lastVisit");

                if (lastVisit !== today) {
                    console.log("New day detected! Resetting streak_possible.");
                    localStorage.removeItem("streak_possible"); // Remove only once per day
                    localStorage.removeItem("savedDivs");
                    localStorage.removeItem("savedDivs3D")
                    localStorage.removeItem("banned_list")
                    localStorage.removeItem("banned_list3D")
                    localStorage.setItem("lastVisit", today); // Update last visit date
                    localStorage.removeItem("victory_state")
                    localStorage.removeItem("victory_state3D")
                }
            }

            checkNewDay();

            if (localStorage.getItem("streak") === null) {
                localStorage.setItem("streak", 0);
            }
            console.log("Streak possible is: ", localStorage.getItem("streak_possible"))

            let streak_text = document.getElementById("streak")

            console.log("streak is:", Number(localStorage.getItem("streak")))

            streak_text.innerHTML = `Streak: ${Number(localStorage.getItem("streak"))}`

            let victory_box = document.getElementById("victory")

            let currentday = new Date().toDateString();

            function victory_screen() {
                if (hard_mode === false) {
                    localStorage.setItem("victory_state", "true")
                } else {
                    localStorage.setItem("victory_state3D", "true")
                }
                
                localStorage.setItem("today", currentday)
                if (localStorage.getItem("streak_possible") === null) {
                    console.log("no value, therefore streak should be possible")
                    let streak = Number(localStorage.getItem("streak"));
                    streak += 1;
                    console.log("streak is", streak)
                    localStorage.setItem("streak", streak);
                    console.log("streak value:", localStorage.getItem("streak"));
                    localStorage.setItem("streak_possible", "no")

                    streak_text.innerHTML = `Streak: ${Number(localStorage.getItem("streak"))}`
                } else {
                    console.log("Streak is no longer possible!")
                }

                let checkmark = document.getElementById("checkmark")
                let suggestionDiv = document.getElementById("suggestions")
                let button = document.getElementById("button")
                let countdownheader = document.getElementById("countdown_header")
                let countdown_live = document.getElementById("countdown1")
                checkmark.style.display = "flex"
                victory_box.style.display = "flex"
                button.style.display = "none"
                input_field.style.display = "none"
                suggestionDiv.style.display = "none"
                countdownheader.style.display = "flex"
                countdown_live.style.display = "flex"
                
                section.classList.add("active")
                document.getElementById("overlay").style.display = "block";
                if (!flawless_victory) {
                    document.getElementById("guess-count").innerHTML = `You guessed the character in ${guess_counter} attempts. Well done!`;
                }

                document.getElementById("characterOfTheDay").innerHTML = `Character of the day: ${randomKey}`;
            }

            let guide_section = document.getElementById("guide-section")
            let patch_notes_section = document.getElementById("patch-notes-section")
            let characters_section = document.getElementById("characters-section")
            let information_section = document.getElementById("information-section")

            function off() {
                console.log("off has been triggered")
                section.classList.remove("active");
                guide_section.classList.remove("active");
                patch_notes_section.classList.remove("active");
                characters_section.classList.remove("active");
                information_section.classList.remove("active")
                document.getElementById("overlay").style.display = "none";
            }

            let highlighted_value = null;
            document.addEventListener("DOMContentLoaded", function () {
                const suggestions = document.getElementById("suggestions");

                document.addEventListener("keydown", function (event) {
                    if (!suggestions || suggestions.children.length === 0) return;

                    if (selection >= 0) {
                        suggestions.children[selection].classList.remove("selected");
                    }

                    if (event.keyCode === 40) { // Down arrow key
                        if (selection < suggestions.children.length - 1) {
                            selection++;
                        }
                    } else if (event.keyCode === 38) { // Up arrow key
                        if (selection > 0) {
                            selection--;
                        }
                    }

                    // Apply new selection
                    if (selection >= 0) {
                        suggestions.children[selection].classList.add("selected");
                        highlighted_value = suggestions.children[selection]
                        console.log(highlighted_value)
                        console.log("Selection is ", selection)
                        console.log(suggestions.children)
                        console.log(suggestions.children[0].innerHTML)
                    }

                    if (event.key === "Enter" && suggestions.children[selection] && suggestions.children[selection].classList.contains("selected")) {
                        console.log("Highlighted value exists")
                        console.log("This statement works")
                        guess(highlighted_value.innerHTML)

                    } else if (event.key === "Enter") {
                        guess(suggestions.children[0].innerHTML)
                        console.log("hell yeah!!")
                    }

                });
            });


            let input_field = document.getElementById('searchinput');

            input_field.addEventListener("input", function (event) {
                if (event.key === "Enter") {
                    console.log("Enter was pressed")
                    console.log(highlighted_value.innerHTML)
                } else {
                    selection = -1
                }
            });

            function updateCountdown() {
                const timeZone = "Europe/Copenhagen";
                const now = new Date();


                const options = { timeZone, hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" };
                const formatter = new Intl.DateTimeFormat("en-US", options);
                const timeParts = formatter.formatToParts(now);

                const hours = parseInt(timeParts.find(p => p.type === "hour").value);
                const minutes = parseInt(timeParts.find(p => p.type === "minute").value);
                const seconds = parseInt(timeParts.find(p => p.type === "second").value);


                const hoursLeft = 23 - hours;
                const minutesLeft = 59 - minutes;
                const secondsLeft = 59 - seconds;

                document.getElementById("countdown").textContent =
                    `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;

                document.getElementById("countdown1").textContent =
                    `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;

                if (hoursLeft === 7 && minutesLeft === 23 && secondsLeft === 35) {
                    onSpecificTime();
                }
            }

            updateCountdown();
            setInterval(updateCountdown, 1000);

            let guide_button = document.getElementById("guide")

            guide_button.addEventListener("click", () => {

                document.getElementById("overlay").style.display = "block";
                guide_section.classList.add("active")
            })



            let patch_button = document.getElementById("patch-notes")

            patch_button.addEventListener("click", () => {
                document.getElementById("overlay").style.display = "block";
                patch_notes_section.classList.add("active")
            })

            let character_button = document.getElementById("characters")



            const threed_button = document.getElementById("3D"); 

            let saved = null

            window.addEventListener('DOMContentLoaded', () => {
                if (hard_mode === false) {
                    saved = localStorage.getItem('savedDivs');
                } else {
                    saved = localStorage.getItem("savedDivs3D")
                }

                console.log("reload!");
                if (saved) {
                    const container = document.getElementById('answer-container');

                    const divs = JSON.parse(saved);
                    divs.forEach(html => {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = html;
                        const square = tempDiv.firstChild;

                        container.appendChild(square);
                    });
                }

                const squares = document.querySelectorAll('.square');

                squares.forEach(square => {
                    square.style.opacity = '1';
                });

                if (localStorage.getItem("victory_state") === "true" && hard_mode === false) {
                    console.log("A past victory has been detected on normal mode");
                    input_field.style.display = "none";

                    checkmark.style.display = "flex";
                    victory_box.style.display = "flex";
                    button.style.display = "none";
                    input_field.style.display = "none";

                } else if (localStorage.getItem("victory_state3D") === "true" && hard_mode === true) {
                    console.log("A past victory has been detected on 3D mode");
                    input_field.style.display = "none";

                    checkmark.style.display = "flex";
                    victory_box.style.display = "flex";
                    button.style.display = "none";
                    input_field.style.display = "none";
                }

                console.log("Banned list on reload:", banned_list); 

            });

            let information_icon = document.getElementById("info")



            let privacy_notice = document.getElementById("privacy-notice")
