// Humanized Gameplay - Making Every Action Feel Meaningful
export class HumanizedGameplay {
    constructor() {
        this.playerStress = 0;
        this.mentalHealth = 100;
        this.socialBattery = 100;
        this.personalGrowth = {
            confidence: 50,
            empathy: 50,
            wisdom: 50,
            resilience: 50
        };
        
        this.realWorldSkills = this.initializeRealWorldSkills();
        this.humanMoments = this.createHumanMoments();
    }

    initializeRealWorldSkills() {
        return {
            // Skills that mirror real life
            active_listening: {
                description: "Really hearing what NPCs are saying",
                realLifeValue: "Better relationships and understanding",
                gameEffect: "NPCs reveal more information and trust you more",
                levelUpActions: ["Ask follow-up questions", "Remember personal details", "Show genuine interest"]
            },
            
            emotional_intelligence: {
                description: "Reading people's emotions and responding appropriately",
                realLifeValue: "Stronger personal and professional relationships",
                gameEffect: "Predict NPC reactions, defuse conflicts, inspire others",
                levelUpActions: ["Notice body language", "Validate feelings", "Respond with empathy"]
            },
            
            stress_management: {
                description: "Staying calm under pressure",
                realLifeValue: "Better decision-making in difficult situations",
                gameEffect: "Maintain accuracy in combat, think clearly during crises",
                levelUpActions: ["Take breaks", "Practice breathing", "Find healthy outlets"]
            },
            
            boundary_setting: {
                description: "Knowing when to say no",
                realLifeValue: "Protecting your mental health and time",
                gameEffect: "Avoid burnout, maintain energy for important quests",
                levelUpActions: ["Decline unreasonable requests", "Prioritize self-care", "Communicate limits clearly"]
            }
        };
    }

    createHumanMoments() {
        return {
            // Moments that feel authentically human
            overwhelmed_by_requests: {
                trigger: "Too many people asking for help",
                description: "Everyone wants something from you. The baker needs protection, the healer needs herbs, children want you to find their lost pet. You feel the weight of everyone's expectations.",
                options: [
                    {
                        text: "Try to help everyone (Burnout risk)",
                        consequence: "Stress increases, quality of help decreases",
                        realLifeLesson: "You can't pour from an empty cup"
                    },
                    {
                        text: "Prioritize the most urgent needs",
                        consequence: "Some people disappointed but important issues resolved",
                        realLifeLesson: "Triage is a life skill"
                    },
                    {
                        text: "Take a day to rest and recharge",
                        consequence: "Short-term guilt but better long-term effectiveness",
                        realLifeLesson: "Self-care isn't selfish"
                    }
                ]
            },

            imposter_syndrome_moment: {
                trigger: "Being praised as a hero",
                description: "People call you a hero, but you remember every mistake, every person you couldn't save. Do you really deserve this praise?",
                internalThought: "They see someone confident and capable. If only they knew how often I doubt myself.",
                options: [
                    {
                        text: "Accept the praise gracefully",
                        consequence: "Confidence grows, but pressure increases",
                        growth: { confidence: +5, stress: +3 }
                    },
                    {
                        text: "Deflect and share credit with others",
                        consequence: "Team morale improves, humility recognized",
                        growth: { empathy: +3, wisdom: +2 }
                    },
                    {
                        text: "Express your doubts honestly",
                        consequence: "People appreciate your vulnerability",
                        growth: { authenticity: +5, connection: +3 }
                    }
                ]
            },

            social_battery_depleted: {
                trigger: "After many social interactions",
                description: "You've been 'on' all day - helping, listening, being strong for others. You feel emotionally drained and need space.",
                physicalSigns: "Your responses are getting shorter, you're avoiding eye contact, everything feels like effort.",
                options: [
                    {
                        text: "Find a quiet place to be alone",
                        consequence: "Energy slowly restores, but people might think you're upset",
                        mechanicEffect: "Social battery recharges faster"
                    },
                    {
                        text: "Push through and keep socializing",
                        consequence: "Risk of snapping at someone or making poor decisions",
                        mechanicEffect: "Dialogue options become more limited and harsh"
                    },
                    {
                        text: "Explain that you need a break",
                        consequence: "Most people understand, relationships actually strengthen",
                        mechanicEffect: "NPCs respect your boundaries and check on you later"
                    }
                ]
            }
        };
    }

    // Combat that reflects real conflict resolution
    createRealisticCombat() {
        return {
            // Most conflicts aren't solved by violence
            conflict_resolution: {
                verbal_deescalation: {
                    description: "Try to calm the situation with words",
                    success_factors: ["Active listening skill", "Understanding the root cause", "Showing empathy"],
                    outcomes: {
                        success: "Conflict resolved, relationships improved, no one hurt",
                        partial: "Tension reduced but underlying issues remain",
                        failure: "Situation escalates, violence becomes more likely"
                    }
                },
                
                finding_common_ground: {
                    description: "Look for shared interests or values",
                    success_factors: ["Emotional intelligence", "Past relationship with parties", "Understanding motivations"],
                    outcomes: {
                        success: "Former enemies become allies",
                        partial: "Temporary truce established",
                        failure: "Differences seem irreconcilable"
                    }
                },
                
                strategic_retreat: {
                    description: "Sometimes walking away is the wisest choice",
                    success_factors: ["Recognizing when you're outmatched", "Swallowing pride", "Thinking long-term"],
                    outcomes: {
                        success: "Live to fight another day, reputation for wisdom",
                        partial: "Seen as cowardly by some, wise by others",
                        failure: "Enemies pursue, situation worsens"
                    }
                }
            },

            // When violence is necessary, make it feel weighty
            necessary_violence: {
                pre_combat_hesitation: "Your hand trembles as you draw your weapon. Is there really no other way?",
                during_combat_thoughts: [
                    "This person has a family too...",
                    "How did it come to this?",
                    "I just want this to be over."
                ],
                post_combat_reflection: "You stand over your fallen enemy, feeling no triumph. Just sadness that it came to this.",
                long_term_effects: {
                    trauma: "Nightmares about the fight",
                    growth: "Better understanding of the cost of violence",
                    relationships: "Some companions respect your strength, others worry about you"
                }
            }
        };
    }

    // Economy that mirrors real financial struggles
    createRelatableEconomy() {
        return {
            // Money decisions that feel real
            financial_dilemmas: {
                unexpected_expense: {
                    situation: "Your armor breaks right before a dangerous quest. Repairs cost most of your savings.",
                    options: [
                        {
                            text: "Pay for quality repairs",
                            consequence: "Safe but broke, stress about future expenses",
                            realLifeParallel: "Paying for car repairs when money's tight"
                        },
                        {
                            text: "Get cheap repairs",
                            consequence: "Risk of equipment failure at crucial moment",
                            realLifeParallel: "Choosing the cheaper option and hoping it holds up"
                        },
                        {
                            text: "Try to fix it yourself",
                            consequence: "Might work, might make it worse",
                            realLifeParallel: "YouTube tutorials and crossed fingers"
                        }
                    ]
                },

                helping_vs_saving: {
                    situation: "A family asks for money to buy medicine for their sick child. You're saving for better equipment.",
                    emotional_weight: "The child reminds you of someone you care about",
                    options: [
                        {
                            text: "Give them the money",
                            consequence: "Child gets medicine, your quest becomes harder",
                            feeling: "Warm but worried about your own future"
                        },
                        {
                            text: "Offer to earn the money for them",
                            consequence: "Takes time but everyone benefits",
                            feeling: "Responsible but stretched thin"
                        },
                        {
                            text: "Explain you can't afford it",
                            consequence: "Guilt but financial security maintained",
                            feeling: "Practical but haunted by the choice"
                        }
                    ]
                }
            },

            // Investment decisions with real emotional stakes
            investment_psychology: {
                fear_of_missing_out: "Everyone's talking about investing in the new trade route. What if you miss out?",
                loss_aversion: "Your investment is down 30%. Cut losses or hold on hoping it recovers?",
                emotional_spending: "You're stressed and that shiny new sword would make you feel better...",
                delayed_gratification: "Save for the expensive but durable equipment, or buy the cheaper version now?"
            }
        };
    }

    // Relationships that develop like real friendships
    createAuthenticRelationships() {
        return {
            relationship_stages: {
                strangers: {
                    interactions: ["Polite small talk", "Cautious cooperation", "Testing boundaries"],
                    trust_level: 0-20,
                    dialogue_style: "Formal, surface-level"
                },
                
                acquaintances: {
                    interactions: ["Sharing basic personal info", "Asking for small favors", "Light teasing"],
                    trust_level: 21-40,
                    dialogue_style: "More relaxed, some humor"
                },
                
                friends: {
                    interactions: ["Sharing deeper thoughts", "Supporting each other", "Inside jokes"],
                    trust_level: 41-70,
                    dialogue_style: "Comfortable, honest, supportive"
                },
                
                close_friends: {
                    interactions: ["Vulnerable conversations", "Calling out bad behavior", "Unconditional support"],
                    trust_level: 71-90,
                    dialogue_style: "Direct, caring, sometimes challenging"
                },
                
                family_bond: {
                    interactions: ["Would die for each other", "Brutal honesty", "Shared identity"],
                    trust_level: 91-100,
                    dialogue_style: "Shorthand communication, deep understanding"
                }
            },

            // Realistic relationship challenges
            relationship_conflicts: {
                misunderstanding: {
                    cause: "Poor communication or assumptions",
                    resolution: "Active listening and clarification",
                    growth_opportunity: "Better communication skills"
                },
                
                different_values: {
                    cause: "Fundamental disagreement on important issue",
                    resolution: "Agree to disagree or find compromise",
                    growth_opportunity: "Learning to respect differences"
                },
                
                betrayal_of_trust: {
                    cause: "Someone breaks a promise or reveals a secret",
                    resolution: "Difficult conversation and rebuilding trust",
                    growth_opportunity: "Understanding forgiveness and boundaries"
                }
            }
        };
    }

    // Personal growth that mirrors real development
    trackPersonalGrowth(action, context) {
        const growthOpportunities = {
            // Confidence grows through facing fears
            facing_fear: {
                trigger: "Doing something despite being scared",
                growth: { confidence: +3, resilience: +2 },
                reflection: "You realize you're braver than you thought"
            },
            
            // Empathy grows through understanding others
            understanding_perspective: {
                trigger: "Really listening to someone's story",
                growth: { empathy: +2, wisdom: +1 },
                reflection: "Everyone has struggles you can't see"
            },
            
            // Wisdom grows through making mistakes
            learning_from_failure: {
                trigger: "Reflecting on a poor decision",
                growth: { wisdom: +3, humility: +2 },
                reflection: "Failure is a teacher, not an enemy"
            },
            
            // Resilience grows through overcoming challenges
            bouncing_back: {
                trigger: "Recovering from setback",
                growth: { resilience: +2, confidence: +1 },
                reflection: "You're stronger than you knew"
            }
        };

        const opportunity = growthOpportunities[action];
        if (opportunity) {
            this.applyGrowth(opportunity.growth);
            return opportunity.reflection;
        }
    }

    applyGrowth(growthMap) {
        Object.entries(growthMap).forEach(([trait, amount]) => {
            if (this.personalGrowth[trait] !== undefined) {
                this.personalGrowth[trait] = Math.min(100, this.personalGrowth[trait] + amount);
            }
        });
    }

    // Make choices feel consequential beyond the game
    createLifeLessons() {
        return {
            lessons_learned: {
                "You can't save everyone": {
                    game_context: "Failed to help every NPC in need",
                    real_life_application: "Learning healthy boundaries and self-care",
                    emotional_impact: "Guilt transforms into wisdom"
                },
                
                "Kindness is a strength, not weakness": {
                    game_context: "Choosing compassion over aggression",
                    real_life_application: "Empathy in personal and professional relationships",
                    emotional_impact: "Pride in staying true to values"
                },
                
                "Growth comes from discomfort": {
                    game_context: "Choosing difficult but right path",
                    real_life_application: "Embracing challenges as opportunities",
                    emotional_impact: "Confidence in facing future difficulties"
                },
                
                "Everyone has a story": {
                    game_context: "Learning about 'enemy' motivations",
                    real_life_application: "Approaching conflicts with curiosity instead of judgment",
                    emotional_impact: "Increased empathy and understanding"
                }
            }
        };
    }
}
