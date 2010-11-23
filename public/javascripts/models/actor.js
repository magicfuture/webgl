var Actor = Class.create(Renderable, {
  initialize: function($super, attributes) {
    var self = this;
    self.id = attributes.id;
    self.name = attributes.name;
    // self.scale = attributes.scale || (attributes.model && attributes.model.scale) || 1;
    self.ai = AI.instance(attributes.ai);
    
    MD2.load(attributes.model.name, function(obj) {
      self.model = obj;
      self.model.setScale(attributes.model && attributes.model.scale || 1);
      
      for (var i = 0; i < attributes.model.textures.length; i++)
        self.model.mesh.addTexture(attributes.model.textures[i].path);
      
      self.model.stop();
//      self.model.moveOrigin(0, self.lowest(), 0);
      self.meshLoaded = true;
    });
            
    $super(attributes);
  },
  
  // No need for an update thread for Actor, since it's just used to share data between Creatures.
  update: null,
  
  render: function($super, options) {
    if (this.model) this.model.render(options);
  },
  
  lowest: function() { return this.model && this.model.mesh.lowest(); },
  
  draw: function($super, options) {
    if (this.model) this.model.draw(options);
  }
});

Actor.instance = function(attributes) { return instanceFor(Actor, attributes); };
