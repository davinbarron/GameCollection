// prints "hi" in the browser's dev tools console
console.log("ゲームアプリ開発チームからこんにちは");

const greenbtn = document.querySelector(".green");

greenbtn &&
  greenbtn.addEventListener("click", () => alert("ありがとうございました。ぜひ、アプリをお楽しみください!!"));

const bluebtn = document.querySelector(".blue");

bluebtn &&
  bluebtn.addEventListener("click", () => {
    let readMoreDiv = document.querySelector("#readmore");
    readMoreDiv.style.color = "violet";
    if (readMoreDiv.style.display === "block") {
      readMoreDiv.style.display = "none";
    } else {
      readMoreDiv.style.display = "block";
    }
  });

const redbtn = document.querySelector(".red");

const welcomeUserDiv = document.querySelector("#welcomeuser");

redbtn &&
  redbtn.addEventListener("click", () => {
    let username = prompt("あなたのお名前は？");
    welcomeUserDiv.style.display = "block";
    document.querySelector("#welcomeuser").innerHTML = `<p> こんにちは。${username}, 
    あなたのゲームを楽しみにしています。このメッセージをクリックすると閉じます。</p>`;
    welcomeUserDiv.style.cursor = "pointer";
  });

welcomeUserDiv &&
  welcomeUserDiv.addEventListener("click", (evt) => {
   // evt.currentTarget.style.display = "none";
    welcomeUserDiv.style.display = "none";
  });

const ratebtn  = document.querySelector("#rateit");

ratebtn &&
  ratebtn.addEventListener("click", () => {
   let userRating = parseInt(prompt("このコレクションを評価する（1つ星から5つ星まで）"));
  if (userRating>5 || userRating<1 || isNaN(userRating)){
    alert("1～5までの数字で再チャレンジしてください。");
  }
  else{

    document.querySelector("#rating").innerHTML = "という評価をしましたね: ";
    for (let i=0; i < userRating; i++){
        document.querySelector("#rating").innerHTML +="<i class='yellow star icon'></i>";
    }
  }
});

$(".delgenre").click(() => confirm('本当にこのタイプを削除するのか？'))

$(".delgame").click(() => confirm('本当にこのゲームを削除するのか？'))
