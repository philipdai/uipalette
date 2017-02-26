#Define variables
layerA = []
bgColor = ["D8D8D8","8C8C8C","404040"]
bg = new BackgroundLayer
width = 140 / 2
height = 230 / 2
num1 = 0
num2 = 9
num3 = 18

#Position layer
canvas = new Layer
	backgroundColor: null
	width: width * 9
	height: height * 3
canvas.center()

#Draw default state
for i in [0...3]
	for j in [0...9]
		layer = new Layer
			parent: canvas
			width: width			
			height: height
			x: j * width
			y: i * height
			backgroundColor: bgColor[i]
			opacity: 0.1 + 0.1 * j
		layerA.push(layer)
				
#Define event
Wave = (event, layer) ->
	animationA = new Animation layerA[num],
	shadowX: 0
	shadowY: 24
	shadowBlur: 24
	shadowColor: "rgba(0,0,0,0.3)"
	options:
		time: 1
		curve: Bezier.easeInOut
	animationA.start()
	animationB = animationA.reverse()
	animationA.on Events.AnimationEnd, ->
		animationB.start()
				
#Execute event by clicking canvas 							
bg.onClick (event, layer) ->
	Utils.interval 0.1,->
		num1 += 1
		Wave(layerA[num])
	
	Utils.delay 0.1,->
		Utils.interval 0.1,->
			num2 += 1
			Wave(layerA[num])
	
	Utils.delay 0.2,->
		Utils.interval 0.1,->
			num3 += 1
			Wave(layerA[num])