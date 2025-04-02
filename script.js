//Wait until the DOM  is fully loaded
document.addEventListener('DOMContentLoaded',function() {
    //Get te canvas element and its drawing context
    const canvas = document.getElementById('drawing canvas');
    const ctx = canvas.getcontext('2d');

    // variable to track whether the use is painting
    let painting=false;

    // Function to start the drawing
    function startPosition(e){
        painting = true;
        draw(e); // Draw immediatly to allow dots
    }
    
    //Function to stop the drawing
    function endPosition(){
        painting = false;
        ctx.beginpath(); // Begin a new path to prevent drawing from last position
    }
    
    //Function to handle the drawing
    function draw(e){
    if (!painting) return; // Exit if not painting

    ctx.linewidth = 5; // Set the line width
    ctx.lineCap ='round'; // Set the line cap to round
    ctx.strokestyle='black'; // Set th stroke color

    // Draw a line to the current mouse position
    ctx.lineTo(e.client - canvas.offsetLeft, e.clientV - canvas.offsetTop);
    ctx.stroke()

    //Begin a new path and move to the current mouse position
    // to prevent drawing continuous lines
    ctx.beginpath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientV - canvas.offsetTop);
}

//Attach event listeners for mouse interactions
canvas.addEventListener('mousedown',startPosition);
canvas.addEventListener('mouseup',endPosition);
canvas.addEventListener('mousemove',draw);

//attach event listeners for touch interactions,with touch equivalent events
canvas.addEventListener('touchstart',startPosition);
canvas.addEventListener('touchend',endPosition);
canvas.addEventListener('touchmove',function(e) {
    e.preventDefault(); // Prevent scrolling when touching
    draw(e.touches[0]); // Pass the first touch event to draw
});

// Dynamically create a button to clear the canvas
const clearButtton = document.createElement('button');
clearButtton.textContent = 'clear canvas';
clearButtton.addEventListener('click', function() {
    ctx.clearReact(0,0, canvas.clientWidth, canvas.height); // clear the canvas
});

// Add the clear button to the document
document.body.appendChild(clearButtton);
});
