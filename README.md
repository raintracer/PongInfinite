# PongInfinite

/*

// ---------- STARTUP

1) [server] create objects Create() --> create paddles and ball(s)
2) [server] emit preLoad --> send preLoad data about paddle and ball(s)
3) [client] on preLoad --> pre load the GameGraphics
4) [client] emit clientReady --> send clientReady data { player, ready }
5) [server] on clientReady --> check if both clients have declared ready
6) [server] both clientReady --> call Start()
7) [server] execute Start() --> setInterval for GameUpdate THEN call randomizeBalls()

// --------- GAMEPLAY

Update (continuous setInterval, 60fps aka every 16.6ms)
1) [server] setInterval loop --> executes Update() every 60frames (1000/60 ~ 16.6ms)
2) [server] Update() --> iterates through gameObjects and gathers new object data points
3) [server] emit GameShow() --> passes updated gameObjects data array back to client
4) [client] on GameShow() --> iterates through gameObjects array data and updates the clients' graphics

Collision
1) [server] detect collision --> gather collision object data
2) [server] emit Collision --> send sound / animation trigger to clients
3) [client] on Collision --> trigger sound / animation

Score
1) [server] detect point score --> gather point data
2) [server] emit updateScore --> send score data { topScore, bottomScore }
3) [client] on updateScore --> update the clients' score divs

Keypresses
1) [client] emit keyPress --> send keyPress data { player, key }
2) [server] on keyPress --> register keyPress movement and proceed back to Update()
 */