export default function observer(target) {
  const listeners = new Set();

  target.prototype.register = function(listener) {
    listeners.add(listener);
  };

  target.prototype.unRegister = function(listener) {
    listeners.delete(listener);
  };

  target.prototype.notify = function() {
    listeners.forEach(listener => {
      listener.update();
    });
  };
}