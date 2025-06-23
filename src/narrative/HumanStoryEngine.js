// Human-Like Story Engine - Making Players Actually Care
export class HumanStoryEngine {
    constructor() {
        this.playerEmotions = {
            stress: 0,
            attachment: new Map(), // How much player cares about each character
            guilt: 0,
            hope: 0,
            fear: 0
        };
        
        this.realLifeParallels = this.initializeRealLifeConnections();
        this.moralDilemmas = this.createMoralDilemmas();
        this.currentStoryBeat = 'opening';
    }

    initializeRealLifeConnections() {
        return {
            // Stories that mirror real human experiences
            family_loss: {
                trigger: "Elena mentions losing her sister",
                playerThought: "This reminds me of losing someone close...",
                emotionalWeight: 8,
                dialogue: "I... I couldn't save her. She was so young, and I had all this power, but it wasn't enough."
            },
            
            workplace_betrayal: {
                trigger: "Marcus talks about failing his duty",
                playerThought: "We've all felt like we let people down...",
                emotionalWeight: 7,
                dialogue: "Everyone trusted me. I was supposed to protect them. Now they're all gone because I hesitated."
            },
            
            mental_health: {
                trigger: "Zara struggles with reality",
                playerThought: "Sometimes reality feels overwhelming...",
                emotionalWeight: 9,
                dialogue: "Some days I can't tell what's real anymore. The voices, the visions... am I going insane?"
            },
            
            imposter_syndrome: {
                trigger: "Player gains power/responsibility",
                playerThought: "Do I really deserve this? Am I good enough?",
                emotionalWeight: 6,
                dialogue: "Why are you all looking to me? I don't know what I'm doing either."
            }
        };
    }

    createMoralDilemmas() {
        return {
            the_crying_child: {
                setup: "You find a child crying over their dead parent. You have one healing potion left, but the parent has been dead for hours. The child begs you to 'fix mommy'.",
                choices: [
                    {
                        text: "Use the potion anyway, knowing it won't work",
                        consequence: "Child learns harsh truth but you waste precious resources",
                        playerFeeling: "guilt + compassion",
                        npcReaction: "Elena: 'Sometimes kindness means sharing someone's pain, not fixing it.'"
                    },
                    {
                        text: "Gently explain death to the child",
                        consequence: "Child is devastated but learns to cope",
                        playerFeeling: "responsibility + sadness",
                        npcReaction: "Marcus: 'Hard truths build stronger people. You did right.'"
                    },
                    {
                        text: "Leave quietly to avoid the situation",
                        consequence: "Child remains alone with false hope",
                        playerFeeling: "cowardice + relief",
                        npcReaction: "Zara: 'Running from pain doesn't make it disappear.'"
                    }
                ]
            },

            the_starving_thief: {
                setup: "A desperate mother steals bread for her sick child. The baker demands justice - his family is also struggling. Both families will suffer no matter what you choose.",
                choices: [
                    {
                        text: "Pay for the bread yourself",
                        consequence: "Both families helped, but you enable future theft",
                        playerFeeling: "satisfaction + worry",
                        longTermEffect: "More people start expecting you to solve their problems"
                    },
                    {
                        text: "Make the mother work for the baker",
                        consequence: "Fair solution but the child suffers while mother works",
                        playerFeeling: "justice + concern",
                        longTermEffect: "Community learns to solve problems together"
                    },
                    {
                        text: "Ignore the situation",
                        consequence: "Natural consequences play out without your interference",
                        playerFeeling: "detachment + curiosity",
                        longTermEffect: "People stop bringing you their problems"
                    }
                ]
            }
        };
    }

    // Make choices feel weighty and personal
    presentChoice(dilemmaId) {
        const dilemma = this.moralDilemmas[dilemmaId];
        if (!dilemma) return null;

        // Add personal stakes
        const personalStakes = this.calculatePersonalStakes(dilemma);
        
        // Show what the player character is thinking
        const internalMonologue = this.generateInternalMonologue(dilemma);
        
        return {
            situation: dilemma.setup,
            internalThoughts: internalMonologue,
            personalStakes: personalStakes,
            choices: dilemma.choices.map(choice => ({
                ...choice,
                emotionalPreview: this.previewEmotionalImpact(choice),
                characterReactions: this.predictCharacterReactions(choice)
            })),
            timeLimit: 30000, // 30 seconds to decide - pressure makes it real
            backgroundMusic: 'tense_decision'
        };
    }

    generateInternalMonologue(dilemma) {
        const thoughts = [
            "What would I do in real life?",
            "There's no perfect answer here...",
            "Someone's going to get hurt no matter what I choose.",
            "I wish I could save everyone.",
            "This reminds me of times I've had to make hard choices.",
            "What kind of person does this make me?"
        ];
        
        return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    calculatePersonalStakes(dilemma) {
        return {
            reputation: "Your reputation in the community will be affected",
            relationships: "Your companions are watching how you handle this",
            selfImage: "This choice will shape how you see yourself",
            futureOptions: "This decision will open or close future paths"
        };
    }

    // Make consequences feel real and lasting
    processChoiceConsequences(choiceId, dilemmaId) {
        const choice = this.moralDilemmas[dilemmaId].choices.find(c => c.text === choiceId);
        if (!choice) return;

        // Immediate emotional impact
        this.updatePlayerEmotions(choice.playerFeeling);
        
        // Character relationship changes
        this.processCharacterReactions(choice);
        
        // Long-term world changes
        this.applyLongTermConsequences(choice);
        
        // Player reflection moment
        return this.createReflectionMoment(choice);
    }

    updatePlayerEmotions(feelingString) {
        const feelings = feelingString.split(' + ');
        
        feelings.forEach(feeling => {
            switch(feeling) {
                case 'guilt':
                    this.playerEmotions.guilt += 10;
                    break;
                case 'compassion':
                    this.playerEmotions.hope += 5;
                    break;
                case 'cowardice':
                    this.playerEmotions.stress += 15;
                    break;
                case 'responsibility':
                    this.playerEmotions.stress += 5;
                    this.playerEmotions.hope += 5;
                    break;
            }
        });
    }

    createReflectionMoment(choice) {
        const reflections = {
            high_guilt: [
                "You lie awake that night, replaying the moment over and over.",
                "The look in their eyes haunts you.",
                "You wonder if you're becoming someone you don't recognize."
            ],
            high_hope: [
                "For the first time in a while, you feel like you made a difference.",
                "Maybe there is still good in this world worth fighting for.",
                "You sleep peacefully, knowing you stayed true to yourself."
            ],
            high_stress: [
                "Your hands shake slightly as you walk away.",
                "The weight of responsibility feels heavier than ever.",
                "You question whether you're strong enough for this journey."
            ]
        };

        let dominantEmotion = 'neutral';
        if (this.playerEmotions.guilt > 50) dominantEmotion = 'high_guilt';
        else if (this.playerEmotions.hope > 50) dominantEmotion = 'high_hope';
        else if (this.playerEmotions.stress > 50) dominantEmotion = 'high_stress';

        const reflectionOptions = reflections[dominantEmotion] || ["You continue on your journey, changed by the experience."];
        
        return {
            reflection: reflectionOptions[Math.floor(Math.random() * reflectionOptions.length)],
            emotionalState: dominantEmotion,
            characterGrowth: this.calculateCharacterGrowth()
        };
    }

    // Characters remember and bring up past choices
    generateContextualDialogue(characterId, currentSituation) {
        const character = this.getCharacter(characterId);
        const pastChoices = this.getRelevantPastChoices(currentSituation);
        
        if (pastChoices.length === 0) {
            return this.getStandardDialogue(characterId, currentSituation);
        }

        // Reference past choices in dialogue
        const referencedChoice = pastChoices[0];
        
        const contextualDialogues = {
            elena: {
                remembers_kindness: "You showed such compassion with that child. I see the same gentleness in your eyes now.",
                remembers_harshness: "You were so cold before... I hope you've learned that people need more than just hard truths.",
                remembers_avoidance: "You walked away last time. Will you stay and face this with me?"
            },
            marcus: {
                remembers_courage: "You stood up for what was right before. I knew I could count on you.",
                remembers_cowardice: "You hesitated when people needed you. Don't make the same mistake twice.",
                remembers_justice: "Your sense of justice impressed me. We need more of that in this world."
            }
        };

        return contextualDialogues[characterId]?.[referencedChoice.type] || this.getStandardDialogue(characterId, currentSituation);
    }

    // Make the world feel alive and reactive
    getWorldReaction(playerActions) {
        const reputation = this.calculateReputation(playerActions);
        
        const worldStates = {
            hero: {
                npcBehavior: "People light up when they see you coming",
                shopPrices: "Merchants offer you discounts",
                questAvailability: "People seek you out with their problems",
                ambiance: "Children wave at you in the streets"
            },
            villain: {
                npcBehavior: "People cross the street to avoid you",
                shopPrices: "Merchants charge you extra out of fear",
                questAvailability: "Only desperate people approach you",
                ambiance: "Mothers pull their children inside when you pass"
            },
            unknown: {
                npcBehavior: "People are curious but cautious",
                shopPrices: "Standard prices, no special treatment",
                questAvailability: "You have to seek out opportunities",
                ambiance: "Life goes on around you, indifferent to your presence"
            }
        };

        return worldStates[reputation] || worldStates.unknown;
    }

    // Create moments that make players pause and think
    createQuietMoments() {
        return {
            campfire_reflection: {
                trigger: "After a difficult day",
                scene: "You sit by the campfire, watching the flames dance. Your companions are quiet, each lost in their own thoughts.",
                options: [
                    "Ask Elena about her sister",
                    "Share a story from your past",
                    "Sit in comfortable silence",
                    "Wonder aloud about the meaning of your journey"
                ],
                purpose: "Let players process recent events and connect with characters"
            },
            
            sunrise_moment: {
                trigger: "After making a major choice",
                scene: "You wake before dawn and step outside. The world is quiet, painted in soft colors of early morning.",
                internalThought: "In moments like this, everything feels possible. Or maybe that's just the calm before the storm.",
                purpose: "Give players space to reflect on their journey"
            },
            
            letter_from_home: {
                trigger: "Random event",
                scene: "A messenger finds you with a letter from someone in your past life.",
                content: "The letter is from someone who knew you before this journey began. They ask how you're doing, if you're still the same person they remember.",
                choice: "How do you respond?",
                purpose: "Make players think about how they've changed"
            }
        };
    }
}

// Helper functions
function getCharacter(characterId) {
    // Implementation would return character data
    return { id: characterId, name: characterId };
}

function getRelevantPastChoices(situation) {
    // Implementation would return past choices relevant to current situation
    return [];
}

function getStandardDialogue(characterId, situation) {
    // Implementation would return standard dialogue
    return "Standard dialogue for " + characterId;
}

function calculateReputation(actions) {
    // Implementation would calculate player's reputation
    return "unknown";
}

function calculateCharacterGrowth() {
    // Implementation would track how player character has grown
    return { wisdom: 1, empathy: 1, courage: 0 };
}
