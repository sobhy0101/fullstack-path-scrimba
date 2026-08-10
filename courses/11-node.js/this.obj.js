const obj = {
  name: "Sobhy",
  greet: function () {
    setTimeout(function () {
      console.log("Hi, " + obj.name);
    }, 100);
  },
};

obj.greet();