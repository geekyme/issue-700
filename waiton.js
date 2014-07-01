if (Meteor.isClient) {
  handle = {
    _value: false,

    _dep: new Deps.Dependency,

    ready: function () {
      this._dep.depend();
      return this._value;
    },

    set: function (value) {
      if (value !== this._value) {
        this._value = value;
        this._dep.changed();
      }
    }
  };

  Router.configure({
    templateNameConverter: 'upperCamelCase',
    layoutTemplate: 'ApplicationLayout'
  });

  Router.map(function () {
    this.route('PageOne', {
      template: 'PageOne',

      path: '/',

      waitOn: function () { return Meteor.subscribe('items'); },

      onBeforeAction: function (pause) {
        if (!this.ready()) {
          this.render("Loading");
          pause();
        }
      },

      action: function () {
        this.render();
      }
    });
  });
}

if (Meteor.isServer) {
  Meteor.publish('items', function () {
    var self = this;
    setTimeout(function () {
      self.ready();
    }, 3000);
  });
}
