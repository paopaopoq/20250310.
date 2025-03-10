let table;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let radio;
let submitButton;
let resultText = "";
let resultColor = "#000000"; // 預設顏色為黑色

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  showQuestion();
}

function draw() {
  background("#E0E0E0");

  // 顯示題目
  textAlign(CENTER);
  fill(0);
  textSize(30);
  if (currentQuestionIndex < table.getRowCount()) {
    text(table.getString(currentQuestionIndex, 'question'), width / 2, height / 2 - 150);
  }

  // 顯示結果
  textSize(32);
  fill(resultColor);
  text(resultText, width / 2, height / 2 + 150);

  // 顯示測驗結果
  if (currentQuestionIndex >= table.getRowCount()) {
    textSize(32);
    fill(0);
    text(`測驗結束！`, width / 2, height / 2 + 200);
    textSize(24);
    text(`答對題數: ${correctCount}`, width / 2, height / 2 + 250);
    text(`答錯題數: ${incorrectCount}`, width / 2, height / 2 + 300);

    // 覆蓋選項區域
    fill("#E0E0E0");
    noStroke();
    rect(width / 2 - 200, height / 2 - 100, 400, 200);
  }

  // 顯示答對和答錯題數
  textSize(24);
  fill(0);
  textAlign(LEFT);
  text(`答對題數: ${correctCount}`, 10, 30);
  text(`答錯題數: ${incorrectCount}`, 10, 60);

  // 顯示 "413730200林家妤"
  textAlign(CENTER);
  textSize(20);
  text("413730200林家妤", width / 2, height - 30);
}

function showQuestion() {
  // 清除之前的選項和按鈕
  if (radio) radio.remove();
  if (submitButton) submitButton.remove();

  if (currentQuestionIndex < table.getRowCount()) {
    radio = createRadio();
    radio.option(table.getString(currentQuestionIndex, 'option1'));
    radio.option(table.getString(currentQuestionIndex, 'option2'));
    radio.option(table.getString(currentQuestionIndex, 'option3'));
    radio.option(table.getString(currentQuestionIndex, 'option4'));
    radio.style('font-size', '30px'); // 設定選項文字大小
    radio.position(width / 2 - 150, height / 2 - 50);
    radio.style('background', '#D26900'); 

    // 建立送出按鈕
    submitButton = createButton('送出');
    submitButton.position(width / 2 - 50, height / 2 + 50);
    submitButton.style('font-size', '30px'); // 設定按鈕文字大小
    submitButton.style('padding', '10px 20px'); // 設定按鈕內邊距
    submitButton.mousePressed(checkAnswer);
  }
}

function checkAnswer() {
  let answer = radio.value();
  let correctAnswer = table.getString(currentQuestionIndex, 'correct');

  if (answer === correctAnswer) {
    resultText = "正確";
    resultColor = "#006400"; // 正確答案顯示深綠色
    correctCount++;
  } else {
    resultText = "錯誤";
    resultColor = "#FF0000"; // 錯誤答案顯示紅色
    incorrectCount++;
  }

  if (currentQuestionIndex < table.getRowCount() - 1) {
    submitButton.html('下一題'); // 改變按鈕文字為 "下一題"
    submitButton.mousePressed(nextQuestion); // 按下按鈕顯示下一題
  } else {
    submitButton.html('測驗結束'); // 改變按鈕文字為 "測驗結束"
    submitButton.attribute('disabled', ''); // 禁用按鈕
    // 清除選項
    if (radio) radio.remove();
    resultText = `測驗結束！答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`;
    resultColor = "#000000"; // 重置結果顏色
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  resultText = ""; 
  resultColor = "#000000"; // 重置結果顏色
  showQuestion();
}