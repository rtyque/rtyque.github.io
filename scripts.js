function randomPos(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}


function updatePos(mousePos, button_pos){
    var no_button=document.getElementById('no');
    if (button_pos.x<window.innerWidth/2-50){
        newX=button_pos.x+randomPos(1,window.innerWidth-button_pos.right)+100;
    }
    else{
        newX=button_pos.x-randomPos(1,button_pos.left);
    }
    if (button_pos.y<window.innerHeight/2-35){
        newY=button_pos.y+randomPos(50,window.innerHeight-button_pos.bottom)+70;
    }
    else{
        newY=button_pos.y-randomPos(1,button_pos.top);
    }
    
    no_button.style.left=newX+'px';
    no_button.style.top=newY+'px';
}

function main(){
    
    var no_button=document.getElementById('no');
    button_pos=no_button.getBoundingClientRect();
    window.addEventListener('mousemove', (event) => {
        mousePos = { x: event.clientX, y: event.clientY };
        if (mousePos.x>button_pos.x && mousePos.x<button_pos.x+100 && mousePos.y>button_pos.y && mousePos.y<button_pos.y+70){
            updatePos(mousePos, button_pos);
            button_pos=no_button.getBoundingClientRect();
        }
        
    })
}
