// Emotional Intelligence Engine - Making NPCs Feel Human
export class EmotionalEngine {
    constructor() {
        this.emotionalStates = new Map();
        this.memories = new Map();
        this.relationships = new Map();
        this.personalityTypes = this.initializePersonalities();
        this.currentMood = 'neutral';
        this.traumaSystem = new TraumaSystem();
        this.empathyLevel = 50;
    }

    initializePersonalities() {
        return {
            elena: {
                coreTraits: ['compassionate', 'stubborn', 'protective'],
                fears: ['losing_loved_ones', 'being_powerless', 'darkness'],
                desires: ['healing_the_world', 'finding_peace', 'redemption'],
                triggers: ['seeing_suffering', 'mentions_of_war', 'children_in_danger'],
                backstory: {
                    childhood: 'Grew up in a war-torn village, lost parents to plague',
                    trauma: 'Watched helplessly as her healing magic failed to save her sister',
                    motivation: 'Never wants anyone to feel the helplessness she felt',
                    secret: 'Sometimes doubts if her healing actually helps or just prolongs suffering'
                },
                speechPatterns: {
                    nervous: ['I... I hope this works', 'Maybe we should be careful?'],
                    angry: ['This is wrong!', 'I won\'t let this happen again!'],
                    sad: ['I\'ve seen too much pain...', 'Sometimes I wonder if it\'s worth it'],
                    happy: ['There\'s always hope!', 'Together we can heal this world']
                }
            },
            
            marcus: {
                coreTraits: ['honorable', 'guilt-ridden', 'loyal'],
                fears: ['failing_again', 'dishonor', 'being_alone'],
                desires: ['redemption', 'proving_worth', 'protecting_innocents'],
                triggers: ['mentions_of_betrayal', 'cowardice', 'abandoned_duties'],
                backstory: {
                    childhood: 'Noble family, trained from birth to be a knight',
                    trauma: 'Failed to protect his lord, entire kingdom fell because of his mistake',
                    motivation: 'Seeking a chance to prove he\'s not the coward he believes he is',
                    secret: 'The "mistake" wasn\'t his fault, but he can\'t forgive himself'
                },
                speechPatterns: {
                    guilty: ['I should have...', 'If only I had been stronger'],
                    determined: ['I won\'t fail again!', 'On my honor, I swear it'],
                    vulnerable: ['Sometimes I wonder if I deserve redemption'],
                    protective: ['Stand behind me', 'I\'ll handle this']
                }
            },

            zara: {
                coreTraits: ['mysterious', 'wise', 'lonely'],
                fears: ['losing_her_mind', 'the_void', 'being_truly_understood'],
                desires: ['understanding_reality', 'connection', 'preventing_catastrophe'],
                triggers: ['reality_distortions', 'mentions_of_madness', 'cosmic_horror'],
                backstory: {
                    childhood: 'Born with the ability to see between dimensions',
                    trauma: 'Witnessed the destruction of her home reality',
                    motivation: 'Trying to prevent the same fate from befalling this world',
                    secret: 'She\'s not from this reality and is slowly fading away'
                },
                speechPatterns: {
                    cryptic: ['The threads of fate are tangled...', 'I see what others cannot'],
                    concerned: ['The barriers grow thin', 'Something stirs in the void'],
                    caring: ['You matter more than you know', 'Your choices echo across realities'],
                    desperate: ['Time is running out!', 'You must understand!']
                }
            }
        };
    }

    // Dynamic emotional responses based on player actions
    processEmotionalEvent(characterId, event, context) {
        const character = this.personalityTypes[characterId];
        if (!character) return null;

        const currentEmotion = this.emotionalStates.get(characterId) || 'neutral';
        const memory = this.createMemory(event, context, currentEmotion);
        
        // Store the memory
        if (!this.memories.has(characterId)) {
            this.memories.set(characterId, []);
        }
        this.memories.get(characterId).push(memory);

        // Calculate emotional response
        const newEmotion = this.calculateEmotionalResponse(character, event, currentEmotion);
        this.emotionalStates.set(characterId, newEmotion);

        // Generate contextual dialogue
        const dialogue = this.generateEmotionalDialogue(character, newEmotion, event);

        return {
            emotion: newEmotion,
            dialogue: dialogue,
            memory: memory,
            relationshipChange: this.calculateRelationshipChange(characterId, event)
        };
    }

    calculateEmotionalResponse(character, event, currentEmotion) {
        let emotionalIntensity = 0;
        let dominantEmotion = currentEmotion;

        // Check if event triggers character's fears or desires
        if (character.triggers.some(trigger => event.type.includes(trigger))) {
            emotionalIntensity += 3;
            
            if (character.fears.some(fear => event.type.includes(fear))) {
                dominantEmotion = this.blendEmotions(dominantEmotion, 'fear', 0.7);
            }
        }

        // Check if event aligns with character's desires
        if (character.desires.some(desire => event.outcome.includes(desire))) {
            dominantEmotion = this.blendEmotions(dominantEmotion, 'joy', 0.6);
        }

        // Factor in character's current trauma state
        const traumaLevel = this.traumaSystem.getTraumaLevel(character.id);
        if (traumaLevel > 50) {
            dominantEmotion = this.blendEmotions(dominantEmotion, 'anxiety', 0.3);
        }

        return dominantEmotion;
    }

    generateEmotionalDialogue(character, emotion, event) {
        const speechPatterns = character.speechPatterns[emotion] || character.speechPatterns.neutral;
        const baseDialogue = speechPatterns[Math.floor(Math.random() * speechPatterns.length)];
        
        // Add contextual elements based on the event
        const contextualElements = this.getContextualElements(character, event);
        
        return {
            text: baseDialogue,
            emotion: emotion,
            context: contextualElements,
            bodyLanguage: this.getBodyLanguage(emotion),
            voiceTone: this.getVoiceTone(emotion)
        };
    }

    getContextualElements(character, event) {
        const elements = [];
        
        // Add personal references based on backstory
        if (event.type === 'combat' && character.backstory.trauma.includes('war')) {
            elements.push('*eyes distant, remembering past battles*');
        }
        
        if (event.type === 'healing' && character.coreTraits.includes('compassionate')) {
            elements.push('*hands glow with gentle warmth*');
        }

        return elements;
    }

    getBodyLanguage(emotion) {
        const bodyLanguageMap = {
            fear: ['*steps back nervously*', '*hands tremble slightly*', '*eyes dart around*'],
            joy: ['*smiles genuinely*', '*stands taller*', '*eyes light up*'],
            anger: ['*clenches fists*', '*jaw tightens*', '*stares intensely*'],
            sadness: ['*shoulders slump*', '*looks away*', '*voice wavers*'],
            anxiety: ['*fidgets with hands*', '*breathing quickens*', '*can\'t stay still*']
        };
        
        const options = bodyLanguageMap[emotion] || ['*maintains composure*'];
        return options[Math.floor(Math.random() * options.length)];
    }

    getVoiceTone(emotion) {
        const toneMap = {
            fear: 'whispered',
            joy: 'warm',
            anger: 'sharp',
            sadness: 'quiet',
            anxiety: 'hurried',
            neutral: 'steady'
        };
        
        return toneMap[emotion] || 'steady';
    }

    // Memory system that affects future interactions
    createMemory(event, context, emotion) {
        return {
            id: Date.now(),
            event: event,
            context: context,
            emotion: emotion,
            timestamp: Date.now(),
            importance: this.calculateMemoryImportance(event, emotion),
            fadeRate: this.calculateFadeRate(event, emotion)
        };
    }

    calculateMemoryImportance(event, emotion) {
        let importance = 1;
        
        // Traumatic or very positive events are more important
        if (['fear', 'terror', 'joy', 'love'].includes(emotion)) {
            importance += 2;
        }
        
        // First-time events are more memorable
        if (event.isFirstTime) {
            importance += 1;
        }
        
        return Math.min(importance, 5);
    }

    // Memories fade over time but can be reinforced
    updateMemories(characterId) {
        const memories = this.memories.get(characterId) || [];
        const currentTime = Date.now();
        
        memories.forEach(memory => {
            const timePassed = currentTime - memory.timestamp;
            const fadeAmount = (timePassed / 1000000) * memory.fadeRate; // Fade over time
            memory.importance = Math.max(0, memory.importance - fadeAmount);
        });
        
        // Remove completely faded memories
        const activeMemories = memories.filter(memory => memory.importance > 0);
        this.memories.set(characterId, activeMemories);
    }

    // Characters remember and reference past events
    getRelevantMemories(characterId, currentSituation) {
        const memories = this.memories.get(characterId) || [];
        
        return memories
            .filter(memory => this.isMemoryRelevant(memory, currentSituation))
            .sort((a, b) => b.importance - a.importance)
            .slice(0, 3); // Top 3 most relevant memories
    }

    isMemoryRelevant(memory, situation) {
        // Check if memory context matches current situation
        const contextOverlap = memory.context.some(ctx => 
            situation.context.includes(ctx)
        );
        
        const eventSimilarity = memory.event.type === situation.type;
        
        return contextOverlap || eventSimilarity;
    }

    // Relationship dynamics that evolve over time
    calculateRelationshipChange(characterId, event) {
        const character = this.personalityTypes[characterId];
        let relationshipDelta = 0;
        
        // Positive actions aligned with character values
        if (event.outcome === 'helped_innocent' && character.coreTraits.includes('compassionate')) {
            relationshipDelta += 15;
        }
        
        // Actions that trigger character's fears
        if (event.type === 'betrayal' && character.fears.includes('being_alone')) {
            relationshipDelta -= 25;
        }
        
        // Consistent behavior builds trust over time
        const consistencyBonus = this.calculateConsistencyBonus(characterId, event);
        relationshipDelta += consistencyBonus;
        
        return relationshipDelta;
    }

    calculateConsistencyBonus(characterId, event) {
        const recentMemories = this.getRecentMemories(characterId, 5);
        const consistentActions = recentMemories.filter(memory => 
            memory.event.type === event.type && memory.event.outcome === event.outcome
        );
        
        return Math.min(consistentActions.length * 2, 10); // Max 10 bonus
    }

    getRecentMemories(characterId, count) {
        const memories = this.memories.get(characterId) || [];
        return memories
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, count);
    }

    // Emotional contagion - characters affect each other's moods
    processEmotionalContagion(characters) {
        const emotionalInfluences = new Map();
        
        characters.forEach(char1 => {
            characters.forEach(char2 => {
                if (char1.id !== char2.id) {
                    const influence = this.calculateEmotionalInfluence(char1, char2);
                    if (!emotionalInfluences.has(char2.id)) {
                        emotionalInfluences.set(char2.id, []);
                    }
                    emotionalInfluences.get(char2.id).push(influence);
                }
            });
        });
        
        // Apply emotional influences
        emotionalInfluences.forEach((influences, characterId) => {
            const currentEmotion = this.emotionalStates.get(characterId);
            const newEmotion = this.blendMultipleEmotions(currentEmotion, influences);
            this.emotionalStates.set(characterId, newEmotion);
        });
    }

    calculateEmotionalInfluence(source, target) {
        const relationship = this.relationships.get(`${source.id}_${target.id}`) || 0;
        const empathyLevel = target.empathy || 50;
        const sourceEmotionIntensity = this.getEmotionIntensity(source.emotion);
        
        const influenceStrength = (relationship / 100) * (empathyLevel / 100) * sourceEmotionIntensity;
        
        return {
            emotion: source.emotion,
            strength: influenceStrength
        };
    }

    blendEmotions(emotion1, emotion2, weight) {
        // Simplified emotion blending - in reality this would be more complex
        const emotionMap = {
            'neutral': 0, 'joy': 1, 'sadness': -1, 'anger': 2, 'fear': -2, 'anxiety': -1.5
        };
        
        const value1 = emotionMap[emotion1] || 0;
        const value2 = emotionMap[emotion2] || 0;
        const blendedValue = value1 * (1 - weight) + value2 * weight;
        
        // Convert back to emotion
        const reverseMap = Object.entries(emotionMap).reduce((acc, [emotion, value]) => {
            acc[value] = emotion;
            return acc;
        }, {});
        
        const closestValue = Object.keys(reverseMap).reduce((prev, curr) => 
            Math.abs(curr - blendedValue) < Math.abs(prev - blendedValue) ? curr : prev
        );
        
        return reverseMap[closestValue] || 'neutral';
    }

    // Get current emotional state for dialogue generation
    getEmotionalContext(characterId) {
        const emotion = this.emotionalStates.get(characterId) || 'neutral';
        const recentMemories = this.getRecentMemories(characterId, 3);
        const traumaLevel = this.traumaSystem.getTraumaLevel(characterId);
        
        return {
            currentEmotion: emotion,
            recentExperiences: recentMemories,
            traumaLevel: traumaLevel,
            personalityProfile: this.personalityTypes[characterId]
        };
    }
}

// Trauma and healing system
class TraumaSystem {
    constructor() {
        this.traumaLevels = new Map();
        this.healingProgress = new Map();
        this.triggers = new Map();
    }

    addTrauma(characterId, traumaEvent, severity) {
        const currentTrauma = this.traumaLevels.get(characterId) || 0;
        const newTrauma = Math.min(100, currentTrauma + severity);
        this.traumaLevels.set(characterId, newTrauma);
        
        // Add specific triggers
        if (!this.triggers.has(characterId)) {
            this.triggers.set(characterId, []);
        }
        this.triggers.get(characterId).push({
            event: traumaEvent,
            severity: severity,
            timestamp: Date.now()
        });
    }

    processHealing(characterId, healingEvent, support) {
        const currentTrauma = this.traumaLevels.get(characterId) || 0;
        const healingAmount = support * 2; // Support from player/friends helps healing
        const newTrauma = Math.max(0, currentTrauma - healingAmount);
        this.traumaLevels.set(characterId, newTrauma);
        
        // Track healing progress
        const currentHealing = this.healingProgress.get(characterId) || 0;
        this.healingProgress.set(characterId, currentHealing + healingAmount);
    }

    getTraumaLevel(characterId) {
        return this.traumaLevels.get(characterId) || 0;
    }

    isTriggered(characterId, event) {
        const triggers = this.triggers.get(characterId) || [];
        return triggers.some(trigger => 
            event.type.includes(trigger.event.type) || 
            event.context.some(ctx => trigger.event.context.includes(ctx))
        );
    }
}
