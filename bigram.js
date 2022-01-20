class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length - 1; i++) {
      let bigram = this.words[i] + " " + this.words[i + 1];
      let nextWord = this.words[i + 2] || null;

      if (chains.has(bigram)) {
        chains.get(bigram).push(nextWord);
      } else {
        chains.set(bigram, [nextWord]);
      }
    }

    this.chains = chains;
  }

  random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = this.random(keys);
    let output = [];

    while (output.length <= numWords && key !== null) {
      let [word1, word2] = key.split(" ");
      output.push(word1);
      key = word2 + " " + this.random(this.chains.get(key));
    }

    return output.join(" ");
  }
}

module.exports = { MarkovMachine };