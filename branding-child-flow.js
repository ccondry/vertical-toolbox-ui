// var jsonObjct = JSON.parse("$(n23.webexConnect)");

// To be used for testing using node
// node branding-child-flow.js
var jsonObjct = require("./client/store/modules/default-vertical.json").webexconnect;
var journey = "appointments";

function defaultValue(jsonVariable,defValue) {
    if (typeof jsonVariable != "string" || jsonVariable.length === 0) {
        return defValue;
    }
    return jsonVariable;
}

var brandName = defaultValue(jsonObjct.global.brandName,"Cumulus Finance");
var brandLogo = defaultValue(jsonObjct.global.brandLogo,"https://mm.cxdemo.net/static/images/cumulus/common/webex-logo.jpg");
var brandBuilding = defaultValue(jsonObjct.global.brandBuilding,"Cumulus Healthcare store");
var brandCurrency = defaultValue(jsonObjct.global.brandCurrency,"USD");
var brandWebsite = defaultValue(jsonObjct.global.brandWebsite,"https://www.webex.com/");
var brandAddress = defaultValue(jsonObjct.global.brandAddress,"170 West Tasman Dr., San Jose, CA");
var repTitle = defaultValue(jsonObjct.global.repTitle,"your Financial Advisor");
var repName = defaultValue(jsonObjct.global.repName,"Mr. John Doe");
var repBuilding = defaultValue(jsonObjct.global.repBuilding,"your branch");
var custName = defaultValue(jsonObjct.global.custName,"Michael Littlefoot");
var custAddress = defaultValue(jsonObjct.global.custAddress,"1125 Madison Avenue, New York, NY");
var custPostcode = defaultValue(jsonObjct.global.custPostcode,"10028");
var custEmailAddress = defaultValue(jsonObjct.global.custEmailAddress,"michael.littlefoot@dcloud.cisco.com");

if (journey == "appointments") {
    var appointments = jsonObjct.appointments;

    var brandName = defaultValue(appointments.brandName,"Cumulus Finance");
    var repTitle = defaultValue(appointments.repTitle,"your Financial Advisor");
    var repName = defaultValue(appointments.repName,"Mr. John Doe");
    var repBuilding = defaultValue(appointments.repBuilding,"your branch");

    var localizationMessages = appointments[jsonObjct.global.language];

    var enterName = defaultValue(localizationMessages.enterName,"Please enter your full name.");
    var yourName = defaultValue(localizationMessages.yourName,"Your Name");
    var enterPhoneNumber = defaultValue(localizationMessages.enterPhoneNumber,"Please enter your mobile number, including the country code prefix, but without leading 0 or +.");
    var welcomeTitle = defaultValue(localizationMessages.welcomeTitle,"Appointment Confirmed");
    var welcomeMsg1 = defaultValue(localizationMessages.welcomeMsg1,"Hi");
    var welcomeMsg2 = defaultValue(localizationMessages.welcomeMsg2,"thanks for booking an appointment with");
    var welcomeMsg3 = defaultValue(localizationMessages.welcomeMsg3,"The 45 minutes appointment with");
    var welcomeMsg4 = defaultValue(localizationMessages.welcomeMsg4,"is confirmed for");
    var welcomeMsg5 = defaultValue(localizationMessages.welcomeMsg5,"at");
    var welcomeMsg6 = defaultValue(localizationMessages.welcomeMsg6,"To change your appointment, just reply, CHANGE.");
    var welcomeMsg7 = defaultValue(localizationMessages.welcomeMsg7,"To cancel, reply, CANCEL.");
    var changeKeyword = defaultValue(localizationMessages.changeKeyword,"change");
    var changeKeywordSimple = defaultValue(localizationMessages.changeKeywordSimple,"change");
    var cancelKeyword = defaultValue(localizationMessages.cancelKeyword,"cancel");
    var cancelKeywordSimple = defaultValue(localizationMessages.cancelKeywordSimple,"cancel");
    var cancelMsg1 = defaultValue(localizationMessages.cancelMsg1,"If you are sure you want to cancel your appointment for");
    var cancelMsg2 = defaultValue(localizationMessages.cancelMsg2,"at");
    var cancelMsg3 = defaultValue(localizationMessages.cancelMsg3,"then please reply YES.");
    var cancelMsg4 = defaultValue(localizationMessages.cancelMsg4,"Or if you would like to have a chat with our customer service team first, reply CHAT.");
    var cancelMsg5 = defaultValue(localizationMessages.cancelMsg5,"Ok, thanks for confirming, your appointment is now cancelled.");
    var cancelMsg6 = defaultValue(localizationMessages.cancelMsg6,"If you want to book another appointment, just visit us again.");
    var cancelMsg7 = defaultValue(localizationMessages.cancelMsg7,"Thanks");
    var yesKeyword = defaultValue(localizationMessages.yesKeyword,"yes");
    var yesKeywordSimple = defaultValue(localizationMessages.yesKeywordSimple,"yes");
    var chatKeyword = defaultValue(localizationMessages.chatKeyword,"chat");
    var chatKeywordSimple = defaultValue(localizationMessages.chatKeywordSimple,"chat");
    var chatMsg1 = defaultValue(localizationMessages.chatMsg1,"Thanks, we are connecting you to one of our customer service representatives now.");
    var changeMsg1 = defaultValue(localizationMessages.changeMsg1,"Please choose from a date and time below by replying A, B or C. If you need more options, reply MORE.");
    var changeMsg2 = defaultValue(localizationMessages.changeMsg2,"at");
    var changeMsg3 = defaultValue(localizationMessages.changeMsg3,"Or if you would like to have a chat with our customer service team first, reply CHAT.");
    var changeMsg4 = defaultValue(localizationMessages.changeMsg4,"Please choose from a date and time. If you need more options, reply MORE. Or if you would like to have a chat with our customer service team first, reply CHAT.");
    var changeMsg5 = defaultValue(localizationMessages.changeMsg5,"Please choose from a date and time below by replying A, B or C.");
    var moreKeyword = defaultValue(localizationMessages.moreKeyword,"more");
    var moreKeywordSimple = defaultValue(localizationMessages.moreKeywordSimple,"more");
    var optionMsg1 = defaultValue(localizationMessages.optionMsg1,"Thank you");
    var optionMsg2 = defaultValue(localizationMessages.optionMsg2,"Your appointment with");
    var optionMsg3 = defaultValue(localizationMessages.optionMsg3,"has been changed to");
    var optionMsg4 = defaultValue(localizationMessages.optionMsg4,"at");
    var optionMsg5 = defaultValue(localizationMessages.optionMsg5,"We look forward to seeing you at");
    var optionMsg6 = defaultValue(localizationMessages.optionMsg6,"then.");
    var optionMsg7 = defaultValue(localizationMessages.optionMsg7,"If you require further assistance, please reply CHAT within the next 5 minutes.");
    var moreMsg1 = defaultValue(localizationMessages.moreMsg1,"No problem, please reply with a day your available on in the next couple of weeks.");
    var moreMsg2 = defaultValue(localizationMessages.moreMsg2,"Thanks, please reply YES if this is your date:");
    var moreMsg3 = defaultValue(localizationMessages.moreMsg3,"Or NO if this is incorrect.");
    var moreMsg4 = defaultValue(localizationMessages.moreMsg4,"We are sorry. Please try your date again in a different format.");
    var moreMsg5 = defaultValue(localizationMessages.moreMsg5,"Sorry, we're connecting you to one of our customer service representatives now.");
    var moreMsg6 = defaultValue(localizationMessages.moreMsg6,"Please choose from a time below by replying A, B or C.");
    var moreMsg7 = defaultValue(localizationMessages.moreMsg7,"Or if none of the above times suit you, you can chat with our customer service team, just reply CHAT.");
    var moreMsg8 = defaultValue(localizationMessages.moreMsg8,"We didn't recognise your input. Can you please try sending us a date that suits you again?");
    var moreMsg9 = defaultValue(localizationMessages.moreMsg9,"Please note that displayed date is in day/month/year format.");
    var errorMsg1 = defaultValue(localizationMessages.errorMsg1,"Sorry, we didn't recognise your response.");
    var errorMsg2 = defaultValue(localizationMessages.errorMsg2,"Sorry, we didn't recognise your response again.");
    var errorMsg3 = defaultValue(localizationMessages.errorMsg3,"You timed out, please note you have 3 minutes to respond for the demo.");
    var errorMsg4 = defaultValue(localizationMessages.errorMsg4,"As we haven't received a response, we have cancelled your appointment. If you want to book another appointment, just visit us again. Thanks.");
    var errorMsg5 = defaultValue(localizationMessages.errorMsg5,"To change your appointment, just reply, CHANGE. To cancel, reply, CANCEL.");
    var errorMsg6 = defaultValue(localizationMessages.errorMsg6,"We are connecting you to one of our customer service representatives now.");
    var errorMsg7 = defaultValue(localizationMessages.errorMsg7,"If you are sure you want to cancel then please reply, YES. Or to chat with our customer service team, reply CHAT.");
    var MondayMsg = defaultValue(localizationMessages.MondayMsg,"Monday");
    var TuesdayMsg = defaultValue(localizationMessages.TuesdayMsg,"Tuesday");
    var WednesdayMsg = defaultValue(localizationMessages.WednesdayMsg,"Wednesday");
    var ThursdayMsg = defaultValue(localizationMessages.ThursdayMsg,"Thursday");
    var FridayMsg = defaultValue(localizationMessages.FridayMsg,"Friday");
    var SaturdayMsg = defaultValue(localizationMessages.SaturdayMsg,"Saturday");
    var SundayMsg = defaultValue(localizationMessages.SundayMsg,"Sunday");
}

if (journey == "collections") {
    var collections = jsonObjct.collections;

    var brandName = defaultValue(collections.brandName,"Cumulus Finance");
}

if (journey == "callDeflection") {
    var callDeflection = jsonObjct.callDeflection;

    var brandName = defaultValue(callDeflection.brandName,"Cumulus Healthcare");
    var brandBuilding = defaultValue(callDeflection.brandBuilding,"Cumulus Healthcare store");
}

if (journey == "productActivationTS") {
    var productActivationTS = jsonObjct.productActivationTS;

    var brandName = defaultValue(productActivationTS.brandName,"Cumulus Utility");
    var custName = defaultValue(productActivationTS.custName,"Michael Littlefoot");
    var custAddress = defaultValue(productActivationTS.custAddress,"1125 Madison Avenue, New York, NY");
    var custPostcode = defaultValue(productActivationTS.custPostcode,"10028");
    var custEmailAddress = defaultValue(productActivationTS.custEmailAddress,"michael.littlefoot@dcloud.cisco.com");
}

if (journey == "productActivationSO") {
    var productActivationSO = jsonObjct.productActivationSO;

    var brandName = defaultValue(productActivationSO.brandName,"Cumulus Mobile");
    var brandCurrency = defaultValue(productActivationSO.brandCurrency,"USD");
    var brandWebsite = defaultValue(productActivationSO.brandWebsite,"https://www.webex.com/");
    var brandLogo = defaultValue(productActivationSO.brandLogo,"https://mm.cxdemo.net/static/images/cumulus/common/webex-logo.jpg");
}

if (journey == "automotive") {
    var automotive = jsonObjct.automotive;

    var brandName = defaultValue(automotive.brandName,"Cumulus Automotive");
    var brandWebsite = defaultValue(automotive.brandWebsite,"https://www.webex.com/");
    var brandLogo = defaultValue(automotive.brandLogo,"https://mm.cxdemo.net/static/images/cumulus/common/webex-logo.jpg");
}

if (journey == "retail") {
    var retail = jsonObjct.retail;

    var brandName = defaultValue(retail.brandName,"Cumulus Retail");
    var brandCurrency = defaultValue(retail.brandCurrency,"USD");
    var brandWebsite = defaultValue(retail.brandWebsite,"https://www.webex.com/");
    var brandAddress = defaultValue(retail.brandAddress,"170 West Tasman Dr., San Jose, CA");
    var brandLogo = defaultValue(retail.brandLogo,"https://mm.cxdemo.net/static/images/cumulus/common/webex-logo.jpg");
}

if (journey == "insuranceRenew") {
    var insuranceRenew = jsonObjct.insuranceRenew;

    var brandName = defaultValue(insuranceRenew.brandName,"Cumulus Insurance");
    var brandCurrency = defaultValue(insuranceRenew.brandCurrency,"USD");
    var custName = defaultValue(insuranceRenew.custName,"Michael Littlefoot");
    var custEmailAddress = defaultValue(insuranceRenew.custEmailAddress,"michael.littlefoot@dcloud.cisco.com");
    var policyCost = defaultValue(insuranceRenew.policyCost,"125");
    var brandLogo = defaultValue(insuranceRenew.brandLogo,"https://mm.cxdemo.net/static/images/cumulus/common/webex-logo.jpg");
    var walletTemplateId = defaultValue(insuranceRenew.walletTemplateId,"5c4b710d-c56d-4989-810b-28a4ec73b676");
}

if (journey == "insuranceClaim") {
    var insuranceClaim = jsonObjct.insuranceClaim;

    var custName = defaultValue(insuranceClaim.custName,"Michael Littlefoot");
    var brandName = defaultValue(insuranceClaim.brandName,"Cumulus Insurance");
    var weatherEvent = defaultValue(insuranceClaim.weatherEvent,"a flood event");
    var brandWebsite = defaultValue(insuranceRenew.brandWebsite,"https://www.webex.com/");
    var brandLogo = defaultValue(insuranceRenew.brandLogo,"https://mm.cxdemo.net/static/images/cumulus/common/webex-logo.jpg");
}

"1"

// To be used for testing using node
console.log("welcomeMessage:", welcomeMessage)

//////////////////////////////
// Original Code from David //
//////////////////////////////

// var jsonObjct = JSON.parse("$(n23.webexConnect)");

// if (jsonObjct !== null) {
//     if (jsonObjct.global !== null) {
//         if (jsonObjct.global.brandName.length > 1) {
//             var brandName = jsonObjct.global.brandName;
//         }
//         if (jsonObjct.global.brandLogo.length > 1) {
//             var brandLogo = jsonObjct.global.brandLogo;
//         }
//         if (jsonObjct.global.brandBuilding.length > 1) {
//             var brandBuilding = jsonObjct.global.brandBuilding;
//         }
//         if (jsonObjct.global.brandCurrency.length > 1) {
//             var brandCurrency = jsonObjct.global.brandCurrency;
//         }
//         if (jsonObjct.global.brandWebsite.length > 1) {
//             var brandWebsite = jsonObjct.global.brandWebsite;
//         }
//         if (jsonObjct.global.brandAddress.length > 1) {
//             var brandAddress = jsonObjct.global.brandAddress;
//         }
//         if (jsonObjct.global.repTitle.length > 1) {
//             var repTitle = jsonObjct.global.repTitle;
//         }
//         if (jsonObjct.global.repName.length > 1) {
//             var repName = jsonObjct.global.repName;
//         }
//         if (jsonObjct.global.repBuilding.length > 1) {
//             var repBuilding = jsonObjct.global.repBuilding;
//         }
//         if (jsonObjct.global.custName.length > 1) {
//             var custName = jsonObjct.global.custName;
//         }
//         if (jsonObjct.global.custAddress.length > 1) {
//             var custAddress = jsonObjct.global.custAddress;
//         }
//         if (jsonObjct.global.custPostcode.length > 1) {
//             var custPostcode = jsonObjct.global.custPostcode;
//         }
//         if (jsonObjct.global.custEmailAddress.length > 1) {
//             var custEmailAddress = jsonObjct.global.custEmailAddress;
//         }
//     }

//     if (journey == "appointments" && jsonObjct.appointments !== null) {
//         if (jsonObjct.appointments.brandName.length > 1) {
//             var brandName = jsonObjct.appointments.brandName;
//         }
//         if (jsonObjct.appointments.repTitle.length > 1) {
//             var repTitle = jsonObjct.appointments.repTitle;
//         }
//         if (jsonObjct.appointments.repName.length > 1) {
//             var repName = jsonObjct.appointments.repName;
//         }
//         if (jsonObjct.appointments.repBuilding.length > 1) {
//             var repBuilding = jsonObjct.appointments.repBuilding;
//         }
//     }

//     if (journey == "collections" && jsonObjct.collections !== null) {
//         if (jsonObjct.collections.brandName.length > 1) {
//             var brandName = jsonObjct.collections.brandName;
//         }
//         if (jsonObjct.collections.brandBuilding.length > 1) {
//             var brandBuilding = jsonObjct.collections.brandBuilding;
//         }
//     }

//     if (journey == "callDeflection" && jsonObjct.callDeflection !== null) {
//         if (jsonObjct.callDeflection.brandName.length > 1) {
//             var brandName = jsonObjct.callDeflection.brandName;
//         }
//         if (jsonObjct.callDeflection.brandBuilding.length > 1) {
//             var brandBuilding = jsonObjct.callDeflection.brandBuilding;
//         }
//     }

//     if (journey == "productActivationTS" && jsonObjct.productActivationTS !== null) {
//         if (jsonObjct.productActivationTS.brandName.length > 1) {
//             var brandName = jsonObjct.productActivationTS.brandName;
//         }
//         if (jsonObjct.productActivationTS.custName.length > 1) {
//             var custName = jsonObjct.productActivationTS.custName;
//         }
//         if (jsonObjct.productActivationTS.custAddress.length > 1) {
//             var custAddress = jsonObjct.productActivationTS.custAddress;
//         }
//         if (jsonObjct.productActivationTS.custPostcode.length > 1) {
//             var custPostcode = jsonObjct.productActivationTS.custPostcode;
//         }
//         if (jsonObjct.productActivationTS.custEmailAddress.length > 1) {
//             var custEmailAddress = jsonObjct.productActivationTS.custEmailAddress;
//         }
//     }

//     if (journey == "productActivationSO" && jsonObjct.productActivationSO !== null) {
//         if (jsonObjct.productActivationSO.brandName.length > 1) {
//             var brandName = jsonObjct.productActivationSO.brandName;
//         }
//         if (jsonObjct.productActivationSO.brandBuilding.length > 1) {
//             var brandBuilding = jsonObjct.productActivationSO.brandBuilding;
//         }
//         if (jsonObjct.productActivationSO.brandCurrency.length > 1) {
//             var brandCurrency = jsonObjct.productActivationSO.brandCurrency;
//         }
//         if (jsonObjct.productActivationSO.brandWebsite.length > 1) {
//             var brandWebsite = jsonObjct.productActivationSO.brandWebsite;
//         }
//     }

//     if (journey == "automotive" && jsonObjct.automotive !== null) {
//         if (jsonObjct.automotive.brandName.length > 1) {
//             var brandName = jsonObjct.automotive.brandName;
//         }
//         if (jsonObjct.automotive.brandWebsite.length > 1) {
//             var brandWebsite = jsonObjct.automotive.brandWebsite;
//         }
//     }

//     if (journey == "retail" && jsonObjct.retail !== null) {
//         if (jsonObjct.retail.brandName.length > 1) {
//             var brandName = jsonObjct.retail.brandName;
//         }
//         if (jsonObjct.retail.brandCurrency.length > 1) {
//             var brandCurrency = jsonObjct.retail.brandCurrency;
//         }
//         if (jsonObjct.retail.brandWebsite.length > 1) {
//             var brandWebsite = jsonObjct.retail.brandWebsite;
//         }
//         if (jsonObjct.retail.brandAddress.length > 1) {
//             var brandAddress = jsonObjct.retail.brandAddress;
//         }
//     }
// }

// "1"