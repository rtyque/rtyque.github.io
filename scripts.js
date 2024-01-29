var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    Composite = Matter.Composite;

function onLoad(){
    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            background: '#fafafa',
            wireframes: false
        }
    });

    // create two boxes and a ground
    let ball = Bodies.circle(200,400,50, {density:0.004, render:{
        sprite: {texture: 'ubhs.png'}
    }});
    let elastic = Constraint.create({
        pointA: {x:200,y:400},
        bodyB: ball,
        stiffness: 0.05
    })
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    var can1 = Bodies.rectangle(600, 575, 90, 10, { isStatic: true });
    var can2 = Bodies.rectangle(545, 535, 90, 10, { isStatic: true });
    Body.rotate(can2, Math.PI/2.5);
    var can3 = Bodies.rectangle(655, 535, 90, 10, { isStatic: true });
    Body.rotate(can3, -Math.PI/2.5);

    let mouse=Mouse.create(render.canvas);
    let mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse
    })

    function NewBall() {
        ball = Bodies.circle(200,400,50, {density:0.004, render:{
            sprite: {texture: 'ubhs.png'}
        }})
        Composite.add(engine.world, ball);
        elastic.bodyB = ball;
    }
    Events.on(engine, 'afterUpdate', function (){
        if (mouseConstraint.mouse.button === -1 && (ball.position.x > 220 || ball.position.y < 380)) {
            NewBall();
        }
    });
    // add all of the bodies to the world
    Composite.add(engine.world, [ball, ground, elastic, mouseConstraint, can1,can2,can3]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
    render.mouse=mouse;
}
