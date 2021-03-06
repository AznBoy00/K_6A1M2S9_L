//BossPQ Prize

importPackage(Packages.tools);

var mil5 = new Array(2022273, 2022179, 2022245, 2022068);
var mil15 = new Array(1032048, 1382045, 1382046, 1382047, 1382048, 1372035, 1372036, 1372037, 1372038, 1302106, 1472072);
var mil30 = new Array(2340000, 2049100, 1382049, 1382050, 1382051, 1382052, 1372039, 1372040, 1372041, 1372042, 1302107);
var mil50 = new Array(1472073, 1302081, 1312037, 1322060, 1402046, 1412033, 1422037, 1482023);
var mil75 = new Array(2070018, 1072344, 1082223);

var status = 0;
var prize;
var chosen;
var minlvl = 30;
var maxlvl = 255;
var minplayers = 1;
var maxplayers = 6;

function numberFormat(nStr,prefix){
	var prefix = prefix || '';
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + ',' + '$2');
	return prefix + x1 + x2;
}

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} 
	else {
		if (mode == 0) {
			cm.sendOk("Come back when you next want to participate in the Boss Quest!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("Hello! I can offer you access to the Boss Quest!");
		} 
		else if (status == 1) {
			chosen = 0;
			cm.sendSimple("What would you like to do? #b\r\n#L0#Start the Boss Quest#l\r\n#L1#Trade your Boss Quest Points#l");
		} 
		else if (status == 2) {
			if (selection == 0) {
				if (cm.getParty() == null) {
					cm.sendOk("To begin the Boss Quest you must be in a party, either create one or join your friend's.");
					cm.dispose();
                              return;
				}
				else if (!cm.getPlayer().isPartyLeader()) { 
					cm.sendOk("You aren't the leader of your party! If you want to begin the Boss Quest, please tell the leader to talk to me.");
					cm.dispose();
					return;
                       	}
				else {
					var em = cm.getEventManager("BossQuest");
					if (em == null) {
						cm.sendOk("The Boss Quest is currently unavailable.");
					}
					else {
						if (cm.getPlayer().getDex() > 0) { // removed 2
   							var party = cm.getParty().getMembers();
							var mapId = cm.getPlayer().getMapId();
							var inMap = true;
							var canRepeat = true;
							var badRepeat;
							var it = party.iterator();
                                                        var inMap = cm.partyMembersInMap();
							while (it.hasNext()) {
								var cPlayer = it.next();
								if (inMap < minplayers || inMap > maxplayers) {
									inMap = false;
								}
							/*	if (cPlayer.getPlayer().getDex() > 0) { // removed 2...
									canRepeat = false;
									badRepeat += ", " + cPlayer().getPlayer().getName();
								} */
                                                           canRepeat = true;
							}
							if (inMap == false) {
								cm.sendOk("Please make sure all the members of your party are in the map!");
								cm.dispose();
                               			return;

                 } else if (!checkPartySize()) {//PARTY SIZE WRONG
                    cm.sendOk("#eYour party needs to have at least " + minplayers + " members");
                    cm.dispose();
                    return;
                   
                } else if (!checkPartyLevels()) { //WRONG LEVELS
                    cm.sendOk("#eOne of your party members has not met the level requirements of " + minlvl + "~" + maxlvl + ".");
                    cm.dispose();
                   return;
                
							}
							else if (canRepeat == false) {
								cm.sendOk("The following members of your party have already participated in the Boss Quest twice today:\r\n#b" + badRepeats);
								cm.dispose();
								return;
							}
							else {
								var iterator = party.iterator();
								while (iterator.hasNext()) {
									var member = iterator.next();
									// member.getPlayer().setBossQuestRepeats(member.getPlayer().getBossQuestRepeats() + 1);
								}
								em.startInstance(cm.getParty(), cm.getPlayer().getMap());							
							}
						}
						else {
							cm.sendOk("You have already participated in the Boss Quest twice today!");
							cm.dispose();
                               		return;							
						}
					}
					cm.dispose();
					return;
				}
			}
			else if (selection == 1) {
				cm.sendYesNo("You currently have #b" + numberFormat(cm.getPlayer().getBossPoints()) + "#k Boss Quest Points! \r\nWould you like to trade your points for exciting prizes?");
			}
		}
		else if (status == 3) {
			//cm.sendSimple("What would you like to trade your Boss Quest Points for? #b\r\n#L0#Items#l\r\n#L1#NX Cash#l\r\n#L2#Mesos#l\r\n#L3#Game Points#l");
			cm.sendSimple("What would you like to trade your Boss Quest Points for? #b\r\n#L0#Items#l\r\n#L1#NX Cash#l\r\n#L2#Mesos#l");
		}
		else if (status == 4) {
			if (selection == 0) {
				cm.sendSimple("We currently have a few trade packages. What prize you get all comes down to luck, but the more Boss Quest Points you trade, the better the prizes!#b\r\n#L0#5,000,000 Boss Quest Points#l\r\n#L1#15,000,000 Boss Quest Points#l\r\n#L2#30,000,000 Boss Quest Points#l\r\n#L3#50,000,000 Boss Quest Points#l\r\n#L4#75,000,000 Boss Quest Points#l");
				chosen = 0;
			}
			else if (selection == 1) {
				cm.sendGetNumber("For every #b500#k Boss Quest Points, you can trade for #b1#k NX cash. How many Boss Quest Points would you like to trade?", 500, 500, 2147483000);
				chosen = 1;
			}
			else if (selection == 2) {
				var maximum = (Math.floor((2147483648 - cm.getPlayer().getMeso()) / 100) * 20);
				cm.sendGetNumber("For every #b10#k Boss Quest Points, you can trade for #b100#k mesos. How many Boss Quest Points would you like to trade?", 10, 10, maximum);
				chosen = 2;
			}
			else if (selection == 3) {
				cm.sendGetNumber("For every #b1,000,000#k Boss Quest Points, you can trade for #b1#k Game Points. How many Boss Quest Points would you like to trade?", 1000000, 1000000, 2147483000);
				chosen = 3;
			}
		}
		else if (status == 5) {
			var quantity;
			var selStr;
			if (chosen == 0) {
				if (selection == 0) {
					prize = 0;
					selStr = "You can win the following prizes: #b";
					selStr += "#t" + mil5[0] + "#";
					for (var i = 1; i < mil5.length; i++){
						selStr += ", #t" + mil5[i] + "#";
					}
					selStr += "#k\r\nWould you like to trade your Boss Quest points to win one of the above prizes?";
					cm.sendYesNo(selStr);
				}
				if (selection == 1) {
					prize = 1;
					selStr = "You can win the following prizes: #b";
					selStr += "#t" + mil15[0] + "#";
					for (var i = 1; i < mil15.length; i++){
						selStr += ", #t" + mil15[i] + "#";
					}
					selStr += "#k\r\nWould you like to trade your Boss Quest points to win one of the above prizes?";

					cm.sendYesNo(selStr);
				}
				if (selection == 2) {
					prize = 2;
					selStr = "You can win the following prizes: #b";
					selStr += "#t" + mil30[0] + "#";
					for (var i = 1; i < mil30.length; i++){
						selStr += ", #t" + mil30[i] + "#";
					}
					selStr += "#k\r\nWould you like to trade your Boss Quest points to win one of the above prizes?";
					cm.sendYesNo(selStr);
				}
				if (selection == 3) {
					prize = 3;
					selStr = "You can win the following prizes: #b";
					selStr += "#t" + mil50[0] + "#";
					for (var i = 1; i < mil50.length; i++){
						selStr += ", #t" + mil50[i] + "#";
					}
					selStr += "#k\r\nWould you like to trade your Boss Quest points to win one of the above prizes?";
					cm.sendYesNo(selStr);
				}
				if (selection == 4) {
					prize = 4;
					selStr = "You can win the following prizes: #b";
					selStr += "#t" + mil75[0] + "#";
					for (var i = 1; i < mil75.length; i++){
						selStr += ", #t" + mil75[i] + "#";
					}
					selStr += "#k\r\nWould you like to trade your Boss Quest points to win one of the above prizes?";
					cm.sendYesNo(selStr);
				}
			}
			else if (chosen == 1) {
				quantity = selection;
				if (quantity % 500 != 0) {
					cm.sendOk("Only multiples of #b500#k are allowed when trading Boss Quest Points for NX Cash!");
				}
				else if (cm.getPlayer().getBossPoints() < quantity) {
					cm.sendOk("You do not have #b" + numberFormat(quantity) + "#k Boss Quest Points! Please try trading a different amount, or come back later when you have enough!");
				}
				else {
					cm.getPlayer().setBossPoints(cm.getPlayer().getBossPoints() - quantity);
					cm.getPlayer().getCashShop().gainCash(1, (quantity/500));
					cm.getPlayer().announce(MaplePacketCreator.earnTitleMessage((quantity/500)));
					cm.sendOk("After trading you now have #b" + numberFormat(cm.getPlayer().getBossPoints()) + "#k Boss Quest Points and #b" + numberFormat(cm.getPlayer().getCashShop().getCash(1)) + "#k NX Cash! \r\nThank you for doing business, I wish you the best of luck on your future ventures into The Boss Quest!"); 
				}
				cm.dispose();
				return;
			}
			else if (chosen == 2) {
				quantity = selection;
				if (quantity % 10 != 0) {
					cm.sendOk("Only multiples of #b10#k are allowed when trading Boss Quest Points for mesos!");
				}
				else if (cm.getPlayer().getBossPoints() < quantity) {
					cm.sendOk("You do not have #b" + numberFormat(quantity) + "#k Boss Quest Points! Please try trading a different amount, or come back later when you have enough!");
				}
				else {
					cm.getPlayer().setBossPoints(cm.getPlayer().getBossPoints() - quantity);
					cm.gainMeso(quantity * 10);
					cm.sendOk("After trading you now have #b" + numberFormat(cm.getPlayer().getBossPoints()) + "#k Boss Quest Points and #b" + numberFormat(cm.getPlayer().getMeso()) + "#k mesos! \r\nThank you for doing business, I wish you the best of luck on your future ventures into The Boss Quest!");
				}
				cm.dispose();
				return;
			} /*else if (chosen == 3) {
				quantity = selection;
				if (quantity % 1000000 != 0) {
					cm.sendOk("Only multiples of #b1,000,000#k are allowed when trading Boss Quest Points for Game Points!");
				}
				else if (cm.getPlayer().getBossPoints() < quantity) {
					cm.sendOk("You do not have #b" + numberFormat(quantity) + "#k Boss Quest Points! Please try trading a different amount, or come back later when you have enough!");
				}
				else {
					cm.getPlayer().setBossPoints(cm.getPlayer().getBossPoints() - quantity);
					cm.getPlayer().gaingamepoints(quantity / 1000000);
					cm.sendOk("After trading you now have #b" + numberFormat(cm.getPlayer().getBossPoints()) + "#k Boss Quest Points and #b" + numberFormat(cm.getPlayer().getgamepoints()) + "#k Game Points! \r\nThank you for doing business, I wish you the best of luck on your future ventures into The Boss Quest!"); 
				}
				cm.dispose();
				return;
            }*/
		}
		else if (status == 6) {
			var quantity = 1;
			var win;
			if (prize == 0) {
				if (cm.getPlayer().getBossPoints() < 5000000) {
					cm.sendOk("You do not have #b 5,000,000 #k Boss Quest Points to trade with. Sorry!");
					cm.dispose();
					return;	
				}
				var win = mil5[Math.floor(Math.random() * mil5.length)];
				if (win == 2022179) quantity = Math.floor(Math.random() * 5);
				else quantity = Math.floor(Math.random() * 20);
				cm.gainItem(win, quantity);
				cm.getPlayer().setBossPoints(cm.getPlayer().getBossPoints() - 5000000);
			}
			else if (prize == 1) {
				if (cm.getPlayer().getBossPoints() < 5000000) {
					cm.sendOk("You do not have #b5,000,000#k Boss Quest Points to trade with. Sorry!");
					cm.dispose();
					return;	
				}
				var win = mil15[Math.floor(Math.random() * mil15.length)];
				cm.gainItem(win, quantity, true);
				cm.getPlayer().setBossPoints(cm.getPlayer().getBossPoints() - 15000000);
			}
			else if (prize == 2) {
				if (cm.getPlayer().getBossPoints() < 15000000) {
					cm.sendOk("You do not have #b15,000,000#k Boss Quest Points to trade with. Sorry!");
					cm.dispose();
					return;	
				}
				var win = mil30[Math.floor(Math.random() * mil30.length)];
				cm.gainItem(win, quantity, true);
				cm.getPlayer().setBossPoints(cm.getPlayer().getBossPoints() - 30000000);
			}
			else if (prize == 3) {
				if (cm.getPlayer().getBossPoints() < 30000000) {
					cm.sendOk("You do not have #b30,000,000#k Boss Quest Points to trade with. Sorry!");
					cm.dispose();
					return;	
				}
				var win = mil50[Math.floor(Math.random() * mil50.length)];
				cm.gainItem(win, quantity, true);
				cm.getPlayer().setBossPoints(cm.getPlayer().getBossPoints() - 50000000);
			}
			else if (prize == 4) {
				if (cm.getPlayer().getBossPoints() < 75000000) {
					cm.sendOk("You do not have #b75,000,000#k Boss Quest Points to trade with. Sorry!");
					cm.dispose();
					return;	
				}
				var win = mil75[Math.floor(Math.random() * mil75.length)];
				cm.gainItem(win, quantity, true);
				cm.getPlayer().setBossPoints(cm.getPlayer().getBossPoints() - 75000000);
			}
			cm.sendOk("You have been awarded with your prize. I hope you are pleased! Good luck in your future ventures into The Boss Quest.");
			cm.dispose();
			return;
		}
	}
}

function checkPartySize(){
    var size = 0;
    if(cm.getPlayer().getParty() == null){
        size = 0;
    }else{
        size = (cm.getPlayer().getParty().getMembers().size());
    }
    if(size < minplayers || size > maxplayers){
        return false;
    }else{
        return true;
    }
}

function checkPartyLevels(){
    var pass = true;
    var party = cm.getPlayer().getParty().getMembers();
    /*if(cm.getPlayer().getParty() == null){
        pass = false;
    }else{
        for (var i = 0; i < party.size() && pass; i++) {
            if ((party.get(i).getLevel() < minlvl) || (party.get(i).getLevel() > maxlvl) || (party.get(i).getMapId() != cm.getPlayer().getMap())) {
                pass = false;
            }
        }
    }*/
    return pass;
}