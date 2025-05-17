import React, { createContext, useState, useContext } from 'react';

const TutorialContext = createContext();

export const TutorialProvider = ({ children }) => {
    const [tutorialStep, setTutorialStep] = useState(0);
    const [showTutorial, setShowTutorial] = useState(false);

    const tutorialSteps = [
        {
            title: "This is our Home Page",
            description: "Come here if you get lost!",
        },
        {
            title: "This is your Library",
            description: "This place is full of stories!",
        },
        {
            title: "Welcome to Activities",
            description: "Use this to track your health!",
        },
        {
            title: "Link Center",
            description: "All about Square One!",
        },
        {
            title: "Welcome to Your Account",
            description: "This is where your profile is!",
        },
        {
            title: "Personal Data",
            description: "All your personal information!",
        },
        {
            title: "Streaks",
            description: "This is a streak! It counts how many days you have used SquareOne!",
        },
        {
            title: "Hearts",
            description: "These are your hearts. It counts how many lives you have left!",
        },
        {
            title: "Diamonds",
            description: "These are your diamonds! You earn these when you practice good habits!",
        },
        {
            title: "Settings",
            description: "This is your settings!",
        },
        
    ];

    return (
        <TutorialContext.Provider value={{
            tutorialStep, setTutorialStep, showTutorial, setShowTutorial, tutorialSteps }}>

            {children}

        </TutorialContext.Provider>
    )


};

export const useTutorial = () => useContext(TutorialContext);
