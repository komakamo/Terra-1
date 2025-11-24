
const assert = require('assert');

// Mock Data
const IDS = {
    AIR: 0,
    WOOD_ARMOR: 200,
    WOOD_PICK: 100
};

const PROPS = {
    [IDS.AIR]: { name:'Air', transparent:true, solid:false },
    [IDS.WOOD_ARMOR]: { name:'Wood Armor', type:'armor', def:2, maxStack:1, color:'#795548' },
    [IDS.WOOD_PICK]: { name:'Wood Pickaxe', type:'tool', power:35, maxStack:1, color:'#795548' }
};

class Game {
    constructor() {
        this.player = {
            inv: [],
            sel: 0
        };
        this.uiUpd = () => {};
    }

    // Initialize inventory with specific items
    initInv(items) {
        this.player.inv = items.map(i => ({...i}));
        // Fill rest with AIR (simulated)
        while(this.player.inv.length < 10) this.player.inv.push({id: IDS.AIR, n: 0});
    }

    // Copy of the fixed logic from index.html
    addItem(id, n) {
        let s = this.player.inv.find(i=>i.id===id);
        if(s) {
            s.n+=n;
            if(s.n<=0) {s.id=IDS.AIR; s.n=0;}
        }
        else if(n>0) { let e = this.player.inv.find(i=>i.id===IDS.AIR); if(e) { e.id=id; e.n=n; } }
        this.uiUpd();
    }
}

// TEST 1: Consuming an item with maxStack: 1 (Armor)
{
    const game = new Game();
    game.initInv([{id: IDS.WOOD_ARMOR, n: 1}]);

    console.log("Test 1: Consuming Wood Armor (maxStack: 1)");
    game.addItem(IDS.WOOD_ARMOR, -1);

    const slot = game.player.inv[0];
    if (slot.id === IDS.WOOD_ARMOR && slot.n === 0) {
        console.log("FAIL: Armor remained in inventory with count 0.");
        process.exit(1);
    } else if (slot.id === IDS.AIR) {
        console.log("PASS: Armor was cleared.");
    } else {
        console.log("FAIL: Unexpected state", slot);
        process.exit(1);
    }
}

// TEST 2: Verify normal items still clear
{
    const game = new Game();
    // Simulate consuming a potion or block
    const MOCK_POTION = 999;
    PROPS[MOCK_POTION] = { name:'Potion', type:'use', maxStack: 30 };

    game.initInv([{id: MOCK_POTION, n: 1}]);

    console.log("Test 2: Consuming Potion (maxStack: 30)");
    game.addItem(MOCK_POTION, -1);

    const slot = game.player.inv[0];
    if (slot.id === IDS.AIR) {
        console.log("PASS: Potion was cleared.");
    } else {
        console.log("FAIL: Potion remained", slot);
        process.exit(1);
    }
}
