app = require('electron').remote
fs = require('fs')
canvasBuffer = require('electron-canvas-to-buffer')
dialog = app.dialog

exports = this

class TexturePacker
    renderX: 0
    renderY: 0
    canvasWidth: 1280
    canvasHeight: 720
    currentMaxHeight: 0

    constructor: ->
        @canvasNode = document.createElement("CANVAS")
        @canvasNode.width = @canvasWidth = $("#main").width()
        @canvasNode.height = @canvasHeight
        @canvasNode.style.border = "1px solid"

        $("#canvas-place").append(@canvasNode)

        @canvas = @canvasNode.getContext("2d")
        @BindEvents()

    RenderImages: (paths) ->
        self = @ # reference for image loading
        for path in paths
            im = new Image()
            im.src = path

            im.onload = ->
                self.RenderImage(this)

    RenderImage: (image) ->
        if @renderX >= @canvasWidth
            @renderX = 0
            @renderY += @currentMaxHeight

        if image.height > @currentMaxHeight
            @currentMaxHeight = image.height

        @canvas.drawImage(image, @renderX, @renderY)

        @renderX += image.width

    Clear: ->
        @canvasNode.width = 0

        @canvasNode.width = @canvasWidth
        @canvasNode.height =@canvasHeight

        @renderX = @renderY = 0

    BindEvents: ->
        addTextures = $("#add-textures")
        exporter = $("#export")
        clear = $("#clear")

        addTextures.click =>
            @Import()

        exporter.click =>
            @Export()

        clear.click =>
            @Clear()

    Export: ->
        dialog.showSaveDialog (fileName) =>
            if not fileName?
                alert("no file selected")
            else
                buffer = canvasBuffer(@canvasNode, "image/png")

                # write the font image
                fs.writeFile fileName, buffer, (err) ->
                    if err?
                        alert("An error occured! #{err.message}")
                    else
                        alert("File Saved")

                # write the texture atlas JSON
                # fs.writeFile fileName + ".json", JSON.stringify(@fontAtlas, null, 4), (err) ->
                #     if err?
                #         alert("An error occured! #{err.message}")

    Import: ->
        dialog.showOpenDialog {
        properties:
            [
                "multiSelections"
            ]
        filters:
            [
                name: "Images"
                extensions: ["png", "jpg", "jpeg", "tif"]
            ]
        },
        (fileNames) =>
            if fileNames?
                @RenderImages(fileNames)
            else
                alert("No File selected")

$(document).ready ->
    exports.texturePacker = new TexturePacker()
