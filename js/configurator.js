/*=========================================================
 NEXPAK SECURITY SOLUTIONS V5
 PRODUCT CONFIGURATOR
 configurator.js
 PART 1/4
=========================================================*/


//=========================================================
// INITIALIZE CONFIGURATORS
//=========================================================

document.addEventListener("DOMContentLoaded",()=>{

    initializeConfigurator();

});




//=========================================================
// PRODUCT CONFIGURATOR
//=========================================================


function initializeConfigurator(){


    const products =
    document.querySelectorAll(".product-config");



    products.forEach(product=>{


        const selects =
        product.querySelectorAll("select");



        selects.forEach(select=>{


            select.addEventListener(
            "change",
            ()=>{


                updateProductPrice(product);


                updateConfiguration(product);


            });


        });



        updateProductPrice(product);


    });


}







//=========================================================
// UPDATE PRODUCT PRICE
//=========================================================


function updateProductPrice(product){



    let basePrice =
    Number(product.dataset.price);



    let optionPrice = 0;



    const options =
    product.querySelectorAll("select");



    options.forEach(option=>{


        const selected =
        option.options[
        option.selectedIndex
        ];



        optionPrice +=

        Number(
        selected.dataset.price || 0
        );



    });




    const quantity =
    product.querySelector(".product-qty");



    let qty = 1;



    if(quantity){

        qty =
        Number(quantity.value);

    }




    const total =

    (basePrice + optionPrice)
    * qty;




    const priceDisplay =

    product.querySelector(
    ".live-price"
    );



    if(priceDisplay){


        priceDisplay.innerHTML =

        "R" +
        total.toLocaleString();


    }


}





//=========================================================
// UPDATE CONFIGURATION SUMMARY
//=========================================================


function updateConfiguration(product){



    const summary =

    product.querySelector(
    ".configuration-summary"
    );



    if(!summary) return;




    let html = "";



    const selects =

    product.querySelectorAll(
    "select"
    );




    selects.forEach(select=>{


        const label =
        select.dataset.option;



        const value =
        select.value;




        html += `

        <p>

        <strong>${label}:</strong>
        ${value}

        </p>

        `;


    });



    summary.innerHTML = html;



      }
/*=========================================================
 CCTV CONFIGURATION ENGINE
 PART 2/4
=========================================================*/


//=========================================================
// CCTV SETTINGS DATABASE
//=========================================================


const cctvOptions = {


    "8 Channel":{

        cameras:8,

        type:"DVR System"

    },


    "16 Channel":{

        cameras:16,

        type:"DVR System"

    },


    "32 Channel":{

        cameras:32,

        type:"DVR System"

    }


};







//=========================================================
// IP CCTV SETTINGS
//=========================================================


const ipCameraOptions = {


    "8 Channel IP":{

        cameras:8,

        type:"NVR System"

    },


    "16 Channel IP":{

        cameras:16,

        type:"NVR System"

    },


    "32 Channel IP":{

        cameras:32,

        type:"NVR System"

    }


};







//=========================================================
// CCTV AUTO CONFIGURATION
//=========================================================


function initializeCCTVConfigurator(){



    const systems =

    document.querySelectorAll(
    ".cctv-config"
    );



    systems.forEach(system=>{


        const channel =
        system.querySelector(
        "[data-option='Channel']"
        );



        if(!channel) return;




        channel.addEventListener(
        "change",
        ()=>{


            updateCameraInformation(
            system
            );


        });


    });



}








//=========================================================
// UPDATE CAMERA INFORMATION
//=========================================================


function updateCameraInformation(system){



    const channel =

    system.querySelector(
    "[data-option='Channel']"
    );



    const display =

    system.querySelector(
    ".camera-info"
    );



    if(!channel || !display)
    return;




    const selected =
    channel.value;



    let data =
    cctvOptions[selected]
    ||
    ipCameraOptions[selected];



    if(!data)
    return;




    display.innerHTML = `


    <div class="system-info">


    <p>

    <strong>System:</strong>

    ${data.type}

    </p>


    <p>

    <strong>Camera Capacity:</strong>

    ${data.cameras} Cameras

    </p>


    </div>


    `;



}








//=========================================================
// STORAGE CALCULATOR
//=========================================================


function calculateStorage(system){



    const storage =

    system.querySelector(
    "[data-option='Storage']"
    );



    const storageInfo =

    system.querySelector(
    ".storage-info"
    );



    if(!storage || !storageInfo)
    return;




    let result="";



    switch(storage.value){


        case "1TB":

            result =
            "Approx. 7-14 days recording";

        break;



        case "2TB":

            result =
            "Approx. 14-30 days recording";

        break;



        case "4TB":

            result =
            "Approx. 30-60 days recording";

        break;



        default:

            result =
            "Select storage size";


    }



    storageInfo.innerHTML =
    result;


}








//=========================================================
// START CCTV MODULE
//=========================================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    initializeCCTVConfigurator();



    document
    .querySelectorAll(".cctv-config")
    .forEach(system=>{


        calculateStorage(system);


    });


});
/*=========================================================
 GATE MOTOR + ROBOGUARD CONFIGURATOR
 PART 3/4
=========================================================*/


//=========================================================
// GATE MOTOR DATABASE
//=========================================================


const gateMotorOptions = {


    "Centurion D5 Evo":{

        maxWeight:"500kg",

        category:"Sliding Gate Motor"

    },


    "Centurion D5 Smart":{

        maxWeight:"500kg",

        category:"Smart Sliding Gate Motor"

    },


    "Centurion D10 Smart":{

        maxWeight:"1000kg",

        category:"Heavy Duty Sliding Gate Motor"

    },


    "Centurion D10 Turbo":{

        maxWeight:"1000kg+",

        category:"Industrial Sliding Gate Motor"

    }


};






//=========================================================
// INITIALIZE GATE MOTOR CONFIG
//=========================================================


function initializeGateConfigurator(){


    const motors =

    document.querySelectorAll(
    ".gate-config"
    );



    motors.forEach(motor=>{


        const selects =

        motor.querySelectorAll(
        "select"
        );



        selects.forEach(select=>{


            select.addEventListener(
            "change",
            ()=>{


                updateGateMotorInfo(
                motor
                );


            });


        });



    });


}






//=========================================================
// UPDATE GATE MOTOR INFORMATION
//=========================================================


function updateGateMotorInfo(motor){


    const model =

    motor.querySelector(
    "[data-option='Motor']"
    );



    const display =

    motor.querySelector(
    ".motor-info"
    );



    if(!model || !display)
    return;




    const data =

    gateMotorOptions[
    model.value
    ];



    if(!data)
    return;



    display.innerHTML = `


    <div class="system-info">


    <p>
    <strong>Type:</strong>
    ${data.category}
    </p>


    <p>
    <strong>Gate Capacity:</strong>
    ${data.maxWeight}
    </p>


    </div>


    `;


}







//=========================================================
// BATTERY OPTIONS
//=========================================================


const batteryOptions = {


    "7Ah Battery":{

        type:"Standard Backup Battery"

    },


    "9Ah Gel Battery":{

        type:"High Performance Gel Battery"

    }


};







//=========================================================
// ROBOGUARD DATABASE
//=========================================================


const roboGuardOptions = {


    "4 Beam Kit":{

        beams:4

    },


    "6 Beam Kit":{

        beams:6

    },


    "8 Beam Kit":{

        beams:8

    }


};







//=========================================================
// INITIALIZE ROBOGUARD
//=========================================================


function initializeRoboGuard(){



    const products =

    document.querySelectorAll(
    ".roboguard-config"
    );



    products.forEach(product=>{


        const selects =

        product.querySelectorAll(
        "select"
        );



        selects.forEach(select=>{


            select.addEventListener(
            "change",
            ()=>{


                updateRoboGuardInfo(
                product
                );


            });


        });


    });



}







//=========================================================
// ROBOGUARD SUMMARY
//=========================================================


function updateRoboGuardInfo(product){


    const beam =

    product.querySelector(
    "[data-option='Beam Kit']"
    );



    const colour =

    product.querySelector(
    "[data-option='Colour']"
    );



    const display =

    product.querySelector(
    ".roboguard-info"
    );



    if(!beam || !colour || !display)
    return;




    const beamData =

    roboGuardOptions[
    beam.value
    ];




    display.innerHTML = `


    <p>

    <strong>Beam Count:</strong>

    ${beamData.beams}

    </p>


    <p>

    <strong>Colour:</strong>

    ${colour.value}

    </p>


    `;



}







//=========================================================
// START MODULES
//=========================================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    initializeGateConfigurator();


    initializeRoboGuard();



});
/*=========================================================
 ELECTRIC FENCE CONFIGURATOR
 PART 4/4
=========================================================*/



//=========================================================
// ELECTRIC FENCE DATABASE
//=========================================================


const electricFenceData = {


    "Round Bar - 6 Line":{

        lines:6

    },


    "Flat Bar - 6 Line":{

        lines:6

    },


    "Square Tube - 6 Line":{

        lines:6

    },


    "Square Tube - 8 Line":{

        lines:8

    },


    "Square Tube - 10 Line":{

        lines:10

    },


    "Square Tube - 12 Line":{

        lines:12

    }


};






//=========================================================
// INITIALIZE ELECTRIC FENCE BUILDER
//=========================================================


function initializeElectricFence(){



    const systems =

    document.querySelectorAll(
    ".electric-fence-config"
    );



    systems.forEach(system=>{


        const inputs =

        system.querySelectorAll(
        "select,input"
        );



        inputs.forEach(input=>{


            input.addEventListener(
            "change",
            ()=>{


                calculateFenceSystem(
                system
                );


            });



        });



    });


}







//=========================================================
// FENCE CALCULATOR
//=========================================================


function calculateFenceSystem(system){



    const fenceType =

    system.querySelector(
    "[data-option='Fence Type']"
    );



    const metres =

    system.querySelector(
    "[data-option='Property Metres']"
    );



    const summary =

    system.querySelector(
    ".fence-summary"
    );



    if(
    !fenceType ||
    !metres ||
    !summary
    )
    return;





    const fence =

    electricFenceData[
    fenceType.value
    ];



    const distance =

    Number(
    metres.value
    );



    if(!fence)
    return;




    const wireRequired =

    distance *
    fence.lines;



    const rolls =

    Math.ceil(
    wireRequired / 700
    );





    summary.innerHTML = `


    <h3>
    System Calculation
    </h3>


    <p>
    Fence Type:
    ${fenceType.value}
    </p>


    <p>
    Fence Lines:
    ${fence.lines}
    </p>


    <p>
    Property Size:
    ${distance} metres
    </p>


    <p>
    Estimated Wire:
    ${wireRequired} metres
    </p>


    <p>
    Recommended Wire Rolls:
    ${rolls}
    </p>


    `;



}







//=========================================================
// ACCESSORY SUMMARY
//=========================================================


function getFenceAccessories(system){


    let accessories = {};



    const options =

    system.querySelectorAll(
    "select"
    );



    options.forEach(option=>{


        accessories[
        option.dataset.option
        ] =
        option.value;



    });



    return accessories;


}







//=========================================================
// ADD FENCE CONFIGURATION TO CART
//=========================================================


function addFenceToCart(button){



    const product =

    button.closest(
    ".electric-fence-config"
    );



    const summary =

    getFenceAccessories(
    product
    );



    const item = {


        id:
        "electric-fence-system",


        name:
        "Electric Fence System",


        image:
        "../images/electric-fence.jpg",


        price:
        Number(
        product.dataset.price
        ),


        quantity:1,


        options:
        summary



    };



    addToCart(item);



}






//=========================================================
// FENCE CART BUTTON
//=========================================================


document.addEventListener(
"click",
(e)=>{


    if(
    e.target.classList.contains(
    "add-fence-cart"
    )
    ){


        addFenceToCart(
        e.target
        );


    }


});







//=========================================================
// START ELECTRIC FENCE MODULE
//=========================================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    initializeElectricFence();


});
