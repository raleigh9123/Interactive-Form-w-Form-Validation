//jQuery enabled javascript file

//On page load, cursor appears in "Name" field
$(document).ready(() => {
    $('#name').focus();
})

//Initially hide other job role text field
const jobRoleSelect = $('#title');
const otherJobRole = $('#other-title');
otherJobRole.hide();

jobRoleSelect.change(() => {
    let jobRoleSelection = jobRoleSelect.find(':selected').attr('value');
    if(jobRoleSelection === 'other') {
        otherJobRole.toggle();
    } else {
        otherJobRole.hide();
    }
})


//Require design selection before color selection is made available, then refine available colors by selection
const shirtColorField = $('#color');
const JSPuns = $('option[value="js puns"]');
const iHeartJS = $('option[value="heart js"]');

//Shirt Color option disabled on load
shirtColorField.attr('disabled', true);

const designSelect = $('#design');
designSelect.children().first().hide();


const colorSelect = $('#color');
colorSelect.prepend("<option>Please select T-shirt theme</option>");
const colorInputs = colorSelect.children();
colorInputs.eq(0).selected = true;

let JSPunsArray = [];
let iHeartJSArray = [];



colorInputs.each(function (index) {
    if ($(this).text().includes('JS Puns')) {
        //push index to JS Puns Array
        JSPunsArray.push(index);
    } else if ($(this).text().includes('JS shirt')) {
        //push index to iheartJS Array
        iHeartJSArray.push(index);
    }
})

//Allow color input when design theme is selected
designSelect.change(() => {
    let designSelection = designSelect.find(':selected').attr('value');
    if (designSelection === 'js puns' || designSelection === 'heart js') {
        shirtColorField.attr('disabled', false);
        colorInputs.each(function () {
            $(this).hide();
        })
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
    } else {
        shirtColorField.attr('disabled', true);
    }
});