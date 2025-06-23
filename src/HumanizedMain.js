// Humanized Nexus Realms - A Game That Actually Connects With Players
import { GameEngine } from './engine/GameEngine.js';
import { HumanStoryEngine } from './narrative/HumanStoryEngine.js';
import { HumanizedGameplay } from './gameplay/HumanizedGameplay.js';
import { EconomySystem } from './systems/EconomySystem.js';

class HumanizedNexusRealms {
    constructor() {
        this.engine = new GameEngine();
        this.storyEngine = new HumanStoryEngine();
        this.gameplay = new HumanizedGameplay();
        this.economySystem = new EconomySystem();
        
        // Player's emotional journey
        this.playerJourney = {
            startTime: Date.now(),
            emotionalMoments: [],
            personalGrowth: [],
            memorableChoices: [],
            relationshipEvolution: new Map()
        };

        // Make the game remember the player
        this.playerPersonality = {
            kindness: 50,
            courage: 50,
            wisdom: 50,
            humor: 50,
            stubbornness: 50
        };
    }

    async initialize() {
        console.log('🎭 Initializing Humanized Nexus Realms...');
        console.log('💭 This isn\'t just a game - it\'s an emotional journey.');
        
        await this.engine.initialize();
        await this.createOpeningMoment();
        
        // Start with a moment that hooks the player emotionally
        this.showPersonalizedIntro();
    }

    async createOpeningMoment() {
        // Instead of generic "you wake up in a strange place"
        const openingMoments = [
            {
                text: "You wake up clutching a photo of someone you love. Their face is the last thing you remember from your old life. Now you're... here. Wherever here is.",
                emotion: "longing",
                playerThought: "Who was in that photo? Why can't I remember their name?"
            },
            {
                text: "The first thing you notice isn't the strange realm - it's that your hands are shaking. You've been running from something, but you can't remember what.",
                emotion: "anxiety",
                playerThought: "What was I so afraid of? And why do I still feel like I'm being chased?"
            },
            {
                text: "You find yourself humming a lullaby. Someone used to sing it to you when you were scared. The melody is clear, but their face is just a blur.",
                emotion: "nostalgia",
                playerThought: "Music has a way of carrying memories that words can't hold."
            }
        ];

        const chosenOpening = openingMoments[Math.floor(Math.random() * openingMoments.length)];
        
        return {
            scene: chosenOpening,
            choices: [
                {
                    text: "Try to remember more about your past",
                    consequence: "Painful but important memories surface",
                    personalityImpact: { wisdom: +2, courage: +1 }
                },
                {
                    text: "Focus on the present - the past can wait",
                    consequence: "Practical approach, but memories will resurface later",
                    personalityImpact: { courage: +2, stubbornness: +1 }
                },
                {
                    text: "Look for others who might be lost like you",
                    consequence: "Find companions but avoid dealing with your own issues",
                    personalityImpact: { kindness: +2, avoidance: +1 }
                }
            ]
        };
    }

    showPersonalizedIntro() {
        // Ask the player a few questions to personalize their experience
        const personalQuestions = [
            {
                question: "When you're stressed in real life, what helps you most?",
                options: [
                    { text: "Talking to friends", trait: "social" },
                    { text: "Being alone to think", trait: "introspective" },
                    { text: "Doing something active", trait: "kinesthetic" },
                    { text: "Creative expression", trait: "artistic" }
                ]
            },
            {
                question: "What's your biggest fear about helping others?",
                options: [
                    { text: "Not being good enough", trait: "perfectionist" },
                    { text: "Getting too attached", trait: "protective" },
                    { text: "Being taken advantage of", trait: "cautious" },
                    { text: "Making things worse", trait: "anxious" }
                ]
            }
        ];

        return personalQuestions;
    }

    // Create moments that make players pause and reflect
    createReflectiveMoments() {
        return {
            quiet_campfire: {
                trigger: "After a difficult day",
                setup: "The fire crackles softly. Your companions are quiet, each lost in thought. The weight of the day's choices settles on your shoulders.",
                options: [
                    {
                        text: "Share what's really on your mind",
                        outcome: "Vulnerability creates deeper bonds",
                        realLifeValue: "Opening up strengthens relationships"
                    },
                    {
                        text: "Ask someone else how they're doing",
                        outcome: "Others appreciate being heard",
                        realLifeValue: "Sometimes the best thing you can do is listen"
                    },
                    {
                        text: "Sit quietly and process your feelings",
                        outcome: "Inner peace and clarity",
                        realLifeValue: "Self-reflection is valuable too"
                    }
                ]
            },

            moral_crossroads: {
                trigger: "Before a major decision",
                setup: "You stand at a crossroads - literally and figuratively. The path you choose will define not just your journey, but who you become.",
                internalVoice: "In moments like this, I think about the person I want to be when this is all over.",
                options: [
                    {
                        text: "Choose the path that helps the most people",
                        challenge: "But it might cost you personally",
                        growth: "Learning that leadership means sacrifice"
                    },
                    {
                        text: "Choose the path that keeps your friends safe",
                        challenge: "But strangers might suffer",
                        growth: "Understanding the weight of loyalty"
                    },
                    {
                        text: "Choose the path that feels right to you",
                        challenge: "But others might not understand",
                        growth: "Trusting your moral compass"
                    }
                ]
            }
        };
    }

    // Make NPCs feel like real people with real problems
    createRelatableNPCs() {
        return {
            sarah_the_overwhelmed_mother: {
                background: "Single mom trying to keep her kids safe while the world falls apart",
                realLifeParallel: "Every parent trying to balance protection with letting kids grow",
                dialogue: {
                    first_meeting: "I'm sorry, I don't have time to chat. My youngest has been having nightmares and I haven't slept in days.",
                    after_helping: "You know what the hardest part is? Pretending everything's okay when you're terrified inside.",
                    deep_conversation: "Sometimes I wonder if I'm strong enough for this. But then I look at my kids and somehow... I find a way."
                },
                quest: {
                    surface_level: "Find medicine for sick child",
                    deeper_meaning: "Help a parent cope with feeling helpless",
                    real_reward: "Understanding that strength isn't about not being afraid"
                }
            },

            tom_the_former_soldier: {
                background: "Veteran struggling with PTSD and survivor's guilt",
                realLifeParallel: "Anyone dealing with trauma and trying to reintegrate",
                dialogue: {
                    guarded: "I'm fine. Don't need any help. *hands shake slightly*",
                    opening_up: "You ever have dreams where you're back there? Where you could have saved them if you'd just been faster?",
                    healing: "Talking about it... it doesn't make it go away. But it makes it feel less heavy."
                },
                quest: {
                    surface_level: "Help clear out dangerous creatures",
                    deeper_meaning: "Help someone face their demons",
                    real_reward: "Learning that healing isn't linear"
                }
            }
        };
    }

    // Choices that mirror real-life dilemmas
    createMeaningfulChoices() {
        return {
            the_exhausted_helper: {
                situation: "You've been helping everyone who asks. You're exhausted, but more people keep coming with problems.",
                realLifeParallel: "Burnout from always saying yes",
                options: [
                    {
                        text: "Keep helping everyone - they need you",
                        shortTerm: "People are grateful",
                        longTerm: "You burn out and can't help anyone effectively",
                        lesson: "You can't pour from an empty cup"
                    },
                    {
                        text: "Take a break to recharge",
                        shortTerm: "Some people are disappointed",
                        longTerm: "You're more effective and sustainable",
                        lesson: "Self-care enables better care for others"
                    },
                    {
                        text: "Teach others to solve their own problems",
                        shortTerm: "More work upfront",
                        longTerm: "Community becomes self-sufficient",
                        lesson: "Empowerment is better than dependency"
                    }
                ]
            },

            the_difficult_truth: {
                situation: "Your friend is making a mistake that will hurt them, but they don't want to hear it.",
                realLifeParallel: "When to speak up vs. when to let people learn",
                options: [
                    {
                        text: "Tell them the hard truth",
                        risk: "They might get angry and push you away",
                        reward: "They might thank you later",
                        lesson: "Sometimes love means difficult conversations"
                    },
                    {
                        text: "Support them through the consequences",
                        risk: "Watching them get hurt",
                        reward: "They know you're there for them",
                        lesson: "Sometimes the best support is presence, not advice"
                    },
                    {
                        text: "Find a gentle way to guide them",
                        risk: "They might not get the message",
                        reward: "Preserves relationship while offering help",
                        lesson: "Wisdom is knowing how to deliver truth with love"
                    }
                ]
            }
        };
    }

    // Track emotional journey and provide insights
    trackEmotionalJourney(choice, outcome) {
        const moment = {
            timestamp: Date.now(),
            choice: choice,
            outcome: outcome,
            emotionalState: this.getCurrentEmotionalState(),
            personalGrowth: this.calculateGrowthFromChoice(choice)
        };

        this.playerJourney.emotionalMoments.push(moment);
        
        // Provide reflection after significant moments
        if (moment.personalGrowth.total > 5) {
            return this.generatePersonalReflection(moment);
        }
    }

    generatePersonalReflection(moment) {
        const reflections = {
            courage_growth: "You're becoming braver. Not fearless - brave. There's a difference.",
            wisdom_growth: "You're learning that the right choice isn't always the easy choice.",
            kindness_growth: "Your compassion is becoming a strength, not a weakness.",
            resilience_growth: "You're learning to bend without breaking."
        };

        const dominantGrowth = Object.keys(moment.personalGrowth)
            .reduce((a, b) => moment.personalGrowth[a] > moment.personalGrowth[b] ? a : b);

        return {
            reflection: reflections[dominantGrowth + '_growth'],
            insight: this.generatePersonalInsight(dominantGrowth),
            encouragement: this.generateEncouragement()
        };
    }

    generatePersonalInsight(growthArea) {
        const insights = {
            courage: "Courage isn't about not being afraid. It's about doing what's right despite the fear.",
            wisdom: "Wisdom comes from making mistakes and learning from them, not from being perfect.",
            kindness: "Being kind doesn't make you weak. It makes you strong enough to choose love over fear.",
            resilience: "You're more resilient than you think. Every challenge you've overcome proves it."
        };

        return insights[growthArea];
    }

    generateEncouragement() {
        const encouragements = [
            "You're growing into someone you can be proud of.",
            "The person you're becoming is worth the journey.",
            "Your choices matter, and you're making good ones.",
            "You're learning what it means to be truly strong."
        ];

        return encouragements[Math.floor(Math.random() * encouragements.length)];
    }

    // Create endings that feel personally meaningful
    createPersonalizedEndings() {
        const playerGrowth = this.calculateOverallGrowth();
        const dominantTrait = this.getDominantPersonalityTrait();
        const memorableChoices = this.getMostImpactfulChoices();

        return {
            the_teacher_ending: {
                condition: "High wisdom growth + helped others learn",
                description: "You realize your greatest power wasn't magic or strength - it was helping others discover their own.",
                personalMessage: `You started this journey looking for answers. You found something better: the wisdom to help others find their own answers.`,
                realLifeApplication: "Leadership through empowerment"
            },

            the_healer_ending: {
                condition: "High empathy + consistent kindness",
                description: "You didn't just heal bodies - you healed hearts, communities, and hope itself.",
                personalMessage: `Your compassion became a force that changed the world. Not through power, but through love.`,
                realLifeApplication: "The ripple effects of genuine care"
            },

            the_guardian_ending: {
                condition: "High courage + protected others",
                description: "You became the shield that others could stand behind, not through strength alone, but through unwavering commitment.",
                personalMessage: `You learned that true strength isn't about what you can destroy, but what you can protect.`,
                realLifeApplication: "Courage in service of others"
            },

            the_balanced_ending: {
                condition: "Balanced growth across all areas",
                description: "You found harmony - not perfection, but the wisdom to know when to be strong, when to be gentle, when to lead, and when to follow.",
                personalMessage: `You didn't become perfect. You became whole. And that's more powerful than perfection ever could be.`,
                realLifeApplication: "Integration and balance in life"
            }
        };
    }

    // Make the game remember and reference the player's journey
    createPersonalizedFarewell() {
        const journey = this.playerJourney;
        const growth = this.calculateOverallGrowth();
        const relationships = Array.from(this.playerJourney.relationshipEvolution.entries());

        return {
            personalReflection: `When you started this journey ${this.getTimeSinceStart()} ago, you were searching for something. Looking back now, what you found was yourself.`,
            
            growthSummary: `You grew in ways that matter: ${this.summarizeGrowth(growth)}`,
            
            relationshipSummary: `The connections you made changed you: ${this.summarizeRelationships(relationships)}`,
            
            finalMessage: `This story ends, but the person you've become continues. The choices you made here - the compassion, the courage, the wisdom - those are yours to keep.`,
            
            realLifeConnection: `Take what you've learned about yourself in this world and carry it into the real one. You're stronger, kinder, and wiser than when you started.`
        };
    }

    // Helper methods
    getCurrentEmotionalState() {
        return {
            stress: this.gameplay.playerStress,
            confidence: this.playerPersonality.courage,
            empathy: this.playerPersonality.kindness,
            wisdom: this.playerPersonality.wisdom
        };
    }

    calculateGrowthFromChoice(choice) {
        // Implementation would calculate how choice affects personal growth
        return { courage: 1, wisdom: 1, kindness: 1, total: 3 };
    }

    getTimeSinceStart() {
        const elapsed = Date.now() - this.playerJourney.startTime;
        const minutes = Math.floor(elapsed / 60000);
        if (minutes < 60) return `${minutes} minutes`;
        const hours = Math.floor(minutes / 60);
        return `${hours} hours and ${minutes % 60} minutes`;
    }

    summarizeGrowth(growth) {
        // Implementation would create personalized growth summary
        return "You learned to balance strength with compassion, and wisdom with action.";
    }

    summarizeRelationships(relationships) {
        // Implementation would summarize relationship evolution
        return "You learned that true friendship is built on understanding, not agreement.";
    }
}

export default HumanizedNexusRealms;
