
var amoeba;

function setup()
{
    
    createCanvas(850,700);
    noStroke();
    
    var amoColorR = random(0, 255);
    var amoColorG = random(0, 255);
    var amoColorB = random(0, 255);
    
    amoeba = {
        
        points:[],
        size: 200,
        
        // part of amoeba OBJECT, independant non related to setup function
        setup:function(){
            
            
            var incre = PI * 2/50;
            // rotate() works in radience, not in degree
            // 2PI is one full rotation
            
            
            for(var i=0; i<50; i++)
                {
                    var vect = createVector(0,random(0.65,1));
                    var angle = incre * i
                    vect.rotate(angle);
                    this.points.push(vect);
                }
        },  // end of setup method
        
        
        // part of amoeba OBJECT, independant non related to draw function   
        draw:function(eyeDirection)
        {
            fill(amoColorR, amoColorG, amoColorB); // amoeba's colour
            
            beginShape();
            for(var i=0; i<this.points.length; i++)
                {
                    var iValue = p5.Vector.mult(this.points[i], this.size);
                    curveVertex(iValue.x, iValue.y);  
                }
            endShape();
            fill(255); // resetting colour back to white
            
            
            ellipse(this.size * 0.1, 0, this.size * 0.1); // right eye
            ellipse(this.size * -0.1, 0, this.size * 0.1);  // left eye
            
            
            fill(0);
            var v = eyeDirection;  
            v.mult(this.size * 0.02);   // offset pupil position
            
            ellipse(this.size * 0.1 + v.x, v.y, this.size * 0.05); // right pupil
            ellipse(this.size * -0.1 + v.x, v.y, this.size * 0.05);  // left pupil
            
            
        },  // end of draw method
        
        
        
        grow:function()
        {
            this.size *= random(1, 1.009);
            this.size = min(350, this.size); // so the size has a max limit
            
            var rotat = random(-0.01, 0.01);
            
            for (var i=0; i<this.points.length; i++)
                {
                    this.points[i].rotate(rotat);
                }
        },
    
        shrink:function()
        {
            this.size *= random(1, 0.9955);
            this.size = max(30, this.size); // so it doesnt shrink into nothingness
        }
    
    }
    

    amoeba.setup();
    
}

function draw()
{
    
    background(0,0,0);
    translate(width/2,height/2);
    
    var v = createVector(mouseX - width/2, mouseY - height/2);
    //  applied width/2 an height/2 beacuse the canvas was translated earlier
    //  ... to make (0,0) points the middle of the canvas
    
    v.normalize(); // normalised the Vector v, to a unit vector
    
    
    amoeba.draw(v);
    
    amoeba.shrink();
    
}


function mouseMoved()
{
    amoeba.grow();
}


function mouseDragged()
{
    amoeba.grow();
}


function messageBackground()
{
    fill(169, 169, 169);
    stroke(0);
    rect(70, 130, width-140, 200, 20);
    strokeWeight(5);
}


