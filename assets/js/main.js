// generate random
function yellpages_createReview(n, rangeService, rangeGoods, rangeAtmosphere, rangeOther){
    
    n = n || 1
    rangeService = rangeService || [1,7];
    rangeGoods = rangeGoods || [1,7];
    rangeAtmosphere =rangeAtmosphere || [1,7];
    rangeOther = rangeOther || [1,7];
    
    let reviewJSON = [];
    
    let Review_Template = {
        Service : 0,
        Goods: 0,
        Atmosphere: 0,
        Other: 0,
        Name: 0,
        Notes: 0
    };
    
    let review_temp = Object.assign({}, Review_Template);
    
    for(i=0; i<n; i++){
        review_temp = Object.assign({}, Review_Template);
        
        review_temp.Service = yellpages_randRange(rangeService[0], rangeService[1]);
        review_temp.Goods = yellpages_randRange(rangeGoods[0], rangeGoods[1]);
        review_temp.Atmosphere = yellpages_randRange(rangeAtmosphere[0], rangeAtmosphere[1]);
        review_temp.Other = yellpages_randRange(rangeService[0], rangeService[1]);
        review_temp.Name = Math.random();
        
        reviewJSON.push(Object.assign({}, review_temp));
    }
    
    return reviewJSON;
};

function yellpages_randRange(min, max, int = true){
    
    let result = Math.random() * (max-min) + min;
    
    if(int){
        result = Math.round(result)
    }
    
    return result;
}

// calculate net income
function yellpages_calcIncome(reviews, surge, costEmploy, costLLC, costSupplies, costTax){
    
    // calculates the mean review score
    let meanReview = 0;
    
    for (i=0; i<reviews.length; i++){
        meanReview += (reviews[i].Service + reviews[i].Goods + reviews[i].Atmosphere + reviews[i].Other)/4;
    }
    
    meanReview = meanReview/reviews.length;
    
    // calculates gross income
    surge = surge || [1,150];
    surgeIncome = yellpages_randRange(surge[0], surge[1]);
    grossIncome = Math.exp(meanReview - 4) * reviews.length + surgeIncome;
    
    // calculates gross expenses
    costEmploy = costEmploy || 3;
    costLLC = costLLC || 1;
    costSupplies = costSupplies || 1;
    costTax = costTax || (Math.round(grossIncome) * .1) + (grossIncome - Math.floor(grossIncome));
    
    grossExpenses = (costEmploy + costLLC + costSupplies + costTax);
    
    // calculate netIncome 
    return netIncome = grossIncome - grossExpenses;
}