// Advanced Story Engine with Multiple Endings and Dynamic Narratives
export class StoryEngine {
    constructor() {
        this.currentChapter = 1;
        this.playerChoices = [];
        this.karma = 0;
        this.relationships = new Map();
        this.discoveredLore = [];
        this.activeQuests = [];
        this.completedQuests = [];
        
        this.initializeStoryTree();
        this.initializeCharacters();
    }

    initializeStoryTree() {
        this.storyNodes = {
            prologue: {
                id: 'prologue',
                title: 'The Awakening',
                description: 'You wake up in a mysterious realm with no memory of how you arrived...',
                choices: [
                    { text: 'Explore the ancient ruins', karma: 5, next: 'ruins_exploration' },
                    { text: 'Seek out other survivors', karma: 10, next: 'survivor_meeting' },
                    { text: 'Search for a way home immediately', karma: 0, next: 'escape_attempt' }
                ],
                triggers: ['first_awakening']
            },
            ruins_exploration: {
                id: 'ruins_exploration',
                title: 'Ancient Mysteries',
                description: 'The ruins hold secrets of a forgotten civilization...',
                choices: [
                    { text: 'Study the ancient texts', karma: 5, next: 'scholar_path', requirements: { intelligence: 10 } },
                    { text: 'Take the magical artifacts', karma: -5, next: 'treasure_hunter_path' },
                    { text: 'Leave everything untouched', karma: 15, next: 'respectful_path' }
                ],
                discoveries: ['ancient_language', 'lost_civilization']
            },
            survivor_meeting: {
                id: 'survivor_meeting',
                title: 'Unlikely Allies',
                description: 'You encounter other lost souls in this strange realm...',
                choices: [
                    { text: 'Form an alliance', karma: 15, next: 'alliance_formed' },
                    { text: 'Help them but remain independent', karma: 10, next: 'independent_helper' },
                    { text: 'Avoid them entirely', karma: -5, next: 'lone_wolf_path' }
                ],
                characters: ['elena_the_healer', 'marcus_the_warrior', 'zara_the_mage']
            }
        };

        this.endingPaths = {
            hero_ending: {
                requirements: { karma: 75, allies: 3, quests_completed: 25 },
                title: 'The Legendary Hero',
                description: 'Your noble actions have made you a legend across all realms.',
                unlocks: ['hero_mode', 'legendary_weapons']
            },
            villain_ending: {
                requirements: { karma: -50, power_level: 80, enemies_defeated: 100 },
                title: 'The Dark Overlord',
                description: 'You have embraced the darkness and now rule through fear.',
                unlocks: ['villain_mode', 'dark_powers']
            },
            neutral_ending: {
                requirements: { karma: [-25, 25], balance_achieved: true },
                title: 'The Balanced One',
                description: 'You have found perfect harmony between light and shadow.',
                unlocks: ['balance_mode', 'dual_nature_abilities']
            },
            secret_ending: {
                requirements: { hidden_areas: 10, secret_items: 15, lore_discovered: 20 },
                title: 'The Truth Seeker',
                description: 'You have uncovered the ultimate truth behind the Nexus Realms.',
                unlocks: ['reality_manipulation', 'true_sight']
            },
            true_ending: {
                requirements: { all_endings_seen: true, mastery_level: 100 },
                title: 'The Transcendent',
                description: 'You have transcended the boundaries of reality itself.',
                unlocks: ['god_mode', 'reality_creation']
            }
        };
    }

    initializeCharacters() {
        this.characters = {
            elena_the_healer: {
                name: 'Elena',
                title: 'The Compassionate Healer',
                relationship: 0,
                personality: 'kind',
                backstory: 'A former temple priestess who lost her faith but not her compassion.',
                dialogue: {
                    first_meeting: "I sense great potential in you. Will you help me heal this broken world?",
                    high_relationship: "Together, we can bring hope to even the darkest places.",
                    low_relationship: "I'm disappointed in the path you've chosen."
                },
                questlines: ['healing_the_wounded', 'temple_restoration', 'faith_renewed']
            },
            marcus_the_warrior: {
                name: 'Marcus',
                title: 'The Fallen Knight',
                relationship: 0,
                personality: 'honorable',
                backstory: 'Once a noble knight, now seeking redemption for past failures.',
                dialogue: {
                    first_meeting: "Honor is earned through actions, not words. Prove yourself worthy.",
                    high_relationship: "You fight with the heart of a true warrior.",
                    low_relationship: "Your actions bring shame to all who fight beside you."
                },
                questlines: ['knights_honor', 'redemption_quest', 'final_battle']
            },
            zara_the_mage: {
                name: 'Zara',
                title: 'The Enigmatic Sorceress',
                relationship: 0,
                personality: 'mysterious',
                backstory: 'A powerful mage who speaks in riddles and sees beyond the veil of reality.',
                dialogue: {
                    first_meeting: "The threads of fate are tangled around you. Interesting...",
                    high_relationship: "You begin to understand the true nature of power.",
                    low_relationship: "Your ignorance blinds you to the greater truths."
                },
                questlines: ['arcane_mysteries', 'reality_fragments', 'cosmic_revelation']
            }
        };
    }

    makeChoice(choiceIndex) {
        const currentNode = this.getCurrentStoryNode();
        if (!currentNode || !currentNode.choices[choiceIndex]) {
            return { success: false, message: 'Invalid choice' };
        }

        const choice = currentNode.choices[choiceIndex];
        
        // Check requirements
        if (choice.requirements && !this.meetsRequirements(choice.requirements)) {
            return { success: false, message: 'Requirements not met for this choice' };
        }

        // Apply choice effects
        this.karma += choice.karma || 0;
        this.playerChoices.push({
            node: currentNode.id,
            choice: choice.text,
            karma_change: choice.karma,
            timestamp: Date.now()
        });

        // Update relationships
        if (choice.relationship_changes) {
            for (const [character, change] of Object.entries(choice.relationship_changes)) {
                this.updateRelationship(character, change);
            }
        }

        // Trigger discoveries
        if (currentNode.discoveries) {
            this.discoveredLore.push(...currentNode.discoveries);
        }

        // Move to next story node
        if (choice.next) {
            this.currentStoryNode = choice.next;
        }

        return {
            success: true,
            choice: choice,
            karma_change: choice.karma,
            new_karma: this.karma,
            next_node: choice.next
        };
    }

    getCurrentStoryNode() {
        return this.storyNodes[this.currentStoryNode] || this.storyNodes.prologue;
    }

    meetsRequirements(requirements) {
        // Check various requirements for story choices
        for (const [req, value] of Object.entries(requirements)) {
            switch (req) {
                case 'karma':
                    if (this.karma < value) return false;
                    break;
                case 'intelligence':
                    // Would check player stats
                    break;
                case 'relationship':
                    for (const [character, minRel] of Object.entries(value)) {
                        if ((this.relationships.get(character) || 0) < minRel) return false;
                    }
                    break;
            }
        }
        return true;
    }

    updateRelationship(characterId, change) {
        const current = this.relationships.get(characterId) || 0;
        const newValue = Math.max(-100, Math.min(100, current + change));
        this.relationships.set(characterId, newValue);

        // Trigger relationship events
        this.checkRelationshipMilestones(characterId, newValue);
    }

    checkRelationshipMilestones(characterId, relationship) {
        const character = this.characters[characterId];
        if (!character) return;

        if (relationship >= 75 && !character.romance_unlocked) {
            character.romance_unlocked = true;
            this.triggerEvent('romance_available', { character: characterId });
        } else if (relationship <= -50 && !character.rivalry_unlocked) {
            character.rivalry_unlocked = true;
            this.triggerEvent('rivalry_established', { character: characterId });
        }
    }

    // Quest System Integration
    startQuest(questId) {
        const quest = this.getQuestById(questId);
        if (!quest) return { success: false, message: 'Quest not found' };

        if (this.activeQuests.find(q => q.id === questId)) {
            return { success: false, message: 'Quest already active' };
        }

        this.activeQuests.push({
            ...quest,
            startTime: Date.now(),
            progress: 0,
            objectives: quest.objectives.map(obj => ({ ...obj, completed: false }))
        });

        return { success: true, message: `Quest started: ${quest.title}`, quest };
    }

    updateQuestProgress(questId, objectiveId) {
        const quest = this.activeQuests.find(q => q.id === questId);
        if (!quest) return false;

        const objective = quest.objectives.find(obj => obj.id === objectiveId);
        if (!objective || objective.completed) return false;

        objective.completed = true;
        quest.progress = quest.objectives.filter(obj => obj.completed).length / quest.objectives.length;

        if (quest.progress >= 1.0) {
            this.completeQuest(questId);
        }

        return true;
    }

    completeQuest(questId) {
        const questIndex = this.activeQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return false;

        const quest = this.activeQuests[questIndex];
        quest.completionTime = Date.now();
        
        // Apply quest rewards
        this.applyQuestRewards(quest);
        
        // Move to completed quests
        this.completedQuests.push(quest);
        this.activeQuests.splice(questIndex, 1);

        this.triggerEvent('quest_completed', { quest });
        return true;
    }

    applyQuestRewards(quest) {
        if (quest.rewards) {
            // Apply karma, items, relationships, etc.
            if (quest.rewards.karma) this.karma += quest.rewards.karma;
            if (quest.rewards.relationships) {
                for (const [char, change] of Object.entries(quest.rewards.relationships)) {
                    this.updateRelationship(char, change);
                }
            }
        }
    }

    // Ending System
    checkAvailableEndings() {
        const availableEndings = [];
        
        for (const [endingId, ending] of Object.entries(this.endingPaths)) {
            if (this.meetsEndingRequirements(ending.requirements)) {
                availableEndings.push({
                    id: endingId,
                    title: ending.title,
                    description: ending.description,
                    unlocks: ending.unlocks
                });
            }
        }

        return availableEndings;
    }

    meetsEndingRequirements(requirements) {
        for (const [req, value] of Object.entries(requirements)) {
            switch (req) {
                case 'karma':
                    if (Array.isArray(value)) {
                        if (this.karma < value[0] || this.karma > value[1]) return false;
                    } else {
                        if (this.karma < value) return false;
                    }
                    break;
                case 'allies':
                    const allyCount = Array.from(this.relationships.values()).filter(rel => rel >= 50).length;
                    if (allyCount < value) return false;
                    break;
                case 'quests_completed':
                    if (this.completedQuests.length < value) return false;
                    break;
                case 'hidden_areas':
                    // Would check exploration data
                    break;
                case 'lore_discovered':
                    if (this.discoveredLore.length < value) return false;
                    break;
            }
        }
        return true;
    }

    // Dynamic Dialogue System
    getDialogue(characterId, context = 'general') {
        const character = this.characters[characterId];
        if (!character) return null;

        const relationship = this.relationships.get(characterId) || 0;
        
        let dialogueKey = 'general';
        if (relationship >= 50) dialogueKey = 'high_relationship';
        else if (relationship <= -25) dialogueKey = 'low_relationship';
        else if (context === 'first_meeting') dialogueKey = 'first_meeting';

        return {
            character: character.name,
            title: character.title,
            text: character.dialogue[dialogueKey] || character.dialogue.general,
            relationship: relationship,
            mood: this.getCharacterMood(characterId, relationship)
        };
    }

    getCharacterMood(characterId, relationship) {
        if (relationship >= 75) return 'adoring';
        if (relationship >= 50) return 'friendly';
        if (relationship >= 25) return 'neutral';
        if (relationship >= 0) return 'cautious';
        if (relationship >= -25) return 'unfriendly';
        if (relationship >= -50) return 'hostile';
        return 'hateful';
    }

    // Event System
    triggerEvent(eventType, data = {}) {
        console.log(`📖 Story Event: ${eventType}`, data);
        // Could trigger UI updates, cutscenes, etc.
    }

    // Save/Load Story State
    getStoryState() {
        return {
            currentChapter: this.currentChapter,
            currentStoryNode: this.currentStoryNode,
            playerChoices: this.playerChoices,
            karma: this.karma,
            relationships: Object.fromEntries(this.relationships),
            discoveredLore: this.discoveredLore,
            activeQuests: this.activeQuests,
            completedQuests: this.completedQuests
        };
    }

    loadStoryState(state) {
        this.currentChapter = state.currentChapter || 1;
        this.currentStoryNode = state.currentStoryNode || 'prologue';
        this.playerChoices = state.playerChoices || [];
        this.karma = state.karma || 0;
        this.relationships = new Map(Object.entries(state.relationships || {}));
        this.discoveredLore = state.discoveredLore || [];
        this.activeQuests = state.activeQuests || [];
        this.completedQuests = state.completedQuests || [];
    }

    update() {
        // Update active quests, check for time-sensitive events, etc.
        this.updateActiveQuests();
        this.checkStoryTriggers();
    }

    updateActiveQuests() {
        // Update quest timers, check for auto-completion conditions, etc.
        this.activeQuests.forEach(quest => {
            if (quest.timeLimit) {
                const elapsed = Date.now() - quest.startTime;
                if (elapsed > quest.timeLimit) {
                    this.failQuest(quest.id);
                }
            }
        });
    }

    checkStoryTriggers() {
        // Check for automatic story progression triggers
        // Based on player actions, time, location, etc.
    }

    failQuest(questId) {
        const questIndex = this.activeQuests.findIndex(q => q.id === questId);
        if (questIndex !== -1) {
            const quest = this.activeQuests[questIndex];
            quest.failed = true;
            quest.failureTime = Date.now();
            
            // Apply failure consequences
            if (quest.failureConsequences) {
                this.karma += quest.failureConsequences.karma || 0;
            }
            
            this.activeQuests.splice(questIndex, 1);
            this.triggerEvent('quest_failed', { quest });
        }
    }

    getQuestById(questId) {
        // This would normally load from a quest database
        const sampleQuests = {
            'healing_the_wounded': {
                id: 'healing_the_wounded',
                title: 'Healing the Wounded',
                description: 'Help Elena tend to the injured survivors.',
                objectives: [
                    { id: 'gather_herbs', description: 'Gather 10 healing herbs', completed: false },
                    { id: 'treat_patients', description: 'Treat 5 wounded survivors', completed: false }
                ],
                rewards: { karma: 15, relationships: { elena_the_healer: 20 } },
                timeLimit: 1800000 // 30 minutes
            }
        };
        
        return sampleQuests[questId];
    }
}
