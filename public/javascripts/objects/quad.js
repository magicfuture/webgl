var Quad = Class.create(Renderable, {
  initialize: function($super, width, height) {
    this.width = width;
    this.height = height;
    $super();
  },
  
  setWidth: function(width) { this.setSize(width, this.height); },
  setHeight: function(height) { this.setSize(this.width, height); },
  setSize: function(width, height) {
    this.width = width;
    this.height = height;
    this.rebuildAll();
  },
  
  init: function(vertices, colors, textureCoords) {
    this.DRAW_MODE = GL_TRIANGLE_STRIP;
    var width = this.width, height = this.height;

    vertices.push(-width/2, -height/2, 0);
    vertices.push(-width/2,  height/2, 0);
    vertices.push( width/2, -height/2, 0);
    vertices.push( width/2,  height/2, 0);
      
    textureCoords.push(0, 0);
    textureCoords.push(0, 1);
    textureCoords.push(1, 0);
    textureCoords.push(1, 1);
  }
});
