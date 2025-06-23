// Advanced Economy System with Multiple Currencies
export class EconomySystem {
    constructor() {
        this.currencies = {
            gold: { value: 1000, icon: '🪙', description: 'Standard currency' },
            essence: { value: 0, icon: '✨', description: 'Magical energy' },
            reputation: { value: 50, icon: '⭐', description: 'Social standing' }
        };

        this.marketPrices = new Map();
        this.playerInventory = new Map();
        this.investments = [];
        this.businesses = [];
        
        this.initializeMarket();
    }

    initializeMarket() {
        // Dynamic pricing system
        this.marketItems = {
            weapons: {
                'Iron Sword': { basePrice: 100, currency: 'gold', rarity: 'common' },
                'Flame Blade': { basePrice: 50, currency: 'essence', rarity: 'rare' },
                'Legendary Excalibur': { basePrice: 200, currency: 'essence', rarity: 'legendary' }
            },
            armor: {
                'Leather Armor': { basePrice: 80, currency: 'gold', rarity: 'common' },
                'Mystic Robes': { basePrice: 40, currency: 'essence', rarity: 'rare' },
                'Dragon Scale Mail': { basePrice: 150, currency: 'essence', rarity: 'legendary' }
            },
            consumables: {
                'Health Potion': { basePrice: 25, currency: 'gold', rarity: 'common' },
                'Mana Crystal': { basePrice: 15, currency: 'essence', rarity: 'common' },
                'Phoenix Feather': { basePrice: 100, currency: 'reputation', rarity: 'rare' }
            }
        };

        this.updateMarketPrices();
    }

    updateMarketPrices() {
        // Dynamic market with supply/demand
        for (const [category, items] of Object.entries(this.marketItems)) {
            for (const [itemName, itemData] of Object.entries(items)) {
                const fluctuation = (Math.random() - 0.5) * 0.3; // ±30% price variation
                const currentPrice = Math.floor(itemData.basePrice * (1 + fluctuation));
                this.marketPrices.set(itemName, {
                    ...itemData,
                    currentPrice,
                    trend: fluctuation > 0 ? '📈' : '📉'
                });
            }
        }
    }

    purchaseItem(itemName, quantity = 1) {
        const item = this.marketPrices.get(itemName);
        if (!item) return { success: false, message: 'Item not found' };

        const totalCost = item.currentPrice * quantity;
        const currency = item.currency;

        if (this.currencies[currency].value >= totalCost) {
            this.currencies[currency].value -= totalCost;
            this.addToInventory(itemName, quantity);
            
            return {
                success: true,
                message: `Purchased ${quantity}x ${itemName} for ${totalCost} ${currency}`,
                transaction: { item: itemName, quantity, cost: totalCost, currency }
            };
        }

        return {
            success: false,
            message: `Insufficient ${currency}. Need ${totalCost}, have ${this.currencies[currency].value}`
        };
    }

    sellItem(itemName, quantity = 1) {
        if (!this.playerInventory.has(itemName) || this.playerInventory.get(itemName) < quantity) {
            return { success: false, message: 'Item not in inventory or insufficient quantity' };
        }

        const item = this.marketPrices.get(itemName);
        const sellPrice = Math.floor(item.currentPrice * 0.7 * quantity); // 70% of market price
        
        this.currencies[item.currency].value += sellPrice;
        this.removeFromInventory(itemName, quantity);

        return {
            success: true,
            message: `Sold ${quantity}x ${itemName} for ${sellPrice} ${item.currency}`,
            transaction: { item: itemName, quantity, earned: sellPrice, currency: item.currency }
        };
    }

    addToInventory(itemName, quantity) {
        const current = this.playerInventory.get(itemName) || 0;
        this.playerInventory.set(itemName, current + quantity);
    }

    removeFromInventory(itemName, quantity) {
        const current = this.playerInventory.get(itemName) || 0;
        const remaining = Math.max(0, current - quantity);
        
        if (remaining === 0) {
            this.playerInventory.delete(itemName);
        } else {
            this.playerInventory.set(itemName, remaining);
        }
    }

    // Investment System
    makeInvestment(type, amount, currency = 'gold') {
        if (this.currencies[currency].value < amount) {
            return { success: false, message: 'Insufficient funds' };
        }

        const investment = {
            id: Date.now(),
            type,
            amount,
            currency,
            startDate: Date.now(),
            expectedReturn: this.calculateExpectedReturn(type, amount),
            maturityDate: Date.now() + this.getInvestmentDuration(type)
        };

        this.currencies[currency].value -= amount;
        this.investments.push(investment);

        return {
            success: true,
            message: `Investment of ${amount} ${currency} in ${type} successful`,
            investment
        };
    }

    calculateExpectedReturn(type, amount) {
        const returnRates = {
            'merchant_guild': 0.15, // 15% return
            'magic_research': 0.25, // 25% return but higher risk
            'real_estate': 0.10,    // 10% return, stable
            'adventure_fund': 0.30  // 30% return, highest risk
        };

        return Math.floor(amount * (1 + returnRates[type]));
    }

    getInvestmentDuration(type) {
        const durations = {
            'merchant_guild': 300000,  // 5 minutes
            'magic_research': 600000,  // 10 minutes
            'real_estate': 900000,     // 15 minutes
            'adventure_fund': 180000   // 3 minutes
        };

        return durations[type] || 300000;
    }

    // Business Ownership System
    purchaseBusiness(businessType, location) {
        const businessCosts = {
            'tavern': { cost: 5000, currency: 'gold', income: 100 },
            'magic_shop': { cost: 3000, currency: 'essence', income: 50 },
            'guild_hall': { cost: 1000, currency: 'reputation', income: 25 }
        };

        const business = businessCosts[businessType];
        if (!business) return { success: false, message: 'Invalid business type' };

        if (this.currencies[business.currency].value >= business.cost) {
            this.currencies[business.currency].value -= business.cost;
            
            const newBusiness = {
                id: Date.now(),
                type: businessType,
                location,
                income: business.income,
                currency: business.currency,
                level: 1,
                lastCollection: Date.now()
            };

            this.businesses.push(newBusiness);
            return { success: true, message: `Purchased ${businessType} in ${location}`, business: newBusiness };
        }

        return { success: false, message: `Insufficient ${business.currency}` };
    }

    collectBusinessIncome() {
        let totalCollected = { gold: 0, essence: 0, reputation: 0 };

        this.businesses.forEach(business => {
            const timeSinceCollection = Date.now() - business.lastCollection;
            const hoursElapsed = timeSinceCollection / (1000 * 60 * 60);
            const income = Math.floor(business.income * business.level * hoursElapsed);

            if (income > 0) {
                this.currencies[business.currency].value += income;
                totalCollected[business.currency] += income;
                business.lastCollection = Date.now();
            }
        });

        return totalCollected;
    }

    // Crafting Economy
    craftItem(recipe, materials) {
        // Check if player has required materials
        for (const [material, required] of Object.entries(materials)) {
            const available = this.playerInventory.get(material) || 0;
            if (available < required) {
                return { success: false, message: `Insufficient ${material}. Need ${required}, have ${available}` };
            }
        }

        // Remove materials from inventory
        for (const [material, required] of Object.entries(materials)) {
            this.removeFromInventory(material, required);
        }

        // Add crafted item to inventory
        this.addToInventory(recipe.output.item, recipe.output.quantity);

        return {
            success: true,
            message: `Successfully crafted ${recipe.output.quantity}x ${recipe.output.item}`,
            crafted: recipe.output
        };
    }

    // Get current economic status
    getEconomicStatus() {
        return {
            currencies: this.currencies,
            inventory: Object.fromEntries(this.playerInventory),
            investments: this.investments,
            businesses: this.businesses,
            marketTrends: this.getMarketTrends()
        };
    }

    getMarketTrends() {
        const trends = {};
        for (const [itemName, itemData] of this.marketPrices.entries()) {
            trends[itemName] = {
                price: itemData.currentPrice,
                trend: itemData.trend,
                currency: itemData.currency
            };
        }
        return trends;
    }

    update() {
        // Update market prices periodically
        if (Math.random() < 0.01) { // 1% chance per frame
            this.updateMarketPrices();
        }

        // Process mature investments
        this.processInvestments();
    }

    processInvestments() {
        const now = Date.now();
        this.investments = this.investments.filter(investment => {
            if (now >= investment.maturityDate) {
                // Investment has matured
                this.currencies[investment.currency].value += investment.expectedReturn;
                console.log(`💰 Investment matured! Received ${investment.expectedReturn} ${investment.currency}`);
                return false; // Remove from investments array
            }
            return true; // Keep investment
        });
    }
}
