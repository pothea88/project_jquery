$(document).ready(function () {
    requestApi();
    $("#increase").on('click', function () {
        var oldVal = $('#number').val();
        addNumber(oldVal);
    });
    $("#decrease").on('click', function () {
        var getOldVal = $('#number').val();
        minusNumber(getOldVal);
    });
    $("#hide").hide();
    
});
//get api
var requestApi = () => {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (getData) => getAllRecipe(getData.recipes),
        error: () => getError()
    });
}
//get url
var getUrl = () => {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";

    return url;
}
//getError
var getError = () => console.log("error");
//get recipes to select option
var allData = [];
function getAllRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(select => {
        option +=`
            <option value="${select.id}">${select.name}</option>;
        `
    });
    $('#selected').append(option);
    getRecipe(allData);
};
//get recipe
var getNumberGuest;
var getQuantity = [];
var getRecipe = (data) => {
    data.forEach(element => {
        $("#selected").on('change',function(){
            $("#hide").show();
            $('#picture').hide();
            var selectId = $('#selected').val();
            if(element.id == selectId){
                computeRecipe(element);
                getIngredient(element);
                getQuantity = element.ingredients;
                getNumberGuest = element.nbGuests;
            };
        });
    });
}
// conpute recipe
var computeRecipe = (outPut) => {
        var getOutPut = "";
        var getNumber = "";
        var getStep = "";
        getOutPut += `
        <h3 style="font-size:25px;">
            ${outPut.name} <br><br>
            <img src="${outPut.iconUrl}" width="300" class="img-fluid img-thumbnail mx-auto d-block">
        </h3> 
    `;
    getNumber += `
        <input type="text" id="number" class="text-danger border-primary" value="${outPut.nbGuests}" disabled style="text-align:center">
    `;
    getStep += `
        ${outPut.instructions}
    `;
    get(getStep);
    $('#getInput').html(getNumber);
    $('#result').html(getOutPut);
} 

//get instruction
var get = (dataIn) => {
    var result = "";
    var cutStep = dataIn.split("<step>");
    for(let i = 1; i< cutStep.length; i++){
        result +=`
            <tr">
                <td>
                    <h6 class="text-primary">step:${i}</h6>
                    <p>${cutStep[i]}</p>
                </td>
            </tr>
        `;
    }
    $('#instruction').html('Instruction');
    $('#getStep').html(result);
}
//get ingredient
var getIngredient = (ing => {
    var getDisplay = "";
    getDisplay += `
        <h5 class="text-primary">Ingredients</h5>
    `;
    ing.ingredients.forEach(display => {
        getDisplay += `
            <tr>
                <td><img src="${display.iconUrl}" class="img-fluid rounded" width="50"></td>
                <td class="text-danger">${display.quantity}</td>
                <td>${display.unit[0]}</td>
                <td>${display.name}</td>
            </tr>
        `;
    });
    $('#getGredient').html(getDisplay);
});
//Increase number of person
var person;
function addNumber(getNumAdd) {
    var add = parseInt(getNumAdd) + 1;
    if (add <= 15) {
        $('#number').val(add);
        calculateGuest($('#number').val());
    }
}
//decrease number of person

function minusNumber(getMi) {
    var minus = parseInt(getMi) - 1;
    if (minus >= 1) {
        $('#number').val(minus);
        calculateGuest($('#number').val());
    }
}
//caculate quantity with number of guest
var calculateGuest = (cal) => {
    var getGuest = getNumberGuest;
    var calculate = "";
    var result = "";
    result += `
        <h5 class="text-primary">Ingredients</h5>
    `;
    getQuantity.forEach(ele => {
        var quantity = ele.quantity;
        calculate = (quantity / getGuest) * cal;
        result +=`
            <tr>
                <td><img src="${ele.iconUrl}" class="img-fluid rounded" width="50"></td>
                <td class="text-danger">${calculate}</td>
                <td>${ele.unit[0]}</td>
                <td>${ele.name}</td>
            </tr>
        `;
    });
    $('#getGredient').html(result);
}
//slide show





