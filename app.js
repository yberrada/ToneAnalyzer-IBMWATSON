var readline = require('readline');
var fs = require('fs');

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const tone_analyzer = new ToneAnalyzerV3({
  iam_apikey: "3_G1PdBG8k-Bj6Kc-BAaDI2-gcYTBHa6kQtUYkw4cJD2",
  version: "2018-03-19",
  url: "https://gateway.watsonplatform.net/tone-analyzer/api"
});

var fileName;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter the review to find the tone of the reviewer: ', (fileName) => {
  var contents = fs.readFileSync(fileName, 'utf8');
  let params = {
    tone_input: contents,
    content_type: 'text/plain',
    sentences: true
  };
tone_analyzer.tone(params, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("The main tones detected in this review are: ");
      for(var i=0;i<response.document_tone.tones.length;i++){
        if(response.document_tone.tones[i].score>0.5)
        console.log(response.document_tone.tones[i].tone_name);
      }
    //  console.log(JSON.stringify(response, null, 2));

      console.log("The sentences that are the most relevant:");
      for(var i=0;i<response.sentences_tone.length;i++){
        for(var j=0;j<response.sentences_tone[i].tones.length;j++){
          if(response.sentences_tone[i].tones[j].score>0.7){
            console.log("###########################################");
            console.log(response.sentences_tone[i].tones[j].tone_name);
            console.log(response.sentences_tone[i].tones[j].score);
            console.log(response.sentences_tone[i].text);
          }
      }
  }
  }
  });

  rl.close();
});
