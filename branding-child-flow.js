// var jsonObjct = JSON.parse("$(n23.webexConnect)");

// To be used for testing using node
// node branding-child-flow.js
var jsonObjct = require("./client/store/modules/default-vertical.json").webexconnect;
var journey = "appointments";

if (jsonObjct !== null) {
    if (jsonObjct.global !== null) {
        var global = jsonObjct.global;

        if (jsonObjct.global.brandName.length > 1) {
            var brandName = jsonObjct.global.brandName;
        }
        if (jsonObjct.global.brandLogo.length > 1) {
            var brandLogo = jsonObjct.global.brandLogo;
        }
        if (jsonObjct.global.brandBuilding.length > 1) {
            var brandBuilding = jsonObjct.global.brandBuilding;
        }
        if (jsonObjct.global.brandCurrency.length > 1) {
            var brandCurrency = jsonObjct.global.brandCurrency;
        }
        if (jsonObjct.global.brandWebsite.length > 1) {
            var brandWebsite = jsonObjct.global.brandWebsite;
        }
        if (jsonObjct.global.brandAddress.length > 1) {
            var brandAddress = jsonObjct.global.brandAddress;
        }
        if (jsonObjct.global.repTitle.length > 1) {
            var repTitle = jsonObjct.global.repTitle;
        }
        if (jsonObjct.global.repName.length > 1) {
            var repName = jsonObjct.global.repName;
        }
        if (jsonObjct.global.repBuilding.length > 1) {
            var repBuilding = jsonObjct.global.repBuilding;
        }
        if (jsonObjct.global.custName.length > 1) {
            var custName = jsonObjct.global.custName;
        }
        if (jsonObjct.global.custAddress.length > 1) {
            var custAddress = jsonObjct.global.custAddress;
        }
        if (jsonObjct.global.custPostcode.length > 1) {
            var custPostcode = jsonObjct.global.custPostcode;
        }
        if (jsonObjct.global.custEmailAddress.length > 1) {
            var custEmailAddress = jsonObjct.global.custEmailAddress;
        }
    }

    if (journey == "appointments" && jsonObjct.appointments !== null) {
        var appointments = jsonObjct.appointments;

        if (jsonObjct.appointments.brandName.length > 1) {
            var brandName = jsonObjct.appointments.brandName;
        }
        if (jsonObjct.appointments.repTitle.length > 1) {
            var repTitle = jsonObjct.appointments.repTitle || "your Financial Advisor";
        }
        if (jsonObjct.appointments.repName.length > 1) {
            var repName = jsonObjct.appointments.repName;
        }
        if (jsonObjct.appointments.repBuilding.length > 1) {
            var repBuilding = jsonObjct.appointments.repBuilding;
        }
        if (jsonObjct.appointments[jsonObjct.global.language] !== null) {
            var localizationMessages = jsonObjct.appointments[jsonObjct.global.language];

            if (localizationMessages.enterName.length > 0) {
                var enterName = localizationMessages.enterName;
            }
            if (localizationMessages.enterName.length > 0) {
                var enterPhoneNumber = localizationMessages.enterPhoneNumber;
            }
        }
        var welcomeMessage = enterName + " ," + enterPhoneNumber;
    }

    if (journey == "collections" && jsonObjct.collections !== null) {
        if (jsonObjct.collections.brandName.length > 1) {
            var brandName = jsonObjct.collections.brandName;
        }
        if (jsonObjct.collections.brandBuilding.length > 1) {
            var brandBuilding = jsonObjct.collections.brandBuilding;
        }
    }

    if (journey == "callDeflection" && jsonObjct.callDeflection !== null) {
        if (jsonObjct.callDeflection.brandName.length > 1) {
            var brandName = jsonObjct.callDeflection.brandName;
        }
        if (jsonObjct.callDeflection.brandBuilding.length > 1) {
            var brandBuilding = jsonObjct.callDeflection.brandBuilding;
        }
    }

    if (journey == "productActivationTS" && jsonObjct.productActivationTS !== null) {
        if (jsonObjct.productActivationTS.brandName.length > 1) {
            var brandName = jsonObjct.productActivationTS.brandName;
        }
        if (jsonObjct.productActivationTS.custName.length > 1) {
            var custName = jsonObjct.productActivationTS.custName;
        }
        if (jsonObjct.productActivationTS.custAddress.length > 1) {
            var custAddress = jsonObjct.productActivationTS.custAddress;
        }
        if (jsonObjct.productActivationTS.custPostcode.length > 1) {
            var custPostcode = jsonObjct.productActivationTS.custPostcode;
        }
        if (jsonObjct.productActivationTS.custEmailAddress.length > 1) {
            var custEmailAddress = jsonObjct.productActivationTS.custEmailAddress;
        }
    }

    if (journey == "productActivationSO" && jsonObjct.productActivationSO !== null) {
        if (jsonObjct.productActivationSO.brandName.length > 1) {
            var brandName = jsonObjct.productActivationSO.brandName;
        }
        if (jsonObjct.productActivationSO.brandBuilding.length > 1) {
            var brandBuilding = jsonObjct.productActivationSO.brandBuilding;
        }
        if (jsonObjct.productActivationSO.brandCurrency.length > 1) {
            var brandCurrency = jsonObjct.productActivationSO.brandCurrency;
        }
        if (jsonObjct.productActivationSO.brandWebsite.length > 1) {
            var brandWebsite = jsonObjct.productActivationSO.brandWebsite;
        }
    }

    if (journey == "automotive" && jsonObjct.automotive !== null) {
        if (jsonObjct.automotive.brandName.length > 1) {
            var brandName = jsonObjct.automotive.brandName;
        }
        if (jsonObjct.automotive.brandWebsite.length > 1) {
            var brandWebsite = jsonObjct.automotive.brandWebsite;
        }
    }

    if (journey == "retail" && jsonObjct.retail !== null) {
        if (jsonObjct.retail.brandName.length > 1) {
            var brandName = jsonObjct.retail.brandName;
        }
        if (jsonObjct.retail.brandCurrency.length > 1) {
            var brandCurrency = jsonObjct.retail.brandCurrency;
        }
        if (jsonObjct.retail.brandWebsite.length > 1) {
            var brandWebsite = jsonObjct.retail.brandWebsite;
        }
        if (jsonObjct.retail.brandAddress.length > 1) {
            var brandAddress = jsonObjct.retail.brandAddress;
        }
    }
}

// "1"

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