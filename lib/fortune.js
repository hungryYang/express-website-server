let fortunes = [
  "hello",
  "hi",
  "你好",
  "nihao"
];

exports.getFortunes = function(){
  return fortunes[Math.floor(Math.random()*fortunes.length)];
};