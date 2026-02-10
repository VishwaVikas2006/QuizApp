import heartImage from './heart.jpg';
import goldImage from './gold.jpg';

export const questions = {
    Science: [
        {
            id: 1,
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars",
        },
        {
            id: 2,
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "O2", "NaCl"],
            answer: "H2O",
        },
        {
            id: 3,
            question: "Which gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            answer: "Carbon Dioxide",
        },
        {
            id: 4,
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
            answer: "Mitochondria",
        },
        {
            id: 5,
            question: "Identify this organ:",
            image: heartImage,
            options: ["Heart", "Liver", "Lungs", "Kidney"],
            answer: "Heart",
        },
        {
            id: 6,
            question: "Which element is represented by this symbol?",
            image: goldImage, // Gold
            options: ["Silver", "Gold", "Platinum", "Copper"],
            answer: "Gold",
        },
        {
            id: 7,
            question: "What is the speed of light?",
            options: ["300,000 km/s", "150,000 km/s", "1,080 km/h", "Sound speed"],
            answer: "300,000 km/s",
        },
    ],
    Coding: [
        {
            id: 1,
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
            answer: "Hyper Text Markup Language",
        },
        {
            id: 2,
            question: "Which HTML tag is used to define an internal style sheet?",
            options: ["<script>", "<style>", "<css>", "<link>"],
            answer: "<style>",
        },
        {
            id: 3,
            question: "What is the correct CSS syntax?",
            options: ["body {color: black;}", "{body;color:black;}", "body:color=black;", "{body:color=black;}"],
            answer: "body {color: black;}",
        },
        {
            id: 4,
            question: "How do you write 'Hello World' in an alert box in JavaScript?",
            options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
            answer: "alert('Hello World');",
        },
        {
            id: 5,
            question: "Which operator is used to assign a value to a variable?",
            options: ["*", "-", "=", "x"],
            answer: "=",
        },
        {
            id: 6,
            question: "Is JavaScript case-sensitive?",
            options: ["Yes", "No"],
            answer: "Yes",
        },
        {
            id: 7,
            question: "Which event occurs when the user clicks on an HTML element?",
            options: ["onmouseclick", "onchange", "onclick", "onmouseover"],
            answer: "onclick",
        }
    ],
    Social: [
        {
            id: 1,
            question: "Who was the first President of the USA?",
            options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
            answer: "George Washington",
        },
        {
            id: 2,
            question: "Which continent is known as the 'Dark Continent'?",
            options: ["Asia", "Africa", "South America", "Australia"],
            answer: "Africa",
        },
        {
            id: 3,
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Rome", "Paris"],
            answer: "Paris",
        },
        {
            id: 4,
            question: "In which year did World War II end?",
            options: ["1942", "1945", "1950", "1939"],
            answer: "1945",
        },
        {
            id: 5,
            question: "Which is the largest ocean in the world?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean",
        },
        {
            id: 6,
            question: "Who wrote the Declaration of Independence?",
            options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
            answer: "Thomas Jefferson",
        },
        {
            id: 7,
            question: "What is the longest river in the world?",
            options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            answer: "Nile",
        }
    ],
};
