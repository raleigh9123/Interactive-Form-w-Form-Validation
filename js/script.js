//Basic Info Section
//--- Place cursor in first text field on page load and add "other" job role to the form's inputs 

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
    if(jobRoleSelection === 'other') {
        otherJobRole.toggle();
    } else {
        otherJobRole.hide();
    }
})


//T-Shirt Info Section
//---Require design selection before color selection is made available, then refine available colors by selection

//Disable and hide "Select Theme" from Design Options Select
const designSelect = $('#design');
designSelect.children()[0].setAttribute('disabled',true);
designSelect.children().first().hide();

//Shirt Color option disabled on load
const shirtColorSelect = $('#color');
shirtColorSelect.attr('disabled', true);
//Add "Please Select T-Shirt" prompt in greyed out "Color" select
const colorSelect = $('#color');
colorSelect.prepend("<option>Please select T-shirt theme</option>");
const colorInputs = colorSelect.children();
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

//Show corresponding color input when design theme is selected
designSelect.change(() => {
    //Find the selected design input and capture the attributes value
    let designSelection = designSelect.find(':selected').attr('value');
    //When input is selected, use value above to toggle the shirt's visibility according to type determined in arrays listed above
    if (designSelection === 'js puns' || designSelection === 'heart js') {
        //Enable shirt color select
        shirtColorSelect.attr('disabled', false);
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
//---Overview of Activities

//