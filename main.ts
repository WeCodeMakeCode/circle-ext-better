// % blockNamespace=circle
// % group="List"
// % blockSetVariable=myCircleList
// % block="empty circle list"
function emptyCircleList () {
    let circleList2 = 0
    return circleList2
}
namespace circle{
    //% group="Create"
    //% block="destroy %circle=variables_get(myCircle)"
    export function destroy(circle:Circle) {
        circle.destroy()
    }
    //% group="Create" 
    //% block="create circle of radius %radius color %color || fill-color %fillColor"
    //% blockSetVariable=myCircle
    //% radius.min=5 radius.max=60 radius.defl=30
    //% color.min=0 color.max=15 color.defl=2
    //% fillColor.min=0 fillColor.max=15 fillColor.defl=0
    //  color.shadow="colorindexpicker"
    //  fillColor.shadow="colorindexpicker"
    export function createCircle(radius: number, color: number , fillColor:number = 0 ): Circle {
        const output = new Circle( radius, color, fillColor)
        // below is normally done in `sprites.create`
        // below code is from statusBar https://github.com/jwunderl/pxt-status-bar
        const cs = game.currentScene();
        cs.physicsEngine.addSprite(output);
        return output 
    }

}
class Circle extends Sprite {
    _radius: number = 0
    _color: number = 0
    _fillColor: number = 0
    _dataText:string = ""
    _dataNumber:number = 0
    _centerX: number = 0
    _centerY: number = 0
    constructor(radius:number, color:number, fillColor:number ){
        super(image.create(2 * radius + 2, 2 * radius  + 2));   
        this._radius = radius
        this._color = color
        this._centerX = this._radius + 1
        this._centerY = this._radius + 1
        this._fillColor = fillColor;  
        if (this._fillColor == 0)
        {
            this.image.drawCircle(this._centerX, this._centerY, this._radius, this._color)
        } else {
            this.image.fillCircle(this._centerX, this._centerY,  this._radius, this._fillColor)
        }  

        this._dataText = ""
        this._dataNumber = 0
    }

    //% group="Actions"  
    //% blockSetVariable="myCircle"
    //% blockCombine block="sprite"
    get sprite():Sprite {
        return this  // I wish I understood why this works
    }
    //% group="Properties" 
    //% blockSetVariable="myCircle"
    //% blockCombine block="color"
    get color(): number {
        return this._color;
    }
    //% group="Properties"  
    //% blockSetVariable="myCircle"
    //% blockCombine block="color"
    set color(value: number) {
        this._color = value;
        this.image.drawCircle(this._centerX, this._centerY,  this._radius, this._color);
    }
    //% group="Properties" 
    //% blockSetVariable="myCircle"
    //% blockCombine block="radius"
    get radius(): number {
        return this._radius;
    }
    //% group="Properties" 
    //% blockSetVariable="myCircle"
    //% blockCombine block="fill color"
    get fillColor() {
        return this._fillColor;
    }
    //% group="Actions" 
    //% block="erase fill from %Circle(myCircle)"
    unfill() {
        this._fillColor = 0;
        this.image.fill(0);  //clear anything in image
        this.image.drawCircle(this._centerX, this._centerY, this._radius, this._color);
    }
    //% group="Actions" 
    //% block="fill %Circle(myCircle) || with color $color"
    fill(color: number = -1 ){
        if (color == -1)
        {
            this._fillColor = this._color
        } else {
            this._fillColor = color
        }
        this.image.fillCircle(this._centerX, this._centerY, this._radius, this._fillColor)
    }
}
function getCircleWithSprite(sprite:Sprite, circles:Circle[]):Circle {
    for(let i = 0; i < circles.length; i++) {
        if(circles[i].sprite == sprite) return circles[i]  
    }
    return null
}
function getCirclesOfKind(kind:number, circles: Circle[]):Circle[] {
    let spriteList:Sprite[] = sprites.allOfKind(kind)
    let j = spriteList.find(function(value: Sprite, index: number) {
        return false
    })
    let circleList: Circle[] = []
    for(let k = 0; k < spriteList.length; k++) {
        circleList.push(getCircleWithSprite( spriteList[k], circles))
    }
    return circleList
}

