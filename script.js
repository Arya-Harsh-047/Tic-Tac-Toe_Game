let boxes = document.querySelectorAll(".box");
// console.log(boxes);
//Gives a node list which works similar to an array.
// console.log(boxes[4]);   

let resetBtn = document.querySelector("#reset-btn");

let newGameBtn = document.querySelector("#new-btn");

let msgContainer = document.querySelector(".msg-container");

let msg = document.querySelector("#msg");

let count = 0; //To Track Draw

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];
// console.log("\n ", winPattern[0][2]);

let turnO = true; //PlayerX & PlayerO

//print X & O in each boxes on each click sccorting to turn


const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  // disableBoxes();
};


const disableBoxes = ()=>{
  //esme saare boxes ko disabled krna hai esliye loop use  

  for(box of boxes){
    box.disabled = true;
  }

}

const enableBoxes = ()=>{
  //esme saare boxes ko enabled krna hai esliye loop use  

  for(box of boxes){
    box.disabled = false;
    box.innerText="";
  }

}

const showWinner = (winner)=>{
  //print winner
  msg.innerText= `Congratulations, Winner is ${winner} !!!`;

  //remove display: hide from msg-container

  msgContainer.classList.remove('hide');

  //but yha pe winner aane ke baad bhi hum boxes click kr ke game continue rakh pa rahe hai jise hatane ke liye hume saare boxes disabled krne padenge winner milne ke baad

  disableBoxes();
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
      // console.log("box was clicked!!!");
    // if(turnO===true)
    // OR
    if (turnO) {   //PlayerX turn
      box.innerText = "X";
      box.style.color = "springgreen";
      turnO = false;
    }
      else          //PlayerO turn
      {
        box.innerText = "O"; 
        turnO=true;
      }
    
      //Their is a problem ki jb bhi hum X ya O pr repeat click kr rahe hai fir wo doobara change ho raha hai is liye hume ek baar use / occupied krne ke baad use disabled krna hoga.
       
      box.disabled = true;
      count++;


      //Now we have to check every time when a box is clicked that if their is any win pattern applied or not

      let isWinner = checkWinner();

      //to track draw
      if (count === 9 && !isWinner) {
        gameDraw();
      }
  });
});



const checkWinner = ()=>{
  //Now we have to check each winning  pattern in winPattern  (i.e, check [0,1,2]) for that we have to loop each pattern in winPattern

  for(let pattern of winPattern){
  // console.log(pattern);

  /*now from this pattern we can know position of element (O or X) 

  now ab hum each pattern me index proprty ka use krte hua uska es index ka no.(element/position) nikalenge jo ki humari position hai jiske liye hume winPattern check krna hai .(pattern [3,4,5] ka pattern[0]=3, pattern[1]=4, pattern[2]= 5) */


  // console.log(pattern[0], pattern[1], pattern[2]);

  /*ab hume check krna padega ki konse position pe konsa element hai (O hai ya X hai)

  or ye hum nikalenge jo humare pass boxes wala array hai usme positions ko check kr kr (if pattern posiion is 3 4 5 like above then we check position 3 4 5 in boxes node list array for X or O )*/

  // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);

  /*if pattern is 3 4 5, then boxes[pattern[0]= boxes[[3,4,5][0]] = boxes[3]= <button class="box"></button>

  now humare boxes ki value humare paas aa gayi now ab hum en boxes ke under text (O or X) add karenge innerText property ka use arke jb bhi hum click karenge
*/


  // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

  /*es way se hum apne innerText ko access kr pa rahe hai  

    ye saare innertext ko access krne wale methot humre position hai for checking X or O so we store these into in a variable .
    */
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    /*ab hum ye pta ke sakte hai ki pos1 pe kya hai,  pos 2 pe kya hai or pos 3 pe kya hai
    

    ab hum check krenge ki each pos 1, pos 3, pos 3 pe koi winner hai ya koi box empty to nahi.*/


   if(pos1!="" && pos2!=""&& pos3!=""){
      if(pos1===pos2 && pos2===pos3){
        console.log("Winner!!",pos3);

        //to print winner name(X or Y me se ) we can print any pos to get the name we can create a winner(with pos as argument)

        showWinner(pos3);
      }
   }
  }
};

const resetGame = ()=>{
  turnO = true;
  count= 0;
  // message container ko hide krna hoga
  msgContainer.classList.add("hide");
  enableBoxes();
}

resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);