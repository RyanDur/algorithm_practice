var execute = function(queue) {
  forEach(queue, function(func) {
    func();
  });
};
