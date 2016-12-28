// Generated by CoffeeScript 1.12.1
(function() {
  var TexturePacker, app, canvasBuffer, dialog, exports, fs;

  app = require('electron').remote;

  fs = require('fs');

  canvasBuffer = require('electron-canvas-to-buffer');

  dialog = app.dialog;

  exports = this;

  TexturePacker = (function() {
    TexturePacker.prototype.renderX = 0;

    TexturePacker.prototype.renderY = 0;

    TexturePacker.prototype.canvasWidth = 1280;

    TexturePacker.prototype.canvasHeight = 720;

    TexturePacker.prototype.currentMaxHeight = 0;

    function TexturePacker() {
      this.canvasNode = document.createElement("CANVAS");
      this.canvasNode.width = this.canvasWidth = $("#main").width();
      this.canvasNode.height = this.canvasHeight;
      this.canvasNode.style.border = "1px solid";
      $("#canvas-place").append(this.canvasNode);
      this.canvas = this.canvasNode.getContext("2d");
      this.BindEvents();
    }

    TexturePacker.prototype.RenderImages = function(paths) {
      var i, im, len, path, results, self;
      self = this;
      results = [];
      for (i = 0, len = paths.length; i < len; i++) {
        path = paths[i];
        im = new Image();
        im.src = path;
        results.push(im.onload = function() {
          return self.RenderImage(this);
        });
      }
      return results;
    };

    TexturePacker.prototype.RenderImage = function(image) {
      if (this.renderX >= this.canvasWidth) {
        this.renderX = 0;
        this.renderY += this.currentMaxHeight;
      }
      if (image.height > this.currentMaxHeight) {
        this.currentMaxHeight = image.height;
      }
      this.canvas.drawImage(image, this.renderX, this.renderY);
      return this.renderX += image.width;
    };

    TexturePacker.prototype.BindEvents = function() {
      var addTextures;
      addTextures = $("#add-textures");
      return addTextures.click((function(_this) {
        return function() {
          return _this.Import();
        };
      })(this));
    };

    TexturePacker.prototype.Export = function() {
      return dialog.showSaveDialog((function(_this) {
        return function(fileName) {
          var buffer;
          if (fileName == null) {
            return alert("no file selected");
          } else {
            buffer = canvasBuffer(_this.renderedFont, "image/png");
            fs.writeFile(fileName, buffer, function(err) {
              if (err != null) {
                return alert("An error occured! " + err.message);
              } else {
                return alert("File Saved");
              }
            });
            return fs.writeFile(fileName + ".json", JSON.stringify(_this.fontAtlas, null, 4), function(err) {
              if (err != null) {
                return alert("An error occured! " + err.message);
              }
            });
          }
        };
      })(this));
    };

    TexturePacker.prototype.Import = function() {
      return dialog.showOpenDialog({
        properties: ["multiSelections"],
        filters: [
          {
            name: "Images",
            extensions: ["png", "jpg", "jpeg", "tif"]
          }
        ]
      }, (function(_this) {
        return function(fileNames) {
          if (fileNames != null) {
            return _this.RenderImages(fileNames);
          } else {
            return alert("No File selected");
          }
        };
      })(this));
    };

    return TexturePacker;

  })();

  $(document).ready(function() {
    return exports.texturePacker = new TexturePacker();
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dHVyZVBhY2tlci5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiU3JjXFx0ZXh0dXJlUGFja2VyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFBQSxNQUFBOztFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsVUFBUixDQUFtQixDQUFDOztFQUMxQixFQUFBLEdBQUssT0FBQSxDQUFRLElBQVI7O0VBQ0wsWUFBQSxHQUFlLE9BQUEsQ0FBUSwyQkFBUjs7RUFDZixNQUFBLEdBQVMsR0FBRyxDQUFDOztFQUViLE9BQUEsR0FBVTs7RUFFSjs0QkFDRixPQUFBLEdBQVM7OzRCQUNULE9BQUEsR0FBUzs7NEJBQ1QsV0FBQSxHQUFhOzs0QkFDYixZQUFBLEdBQWM7OzRCQUNkLGdCQUFBLEdBQWtCOztJQUVMLHVCQUFBO01BQ1QsSUFBQyxDQUFBLFVBQUQsR0FBYyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QjtNQUNkLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUFvQixJQUFDLENBQUEsV0FBRCxHQUFlLENBQUEsQ0FBRSxPQUFGLENBQVUsQ0FBQyxLQUFYLENBQUE7TUFDbkMsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQXFCLElBQUMsQ0FBQTtNQUN0QixJQUFDLENBQUEsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFsQixHQUEyQjtNQUUzQixDQUFBLENBQUUsZUFBRixDQUFrQixDQUFDLE1BQW5CLENBQTBCLElBQUMsQ0FBQSxVQUEzQjtNQUVBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLFVBQVUsQ0FBQyxVQUFaLENBQXVCLElBQXZCO01BQ1YsSUFBQyxDQUFBLFVBQUQsQ0FBQTtJQVRTOzs0QkFXYixZQUFBLEdBQWMsU0FBQyxLQUFEO0FBQ1YsVUFBQTtNQUFBLElBQUEsR0FBTztBQUNQO1dBQUEsdUNBQUE7O1FBQ0ksRUFBQSxHQUFTLElBQUEsS0FBQSxDQUFBO1FBQ1QsRUFBRSxDQUFDLEdBQUgsR0FBUztxQkFFVCxFQUFFLENBQUMsTUFBSCxHQUFZLFNBQUE7aUJBQ1IsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsSUFBakI7UUFEUTtBQUpoQjs7SUFGVTs7NEJBVWQsV0FBQSxHQUFhLFNBQUMsS0FBRDtNQUNULElBQUcsSUFBQyxDQUFBLE9BQUQsSUFBWSxJQUFDLENBQUEsV0FBaEI7UUFDSSxJQUFDLENBQUEsT0FBRCxHQUFXO1FBQ1gsSUFBQyxDQUFBLE9BQUQsSUFBWSxJQUFDLENBQUEsaUJBRmpCOztNQUlBLElBQUcsS0FBSyxDQUFDLE1BQU4sR0FBZSxJQUFDLENBQUEsZ0JBQW5CO1FBQ0ksSUFBQyxDQUFBLGdCQUFELEdBQW9CLEtBQUssQ0FBQyxPQUQ5Qjs7TUFHQSxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQVIsQ0FBa0IsS0FBbEIsRUFBeUIsSUFBQyxDQUFBLE9BQTFCLEVBQW1DLElBQUMsQ0FBQSxPQUFwQzthQUVBLElBQUMsQ0FBQSxPQUFELElBQVksS0FBSyxDQUFDO0lBVlQ7OzRCQVliLFVBQUEsR0FBWSxTQUFBO0FBQ1IsVUFBQTtNQUFBLFdBQUEsR0FBYyxDQUFBLENBQUUsZUFBRjthQUVkLFdBQVcsQ0FBQyxLQUFaLENBQWtCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFDZCxLQUFDLENBQUEsTUFBRCxDQUFBO1FBRGM7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxCO0lBSFE7OzRCQU1aLE1BQUEsR0FBUSxTQUFBO2FBQ0osTUFBTSxDQUFDLGNBQVAsQ0FBc0IsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLFFBQUQ7QUFDbEIsY0FBQTtVQUFBLElBQU8sZ0JBQVA7bUJBQ0ksS0FBQSxDQUFNLGtCQUFOLEVBREo7V0FBQSxNQUFBO1lBR0ksTUFBQSxHQUFTLFlBQUEsQ0FBYSxLQUFDLENBQUEsWUFBZCxFQUE0QixXQUE1QjtZQUdULEVBQUUsQ0FBQyxTQUFILENBQWEsUUFBYixFQUF1QixNQUF2QixFQUErQixTQUFDLEdBQUQ7Y0FDM0IsSUFBRyxXQUFIO3VCQUNJLEtBQUEsQ0FBTSxvQkFBQSxHQUFxQixHQUFHLENBQUMsT0FBL0IsRUFESjtlQUFBLE1BQUE7dUJBR0ksS0FBQSxDQUFNLFlBQU4sRUFISjs7WUFEMkIsQ0FBL0I7bUJBT0EsRUFBRSxDQUFDLFNBQUgsQ0FBYSxRQUFBLEdBQVcsT0FBeEIsRUFBaUMsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFDLENBQUEsU0FBaEIsRUFBMkIsSUFBM0IsRUFBaUMsQ0FBakMsQ0FBakMsRUFBc0UsU0FBQyxHQUFEO2NBQ2xFLElBQUcsV0FBSDt1QkFDSSxLQUFBLENBQU0sb0JBQUEsR0FBcUIsR0FBRyxDQUFDLE9BQS9CLEVBREo7O1lBRGtFLENBQXRFLEVBYko7O1FBRGtCO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0QjtJQURJOzs0QkFtQlIsTUFBQSxHQUFRLFNBQUE7YUFDSixNQUFNLENBQUMsY0FBUCxDQUFzQjtRQUN0QixVQUFBLEVBQ0ksQ0FDSSxpQkFESixDQUZrQjtRQUt0QixPQUFBLEVBQ0k7VUFDSTtZQUFBLElBQUEsRUFBTSxRQUFOO1lBQ0EsVUFBQSxFQUFZLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxNQUFmLEVBQXVCLEtBQXZCLENBRFo7V0FESjtTQU5rQjtPQUF0QixFQVdBLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxTQUFEO1VBQ0ksSUFBRyxpQkFBSDttQkFDSSxLQUFDLENBQUEsWUFBRCxDQUFjLFNBQWQsRUFESjtXQUFBLE1BQUE7bUJBR0ksS0FBQSxDQUFNLGtCQUFOLEVBSEo7O1FBREo7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBWEE7SUFESTs7Ozs7O0VBa0JaLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxLQUFaLENBQWtCLFNBQUE7V0FDZCxPQUFPLENBQUMsYUFBUixHQUE0QixJQUFBLGFBQUEsQ0FBQTtFQURkLENBQWxCO0FBMUZBIiwic291cmNlc0NvbnRlbnQiOlsiYXBwID0gcmVxdWlyZSgnZWxlY3Ryb24nKS5yZW1vdGVcclxuZnMgPSByZXF1aXJlKCdmcycpXHJcbmNhbnZhc0J1ZmZlciA9IHJlcXVpcmUoJ2VsZWN0cm9uLWNhbnZhcy10by1idWZmZXInKVxyXG5kaWFsb2cgPSBhcHAuZGlhbG9nXHJcblxyXG5leHBvcnRzID0gdGhpc1xyXG5cclxuY2xhc3MgVGV4dHVyZVBhY2tlclxyXG4gICAgcmVuZGVyWDogMFxyXG4gICAgcmVuZGVyWTogMFxyXG4gICAgY2FudmFzV2lkdGg6IDEyODBcclxuICAgIGNhbnZhc0hlaWdodDogNzIwXHJcbiAgICBjdXJyZW50TWF4SGVpZ2h0OiAwXHJcblxyXG4gICAgY29uc3RydWN0b3I6IC0+XHJcbiAgICAgICAgQGNhbnZhc05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiQ0FOVkFTXCIpXHJcbiAgICAgICAgQGNhbnZhc05vZGUud2lkdGggPSBAY2FudmFzV2lkdGggPSAkKFwiI21haW5cIikud2lkdGgoKVxyXG4gICAgICAgIEBjYW52YXNOb2RlLmhlaWdodCA9IEBjYW52YXNIZWlnaHRcclxuICAgICAgICBAY2FudmFzTm9kZS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZFwiXHJcblxyXG4gICAgICAgICQoXCIjY2FudmFzLXBsYWNlXCIpLmFwcGVuZChAY2FudmFzTm9kZSlcclxuXHJcbiAgICAgICAgQGNhbnZhcyA9IEBjYW52YXNOb2RlLmdldENvbnRleHQoXCIyZFwiKVxyXG4gICAgICAgIEBCaW5kRXZlbnRzKClcclxuXHJcbiAgICBSZW5kZXJJbWFnZXM6IChwYXRocykgLT5cclxuICAgICAgICBzZWxmID0gQCAjIHJlZmVyZW5jZSBmb3IgaW1hZ2UgbG9hZGluZ1xyXG4gICAgICAgIGZvciBwYXRoIGluIHBhdGhzXHJcbiAgICAgICAgICAgIGltID0gbmV3IEltYWdlKClcclxuICAgICAgICAgICAgaW0uc3JjID0gcGF0aFxyXG5cclxuICAgICAgICAgICAgaW0ub25sb2FkID0gLT5cclxuICAgICAgICAgICAgICAgIHNlbGYuUmVuZGVySW1hZ2UodGhpcylcclxuXHJcblxyXG4gICAgUmVuZGVySW1hZ2U6IChpbWFnZSkgLT5cclxuICAgICAgICBpZiBAcmVuZGVyWCA+PSBAY2FudmFzV2lkdGhcclxuICAgICAgICAgICAgQHJlbmRlclggPSAwXHJcbiAgICAgICAgICAgIEByZW5kZXJZICs9IEBjdXJyZW50TWF4SGVpZ2h0XHJcblxyXG4gICAgICAgIGlmIGltYWdlLmhlaWdodCA+IEBjdXJyZW50TWF4SGVpZ2h0XHJcbiAgICAgICAgICAgIEBjdXJyZW50TWF4SGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0XHJcblxyXG4gICAgICAgIEBjYW52YXMuZHJhd0ltYWdlKGltYWdlLCBAcmVuZGVyWCwgQHJlbmRlclkpXHJcblxyXG4gICAgICAgIEByZW5kZXJYICs9IGltYWdlLndpZHRoXHJcblxyXG4gICAgQmluZEV2ZW50czogLT5cclxuICAgICAgICBhZGRUZXh0dXJlcyA9ICQoXCIjYWRkLXRleHR1cmVzXCIpXHJcblxyXG4gICAgICAgIGFkZFRleHR1cmVzLmNsaWNrID0+XHJcbiAgICAgICAgICAgIEBJbXBvcnQoKVxyXG5cclxuICAgIEV4cG9ydDogLT5cclxuICAgICAgICBkaWFsb2cuc2hvd1NhdmVEaWFsb2cgKGZpbGVOYW1lKSA9PlxyXG4gICAgICAgICAgICBpZiBub3QgZmlsZU5hbWU/XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIm5vIGZpbGUgc2VsZWN0ZWRcIilcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gY2FudmFzQnVmZmVyKEByZW5kZXJlZEZvbnQsIFwiaW1hZ2UvcG5nXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgIyB3cml0ZSB0aGUgZm9udCBpbWFnZVxyXG4gICAgICAgICAgICAgICAgZnMud3JpdGVGaWxlIGZpbGVOYW1lLCBidWZmZXIsIChlcnIpIC0+XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgZXJyP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIkFuIGVycm9yIG9jY3VyZWQhICN7ZXJyLm1lc3NhZ2V9XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIkZpbGUgU2F2ZWRcIilcclxuXHJcbiAgICAgICAgICAgICAgICAjIHdyaXRlIHRoZSB0ZXh0dXJlIGF0bGFzIEpTT05cclxuICAgICAgICAgICAgICAgIGZzLndyaXRlRmlsZSBmaWxlTmFtZSArIFwiLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkoQGZvbnRBdGxhcywgbnVsbCwgNCksIChlcnIpIC0+XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgZXJyP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIkFuIGVycm9yIG9jY3VyZWQhICN7ZXJyLm1lc3NhZ2V9XCIpXHJcblxyXG4gICAgSW1wb3J0OiAtPlxyXG4gICAgICAgIGRpYWxvZy5zaG93T3BlbkRpYWxvZyB7XHJcbiAgICAgICAgcHJvcGVydGllczpcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgXCJtdWx0aVNlbGVjdGlvbnNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgZmlsdGVyczpcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJJbWFnZXNcIlxyXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogW1wicG5nXCIsIFwianBnXCIsIFwianBlZ1wiLCBcInRpZlwiXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZmlsZU5hbWVzKSA9PlxyXG4gICAgICAgICAgICBpZiBmaWxlTmFtZXM/XHJcbiAgICAgICAgICAgICAgICBAUmVuZGVySW1hZ2VzKGZpbGVOYW1lcylcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJObyBGaWxlIHNlbGVjdGVkXCIpXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeSAtPlxyXG4gICAgZXhwb3J0cy50ZXh0dXJlUGFja2VyID0gbmV3IFRleHR1cmVQYWNrZXIoKVxyXG4iXX0=
//# sourceURL=C:\dev\js\texturePacker\Src\texturePacker.coffee