/*
 * @Name         [Admin]JokerstaR
 * @Author:      Quanta
 * @NPC:         9901001
 * @Purpose:     Gives a starter pack for Aran
 */
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0)
            cm.dispose();
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
			cm.sendSimple("#dLong training eh?! \r #b \r My name is #r^-`JokerstaR#b, I am an administrator on #rArchonMS#b. Our server is full of adventures! Before you leave, I'll give you a super awesome special starter kit! But first, let me know where are you heading to? #b\r\n#L0#I want to finish the tutorial, take me to the next map!\r\n#L1#I want to end the tutorial now, take me to Rien!\r\n#L2#Let me think a bit");
		} else if (status == 1) {
			if (selection == 0) {
				if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(6)) {
					cm.gainItem(1002186, 1, false, true);
					cm.gainItem(1012031, 1, false, true);
					cm.gainItem(1102196, 1, false, true);
					cm.gainItem(1052047, 1, false, true);
					cm.gainItem(1072058, 1, false, true);
					cm.gainItem(1702121, 1, false, true);
					cm.getPlayer().getCashShop().gainCash(1, 5000);
					cm.sendOk("#bHere you go, enjoy your care package! You can find our#r staff members#b a bit everywhere in Henesys! #rHappy Mapling!");
					cm.getPlayer().dropMessage("You have earned 5,000 NX! Enjoy you stay!");
					status ++;
					if (status == 2) {
						cm.warp(140010000);
						cm.dispose();
					}
				} else {
					cm.sendOk("It looks like your inventory is full!");
					cm.dispose();
				}
			} else if (selection == 1) {
				if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(6)) {
					cm.gainItem(1002186, 1, false, true);
					cm.gainItem(1012031, 1, false, true);
					cm.gainItem(1102196, 1, false, true);
					cm.gainItem(1052047, 1, false, true);
					cm.gainItem(1072058, 1, false, true);
					cm.gainItem(1702121, 1, false, true);
					cm.getPlayer().getCashShop().gainCash(1, 5000);
					cm.sendOk("#bHere you go, enjoy your care package! You can find our#r staff members#b a bit everywhere in Henesys! #rHappy Mapling!");
					cm.getPlayer().dropMessage("You have earned 5,000 NX! Enjoy you stay!");
					status ++;
					if (status == 2) {
						cm.warp(140000000);
						cm.dispose();
					}
				} else {
					cm.sendOk("It looks like your inventory is full!");
					cm.dispose();
				}
			} else if (selection == 2) {
				cm.sendOk("Take your time, let me know when you will have made your decision!");
				cm.dispose();
			}
		} else {
			cm.sendOk("Take your time, let me know when you will have made your decision!");
			cm.dispose();
            status--;
		}
    }
}