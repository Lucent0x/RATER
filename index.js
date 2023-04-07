const api = 
"https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cbinancecoin%2Cmatic-network&vs_currencies=usd";

//DOM STUFF
const bnb =  document.querySelector("#bnb");
const eth =  document.querySelector("#eth");
const matic =  document.querySelector("#matic");
let coins;

 setInterval( ( ( ) => {
 ///BEGIN AJAX
  const  xhr = new XMLHttpRequest()
  xhr.open("GET", api, true);
  xhr.onload = ( ) => {
    
    if (xhr.readyState == XMLHttpRequest.DONE){
        if (xhr.status === 200 ){
        apiResponse = JSON.parse(xhr.response);
        //faulty  property {matic-network} so i had to improvise
        coins = Object.values(apiResponse);

        bnb.innerText = `$${coins[0].usd}`;
        eth.innerText =  `$${coins[1].usd}`;
        matic.innerText = `$${coins[2].usd}`;
        
    }
   }
  }
  xhr.send()
}

), 3000)
 
//DOM STUFF AGAIN
const result = document.querySelector(".result")
const  crowdSale = document.querySelector("#crowdsale")
const decimals = document.querySelector("#decimal");
const networks = document.querySelector("#network")
const button = document.querySelector("#btn")

let decimal;
let chain;
let crowdSalePrice;
let coinPrice;


button.onclick = ( e ) => {

  decimal = Number(decimals.value);
  crowdSalePrice = Number(crowdSale.value);
  chain = networks.value;
 
  switch (chain) {
    case "BSC": coinPrice= coins[0].usd;
      break;
    case "ETHEREUM": coinPrice= coins[1].usd;
      break;
    case "POLYGON": coinPrice= coins[2].usd;
      break;
    default: coinPrice= apiResponse.BSC;
      break;
  }


  e.preventDefault();

  CALCULATE_RATE()
      //console.log(decimal, chain, crowdSalePrice, )
}
const CALCULATE_RATE = (  ) => {

      const SOLVE_FOR_WEI = ( ) => {
          // return cross multiplication and division output
      const  weiOutput = (10**decimal * crowdSalePrice) /coinPrice 
        //procced to step
      SOLVE_FOR_BITS(weiOutput)
      }   

const SOLVE_FOR_BITS = ( weiRate ) => {
  //remove decimal ponts and convert rate to number
  RATE = Number(10**decimal/weiRate).toFixed(0);
  //display rate
  result.innerHTML = 
  `<p class="box has-text-success"> Your minimum rate should be: 
  <b> ${ RATE } </b> and the maximum should be: <b>${ ++RATE } </B> </p>`;
}
      SOLVE_FOR_WEI()
}