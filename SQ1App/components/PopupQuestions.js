export const pageNumbers = new Set([
    2, 6, 8, 12, 20, 22,
    26, 27, 28, 29, 30,
  ]);

export const popupQuestions = {
        2: [{
        question: "What is hygiene?",
        options: [
            "The way you style your hair to look cool for school.",
            "The things we do to keep our body clean and healthy every day.",
            "The rules you follow when playing games with friends.",
            "The way you decorate your room to keep it looking nice."
        ],
        ans: 1,
        correct: "Correct! It’s important to build good habits with hygiene so we stay clean and healthy.",
        incorrect: "Good try! Hygiene is the things we do to keep our body clean and healthy every day."
        }],
        6: [{
        question: "After you wake up in the morning, what are some things you do before going to school?",
        options: [
            "Washing your face",
            "Taking a shower",
            "Using the bathroom",
            "Brushing your teeth",
            "All of the above"
        ],
        ans: 4,
        correct: "Correct! All of the answers above are good things to do in the morning so you stay clean and healthy!",
        incorrect: "Good try! You chose a good answer, but all of the options listed are important to do in the morning to stay clean and healthy."
        }],
        8: [{
        question: "What is the most important meal of the day?",
        options: [
            "Breakfast",
            "Lunch",
            "Dinner"
        ],
        ans: 0,
        correct: "Correct! It’s good to have a balanced breakfast so you have energy throughout the day.",
        incorrect: "Good try! Every meal of the day is important, but having a good breakfast helps boost your energy and start the day off well!"
        },  {
            question: "How can Miguel make time for breakfast?",
            options: [
                "Sleeping earlier and waking up on time",
                "Skipping school in the morning.",
                "Staying up late to watch TV.",
                "Playing video games before bed."
            ],
            ans: 0,
            correct: "Correct! Sleeping earlier and waking up on time makes sure you still get all the sleep you need and still have enough time in the morning to make a balanced breakfast!",
            incorrect: "Good try! However, going to sleep earlier and waking up on time would be the best way to get all the sleep you need and still have enough time in the morning to make a balanced breakfast."
            }],
        12: [{
        question: "Should you NEVER eat pizza?",
        options: [
            "Yes",
            "No"
        ],
        ans: 1,
        correct: "Correct! Any junk-food is okay to eat once in a while, but you should not be eating junk food every day.",
        incorrect: "Good try! It’s good to limit the amount of junk food you eat, but it’s still ok to have some once in a while."
        }, {
            question: "Do you have the choice to eat something healthier?",
            options: [
                "Yes",
                "No"
            ],
            ans: 0,
            correct: "Correct! It’s important to learn how to make good choices with food so you have a balanced diet and can stay healthy.",
            incorrect: "Good try! While it may seem hard, you can choose what foods you eat each day. It's important to learn how to make good choices with food so you have a balanced diet and can stay healthy."
            }],
        20: [{
        question: "How many hours should you sleep for?",
        options: [
            "3 hours",
            "6 hours",
            "10 hours",
            "12 hours"
        ],
        ans: 2,
        correct: "Correct! A full night's sleep is 10 hours long.",
        incorrect: "Good try! To feel well-rested, you should sleep 10 hours a night."
        }],
        22: [{
        question: "What does sleep help you do?",
        options: [
            "Watch more movies and TV shows without feeling tired.",
            "Stay focused when you're playing your favorite video games.",
            "Run faster and score more points in sports without practicing.",
            "Sleep helps you grow taller, feel stronger, and stay healthy."
        ],
        ans: 3,
        correct: "Correct! Sleep helps you stay healthy by giving you the strength to fight sicknesses like the cold.",
        incorrect: "Good try! Sleep helps you grow taller and stronger. It also helps you stay healthy by giving you the strength to fight sicknesses like the cold."
        }],
        26: [{
          question: "What is self-esteem?",
          options: [
            "How fast you can run in a race.",
            "The clothes you wear to school.",
            "How many friends you have on social media.",
            "Self esteem is how confident you feel about yourself."
          ],
          ans: 3,
          correct: "Correct! Good self esteem is when you are happy and do not let others put you down.",
          incorrect: "Good try! Self esteem is how confident you feel about yourself. Good self esteem is when you are happy and do not let others put you down."
        }],
        27: [{
            question: "What does it mean to be a bystander?",
            options: [
              "Someone who stands in line to play a game.",
              "A person who encourages the bully to keep going.",
              "A person who watches an event take place, but is not directly involved.",
              "The person who stops the bullying."
            ],
            ans: 2,
            correct: "Correct! This means they are not encouraging or stopping the bullying, but they see it happening and can report it!",
            incorrect: "Good try! A bystander is someone who watches an event take place, but is not directly involved. This means they are not encouraging or stopping the bullying, but they see it happening and can report it!"
          }, {
            question: "What is bullying?",
            options: [
              "Helping someone feel better when they’re upset or sad.",
              "Playing games with your friends where everyone feels included.",
              "Treating someone in a way that makes them feel powerful and proud of themselves.",
              "When someone thinks they have power over you. They use this power to make you feel bad about yourself, upset, or uncomfortable."
            ],
            ans: 3,
            correct: "Correct! Bullying is a harmful action that causes others to feel upset or uncomfortable.",
            incorrect: "Good try! Doing this would actually make someone feel happy and positive. Instead, bullying is a harmful action that causes others to feel upset or uncomfortable."
          }],
        28: [{
            question: "What other adults can you talk to besides your parents?",
            options: [
              "Teachers",
              "Siblings",
              "Principal",
              "All of the above"
            ],
            ans: 3,
            correct: "Correct! There are a lot of people involved in your life who can be supportive and trustworthy.",
            incorrect: "Good try! This is a good option, but all of the answers provided above are correct. A lot of different adults can be supportive and trustworthy."
        }],
        29: [{
          question: "When you are being bullied do you have low self esteem or high self esteem?",
          options: [
            "Low self-esteem",
            "High self-esteem"
          ],
          ans: 0,
          correct: "Correct! Bullies often try to make you feel bad about yourself, upset, or uncomfortable.",
          incorrect: "Good try! Bullies try to make you feel bad about yourself, upset, or uncomfortable, which often causes low self-esteem."
        }],
        30: [{
          question: "Is bullying always physical?",
          options: [
            "Yes",
            "No"
          ],
          ans: 1,
          correct: "Correct! Bullying can take many forms, including hurting others with mean words and excluding them from group activities.",
          incorrect: "Good try! Bullying can take many different forms. Besides physically hurting someone, bullies can also hurt others by using mean words and excluding others from group activities."
        }, {
            question: "When is bullying not physical?",
            options: [
              "When someone uses words to hurt your feelings.",
              "When someone spreads rumors about you to make others dislike you.",
              "When someone excludes you from a group or activity on purpose.",
              "All of the above."
            ],
            ans: 3,
            correct: "Good job! Bullying looks different for everyone, so it’s important to be able to recognize all types.",
            incorrect: "Good try! That is a type of non-physical bullying, but the answer is actually all of the above! Bullying can look very different depending on the situation."
          }, {
            question: "Does bullying happen only in school?",
            options: [
              "Yes",
              "No"
            ],
            ans: 1,
            correct: "Correct! Bullying happens at school a lot, but it can also happen on the bus, at sports practice, online, and in many other places.",
            incorrect: "Good try! Bullying happens at school a lot, but it can also happen on the bus, at sports practice, online, and in many other places."
          },  {
            question: "Which of the following are ways to tell if someone is being bullied?",
            options: [
              "They do not want to come to school",
              "They have very few friends",
              "They are doing poorly in school",
              "Student can not sleep properly",
              "Student has a loss of self esteem",
              "All of the above"
            ],
            ans: 5,
            correct: "Correct! These are all signs that someone is being bullied.",
            incorrect: "Good try! That answer is correct, but all of the above answers are signs that someone is being bullied."
          }]
    }
;