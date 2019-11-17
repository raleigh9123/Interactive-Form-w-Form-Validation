//Basic Info Section
//--- On page load, place cursor in first text field. Add "other" job role to the form's inputs and toggle the "other" text input box when selected

//On page load, cursor appears in "Name" field
$(document).ready(() => {
    $('#name').focus();
})

//Initially hide other job role text field
const jobRoleSelect = $('#title');
const otherJobRole = $('#other-title');
otherJobRole.hide();

//If job role of "other" is selected, reveal "Other" input text field
jobRoleSelect.change(() => {
    let jobRoleSelection = jobRoleSelect.find(':selected').attr('value');
    if (jobRoleSelection === 'other') {
        otherJobRole.toggle();
    } else {
        otherJobRole.hide();
    }
})


//T-Shirt Info Section
//---Require design selection before color selection is made available, then refine available colors by input option user selected

//Disable and hide "Select Theme" from Design Options Select
const designSelect = $('#design');
designSelect.children()[0].setAttribute('disabled', true);
designSelect.children().first().hide();

//Shirt Color option disabled on load
const shirtColorSelect = $('#color');
shirtColorSelect.attr('disabled', true);
//Add "Please Select T-Shirt" prompt in greyed out "Color" select
const colorSelect = $('#color');
colorSelect.prepend("<option>Please select T-shirt theme</option>");
const colorInputs = colorSelect.children();
//Set first input in Design list as selected by default (on load only);
colorInputs[0].selected = true;

//Declare arrays to include indexes of shirt colors to correspond with design theme
let JSPunsArray = [];
let iHeartJSArray = [];

//Categorize shirts and push array index into corresponding arrays
colorInputs.each(function (index) {
    if ($(this).text().includes('JS Puns')) {
        JSPunsArray.push(index);
    } else if ($(this).text().includes('JS shirt')) {
        iHeartJSArray.push(index);
    }
})

//Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
const colorField = $('#colors-js-puns');
colorField.hide();

//Show corresponding color input when design theme is selected
designSelect.change(() => {
    //Find the selected design input and capture the attributes value
    let designSelection = designSelect.find(':selected').attr('value');
    //When input is selected, use value above to toggle the shirt's visibility according to type determined in arrays listed above
    if (designSelection === 'js puns' || designSelection === 'heart js') {
        //Enable shirt color select
        shirtColorSelect.attr('disabled', false);
        colorField.show();
        //First hide all inputs
        colorInputs.each(function () {
            $(this).hide();
        })
        //Then toggle each input that corresponds with the design theme type. e.g. 'js puns' shirt will enable shirts that have "JS Puns shirt only" in the text
        if (designSelection === 'js puns') {
            colorInputs.each(function (index) {
                if (JSPunsArray.includes(index)) {
                    $(this).toggle();
                }
            })
            colorInputs[JSPunsArray[0]].selected = true;
        }
        if (designSelection === 'heart js') {
            colorInputs.each(function (index) {
                if (iHeartJSArray.includes(index)) {
                    $(this).toggle();
                }
            })
            colorInputs[iHeartJSArray[0]].selected = true;
        }
    }
});

//Activities Section
//---Create a total cost element and append to DOM beneath input options. Then set initial activities cost to $0. On input change, add or subtract activity's cost and update total cost. On input change, prevent conflicting activities by comparing the day and time attributes given in each input.

//Create a total cost and append below all activity options
const totalCost = document.createElement('h3');
totalCost.textContent = 'Total Cost: $0'
$('.activities').append(totalCost);

//Set the initial activity cost to 0;
let totalActivityCost = 0;

//Event Handler for the Activities Section. On input check/de-check...
$('.activities').change((e) => {
    //Local variable for selected input
    let clicked = e.target;

    //Take the clicked input's data-cost value
    let inputCost = clicked.dataset.cost;
    //Remove the dollar sign by replacing $ with an empty string
    inputCost = inputCost.replace('$', '');
    //Take the string and run parseInt to convert to integer
    inputCost = parseInt(inputCost, 10);
    //If the input is checked, add its value to totalActivity Cost, otherwise subtract the value
    if (clicked.checked) {
        totalActivityCost += inputCost;
    } else {
        totalActivityCost -= inputCost;
    };
    //Change the text content of the total cost h3 tag added to DOM above
    document.querySelector('.activities h3').textContent = `Total Cost: $${totalActivityCost}`;

    //If item is selected with a given date, disable conflicting dates
    //Define the clicked items day and time data- attribute
    let clickedDate = e.target.dataset.dayAndTime;
    //Variable to store all activities checkbox inputs
    const checkboxes = document.querySelectorAll('.activities input');
    //Loop compares the clicked input's day and time and compares with all other day and time inputs. If match, disable checkbox, otherwise enable checkbox.
    for (i = 0; i < checkboxes.length; i++) {
        let inputsDate = checkboxes[i].dataset.dayAndTime;
        if (clickedDate === inputsDate && clicked !== checkboxes[i]) {
            if (clicked.checked) {
                checkboxes[i].disabled = true;
            } else {
                checkboxes[i].disabled = false;
            }
        }
    }
});

//Payment Info Section
//---Hide "Select Payment Method" from payment options 'select' options. 

//Display payment sections based on the payment option chosen in the select menu.
const paymentInput = $('#payment');
const paymentSelections = $('#payment option');
//Disabled "Select Payment Method" from options list
paymentInput.children().first().hide();
//Make "Credit Card" the default selected payment method
paymentSelections[1].selected = true;

//Hide alternate payment paragraph details by default
$('#paypal').hide();
$('#bitcoin').hide();

//Payment Method Input Change Event Handler
paymentInput.change( (e) => {
    let currentPaymentMethod = paymentInput.find(':selected').attr('value');
    if(currentPaymentMethod === 'Credit Card') {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    } else if (currentPaymentMethod === 'PayPal') {
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    } else if (currentPaymentMethod === 'Bitcoin') {
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();;
    }

});
